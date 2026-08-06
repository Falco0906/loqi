import React from "react";
import { MockShell, MockTopbar } from "./MockChrome";

const navItems = [
  { id: "dashboard", label: "Mission Control" },
  { id: "explore", label: "Discovery" },
  { id: "campaign", label: "Campaigns" },
  { id: "inbox", label: "Inbox" },
  { id: "database", label: "Knowledge" },
];

const leads = [
  { name: "Lumina Rails", focus: "Cross-border Settlement", match: "98%", stage: "Series A", loc: "London, UK" },
  { name: "Coda Compliance", focus: "AML Orchestration", match: "92%", stage: "Series A", loc: "Berlin, DE" },
  { name: "Vortex Pay", focus: "Institutional DeFi Rails", match: "84%", stage: "Seed+", loc: "Paris, FR" },
];

export default function DiscoveryMock() {
  return (
    <MockShell
      tone="dark"
      active="explore"
      items={navItems}
      topbar={<MockTopbar tone="dark" title="Discovery" search="Research a different market..." />}
    >
      <div className="px-8 py-8 max-w-3xl mx-auto space-y-6">
        {/* Narrative briefing */}
        <div>
          <h2 className="text-[19px] font-medium text-[#e6e2e1] mb-3">
            Market Discovery: Fintech Infrastructure
          </h2>
          <p className="text-[15px] leading-relaxed text-[#e6e2e1]">
            I reviewed{" "}
            <span className="italic font-semibold text-white">184 companies</span>{" "}
            overnight.
          </p>
          <p className="text-[13px] text-[#ccc4c9] mt-1.5 max-w-xl">
            Based on your directive for &ldquo;high-conviction Series A
            platforms in cross-border payments,&rdquo; I have isolated the top
            contenders below.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between border-b border-[#4a4549]/30 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-[9px] uppercase tracking-wider text-[#ccc4c9]">
              Active Filters:
            </span>
            {["Fintech", "90% Confidence"].map((f) => (
              <span key={f} className="bg-[#2b2a2a] text-[#e6e2e1] px-2.5 py-0.5 rounded-full text-[9px] border border-[#4a4549]/30">
                {f}
              </span>
            ))}
          </div>
          <div className="flex gap-4 text-[10px] text-[#ccc4c9]/70">
            <span>Industry</span>
            <span>Status</span>
          </div>
        </div>

        {/* Lead list */}
        <div className="bg-[#0f0e0e] border border-[#4a4549]/30 rounded-xl overflow-hidden">
          <div className="grid grid-cols-12 gap-3 px-5 py-3 bg-[#1c1b1b] border-b border-[#4a4549]/30 text-[9px] uppercase tracking-widest text-[#ccc4c9]">
            <div className="col-span-4">Company</div>
            <div className="col-span-2 text-center">Match</div>
            <div className="col-span-2">Stage</div>
            <div className="col-span-2">Location</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>
          {leads.map((lead, i) => (
            <div
              key={lead.name}
              className={`grid grid-cols-12 gap-3 px-5 py-4 items-center ${
                i < leads.length - 1 ? "border-b border-[#4a4549]/30" : ""
              }`}
            >
              <div className="col-span-4 flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3 h-3 text-[#ccc4c9]/40">
                  <path d="M6 9l6 6 6-6" />
                </svg>
                <div>
                  <p className="text-[13px] font-medium text-white leading-tight">{lead.name}</p>
                  <p className="text-[9px] text-[#ccc4c9] mt-0.5">{lead.focus}</p>
                </div>
              </div>
              <div className="col-span-2 text-center">
                <span className="bg-[#484646] text-[#b8b4b3] px-1.5 py-0.5 rounded text-[10px]">
                  {lead.match}
                </span>
              </div>
              <div className="col-span-2 text-[11px] text-[#e6e2e1]">{lead.stage}</div>
              <div className="col-span-2 text-[11px] text-[#e6e2e1]">{lead.loc}</div>
              <div className="col-span-2 flex justify-end gap-2 text-[#ccc4c9]/70">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3.5 h-3.5">
                  <path d="M5 13l4 4L19 7" />
                </svg>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3.5 h-3.5">
                  <path d="M12 8v4l3 3M4 4l16 16" />
                  <circle cx="12" cy="12" r="9" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MockShell>
  );
}