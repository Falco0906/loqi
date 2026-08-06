import DesktopWindow from "../ui/DesktopWindow";
import MockThemeSwitcher from "../mocks/MockThemeSwitcher";
import MissionControlMock from "../mocks/MissionControlMock";
import MissionControlLightMock from "../mocks/MissionControlLightMock";
import DiscoveryMock from "../mocks/DiscoveryMock";
import DiscoveryLightMock from "../mocks/DiscoveryLightMock";
import InboxMock from "../mocks/InboxMock";
import InboxLightMock from "../mocks/InboxLightMock";
import CampaignsMock from "../mocks/CampaignsMock";
import CampaignsLightMock from "../mocks/CampaignsLightMock";

const showcases = [
  {
    title: "Mission Control",
    description: "The command center for your entire outbound operation.",
    dark: <MissionControlMock />,
    light: <MissionControlLightMock />,
  },
  {
    title: "Lead Discovery",
    description: "Find and enrich companies and decision makers effortlessly.",
    dark: <DiscoveryMock />,
    light: <DiscoveryLightMock />,
  },
  {
    title: "Review Queue",
    description: "Human oversight for trust-first, AI-generated outreach.",
    dark: <InboxMock />,
    light: <InboxLightMock />,
  },
  {
    title: "Campaign Analytics",
    description: "Real-time performance tracking and optimization.",
    dark: <CampaignsMock />,
    light: <CampaignsLightMock />,
  },
];

export default function WorkspaceTour() {
  return (
    <section className="py-40 px-6 sm:px-8">
      <div className="max-w-6xl mx-auto animate-on-scroll">
        <div className="text-center mb-20">
          <p className="text-label-sm uppercase tracking-[0.2em] text-accent mb-4 font-medium">
            THE WORKSPACE
          </p>
          <h2 className="text-display-sm font-semibold text-foreground tracking-tight mb-6">
            Everything lives in one workspace.
          </h2>
          <p className="text-body-lg text-secondary max-w-2xl mx-auto">
            Discovery, research, approvals, campaigns, and analytics—designed to work together instead of across five different tools.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 stagger-children">
          {showcases.map((showcase, index) => (
            <div key={index} className="group flex flex-col gap-6">
              <div className="transition-transform duration-500 ease-out group-hover:-translate-y-2">
                <DesktopWindow>
                  <div className="h-[460px] overflow-hidden">
                    <MockThemeSwitcher
                      dark={showcase.dark}
                      light={showcase.light}
                    />
                  </div>
                </DesktopWindow>
              </div>
              <div className="px-2">
                <h3 className="text-heading font-semibold text-foreground mb-2">
                  {showcase.title}
                </h3>
                <p className="text-body text-secondary max-w-sm">
                  {showcase.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}