"use client";

export default function Explanation() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="animate-on-scroll">
          <p className="text-sm uppercase tracking-widest text-accent-light/70 mb-6 font-medium">
            What is Loqi?
          </p>
        </div>

        <div className="space-y-6 animate-on-scroll">
          <p className="text-display-sm font-medium text-foreground leading-snug">
            The workspace for
            <br />
            outbound teams.
          </p>
        </div>

        <div className="mt-12 space-y-6 animate-on-scroll">
          <p className="text-body-lg text-secondary leading-relaxed">
            Most outbound workflows are fragmented across a dozen tools
            and hundreds of manual steps. Loqi brings everything into one
            place — research, drafting, campaign management, and review.
          </p>

          <p className="text-body-lg text-secondary leading-relaxed">
            Set your criteria. Loqi handles the research and generates
            personalized outreach for each prospect. You review, edit,
            and approve. Campaigns run in parallel. Replies are tracked.
            Patterns emerge.
          </p>

          <p className="text-body text-tertiary leading-relaxed">
            Not a chatbot. Not a CRM. An intelligent workspace designed
            around how outbound actually works.
          </p>
        </div>

        {/* Decorative divider */}
        <div className="mt-20 flex items-center gap-4 animate-on-scroll">
          <div className="h-px flex-1 bg-border" />
          <div className="w-1.5 h-1.5 rounded-full bg-accent/40" />
          <div className="h-px flex-1 bg-border" />
        </div>
      </div>
    </section>
  );
}
