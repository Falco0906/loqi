import { NextRequest, NextResponse } from "next/server";
import { verifyApprovedAccessCode } from "@/lib/server/access";
import { getTelegramBotUsername } from "@/lib/access";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, string>;
    const code = body.code?.trim() ?? "";
    console.log("[/api/verify-access-code] submitted code", code);

    if (!code) {
      return NextResponse.json({ error: "Enter your access code." }, { status: 400 });
    }

    const result = await verifyApprovedAccessCode(code);
    console.log("[/api/verify-access-code] verify result", result);

    if (!result.ok) {
      return NextResponse.json(
        { error: "That access code is invalid or not approved yet." },
        { status: 401 }
      );
    }

    const botUsername = getTelegramBotUsername();

    const responseBody = {
      ok: true,
      code,
      redirectUrl: `https://t.me/${botUsername}?start=${encodeURIComponent("approved-access")}`,
    };
    console.log("[/api/verify-access-code] success response", responseBody);

    return NextResponse.json(responseBody);
  } catch (error) {
    console.error("[verify-access-code]", error);
    return NextResponse.json(
      { error: "Unable to verify your code right now. Please try again shortly." },
      { status: 500 }
    );
  }
}
