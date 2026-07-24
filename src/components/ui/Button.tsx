"use client";

import React from "react";
import { cn } from "@/lib/formatting";

type ButtonVariant = "primary" | "secondary" | "ghost";
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
    "bg-accent text-background hover:bg-accent-light active:bg-accent",
  secondary:
    "border border-border bg-surface text-foreground hover:bg-surface-hover active:bg-surface active:scale-[0.98]",
  ghost:
    "text-secondary hover:text-foreground hover:bg-surface-light active:bg-surface",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-1.5 text-label-md",
  md: "px-6 py-2.5 text-label-lg",
  lg: "px-8 py-3 text-label-lg",
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
    "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200",
    variantStyles[variant],
    sizeStyles[size],
    (disabled || loading) && "opacity-50 cursor-not-allowed pointer-events-none",
    className
  );

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