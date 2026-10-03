# FormSubmit notifications

The unchanged `/book-demo` UI posts to `/api/book-demo`. The legacy
`/api/request-access` route shares the same validation and FormSubmit adapter.
Both routes require HTTP success and `success: true` (or `"true"`) from **both**
FormSubmit AJAX endpoints before returning `{ "ok": true }`:

- `https://formsubmit.co/ajax/founder@tryloqi.com`
- `https://formsubmit.co/ajax/faisal96kp@gmail.com`

This follows Focality's `src/components/Contact/index.tsx`: two parallel JSON
POSTs, `Accept: application/json`, `_subject`, and `_template: "table"`.
Focality has no custom honeypot or CAPTCHA setting. Loqi likewise does not disable
provider defaults. Loqi additionally validates the HTTP status and JSON success
value, and rejects activation notices instead of showing a false success.

All existing fields, source path and a UTC timestamp are included. The subject
is `New Loqi Early Access Request — [name / company]`. `email` and `_replyto`
carry the visitor's address. The recipient destinations and control fields are
server-owned. The FormSubmit referrer identifies the production Loqi page, so
local tests do not register a separate localhost form.

## Activation and deployment

No mail credentials or API key are needed. Remove obsolete SMTP configuration
from deployment settings when convenient; no code reads it. Activate each
recipient through the confirmation email FormSubmit sends on first use. Check
both inboxes and spam folders, then submit again to confirm receipt in both.
An activation notice is not proof that a submission email has been delivered.

The existing Node.js routes must be available in production with outbound HTTPS
access to `formsubmit.co`. No new infrastructure or client secrets are required.
The visitor stays on Loqi; only its existing inline state changes.

## Reliability

Server validation, the 32 KB request limit, browser submission lock and five
attempts/hour/process limit remain. Requests to the provider have a 20-second
timeout. Network failures, malformed replies, rejection, activation notices and
partial acceptance return 502 with the existing retry/contact message.

A bounded 10-minute process-local cache prevents concurrent identical submissions
and remembers which recipient endpoints accepted a request. A partial retry
targets only the remaining endpoint. This cache is not shared across serverless
instances or restarts, and an ambiguous network timeout can still cause duplicates.
Provider acceptance is not confirmation of inbox delivery.

Optional legacy Google Sheets and Telegram notifications are retained and cannot
turn an accepted submission into a reported failure. Their existing environment
variables are independent of FormSubmit and are not needed for `/book-demo`.

## Verification

`node --test tests/submission.test.cjs` tests real route validation with mocked
external HTTP responses: both endpoints, fields, Reply-To, success/failure,
activation, partial retry and concurrency. These tests do not send email.

For an actual pipeline check, submit a clearly labeled test through `/book-demo`,
record FormSubmit acceptance separately, and manually confirm both inboxes.
See https://formsubmit.co/documentation and https://formsubmit.co/ajax-documentation.

Local verification on 2026-10-03: a browser submission reached both FormSubmit
endpoints, which returned HTTP 200 with activation-required notices. Loqi returned
502 and displayed the inline error as intended. Notification acceptance and inbox
delivery remain unverified until the recipient activation links are confirmed.
