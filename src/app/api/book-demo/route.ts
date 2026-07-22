import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const DUPLICATE_WINDOW_MS = 10 * 60 * 1000;
const submissionLog = new Map<string, number>();

function getClientIp(headers: Headers): string {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || "unknown";
  return headers.get("x-real-ip") ?? "unknown";
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, string>;
    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const phone = body.phone?.trim() ?? "";
    const company = body.company?.trim() ?? "";
    const website = body.website?.trim() ?? "";
    const role = body.role?.trim() ?? "";
    const teamSize = body.teamSize?.trim() ?? "";
    const outboundProcess = body.outboundProcess?.trim() ?? "";
    const idealCustomer = body.idealCustomer?.trim() ?? "";
    const monthlyVolume = body.monthlyVolume?.trim() ?? "";
    const notes = body.notes?.trim() ?? "";

    const details: Record<string, string> = {};

    if (!name) details.name = "Full name is required.";
    if (!email) details.email = "Work email is required.";
    if (email && !isValidEmail(email)) details.email = "Enter a valid email address.";
    if (!phone) details.phone = "Phone number is required.";
    if (!company) details.company = "Company name is required.";
    if (!role) details.role = "Role or job title is required.";
    if (!teamSize) details.teamSize = "Team size is required.";
    if (!outboundProcess) details.outboundProcess = "Tell us about your outbound process.";
    if (!idealCustomer) details.idealCustomer = "Tell us about your ideal customer.";
    if (!monthlyVolume) details.monthlyVolume = "Monthly volume is required.";

    if (Object.keys(details).length > 0) {
      return NextResponse.json(
        { error: "Please review the highlighted fields.", details },
        { status: 400 }
      );
    }

    // Rate limiting
    const ip = getClientIp(request.headers);
    const now = Date.now();
    const lastSubmission = submissionLog.get(email);
    if (lastSubmission && now - lastSubmission < DUPLICATE_WINDOW_MS) {
      return NextResponse.json(
        { error: "We already received a recent request for this email. Please wait a bit." },
        { status: 429 }
      );
    }
    submissionLog.set(email, now);

    // Send email
    const smtpEmail = requireEnv("SMTP_EMAIL");
    const smtpPassword = requireEnv("SMTP_PASSWORD");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: smtpEmail, pass: smtpPassword },
    });

    const fields = [
      ["Name", name],
      ["Email", email],
      ["Phone", phone],
      ["Company", company],
      ["Website", website],
      ["Role", role],
      ["Team Size", teamSize],
      ["Outbound Process", outboundProcess],
      ["Ideal Customer", idealCustomer],
      ["Monthly Volume", monthlyVolume],
      ["Notes", notes],
    ];

    await transporter.sendMail({
      from: smtpEmail,
      to: "founder@tryloqi.com",
      subject: `New demo request from ${name} at ${company}`,
      text: fields.map(([label, value]) => `${label}: ${value}`).join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
          <h2>New demo request</h2>
          <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
            ${fields
              .filter(([, v]) => v)
              .map(
                ([label, value]) => `
              <tr>
                <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151; width: 160px;">${escapeHtml(label)}</td>
                <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; color: #111827;">${escapeHtml(value)}</td>
              </tr>`
              )
              .join("")}
          </table>
          <p style="color: #6b7280; font-size: 12px; margin-top: 16px;">Submitted at ${new Date().toISOString()} from IP ${ip}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to submit demo request.";
    console.error("[book-demo]", error);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
