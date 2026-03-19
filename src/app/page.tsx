"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Explanation from "@/components/sections/Explanation";
import HowItWorks from "@/components/sections/HowItWorks";
import ChatDemo from "@/components/sections/ChatDemo";
import Comparison from "@/components/sections/Comparison";
import OnboardingForm from "@/components/sections/OnboardingForm";
import Trust from "@/components/sections/Trust";
import Footer from "@/components/sections/Footer";

export default function Home() {
  useScrollAnimation();

  return (
    <main className="relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <Explanation />
      <HowItWorks />
      <ChatDemo />
      <Comparison />
      <OnboardingForm />
      <Trust />
      <Footer />
    </main>
  );
}
