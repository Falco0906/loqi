import React from 'react';
import { cn } from "@/lib/formatting";

export default function DesktopWindow({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("rounded-xl border border-border bg-surface shadow-2xl overflow-hidden", className)}>
      {/* Window bar */}
      <div className="h-10 bg-surface-elevated border-b border-border flex items-center px-4 gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-border" />
          <div className="w-3 h-3 rounded-full bg-border" />
          <div className="w-3 h-3 rounded-full bg-border" />
        </div>
      </div>
      {/* Content */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
}