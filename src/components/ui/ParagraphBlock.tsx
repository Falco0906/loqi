import React from 'react';

export default function ParagraphBlock({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-body text-secondary leading-relaxed mb-6 ${className}`}>
      {children}
    </p>
  );
}