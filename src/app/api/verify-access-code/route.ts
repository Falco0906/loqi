import { NextRequest, NextResponse } from "next/server";
import { verifyApprovedAccessCode } from "@/lib/server/access";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, string>;
    const code = body.code?.trim() ?? "";

    if (!code) {
      return NextResponse.json({ error: "Enter your access code." }, { status: 400 });
    }

    const result = await verifyApprovedAccessCode(code);

    if (!result.ok) {
      return NextResponse.json(
        { error: "That access code is invalid or not approved yet." },
        { status: 401 }
      );
    }

    const botUsername =
      process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME ?? "YOUR_BOT_USERNAME";

    return NextResponse.json({
      ok: true,
      code,
      redirectUrl: `https://t.me/${botUsername}?start=${encodeURIComponent("approved-access")}`,
    });
  } catch (error) {
    console.error("[verify-access-code]", error);
    return NextResponse.json(
      { error: "Unable to verify your code right now. Please try again shortly." },
      { status: 500 }
    );
  }
}
