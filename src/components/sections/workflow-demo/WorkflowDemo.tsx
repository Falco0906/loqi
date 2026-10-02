"use client";

import { useEffect, useRef, useState } from "react";
import { demo } from "./data";
import { DemoContext, useDemoModel } from "./model";
import Brief from "./Brief";
import { AccountField, Find } from "./AccountField";
import { Qualify, Research, Contact, Draft, Approve } from "./Stages";
import styles from "./WorkflowDemo.module.css";
import LoqiBrand from "@/components/landing/LoqiBrand";

const pad = (n: number) => String(n + 1).padStart(2, "0");
export default function WorkflowDemo() {
  const root = useRef<HTMLElement>(null);
  const stageCol = useRef<HTMLDivElement>(null);
  const beats = useRef<(HTMLElement | null)[]>([]);
  const activeView = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [briefVisible, setBriefVisible] = useState(false);
  const model = useDemoModel();
  const { setEditing, setHighlight } = model;

  useEffect(() => {
    let frame = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = window.matchMedia("(max-width: 900px)");
    const update = () => {
      frame = 0;
      if (!root.current || !stageCol.current) return;
      // Batch geometry reads before updating the shared window.
      const storyTop = root.current.getBoundingClientRect().top;
      const appBottom = stageCol.current.getBoundingClientRect().bottom;
      const y = narrow.matches ? (appBottom + window.innerHeight) / 2 : window.innerHeight * .5;
      const rects = beats.current.map(beat => beat?.getBoundingClientRect());
      let next = 0;
      rects.forEach((rect, i) => { if (rect && rect.top <= y) next = i; });
      const stickyTop = parseFloat(getComputedStyle(stageCol.current).top);
      const handoff = reduced.matches ? 1 : Math.max(0, Math.min(1, (stickyTop - storyTop) / 280));
      const findRect = rects[1];
      const found = reduced.matches ? 1 : findRect ? Math.max(0, Math.min(1, (y - findRect.top) / (findRect.height * .65))) : 0;
      root.current.style.setProperty("--handoff", String(handoff));
      setStage(next);
      setProgress(Math.round(found * 184) / 184);
    };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setBriefVisible(true); observer.disconnect(); } }, { threshold: .2 });
    if (stageCol.current) observer.observe(stageCol.current);
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll);
    reduced.addEventListener("change", scroll);
    update();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener("scroll", scroll); window.removeEventListener("resize", scroll); reduced.removeEventListener("change", scroll); };
  }, []);

  useEffect(() => {
    setEditing(false); setHighlight(null);
    const views = activeView.current;
    if (!views) return;
    const previous = views.querySelector<HTMLElement>("[data-view]:focus-within");
    if (previous && previous.dataset.view !== String(stage)) stageCol.current?.focus({ preventScroll: true });
    const current = views.querySelector<HTMLElement>(`[data-view="${stage}"]`);
    if (current) current.scrollTop = 0;
  }, [stage, setEditing, setHighlight]);

  function jumpTo(i: number) {
    const beat = beats.current[i];
    if (!beat || !stageCol.current) return;
    const narrow = window.matchMedia("(max-width: 900px)").matches;
    const top = parseFloat(getComputedStyle(stageCol.current).top);
    const y = narrow ? (top + stageCol.current.offsetHeight + window.innerHeight) / 2 : window.innerHeight / 2;
    const bounds = beat.getBoundingClientRect();
    window.scrollTo({ top: window.scrollY + bounds.top + bounds.height * .45 - y, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }
  const stages = [<Brief key="brief" visible={briefVisible} />, <Find key="find" progress={progress} />, <Qualify key="qualify" />, <Research key="research" />, <Contact key="contact" />, <Draft key="draft" />, <Approve key="approve" />];
  return <DemoContext.Provider value={model}><section id="how" ref={root} className={`${styles.demo} wrap`} aria-label="One sample search, from brief to approval">
    <div className="stage-col" ref={stageCol} tabIndex={-1}>
      <div className="app" role="group" aria-label="Loqi demo workspace with sample data">
        <div className="app-bar"><LoqiBrand /><span className="app-tab">/ {stage < 3 ? "Discover" : stage < 5 ? "Lead intelligence" : "Draft Review"}</span><span className="app-note">Sample data</span></div>
        <div className="app-prog"><i style={{ width: `${(stage + 1) / 7 * 100}%` }} /></div>
        <div className="mobile-stage"><button aria-label="Previous workflow stage" disabled={stage === 0} onClick={() => jumpTo(stage - 1)}>←</button><span className="mono">{pad(stage)} / {demo.stages[stage]}</span><button aria-label="Next workflow stage" disabled={stage === 6} onClick={() => jumpTo(stage + 1)}>→</button></div>
        <div className="app-body"><nav className="rail" aria-label="Workflow stages"><p className="rail-label">Your workflow</p>{demo.stages.map((name, i) => <button key={name} className={stage === i ? "on" : stage > i ? "past" : ""} aria-current={stage === i ? "step" : undefined} onClick={() => jumpTo(i)}><span className="i">{pad(i)}</span>{name}</button>)}<p className="rail-note">Loqi Beta<br />Human approval<br />on every message.</p></nav>
          <div className="views" ref={activeView} data-stage={stage}>
            <AccountField stage={stage} progress={progress} />
            {stages.map((content, i) => <section key={demo.stages[i]} data-view={i} className={`view ${i === 6 ? "flush" : ""} ${stage === i ? "on" : ""}`} aria-label={demo.stages[i]} hidden={stage !== i}>{content}</section>)}
          </div>
        </div>
        <div className="app-status"><span className="status-label">Demo workspace</span><span><b>47</b> drafts</span><span aria-live="polite"><b>{Object.values(model.decisions).filter(v => v === "approved").length}</b> approved · <b>{Object.values(model.decisions).filter(v => v === "rejected").length}</b> rejected</span><span className="sent"><b>0</b> sent</span></div>
      </div>
    </div>
    <div className="captions">{demo.beats.map((beat, i) => <article id={i === 3 ? "context" : i === 5 ? "message" : `stage-${i}`} key={i} ref={node => { beats.current[i] = node; }} className={`beat ${stage === i ? "on" : ""}`}><p className="folio">{pad(i)} / {demo.stages[i]}</p><h2>{beat.title}</h2><p>{beat.body}</p>{"hint" in beat && <p className="hint">{beat.hint}</p>}</article>)}</div>
  </section></DemoContext.Provider>;
}
