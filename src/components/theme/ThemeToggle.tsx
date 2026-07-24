"use client";

import { useEffect, useState } from "react";

function getInitialTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem("loqi-theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    setTheme(getInitialTheme());
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("loqi-theme", theme);
  }, [theme]);

  return (
    <div className="flex rounded-lg border border-border p-0.5 bg-surface gap-0.5">
      <button
        onClick={() => setTheme("light")}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-label-sm font-medium transition-all duration-200 ${
          theme === "light"
            ? "bg-surface-elevated text-foreground shadow-sm"
            : "text-secondary hover:text-foreground"
        }`}
        aria-label="Switch to light mode"
      >
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
        <span className="hidden sm:inline">Light</span>
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-label-sm font-medium transition-all duration-200 ${
          theme === "dark"
            ? "bg-surface-elevated text-foreground shadow-sm"
            : "text-secondary hover:text-foreground"
        }`}
        aria-label="Switch to dark mode"
      >
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
        <span className="hidden sm:inline">Dark</span>
      </button>
    </div>
  );
}