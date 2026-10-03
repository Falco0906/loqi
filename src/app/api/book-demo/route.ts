import { NextRequest } from "next/server";
import { handleSubmission } from "@/lib/server/submission";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  return handleSubmission(request, "demo");
}
