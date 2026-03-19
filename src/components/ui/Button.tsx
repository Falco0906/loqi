"use client";

import React from "react";
import { cn } from "@/lib/formatting";

type ButtonVariant = "primary" | "secondary" | "accent";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  href?: string;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#2a2d38] text-white hover:bg-[#32353f]",
  secondary:
    "border border-slate-700/60 text-slate-300 hover:border-slate-600 hover:text-white bg-transparent",
  accent:
    "bg-accent text-white hover:bg-accent-dark hover:shadow-lg hover:shadow-blue-500/20",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-5 py-2 text-sm rounded-full",
  md: "px-7 py-3.5 text-sm rounded-full",
  lg: "w-full py-4 text-[15px] rounded-2xl",
};

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  href,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2.5 font-medium transition-all duration-300",
    variantStyles[variant],
    sizeStyles[size],
    (disabled || loading) && "opacity-60 cursor-not-allowed",
    className
  );

  // If href is provided, render an anchor
  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading ? (
        <>
          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          {children}
        </>
      ) : (
        children
      )}
    </button>
  );
}
