"use client";

export default function Footer() {
  return (
    <footer className="relative py-16 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <a href="#" className="text-lg font-semibold text-foreground tracking-tight">
              Loqi
            </a>
            <span className="text-sm text-tertiary">
              AI-Native Outbound Workspace
            </span>
          </div>

          <div className="flex items-center gap-8">
            <a
              href="#how-it-works"
              className="text-sm text-secondary hover:text-secondary transition-colors duration-300"
            >
              How it works
            </a>
            <a
              href="#features"
              className="text-sm text-secondary hover:text-secondary transition-colors duration-300"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-sm text-secondary hover:text-secondary transition-colors duration-300"
            >
              Pricing
            </a>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-tertiary">
            © 2026 Loqi. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="/book-demo"
              className="text-xs text-secondary hover:text-secondary transition-colors duration-300"
            >
              Book a Demo
            </a>
            <a
              href="/legal/terms"
              className="text-xs text-secondary hover:text-secondary transition-colors duration-300"
            >
              Terms
            </a>
            <a
              href="/legal/privacy"
              className="text-xs text-secondary hover:text-secondary transition-colors duration-300"
            >
              Privacy
            </a>
            <a
              href="/contact"
              className="text-xs text-secondary hover:text-secondary transition-colors duration-300"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
