import React from 'react';

export default function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-heading font-medium text-white tracking-tight mb-6">
      {children}
    </h2>
  );
}
