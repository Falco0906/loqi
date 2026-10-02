"use client";
import { createContext, useContext, useRef, useState, type KeyboardEvent } from "react";
import { demo, criteria, initialDecisions } from "./data";
export function useDemoModel() {
  const queue = useRef<HTMLDivElement>(null);
  const [account, setAccount] = useState(0);
  const [contacts, setContacts] = useState(demo.details.map(() => 0));
  const [active, setActive] = useState(criteria.map(() => true));
  const [highlight, setHighlight] = useState<number | null>(null);
  const [decisions, setDecisions] = useState(initialDecisions);
  const [edits, setEdits] = useState<Record<number, string>>({});
  const [selectedQueue, setSelectedQueue] = useState(0);
  const [editing, setEditing] = useState(false);
  const [keyboard, setKeyboard] = useState(false);
  function plain(i: number) {
    return demo.details[i].body.replace("{first}", demo.details[i].people[contacts[i]][0].split(" ")[0]).replace(/\[\[\d\|(.+?)\]\]/g, "$1");
  }
  function action(kind: string) {
    if (kind === "approve" || kind === "reject") {
      if (decisions[selectedQueue]) return;
      setEditing(false);
      setDecisions(current => ({ ...current, [selectedQueue]: kind === "approve" ? "approved" : "rejected" }));
      for (let n = 1; n < demo.details.length; n++) {
        const next = (selectedQueue + n) % demo.details.length;
        if (!decisions[next]) { setSelectedQueue(next); break; }
      }
      queue.current?.focus({ preventScroll: true });
    } else if (kind === "undo") {
      setDecisions(current => { const next = { ...current }; delete next[selectedQueue]; return next; });
    } else if (kind === "edit" && !decisions[selectedQueue]) {
      setEditing(!editing);
      if (editing) queue.current?.focus({ preventScroll: true });
    }
  }
  function onQueueKey(event: KeyboardEvent) {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    if (editing) { if (event.key === "Escape") { event.preventDefault(); action("edit"); } return; }
    const key = event.key.toLowerCase();
    if (key === "j" || key === "arrowdown") setSelectedQueue(i => Math.min(4, i + 1));
    else if (key === "k" || key === "arrowup") setSelectedQueue(i => Math.max(0, i - 1));
    else if (key === "a") action("approve");
    else if (key === "r") action("reject");
    else if (key === "e") action("edit");
    else if (key === "u") action("undo");
    else return;
    event.preventDefault();
  }
  const tabs = <div className="tabs2" role="group" aria-label="Choose an account">{demo.details.map((_, i) => <button key={i} className="tab2" aria-pressed={account === i} onClick={() => { setAccount(i); setHighlight(null); }}>{demo.accounts[i].name}</button>)}</div>;
  const a = demo.accounts[account], d = demo.details[account];
  const person = d.people[contacts[account]];
  const verdicts = demo.accounts.map(a => {
    const failed = criteria.find((rule, i) => active[i] && !rule.test(a));
    return { account: a, why: failed ? failed.why(a) : ("thin" in a && a.thin) ? "Too few public signals to personalize" : a.match < 70 ? `Match ${a.match}%, below threshold` : "" };
  });
  const qualified = verdicts.filter(v => !v.why).sort((x, y) => y.account.match - x.account.match);
  const skipped = verdicts.filter(v => v.why);
  const q = demo.details[selectedQueue], qp = q.people[contacts[selectedQueue]], decision = decisions[selectedQueue];
  const sources = <ul>{d.signals.map(([text, source], i) => <li key={text} tabIndex={0} onMouseEnter={() => setHighlight(i + 1)} onMouseLeave={() => setHighlight(null)} onFocus={() => setHighlight(i + 1)} onBlur={() => setHighlight(null)} className={`sg ${highlight === i + 1 ? "hl" : ""}`}><span className="ix">{i + 1}</span><span>{text}</span><span className="src">{source}</span></li>)}</ul>;
  const draftBody = d.body.replace("{first}", person[0].split(" ")[0]).split("\n\n").map((paragraph, p) => <p key={p}>{paragraph.split(/(\[\[\d\|.+?\]\])/g).map((part, i) => {
    const ref = part.match(/^\[\[(\d)\|(.+?)\]\]$/);
    return ref ? <span key={i} tabIndex={0} className={`ref ${highlight === Number(ref[1]) ? "hl" : ""}`} onMouseEnter={() => setHighlight(Number(ref[1]))} onMouseLeave={() => setHighlight(null)} onFocus={() => setHighlight(Number(ref[1]))} onBlur={() => setHighlight(null)}>{ref[2]}<sup>{ref[1]}</sup></span> : part;
  })}</p>);

  return { queue, account, setAccount, contacts, setContacts, active, setActive, highlight, setHighlight, decisions, setDecisions, edits, setEdits, selectedQueue, setSelectedQueue, editing, setEditing, keyboard, setKeyboard, plain, action, onQueueKey, tabs, a, d, person, qualified, skipped, q, qp, decision, sources, draftBody };
}
export type DemoModel = ReturnType<typeof useDemoModel>;
export const DemoContext = createContext<DemoModel | null>(null);
export function useDemo() { const model = useContext(DemoContext); if (!model) throw new Error("Missing demo workspace"); return model; }
