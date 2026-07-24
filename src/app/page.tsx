"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import ProductShowcase from "@/components/sections/ProductShowcase";
import AIWorkflow from "@/components/sections/AIWorkflow";
import WorkspaceTour from "@/components/sections/WorkspaceTour";
import WhySwitch from "@/components/sections/WhySwitch";
import Trust from "@/components/sections/Trust";
import PricingSection from "@/components/sections/PricingSection";
import OnboardingForm from "@/components/sections/OnboardingForm";
import Footer from "@/components/sections/Footer";

export default function Home() {
  useScrollAnimation();

  return (
    <main className="relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <ProductShowcase />
      <AIWorkflow />
      <WorkspaceTour />
      <WhySwitch />
      <Trust />
      <PricingSection />
      <OnboardingForm />
      <Footer />
    </main>
  );
}