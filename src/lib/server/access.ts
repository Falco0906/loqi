
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
    signal: AbortSignal.timeout(5000),
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


  if (!response.ok) {
    throw new Error(`Google Sheets webhook failed with status ${response.status}`);
  }

  if (
    parsedBody &&
    typeof parsedBody === "object" &&
    "success" in parsedBody &&
    (parsedBody as { success?: boolean }).success !== true
  ) {
    throw new Error("Google Sheets webhook returned success=false");
  }
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
    signal: AbortSignal.timeout(5000),
  });

  if (!response.ok) {
    throw new Error(`Telegram notification failed with status ${response.status}`);
  }
}

export async function verifyApprovedAccessCode(inputCode: string) {
  const readUrl = requireEnv("GOOGLE_SHEETS_READ_URL");
  const normalizedInput = normalizeText(inputCode);
  const requestUrl = new URL(readUrl);
  requestUrl.searchParams.set("access_code", inputCode.trim());

  const response = await fetch(requestUrl.toString(), {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
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

  console.log("[google-sheets-verify] request", {
    url: requestUrl.toString(),
    code: normalizedInput,
  });
  console.log("[google-sheets-verify] raw response body", rawBody);
  console.log("[google-sheets-verify] response", {
    status: response.status,
    ok: response.ok,
    body: parsedBody,
  });

  if (!response.ok) {
    console.error("[google-sheets-verify] failed response", {
      status: response.status,
      body: parsedBody,
    });
    throw new Error(`Google Sheets read failed with status ${response.status}`);
  }

  if (!parsedBody || typeof parsedBody !== "object") {
    console.error("[google-sheets-verify] invalid JSON body", { body: parsedBody });
    throw new Error("Google Sheets verify returned an invalid response body");
  }

  const success = (parsedBody as { success?: unknown }).success === true;
  console.log("[google-sheets-verify] parsed success", {
    success,
    parsedBody,
  });

  return { ok: success };
}
