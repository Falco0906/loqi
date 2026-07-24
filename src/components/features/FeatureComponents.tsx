import React from 'react';

interface FeatureHeroProps {
  title: string;
  description: string;
}

export function FeatureHero({ title, description }: FeatureHeroProps) {
  return (
    <section className="pt-40 pb-20 px-6 text-center">
      <div className="max-w-4xl mx-auto animate-on-scroll">
        <h1 className="text-display-sm font-semibold text-foreground tracking-tight mb-8">
          {title}
        </h1>
        <p className="text-body-lg text-secondary max-w-2xl mx-auto">
          {description}
        </p>
      </div>
    </section>
  );
}

export function FeatureScreenshot({ placeholderText }: { placeholderText: string }) {
  return (
    <section className="py-12 px-6 sm:px-8">
      <div className="max-w-6xl mx-auto animate-on-scroll">
        <div className="rounded-2xl border border-border bg-surface-hover p-4 shadow-sm">
          <div className="h-[500px] w-full flex items-center justify-center text-tertiary bg-surface rounded-lg">
            {placeholderText}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CapabilityList({ title, capabilities }: { title: string, capabilities: { name: string, desc: string }[] }) {
  return (
    <section className="py-20 px-6 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-heading font-semibold text-foreground mb-12">{title}</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {capabilities.map((cap) => (
            <div key={cap.name} className="border-t border-border pt-6">
              <h3 className="text-label-lg font-medium text-foreground mb-2">{cap.name}</h3>
              <p className="text-body text-secondary">{cap.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
