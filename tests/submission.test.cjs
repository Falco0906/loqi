// Real route/validation/mail composition, with only the SMTP boundary replaced.
const { test, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const nodemailer = require('nodemailer');
const { NextRequest } = require('next/server');
const root = path.resolve(__dirname, '..');
require.extensions['.ts'] = (module, filename) => {
  const source = fs.readFileSync(filename, 'utf8').replace(/from "@\/([^"\n]+)"/g, (_, subpath) => `from ${JSON.stringify(path.join(root, 'src', subpath))}`);
  module._compile(ts.transpileModule(source, { compilerOptions:{ module:ts.ModuleKind.CommonJS, target:ts.ScriptTarget.ES2022, esModuleInterop:true } }).outputText, filename);
};
const recipients = ['founder@tryloqi.com','faisal96kp@gmail.com'];
const payload = {name:'Delivery test',email:'tester@example.test',phone:'555-0100',company:'Sample <company>',website:'example.test',role:'Founder',teamSize:'3',outboundProcess:'Research\nDraft',idealCustomer:'B2B teams',monthlyVolume:'20',notes:'<script>not html</script>'};
const originalTransport = nodemailer.createTransport;
let savedEnv, sent, options, behavior, POST, accessPOST;
beforeEach(() => {
  savedEnv = {...process.env};
  process.env.SMTP_EMAIL = 'sender@example.test';process.env.SMTP_PASSWORD = 'test-only-placeholder';
  delete process.env.GOOGLE_SHEETS_WEBHOOK_URL;delete process.env.TELEGRAM_BOT_TOKEN;delete process.env.TELEGRAM_CHAT_ID;
  sent=[];behavior=async message=>({accepted:message.envelope.to});
  nodemailer.createTransport = config => {options=config;return {sendMail:async message=>{sent.push(message);return behavior(message)},close(){}}};
  for(const key of Object.keys(require.cache)) if(key.startsWith(path.join(root,'src'))) delete require.cache[key];
  POST=require('../src/app/api/book-demo/route.ts').POST;
  accessPOST=require('../src/app/api/request-access/route.ts').POST;
});
afterEach(()=>{nodemailer.createTransport=originalTransport;process.env=savedEnv});
const request=(data=payload,ip='127.0.0.1')=>new NextRequest('http://localhost/api/book-demo',{method:'POST',headers:{'content-type':'application/json','x-forwarded-for':ip},body:typeof data==='string'?data:JSON.stringify(data)});

test('both recipients, all fields, metadata, sender and escaped HTML',async()=>{
 const response=await POST(request());assert.equal(response.status,200);assert.deepEqual(await response.json(),{ok:true});
 assert.equal(options.service,'gmail');assert.deepEqual(sent[0].to,recipients);assert.deepEqual(sent[0].envelope.to,recipients);
 assert.equal(sent[0].from,'sender@example.test');assert.equal(sent[0].replyTo,payload.email);
 for(const value of Object.values(payload)) assert(sent[0].text.includes(value));
 assert(sent[0].text.includes('/book-demo'));assert(sent[0].text.includes('Submitted at (UTC)'));assert(!sent[0].html.includes('<script>'));assert(sent[0].html.includes('&lt;script&gt;'));
});
test('malformed JSON, non-object and typed/oversized fields fail before SMTP',async()=>{
 for(const data of ['{',null,[],{...payload,name:12},{...payload,email:'x\r\nbcc@example.test'},{...payload,notes:'x'.repeat(4001)}]) assert.equal((await POST(request(data))).status,400);
 assert.equal((await POST(request('x'.repeat(33000)))).status,413);assert.equal(sent.length,0);
});
test('missing credentials fail safely and allow a configured retry',async()=>{
 delete process.env.SMTP_PASSWORD;const failed=await POST(request());assert.equal(failed.status,503);assert(!JSON.stringify(await failed.json()).includes('SMTP_PASSWORD'));
 process.env.SMTP_PASSWORD='test-only-placeholder';assert.equal((await POST(request())).status,200);
});
test('SMTP failure has no success and retry is not locked out',async()=>{
 behavior=async()=>{throw new Error('provider-secret-detail')};const failed=await POST(request());assert.equal(failed.status,502);assert(!JSON.stringify(await failed.json()).includes('provider-secret'));
 behavior=async()=>({accepted:recipients});assert.equal((await POST(request())).status,200);
});
test('partial acceptance fails; retry sends only to missing recipient',async()=>{
 behavior=async()=>({accepted:[recipients[0]],rejected:[recipients[1]]});assert.equal((await POST(request())).status,502);
 behavior=async()=>({accepted:[recipients[1]]});assert.equal((await POST(request())).status,200);assert.deepEqual(sent[1].envelope.to,[recipients[1]]);
 assert.equal((await POST(request())).status,200);assert.equal(sent.length,2);
});
test('success waits for SMTP and concurrent submissions send once',async()=>{
 let release;behavior=()=>new Promise(resolve=>{release=resolve});let finished=false;
 const first=POST(request()).then(response=>{finished=true;return response});while(!release) await new Promise(resolve=>setImmediate(resolve));
 assert.equal(finished,false);assert.equal((await POST(request())).status,409);assert.equal(sent.length,1);
 release({accepted:recipients});assert.equal((await first).status,200);assert.equal((await POST(request())).status,200);assert.equal(sent.length,1);
});
test('legacy early access also requires both recipients without secondary config',async()=>{
 const response=await accessPOST(request({name:'Test',email:'access@example.test',whatsapp:'555-0100',useCase:'Research'}));assert.equal(response.status,200);assert.deepEqual(sent[0].envelope.to,recipients);assert(sent[0].text.includes('WhatsApp'));
});
test('basic attempt limit rejects repeated abuse',async()=>{
 behavior=async()=>{throw new Error('failure')};for(let i=0;i<5;i++) assert.equal((await POST(request())).status,502);
 assert.equal((await POST(request())).status,429);assert.equal(sent.length,5);
});
test('secondary notification failure cannot turn accepted email into failure',async()=>{
 process.env.GOOGLE_SHEETS_WEBHOOK_URL='https://example.test/webhook';const originalFetch=global.fetch;
 global.fetch=async()=>new Response('{"success":false}',{status:500});
 try { const response=await accessPOST(request({name:'Test',email:'access@example.test',whatsapp:'555-0100',useCase:'Research'}));assert.equal(response.status,200);assert.equal(sent.length,1); }
 finally {global.fetch=originalFetch}
});
