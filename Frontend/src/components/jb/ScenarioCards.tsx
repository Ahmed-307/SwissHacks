import { Check, X, TrendingUp, Shield, Mountain, Globe2 } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Scenario = {
  letter: string;
  title: string;
  subtitle: string;
  icon: ReactNode;
  metrics: { label: string; value: number }[];
  pros: string[];
  cons: string[];
  headline: string;
};

export const SCENARIOS: Scenario[] = [
  {
    letter: "A",
    title: "Aggressive Growth & Acquisition",
    subtitle: "Compound first, acquire in 2028",
    icon: <TrendingUp className="h-4 w-4" />,
    metrics: [
      { label: "Growth potential", value: 92 },
      { label: "Volatility", value: 78 },
      { label: "Liquidity at horizon", value: 64 },
    ],
    pros: [
      "Maximizes capital before the property purchase",
      "Tax-optimized private equity allocation",
      "Optionality on multiple Alpine regions",
    ],
    cons: ["Higher drawdown risk in 2026-27", "Requires patient capital lock-up"],
    headline: "CHF 18.4M projected at horizon",
  },
  {
    letter: "B",
    title: "Balanced Legacy Trust",
    subtitle: "Structured Liechtenstein vehicle",
    icon: <Shield className="h-4 w-4" />,
    metrics: [
      { label: "Stability", value: 88 },
      { label: "Tax efficiency", value: 84 },
      { label: "Generational reach", value: 95 },
    ],
    pros: [
      "Multi-generational governance baked in",
      "Inheritance jurisdictions pre-cleared",
      "Predictable yield profile",
    ],
    cons: ["Lower upside than growth path", "Trust set-up timeline ~4 months"],
    headline: "CHF 14.2M with legacy ringfence",
  },
  {
    letter: "C",
    title: "Alpine-First Lifestyle",
    subtitle: "Acquire 2026, build alongside",
    icon: <Mountain className="h-4 w-4" />,
    metrics: [
      { label: "Lifestyle alignment", value: 96 },
      { label: "Capital deployed early", value: 82 },
      { label: "Portfolio diversification", value: 58 },
    ],
    pros: [
      "Immediate enjoyment of the property",
      "Locks in current Verbier/Gstaad pricing",
      "Renovation phased with cashflow",
    ],
    cons: ["Concentrates real-asset exposure", "Reduces liquid reserves near-term"],
    headline: "Property secured in 18 months",
  },
  {
    letter: "D",
    title: "Global Diversified Mandate",
    subtitle: "Property as one of several pillars",
    icon: <Globe2 className="h-4 w-4" />,
    metrics: [
      { label: "Diversification", value: 94 },
      { label: "Currency hedge depth", value: 87 },
      { label: "Concentration risk", value: 32 },
    ],
    pros: [
      "True global allocation across regions",
      "Hedged across CHF / USD / EUR",
      "Includes art & private credit sleeves",
    ],
    cons: ["Most complex governance", "More moving parts to monitor"],
    headline: "CHF 16.1M across 6 sleeves",
  },
];

export function ScenarioCards({ onOpenRM, compact }: { onOpenRM: () => void; compact?: boolean }) {
  return (
    <div
      className={cn(
        "grid gap-4",
        compact ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-4" : "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
      )}
    >
      {SCENARIOS.map((s) => (
        <ScenarioCard key={s.letter} s={s} onOpenRM={onOpenRM} />
      ))}
    </div>
  );
}

function ScenarioCard({ s, onOpenRM }: { s: Scenario; onOpenRM: () => void }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border-2 border-midnight/20 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-midnight/40 hover:shadow-[var(--shadow-elegant)]">
      <div
        className="relative px-5 py-5 text-white"
        style={{ background: "var(--gradient-midnight)" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="grid h-9 w-9 place-items-center rounded-lg border border-white/30 text-midnight"
              style={{ background: "#FFFFFF" }}
            >
              {s.icon}
            </div>
            <span className="font-display text-3xl font-medium text-white">{s.letter}</span>
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">Scenario</span>
        </div>
        <h3 className="mt-4 font-display text-lg font-medium leading-tight">{s.title}</h3>
        <p className="mt-1 text-xs text-white/60">{s.subtitle}</p>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="space-y-3">
          {s.metrics.map((m) => (
            <div key={m.label}>
              <div className="mb-1 flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">{m.label}</span>
                <span className="font-medium text-foreground">{m.value}</span>
              </div>
              <div className="h-1 overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${m.value}%`,
                    background: "var(--midnight)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="my-4 h-px bg-border" />

        <ul className="space-y-1.5 text-xs">
          {s.pros.map((p) => (
            <li key={p} className="flex gap-2">
              <Check className="mt-0.5 h-3 w-3 shrink-0 text-midnight" />
              <span className="text-foreground">{p}</span>
            </li>
          ))}
          {s.cons.map((c) => (
            <li key={c} className="flex gap-2 opacity-70">
              <X className="mt-0.5 h-3 w-3 shrink-0 text-muted-foreground" />
              <span className="text-muted-foreground">{c}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 rounded-lg border border-midnight/20 bg-midnight/5 px-3 py-2 text-center text-xs font-medium text-midnight">
          {s.headline}
        </div>

        <button
          onClick={onOpenRM}
          className="mt-4 w-full rounded-lg py-2.5 text-sm font-medium text-white transition-all hover:scale-[1.02]"
          style={{ background: "var(--midnight)", boxShadow: "var(--shadow-navy)" }}
        >
          Review with RM
        </button>
      </div>
    </div>
  );
}