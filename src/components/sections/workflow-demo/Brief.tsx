"use client";
import { useEffect, useRef, useState } from "react";
import { sampleGoals, steps } from "./data";
export default function Brief({ visible }: { visible: boolean }) {
  const [run, setRun] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState(0);
  const example = sampleGoals[selectedGoal];
  const goal = example.text;
  const [letters, setLetters] = useState(0);
  const [completed, setCompleted] = useState(-1);
  const started = useRef(false);
  useEffect(() => { if (visible) started.current = true; }, [visible]);
  useEffect(() => {
    if (!started.current) return;
    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finish = () => { clearTimeout(timer); setLetters(goal.length); setCompleted(steps.length); };
    if (reduce.matches) { finish(); return; }
    setLetters(0); setCompleted(-1);
    let length = 0;
    const tick = () => {
      if (cancelled) return;
      setLetters(++length);
      if (length < goal.length) timer = setTimeout(tick, 22);
      else {
        let count = 0;
        timer = setTimeout(function progress() {
          if (cancelled) return;
          setCompleted(count++);
          if (count <= steps.length) timer = setTimeout(progress, 880);
        }, 250);
      }
    };
    timer = setTimeout(tick, 22);
    reduce.addEventListener("change", finish);
    return () => { cancelled = true; clearTimeout(timer); reduce.removeEventListener("change", finish); };
  }, [run, visible, goal]);
  return <div className={letters < goal.length ? "typing" : ""}>
    <span className="lab">Discover</span><h3 className="discovery-title">Who are you looking for?</h3>
    <div className="query-surface"><span className="lab">Your target</span><p className="goal-text"><span>{goal.slice(0, letters)}</span><span className="caret" /></p></div>
    <ul className="feed">{steps.map(([label], i) => <li key={label} className={`f-row ${completed > i ? "done" : completed === i ? "active" : ""}`}><span className="f-ic" /><span>{label}</span><span className="f-val">{completed > i ? example.results[i] : ""}</span></li>)}</ul>
    <div className={`result ${completed === steps.length ? "show" : ""}`}><h3>{example.total} prospects worth your attention.</h3><button className="link mono" onClick={() => setRun(n => n + 1)}>Replay</button></div>
    <div className="goal-options" role="group" aria-label="Try another sample goal"><span className="lab">Try another goal</span>{sampleGoals.map((sample, i) => <button key={sample.label} className="tab2" aria-pressed={selectedGoal === i} onClick={() => setSelectedGoal(i)}>{sample.label}</button>)}</div>
    <p className="note">{selectedGoal === 0 ? "Scroll to follow this SaaS search, one decision at a time." : "Sample goal preview. The scroll walkthrough follows the US SaaS search."}</p>
  </div>;
}
