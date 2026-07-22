"use client";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#12141c] via-[#141620] to-[#12141c]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/[0.04] rounded-full blur-3xl animate-pulse-soft" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Copy */}
          <div className="max-w-xl">
            <h1 className="text-display-lg font-semibold text-white mb-6 animate-fade-in-up">
              Outbound,
              <br />
              <span className="gradient-text">without the busywork.</span>
            </h1>

            <p className="text-body-lg text-slate-400 mb-10 animate-fade-in-up-delay leading-relaxed">
              Research prospects, generate personalized outreach, and manage
              campaigns from one intelligent workspace — so your team can
              spend less time on repetitive tasks and more time building
              relationships.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in-up-delay-2">
              <a
                href="/book-demo"
                className="inline-flex items-center px-7 py-3.5 rounded-full bg-accent text-white font-medium text-sm hover:bg-accent-dark transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
              >
                Book a Demo
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>
              <a
                href="#features"
                className="inline-flex items-center px-7 py-3.5 rounded-full border border-slate-700/60 text-slate-300 text-sm hover:border-slate-600 hover:text-white transition-all duration-300"
              >
                Explore Features
              </a>
            </div>
          </div>

          {/* Right — Product mockup (Mission Control) */}
          <div className="hidden lg:block animate-fade-in-up-delay">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/6 via-transparent to-blue-400/3 rounded-3xl blur-[20px]" />
              <div className="relative bg-surface rounded-2xl border border-slate-800/60 overflow-hidden shadow-2xl shadow-black/30">
                {/* Top bar */}
                <div className="flex items-center gap-3 px-5 py-3.5 border-b border-slate-800/40 bg-surface-light/40">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500/60" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                    <div className="w-2 h-2 rounded-full bg-emerald-500/60" />
                  </div>
                  <div className="ml-4 flex items-center gap-2 text-xs text-slate-500">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
                    </svg>
                    <span>Mission Control</span>
                  </div>
                </div>

                {/* Mock dashboard content */}
                <div className="p-5 space-y-4">
                  {/* KPI row */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-surface-light/60 rounded-xl p-3 border border-slate-800/30">
                      <div className="text-[11px] uppercase tracking-wider text-slate-500">Active campaigns</div>
                      <div className="text-xl font-semibold text-white mt-1">4</div>
                    </div>
                    <div className="bg-surface-light/60 rounded-xl p-3 border border-slate-800/30">
                      <div className="text-[11px] uppercase tracking-wider text-slate-500">Leads in pipeline</div>
                      <div className="text-xl font-semibold text-white mt-1">147</div>
                    </div>
                    <div className="bg-surface-light/60 rounded-xl p-3 border border-slate-800/30">
                      <div className="text-[11px] uppercase tracking-wider text-slate-500">Drafts pending</div>
                      <div className="text-xl font-semibold text-white mt-1">12</div>
                    </div>
                  </div>

                  {/* Campaign list */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between bg-surface-light/30 rounded-xl px-4 py-3 border border-slate-800/30">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                        <div>
                          <div className="text-sm text-white font-medium">SaaS Series A Outreach</div>
                          <div className="text-xs text-slate-500 mt-0.5">42 leads · 8 drafts ready</div>
                        </div>
                      </div>
                      <div className="text-xs text-emerald-400">Active</div>
                    </div>
                    <div className="flex items-center justify-between bg-surface-light/30 rounded-xl px-4 py-3 border border-slate-800/30">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                        <div>
                          <div className="text-sm text-white font-medium">Fintech CTO Outreach</div>
                          <div className="text-xs text-slate-500 mt-0.5">28 leads · 3 drafts ready</div>
                        </div>
                      </div>
                      <div className="text-xs text-emerald-400">Active</div>
                    </div>
                    <div className="flex items-center justify-between bg-surface-light/30 rounded-xl px-4 py-3 border border-slate-800/30">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-amber-400" />
                        <div>
                          <div className="text-sm text-white font-medium">DevTools Q3 Campaign</div>
                          <div className="text-xs text-slate-500 mt-0.5">15 leads · awaiting approval</div>
                        </div>
                      </div>
                      <div className="text-xs text-amber-400">Needs review</div>
                    </div>
                  </div>

                  {/* Activity indicator */}
                  <div className="flex items-center gap-3 bg-accent/5 rounded-xl px-4 py-3 border border-accent/10">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <div className="text-xs text-accent-light">
                      Researching 12 new prospects for SaaS campaign
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
