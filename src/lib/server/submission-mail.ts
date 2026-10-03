import nodemailer from "nodemailer";

export const NOTIFICATION_RECIPIENTS = ["founder@tryloqi.com", "faisal96kp@gmail.com"] as const;

export class MailConfigurationError extends Error {}

function escapeHtml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

export async function sendSubmissionMail(input: {
  title: string;
  email: string;
  fields: [string, string][];
  pendingRecipients: string[];
}) {
  const sender = process.env.SMTP_EMAIL?.trim();
  const password = process.env.SMTP_PASSWORD;
  if (!sender || !password || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(sender)) {
    throw new MailConfigurationError("SMTP_EMAIL and SMTP_PASSWORD must be configured on the server.");
  }
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user:sender, pass:password },
    connectionTimeout:10_000,
    greetingTimeout:8_000,
    socketTimeout:15_000,
    disableFileAccess:true,
    disableUrlAccess:true,
  });
  try {
    const result = await transporter.sendMail({
      from:sender,
      to:[...NOTIFICATION_RECIPIENTS],
      envelope:{ from:sender, to:input.pendingRecipients },
      replyTo:input.email,
      subject:input.title,
      text:[input.title, ...input.fields.map(([label,value]) => `${label}: ${value || "—"}`)].join("\n\n"),
      html:`<div style="font-family:Arial,sans-serif;line-height:1.6;color:#222"><h2>${escapeHtml(input.title)}</h2><table style="border-collapse:collapse">${input.fields.map(([label,value]) => `<tr><th style="text-align:left;vertical-align:top;padding:8px;border-bottom:1px solid #ddd">${escapeHtml(label)}</th><td style="padding:8px;border-bottom:1px solid #ddd;white-space:pre-wrap">${escapeHtml(value || "—")}</td></tr>`).join("")}</table></div>`,
    });
    // Nodemailer can resolve even when only one recipient was accepted.
    return result.accepted.map(address => (typeof address === "string" ? address : address.address).toLowerCase());
  } finally { transporter.close(); }
}
