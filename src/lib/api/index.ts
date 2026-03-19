const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

// ─── Types ──────────────────────────────────────────────

export interface CreateUserPayload {
  email?: string;
  sell: string;
  reach: string;
}

export interface OnboardingData {
  sell: string;
  reach: string;
  ts: number;
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  role: string;
}

export interface LeadParams {
  query?: string;
  limit?: number;
}

// ─── API Stubs ──────────────────────────────────────────

/**
 * Create a new user.
 * TODO: Connect to real API.
 */
export async function createUser(
  data: CreateUserPayload
): Promise<{ id: string }> {
  console.log(`[API] createUser →`, data);
  // const res = await fetch(`${API_BASE_URL}/users`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(data),
  // });
  // return res.json();
  return { id: "placeholder" };
}

/**
 * Persist onboarding answers.
 * TODO: Connect to real API.
 */
export async function saveOnboardingData(
  data: OnboardingData
): Promise<{ ok: boolean }> {
  console.log(`[API] saveOnboardingData →`, data);
  // const res = await fetch(`${API_BASE_URL}/onboarding`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(data),
  // });
  // return res.json();
  return { ok: true };
}

/**
 * Fetch leads matching the given params.
 * TODO: Connect to real API.
 */
export async function getLeads(params?: LeadParams): Promise<Lead[]> {
  console.log(`[API] getLeads →`, params);
  // const qs = new URLSearchParams(params as Record<string, string>).toString();
  // const res = await fetch(`${API_BASE_URL}/leads?${qs}`);
  // return res.json();
  return [];
}

// Suppress unused-var warning for API_BASE_URL in stub mode
void API_BASE_URL;
