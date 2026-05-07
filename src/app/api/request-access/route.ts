import { NextRequest, NextResponse } from "next/server";
import {
  enforceRequestAccessRateLimit,
  forwardAccessRequest,
  getClientIp,
  sendAccessRequestEmail,
  sendTelegramAdminNotification,
} from "@/lib/server/access";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  let rollbackRateLimit: (() => void) | undefined;

  try {
    const body = (await request.json()) as Record<string, string>;
    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const whatsapp = body.whatsapp?.trim() ?? "";
    const useCase = body.useCase?.trim() ?? "";

    const details: Record<string, string> = {};

    if (!name) details.name = "Full name is required.";
    if (!email) details.email = "Work email is required.";
    if (email && !isValidEmail(email)) details.email = "Enter a valid email address.";
    if (!whatsapp) details.whatsapp = "WhatsApp number is required.";
    if (!useCase) details.useCase = "Tell us how Loqi can help.";

    if (Object.keys(details).length > 0) {
      return NextResponse.json(
        { error: "Please review the highlighted fields.", details },
        { status: 400 }
      );
    }

    const ip = getClientIp(request.headers);
    rollbackRateLimit = enforceRequestAccessRateLimit(email, ip);

    const payload = {
      name,
      email,
      whatsapp,
      useCase,
      ip,
      timestamp: new Date().toISOString(),
    };

    await forwardAccessRequest(payload);
    await sendAccessRequestEmail(payload);
    await sendTelegramAdminNotification(payload);

    return NextResponse.json({ ok: true });
  } catch (error) {
    rollbackRateLimit?.();
    const message =
      error instanceof Error ? error.message : "Unable to submit access request.";
    const status =
      message.includes("recent request") || message.includes("Too many requests") ? 429 : 500;

    console.error("[request-access]", error);

    return NextResponse.json(
      {
        error:
          status === 429
            ? message
            : "Unable to submit your request right now. Please try again shortly.",
      },
      { status }
    );
  }
}
