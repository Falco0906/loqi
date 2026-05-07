import nodemailer from "nodemailer";

type AccessRow = Record<string, unknown>;

const DUPLICATE_WINDOW_MS = 10 * 60 * 1000;
const IP_WINDOW_MS = 60 * 60 * 1000;
const MAX_IP_SUBMISSIONS = 5;

const emailSubmissionLog = new Map<string, number>();
const ipSubmissionLog = new Map<string, number[]>();

function normalizeText(value: string): string {
  return value.trim().toLowerCase();
}

function cleanupRateLimitState(now: number) {
  for (const [key, timestamp] of Array.from(emailSubmissionLog.entries())) {
    if (now - timestamp > DUPLICATE_WINDOW_MS) {
      emailSubmissionLog.delete(key);
    }
  }

  for (const [key, timestamps] of Array.from(ipSubmissionLog.entries())) {
    const freshTimestamps = timestamps.filter((timestamp) => now - timestamp <= IP_WINDOW_MS);
    if (freshTimestamps.length === 0) {
      ipSubmissionLog.delete(key);
    } else {
      ipSubmissionLog.set(key, freshTimestamps);
    }
  }
}

export function getClientIp(headers: Headers): string {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return headers.get("x-real-ip") ?? "unknown";
}

export function enforceRequestAccessRateLimit(email: string, ip: string) {
  const now = Date.now();
  const normalizedEmail = normalizeText(email);
  cleanupRateLimitState(now);

  const lastEmailSubmission = emailSubmissionLog.get(normalizedEmail);
  if (lastEmailSubmission && now - lastEmailSubmission < DUPLICATE_WINDOW_MS) {
    throw new Error("We already received a recent request for this email. Please wait a bit.");
  }

  const previousIpSubmissions = ipSubmissionLog.get(ip) ?? [];
  if (previousIpSubmissions.length >= MAX_IP_SUBMISSIONS) {
    throw new Error("Too many requests from this connection. Please try again later.");
  }

  emailSubmissionLog.set(normalizedEmail, now);
  ipSubmissionLog.set(ip, [...previousIpSubmissions, now]);

  return () => {
    emailSubmissionLog.delete(normalizedEmail);
    if (previousIpSubmissions.length === 0) {
      ipSubmissionLog.delete(ip);
    } else {
      ipSubmissionLog.set(ip, previousIpSubmissions);
    }
  };
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function forwardAccessRequest(payload: {
  name: string;
  email: string;
  whatsapp: string;
  useCase: string;
  timestamp: string;
  ip: string;
}) {
  const webhookUrl = requireEnv("GOOGLE_SHEETS_WEBHOOK_URL");
  const webhookPayload = {
    action: "request_access",
    name: payload.name,
    email: payload.email,
    whatsapp: payload.whatsapp,
    use_case: payload.useCase,
    created_at: payload.timestamp,
  };

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(webhookPayload),
    cache: "no-store",
  });

  const rawBody = await response.text();

  let parsedBody: unknown = null;
  if (rawBody) {
    try {
      parsedBody = JSON.parse(rawBody);
    } catch {
      parsedBody = rawBody;
    }
  }

  console.log("[google-sheets-webhook] request payload", webhookPayload);
  console.log("[google-sheets-webhook] response", {
    status: response.status,
    ok: response.ok,
    body: parsedBody,
  });

  if (!response.ok) {
    console.error("[google-sheets-webhook] failed response", {
      status: response.status,
      body: parsedBody,
    });
    throw new Error(`Google Sheets webhook failed with status ${response.status}`);
  }

  if (
    parsedBody &&
    typeof parsedBody === "object" &&
    "success" in parsedBody &&
    (parsedBody as { success?: boolean }).success !== true
  ) {
    console.error("[google-sheets-webhook] unsuccessful body", {
      status: response.status,
      body: parsedBody,
    });
    throw new Error("Google Sheets webhook returned success=false");
  }
}

