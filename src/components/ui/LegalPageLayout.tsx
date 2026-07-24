import React from 'react';

export default function LegalPageLayout({ children, title, lastUpdated }: { children: React.ReactNode; title: string; lastUpdated?: string }) {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 relative">
      <div className="max-w-2xl mx-auto relative z-10 animate-on-scroll visible">
        <header className="mb-16">
          <h1 className="text-display-sm font-semibold text-foreground tracking-tight mb-4">{title}</h1>
          {lastUpdated && (
            <p className="text-sm text-secondary uppercase tracking-widest font-medium">
              Last updated: {lastUpdated}
            </p>
          )}
        </header>

        <div className="space-y-12">
          {children}
        </div>
      </div>
    </div>
  );
}