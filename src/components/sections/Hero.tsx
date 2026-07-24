import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="pt-48 pb-16 px-6 text-center">
      <div className="max-w-5xl mx-auto animate-on-scroll">
        <h1 className="text-[6.5rem] font-semibold text-foreground tracking-[-0.04em] leading-[0.9] mb-10">
          AI-Native Outbound Workspace.
        </h1>
        <p className="text-body-lg text-secondary mb-12 max-w-xl mx-auto">
          Research prospects, generate personalized outreach, and manage campaigns from one intelligent workspace.
        </p>
        <div className="flex flex-col items-center gap-4">
          <Button href="/book-demo" size="lg" className="px-12 text-base">
            Book a Demo
          </Button>
          <a href="#how-it-works" className="text-label-md text-secondary hover:text-foreground transition-colors duration-200">
            Learn more
          </a>
        </div>
      </div>
    </section>
  );
}