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
        className="block text-[15px] text-slate-300 mb-3 font-medium"
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
          "w-full bg-[#1e2028] border rounded-2xl px-6 py-[18px] text-[16px] text-white placeholder:text-slate-600 outline-none transition-all duration-300",
          error
            ? "border-red-500/40 focus:border-red-500/60"
            : "border-slate-800/30 focus:border-slate-600/60 focus:bg-[#222430]"
        )}
      />
      {error && (
        <p className="text-sm text-red-400/80 mt-2 pl-1">{error}</p>
      )}
    </div>
  );
}
