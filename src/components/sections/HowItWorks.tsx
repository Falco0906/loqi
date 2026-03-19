"use client";

const steps = [
  {
    number: "01",
    title: "Tell Loqi what you sell",
    description:
      "Describe your product and ideal customer in plain language. No forms, no CRM setup.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Loqi finds the leads",
    description:
      "It searches across the web for people who match — real contacts, not stale lists.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Review and approve",
    description:
      "Loqi shows you the best matches and drafts messages. You approve, tweak, or skip — your call.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Messages sent",
    description:
      "Once you say go, Loqi sends your outreach and tracks every reply for you.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Get replies, have conversations",
    description:
      "When someone responds, Loqi lets you know right away. You take it from there.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20 animate-on-scroll">
          <p className="text-sm uppercase tracking-widest text-accent-light/70 mb-4 font-medium">
            How it works
          </p>
          <h2 className="text-display-sm font-semibold text-white">
            Five steps. One chat.
          </h2>
        </div>

        <div className="grid md:grid-cols-5 gap-0 stagger-children">
          {steps.map((step, i) => (
            <div key={step.number} className="relative group">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(50%+24px)] w-[calc(100%-48px)] h-px bg-gradient-to-r from-slate-700/60 to-slate-800/30" />
              )}
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-14 h-14 rounded-2xl bg-surface-light border border-slate-700/40 flex items-center justify-center text-accent-light mb-5 group-hover:border-accent/30 group-hover:bg-accent-muted transition-all duration-500">
                  {step.icon}
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-600 mb-2 font-medium">
                  {step.number}
                </span>
                <h3 className="text-sm font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
