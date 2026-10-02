import { Nav, Footer } from "./PageSections";
import styles from "./Landing.module.css";
import subpages from "./Subpages.module.css";

export default function SubpageLayout({ children }: { children: React.ReactNode }) {
  return <div id="top" className={`${styles.landing} ${subpages.subpage}`}>
    <a className="skip-link" href="#content">Skip to content</a>
    <Nav home={false} />
    <div id="content" className="subpage-content">{children}</div>
    <Footer />
  </div>;
}
