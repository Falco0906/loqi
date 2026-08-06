import React from "react";
import { MockShell, MockTopbar } from "./MockChrome";

const navItems = [
  { id: "dashboard", label: "Mission Control" },
  { id: "explore", label: "Discovery" },
  { id: "campaign", label: "Campaigns" },
  { id: "inbox", label: "Inbox" },
  { id: "database", label: "Knowledge" },
];

const milestones = [
  { title: "Research Complete", desc: "Mapped 142 potential targets.", done: true },
  { title: "Prospects Qualified", desc: "Filtered for Series A and infra focus.", done: true },
  { title: "Outreach Started", desc: "Phase 1 sequences initiated with 61 leads.", done: true },
  { title: "Replies Received", desc: "14 direct responses analyzed.", done: false },
  { title: "Meetings Booked", desc: "Target: 10 per month. Currently 3.", done: false },
];

export default function CampaignsMock() {
  return (
    <MockShell
      tone="dark"
      active="campaign"
      items={navItems}
      topbar={<MockTopbar tone="dark" title="Directives" tabs={["Directives", "Summaries", "Archive"]} />}
    >
      <div className="px-8 py-8 max-w-2xl mx-auto space-y-8">
        {/* Narrative */}
        <p className="text-[15px] italic leading-relaxed text-[#e6e2e1] opacity-95">
          &ldquo;Your Fintech Infrastructure campaign has been running for four
          days. I&rsquo;ve contacted 61 companies, received 14 replies, booked 3
          meetings, and adjusted messaging twice. The campaign is outperforming
          similar campaigns.&rdquo;
        </p>

        {/* Campaign identity */}
        <div className="flex justify-between items-end border-b border-[#4a4549]/30 pb-4">
          <div>
            <span className="text-[9px] uppercase tracking-widest text-[#ccc4c9]">
              Active Campaign
            </span>
            <h3 className="text-[18px] font-medium mt-1 text-[#e6e2e1]">
              Fintech Infrastructure
            </h3>
          </div>
          <div className="flex gap-6 text-right">
            <div>
              <p className="text-[9px] uppercase tracking-wider text-[#ccc4c9]">Status</p>
              <p className="text-[11px] font-medium text-white mt-0.5">Running</p>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-wider text-[#ccc4c9]">Created</p>
              <p className="text-[11px] mt-0.5 text-[#e6e2e1]">6 days ago</p>
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div className="grid grid-cols-2 gap-y-8 gap-x-8">
          {milestones.map((m) => (
            <div key={m.title} className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                {m.done ? (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1.2 14.5l-4-4 1.4-1.4 2.6 2.6 5.6-5.6 1.4 1.4-7 7z" />
                  </svg>
                ) : (
                  <span className="w-4 h-4 rounded-full border-2 border-white/20 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-white rounded-full" />
                  </span>
                )}
                <span className={`text-[11px] font-semibold ${m.done ? "text-[#e6e2e1]" : "text-[#ccc4c9]/70"}`}>
                  {m.title}
                </span>
              </div>
              <p className="text-[10px] text-[#ccc4c9] ml-6 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>

        {/* Recommendation card */}
        <div className="bg-[#201f1f] rounded-xl p-6 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[9px] uppercase tracking-widest text-[#666464] bg-[#e6e1e1]/20 px-2 py-0.5 rounded">
                Recommendation
              </span>
              <h5 className="text-[15px] font-medium mt-3 text-[#e6e2e1]">
                Approve Revised Messaging
              </h5>
            </div>
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
              <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z" />
            </svg>
          </div>
          <p className="text-[12px] leading-relaxed text-[#ccc4c9] max-w-md">
            I&rsquo;ve prepared a more direct version of the Tier 1 sequence that
            highlights API latency reductions. This aligns better with
            infrastructure engineer discourse.
          </p>
          <div className="flex gap-3 pt-2">
            <span className="bg-white text-[#313030] px-4 py-1.5 rounded-full text-[10px] font-medium">
              Review &amp; Approve
            </span>
            <span className="border border-[#4a4549] text-[#e6e2e1] px-4 py-1.5 rounded-full text-[10px]">
              View Draft
            </span>
          </div>
        </div>
      </div>
    </MockShell>
  );
}