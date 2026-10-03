export const NOTIFICATION_RECIPIENTS = ["founder@tryloqi.com", "faisal96kp@gmail.com"] as const;

// Matches Focality's JSON AJAX requests and table template. Keep destinations
// server-owned: visitors cannot supply recipients or FormSubmit control fields.
export async function sendSubmission(input: {
  title: string;
  email: string;
  fields: [string, string][];
  source: string;
  pendingRecipients: string[];
}) {
  const body = JSON.stringify({
    ...Object.fromEntries(input.fields),
    email: input.email,
    _replyto: input.email,
    _subject: input.title,
    _template: "table",
  });
  const results = await Promise.allSettled(input.pendingRecipients.map(async recipient => {
    const response = await fetch(`https://formsubmit.co/ajax/${recipient}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Referer: `https://www.tryloqi.com${input.source}`,
      },
      body,
      cache: "no-store",
      signal: AbortSignal.timeout(20_000),
    });
    const result: unknown = await response.json().catch(() => null);
    const data = result && typeof result === "object" ? result as Record<string, unknown> : null;
    const accepted = data?.success === true || data?.success === "true";
    // An activation notice is not acceptance of a notification for delivery.
    const activationRequired = typeof data?.message === "string" && /activat|confirm.*email|verify.*email/i.test(data.message);
    if (!response.ok || !accepted || activationRequired) {
      console.warn("[formsubmit]", { status: response.status, code: activationRequired ? "ACTIVATION_REQUIRED" : "REQUEST_NOT_ACCEPTED" });
      throw new Error("FormSubmit did not accept the notification.");
    }
    return recipient;
  }));
  // Retain partial acceptance so a retry doesn't resend to a successful endpoint.
  return results.flatMap(result => result.status === "fulfilled" ? [result.value] : []);
}
