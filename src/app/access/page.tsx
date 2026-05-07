"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { verifyAccessCode } from "@/lib/api";
import {
  ACCESS_CODE_STORAGE_KEY,
  ACCESS_STORAGE_KEY,
  buildTelegramUrl,
} from "@/lib/access";

export default function AccessPage() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const alreadyVerified = window.localStorage.getItem(ACCESS_STORAGE_KEY) === "true";
    if (alreadyVerified) {
      setVerified(true);
      setRedirectUrl(buildTelegramUrl());
    }
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await verifyAccessCode({ code: code.trim() });

      window.localStorage.setItem(ACCESS_STORAGE_KEY, "true");
      window.localStorage.setItem(ACCESS_CODE_STORAGE_KEY, response.code);
      setVerified(true);
      setRedirectUrl(response.redirectUrl);
      window.location.href = response.redirectUrl;
    } catch (verificationError) {
      setError(
        verificationError instanceof Error
          ? verificationError.message
          : "Unable to verify your code right now."
      );
    } finally {
      setLoading(false);
    }
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
              Access Code
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Enter your Loqi access code
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-400">
              Once your team is approved and payment is complete, we&apos;ll send you a code here.
              Enter it below to unlock Telegram onboarding.
            </p>
          </div>

          {verified ? (
            <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-7">
              <h2 className="text-2xl font-semibold text-white">Access unlocked</h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-300">
                Your access code has been approved. Telegram onboarding is ready whenever you are.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button href={redirectUrl || buildTelegramUrl()} variant="accent">
                  Continue to Telegram
                </Button>
                <Button href="/" variant="secondary">
                  Return home
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <label className="block">
                <span className="mb-3 block text-sm font-medium text-slate-200">
                  Access Code
                </span>
                <input
                  type="text"
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  placeholder="Enter your code"
                  className="w-full rounded-2xl border border-slate-800/60 bg-[#11131a] px-5 py-4 text-[15px] uppercase tracking-[0.14em] text-white outline-none transition-colors placeholder:normal-case placeholder:tracking-normal placeholder:text-slate-600 focus:border-slate-600"
                />
              </label>

              {error ? (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              ) : null}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button type="submit" variant="accent" loading={loading}>
                  {loading ? "Verifying" : "Unlock Access"}
                </Button>
                <Button href="/" variant="secondary">
                  Need to request access?
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
