import Link from "next/link";

const features = [
  { name: "Define the target", desc: "Start with the companies and people you want to reach, in your own words.", href: "/#how" },
  { name: "Discover and qualify", desc: "Review relevant accounts, their fit, and the reasons others were skipped.", href: "/#stage-2" },
  { name: "Understand the context", desc: "Explore company research and the signals behind a recommendation.", href: "/#context" },
  { name: "Find the right person", desc: "Compare roles and choose who makes sense for the conversation.", href: "/#stage-4" },
  { name: "Prepare the first message", desc: "See how the available context informs a personalized draft.", href: "/#message" },
  { name: "Make the final call", desc: "Review, edit, approve or reject. The decision stays with you.", href: "/#stage-6" },
];

export default function FeaturesIndex() {
  return <main className="sec wrap">
    <p className="sys">Inside Loqi / Beta</p>
    <h1>From a target<br /><em>to a worthwhile conversation.</em></h1>
    <p className="sec-lede">One connected workflow. Explore each step in our interactive sample workspace.</p>
    <div className="feature-list">{features.map(feature => <article className="feature-item" key={feature.name}>
      <h2>{feature.name}</h2><p>{feature.desc}</p><Link href={feature.href}>Explore the demo ↗</Link>
    </article>)}</div>
  </main>;
}
