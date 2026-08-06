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
    badgeClass: "bg-black text-white",
    summary: "Prospect approved budget, needs pricing for 500 seats. Current quote aligns with Q3 tier-1 targets.",
    decision: "Approve pricing proposal.",
    cta: "Approve & Send",
    icon: "M3 21V9l9-6 9 6v12H13v-6h-2v6H3z",
  },
  {
    title: "Strategic Integration Inquiry",
    org: "Vortex Logistics",
    badge: "$200k ARR",
    badgeClass: "text-[#3c4a44]",
    summary: "Requesting deep ERP integration via private API. Requires sign-off from Architecture Lead.",
    decision: "Schedule technical bridge call.",
    cta: "Schedule Call",
    icon: "M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z",
  },
];

const handled = [
  { label: "Scheduled demo with Acme Corp", time: "12m ago" },
  { label: "Answered FAQ for Delta Lab", time: "1h ago" },
  { label: "Updated CRM records for 4 leads", time: "2h ago" },
];

export default function InboxLightMock() {
  return (
    <MockShell
      tone="light"
      active="inbox"
      items={navItems}
      profile={{ name: "LOQI AI", role: "Chief of Staff", initials: "LO" }}
      topbar={<MockTopbar tone="light" title="Inbox" tabs={["Directives", "Summaries", "Archive"]} search="Search directives..." />}
    >
      <div className="px-8 py-8 max-w-2xl mx-auto space-y-5">
        <div className="text-center md:text-left mb-6">
          <h1 className="text-[22px] font-medium text-[#1c1b1b]">Needs Your Judgment</h1>
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#868382] mt-1">
            3 Conversations
          </p>
        </div>

        {decisions.map((d) => (
          <div
            key={d.title}
            className="bg-white rounded-xl p-6 border border-[#c4c7c7]/30 shadow-[0_4px_12px_rgba(0,0,0,0.03)]"
          >
            <div className="flex justify-between items-start mb-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#d3e3dc] flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#576660]">
                    <path d={d.icon} />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[14px] font-semibold text-[#1c1b1b] leading-tight">{d.title}</h3>
                  <p className="text-[10px] text-[#868382] mt-0.5">{d.org}</p>
                </div>
              </div>
              <span className={`text-[9px] font-semibold px-2 py-0.5 rounded ${d.badgeClass}`}>
                {d.badge}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5 border-l-2 border-[#c4c7c7]/40 pl-5 ml-0.5">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#868382] block mb-1.5">
                  AI Summary
                </span>
                <p className="text-[12px] leading-relaxed text-[#1c1b1b]">{d.summary}</p>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#868382] block mb-1.5">
                  Recommended Decision
                </span>
                <p className="text-[14px] italic text-[#1c1b1b] leading-snug">
                  &ldquo;{d.decision}&rdquo;
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#c4c7c7]/30">
              <div className="flex gap-2">
                <span className="bg-black text-white text-[10px] px-4 py-1.5 rounded-full font-medium">
                  {d.cta}
                </span>
                <span className="border border-[#c4c7c7] text-[#1c1b1b] text-[10px] px-4 py-1.5 rounded-full">
                  Edit Draft
                </span>
              </div>
              <span className="text-[10px] text-[#444748] flex items-center gap-1">
                Join Conversation
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3 h-3">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        ))}

        <section className="pt-4">
          <h4 className="text-[9px] uppercase tracking-widest text-[#868382] mb-3 border-b border-[#c4c7c7]/30 pb-2">
            Handled Automatically
          </h4>
          <div>
            {handled.map((h, i) => (
              <div
                key={h.label}
                className={`flex items-center justify-between py-2.5 ${i < handled.length - 1 ? "border-b border-[#c4c7c7]/20" : ""}`}
              >
                <div className="flex items-center gap-2.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3.5 h-3.5 text-[#576660]">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[12px] text-[#1c1b1b]">{h.label}</span>
                </div>
                <span className="text-[9px] text-[#868382]">{h.time}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="pt-2">
          <h4 className="text-[9px] uppercase tracking-widest text-[#868382] mb-3 border-b border-[#c4c7c7]/30 pb-2">
            Judgment Insights
          </h4>
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-[#f7f3f2] p-3.5 rounded-lg flex items-start gap-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-[#1c1b1b] shrink-0 mt-0.5">
                <path d="M23 6l-9.5 9.5-5-5L1 18" />
                <path d="M17 6h6v6" />
              </svg>
              <div>
                <p className="text-[11px] font-semibold text-[#1c1b1b] mb-0.5">
                  Security questions increased this week
                </p>
                <p className="text-[9px] text-[#444748] leading-relaxed">
                  Consider updating the standard SOC2 summary to streamline these approvals.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MockShell>
  );
}