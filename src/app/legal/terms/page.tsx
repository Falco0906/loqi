"use client";

import LegalPageLayout from "@/components/ui/LegalPageLayout";
import SectionTitle from "@/components/ui/SectionTitle";
import ParagraphBlock from "@/components/ui/ParagraphBlock";

export default function TermsPage() {
  return (
    <LegalPageLayout title="Terms of Service" lastUpdated="March 2026">
      
      <section>
        <SectionTitle>1. About Loqi</SectionTitle>
        <ParagraphBlock>
          Loqi operates as an AI-powered sales assistant designed to help you find leads and draft outbound outreach. Our service provides you with tools to streamline your outreach workflow from within conversational interfaces like Telegram and WhatsApp.
        </ParagraphBlock>
      </section>

      <section>
        <SectionTitle>2. Your Responsibilities</SectionTitle>
        <ParagraphBlock>
          When using Loqi, you agree to use the service for lawful purposes only. You are solely responsible for ensuring that your outreach complies with all applicable antispam laws (like CAN-SPAM or GDPR). Loqi is a tool to assist you, not a license to blast unsolicited messages. We ask that you maintain a high standard of respect when reaching out to others.
        </ParagraphBlock>
      </section>

      <section>
        <SectionTitle>3. AI-Generated Content</SectionTitle>
        <ParagraphBlock>
          Our AI models draft outreach based on the parameters you provide. While we strive for high quality and relevance, artificial intelligence can sometimes hallucinate or generate phrasing that isn&apos;t quite right. You are responsible for reviewing, approving, and verifying all AI-generated content before sending it to prospects.
        </ParagraphBlock>
      </section>

      <section>
        <SectionTitle>4. Data and Privacy</SectionTitle>
        <ParagraphBlock>
          We take your data seriously. For detailed information on how we collect, use, and store information related to your account and prospects, please review our Privacy Policy.
        </ParagraphBlock>
      </section>

      <section>
        <SectionTitle>5. Account Termination</SectionTitle>
        <ParagraphBlock>
          You can stop using Loqi at any time. We also reserve the right to suspend or terminate your access to the service if we determine that you are abusing the platform, sending malicious spam, or violating these terms in a way that harms the product or other users.
        </ParagraphBlock>
      </section>

      <section>
        <SectionTitle>6. Disclaimer of Warranties</SectionTitle>
        <ParagraphBlock>
          Loqi is provided on an &quot;as is&quot; and &quot;as available&quot; basis without any warranties, either express or implied. We do not guarantee that the service will be uninterrupted, error-free, or perfectly accurate in its lead generation or drafting.
        </ParagraphBlock>
      </section>

      <section>
        <SectionTitle>7. Changes to these Terms</SectionTitle>
        <ParagraphBlock>
          We may update these terms from time to time as our product evolves. If we make significant changes, we will notify you via email or through an announcement within the product. Your continued use of Loqi after the changes constitutes your acceptance of the new terms.
        </ParagraphBlock>
      </section>

      <section>
        <SectionTitle>8. Contact Us</SectionTitle>
        <ParagraphBlock>
          If you have any questions about these terms or how we operate, please reach out to us at <a href="mailto:contact@tryloqi.com" className="text-accent-light hover:text-white transition-colors duration-200">contact@tryloqi.com</a>. We are always happy to clarify.
        </ParagraphBlock>
      </section>

    </LegalPageLayout>
  );
}
