"use client";
import { demo, criteria } from "./data";
import { useDemo } from "./model";
import InspectorRow from "./InspectorRow";
const initials = (name: string) => name.split(" ").slice(0, 2).map(word => word[0]).join("");

export function Qualify() {
 const { active,setActive,qualified,skipped } = useDemo();
 return <> <div className="toks" role="group" aria-label="Your criteria">{criteria.map((rule, i) => <button key={rule.label} className="tok" aria-pressed={active[i]} onClick={() => setActive(current => current.map((v, n) => n === i ? !v : v))}>{rule.label}</button>)}</div><div className="v-head"><h3>Loqi skipped {skipped.length} of 14. Here’s why.</h3><span className="meta mono">{qualified.length} qualified. In the full demo search, 47 of 184 qualified.</span></div><div className="tbl t-qual"><div className="tr th"><span>Company</span><span className="c-pct">Match</span><span>Result</span></div>{[...qualified, ...skipped].map(({ account: a, why }) => <div key={a.name} className={`tr ${why ? "skip" : ""}`}><span className="nm">{a.name}</span>{why ? <span className="dim c-pct">—</span> : <span className="pct c-pct"><span className="bar"><i style={{ width: `${a.match}%` }} /></span>{a.match}%</span>}<span className={`verdict ${why ? "why" : ""}`}>{why || "Qualified"}</span></div>)}</div> </>;
}

export function Research() {
 const { tabs,a,sources,person } = useDemo();
 return <> {tabs}<div className="acct-head"><div><h3>{a.name}</h3><p className="meta mono">{a.stage}, {a.emp} employees, {a.city}</p></div><div className="fit"><b>{a.match}%</b><span>match</span></div></div><div className="research-context"><span className="lab">Decision context</span><dl><InspectorRow label="Contact" value={`${person[0]}, ${person[1]}`} /><InspectorRow label="Why them" value={person[2]} /></dl></div><span className="lab">Evidence / public signals</span>{sources}<p className="note">Loqi read three public sources for this account.</p> </>;
}

export function Contact() {
 const { tabs,a,d,contacts,account,setContacts } = useDemo();
 return <> {tabs}<div className="v-head"><h3>Who to contact at {a.name}</h3><span className="meta mono">{d.people.length} people found</span></div><ul className="people">{d.people.map(([name, role, why], i) => <li key={name}><button className={`person ${contacts[account] === i ? "sel" : ""}`} aria-pressed={contacts[account] === i} onClick={() => setContacts(current => current.map((v, n) => n === account ? i : v))}><span className="avatar">{initials(name)}</span><span className="pinfo"><b>{name}</b><span>{role}</span><span className="why">{why}</span></span>{i === 0 ? <span className="rec-tag">Recommended</span> : <span />}</button></li>)}</ul> </>;
}

export function Draft() {
 const { tabs,person,a,d,draftBody,sources } = useDemo();
 return <> {tabs}<div className="dgrid"><div><div className="m-meta"><b>To</b><span>{person[0]}, {person[1]}, {a.name}</span></div><div className="m-meta"><b>Subject</b><span>{d.subject}</span></div><div className="m-body">{draftBody}</div></div><aside className="sources"><span className="lab">Sources</span>{sources}</aside></div> </>;
}

export function Approve() {
 const { queue,onQueueKey,setKeyboard,decisions,selectedQueue,setEditing,setSelectedQueue,qp,q,editing,edits,plain,setEdits,decision,action,keyboard } = useDemo();
 return <>
                <div className="agrid" ref={queue} tabIndex={0} aria-label="Approval queue. Use J and K to move, A to approve, E to edit, R to reject." onKeyDown={onQueueKey} onFocus={() => setKeyboard(true)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setKeyboard(false); }}>
                  <div className="queue">{demo.details.map((d, i) => <button key={i} className={`q ${decisions[i] || ""} ${selectedQueue === i ? "sel" : ""}`} aria-pressed={selectedQueue === i} onClick={() => { setEditing(false); setSelectedQueue(i); }}><span className="qs" /><span><b>{demo.accounts[i].name}</b><span className="sub">{d.subject}</span></span><span className="tag">{decisions[i] === "approved" ? "Approved" : decisions[i] === "rejected" ? "Rejected" : ""}</span></button>)}<div className="q more">+42 more drafts in this search</div></div>
                  <div className="preview"><div><div className="m-meta"><b>To</b><span>{qp[0]}, {qp[1]}, {demo.accounts[selectedQueue].name}</span></div><div className="m-meta"><b>Subject</b><span>{q.subject}</span></div></div>
                    {editing ? <textarea autoFocus aria-label="Edit draft" className="draft-editor m-body" value={edits[selectedQueue] ?? plain(selectedQueue)} onChange={event => setEdits(current => ({ ...current, [selectedQueue]: event.target.value }))} /> : <div className="m-body">{(edits[selectedQueue] ?? plain(selectedQueue)).split("\n\n").map((p, i) => <p key={i}>{p}</p>)}</div>}
                    <div className="pactions">{decision ? <><span className={`state-chip ${decision === "rejected" ? "no" : ""}`}>{decision === "approved" ? "Approved" : "Rejected"}</span><button className="pbtn" onClick={() => action("undo")}>Undo<span className="kbd">U</span></button></> : <><button className="pbtn approve" onClick={() => action("approve")}>Approve<span className="kbd">A</span></button><button className="pbtn" onClick={() => action("edit")}>{editing ? "Done" : "Edit"}<span className="kbd">{editing ? "Esc" : "E"}</span></button><button className="pbtn" onClick={() => action("reject")}>Reject<span className="kbd">R</span></button></>}</div>
                    <p className={`kb-hint ${keyboard ? "on" : ""}`}>{decision === "approved" ? "Approved. Loqi never sends without you." : decision === "rejected" ? "Rejected. Loqi will not use this draft." : keyboard ? "Keyboard on. J K move, A approve, E edit, R reject." : "Nothing is sent until you approve it."}</p>
                  </div>
                </div>
               </>;
}
