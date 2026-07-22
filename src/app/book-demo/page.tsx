"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";

interface FormState {
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

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  website: "",
  role: "",
  teamSize: "",
  outboundProcess: "",
  idealCustomer: "",
  monthlyVolume: "",
  notes: "",
};

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function BookDemoPage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (fieldErrors[key]) {
      setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  }

  function validate(): boolean {
    const errors: Partial<Record<keyof FormState, string>> = {};

    if (!form.name.trim()) errors.name = "Full name is required.";
    if (!form.email.trim()) errors.email = "Work email is required.";
    else if (!validateEmail(form.email)) errors.email = "Enter a valid email address.";
    if (!form.phone.trim()) errors.phone = "Phone number is required.";
    if (!form.company.trim()) errors.company = "Company name is required.";
    if (!form.role.trim()) errors.role = "Role or job title is required.";
    if (!form.teamSize.trim()) errors.teamSize = "Team size is required.";
    if (!form.outboundProcess.trim()) errors.outboundProcess = "Tell us about your outbound process.";
    if (!form.idealCustomer.trim()) errors.idealCustomer = "Tell us about your ideal customer.";
    if (!form.monthlyVolume.trim()) errors.monthlyVolume = "Approximate monthly volume is required.";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!validate()) return;

    setLoading(true);

    try {
      const response = await fetch("/api/book-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to submit right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[#12141c] px-6 py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-[#12141c] via-[#141620] to-[#12141c]" />
        <div className="absolute left-1/2 top-28 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-blue-600/[0.05] blur-3xl" />

        <div className="relative mx-auto max-w-lg text-center">
          <div className="rounded-[32px] border border-slate-800/70 bg-surface/90 p-8 shadow-2xl shadow-black/40 sm:p-12">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
              <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-white">
              Thanks for reaching out.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-400">
              We have received your request and will get back to you shortly to schedule your demo.
            </p>
            <div className="mt-8">
              <Button href="/" variant="accent">
                Return home
              </Button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#12141c] px-6 py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-[#12141c] via-[#141620] to-[#12141c]" />
      <div className="absolute left-1/2 top-28 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-blue-600/[0.05] blur-3xl" />

      <div className="relative mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Loqi
        </Link>

        <div className="rounded-[32px] border border-slate-800/70 bg-surface/90 p-8 shadow-2xl shadow-black/40 sm:p-12">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-xs uppercase tracking-[0.28em] text-slate-500">
              Book a Demo
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              See Loqi in action
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-400">
              Tell us about your team and outbound process. We will show you
              how Loqi fits into your workflow — no pitch, no pressure.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <InputField
                id="name"
                label="Full Name"
                placeholder="Jane Founder"
                value={form.name}
                onChange={(v) => updateField("name", v)}
                error={fieldErrors.name}
              />
              <InputField
                id="email"
                label="Work Email"
                placeholder="jane@company.com"
                value={form.email}
                onChange={(v) => updateField("email", v)}
                error={fieldErrors.email}
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <InputField
                id="phone"
                label="Phone Number"
                placeholder="+1 415 555 0199"
                value={form.phone}
                onChange={(v) => updateField("phone", v)}
                error={fieldErrors.phone}
              />
              <InputField
                id="company"
                label="Company Name"
                placeholder="Acme Inc."
                value={form.company}
                onChange={(v) => updateField("company", v)}
                error={fieldErrors.company}
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <InputField
                id="website"
                label="Company Website"
                placeholder="acme.com"
                value={form.website}
                onChange={(v) => updateField("website", v)}
              />
              <InputField
                id="role"
                label="Role / Job Title"
                placeholder="Head of Sales"
                value={form.role}
                onChange={(v) => updateField("role", v)}
                error={fieldErrors.role}
              />
            </div>

            <InputField
              id="teamSize"
              label="Team Size"
              placeholder="e.g. 2-5, 10-20, 50+"
              value={form.teamSize}
              onChange={(v) => updateField("teamSize", v)}
              error={fieldErrors.teamSize}
            />

            <label className="block">
              <span className="mb-3 block text-[15px] font-medium text-slate-300">
                Tell us about your outbound process
              </span>
              <textarea
                value={form.outboundProcess}
                onChange={(e) => updateField("outboundProcess", e.target.value)}
                rows={4}
                className="w-full rounded-2xl border border-slate-800/60 bg-[#11131a] px-5 py-4 text-[15px] text-white outline-none transition-colors placeholder:text-slate-600 focus:border-slate-600"
                placeholder="How do you currently source leads, generate outreach, and manage campaigns?"
              />
              {fieldErrors.outboundProcess ? (
                <p className="mt-2 text-sm text-red-400">{fieldErrors.outboundProcess}</p>
              ) : null}
            </label>

            <label className="block">
              <span className="mb-3 block text-[15px] font-medium text-slate-300">
                Who is your ideal customer?
              </span>
              <textarea
                value={form.idealCustomer}
                onChange={(e) => updateField("idealCustomer", e.target.value)}
                rows={3}
                className="w-full rounded-2xl border border-slate-800/60 bg-[#11131a] px-5 py-4 text-[15px] text-white outline-none transition-colors placeholder:text-slate-600 focus:border-slate-600"
                placeholder="Describe your ICP — industry, company size, role, geography, etc."
              />
              {fieldErrors.idealCustomer ? (
                <p className="mt-2 text-sm text-red-400">{fieldErrors.idealCustomer}</p>
              ) : null}
            </label>

            <InputField
              id="monthlyVolume"
              label="Approximate monthly outbound volume"
              placeholder="e.g. 100-500 prospects/month"
              value={form.monthlyVolume}
              onChange={(v) => updateField("monthlyVolume", v)}
              error={fieldErrors.monthlyVolume}
            />

            <label className="block">
              <span className="mb-3 block text-[15px] font-medium text-slate-300">
                Anything else you would like us to know?
              </span>
              <textarea
                value={form.notes}
                onChange={(e) => updateField("notes", e.target.value)}
                rows={3}
                className="w-full rounded-2xl border border-slate-800/60 bg-[#11131a] px-5 py-4 text-[15px] text-white outline-none transition-colors placeholder:text-slate-600 focus:border-slate-600"
                placeholder="Optional — specific questions, integrations needed, timeline, etc."
              />
            </label>

            {error ? (
              <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            ) : null}

            <div className="flex flex-col gap-3 border-t border-slate-800/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-md text-sm leading-relaxed text-slate-500">
                We will reach out within 24-48 hours to schedule your demo.
              </p>
              <Button type="submit" variant="accent" size="md" loading={loading}>
                {loading ? "Submitting" : "Request Demo"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
