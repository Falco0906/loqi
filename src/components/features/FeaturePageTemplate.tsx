import { FeatureHero, FeatureScreenshot, CapabilityList } from "@/components/features/FeatureComponents";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

export default function FeaturePageTemplate({ title, description }: { title: string, description: string }) {
  return (
    <main className="relative overflow-x-hidden">
      <Navbar />
      <FeatureHero title={title} description={description} />
      <FeatureScreenshot placeholderText={`${title} Product Screenshot`} />
      <CapabilityList 
        title="Key Capabilities" 
        capabilities={[
            { name: "Capability 1", desc: "Description of capability 1" },
            { name: "Capability 2", desc: "Description of capability 2" },
        ]} 
      />
      <Footer />
    </main>
  );
}
