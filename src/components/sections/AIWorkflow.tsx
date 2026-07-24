"use client";

import React from 'react';

const tasks = [
  { label: "Searching companies...", status: "completed", time: "2s" },
  { label: "Researching founders...", status: "completed", time: "5s" },
  { label: "Finding verified emails...", status: "completed", time: "1s" },
  { label: "Writing personalized outreach...", status: "completed", time: "8s" },
  { label: "Creating campaign...", status: "completed", time: "1s" },
];

export default function AIWorkflow() {
  return (
    <section id="how-it-works" className="py-40 px-6 sm:px-8">
      <div className="max-w-4xl mx-auto animate-on-scroll">
        <div className="text-center mb-16">
          <p className="text-label-sm uppercase tracking-[0.2em] text-accent mb-4 font-medium">
            THE AI WORKFLOW
          </p>
          <h2 className="text-display-sm font-semibold text-foreground tracking-tight mb-6">
            Give Loqi a goal.<br />
            Watch the work happen.
          </h2>
          <p className="text-body-lg text-secondary max-w-lg mx-auto">
            Describe your ideal customer once.<br />
            Loqi handles research, personalization, approvals, and campaign execution.
          </p>
        </div>

        {/* Conversation/Execution Panel */}
        <div className="bg-surface rounded-2xl border border-border shadow-2xl shadow-accent/5 p-8 sm:p-10">
          <div className="space-y-6">
            {/* User Task */}
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-surface-hover border border-border flex items-center justify-center text-secondary text-label-sm font-medium">U</div>
              <p className="text-foreground text-body-lg pt-1">
                Find Series A fintech companies in Europe with 20–200 employees.
              </p>
            </div>
            
            <div className="border-t border-border my-6" />

            {/* AI Log */}
            <div className="space-y-4">
              {tasks.map((task, index) => (
                <div key={index} className="flex justify-between items-center text-body text-secondary">
                  <div className="flex items-center gap-3">
                    <span className="text-success text-sm">✓</span>
                    {task.label}
                  </div>
                  <span className="text-label-sm text-tertiary">{task.time}</span>
                </div>
              ))}
              
              <div className="flex justify-between items-center pt-2">
                 <div className="text-accent font-medium text-body">
                   Ready for review.
                 </div>
                 <div className="px-2 py-0.5 rounded text-label-sm bg-accent-muted text-accent">
                   Drafts generated
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}