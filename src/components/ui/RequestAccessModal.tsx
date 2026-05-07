"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { requestAccess } from "@/lib/api";

interface RequestAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormState {
  name: string;
  email: string;
  whatsapp: string;
  useCase: string;
}

const initialState: FormState = {
  name: "",
  email: "",
  whatsapp: "",
  useCase: "",
};

export default function RequestAccessModal({
  isOpen,
  onClose,
}: RequestAccessModalProps) {
  const [render, setRender] = useState(isOpen);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<FormState>(initialState);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  useEffect(() => {
    if (isOpen) {
      setRender(true);
      const frame = requestAnimationFrame(() => setShow(true));
      return () => cancelAnimationFrame(frame);
    }

    setShow(false);
    const timer = setTimeout(() => setRender(false), 150);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!render) return null;

  function validate() {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};

    if (!form.name.trim()) nextErrors.name = "Full name is required.";
    if (!form.email.trim()) {
      nextErrors.email = "Work email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!form.whatsapp.trim()) nextErrors.whatsapp = "WhatsApp number is required.";
    if (!form.useCase.trim()) nextErrors.useCase = "Tell us how Loqi can help.";

    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function resetAndClose() {
    setSubmitted(false);
    setError("");
    setFieldErrors({});
    setForm(initialState);
    onClose();
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!validate()) return;

    setLoading(true);

    try {
      await requestAccess({
        name: form.name.trim(),
        email: form.email.trim(),
        whatsapp: form.whatsapp.trim(),
        useCase: form.useCase.trim(),
      });
      setSubmitted(true);
    } catch (submissionError) {
      const message =
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to submit right now.";
      const details =
        submissionError instanceof Error &&
        "details" in submissionError &&
        typeof submissionError.details === "object"
          ? (submissionError.details as Partial<Record<keyof FormState, string>>)
          : undefined;

      if (details) {
        setFieldErrors(details);
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setFieldErrors((current) => ({ ...current, [key]: undefined }));
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-opacity duration-150 ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className="absolute inset-0 bg-[#0a0a0f]/85 backdrop-blur-sm"
        onClick={resetAndClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        className={`relative w-full max-w-2xl rounded-[28px] border border-slate-800/80 bg-[#171922] shadow-2xl shadow-black/70 transition-all duration-150 ${
          show ? "translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-95 opacity-0"
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="border-b border-slate-800/70 px-6 py-5 sm:px-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.22em] text-slate-500">
                Early Access
              </p>
              <h2 className="text-2xl font-semibold text-white sm:text-[30px]">
                Request access to Loqi
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-[15px]">
                Tell us a bit about your team and workflow. We&apos;ll reach out,
                walk you through Loqi, and share an access code once you&apos;re approved.
              </p>
            </div>

            <button
              type="button"
              onClick={resetAndClose}
              className="rounded-full border border-slate-700/60 p-2 text-slate-400 transition-colors hover:text-white"
              aria-label="Close request access modal"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
        </div>

        <div className="px-6 py-6 sm:px-8 sm:py-8">
          {submitted ? (
            <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-6 text-center sm:p-8">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">Request received</h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-300">
                Thanks — we&apos;ll reach out shortly regarding access.
              </p>
              <div className="mt-6">
                <Button type="button" variant="accent" onClick={resetAndClose}>
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-3 block text-sm font-medium text-slate-200">
                    Full Name
                  </span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    className="w-full rounded-2xl border border-slate-800/60 bg-[#11131a] px-5 py-4 text-[15px] text-white outline-none transition-colors placeholder:text-slate-600 focus:border-slate-600"
                    placeholder="Jane Founder"
                  />
                  {fieldErrors.name ? (
                    <p className="mt-2 text-sm text-red-400">{fieldErrors.name}</p>
                  ) : null}
                </label>

                <label className="block">
                  <span className="mb-3 block text-sm font-medium text-slate-200">
                    Work Email
                  </span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    className="w-full rounded-2xl border border-slate-800/60 bg-[#11131a] px-5 py-4 text-[15px] text-white outline-none transition-colors placeholder:text-slate-600 focus:border-slate-600"
                    placeholder="jane@company.com"
                  />
                  {fieldErrors.email ? (
                    <p className="mt-2 text-sm text-red-400">{fieldErrors.email}</p>
                  ) : null}
                </label>
              </div>

              <label className="block">
                <span className="mb-3 block text-sm font-medium text-slate-200">
                  WhatsApp Number
                </span>
                <input
                  type="tel"
                  value={form.whatsapp}
                  onChange={(event) => updateField("whatsapp", event.target.value)}
                  className="w-full rounded-2xl border border-slate-800/60 bg-[#11131a] px-5 py-4 text-[15px] text-white outline-none transition-colors placeholder:text-slate-600 focus:border-slate-600"
                  placeholder="+1 415 555 0199"
                />
                {fieldErrors.whatsapp ? (
                  <p className="mt-2 text-sm text-red-400">{fieldErrors.whatsapp}</p>
                ) : null}
              </label>

              <label className="block">
                <span className="mb-3 block text-sm font-medium text-slate-200">
                  What do you want Loqi to help with?
                </span>
                <textarea
                  value={form.useCase}
                  onChange={(event) => updateField("useCase", event.target.value)}
                  rows={5}
                  className="w-full rounded-2xl border border-slate-800/60 bg-[#11131a] px-5 py-4 text-[15px] text-white outline-none transition-colors placeholder:text-slate-600 focus:border-slate-600"
                  placeholder="Lead sourcing, outbound personalization, inbox follow-up, or your full outbound workflow."
                />
                {fieldErrors.useCase ? (
                  <p className="mt-2 text-sm text-red-400">{fieldErrors.useCase}</p>
                ) : null}
              </label>

              {error ? (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              ) : null}

              <div className="flex flex-col gap-3 border-t border-slate-800/60 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-md text-sm leading-relaxed text-slate-500">
                  We review each request manually so Loqi stays high-touch while access is limited.
                </p>
                <Button type="submit" variant="accent" size="md" loading={loading}>
                  {loading ? "Submitting" : "Request Access"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
