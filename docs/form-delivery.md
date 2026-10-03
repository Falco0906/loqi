# Form notification delivery

`/book-demo` posts to `/api/book-demo`. All current early-access CTAs lead to
`/book-demo`. The legacy `/api/request-access` route uses the same mail service.
Both routes require SMTP acceptance for **founder@tryloqi.com** and
**faisal96kp@gmail.com** before returning `{ "ok": true }`.

## Server configuration

The existing integration is Nodemailer with Gmail SMTP (TLS on port 465).
Set these variables in `.env.local` for local use and in the landing application's
production runtime environment for deployment:

- `SMTP_EMAIL`: the existing Gmail or Google Workspace account used to authenticate
  and send. The sender is this account; the visitor's email is only `Reply-To`.
- `SMTP_PASSWORD`: a Google App Password for that same account. Enable 2-Step
  Verification and create an App Password. Workspace policy must permit it.
  Do not use a normal account password or expose either value as `NEXT_PUBLIC_*`.

See [Nodemailer's Gmail configuration](https://nodemailer.com/guides/using-gmail).
For a Workspace sender, its administrator should maintain the domain's SPF/DKIM
configuration and inspect delivery logs/bounces. SMTP acceptance alone does not
prove arrival in either inbox.

The handlers explicitly use the Node.js runtime, with a 60-second route duration
and bounded SMTP connection/read timeouts. The deployment must support Node.js
server routes and outbound SMTP. Static-only hosting cannot run these handlers.
On Vercel, set both variables for Production (and Preview if testing there), then
redeploy for environment changes to take effect. No deployment was performed here.

There are no local SMTP credentials, `.vercel` project settings, or accessible
production environment configuration in this checkout. Production variable
presence and the cause of the reported historical submission cannot be confirmed
from this repository alone.

## Existing secondary access notifications

The legacy access endpoint still forwards to Google Sheets when
`GOOGLE_SHEETS_WEBHOOK_URL` is present and notifies Telegram when both
`TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` are present. These are optional secondary
notifications, bounded to five seconds. Their absence or failure cannot block
email delivery. They are not required by the current book-demo form.

## Failure and duplicate handling

Malformed input returns 400; oversized requests return 413. Missing mail
configuration returns 503; provider failure or partial recipient acceptance
returns 502. Visitors keep their entered fields and see a retry/contact message.
Logs include only a category and counts, never submitted data or credentials.

The browser locks submission immediately until its request completes. A process-local
10-minute fingerprint cache prevents simultaneous identical requests and remembers
SMTP-accepted recipients. Identical successful retries return success without
sending again; partial retries address only recipients not yet accepted. Basic
IP attempt limiting allows five attempts per hour per process.

These maps are bounded but are not shared across serverless instances or restarts.
SMTP cannot guarantee exactly-once delivery, especially after an ambiguous network
timeout. A durable queue/store would be needed for that guarantee; none was added.

## Verification

Run `node --test tests/submission.test.cjs` for route, validation, recipient,
partial-failure, retry and concurrent-submission coverage using a mocked SMTP
transport. These tests do **not** send email or prove Gmail delivery.

After configuring real credentials, submit a clearly labeled test from the form.
Confirm the request returns 200 only after SMTP acceptance and manually check both
inboxes/spam folders (or Workspace delivery logs). If it fails, inspect the server
error category and sender account/provider logs. Do not call acceptance verified
inbox delivery until both messages are found.
