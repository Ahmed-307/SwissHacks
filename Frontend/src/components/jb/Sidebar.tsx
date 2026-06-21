import { Plus, MessageSquare, Sparkles, CheckCircle2, Circle, Settings2, Archive as ArchiveIcon, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export type Framework = {
  timeline: boolean;
  lifestyle: boolean;
  risk: boolean;
  assets: boolean;
  legacy: boolean;
};

const SESSIONS = [
  { name: "Swiss Alps Villa 2029", meta: "Active · 12 messages", badge: "Live" },
  { name: "Early Retirement Plan", meta: "Updated 2d ago", badge: null },
  { name: "Tech Venture Funding", meta: "Updated 1w ago", badge: null },
  { name: "Daughter's Education Trust", meta: "Updated 3w ago", badge: null },
  { name: "Art Collection Strategy", meta: "Updated 1mo ago", badge: null },
];

const ARCHIVED = [
  { name: "Riviera Yacht Acquisition", meta: "Closed · Feb 2026" },
  { name: "London Townhouse Refinance", meta: "Closed · Nov 2025" },
  { name: "Foundation Setup — Geneva", meta: "Closed · Aug 2025" },
  { name: "Pre-IPO Allocation 2024", meta: "Closed · Dec 2024" },
];

const FRAMEWORK_ITEMS: { key: keyof Framework; label: string }[] = [
  { key: "timeline", label: "Timeline & Horizon" },
  { key: "lifestyle", label: "Lifestyle Desires" },
  { key: "risk", label: "Risk Appetite" },
  { key: "assets", label: "Asset Preferences" },
  { key: "legacy", label: "Legacy & Tax Frame" },
];

export function Sidebar({
  active,
  setActive,
  framework,
}: {
  active: string;
  setActive: (s: string) => void;
  framework: Framework;
}) {
  const completed = Object.values(framework).filter(Boolean).length;
  const total = FRAMEWORK_ITEMS.length;
  return (
    <aside className="hidden w-80 flex-col border-r border-border bg-card lg:flex">
      {/* New session */}
      <div className="border-b border-border p-4">
        <button
          className="group flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium text-white transition-all duration-300 hover:scale-[1.02]"
          style={{ background: "var(--midnight)", boxShadow: "var(--shadow-elegant)" }}
        >
          <Plus className="h-4 w-4" />
          New Lifegoal Session
        </button>
      </div>

      {/* Active brainstorms */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="mb-2 flex items-center justify-between px-2">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Active Brainstorms
          </div>
          <span className="text-[10px] text-muted-foreground">{SESSIONS.length}</span>
        </div>
        <div className="space-y-1">
          {SESSIONS.map((s) => {
            const isActive = active === s.name;
            return (
              <button
                key={s.name}
                onClick={() => setActive(s.name)}
                className={cn(
                  "group w-full rounded-lg border px-3 py-3 text-left transition-all",
                  isActive
                    ? "border-midnight/15 bg-midnight text-white shadow-sm"
                    : "border-transparent hover:border-border hover:bg-muted",
                )}
              >
                <div className="flex items-center gap-2">
                  <MessageSquare
                    className={cn(
                      "h-3.5 w-3.5 shrink-0",
                      isActive ? "text-white" : "text-muted-foreground",
                    )}
                  />
                  <span className="truncate text-sm font-medium">{s.name}</span>
                  {s.badge && (
                    <span className="ml-auto rounded-full bg-white/20 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white">
                      {s.badge}
                    </span>
                  )}
                </div>
                <div
                  className={cn(
                    "ml-5 mt-0.5 text-[11px]",
                    isActive ? "text-white/50" : "text-muted-foreground",
                  )}
                >
                  {s.meta}
                </div>
              </button>
            );
          })}
        </div>

        {/* Archived sessions */}
        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between px-2">
            <div className="flex items-center gap-1.5">
              <ArchiveIcon className="h-3 w-3 text-muted-foreground" />
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Archived Sessions
              </div>
            </div>
            <span className="text-[10px] text-muted-foreground">{ARCHIVED.length}</span>
          </div>
          <div className="space-y-0.5 rounded-lg border border-border/60 bg-background/40 p-1.5">
            {ARCHIVED.map((a) => (
              <button
                key={a.name}
                className="group flex w-full items-center gap-2 rounded-md px-2 py-2 text-left transition hover:bg-muted"
              >
                <FileText className="h-3 w-3 shrink-0 text-muted-foreground" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-xs font-medium">{a.name}</div>
                  <div className="truncate text-[10px] text-muted-foreground">{a.meta}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Framework Mode */}
      <div className="border-t border-border bg-muted/40 p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-midnight" />
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em]">
              Framework Mode
            </div>
          </div>
          <Settings2 className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
        <div className="mb-3">
          <div className="mb-1.5 flex items-center justify-between text-[11px] text-muted-foreground">
            <span>Data points captured</span>
            <span className="font-medium text-foreground">
              {completed}/{total}
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${(completed / total) * 100}%`,
                background: "var(--midnight)",
              }}
            />
          </div>
        </div>
        <div className="space-y-1.5">
          {FRAMEWORK_ITEMS.map((it) => {
            const done = framework[it.key];
            return (
              <div
                key={it.key}
                className="flex items-center gap-2 text-xs"
              >
                {done ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-midnight" />
                ) : (
                  <Circle className="h-3.5 w-3.5 text-muted-foreground/50" />
                )}
                <span className={done ? "text-foreground" : "text-muted-foreground"}>
                  {it.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}