// Real routes and validation; only external HTTP requests are mocked.
const { test, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const { NextRequest } = require('next/server');
const root = path.resolve(__dirname, '..');
require.extensions['.ts'] = (module, filename) => {
  const source = fs.readFileSync(filename, 'utf8').replace(/from "@\/([^"\n]+)"/g, (_, subpath) => `from ${JSON.stringify(path.join(root, 'src', subpath))}`);
  module._compile(ts.transpileModule(source, { compilerOptions:{ module:ts.ModuleKind.CommonJS, target:ts.ScriptTarget.ES2022, esModuleInterop:true } }).outputText, filename);
};
const recipients = ['founder@tryloqi.com','faisal96kp@gmail.com'];
const payload = {name:'Delivery test',email:'tester@example.test',phone:'555-0100',company:'Sample company',website:'example.test',role:'Founder',teamSize:'3',outboundProcess:'Research\nDraft',idealCustomer:'B2B teams',monthlyVolume:'20',notes:'Test only'};
const originalFetch = global.fetch;
const success = () => Response.json({success:'true',message:'The form was submitted successfully.'});
let savedEnv, sent, behavior, POST, accessPOST;
beforeEach(() => {
  savedEnv = {...process.env};
  delete process.env.GOOGLE_SHEETS_WEBHOOK_URL;delete process.env.TELEGRAM_BOT_TOKEN;delete process.env.TELEGRAM_CHAT_ID;
  sent=[];behavior=async()=>success();
  global.fetch=async(url, options)=>{const message={url,options,body:JSON.parse(options.body)};sent.push(message);return behavior(message)};
  for(const key of Object.keys(require.cache)) if(key.startsWith(path.join(root,'src'))) delete require.cache[key];
  POST=require('../src/app/api/book-demo/route.ts').POST;
  accessPOST=require('../src/app/api/request-access/route.ts').POST;
});
afterEach(()=>{global.fetch=originalFetch;process.env=savedEnv});
const request=(data=payload)=>new NextRequest('http://localhost/api/book-demo',{method:'POST',headers:{'content-type':'application/json','x-forwarded-for':'127.0.0.1'},body:typeof data==='string'?data:JSON.stringify(data)});

test('both AJAX endpoints, all fields, metadata, subject, table and Reply-To',async()=>{
 const response=await POST(request());assert.equal(response.status,200);assert.deepEqual(await response.json(),{ok:true});
 assert.deepEqual(sent.map(m=>m.url),recipients.map(r=>`https://formsubmit.co/ajax/${r}`));
 for(const message of sent) {
   assert.equal(message.options.method,'POST');assert.equal(message.options.headers.Accept,'application/json');
   assert.equal(message.body.email,payload.email);assert.equal(message.body._replyto,payload.email);assert.equal(message.body._template,'table');
   assert.equal(message.body._subject,`New Loqi Early Access Request — ${payload.name} / ${payload.company}`);
   for(const value of Object.values(payload)) assert(Object.values(message.body).includes(value));
   assert.equal(message.body.Source,'/book-demo');assert(message.body['Submitted at (UTC)']);
 }
});
test('malformed JSON and invalid/oversized fields fail before provider calls',async()=>{
 for(const data of ['{',null,[],{...payload,name:12},{...payload,email:'x\r\nbcc@example.test'},{...payload,notes:'x'.repeat(4001)}]) assert.equal((await POST(request(data))).status,400);
 assert.equal((await POST(request('x'.repeat(33000)))).status,413);assert.equal(sent.length,0);
});
test('HTTP errors, false success, malformed responses and activation notices fail',async()=>{
 for(const response of [Response.json({success:true},{status:500}),Response.json({success:'false'}),new Response('not JSON'),Response.json({}),Response.json({success:true,message:'Please activate your form by confirming your email.'})]) {
   behavior=async()=>response.clone();assert.equal((await POST(request())).status,502);
 }
});
test('network failure preserves retry and does not leak provider details',async()=>{
 behavior=async()=>{throw new Error('provider-private-detail')};const failed=await POST(request());assert.equal(failed.status,502);assert(!JSON.stringify(await failed.json()).includes('provider-private'));
 behavior=async()=>success();assert.equal((await POST(request())).status,200);
});
test('partial acceptance fails; retry targets only missing recipient',async()=>{
 behavior=async({url})=>url.endsWith(recipients[0])?success():Response.json({success:false});assert.equal((await POST(request())).status,502);
 behavior=async()=>success();assert.equal((await POST(request())).status,200);assert.equal(sent[2].url,`https://formsubmit.co/ajax/${recipients[1]}`);
 assert.equal((await POST(request())).status,200);assert.equal(sent.length,3);
});
test('success waits for both provider responses and concurrent submissions send once',async()=>{
 const releases=[];behavior=()=>new Promise(resolve=>releases.push(resolve));let finished=false;
 const first=POST(request()).then(response=>{finished=true;return response});while(releases.length<2) await new Promise(resolve=>setImmediate(resolve));
 assert.equal(finished,false);assert.equal((await POST(request())).status,409);assert.equal(sent.length,2);
 releases[0](success());await new Promise(resolve=>setImmediate(resolve));assert.equal(finished,false);
 releases[1](success());assert.equal((await first).status,200);assert.equal((await POST(request())).status,200);assert.equal(sent.length,2);
});
test('legacy early access also uses both endpoints without configuration',async()=>{
 const response=await accessPOST(request({name:'Test',email:'access@example.test',whatsapp:'555-0100',useCase:'Research'}));assert.equal(response.status,200);assert.equal(sent.length,2);assert.equal(sent[0].body.WhatsApp,'555-0100');
});
test('basic attempt limit rejects repeated abuse',async()=>{
 behavior=async()=>{throw new Error('failure')};for(let i=0;i<5;i++) assert.equal((await POST(request())).status,502);
 assert.equal((await POST(request())).status,429);assert.equal(sent.length,10);
});
test('secondary notification failure cannot turn acceptance into failure',async()=>{
 process.env.GOOGLE_SHEETS_WEBHOOK_URL='https://example.test/webhook';behavior=async({url})=>url.includes('formsubmit.co')?success():Response.json({success:false},{status:500});
 const response=await accessPOST(request({name:'Test',email:'access@example.test',whatsapp:'555-0100',useCase:'Research'}));assert.equal(response.status,200);assert.equal(sent.length,3);
});
