"use client";

import LegalPageLayout from "@/components/ui/LegalPageLayout";
import ParagraphBlock from "@/components/ui/ParagraphBlock";

export default function ContactPage() {
  return (
    <LegalPageLayout title="Contact">
      <div className="bg-surface-light/40 border border-slate-800/50 rounded-2xl p-8 sm:p-12 mb-8 backdrop-blur-md">
        <h2 className="text-xl font-medium text-white tracking-tight mb-4">
          How can we help?
        </h2>
        <ParagraphBlock className="mb-0">
          Whether you have a question about setting up your outbound flows, need help with your account, or just want to chat about AI sales strategies—our team is here for you. We skip the giant forms and annoying support tickets. Just email us directly.
        </ParagraphBlock>
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
        <a 
          href="mailto:founder@tryloqi.com"
          className="group flex flex-col flex-1 bg-surface border border-slate-800/50 rounded-2xl p-6 hover:border-accent/50 hover:bg-surface-light/30 transition-all duration-300"
        >
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4 text-accent">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
          </div>
          <h3 className="text-white font-medium mb-1 group-hover:text-accent-light transition-colors">Email Us</h3>
          <p className="text-slate-400 text-sm">founder@tryloqi.com</p>
        </a>

        <div className="flex flex-col flex-1 bg-surface border border-slate-800/50 rounded-2xl p-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 text-emerald-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <h3 className="text-white font-medium mb-1">Response Time</h3>
          <p className="text-slate-400 text-sm">We typically respond within 24–48 hours.</p>
        </div>
      </div>
    </LegalPageLayout>
  );
}
