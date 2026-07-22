"use client";

export interface RequestAccessPayload {
  name: string;
  email: string;
  whatsapp: string;
  useCase: string;
}

export interface VerifyAccessCodePayload {
  code: string;
}

export interface DemoRequestPayload {
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  role: string;
  teamSize: string;
  outboundProcess: string;
  idealCustomer: string;
  monthlyVolume: string;
  notes: string;
}

export interface ApiErrorShape {
  error?: string;
  details?: Record<string, string>;
}

async function parseJson<T>(response: Response): Promise<T> {
  const data = (await response.json().catch(() => null)) as T | ApiErrorShape | null;

  if (!response.ok) {
    const message =
      (data as ApiErrorShape | null)?.error ?? "Something went wrong. Please try again.";
    throw Object.assign(new Error(message), {
      details: (data as ApiErrorShape | null)?.details,
    });
  }

  return data as T;
}

export async function requestAccess(data: RequestAccessPayload): Promise<{ ok: true }> {
  const response = await fetch("/api/request-access", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return parseJson<{ ok: true }>(response);
}

export async function verifyAccessCode(
  data: VerifyAccessCodePayload
): Promise<{ ok: true; redirectUrl: string; code: string }> {
  const response = await fetch("/api/verify-access-code", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return parseJson<{ ok: true; redirectUrl: string; code: string }>(response);
}

export async function submitDemoRequest(data: DemoRequestPayload): Promise<{ ok: true }> {
  const response = await fetch("/api/book-demo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return parseJson<{ ok: true }>(response);
}
