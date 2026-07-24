"use client";

import React from "react";
import { cn } from "@/lib/formatting";

interface InputFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  className?: string;
}

export default function InputField({
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
  className,
}: InputFieldProps) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-label-lg text-foreground mb-2 font-medium"
      >
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full bg-surface border rounded-lg px-4 py-3 text-body text-foreground placeholder:text-tertiary outline-none transition-all duration-200 focus:ring-1 focus:ring-accent/40",
          error
            ? "border-error focus:border-error focus:ring-error/30"
            : "border-border focus:border-accent/40"
        )}
      />
      {error && (
        <p className="text-sm text-error mt-1.5">{error}</p>
      )}
    </div>
  );
}