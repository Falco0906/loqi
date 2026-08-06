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

const leads = [
  {
    name: "Lumina Rails",
    focus: "Cross-border Settlement",
    match: "98%",
    matchClass: "bg-[#d3e3dc] text-[#576660]",
    stage: "Series A",
    loc: "London, UK",
    reasoning:
      "Lumina is solving the last-mile compliance problem for LATAM-to-EU transfers. Unlike their competitors, they have secured direct banking licenses in three key territories, reducing counterparty risk by 40%.",
    insight: "Recently appointed a new VP of Sales from Stripe; traditionally a precursor to aggressive market expansion and GTM acceleration.",
  },
  {
    name: "Coda Compliance",
    focus: "AML Orchestration",
    match: "92%",
    matchClass: "bg-[#d3e3dc] text-[#576660]",
    stage: "Series A",
    loc: "Berlin, DE",
    reasoning:
      "Coda is uniquely positioned because of their proprietary Shadow Ledger technology. They are currently the preferred vendor for Neobanks entering the US market.",
    insight: "The CTO recently published a whitepaper on real-time fraud detection that is being adopted as a standard by EU regulators.",
  },
  {
    name: "Vortex Pay",
    focus: "Institutional DeFi Rails",
    match: "84%",
    matchClass: "bg-[#e5e2e1] text-[#444748]",
    stage: "Seed+",
    loc: "Paris, FR",
    reasoning: null,
    insight: null,
  },
];

export default function DiscoveryLightMock() {
  return (
    <MockShell
      tone="light"
      active="explore"
      items={navItems}
      bottom={bottomItems}
      profile={{ name: "EXECUTIVE PROFILE", role: "Strategic Lead", initials: "EP" }}
      topbar={<MockTopbar tone="light" title="Discovery" search="Research a different market..." />}
    >
      <div className="px-8 py-8 max-w-3xl mx-auto space-y-6">
        <div>
          <h2 className="text-[19px] font-medium text-[#1c1b1b] mb-3">
            Market Discovery: Fintech Infrastructure
          </h2>
          <p className="text-[15px] text-[#1c1b1b]">
            I reviewed <span className="italic font-semibold">184 companies</span> overnight.
          </p>
          <p className="text-[13px] text-[#444748] mt-1.5 max-w-xl">
            Based on your directive for &ldquo;high-conviction Series A platforms
            in cross-border payments,&rdquo; I&rsquo;ve synthesized the landscape and
            isolated the top contenders below.
          </p>
        </div>

        <div className="flex items-center justify-between border-b border-[#c4c7c7] pb-4">
          <div className="flex items-center gap-2">
            <span className="text-[9px] uppercase tracking-wider text-[#444748]">
              Active Filters:
            </span>
            {["Fintech", "90% Confidence"].map((f) => (
              <span key={f} className="bg-[#f1edec] px-2.5 py-0.5 rounded-full text-[9px] text-[#444748]">
                {f}
              </span>
            ))}
          </div>
          <div className="flex gap-4 text-[10px] text-[#444748]/70">
            <span>Industry</span>
            <span>Status</span>
          </div>
        </div>

        <div className="bg-white border border-[#c4c7c7] rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
          <div className="grid grid-cols-12 gap-3 px-5 py-3 bg-[#f7f3f2] border-b border-[#c4c7c7] text-[9px] uppercase tracking-widest text-[#444748] font-bold">
            <div className="col-span-4">Company</div>
            <div className="col-span-2 text-center">Match</div>
            <div className="col-span-2">Stage</div>
            <div className="col-span-2">Location</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {leads.map((lead, i) => (
            <div key={lead.name} className={i < leads.length - 1 ? "border-b border-[#c4c7c7]/50" : ""}>
              <div className="grid grid-cols-12 gap-3 px-5 py-4 items-center">
                <div className="col-span-4 flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3 h-3 text-[#444748]/40">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                  <div>
                    <p className="text-[13px] font-semibold text-[#1c1b1b] leading-tight">{lead.name}</p>
                    <p className="text-[9px] text-[#444748] mt-0.5">{lead.focus}</p>
                  </div>
                </div>
                <div className="col-span-2 text-center">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] ${lead.matchClass}`}>{lead.match}</span>
                </div>
                <div className="col-span-2 text-[11px] text-[#1c1b1b]">{lead.stage}</div>
                <div className="col-span-2 text-[11px] text-[#1c1b1b]">{lead.loc}</div>
                <div className="col-span-2 flex justify-end gap-2 text-[#444748]/70">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3.5 h-3.5">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3.5 h-3.5">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M4 4l16 16" />
                  </svg>
                </div>
              </div>
              {lead.reasoning && (
                <div className="px-5 pb-5 pl-12">
                  <div className="bg-[#f7f3f2] border border-[#c4c7c7]/30 rounded-lg p-4">
                    <p className="text-[9px] uppercase tracking-widest text-[#444748] font-bold mb-2">
                      Executive Deep Reasoning
                    </p>
                    <p className="text-[11px] text-[#1c1b1b] leading-relaxed mb-3">
                      {lead.reasoning}
                    </p>
                    <div className="flex gap-2.5 border-t border-[#c4c7c7]/40 pt-3">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3.5 h-3.5 text-[#1c1b1b] shrink-0 mt-0.5">
                        <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z" />
                      </svg>
                      <p className="text-[10px] text-[#444748] leading-relaxed">{lead.insight}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <span className="bg-black text-white px-3 py-1.5 rounded-full text-[10px] font-medium">
                      Approve &amp; Research
                    </span>
                    <span className="border border-[#c4c7c7] text-[#1c1b1b] px-3 py-1.5 rounded-full text-[10px]">
                      Add to Campaign
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </MockShell>
  );
}