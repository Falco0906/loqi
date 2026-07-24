import DesktopWindow from "../ui/DesktopWindow";

export default function ProductShowcase() {
  return (
    <section className="pt-6 pb-20 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto animate-on-scroll">
        <DesktopWindow className="shadow-2xl shadow-accent/5">
          {/* Theme-dependent placeholder rendering */}
          <div className="relative h-[600px] w-full">
            <div className="absolute inset-0 bg-[#F8F5F0] hidden data-[theme='light']:flex items-center justify-center text-secondary">
               Light Theme Product Placeholder
            </div>
            <div className="absolute inset-0 bg-[#111111] hidden data-[theme='dark']:flex items-center justify-center text-secondary">
               Dark Theme Product Placeholder
            </div>
          </div>
        </DesktopWindow>
      </div>
    </section>
  );
}