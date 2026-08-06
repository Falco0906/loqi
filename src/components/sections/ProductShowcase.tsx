import DesktopWindow from "../ui/DesktopWindow";
import MissionControlMock from "../mocks/MissionControlMock";

export default function ProductShowcase() {
  return (
    <section className="pt-6 pb-20 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto animate-on-scroll">
        <DesktopWindow className="shadow-2xl shadow-accent/5">
          <MissionControlMock />
        </DesktopWindow>
      </div>
    </section>
  );
}