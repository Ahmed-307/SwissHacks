import { useMemo, useState } from "react";
import { ShieldCheck, X, ChevronLeft, ChevronRight, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

type Mode = "base" | "crash";

const BASE_SERIES = [
  100, 100.4, 100.2, 100.9, 101.3, 101.1, 101.7, 102.0, 101.8, 102.3,
  102.6, 102.4, 102.9, 103.1, 102.8, 103.0, 102.7, 103.2, 103.5, 103.1,
  103.4, 103.0, 103.6, 103.9, 103.5, 103.8, 104.1, 103.7, 104.0, 104.2,
  104.5, 104.1, 104.4, 104.7, 104.3, 104.6, 104.9, 104.5, 104.8, 105.1,
  104.7, 105.0,
];

// Crash continuation appended to BASE_SERIES
const CRASH_TAIL = [
  104.2, 102.6, 99.8, 96.1, 92.3, 89.0, 86.5, 84.8, 83.9, 84.3, 84.0,
];

const ALLOCATIONS = [
  { label: "EQUITIES", pct: 62, sub: "Global · Tech tilt" },
  { label: "FIXED INCOME", pct: 24, sub: "Sovereign · IG" },
  { label: "ALTERNATIVES", pct: 10, sub: "PE · Hedge" },
  { label: "CASH", pct: 4, sub: "CHF Reserve" },
];

const CARDS = [
  {
    title: "Why the dip?",
    body: "Overweighting a single sector — here, global tech — magnifies drawdowns when correlated names sell off together. A 62% equity sleeve concentrated in tech can lose multiples of the index move in a single session.",
  },
  {
    title: "The diversification principle",
    body: "Spreading capital across asset classes (equities, fixed income, alternatives, cash) and geographies dampens volatility without proportionally reducing long-term return. Correlation, not just count, is what matters.",
  },
  {
    title: "What an heir should ask the RM",
    body: "Before any tactical tilt: (1) What is the max drawdown I can tolerate? (2) Which exposures are already correlated to my family's operating wealth? (3) What hedges are available — and what do they cost in carry?",
  },
];

export function GhostPortfolio() {
  const [mode, setMode] = useState<Mode>("base");
  const [open, setOpen] = useState(false);
  const [card, setCard] = useState(0);

  const series = useMemo(
    () => (mode === "crash" ? [...BASE_SERIES, ...CRASH_TAIL] : BASE_SERIES),
    [mode],
  );

  const pnl = mode === "crash" ? -15.2 : 2.41;
  const vol = mode === "crash" ? 42.8 : 17.4;
  const day = mode === "crash" ? 43 : 42;

  const path = useMemo(() => buildPath(series, 760, 200), [series]);

  const onHighRisk = () => {
    setMode("crash");
    setCard(0);
    setTimeout(() => setOpen(true), 700);
  };

  const onReset = () => {
    setMode("base");
    setOpen(false);
  };

  return (
    <div className="min-h-full bg-white text-black">
      {/* Header */}
      <div className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-[1400px] px-10 py-10">
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-[#001C55]/70">
            <ShieldCheck className="h-3.5 w-3.5" />
            Heir Sandbox · Simulation Only
          </div>
          <h1 className="mt-3 font-display text-3xl tracking-[0.18em] text-[#001C55]">
            JULIA — NEXT-GEN HEIR SANDBOX
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-black/60">
            A virtual portfolio environment for next-generation principals to test allocation
            decisions, observe volatility, and study post-mortem analytics — without touching real
            assets.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-8 px-10 py-10 lg:grid-cols-[1.6fr_1fr]">
        {/* LEFT */}
        <div className="flex flex-col gap-6">
          <div className="border-2 border-[#001C55]/20 bg-white p-10">
            <div className="text-[10px] uppercase tracking-[0.32em] text-black/55">
              Simulated Virtual Balance · Heir Sandbox
            </div>
            <div className="mt-6 flex items-baseline gap-3">
              <div className="font-display text-6xl font-light leading-none text-[#001C55]">
                10,000,000
              </div>
              <div className="text-xl tracking-[0.2em] text-black/60">CHF</div>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 border-t border-black/10 pt-5 text-[11px] uppercase tracking-[0.24em] text-black/60">
              <span>SIM DAY {String(day).padStart(3, "0")}</span>
              <span className="text-black/30">|</span>
              <span className={cn(pnl >= 0 ? "text-[#001C55]" : "text-black")}>
                P/L · {pnl >= 0 ? "+" : ""}
                {pnl.toFixed(2)}%
              </span>
              <span className="text-black/30">|</span>
              <span>VOLATILITY INDEX · {vol.toFixed(1)}</span>
            </div>

            {/* Chart */}
            <div className="mt-8 border-t border-black/10 pt-6">
              <svg
                viewBox="0 0 760 220"
                className="h-64 w-full"
                preserveAspectRatio="none"
              >
                {[0, 1, 2, 3].map((i) => (
                  <line
                    key={i}
                    x1={0}
                    x2={760}
                    y1={20 + i * 55}
                    y2={20 + i * 55}
                    stroke="#000"
                    strokeOpacity={0.06}
                  />
                ))}
                <path
                  d={path}
                  fill="none"
                  stroke="#001C55"
                  strokeWidth={1.5}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                {mode === "crash" && (
                  <circle
                    cx={760}
                    cy={getLastY(series, 200) + 10}
                    r={4}
                    fill="#000"
                  />
                )}
              </svg>
              <div className="mt-3 flex justify-between text-[10px] uppercase tracking-[0.28em] text-black/50">
                <span>09:30</span>
                <span>12:00</span>
                <span>15:30</span>
                <span>CLOSE</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <button
              onClick={onHighRisk}
              className="border border-[#001C55] bg-[#001C55] px-6 py-5 text-[11px] uppercase tracking-[0.28em] text-white transition hover:bg-black hover:border-black"
            >
              Execute High-Risk Allocation
            </button>
            <button
              onClick={onReset}
              className="border border-[#001C55] bg-white px-6 py-5 text-[11px] uppercase tracking-[0.28em] text-[#001C55] transition hover:bg-[#001C55]/5"
            >
              Rebalance Conservatively
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-6">
          <div className="border-2 border-[#001C55]/20 bg-white">
            <div className="border-b-2 border-[#001C55]/20 px-6 py-5">
              <div className="text-[10px] uppercase tracking-[0.32em] text-black/55">
                Allocation Breakdown
              </div>
              <div className="mt-1 font-display text-lg tracking-[0.14em] text-[#001C55]">
                CURRENT SLEEVES
              </div>
            </div>
            <ul>
              {ALLOCATIONS.map((a) => (
                <li
                  key={a.label}
                  className="border-b border-black/10 px-6 py-5 last:border-b-0"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="text-[11px] uppercase tracking-[0.28em] text-black">
                      {a.label}
                    </span>
                    <span className="font-display text-2xl text-[#001C55]">{a.pct}%</span>
                  </div>
                  <div className="mt-2 h-px w-full bg-black/10">
                    <div
                      className="h-px bg-[#001C55]"
                      style={{ width: `${a.pct}%` }}
                    />
                  </div>
                  <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-black/55">
                    {a.sub}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-2 border-[#001C55]/20 bg-white p-6">
            <div className="text-[10px] uppercase tracking-[0.32em] text-black/55">
              Sandbox Stats
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
              {[
                ["Sharpe (sim)", mode === "crash" ? "0.42" : "1.18"],
                ["Max Drawdown", mode === "crash" ? "-15.2%" : "-3.1%"],
                ["Beta vs MSCI", "1.34"],
                ["Cash Buffer", "4.0%"],
              ].map(([k, v]) => (
                <div key={k} className="border-l-2 border-[#001C55]/25 pl-3">
                  <dt className="text-[10px] uppercase tracking-[0.24em] text-black/55">{k}</dt>
                  <dd className="mt-1 font-display text-lg text-[#001C55]">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6 animate-fade-in"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl border-2 border-[#001C55] bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-black/10 px-8 py-5">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-4 w-4 text-[#001C55]" />
                <div className="text-[10px] uppercase tracking-[0.32em] text-[#001C55]">
                  AI Post-Mortem & Contextual Learning
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="grid h-8 w-8 place-items-center border-2 border-[#001C55]/30 text-black/60 transition hover:bg-black hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="px-10 py-10">
              <div className="text-[10px] uppercase tracking-[0.32em] text-black/55">
                Card {card + 1} of {CARDS.length}
              </div>
              <h2 className="mt-3 font-display text-3xl tracking-[0.1em] text-[#001C55]">
                Volatility & Asset Diversification Check
              </h2>
              <div className="mt-6 border-t border-black/10 pt-6">
                <div className="text-[11px] uppercase tracking-[0.28em] text-black">
                  {CARDS[card].title}
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-black/75">
                  {CARDS[card].body}
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-black/10 pt-5">
                <button
                  onClick={() => setCard((c) => Math.max(0, c - 1))}
                  disabled={card === 0}
                  className="flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-[#001C55] disabled:opacity-30"
                >
                  <ChevronLeft className="h-3.5 w-3.5" /> Prev
                </button>
                <div className="flex gap-1.5">
                  {CARDS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCard(i)}
                      className={cn(
                        "h-1.5 w-8 transition",
                        i === card ? "bg-[#001C55]" : "bg-black/15",
                      )}
                    />
                  ))}
                </div>
                {card < CARDS.length - 1 ? (
                  <button
                    onClick={() => setCard((c) => Math.min(CARDS.length - 1, c + 1))}
                    className="flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-[#001C55]"
                  >
                    Next <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={onReset}
                    className="border border-[#001C55] bg-[#001C55] px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-white"
                  >
                    Reset Sandbox
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function buildPath(values: number[], w: number, h: number) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = Math.max(0.01, max - min);
  const stepX = w / (values.length - 1);
  return values
    .map((v, i) => {
      const x = i * stepX;
      const y = 10 + (h - 20) * (1 - (v - min) / range);
      return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}

function getLastY(values: number[], h: number) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = Math.max(0.01, max - min);
  return (h - 20) * (1 - (values[values.length - 1] - min) / range);
}