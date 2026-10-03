import Link from "next/link";
import { CTA_URL } from "./config";
import { faq, lanes, loqiStack, oldStack, principles } from "./content";
import LoqiBrand from "./LoqiBrand";
import HeroNetwork from "./HeroNetwork";

export function AccessLink({ small = false }: { small?: boolean }) {
  return <a className={`btn primary${small ? " sm" : ""}`} href={CTA_URL}>Request early access <span aria-hidden="true">↗</span></a>;
}

export function Nav({ home = true }: { home?: boolean }) {
  const base = home ? "" : "/";
  return <header className="nav"><div className="wrap nav-in">
    <a className="logo" href={`${base}#top`} aria-label="Loqi home"><LoqiBrand /></a><span className="beta">Beta</span>
    <nav className="nav-links" aria-label="Primary"><a href={`${base}#how`}>Product</a><a href={`${base}#together`}>How we work</a><a href={`${base}#access`}>Early access</a><a href={`${base}#questions`}>FAQs</a><a className="focality-link" href="https://focality.space/" target="_blank" rel="noopener noreferrer">focality <span aria-hidden="true">↗</span></a></nav>
    <div className="nav-right"><AccessLink small /><a className="focality-mobile" href="https://focality.space/" target="_blank" rel="noopener noreferrer">focality <span aria-hidden="true">↗</span></a></div>
  </div></header>;
}

export function Hero() {
  return <section className="hero wrap" aria-labelledby="hero-heading">
    <HeroNetwork />
    <h1 id="hero-heading" className="h1">Find the people<br /><em>worth reaching.</em></h1>
    <p className="lede">A little less prospecting. A lot more perspective. Loqi finds relevant companies, researches the people behind them, and prepares outreach for your review.</p>
    <div className="cta-row"><AccessLink /><a className="text-link" href="#how">Step inside Loqi <span aria-hidden="true">↓</span></a></div>
    <div className="hero-foot"><p>Who to reach. <span>Why they matter.</span> What to say.</p><span className="hand-note">The final call is yours.<svg viewBox="0 0 58 28" width="58" height="28" fill="none" aria-hidden="true"><path d="M2 3c24-6 35 1 34 18m-7-6 7 8 8-7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg></span></div>
  </section>;
}

export function Lanes() {
  return <section className="together" id="together"><div className="wrap together-grid">
    <div className="section-intro"><p className="sys">A working relationship</p><h2 className="h2">A capable partner.<br /><em>A human in charge.</em></h2><p className="sec-lede">Your sales team works with Loqi. Not instead of it. Let the research move forward while you stay close to the decisions.</p><a href="#stage-6" className="text-link">Try the approval queue <span aria-hidden="true">↗</span></a><div className="control-note"><span aria-hidden="true">✓</span> Every message gets a human decision.</div></div>
    <ol className="lanes">{lanes.map((lane, i) => <li className={`lane ${lane.who.toLowerCase()}`} key={lane.title}><span className="lane-num">0{i + 1}</span><div className="txt"><span className="who">{lane.who}</span><h3>{lane.title}</h3><p>{lane.body}</p></div></li>)}</ol>
  </div></section>;
}

export function Comparison() {
  return <section className="sec wrap comparison" id="stack"><div className="section-heading"><div><p className="sys">Keep the context</p><h2 className="h2">Less stitching.<br /><em>More understanding.</em></h2></div><p className="sec-lede">Your outbound stack shouldn’t look like a trail of browser tabs. Carry the target, the research, and the first message through one workspace.</p></div>
    <div className="versus"><div className="vs-col fragmented"><p className="sys">The familiar routine</p><h3>Context, scattered everywhere.</h3><ul className="chain">{oldStack.map(name => <li key={name}>{name}</li>)}</ul><p className="comparison-note">Find a name. Copy a link. Open another tab. Start again.</p></div><div className="vs-col connected"><p className="sys">A more considered workflow</p><LoqiBrand /><ol className="chain clean">{loqiStack.map((name, i) => <li key={name}><span className="chain-index">0{i + 1}</span>{name}</li>)}</ol><p className="comparison-note">The research stays with the relationship.</p></div></div>
  </section>;
}

export function Principles() {
  return <section className="principles"><div className="wrap"><p className="sys">Built with intention</p><h2 className="h2">Good outreach starts<br /><em>with good judgment.</em></h2><div className="prin">{principles.map(([title, body], i) => <div key={title}><span className="principle-number">0{i + 1}</span><h3>{title}</h3><p>{body}</p></div>)}</div></div></section>;
}

export function EarlyAccess() {
  return <section className="sec wrap" id="access"><div className="access"><div><p className="sys">Loqi Beta / Early access</p><h2 className="h2">An earlier start.<br /><em>A closer conversation.</em></h2></div><div><p>For founders, sales teams, and lean GTM teams who want to spend more time with the right people.</p><p>Get access to Loqi while we build alongside our earliest users. We’ll help you start with a target worth exploring.</p><AccessLink /></div></div>
    <div className="faq-layout" id="questions"><div><p className="sys">A few things to know</p><h2 className="h2">Thoughtful questions.<br /><em>Clear answers.</em></h2><p className="sec-lede">Loqi is in Beta. Here’s what that means for you.</p></div><div className="faq">{faq.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div>
  </section>;
}

export function FinalCTA() {
  return <section className="final"><div className="wrap"><p className="sys">Your next worthwhile conversation</p><h2 className="h1">The right people.<br /><em>A better first hello.</em></h2><p className="sec-lede">Give Loqi the target. Bring your judgment.</p><div className="cta-row"><AccessLink /></div><p className="fine">Made for the work before the conversation.</p></div></section>;
}

export function Footer() {
  return <footer className="footer"><div className="wrap foot-in"><a href="#top" aria-label="Loqi home"><LoqiBrand /></a><span>© 2026 Loqi. Made by <a href="https://focality.space">focality</a>.</span><nav className="foot-links" aria-label="Footer"><Link href="/legal/terms">Terms</Link><Link href="/legal/privacy">Privacy</Link><Link href="/contact">Contact</Link></nav></div></footer>;
}
