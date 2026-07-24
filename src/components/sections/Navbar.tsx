"use client";

import { useState, useEffect } from "react";
import ThemeToggle from "../theme/ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
        <a href="#" className="text-xl font-semibold tracking-tight text-foreground">
          loqi
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a
            href="#how-it-works"
            className="text-label-md text-secondary hover:text-foreground transition-colors duration-200"
          >
            How it works
          </a>
          <a
            href="#features"
            className="text-label-md text-secondary hover:text-foreground transition-colors duration-200"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-label-md text-secondary hover:text-foreground transition-colors duration-200"
          >
            Pricing
          </a>
          <div className="flex items-center gap-4 pl-4 border-l border-border">
            <ThemeToggle />
            <a
              href="/book-demo"
              className="text-label-md px-5 py-2.5 rounded-lg bg-accent text-background font-medium hover:bg-accent-light transition-all duration-200"
            >
              Book a Demo
            </a>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-secondary hover:text-foreground transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <>
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden bg-surface border-b border-border px-6 sm:px-8 py-6 space-y-4">
          <a href="#how-it-works" className="block text-label-md text-secondary hover:text-foreground transition-colors duration-200" onClick={() => setMobileOpen(false)}>How it works</a>
          <a href="#features" className="block text-label-md text-secondary hover:text-foreground transition-colors duration-200" onClick={() => setMobileOpen(false)}>Features</a>
          <a href="#pricing" className="block text-label-md text-secondary hover:text-foreground transition-colors duration-200" onClick={() => setMobileOpen(false)}>Pricing</a>
          <a href="/book-demo" className="block text-label-md px-5 py-2.5 rounded-lg bg-accent text-background font-medium text-center mt-4" onClick={() => setMobileOpen(false)}>Book a Demo</a>
        </div>
      )}
    </nav>
  );
}