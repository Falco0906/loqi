"use client";

const features = [
  { label: "Setup time", loqi: "5 minutes, via chat", other: "Hours of forms and CRM config" },
  { label: "Interface", loqi: "Telegram / WhatsApp", other: "Web dashboard" },
  { label: "Lead sourcing", loqi: "AI-powered, real-time", other: "Static database" },
  { label: "Outreach", loqi: "Personalized, human-reviewed", other: "Templates & sequences" },
  { label: "Approval", loqi: "You approve every message", other: "Auto-sends by default" },
  { label: "Learning curve", loqi: "None — it's a chat", other: "Significant training needed" },
];

export default function Comparison() {
  return (
    <section id="compare" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-on-scroll">
          <p className="text-sm uppercase tracking-widest text-accent-light/70 mb-4 font-medium">
            How it compares
          </p>
          <h2 className="text-display-sm font-semibold text-white">
            A different approach
          </h2>
          <p className="text-body text-slate-500 mt-4">
            Traditional tools are powerful but complex. Loqi takes a simpler path.
          </p>
        </div>

        <div className="animate-on-scroll">
          <div className="bg-surface rounded-2xl border border-slate-800/50 overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 px-6 py-4 border-b border-slate-800/40 bg-surface-light/30">
              <div className="text-sm text-slate-500 font-medium" />
              <div className="text-sm font-semibold text-white text-center">Loqi</div>
              <div className="text-sm font-medium text-slate-500 text-center">Traditional tools</div>
            </div>

            {/* Rows */}
            {features.map((feature, i) => (
              <div
                key={feature.label}
                className={`grid grid-cols-3 px-6 py-5 items-center ${
                  i < features.length - 1 ? "border-b border-slate-800/20" : ""
                } hover:bg-surface-light/20 transition-colors duration-300`}
              >
                <div className="text-sm text-slate-400 font-medium">{feature.label}</div>
                <div className="text-sm text-slate-200 text-center">{feature.loqi}</div>
                <div className="text-sm text-slate-500 text-center">{feature.other}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
