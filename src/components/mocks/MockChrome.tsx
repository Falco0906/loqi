import React from "react";

export type MockTone = "dark" | "light";

const navIcons: Record<string, React.ReactNode> = {
  dashboard: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>,
  explore: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4"><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5 5-2z"/></svg>,
  campaign: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4"><path d="M3 11l18-7v16L3 13v-2z" strokeLinejoin="round"/><path d="M7 13l-2 6 5-2"/></svg>,
  inbox: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4"><path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z"/><path d="M4 13h5l2 3h2l2-3h5"/></svg>,
  database: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5"/><path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"/></svg>,
  search: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>,
  bell: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4"><path d="M6 8a6 6 0 0112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 003.4 0"/></svg>,
  settings: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33h0a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51h0a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v0a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4"><path d="M5 13l4 4L19 7"/></svg>,
  chevron: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4"><path d="M9 18l6-6-6-6"/></svg>,
  trending: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4"><path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></svg>,
  calendar: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
  mail: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/></svg>,
  person: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a7 7 0 0114 0v1"/></svg>,
  sparkle: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4"><path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z"/></svg>,
  add: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path d="M12 5v14M5 12h14"/></svg>,
  help: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4"><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 115 0c0 1.7-2.5 2.1-2.5 4"/><path d="M12 17.5h.01"/></svg>,
  filter: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4"><path d="M3 6h18M6 12h12M10 18h4"/></svg>,
  checkCircle: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1.2 14.5l-4-4 1.4-1.4 2.6 2.6 5.6-5.6 1.4 1.4-7 7z"/></svg>,
  arrowUp: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4"><path d="M12 19V5M5 12l7-7 7 7"/></svg>,
  send: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4"><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
};

interface MockSidebarProps {
  active: string;
  items: { id: string; label: string }[];
  tone: MockTone;
  brand?: string;
  bottom?: { id: string; label: string }[];
  cta?: string;
  profile?: { name: string; role: string; initials: string };
}

const sidebarDark = {
  shell: "bg-[#141313] border-[#4a4549]/20",
  brand: "text-[#e6e2e1]",
  tagline: "text-[#ccc4c9] opacity-60",
  active: "text-white bg-[#201f1f]",
  inactive: "text-[#ccc4c9]/80 hover:text-white",
  bottom: "text-[#ccc4c9]/70",
  border: "border-[#4a4549]/20",
  cta: "bg-white text-[#313030] hover:bg-white/90",
  profile: "bg-[#2b2a2a]",
  profileName: "text-[#e6e2e1]",
  profileRole: "text-[#ccc4c9]",
};

const sidebarLight = {
  shell: "bg-[#f7f3f2] border-[#c4c7c7]/30",
  brand: "text-[#1c1b1b]",
  tagline: "text-[#444748] opacity-60",
  active: "text-[#1c1b1b] bg-[#e5e2e1] font-semibold",
  inactive: "text-[#444748]/80 hover:text-[#1c1b1b]",
  bottom: "text-[#444748]/70",
  border: "border-[#c4c7c7]/40",
  cta: "bg-black text-white hover:bg-black/90",
  profile: "bg-[#e5e2e1]",
  profileName: "text-[#1c1b1b]",
  profileRole: "text-[#444748]",
};

