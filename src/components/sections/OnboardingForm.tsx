"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import RequestAccessModal from "@/components/ui/RequestAccessModal";
import { ACCESS_STORAGE_KEY, buildTelegramUrl } from "@/lib/access";

export default function OnboardingForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const syncAccessState = () => {
      setIsUnlocked(window.localStorage.getItem(ACCESS_STORAGE_KEY) === "true");
    };

    syncAccessState();
    window.addEventListener("focus", syncAccessState);
    return () => window.removeEventListener("focus", syncAccessState);
  }, []);

  return (
    <section id="start" className="relative px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[32px] border border-slate-800/60 bg-surface-light/40 p-8 shadow-2xl shadow-black/25 backdrop-blur-md sm:p-12 lg:p-14">
          <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-slate-600/60 to-transparent" />
          <div className="absolute -right-24 top-10 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute -left-20 bottom-0 h-52 w-52 rounded-full bg-slate-500/10 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="animate-on-scroll">
              <p className="mb-4 text-xs uppercase tracking-[0.26em] text-slate-500">
                Limited rollout
              </p>
              <h2 className="max-w-2xl text-display-sm font-semibold text-white">
                Join Loqi through our early-access onboarding
              </h2>
              <p className="mt-5 max-w-2xl text-body-lg leading-relaxed text-slate-400">
                We&apos;re onboarding teams manually for now so every Loqi setup stays
                thoughtful, high-signal, and hands-on from the first conversation.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  type="button"
                  variant="accent"
                  onClick={() => setIsModalOpen(true)}
                >
                  Request Access
                </Button>
                <Button href="/access" variant="secondary">
                  Enter Access Code
                </Button>
              </div>

              {isUnlocked ? (
                <div className="mt-6 flex flex-col gap-3 rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-emerald-300">Access unlocked</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-300">
                      Your code is approved. Telegram onboarding is ready.
                    </p>
                  </div>
                  <Button href={buildTelegramUrl()} variant="accent">
                    Continue to Telegram
                  </Button>
                </div>
              ) : (
                <p className="mt-6 max-w-xl text-sm leading-relaxed text-slate-500">
                  After approval and payment, we&apos;ll send you an access code that unlocks
                  Telegram onboarding on this site.
                </p>
              )}
            </div>

            <div className="animate-on-scroll">
              <div className="rounded-[28px] border border-slate-800/60 bg-[#141722] p-6 sm:p-7">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">How access works</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">
                      Four-step rollout
                    </p>
                  </div>
                  <div className="rounded-full border border-slate-700/60 px-3 py-1 text-xs text-slate-400">
                    Human-reviewed
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    "Request access and share your team details.",
                    "We reach out, demo Loqi, and confirm fit.",
                    "After payment, we send your access code.",
                    "Enter the code and unlock Telegram onboarding.",
                  ].map((step, index) => (
                    <div
                      key={step}
                      className="flex items-start gap-4 rounded-2xl border border-slate-800/50 bg-surface/70 px-4 py-4"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/15 text-sm font-semibold text-accent-light">
                        {index + 1}
                      </div>
                      <p className="text-sm leading-relaxed text-slate-300">{step}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-slate-800/50 bg-surface px-4 py-4">
                  <p className="text-sm leading-relaxed text-slate-400">
                    Need help or already spoke with the team? Head to{" "}
                    <Link href="/access" className="text-accent-light transition-colors hover:text-white">
                      Enter Access Code
                    </Link>{" "}
                    to unlock your account.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RequestAccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
