"use client";

import Button from "@/components/ui/Button";

const tiers = [
  {
    name: "Starter",
    foundingPrice: "$39",
    regularPrice: "$49",
    description: "For individuals and small teams getting started with AI-powered outbound.",
    features: [
      "Up to 500 leads/month",
      "AI draft generation",
      "Basic lead enrichment",
      "Campaign management",
      "Email support",
    ],
    highlighted: false,
  },
  {
    name: "Growth",
    foundingPrice: "$119",
    regularPrice: "$149",
    description: "For growing teams scaling their outbound with advanced AI capabilities.",
    features: [
      "Up to 2,000 leads/month",
      "Advanced AI personalization",
      "Full lead enrichment",
      "Multiple campaigns",
      "Campaign intelligence",
      "Priority support",
    ],
    highlighted: true,
  },
  {
    name: "Scale",
    foundingPrice: "$239",
    regularPrice: "$299",
    description: "For organizations running high-volume, multi-channel outbound operations.",
    features: [
      "Up to 5,000 leads/month",
      "Custom AI model tuning",
      "Real-time enrichment",
      "Unlimited campaigns",
      "Advanced analytics",
      "Dedicated support",
    ],
    highlighted: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-on-scroll">
          <p className="text-sm uppercase tracking-widest text-accent-light/70 mb-4 font-medium">
            Pricing
          </p>
          <h2 className="text-display-sm font-semibold text-foreground">
            Simple, transparent pricing
          </h2>
          <p className="text-body text-tertiary mt-4 max-w-2xl mx-auto">
            Founding pricing available for early customers. All plans include a
            free trial. No hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 stagger-children">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-[28px] border p-8 transition-all duration-500 ${
                tier.highlighted
                  ? "border-accent/40 bg-accent/5 shadow-lg shadow-accent/5"
                  : "border-border bg-surface hover:border-border"
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-[11px] font-medium uppercase tracking-wider text-foreground">
                  Most popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground">{tier.name}</h3>
                <p className="mt-1 text-sm text-tertiary">{tier.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-semibold text-foreground">{tier.foundingPrice}</span>
                  <span className="text-sm text-tertiary">/month</span>
                  <span className="ml-2 text-sm text-tertiary line-through">{tier.regularPrice}</span>
                </div>
                <p className="mt-1 text-xs text-emerald-400">Founding price — limited time</p>
              </div>

              <ul className="mb-8 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-secondary">
                    <svg className="mt-0.5 w-4 h-4 shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                href="/book-demo"
                variant={tier.highlighted ? "primary" : "secondary"}
                className="w-full"
              >
                Book a Demo
              </Button>
            </div>
          ))}
        </div>

        {/* Enterprise */}
        <div className="mt-8 animate-on-scroll">
          <div className="rounded-[28px] border border-border bg-surface p-8 text-center">
            <h3 className="text-lg font-semibold text-foreground">Enterprise</h3>
            <p className="mt-2 text-sm text-tertiary max-w-xl mx-auto">
              Custom lead volumes, dedicated infrastructure, team collaboration,
              SSO, and personalized onboarding. Contact us for a tailored plan.
            </p>
            <div className="mt-6">
              <Button href="/book-demo" variant="primary">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>

        {/* Free tier note */}
        <div className="mt-6 text-center animate-on-scroll">
          <p className="text-sm text-tertiary">
            Have a small team? Our{" "}
            <span className="text-secondary">Free</span> plan is available
            for individuals getting started.
          </p>
        </div>
      </div>
    </section>
  );
}