export function MockSidebar({ active, items, tone, brand = "Loqi", bottom, cta, profile }: MockSidebarProps) {
  const s = tone === "dark" ? sidebarDark : sidebarLight;
  return (
    <aside className={`w-44 shrink-0 border-r flex flex-col py-6 px-4 ${s.shell}`}>
      <div className="mb-6 px-2">
        <p className={`text-[13px] font-semibold ${s.brand}`}>{brand}</p>
      </div>
      {cta && (
        <div className={`mb-6 mx-2 text-center py-2 rounded-full text-[11px] font-medium ${s.cta}`}>
          {cta}
        </div>
      )}
      <nav className="flex-1 space-y-0.5">
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-2.5 px-2 py-1.5 rounded-md text-[11px] ${
              active === item.id ? s.active : s.inactive
            }`}
          >
            {navIcons[item.id]}
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
      {profile && (
        <div className={`pt-4 mt-2 flex items-center gap-2.5 border-t ${s.border}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-semibold ${s.profile} ${s.profileName}`}>
            {profile.initials}
          </div>
          <div>
            <p className={`text-[9px] font-bold leading-tight ${s.profileName}`}>{profile.name}</p>
            <p className={`text-[8px] mt-0.5 ${s.profileRole}`}>{profile.role}</p>
          </div>
        </div>
      )}
      {!profile && bottom && (
        <div className={`space-y-0.5 pt-4 mt-2 border-t ${s.border}`}>
          {bottom.map((item) => (
            <div key={item.id} className={`flex items-center gap-2.5 px-2 py-1.5 rounded-md text-[11px] ${s.bottom}`}>
              {navIcons[item.id]}
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}

interface MockTopbarProps {
  title: string;
  tone: MockTone;
  tabs?: string[];
  search?: string;
  right?: string;
}

const topbarDark = {
  shell: "bg-[#0f0e0e]/80 border-[#4a4549]/20",
  title: "text-white",
  tabActive: "text-white border-white",
  tabInactive: "text-[#ccc4c9]/70",
  search: "bg-[#201f1f] text-[#ccc4c9]/60",
  right: "text-[#ccc4c9]/70",
};

const topbarLight = {
  shell: "bg-[#fdf8f8]/70 border-[#c4c7c7]/20",
  title: "text-[#1c1b1b]",
  tabActive: "text-[#1c1b1b] border-[#1c1b1b]",
  tabInactive: "text-[#444748]/70",
  search: "bg-[#f7f3f2] text-[#444748]/60",
  right: "text-[#444748]/70",
};

export function MockTopbar({ title, tone, tabs, search, right }: MockTopbarProps) {
  const t = tone === "dark" ? topbarDark : topbarLight;
  return (
    <header className={`h-12 shrink-0 backdrop-blur border-b px-6 flex items-center justify-between ${t.shell}`}>
      <div className="flex items-center gap-6">
        <span className={`text-[13px] font-medium ${t.title}`}>{title}</span>
        {tabs && (
          <nav className="flex gap-4">
            {tabs.map((tab, i) => (
              <span
                key={tab}
                className={`text-[10px] uppercase tracking-[0.12em] pb-0.5 ${
                  i === 0 ? t.tabActive : t.tabInactive
                } ${i === 0 ? "border-b" : ""}`}
              >
                {tab}
              </span>
            ))}
          </nav>
        )}
      </div>
      <div className="flex items-center gap-3">
        {search && (
          <div className={`hidden sm:flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] ${t.search}`}>
            {navIcons.search}
            <span>{search}</span>
          </div>
        )}
        {right && <span className={`text-[10px] ${t.right}`}>{right}</span>}
        <span className={t.right}>{navIcons.bell}</span>
      </div>
    </header>
  );
}

export function MockShell({ active, items, tone, topbar, bottom, cta, profile, children }: {
  active: string;
  items: { id: string; label: string }[];
  tone: MockTone;
  topbar: React.ReactNode;
  bottom?: { id: string; label: string }[];
  cta?: string;
  profile?: { name: string; role: string; initials: string };
  children: React.ReactNode;
}) {
  const shellBg = tone === "dark" ? "bg-[#0f0e0e] text-[#e6e2e1]" : "bg-[#fdf8f8] text-[#1c1b1b]";
  return (
    <div className={`${shellBg} flex h-full min-h-[520px]`}>
      <MockSidebar active={active} items={items} tone={tone} bottom={bottom} cta={cta} profile={profile} />
      <div className="flex-1 flex flex-col min-w-0">
        {topbar}
        <div className="flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}