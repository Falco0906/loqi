"use client";

const pillars = [
  {
    title: "Human in the loop",
    description:
      "Every message Loqi sends is approved by you first. You stay in control of your voice and your brand.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    title: "No spam, ever",
    description:
      "Loqi sends thoughtful, personalized messages — not mass blasts. Quality over quantity, always.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "Safe and responsible",
    description:
      "Built with anti-abuse protections and rate limiting. Loqi is designed for real business conversations.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
];

export default function Trust() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 animate-on-scroll">
          <p className="text-sm uppercase tracking-widest text-accent-light/70 mb-4 font-medium">
            Our approach
          </p>
          <h2 className="text-display-sm font-semibold text-white">
            Built for real outreach
          </h2>
          <p className="text-body text-slate-500 mt-4 max-w-lg mx-auto">
            We believe outreach should be honest, personal, and respectful.
            Loqi is designed around that principle.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 stagger-children">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="bg-surface rounded-2xl border border-slate-800/40 p-8 hover:border-slate-700/60 transition-all duration-500 group"
            >
              <div className="w-12 h-12 rounded-xl bg-surface-light border border-slate-700/40 flex items-center justify-center text-accent-light mb-6 group-hover:border-accent/30 group-hover:bg-accent-muted transition-all duration-500">
                {pillar.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">
                {pillar.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
