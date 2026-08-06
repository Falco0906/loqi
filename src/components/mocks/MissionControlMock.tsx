import React from "react";
import { MockShell, MockTopbar } from "./MockChrome";

const navItems = [
  { id: "dashboard", label: "Mission Control" },
  { id: "explore", label: "Discovery" },
  { id: "campaign", label: "Campaigns" },
  { id: "inbox", label: "Inbox" },
  { id: "database", label: "Knowledge" },
];

export default function MissionControlMock() {
  return (
    <MockShell
      active="dashboard"
      items={navItems}
      topbar={<MockTopbar title="Briefing" tabs={["Focus", "Archive", "Drafts"]} search="Search briefings..." />}
    >
      <div className="px-8 py-8 max-w-2xl mx-auto space-y-8">
        {/* Briefing message */}
        <p className="text-[17px] leading-relaxed text-[#e6e2e1]">
          Good morning. While you were away, I reviewed 184 companies,
          qualified 31 prospects, drafted 22 personalized emails, and booked
          3 meetings.
        </p>
        <p className="text-[17px] leading-relaxed text-[#e6e2e1]/40">
          Everything is progressing well. There is only one decision I need
          your help with today.
        </p>

        {/* Today's Focus */}
        <section>
          <h4 className="text-[10px] uppercase tracking-[0.15em] text-[#ccc4c9] opacity-60 mb-4">
            Today&apos;s Focus
          </h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded border border-[#958f93] flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-2.5 h-2.5 text-white">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-[14px] text-[#e6e2e1]">Review Acme AI</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded border border-[#958f93]" />
              <span className="text-[14px] text-[#e6e2e1]">Approve Healthcare Campaign</span>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-[#4a4549]/10">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3.5 h-3.5 text-[#ccc4c9]">
                <circle cx="12" cy="12" r="9" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              <span className="text-[13px] text-[#ccc4c9] italic opacity-60">Everything else is on track</span>
            </div>
          </div>
        </section>

        {/* Where I Need You */}
        <section>
          <h4 className="text-[10px] uppercase tracking-[0.15em] text-[#ccc4c9] opacity-60 mb-4">
            Where I Need You
          </h4>
          <div className="space-y-4">
            {[
              { title: "Acme AI Acquisition Pitch", tags: ["STRATEGIC", "URGENT"] },
              { title: "Healthcare Campaign Launch", tags: ["GROWTH", "Q3 GOAL"] },
            ].map((c) => (
              <div key={c.title} className="bg-[#201f1f] rounded-xl p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-[14px] font-medium text-[#e6e2e1] mb-2">{c.title}</p>
                    <div className="flex gap-2">
                      {c.tags.map((t) => (
                        <span key={t} className="px-2 py-0.5 bg-[#2b2a2a] rounded-full text-[9px] text-[#ccc4c9]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="bg-white text-[#313030] text-[10px] px-3 py-1 rounded-full font-medium">
                    Review
                  </span>
                </div>
                <p className="text-[12px] text-[#ccc4c9] leading-relaxed">
                  I have prepared a counter-memo for your approval. Their stack
                  aligns with our 2024 objectives, but valuation is 15% higher
                  than our last benchmark.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Working Right Now */}
        <section className="bg-[#2b2a2a] rounded-xl p-5">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <h4 className="text-[10px] uppercase tracking-[0.15em] text-[#ccc4c9]">
              Working Right Now
            </h4>
          </div>
          <p className="text-[15px] font-medium text-[#e6e2e1] mb-4">
            Researching Manufacturing Companies...
          </p>
          <div className="flex items-end justify-between mb-1.5">
            <span className="text-[11px] text-[#e6e2e1]">112 / 184 completed</span>
            <span className="text-[10px] text-[#ccc4c9]">Estimated: 4m remaining</span>
          </div>
          <div className="w-full h-1 bg-[#363434] rounded-full overflow-hidden">
            <div className="h-full bg-white w-[60%]" />
          </div>
        </section>
      </div>
    </MockShell>
  );
}