"use client";

export default function Explanation() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="animate-on-scroll">
          <p className="text-sm uppercase tracking-widest text-accent-light/70 mb-6 font-medium">
            What is Loqi?
          </p>
        </div>

        <div className="space-y-6 animate-on-scroll">
          <p className="text-display-sm font-medium text-white leading-snug">
            Most sales tools give you dashboards and data.
            <br />
            Loqi just gives you a conversation.
          </p>
        </div>

        <div className="mt-12 space-y-6 animate-on-scroll">
          <p className="text-body-lg text-slate-400 leading-relaxed">
            You tell Loqi who you want to reach and what you sell. It goes out,
            finds people who match, and drafts a short, honest message for each
            one. Then it comes back and asks you: &quot;Here are three people.
            Want me to send?&quot;
          </p>

          <p className="text-body-lg text-slate-400 leading-relaxed">
            You say yes — or tweak the message — and Loqi sends it. When someone
            replies, you hear about it immediately. No tabs to switch, no dashboards
            to check. Just a chat.
          </p>

          <p className="text-body text-slate-500 leading-relaxed">
            It works inside Telegram or WhatsApp — the apps you already have
            open all day. Think of it as a quiet, reliable teammate who handles
            the reach-out so you can focus on the conversations that matter.
          </p>
        </div>

        {/* Decorative divider */}
        <div className="mt-20 flex items-center gap-4 animate-on-scroll">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700/60 to-transparent" />
          <div className="w-1.5 h-1.5 rounded-full bg-accent/40" />
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700/60 to-transparent" />
        </div>
      </div>
    </section>
  );
}
