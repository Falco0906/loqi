# Loqi Google Apps Script Backend

This folder contains a lightweight Google Apps Script backend for Loqi's early-access onboarding flow.

It supports:
- writing onboarding requests into Google Sheets
- verifying approved access codes from the same sheet

## Sheet Structure

Create a Google Sheet with these columns in row 1:

```text
Timestamp | Name | Email | WhatsApp | Use Case | Status | Access Code
```

The script will also create and/or repair this header row automatically inside a tab named `Loqi Access`.

## Apps Script Code

Use the full script in [Code.gs](./Code.gs).

## Setup

1. Create a new Google Sheet for Loqi onboarding.
2. Name one sheet tab `Loqi Access`.
3. In the Google Sheet, go to `Extensions` -> `Apps Script`.
4. Delete the default starter code.
5. Paste in the contents of [Code.gs](./Code.gs).
6. Save the project with a name like `Loqi Onboarding Backend`.

## Deploy As Web App

1. In Apps Script, click `Deploy` -> `New deployment`.
2. Choose type `Web app`.
3. Set:
   - `Execute as`: `Me`
   - `Who has access`: `Anyone`
4. Click `Deploy`.
5. Authorize the script when Google asks.
6. Copy the generated Web App URL.

That URL is your webhook/backend endpoint.

## Endpoints

Google Apps Script Web Apps expose a single URL, so this script switches behavior based on the request body.

### 1. Request Access

Send a `POST` request to the Web App URL with:

```json
{
  "action": "request_access",
  "name": "Jane Founder",
  "email": "jane@company.com",
  "whatsapp": "+14155550199",
  "use_case": "Lead sourcing and outbound personalization",
  "created_at": "2026-05-07T12:00:00.000Z"
}
```

Success response:

```json
{
  "success": true
}
```

Failure response example:

```json
{
  "success": false,
  "error": "Missing required fields."
}
```

When successful, the script appends a row with:
- `Status = pending`
- `Access Code = ""`

### 2. Verify Access Code

You can verify in either of these ways.

POST request:

```json
{
  "action": "verify_access_code",
  "access_code": "LOQI-12345"
}
```

Or `GET` request:

```text
https://script.google.com/macros/s/.../exec?access_code=LOQI-12345
```

Success example:

```json
{
  "success": true
}
```

Invalid code example:

```json
{
  "success": false
}
```

## How To Use It In Loqi

For your Next.js app:

- `GOOGLE_SHEETS_WEBHOOK_URL`
  Use the Apps Script Web App URL for access-request submissions.

- `GOOGLE_SHEETS_READ_URL`
  Use the same Apps Script Web App URL if your app verifies with `POST`.
  If you want simple URL-based verification, you can also call the same URL with `?access_code=...`.

If you want the current Loqi backend to work unchanged, set both env vars to the same deployed Apps Script URL.

## Manual Approval Workflow

When a new request comes in, a row is added automatically.

To approve a user:

1. Open the Google Sheet.
2. Find the user's row.
3. Change `Status` from `pending` to `approved`.
4. Enter a value in `Access Code`, for example `LOQI-2026-001`.
5. Send that code to the user manually after payment.

The verification flow will only return `success: true` when:
- `Status` is exactly `approved` ignoring case
- `Access Code` matches the submitted code ignoring case

## Production Notes For MVP

- The script uses `LockService` to avoid row-write collisions during simultaneous submissions.
- Validation is intentionally minimal and lightweight.
- Apps Script does not expose custom HTTP status codes reliably in web app responses, so the JSON body is the primary signal.
- Keep the sheet private and only share editor access with your team.
- If you update the script later, redeploy a new version or update the existing deployment.
