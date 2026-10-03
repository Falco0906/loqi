import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { MailConfigurationError, NOTIFICATION_RECIPIENTS, sendSubmissionMail } from "./submission-mail";
import { forwardAccessRequest, sendTelegramAdminNotification } from "./access";

type Kind = "demo" | "access";
type Field = [key:string, label:string, required:boolean, max:number];
const demoFields: Field[] = [
  ["name","Name",true,160], ["email","Email",true,254], ["phone","Phone",true,80],
  ["company","Company",true,200], ["website","Website",false,500], ["role","Role",true,160],
  ["teamSize","Team Size",true,80], ["outboundProcess","Outbound Process",true,4000],
  ["idealCustomer","Ideal Customer",true,4000], ["monthlyVolume","Monthly Volume",true,160], ["notes","Notes",false,4000],
];
const accessFields: Field[] = [["name","Name",true,160],["email","Email",true,254],["whatsapp","WhatsApp",true,80],["useCase","Use Case",true,4000]];
const WINDOW = 10 * 60_000;
// Best-effort process-local protection; serverless instances do not share these maps.
const submissions = new Map<string, { created:number; busy:boolean; accepted:Set<string>; timestamp:string }>();
const attempts = new Map<string, number[]>();
const failure = "We couldn’t deliver your request to the team. Please try again shortly, or email founder@tryloqi.com.";

export async function handleSubmission(request: NextRequest, kind: Kind) {
  let body: unknown;
  try {
    if (Number(request.headers.get("content-length")) > 32_768) return NextResponse.json({error:"Request is too large."},{status:413});
    const raw = await request.text();
    if (Buffer.byteLength(raw) > 32_768) return NextResponse.json({error:"Request is too large."},{status:413});
    body = JSON.parse(raw);
  } catch { return NextResponse.json({error:"Please submit a valid form."},{status:400}); }
  if (!body || typeof body !== "object" || Array.isArray(body)) return NextResponse.json({error:"Please submit a valid form."},{status:400});
  const fields = kind === "demo" ? demoFields : accessFields;
  const values: Record<string,string> = {};
  const details: Record<string,string> = {};
  for (const [key,label,required,max] of fields) {
    const value = (body as Record<string,unknown>)[key];
    if (value !== undefined && typeof value !== "string") { details[key] = `${label} must be text.`; continue; }
    const text = typeof value === "string" ? value.trim() : "";
    values[key] = text;
    if (required && !text) details[key] = `${label} is required.`;
    else if (text.length > max) details[key] = `${label} must be ${max} characters or fewer.`;
    else if (/\u0000/.test(text)) details[key] = `${label} contains invalid characters.`;
  }
  if (values.email && !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(values.email)) details.email = "Enter a valid email address.";
  if (Object.keys(details).length) return NextResponse.json({error:"Please review the highlighted fields.",details},{status:400});
  values.email = values.email.toLowerCase();
  const now = Date.now();
  for (const [key,entry] of Array.from(submissions.entries())) if (!entry.busy && now - entry.created > WINDOW) submissions.delete(key);
  for (const [key,times] of Array.from(attempts.entries())) {
    const recent = times.filter(time => now - time < 60 * 60_000);
    if (recent.length) attempts.set(key,recent); else attempts.delete(key);
  }
  const key = createHash("sha256").update(kind + JSON.stringify(values)).digest("hex");
  let entry = submissions.get(key);
  if (entry?.accepted.size === NOTIFICATION_RECIPIENTS.length) return NextResponse.json({ok:true});
  if (entry?.busy) return NextResponse.json({error:"Your request is already being processed. Please wait."},{status:409});
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  const ipKey = createHash("sha256").update(ip).digest("hex");
  const recent = attempts.get(ipKey) || [];
  if (recent.length >= 5 || (!entry && submissions.size >= 1000) || (!attempts.has(ipKey) && attempts.size >= 5000)) {
    return NextResponse.json({error:"Too many requests. Please try again later."},{status:429,headers:{"Retry-After":"3600"}});
  }
  attempts.set(ipKey,[...recent,now]);
  if (!entry) { entry = {created:now,busy:false,accepted:new Set(),timestamp:new Date().toISOString()}; submissions.set(key,entry); }
  entry.busy = true;
  try {
    const accepted = await sendSubmissionMail({
      title:kind === "demo" ? "New Loqi demo request" : "New Loqi early-access request",
      email:values.email,
      fields:[...fields.map(([key,label]):[string,string] => [label,values[key]]),["Submitted at (UTC)",entry.timestamp],["Source",kind === "demo" ? "/book-demo" : "/api/request-access"]],
      pendingRecipients:NOTIFICATION_RECIPIENTS.filter(recipient => !entry!.accepted.has(recipient)),
    });
    for (const recipient of accepted) if (NOTIFICATION_RECIPIENTS.some(expected => expected === recipient)) entry.accepted.add(recipient);
    if (entry.accepted.size !== NOTIFICATION_RECIPIENTS.length) {
      console.error("[submission-mail]",{kind,code:"PARTIAL_RECIPIENT_ACCEPTANCE",acceptedCount:entry.accepted.size});
      return NextResponse.json({error:failure},{status:502});
    }
    if (kind === "access") {
      const payload = {name:values.name,email:values.email,whatsapp:values.whatsapp,useCase:values.useCase,ip,timestamp:entry.timestamp};
      // Existing secondary notifications must not prevent email delivery or report a false failure after it.
      const jobs: Promise<unknown>[] = [];
      if (process.env.GOOGLE_SHEETS_WEBHOOK_URL) jobs.push(forwardAccessRequest(payload));
      if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) jobs.push(sendTelegramAdminNotification(payload));
      const results = await Promise.allSettled(jobs);
      if (results.some(result => result.status === "rejected")) console.warn("[request-access] A secondary notification failed after email acceptance.");
    }
    return NextResponse.json({ok:true});
  } catch (error) {
    const code = error instanceof MailConfigurationError ? "SMTP_CONFIGURATION_MISSING" : "SMTP_DELIVERY_FAILED";
    const providerCode = error && typeof error === "object" && "code" in error ? String(error.code) : "";
    const knownCode = ["EAUTH","ECONNECTION","ETIMEDOUT","EENVELOPE","EMESSAGE","ESOCKET"].includes(providerCode) ? providerCode : undefined;
    console.error("[submission-mail]",{kind,code,providerCode:knownCode});
    return NextResponse.json({error:failure},{status:error instanceof MailConfigurationError ? 503 : 502});
  } finally { entry.busy = false; }
}
