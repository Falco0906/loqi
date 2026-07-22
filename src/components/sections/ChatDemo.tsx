"use client";

const features = [
  {
    title: "Lead Discovery",
    description:
      "Search across providers to find prospects matching your ideal customer profile. Enriched with company data, role info, and buying signals.",
    mockup: (
      <div className="bg-surface-light/30 rounded-xl border border-slate-800/30 p-4 space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-800/20">
          <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <span className="text-xs text-slate-400">Searching for: SaaS CTOs, Series A, US</span>
        </div>
        <div className="space-y-2">
          {[
            { name: "Alex Chen", title: "CTO, ScaleFlow", match: "94%" },
            { name: "Maria Santos", title: "VP Eng, Finova", match: "91%" },
            { name: "Dev Patel", title: "CTO, DevStream", match: "88%" },
          ].map((lead) => (
            <div key={lead.name} className="flex items-center justify-between bg-surface/50 rounded-lg px-3 py-2">
              <div>
                <div className="text-sm text-white">{lead.name}</div>
                <div className="text-xs text-slate-500">{lead.title}</div>
              </div>
              <div className="text-xs text-emerald-400">{lead.match}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Draft Review",
    description:
      "Every message is generated uniquely for each prospect — context-aware, personalized, and ready for your review. Edit, approve, or ask the AI to refine.",
    mockup: (
      <div className="bg-surface-light/30 rounded-xl border border-slate-800/30 p-4 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800/20">
          <div className="text-xs text-slate-400">To: Alex Chen, CTO at ScaleFlow</div>
          <span className="text-[10px] text-amber-400 px-2 py-0.5 rounded-full bg-amber-400/10">Draft</span>
        </div>
        <div className="text-sm text-slate-300 leading-relaxed">
          <div className="text-xs text-slate-500 mb-1">Subject:</div>
          <div className="text-white font-medium mb-2">Thoughts on PLG infrastructure at ScaleFlow</div>
          <div className="text-xs text-slate-500 mb-1">Body:</div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Hey Alex &mdash; came across ScaleFlow&apos;s approach to developer-first deployment. Noticed you recently expanded the team...
          </p>
        </div>
        <div className="flex items-center gap-2 pt-1">
          <div className="text-[10px] px-2 py-1 rounded bg-accent/10 text-accent-light">Approve</div>
          <div className="text-[10px] px-2 py-1 rounded bg-surface-higher text-slate-400">Edit</div>
          <div className="text-[10px] px-2 py-1 rounded bg-surface-higher text-slate-400">Ask AI</div>
        </div>
      </div>
    ),
  },
  {
    title: "Campaign Workspace",
    description:
      "Create and manage multiple campaigns from a single view. Track lead progress, approval status, and campaign health in real time.",
    mockup: (
      <div className="bg-surface-light/30 rounded-xl border border-slate-800/30 p-4 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800/20">
          <span className="text-xs text-white font-medium">Q3 Outreach Campaigns</span>
          <span className="text-[10px] text-emerald-400">4 active</span>
        </div>
        <div className="space-y-2">
          {[
            { name: "SaaS Series A", leads: 42, drafts: 8, status: "active" },
            { name: "Fintech CTO", leads: 28, drafts: 3, status: "active" },
            { name: "DevTools Q3", leads: 15, drafts: 0, status: "review" },
          ].map((camp) => (
            <div key={camp.name} className="flex items-center justify-between bg-surface/50 rounded-lg px-3 py-2">
              <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${camp.status === "active" ? "bg-emerald-400" : "bg-amber-400"}`} />
                <div>
                  <div className="text-sm text-white">{camp.name}</div>
                  <div className="text-xs text-slate-500">{camp.leads} leads · {camp.drafts} drafts</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Campaign Intelligence",
    description:
      "See which messages land, which replies convert, and what your AI is learning. Surface insights to improve every campaign.",
    mockup: (
      <div className="bg-surface-light/30 rounded-xl border border-slate-800/30 p-4 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800/20">
          <span className="text-xs text-white font-medium">Performance</span>
          <span className="text-[10px] text-slate-500">Last 30 days</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-surface/50 rounded-lg p-2 text-center">
            <div className="text-lg text-white font-semibold">24%</div>
            <div className="text-[10px] text-slate-500">Reply rate</div>
          </div>
          <div className="bg-surface/50 rounded-lg p-2 text-center">
            <div className="text-lg text-white font-semibold">89</div>
            <div className="text-[10px] text-slate-500">Sent</div>
          </div>
          <div className="bg-surface/50 rounded-lg p-2 text-center">
            <div className="text-lg text-white font-semibold">4</div>
            <div className="text-[10px] text-slate-500">Meetings</div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-accent-light">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625z" />
          </svg>
          <span>CTO subject lines performing 2x better than CEO</span>
        </div>
      </div>
    ),
  },
];

export default function ChatDemo() {
  return (
    <section id="features" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-on-scroll">
          <p className="text-sm uppercase tracking-widest text-accent-light/70 mb-4 font-medium">
            The workspace
          </p>
          <h2 className="text-display-sm font-semibold text-white">
            Everything you need to run outbound
          </h2>
          <p className="text-body text-slate-500 mt-4 max-w-2xl mx-auto">
            Not a chat. A full AI-native workspace. Discovery, drafting,
            campaign management, and intelligence — all in one place.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 stagger-children">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-surface rounded-2xl border border-slate-800/40 p-6 hover:border-slate-700/60 transition-all duration-500 group"
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-5">
                {feature.description}
              </p>
              {feature.mockup}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
