import React from 'react';

export default function LegalPageLayout({ children, title, lastUpdated }: { children: React.ReactNode; title: string; lastUpdated?: string }) {
  return (
    <main className="legal-content">
      <div>
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
    </main>
  );
}
