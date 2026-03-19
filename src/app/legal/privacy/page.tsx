"use client";

import LegalPageLayout from "@/components/ui/LegalPageLayout";
import SectionTitle from "@/components/ui/SectionTitle";
import ParagraphBlock from "@/components/ui/ParagraphBlock";

export default function PrivacyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="March 2026">
      
      <section>
        <SectionTitle>1. What data we collect</SectionTitle>
        <ParagraphBlock>
          We collect the information you provide when interacting with Loqi. This includes your contact details, your target audience parameters, and the specifics of what you are selling. We also securely log the chat history you have with our AI to maintain context and improve the quality of your outreach.
        </ParagraphBlock>
      </section>

      <section>
        <SectionTitle>2. How we use your data</SectionTitle>
        <ParagraphBlock>
          Your data is used strictly to provide and improve the Loqi service. We use your inputs to query our lead databases and instruct our language models to draft highly personalized outreach. We do not use your private conversations for public training models or unrelated advertising.
        </ParagraphBlock>
      </section>

      <section>
        <SectionTitle>3. Third-party services</SectionTitle>
        <ParagraphBlock>
          To function effectively, Loqi relies on trusted third-party services. We use external Large Language Models (LLMs) to power our conversational AI and specialized data providers to fetch accurate lead information. We only share the minimum data necessary to process these specific requests.
        </ParagraphBlock>
      </section>

      <section>
        <SectionTitle>4. Data sharing</SectionTitle>
        <ParagraphBlock>
          We believe your business data is yours. We do not sell, rent, or trade your personal information, chat logs, or your generated leads to any outside parties for marketing purposes. Your pipeline remains strictly confidential.
        </ParagraphBlock>
      </section>

      <section>
        <SectionTitle>5. Data storage</SectionTitle>
        <ParagraphBlock>
          We store your data securely using industry-standard encryption practices. Your information is held for as long as your account is active, ensuring a seamless experience when you return to your chat interface to resume your outbound campaigns.
        </ParagraphBlock>
      </section>

      <section>
        <SectionTitle>6. Your rights</SectionTitle>
        <ParagraphBlock>
          You retain complete control over your data. You have the right to request a full export of your information or ask us to permanently delete your account and all associated chat logs at any time. Just drop us an email, and we will process your request promptly.
        </ParagraphBlock>
      </section>

      <section>
        <SectionTitle>7. Contact Us</SectionTitle>
        <ParagraphBlock>
          If you have questions about how your data is handled or wish to exercise your data rights, please contact our team at <a href="mailto:contact@tryloqi.com" className="text-accent-light hover:text-white transition-colors duration-200">contact@tryloqi.com</a>.
        </ParagraphBlock>
      </section>

    </LegalPageLayout>
  );
}
