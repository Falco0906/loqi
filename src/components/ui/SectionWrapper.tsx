import React from "react";
import { cn } from "@/lib/formatting";

interface SectionWrapperProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  narrow?: boolean;
}

export default function SectionWrapper({
  id,
  className,
  children,
  narrow = false,
}: SectionWrapperProps) {
  return (
    <section id={id} className={cn("relative py-40 px-6 sm:px-8", className)}>
      <div className={cn("mx-auto", narrow ? "max-w-3xl" : "max-w-6xl")}>
        {children}
      </div>
    </section>
  );
}