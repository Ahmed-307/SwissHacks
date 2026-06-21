import { Bell, ChevronDown, Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export type View = "chat" | "scenarios" | "rm" | "timeline" | "ghost";

const TABS: { id: View; label: string }[] = [
  { id: "chat", label: "Vision Board" },
  { id: "scenarios", label: "My Scenarios" },
  { id: "rm", label: "RM Hub" },
  { id: "timeline", label: "Wealth Timeline" },
  { id: "ghost", label: "Ghost Portfolio" },
];

export function TopNav({ view, setView }: { view: View; setView: (v: View) => void }) {
  const [profileOpen, setProfileOpen] = useState(false);
  return (
    <header
      className="sticky top-0 z-40 border-b border-white/10 text-white/90"
      style={{ background: "var(--gradient-midnight)" }}
    >
      <div className="flex h-16 items-center gap-8 px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="grid h-9 w-9 place-items-center rounded-sm border border-white/30 font-display text-lg font-semibold text-midnight"
            style={{ background: "#FFFFFF" }}
          >
            JB
          </div>
          <div className="leading-tight">
            <div className="font-display text-base font-medium tracking-wide">JULIUS BAER</div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-white/50">Private Banking · est 1890</div>
          </div>
        </div>

        {/* Center nav */}
        <nav className="mx-auto hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur md:flex">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setView(t.id)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium transition-all duration-300",
                view === t.id
                  ? "bg-white text-midnight-deep shadow-sm"
                  : "text-white/70 hover:text-white",
              )}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-3">
          <button className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/70 transition hover:bg-white/10 hover:text-white">
            <Search className="h-4 w-4" />
          </button>
          <button className="relative grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/70 transition hover:bg-white/10 hover:text-white">
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-white" />
          </button>
          <div className="mx-2 h-8 w-px bg-white/10" />
          <button
            onClick={() => setProfileOpen((o) => !o)}
            className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 py-1 pl-1 pr-3 transition hover:bg-white/10"
          >
            <div
              className="grid h-7 w-7 place-items-center rounded-full border border-white/30 text-xs font-semibold text-midnight"
              style={{ background: "#FFFFFF" }}
            >
              A
            </div>
            <div className="hidden text-left leading-tight sm:block">
              <div className="text-xs text-white/50">Welcome</div>
              <div className="text-sm font-medium">Alex Wexler</div>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-white/50" />
          </button>
        </div>
      </div>

      {profileOpen && (
        <div className="absolute right-6 top-[60px] z-50 w-64 overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-xl animate-fade-in">
          <div className="border-b border-border p-4">
            <div className="text-sm font-semibold">Alex Wexler</div>
            <div className="text-xs text-muted-foreground">Private Client · CH-Zürich</div>
          </div>
          <div className="p-2 text-sm">
            {["Profile & Preferences", "Mandates", "Documents Vault", "Security", "Sign out"].map((i) => (
              <button key={i} className="w-full rounded-md px-3 py-2 text-left hover:bg-muted">{i}</button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}