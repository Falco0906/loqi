"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#12141c]/80 backdrop-blur-xl border-b border-slate-800/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-xl font-semibold tracking-tight text-white">
          loqi
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a
            href="#how-it-works"
            className="text-sm text-slate-400 hover:text-slate-200 transition-colors duration-300"
          >
            How it works
          </a>
          <a
            href="#demo"
            className="text-sm text-slate-400 hover:text-slate-200 transition-colors duration-300"
          >
            Demo
          </a>
          <a
            href="#compare"
            className="text-sm text-slate-400 hover:text-slate-200 transition-colors duration-300"
          >
            Compare
          </a>
          <a
            href="#start"
            className="text-sm px-5 py-2 rounded-full bg-accent text-white font-medium hover:bg-accent-dark transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
          >
            Request access
          </a>
        </div>
      </div>
    </nav>
  );
}
