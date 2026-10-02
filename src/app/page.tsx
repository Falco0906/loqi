import type { Metadata } from "next";
import { Nav, Hero, Lanes, Comparison, Principles, EarlyAccess, FinalCTA, Footer } from "@/components/landing/PageSections";
import WorkflowDemo from "@/components/sections/workflow-demo/WorkflowDemo";
import styles from "@/components/landing/Landing.module.css";

const description = "Loqi researches your market, finds the people worth talking to, and prepares personalized outreach. You approve every message. Now in Beta.";
export const metadata: Metadata = {
  title: "Loqi — Find the people worth reaching",
  description,
  alternates: { canonical: "https://www.tryloqi.com" },
  openGraph: { title: "Loqi — Find the people worth reaching", description, url: "https://www.tryloqi.com", siteName: "Loqi", type: "website" },
  twitter: { card: "summary", title: "Loqi — Find the people worth reaching", description },
};

export default function Home() {
  return (
    <div className={styles.landing}>
      <a className="skip-link" href="#top">Skip to content</a>
      <Nav />
      <main id="top">
        <Hero />
        <WorkflowDemo />
        <Lanes />
        <Comparison />
        <Principles />
        <EarlyAccess />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
