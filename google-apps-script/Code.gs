const SHEET_NAME = "Loqi Access";

function doPost(e) {
  try {
    const payload = parseJsonBody_(e);
    const action = getAction_(payload);

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
      },
      400
    );
  } catch (error) {
    return jsonResponse_(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unexpected server error.",
      },
      500
    );
  }
}

function doGet(e) {
  try {
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
    return jsonResponse_(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unexpected server error.",
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

  try {
    const sheet = getOrCreateSheet_();
    ensureHeaderRow_(sheet);

    sheet.appendRow([
      createdAt,
      name,
      email.toLowerCase(),
      whatsapp,
      useCase,
      "pending",
      "",
    ]);
  } finally {
    lock.releaseLock();
  }

  return jsonResponse_({ success: true }, 200);
}

function handleVerifyAccessCode_(payload) {
  const accessCode = sanitizeString_(payload.access_code);

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
  if (!normalizedInput) return false;

  const sheet = getOrCreateSheet_();
  ensureHeaderRow_(sheet);

  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return false;

  const values = sheet.getRange(2, 1, lastRow - 1, 7).getValues();

  for (var i = 0; i < values.length; i += 1) {
    const row = values[i];
    const status = normalizeString_(row[5]);
    const code = normalizeString_(row[6]);

    if (status === "approved" && code === normalizedInput) {
      return true;
    }
  }

  return false;
}

function getOrCreateSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) {
    throw new Error("This script must be bound to a Google Sheet.");
  }

  const sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (sheet) return sheet;

  return spreadsheet.insertSheet(SHEET_NAME);
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
    return JSON.parse(e.postData.contents);
  } catch (_error) {
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
