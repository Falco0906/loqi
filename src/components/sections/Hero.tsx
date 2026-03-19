"use client";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#12141c] via-[#141620] to-[#12141c]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/[0.04] rounded-full blur-3xl animate-pulse-soft" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Copy */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-light/60 border border-slate-700/40 text-xs text-slate-400 mb-8 animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Works on Telegram &amp; WhatsApp
            </div>

            <h1 className="text-display-lg font-semibold text-white mb-6 animate-fade-in-up">
              Run your outbound
              <br />
              <span className="gradient-text">from chat</span>
            </h1>

            <p className="text-body-lg text-slate-400 mb-10 animate-fade-in-up-delay leading-relaxed">
              Loqi finds the right leads, writes the outreach, and waits for
              your approval — all inside a simple chat conversation.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in-up-delay-2">
              <a
                href="#start"
                className="inline-flex items-center px-7 py-3.5 rounded-full bg-accent text-white font-medium text-sm hover:bg-accent-dark transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
              >
                Get started
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center px-7 py-3.5 rounded-full border border-slate-700/60 text-slate-300 text-sm hover:border-slate-600 hover:text-white transition-all duration-300"
              >
                See how it works
              </a>
            </div>
          </div>

          {/* Right — Chat UI Mock */}
          <div className="hidden lg:block animate-fade-in-up-delay">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/6 via-transparent to-blue-400/3 rounded-3xl blur-[20px]" />
              <div className="relative bg-surface rounded-2xl border border-slate-800/60 overflow-hidden shadow-2xl shadow-black/30">
                {/* Chat header */}
                <div className="flex items-center gap-3 px-5 py-3.5 border-b border-slate-800/40 bg-surface-light/40">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center text-white text-xs font-bold">
                    L
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Loqi</p>
                    <p className="text-xs text-emerald-400">Online</p>
                  </div>
                </div>

                {/* Chat messages */}
                <div className="p-5 space-y-4 min-h-[320px]">
                  {/* Bot message */}
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-700/50 flex-shrink-0 flex items-center justify-center mt-0.5">
                      <span className="text-[10px] text-slate-400 font-bold">L</span>
                    </div>
                    <div className="bg-surface-light rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                      <p className="text-sm text-slate-300">
                        Found <span className="text-white font-medium">12 leads</span> matching
                        &quot;SaaS founders, Series A, US&quot;
                      </p>
                      <p className="text-xs text-slate-500 mt-1.5">Just now</p>
                    </div>
                  </div>

                  {/* Bot follow-up */}
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-700/50 flex-shrink-0 flex items-center justify-center mt-0.5">
                      <span className="text-[10px] text-slate-400 font-bold">L</span>
                    </div>
                    <div className="bg-surface-light rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                      <p className="text-sm text-slate-300">
                        Top 3 are ready. Want me to draft outreach?
                      </p>
                      <p className="text-xs text-slate-500 mt-1.5">Just now</p>
                    </div>
                  </div>

                  {/* User reply */}
                  <div className="flex justify-end">
                    <div className="bg-accent/90 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[75%]">
                      <p className="text-sm text-white">Yes, send them 👍</p>
                      <p className="text-xs text-blue-200/60 mt-1.5">Just now</p>
                    </div>
                  </div>

                  {/* Bot confirmation */}
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-700/50 flex-shrink-0 flex items-center justify-center mt-0.5">
                      <span className="text-[10px] text-slate-400 font-bold">L</span>
                    </div>
                    <div className="bg-surface-light rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                      <p className="text-sm text-slate-300">
                        <span className="text-emerald-400">✓</span> Done — 3 emails sent. I&apos;ll
                        notify you when they reply.
                      </p>
                      <p className="text-xs text-slate-500 mt-1.5">Just now</p>
                    </div>
                  </div>
                </div>

                {/* Chat input */}
                <div className="px-5 py-3 border-t border-slate-800/40 bg-surface-light/30">
                  <div className="flex items-center gap-3 bg-surface rounded-xl px-4 py-2.5 border border-slate-800/40">
                    <input
                      type="text"
                      placeholder="Message Loqi..."
                      className="flex-1 bg-transparent text-sm text-slate-400 outline-none placeholder:text-slate-600"
                      readOnly
                    />
                    <div className="w-7 h-7 rounded-lg bg-accent/80 flex items-center justify-center">
                      <svg
                        className="w-3.5 h-3.5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
