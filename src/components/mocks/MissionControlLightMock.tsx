import React from "react";
import { MockShell, MockTopbar } from "./MockChrome";

const navItems = [
  { id: "dashboard", label: "Mission Control" },
  { id: "explore", label: "Discovery" },
  { id: "campaign", label: "Campaigns" },
  { id: "inbox", label: "Inbox" },
  { id: "database", label: "Knowledge" },
];

const bottomItems = [
  { id: "settings", label: "Settings" },
  { id: "help", label: "Support" },
];

const done = [
  { icon: "explore", label: "Researched 184 companies" },
  { icon: "search", label: "Qualified 31 prospects" },
  { icon: "mail", label: "Drafted 22 emails" },
  { icon: "calendar", label: "Scheduled 3 meetings" },
];

export default function MissionControlLightMock() {
  return (
    <MockShell
      tone="light"
      active="dashboard"
      items={navItems}
      bottom={bottomItems}
      profile={{ name: "ALEXA MORGAN", role: "Chief Executive", initials: "AM" }}
      topbar={<MockTopbar tone="light" title="Briefing" tabs={["Focus", "Archive", "Drafts"]} search="Search briefings..." />}
    >
      <div className="px-8 py-8 max-w-2xl mx-auto space-y-7 overflow-y-auto">
        <p className="text-[19px] leading-snug text-[#1c1b1b]">
          Good morning. While you were away, I reviewed{" "}
          <span className="font-semibold">184 companies</span>, qualified{" "}
          <span className="font-semibold">31 prospects</span>, drafted{" "}
          <span className="font-semibold">22 personalized emails</span>, and
          booked <span className="font-semibold">3 meetings</span>.
        </p>
        <p className="text-[17px] leading-relaxed text-[#1c1b1b]/40">
          Everything is progressing well. There&rsquo;s only one decision
          I&rsquo;d like your help with today.
        </p>

        <section>
          <h4 className="text-[10px] uppercase tracking-[0.15em] text-[#444748] opacity-60 mb-4">
            Today&apos;s Focus
          </h4>
          <div className="space-y-3.5">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded border border-[#747878] flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-2.5 h-2.5 text-[#1c1b1b]">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-[14px] text-[#1c1b1b]">Review Acme AI</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded border border-[#747878] flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-2.5 h-2.5 text-[#1c1b1b]">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-[14px] text-[#1c1b1b]">Approve Healthcare Campaign</span>
            </div>
            <div className="flex items-center gap-3 pt-3.5 border-t border-[#c4c7c7]/40">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3.5 h-3.5 text-[#576660]">
                <circle cx="12" cy="12" r="9" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              <span className="text-[13px] text-[#444748] italic opacity-60">Everything else is on track</span>
            </div>
          </div>
        </section>

        <section>
          <h4 className="text-[10px] uppercase tracking-[0.15em] text-[#444748] opacity-60 mb-4">
            Where I Need You
          </h4>
          <div className="space-y-4">
            {[
              { title: "Acme AI Acquisition Pitch", tags: ["STRATEGIC", "URGENT"], body: "Acme AI has requested a follow-up. Their technology stack aligns with our core 2024 objectives, but their valuation is 15% higher than our last benchmark. I've prepared a counter-memo for your approval." },
              { title: "Healthcare Campaign Launch", tags: ["GROWTH", "Q3 GOAL"], body: "The creative assets for the Midwestern Healthcare rollout are finalized. Performance estimates suggest a 22% increase in high-intent leads if we launch before Friday." },
            ].map((c) => (
              <div key={c.title} className="bg-white rounded-xl p-5 shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-[14px] font-semibold text-[#1c1b1b] mb-2">{c.title}</p>
                    <div className="flex gap-2">
                      {c.tags.map((t) => (
                        <span key={t} className="px-2 py-0.5 bg-[#f1edec] rounded-full text-[9px] text-[#444748]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="bg-black text-white text-[10px] px-3 py-1 rounded-full font-medium">
                    Review
                  </span>
                </div>
                <p className="text-[12px] text-[#444748] leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h4 className="text-[10px] uppercase tracking-[0.15em] text-[#444748] opacity-60 mb-2">
            What I Took Care Of
          </h4>
          <div>
            {done.map((d, i) => (
              <div
                key={d.label}
                className={`flex items-center justify-between py-3 ${i < done.length - 1 ? "border-b border-[#c4c7c7]/40" : ""}`}
              >
                <span className="text-[13px] font-medium text-[#1c1b1b]">{d.label}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3.5 h-3.5 text-[#444748]/30">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#f1edec] rounded-xl p-5 border border-[#c4c7c7]/20">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-2 h-2 bg-black rounded-full animate-pulse" />
            <h4 className="text-[10px] uppercase tracking-[0.15em] text-[#444748] opacity-60">
              Working Right Now
            </h4>
          </div>
          <p className="text-[15px] font-medium text-[#1c1b1b] mb-4">
            Researching Manufacturing Companies...
          </p>
          <div className="flex items-end justify-between mb-1.5">
            <span className="text-[11px] text-[#1c1b1b]">112 / 184 completed</span>
            <span className="text-[10px] text-[#444748]">Estimated: 4m remaining</span>
          </div>
          <div className="w-full h-1 bg-[#e5e2e1] rounded-full overflow-hidden">
            <div className="h-full bg-black w-[60%]" />
          </div>
        </section>
      </div>
    </MockShell>
  );
}