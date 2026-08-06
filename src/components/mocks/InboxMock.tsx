import React from "react";
import { MockShell, MockTopbar } from "./MockChrome";

const navItems = [
  { id: "dashboard", label: "Mission Control" },
  { id: "explore", label: "Discovery" },
  { id: "campaign", label: "Campaigns" },
  { id: "inbox", label: "Inbox" },
  { id: "database", label: "Knowledge" },
];

const decisions = [
  {
    title: "Enterprise Pricing Request",
    org: "Aether Systems",
    badge: "PRIORITY",
    summary: "Prospect approved budget, needs pricing for 500 seats. Current quote aligns with Q3 tier-1 targets.",
    decision: "Approve pricing proposal.",
    cta: "Approve & Send",
  },
  {
    title: "Strategic Integration Inquiry",
    org: "Vortex Logistics",
    badge: "$200k ARR",
    summary: "Requesting deep ERP integration via private API. Requires sign-off from Architecture Lead.",
    decision: "Schedule technical bridge call.",
    cta: "Schedule Call",
  },
];

export default function InboxMock() {
  return (
    <MockShell
      tone="dark"
      active="inbox"
      items={navItems}
      topbar={<MockTopbar tone="dark" title="Inbox" tabs={["Directives", "Summaries", "Archive"]} search="Search directives..." />}
    >
      <div className="px-8 py-8 max-w-2xl mx-auto space-y-5">
        <div className="text-center md:text-left mb-6">
          <h1 className="text-[22px] font-medium text-white">Needs Your Judgment</h1>
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#ccc4c9] mt-1">
            3 Conversations
          </p>
        </div>

        {decisions.map((d) => (
          <div
            key={d.title}
            className="bg-[#0f0e0e] rounded-xl p-6 border border-[#4a4549]/30"
          >
            <div className="flex justify-between items-start mb-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#2b2a2a] flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-white">
                    <rect x="3" y="3" width="7" height="7" rx="1.5" />
                    <rect x="14" y="3" width="7" height="7" rx="1.5" />
                    <rect x="3" y="14" width="7" height="7" rx="1.5" />
                    <rect x="14" y="14" width="7" height="7" rx="1.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[14px] font-medium text-white leading-tight">{d.title}</h3>
                  <p className="text-[10px] text-[#ccc4c9] mt-0.5">{d.org}</p>
                </div>
              </div>
              <span
                className={`text-[9px] font-semibold px-2 py-0.5 rounded ${
                  d.badge === "PRIORITY" ? "bg-white text-[#313030]" : "text-white"
                }`}
              >
                {d.badge}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5 border-l-2 border-[#4a4549] pl-5 ml-0.5">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#ccc4c9] block mb-1.5">
                  AI Summary
                </span>
                <p className="text-[12px] leading-relaxed text-[#e6e2e1]">{d.summary}</p>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#ccc4c9] block mb-1.5">
                  Recommended Decision
                </span>
                <p className="text-[14px] italic text-white leading-snug">
                  &ldquo;{d.decision}&rdquo;
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#4a4549]/30">
              <div className="flex gap-2">
                <span className="bg-white text-[#313030] text-[10px] px-4 py-1.5 rounded-full font-medium">
                  {d.cta}
                </span>
                <span className="border border-[#958f93] text-[#e6e2e1] text-[10px] px-4 py-1.5 rounded-full">
                  Edit Draft
                </span>
              </div>
              <span className="text-[10px] text-[#ccc4c9] flex items-center gap-1">
                Review
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3 h-3">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        ))}
      </div>
    </MockShell>
  );
}