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
  { title: "Research Complete", desc: "Mapped 142 potential targets in the global fintech space.", done: true },
  { title: "Prospects Qualified", desc: "Filtered for Series A funding and infrastructure focus.", done: true },
  { title: "Outreach Started", desc: "Phase 1 automated sequences initiated with 61 leads.", done: true },
  { title: "Replies Received", desc: "14 direct responses analyzed for intent and sentiment.", done: false },
  { title: "Meetings Booked", desc: "Target: 10 per month. Currently at 3 verified bookings.", done: false },
];

const changes = [
  { action: "Adjusted opening line after reply rate decreased.", reason: "Increased engagement by 12% in the last 48 hours." },
  { action: "Paused low-performing messaging in sequence B.", reason: "Messaging felt too transactional for European market sentiment." },
];

const timeline = [
  { day: "Yesterday", events: ["Personalized 23 emails for APAC leads", "Booked 2 meetings with Stripe and Plaid"] },
  { day: "Tuesday", events: ["Paused sequence B (DACH region)", "Added 12 new companies from Crunchbase scan"] },
];

export default function CampaignsLightMock() {
  return (
    <MockShell
      tone="light"
      active="campaign"
      items={navItems}
      profile={{ name: "LOQI AI", role: "ONLINE", initials: "LO" }}
      topbar={<MockTopbar tone="light" title="Directives" tabs={["Directives", "Summaries", "Archive"]} />}
    >
      <div className="px-8 py-8 max-w-2xl mx-auto space-y-8">
        <p className="text-[15px] italic leading-relaxed text-[#1c1b1b]">
          &ldquo;Your Fintech Infrastructure campaign has been running for four
          days. I&rsquo;ve contacted 61 companies, received 14 replies, booked 3
          meetings, and adjusted messaging twice.&rdquo;
        </p>

        <div className="flex justify-between items-end border-b border-[#c4c7c7]/40 pb-4">
          <div>
            <span className="text-[9px] uppercase tracking-widest text-[#444748]">
              Active Campaign
            </span>
            <h3 className="text-[18px] font-medium mt-1 text-[#1c1b1b]">
              Fintech Infrastructure
            </h3>
          </div>
          <div className="flex gap-6 text-right">
            <div>
              <p className="text-[9px] uppercase tracking-wider text-[#444748]">Status</p>
              <p className="text-[11px] font-medium text-[#1c1b1b] mt-0.5">Running</p>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-wider text-[#444748]">Created</p>
              <p className="text-[11px] mt-0.5 text-[#1c1b1b]">6 days ago</p>
            </div>
          </div>
        </div>

        <section>
          <h4 className="text-[10px] uppercase tracking-[0.15em] text-[#444748] opacity-60 mb-5">
            Narrative Journey
          </h4>
          <div className="grid grid-cols-2 gap-y-8 gap-x-8">
            {milestones.map((m) => (
              <div key={m.title} className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  {m.done ? (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#1c1b1b]">
                      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1.2 14.5l-4-4 1.4-1.4 2.6 2.6 5.6-5.6 1.4 1.4-7 7z" />
                    </svg>
                  ) : (
                    <span className="w-4 h-4 rounded-full border-2 border-[#1c1b1b]/30 flex items-center justify-center">
                      <span className="w-1.5 h-1.5 bg-[#1c1b1b] rounded-full" />
                    </span>
                  )}
                  <span className={`text-[11px] font-semibold ${m.done ? "text-[#1c1b1b]" : "text-[#444748]/70"}`}>
                    {m.title}
                  </span>
                </div>
                <p className="text-[10px] text-[#444748] ml-6 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h4 className="text-[10px] uppercase tracking-[0.15em] text-[#444748] opacity-60 mb-4">
            Autonomous Improvements
          </h4>
          <div className="space-y-4">
            {changes.map((im) => (
              <div key={im.action} className="bg-white rounded-lg p-4 border-l-2 border-[#1c1b1b] shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
                <p className="text-[12px] text-[#1c1b1b]">{im.action}</p>
                <div className="mt-2 flex gap-2">
                  <span className="text-[9px] uppercase italic text-[#444748]">Reasoning:</span>
                  <span className="text-[9px] font-medium text-[#1c1b1b]">{im.reason}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h4 className="text-[10px] uppercase tracking-[0.15em] text-[#444748] opacity-60 mb-5">
            Timeline
          </h4>
          <div className="space-y-6 relative">
            <div className="absolute left-[7px] top-2 bottom-0 w-[1px] bg-[#c4c7c7]/50" />
            {timeline.map((t, i) => (
              <div key={t.day} className="relative pl-7">
                <div className={`absolute left-0 top-[5px] w-[15px] h-[15px] rounded-full ${i === 0 ? "bg-[#1c1b1b]" : "bg-[#c4c7c7]"} ring-4 ring-[#fdf8f8]`} />
                <p className="text-[11px] font-semibold text-[#1c1b1b] mb-1.5">{t.day}</p>
                <ul className="space-y-1">
                  {t.events.map((e) => (
                    <li key={e} className="text-[11px] text-[#444748] leading-relaxed">
                      &bull; {e}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <div className="bg-white rounded-xl p-6 border border-[#c4c7c7]/30 shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[9px] uppercase tracking-widest text-[#444748] bg-[#d3e3dc]/40 px-2 py-0.5 rounded">
                Recommendation
              </span>
              <h5 className="text-[15px] font-medium mt-3 text-[#1c1b1b]">
                Approve Revised Messaging
              </h5>
            </div>
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#1c1b1b]">
              <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z" />
            </svg>
          </div>
          <p className="text-[12px] leading-relaxed text-[#444748] max-w-md mt-3">
            I&rsquo;ve prepared a more direct version of the Tier 1 sequence that
            highlights API latency reductions. This aligns better with
            infrastructure engineer discourse.
          </p>
          <div className="flex gap-3 pt-4">
            <span className="bg-black text-white px-4 py-1.5 rounded-full text-[10px] font-medium">
              Review &amp; Approve
            </span>
            <span className="border border-[#c4c7c7] text-[#1c1b1b] px-4 py-1.5 rounded-full text-[10px]">
              View Draft
            </span>
          </div>
        </div>

        <div className="bg-[#f7f3f2] rounded-full px-6 py-3 flex items-center gap-3 shadow-sm">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#1c1b1b]">
            <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z" />
          </svg>
          <span className="text-[12px] text-[#444748] flex-1">Tell Loqi...</span>
          <span className="text-[9px] text-[#444748]/60">CMD + K</span>
        </div>
      </div>
    </MockShell>
  );
}