export async function sendAccessRequestEmail(payload: {
  name: string;
  email: string;
  whatsapp: string;
  useCase: string;
  timestamp: string;
}) {
  const smtpEmail = requireEnv("SMTP_EMAIL");
  const smtpPassword = requireEnv("SMTP_PASSWORD");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: smtpEmail,
      pass: smtpPassword,
    },
  });

  await transporter.sendMail({
    from: smtpEmail,
    to: "faisal96kp@gmail.com",
    subject: `New Loqi access request from ${payload.name}`,
    text: [
      "New Loqi access request",
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `WhatsApp: ${payload.whatsapp}`,
      `Use case: ${payload.useCase}`,
      `Timestamp: ${payload.timestamp}`,
    ].join("\n"),
    html: `
      <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
        <h2>New Loqi access request</h2>
        <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
        <p><strong>WhatsApp:</strong> ${escapeHtml(payload.whatsapp)}</p>
        <p><strong>Use case:</strong> ${escapeHtml(payload.useCase)}</p>
        <p><strong>Timestamp:</strong> ${escapeHtml(payload.timestamp)}</p>
      </div>
    `,
  });
}

export async function sendTelegramAdminNotification(payload: {
  name: string;
  email: string;
  whatsapp: string;
  useCase: string;
  timestamp: string;
}) {
  const botToken = requireEnv("TELEGRAM_BOT_TOKEN");
  const chatId = requireEnv("TELEGRAM_CHAT_ID");

  const text = [
    "New Loqi access request",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `WhatsApp: ${payload.whatsapp}`,
    `Use case: ${payload.useCase}`,
    `Timestamp: ${payload.timestamp}`,
  ].join("\n");

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Telegram notification failed with status ${response.status}`);
  }
}

function normalizeKey(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function getStringValue(row: AccessRow, aliases: string[]): string {
  for (const [key, value] of Object.entries(row)) {
    if (aliases.includes(normalizeKey(key)) && value != null) {
      return String(value).trim();
    }
  }

  return "";
}

function rowsFromMatrix(matrix: unknown[][]): AccessRow[] {
  if (matrix.length < 2) return [];

  const headers = matrix[0].map((cell) => String(cell ?? ""));
  return matrix.slice(1).map((row) => {
    const mapped: AccessRow = {};
    headers.forEach((header, index) => {
      mapped[header] = row[index];
    });
    return mapped;
  });
}

function parseAccessRows(data: unknown): AccessRow[] {
  if (Array.isArray(data)) {
    if (Array.isArray(data[0])) {
      return rowsFromMatrix(data as unknown[][]);
    }
    return data as AccessRow[];
  }

  if (data && typeof data === "object") {
    const record = data as Record<string, unknown>;
    const candidates = [record.rows, record.data, record.values];

    for (const candidate of candidates) {
      if (Array.isArray(candidate)) {
        if (Array.isArray(candidate[0])) {
          return rowsFromMatrix(candidate as unknown[][]);
        }
        return candidate as AccessRow[];
      }
    }
  }

  return [];
}

export async function verifyApprovedAccessCode(inputCode: string) {
  const readUrl = requireEnv("GOOGLE_SHEETS_READ_URL");

  const response = await fetch(readUrl, {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Google Sheets read failed with status ${response.status}`);
  }

  const data = (await response.json().catch(() => null)) as unknown;
  const rows = parseAccessRows(data);
  const normalizedInput = normalizeText(inputCode);

  const match = rows.find((row) => {
    const code = normalizeText(
      getStringValue(row, ["accesscode", "code", "invitecode", "accesskey"])
    );
    return code === normalizedInput;
  });

  if (!match) {
    return { ok: false as const };
  }

  const status = normalizeText(
    getStringValue(match, ["status", "approvalstatus", "accessstatus"])
  );

  return { ok: status === "approved" };
}
