import React from 'react';
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Link from 'next/link';

const features = [
  { name: "Mission Control", desc: "Command center for campaigns.", href: "/features/mission-control" },
  { name: "Lead Discovery", desc: "Find and enrich prospects.", href: "/features/lead-discovery" },
  { name: "AI Research", desc: "Context-aware prospect data.", href: "/features/ai-research" },
  { name: "Personalization", desc: "Unique, human-like outreach.", href: "/features/personalization" },
  { name: "Review Queue", desc: "Trust-first human approval.", href: "/features/review-queue" },
  { name: "Campaigns", desc: "Execute in parallel.", href: "/features/campaigns" },
  { name: "Analytics", desc: "Real-time optimization.", href: "/features/analytics" },
  { name: "Integrations", desc: "Connect your tech stack.", href: "/features/integrations" },
];

export default function FeaturesIndex() {
  return (
    <main className="relative overflow-x-hidden">
      <Navbar />
      <section className="pt-40 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-display-sm font-semibold text-foreground tracking-tight mb-8">
            Explore the platform.
          </h1>
        </div>
      </section>

      <section className="py-12 px-6 sm:px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {features.map((f) => (
            <Link href={f.href} key={f.name} className="group block bg-surface rounded-2xl border border-border p-8 hover:border-accent/30 transition-all">
                <div className="h-48 w-full bg-surface-hover rounded-lg mb-6 flex items-center justify-center text-tertiary">
                    {f.name} Preview
                </div>
                <h3 className="text-heading font-semibold text-foreground mb-2">{f.name}</h3>
                <p className="text-body text-secondary mb-4">{f.desc}</p>
                <span className="text-accent text-label-lg">Explore →</span>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}