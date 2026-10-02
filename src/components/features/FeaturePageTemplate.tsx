import Link from "next/link";
import { AccessLink } from "@/components/landing/PageSections";

export default function FeaturePageTemplate({ title, description }: { title: string; description: string }) {
  return <main className="legal-content">
    <p className="sys">Loqi Beta / Workspace</p><h1>{title}</h1>
    <p className="sec-lede">{description}</p>
    <div className="feature-list">
      <article className="feature-item"><h2>Keep the context close.</h2><p>Move from a target to account research, relevant people, and an informed first message.</p><Link href="/#how">Explore the sample workspace ↗</Link></article>
      <article className="feature-item"><h2>You make the call.</h2><p>Review and edit the outreach before approving it. Our interactive demo shows how that relationship works.</p><Link href="/#stage-6">Try the approval queue ↗</Link></article>
    </div><div className="cta-row"><AccessLink /></div>
  </main>;
}
