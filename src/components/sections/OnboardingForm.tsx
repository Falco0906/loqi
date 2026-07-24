"use client";

import Button from "@/components/ui/Button";

export default function OnboardingForm() {
  return (
    <section id="start" className="relative px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[32px] border border-border bg-surface-light/40 p-8 shadow-2xl shadow-black/25 backdrop-blur-md sm:p-12 lg:p-14">
          <div className="absolute inset-x-10 top-0 h-px bg-border" />

          <div className="absolute -left-20 bottom-0 h-52 w-52 rounded-full bg-slate-500/10 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="animate-on-scroll">
              <p className="mb-4 text-xs uppercase tracking-[0.26em] text-tertiary">
                See it in action
              </p>
              <h2 className="max-w-2xl text-display-sm font-semibold text-foreground">
                Book a personalized demo
              </h2>
              <p className="mt-5 max-w-2xl text-body-lg leading-relaxed text-secondary">
                We will show you how Loqi researches prospects,
                generate personalized outreach, and run your campaigns —
                all reviewed and approved by you.
              </p>

              <div className="mt-8">
                <Button href="/book-demo" variant="primary" size="md">
                  Book a Demo
                </Button>
              </div>

              <p className="mt-6 max-w-xl text-sm leading-relaxed text-tertiary">
                No commitment. No sales pitch. Just a walkthrough of how
                Loqi fits into your outbound workflow.
              </p>
            </div>

            <div className="animate-on-scroll">
              <div className="rounded-[28px] border border-border bg-surface p-6 sm:p-7">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">What to expect</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-tertiary">
                      Demo overview
                    </p>
                  </div>
                  <div className="rounded-full border border-border px-3 py-1 text-xs text-secondary">
                    30 minutes
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    "Walkthrough of the workspace and how outbound workflows operate.",
                    "See lead discovery, enrichment, and personalized drafting in action.",
                    "Review the approval workflow and campaign management interface.",
                    "Q&A about how Loqi fits your specific outbound process.",
                  ].map((step, index) => (
                    <div
                      key={step}
                      className="flex items-start gap-4 rounded-2xl border border-border bg-surface/70 px-4 py-4"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/15 text-sm font-semibold text-accent">
                        {index + 1}
                      </div>
                      <p className="text-sm leading-relaxed text-secondary">{step}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-border bg-surface px-4 py-4">
                  <p className="text-sm leading-relaxed text-secondary">
                    Already spoke with the team?{" "}
                    <a href="/book-demo" className="text-accent transition-colors hover:text-foreground">
                      Book a demo
                    </a>{" "}
                    and we will pick up where we left off.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
