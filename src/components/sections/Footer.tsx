"use client";

export default function Footer() {
  return (
    <footer className="relative py-16 px-6 border-t border-slate-800/30">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <a href="#" className="text-lg font-semibold text-white tracking-tight">
              loqi
            </a>
            <span className="text-sm text-slate-600">
              The AI Sales Operator
            </span>
          </div>

          <div className="flex items-center gap-8">
            <a
              href="#how-it-works"
              className="text-sm text-slate-500 hover:text-slate-300 transition-colors duration-300"
            >
              How it works
            </a>
            <a
              href="#compare"
              className="text-sm text-slate-500 hover:text-slate-300 transition-colors duration-300"
            >
              Compare
            </a>
            <a
              href="#start"
              className="text-sm text-slate-500 hover:text-slate-300 transition-colors duration-300"
            >
              Get started
            </a>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-slate-800/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Loqi. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-xs text-slate-600 hover:text-slate-400 transition-colors duration-300"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-xs text-slate-600 hover:text-slate-400 transition-colors duration-300"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
