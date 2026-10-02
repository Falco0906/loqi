import { demo, sampleStats } from "./data";

const qualifiedCells = new Set(Array.from({ length: sampleStats.qualified }, (_, i) => (i * 7 + 3) % sampleStats.found));
export function AccountField({ stage, progress }: { stage: number; progress: number }) {
  const count = Math.min(sampleStats.found, Math.floor(progress * sampleStats.found));
  return <div className={`account-field ${stage === 2 ? "resolved" : ""}`} hidden={stage !== 1 && stage !== 2}>
    <div className="field-heading"><span className="lab">Searching the market</span><p><strong>{stage === 2 ? sampleStats.qualified : count}</strong><span>{stage === 2 ? `of ${sampleStats.found} qualified` : "companies found"}</span></p></div>
    <div className="account-cells" aria-hidden="true">{Array.from({ length: sampleStats.found }, (_, i) => <i key={i} className={`${i < count || stage === 2 ? "found" : ""} ${stage === 2 ? qualifiedCells.has(i) ? "qualified" : "skipped" : ""}`} />)}</div>
    <p className="field-legend mono">{stage === 2 ? `${sampleStats.qualified} match · ${sampleStats.found - sampleStats.qualified} skipped · sample search` : "Each cell is one company. Fit comes next."}</p>
  </div>;
}
export function Find({ progress }: { progress: number }) {
  const visible = Math.max(1, Math.min(demo.accounts.length, Math.ceil(progress * demo.accounts.length)));
  return <div className="find-log"><div className="v-head"><h3>A market, before a shortlist.</h3><span className="meta mono">Sample search / US SaaS</span></div><div className="tbl t-find"><div className="tr th"><span>Company</span><span className="c-loc">Location</span><span>Stage</span><span className="c-emp">Employees</span></div>{demo.accounts.slice(0, visible).map(a => <div className="tr" key={a.name}><span className="nm">{a.name}</span><span className="dim c-loc">{a.city}</span><span className="dim">{a.stage}</span><span className="dim c-emp">{a.emp}</span></div>)}</div></div>;
}
