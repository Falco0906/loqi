const SHEET_ID = "REPLACE_WITH_YOUR_GOOGLE_SHEET_ID";
const SHEET_NAME = "Loqi Access";

function doPost(e) {
  try {
    Logger.log("doPost received event: %s", safeStringify_(e));
    const payload = parseJsonBody_(e);
    Logger.log("Parsed request body: %s", safeStringify_(payload));

    const action = getAction_(payload);
    Logger.log("Selected action: %s", action);

    if (action === "request_access") {
      return handleRequestAccess_(payload);
    }

    if (action === "verify_access_code") {
      return handleVerifyAccessCode_(payload);
    }

    return jsonResponse_(
      {
        success: false,
        error: "Unsupported action.",
        action: action || null,
      },
      400
    );
  } catch (error) {
    logError_("doPost", error);
    return jsonResponse_(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unexpected server error.",
        stack: getErrorStack_(error),
      },
      500
    );
  }
}

function doGet(e) {
  try {
    Logger.log("doGet received event: %s", safeStringify_(e));
    const accessCode = getParam_(e, "access_code");

    if (!accessCode) {
      return jsonResponse_(
        {
          success: false,
          error: "Missing access_code.",
        },
        400
      );
    }

    const isApproved = isApprovedAccessCode_(accessCode);
    return jsonResponse_({ success: isApproved }, 200);
  } catch (error) {
    logError_("doGet", error);
    return jsonResponse_(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unexpected server error.",
        stack: getErrorStack_(error),
      },
      500
    );
  }
}

function handleRequestAccess_(payload) {
  const name = sanitizeString_(payload.name);
  const email = sanitizeString_(payload.email);
  const whatsapp = sanitizeString_(payload.whatsapp);
  const useCase = sanitizeString_(payload.use_case);
  const createdAt = sanitizeString_(payload.created_at) || new Date().toISOString();

  if (!name || !email || !whatsapp || !useCase) {
    return jsonResponse_(
      {
        success: false,
        error: "Missing required fields.",
      },
      400
    );
  }

  if (!isValidEmail_(email)) {
    return jsonResponse_(
      {
        success: false,
        error: "Invalid email format.",
      },
      400
    );
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(5000);
  Logger.log("Acquired script lock for request_access");

  try {
    const sheet = getSheet_();
    ensureHeaderRow_(sheet);
    Logger.log("About to append row to sheet '%s'", sheet.getName());

    const row = [
      createdAt,
      name,
      email.toLowerCase(),
      whatsapp,
      useCase,
      "pending",
      "",
    ];

    Logger.log("appendRow payload: %s", safeStringify_(row));
    sheet.appendRow(row);
    SpreadsheetApp.flush();
    Logger.log("appendRow executed successfully. Last row is now: %s", sheet.getLastRow());
  } finally {
    lock.releaseLock();
    Logger.log("Released script lock for request_access");
  }

  return jsonResponse_({ success: true }, 200);
}

function handleVerifyAccessCode_(payload) {
  const accessCode = sanitizeString_(payload.access_code);
  Logger.log("handleVerifyAccessCode_ received access code: %s", accessCode);

  if (!accessCode) {
    return jsonResponse_(
      {
        success: false,
        error: "Missing access_code.",
      },
      400
    );
  }

  const isApproved = isApprovedAccessCode_(accessCode);
  return jsonResponse_({ success: isApproved }, 200);
}

function isApprovedAccessCode_(accessCode) {
  const normalizedInput = normalizeString_(accessCode);
  Logger.log("Normalized access code input: %s", normalizedInput);
  if (!normalizedInput) return false;

  const sheet = getSheet_();
  ensureHeaderRow_(sheet);
  Logger.log("Verification using sheet: %s", sheet.getName());

  const lastRow = sheet.getLastRow();
  Logger.log("Verification lastRow: %s", lastRow);
  if (lastRow < 2) return false;

  const values = sheet.getRange(2, 1, lastRow - 1, 7).getValues();
  Logger.log("Fetched rows for verification: %s", safeStringify_(values));

  for (var i = 0; i < values.length; i += 1) {
    const row = values[i];
    const status = normalizeString_(row[5]);
    const code = normalizeString_(row[6]);
    Logger.log(
      "Checking row %s with status='%s' and code='%s'",
      i + 2,
      status,
      code
    );

    if (status === "approved" && code === normalizedInput) {
      Logger.log("Matched approved row at sheet row %s: %s", i + 2, safeStringify_(row));
      Logger.log("Verification result: true");
      return true;
    }
  }

  Logger.log("No approved matching row found for access code: %s", normalizedInput);
  Logger.log("Verification result: false");
  return false;
}

function getSheet_() {
  if (!SHEET_ID || SHEET_ID === "REPLACE_WITH_YOUR_GOOGLE_SHEET_ID") {
    throw new Error("SHEET_ID is not configured in Code.gs.");
  }

  Logger.log("Opening spreadsheet by ID: %s", SHEET_ID);
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  Logger.log("Opened spreadsheet: %s", spreadsheet.getName());

  const sheet = spreadsheet.getSheetByName(SHEET_NAME);
  Logger.log("Sheet '%s' exists: %s", SHEET_NAME, !!sheet);
  if (!sheet) {
    throw new Error("Sheet 'Loqi Access' was not found. Create it before deploying.");
  }

  return sheet;
}

function ensureHeaderRow_(sheet) {
  const headers = [
    "Timestamp",
    "Name",
    "Email",
    "WhatsApp",
    "Use Case",
    "Status",
    "Access Code",
  ];

  const firstRow = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  const needsHeaders = headers.some(function(header, index) {
    return firstRow[index] !== header;
  });

  if (needsHeaders) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
  }
}

function parseJsonBody_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error("Missing request body.");
  }

  try {
    Logger.log("Raw POST body: %s", e.postData.contents);
    return JSON.parse(e.postData.contents);
  } catch (error) {
    logError_("parseJsonBody_", error);
    throw new Error("Invalid JSON body.");
  }
}

function getAction_(payload) {
  const explicitAction = sanitizeString_(payload.action);
  if (explicitAction) return explicitAction;

  if ("access_code" in payload) {
    return "verify_access_code";
  }

  if ("name" in payload || "email" in payload || "use_case" in payload) {
    return "request_access";
  }

  return "";
}

function getParam_(e, key) {
  if (!e || !e.parameter) return "";
  return sanitizeString_(e.parameter[key]);
}

function sanitizeString_(value) {
  return String(value || "").trim();
}

function normalizeString_(value) {
  return sanitizeString_(value).toLowerCase();
}

function isValidEmail_(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function jsonResponse_(payload, statusCode) {
  const output = ContentService.createTextOutput(JSON.stringify(payload));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

function safeStringify_(value) {
  try {
    return JSON.stringify(value);
  } catch (_error) {
    return String(value);
  }
}

function getErrorStack_(error) {
  if (error && error.stack) {
    return String(error.stack);
  }
  return String(error);
}

function logError_(label, error) {
  Logger.log("%s error message: %s", label, error && error.message ? error.message : String(error));
  Logger.log("%s error stack: %s", label, getErrorStack_(error));
}
