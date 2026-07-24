import React from 'react';

const workflowSteps = [
  { task: "Find prospects", tool: "Apollo" },
  { task: "Research companies", tool: "LinkedIn" },
  { task: "Write emails", tool: "ChatGPT" },
  { task: "Edit messaging", tool: "Google Docs" },
  { task: "Launch campaign", tool: "HubSpot" },
  { task: "Track replies", tool: "Spreadsheet" },
];

function WorkflowStep({ task, tool }: { task: string, tool: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl border border-border bg-surface px-5 py-4 transition-all duration-300 hover:border-border/50">
      <span className="text-label-sm text-tertiary uppercase tracking-wider">{task}</span>
      <span className="text-body-lg font-medium text-foreground">{tool}</span>
    </div>
  );
}

function Connector() {
  return (
    <div className="hidden md:flex flex-col items-center gap-4 text-tertiary">
      <div className="w-px h-16 bg-border" />
      <div className="flex flex-col items-center gap-1 text-center">
        <span className="text-label-sm text-secondary">6 tools</span>
        <span className="text-label-sm text-tertiary">↓</span>
        <span className="text-label-sm text-foreground font-medium">1 workspace</span>
      </div>
      <div className="w-px h-16 bg-border" />
    </div>
  );
}

function MissionControlCard() {
  return (
    <div className="bg-surface rounded-2xl border border-border p-8 shadow-sm">
      <h3 className="text-heading font-semibold text-foreground mb-6">Mission Control</h3>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <span className="text-label-sm text-tertiary uppercase tracking-wider">Campaign</span>
          <p className="text-body-lg font-medium text-foreground">Series A Fintech Outreach</p>
        </div>

        <div className="space-y-2">
          <span className="text-label-sm text-tertiary uppercase tracking-wider">Status</span>
          <div>
            <span className="inline-flex items-center rounded-full bg-surface-hover px-2.5 py-0.5 text-label-sm font-medium text-secondary border border-border">
              Running
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="space-y-1">
            <p className="text-display-sm font-medium text-foreground">126</p>
            <p className="text-label-sm text-tertiary">Prospects</p>
          </div>
          <div className="space-y-1">
            <p className="text-display-sm font-medium text-foreground">381</p>
            <p className="text-label-sm text-tertiary">Contacts</p>
          </div>
        </div>
        
        <div className="space-y-1">
          <p className="text-display-sm font-medium text-foreground">126</p>
          <p className="text-label-sm text-tertiary">Personalized drafts</p>
        </div>

        <div className="border-t border-border pt-6 flex justify-between items-center">
          <span className="text-label-lg text-secondary">Waiting for review</span>
          <a href="#" className="text-label-lg text-accent hover:text-accent-light transition-colors">
            Review campaign →
          </a>
        </div>
      </div>
    </div>
  );
}

export default function WhySwitch() {
  return (
    <section className="py-40 px-6 sm:px-8">
      <div className="max-w-6xl mx-auto animate-on-scroll">
        <div className="text-center mb-20">
          <p className="text-label-sm uppercase tracking-[0.2em] text-accent mb-4 font-medium">
            WHY TEAMS SWITCH
          </p>
          <h2 className="text-display-sm font-semibold text-foreground tracking-tight mb-6">
            Stop stitching your outbound together.
          </h2>
          <p className="text-body-lg text-secondary max-w-2xl mx-auto">
            Modern outbound should not require six different products. Loqi brings discovery, research, drafting, approvals, and campaigns into one workspace.
          </p>
        </div>

        <div className="grid md:grid-cols-[1fr,auto,1fr] gap-12 md:gap-16 items-start">
          {/* Today */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1 mb-2">
              <span className="text-label-sm text-tertiary uppercase tracking-wider">Today</span>
              <span className="text-label-lg text-secondary font-medium">Your outbound workflow</span>
            </div>
            {workflowSteps.map((step, i) => (
              <WorkflowStep key={i} {...step} />
            ))}
          </div>

          <Connector />

          {/* Tomorrow */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1 mb-2">
              <span className="text-label-sm text-accent uppercase tracking-wider">Tomorrow</span>
              <span className="text-label-lg text-foreground font-medium">Loqi Workspace</span>
            </div>
            <MissionControlCard />
          </div>
        </div>
      </div>
    </section>
  );
}