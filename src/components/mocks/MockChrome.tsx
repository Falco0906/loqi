import React from "react";

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
};

interface MockSidebarProps {
  active: string;
  items: { id: string; label: string }[];
  brand?: string;
  bottom?: { id: string; label: string }[];
}

export function MockSidebar({ active, items, brand = "Loqi AI", bottom }: MockSidebarProps) {
  return (
    <aside className="w-44 shrink-0 bg-[#141313] border-r border-[#4a4549]/20 flex flex-col py-6 px-4">
      <div className="mb-8 px-2">
        <p className="text-[13px] font-semibold text-[#e6e2e1]">{brand}</p>
        <p className="text-[9px] uppercase tracking-[0.15em] text-[#ccc4c9] opacity-60 mt-0.5">Chief of Staff</p>
      </div>
      <nav className="flex-1 space-y-0.5">
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-2.5 px-2 py-1.5 rounded-md text-[11px] ${
              active === item.id
                ? "text-white font-medium bg-[#201f1f]"
                : "text-[#ccc4c9]/80 hover:text-white"
            }`}
          >
            {navIcons[item.id]}
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
      {bottom && (
        <div className="space-y-0.5 pt-4 mt-2 border-t border-[#4a4549]/20">
          {bottom.map((item) => (
            <div key={item.id} className="flex items-center gap-2.5 px-2 py-1.5 rounded-md text-[11px] text-[#ccc4c9]/70">
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
  tabs?: string[];
  search?: string;
}

export function MockTopbar({ title, tabs, search }: MockTopbarProps) {
  return (
    <header className="h-12 shrink-0 bg-[#0f0e0e]/80 backdrop-blur border-b border-[#4a4549]/20 px-6 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <span className="text-[13px] font-medium text-white">{title}</span>
        {tabs && (
          <nav className="flex gap-4">
            {tabs.map((tab, i) => (
              <span
                key={tab}
                className={`text-[10px] uppercase tracking-[0.12em] pb-0.5 ${
                  i === 0 ? "text-white border-b border-white" : "text-[#ccc4c9]/70"
                }`}
              >
                {tab}
              </span>
            ))}
          </nav>
        )}
      </div>
      <div className="flex items-center gap-3">
        {search && (
          <div className="hidden sm:flex items-center gap-1.5 bg-[#201f1f] rounded-full px-3 py-1 text-[10px] text-[#ccc4c9]/60">
            {navIcons.search}
            <span>{search}</span>
          </div>
        )}
        <span className="text-[#ccc4c9]/70">{navIcons.bell}</span>
      </div>
    </header>
  );
}

export function MockShell({ active, items, topbar, bottom, children }: {
  active: string;
  items: { id: string; label: string }[];
  topbar: React.ReactNode;
  bottom?: { id: string; label: string }[];
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#0f0e0e] text-[#e6e2e1] flex h-full min-h-[520px]">
      <MockSidebar active={active} items={items} bottom={bottom} />
      <div className="flex-1 flex flex-col min-w-0">
        {topbar}
        <div className="flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}