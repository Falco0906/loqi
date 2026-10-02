"use client";

import { useEffect, useId, useRef, useState, type PointerEvent, type KeyboardEvent } from "react";
import { concepts, connections, compactConcepts, compactConnections } from "./hero-network";
import styles from "./HeroNetwork.module.css";

type Point = { x: number; y: number };
type Layout = { width: number; height: number; lane: number; compact: boolean; ceiling: number; visible: boolean };
const clamp = (value: number, low: number, high: number) => Math.max(low, Math.min(high, value));

export default function HeroNetwork() {
  const root = useRef<HTMLDivElement>(null);
  const help = useId();
  const [layout, setLayout] = useState<Layout | null>(null);
  const [positions, setPositions] = useState<Point[]>(() => concepts.map(({ x, y }) => ({ x, y })));
  const [selected, setSelected] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const [dragging, setDragging] = useState<number | null>(null);
  const drag = useRef<{ id: number; pointer: number; start: Point; origin: Point; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const frame = useRef(0);
  const pending = useRef<{ id: number; point: Point } | null>(null);

  useEffect(() => {
    const element = root.current;
    const hero = element?.parentElement;
    if (!element || !hero) return;
    const measure = () => {
      const box = element.getBoundingClientRect();
      const content = Array.from(hero.children).filter(child => child !== element).map(child => child.getBoundingClientRect());
      const left = Math.min(...content.map(rect => rect.left)) - box.left;
      const right = Math.max(...content.map(rect => rect.right)) - box.left;
      const top = Math.min(...content.map(rect => rect.top)) - box.top;
      const compact = box.width <= 1100;
      const lane = Math.min(270, left - 30, box.width - right - 30);
      // Small screens use only the existing space above the title, never its backdrop.
      const ceiling = Math.min(150, top - 28);
      setLayout({ width:box.width, height:box.height, lane, compact, ceiling, visible:compact ? ceiling >= 104 : lane >= 120 });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(hero);
    Array.from(hero.children).forEach(child => { if (child !== element) observer.observe(child); });
    window.addEventListener("resize", measure);
    measure();
    const clear = (event: globalThis.PointerEvent) => {
      if (!(event.target instanceof Element) || !event.target.closest("[data-network-node]")) {
        setSelected(null); setFocused(null); setHovered(null);
      }
    };
    document.addEventListener("pointerdown", clear, { passive:true });
    return () => { observer.disconnect(); window.removeEventListener("resize", measure); document.removeEventListener("pointerdown", clear); cancelAnimationFrame(frame.current); };
  }, []);

  const bounds = (id: number) => {
    const l = layout!;
    const right = concepts[id].side === "right";
    return { left:right ? l.width - l.lane + 50 : 50, width:l.lane - 100, top:32, height:l.height - 64 };
  };
  const point = (id: number): Point => {
    const l = layout!;
    if (l.compact) {
      const right = concepts[id].side === "right";
      const second = id === 4 || id === 9;
      return { x:right ? l.width - (second ? 82 : 62) : (second ? 82 : 62), y:second ? l.ceiling - 24 : 28 };
    }
    const b = bounds(id);
    return { x:b.left + positions[id].x * b.width, y:b.top + positions[id].y * b.height };
  };
  const move = (id: number, value: Point) => {
    const b = bounds(id);
    pending.current = { id, point:{ x:clamp((value.x - b.left) / b.width, 0, 1), y:clamp((value.y - b.top) / b.height, 0, 1) } };
    if (!frame.current) frame.current = requestAnimationFrame(() => {
      const update = pending.current;
      if (update) setPositions(previous => previous.map((p, i) => i === update.id ? update.point : p));
      pending.current = null; frame.current = 0;
    });
  };
  const down = (event: PointerEvent<HTMLButtonElement>, id: number) => {
    suppressClick.current = false;
    if (!layout || layout.compact || event.pointerType === "touch" || event.button !== 0) return;
    drag.current = { id, pointer:event.pointerId, start:{ x:event.clientX, y:event.clientY }, origin:point(id), moved:false };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const pointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    const d = drag.current;
    if (!d || d.pointer !== event.pointerId) return;
    const dx = event.clientX - d.start.x, dy = event.clientY - d.start.y;
    if (!d.moved && Math.hypot(dx, dy) < 4) return;
    d.moved = true; setDragging(d.id); setSelected(d.id);
    move(d.id, { x:d.origin.x + dx, y:d.origin.y + dy });
  };
  const end = (event: PointerEvent<HTMLButtonElement>) => {
    const d = drag.current;
    if (!d || d.pointer !== event.pointerId) return;
    suppressClick.current = d.moved;
    drag.current = null; setDragging(null); setHovered(null);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };
  const keyboard = (event: KeyboardEvent<HTMLButtonElement>, id: number) => {
    if (event.key === "Escape") { setSelected(null); setHovered(null); setFocused(null); event.currentTarget.blur(); return; }
    if (layout?.compact || !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
    event.preventDefault();
    const p = point(id), step = event.shiftKey ? 24 : 8;
    move(id, { x:p.x + (event.key === "ArrowRight" ? step : event.key === "ArrowLeft" ? -step : 0), y:p.y + (event.key === "ArrowDown" ? step : event.key === "ArrowUp" ? -step : 0) });
    setSelected(id);
  };
  const active = hovered ?? focused ?? selected;
  const edges = layout?.compact ? compactConnections : connections;
  const visible = layout?.compact ? compactConcepts : concepts.map((_, id) => id);
  const related = new Set(edges.filter(([a,b]) => a === active || b === active).flat());

  return <div ref={root} className={styles.network} role="group" aria-label="Explore Loqi connections">
    <span id={help} className={styles.help}>Select a concept to explore its connections. On desktop, drag or use arrow keys to move it within the margin. Escape clears selection.</span>
    {layout?.visible && <>
      <svg className={styles.lines} aria-hidden="true" viewBox={`0 0 ${layout.width} ${layout.height}`}>
        {edges.map(([a,b]) => { const start = point(a), end = point(b); return <line key={`${a}-${b}`} x1={start.x} y1={start.y - 10} x2={end.x} y2={end.y - 10} data-active={a === active || b === active} />; })}
      </svg>
      {visible.map(id => { const p = point(id); return <button key={id} type="button" className={styles.node} data-network-node={id} style={{ left:p.x, top:p.y }} aria-label={concepts[id].label} aria-describedby={help} aria-pressed={selected === id} data-active={active === id} data-related={related.has(id)} data-dragging={dragging === id}
        onPointerEnter={event => { if (event.pointerType !== "touch") setHovered(id); }} onPointerLeave={() => setHovered(null)} onFocus={() => setFocused(id)} onBlur={() => setFocused(null)}
        onPointerDown={event => down(event,id)} onPointerMove={pointerMove} onPointerUp={end} onPointerCancel={end} onLostPointerCapture={end}
        onClick={() => { if (suppressClick.current) { suppressClick.current = false; return; } setSelected(id); }} onKeyDown={event => keyboard(event,id)}>{concepts[id].label}</button>; })}
    </>}
  </div>;
}
