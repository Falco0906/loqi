"use client";

const features = [
  { label: "Setup", loqi: "Define your ICP in minutes", other: "Hours of CRM setup, field mapping, sequence config" },
  { label: "Lead sourcing", loqi: "Research + enrichment across providers", other: "Manual search or static database imports" },
  { label: "Personalization", loqi: "Each message unique, context-aware, AI-generated", other: "Templates with merge fields" },
  { label: "Approval", loqi: "Every message reviewed before sending", other: "Auto-sends with minimal oversight" },
  { label: "Campaign management", loqi: "Unified workspace, parallel campaigns", other: "Scattered across tabs and tools" },
  { label: "Learning", loqi: "AI analyzes replies and improves over time", other: "Manual analysis, no memory" },
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
            A better way to work
          </h2>
          <p className="text-body text-slate-500 mt-4">
            Most tools add complexity. Loqi removes it — so you can focus on what matters.
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
