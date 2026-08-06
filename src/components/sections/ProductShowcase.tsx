import DesktopWindow from "../ui/DesktopWindow";
import MockThemeSwitcher from "../mocks/MockThemeSwitcher";
import MissionControlMock from "../mocks/MissionControlMock";
import MissionControlLightMock from "../mocks/MissionControlLightMock";

export default function ProductShowcase() {
  return (
    <section className="pt-6 pb-20 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto animate-on-scroll">
        <DesktopWindow className="shadow-2xl shadow-accent/5">
          <MockThemeSwitcher
            dark={<MissionControlMock />}
            light={<MissionControlLightMock />}
          />
        </DesktopWindow>
      </div>
    </section>
  );
}