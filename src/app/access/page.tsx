"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";

export default function AccessPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background px-6 py-24">
      <div className="absolute inset-0 bg-background" />


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
          <div className="max-w-2xl">
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Loqi has evolved
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-400">
              The Telegram-based product is no longer available. Loqi is now
              an AI-native outbound workspace — accessible through your browser.
            </p>
            <p className="mt-3 text-base leading-relaxed text-slate-400">
              If you are an existing customer or were previously invited,
              please reach out and we will help you transition.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/book-demo" variant="primary">
              Book a Demo
            </Button>
            <Button href="/" variant="secondary">
              Return home
            </Button>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-800/50 bg-surface px-4 py-4">
            <p className="text-sm leading-relaxed text-slate-400">
              Need help? Email us at{" "}
              <a href="mailto:founder@tryloqi.com" className="text-accent-light transition-colors hover:text-white">
                founder@tryloqi.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
