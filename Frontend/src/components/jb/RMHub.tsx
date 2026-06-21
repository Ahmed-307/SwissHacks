import { useState } from "react";
import { Send, Calendar, Sparkles, ChevronRight, User2, FileText, Download, ShieldCheck, Lock, BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "decisions" | "actions" | "next";

const TAB_CONTENT: Record<Tab, { title: string; items: { head: string; body: string }[] }> = {
  decisions: {
    title: "Key Decisions",
    items: [
      { head: "Pursue Scenario B with a Scenario C overlay", body: "Balanced Legacy Trust selected as the primary frame, with a tactical Alpine acquisition window in Q3 2027." },
      { head: "Liechtenstein structure confirmed", body: "Family foundation in Vaduz, with Swiss residency optimization handled in parallel." },
      { head: "Risk budget set at 14% volatility", body: "Aligned to a balanced posture; rebalancing trigger at ±2.5%." },
    ],
  },
  actions: {
    title: "Action Items for RM",
    items: [
      { head: "Draft Liechtenstein foundation deed", body: "Daniel to coordinate with external counsel; target circulation by July 5." },
      { head: "Open dialogue with Verbier property advisor", body: "Soft-mandate to scout 3 properties in the CHF 9-12M range." },
      { head: "Re-allocate 6% from public equities into private credit", body: "Execute over 4 tranches across June-August." },
    ],
  },
  next: {
    title: "Next Steps for Client",
    items: [
      { head: "Review and counter-sign mandate update", body: "Document will arrive in your secure vault by Wednesday." },
      { head: "Confirm beneficiaries for the foundation", body: "JULIA will prepare a one-page summary for the family meeting." },
      { head: "Diarize the Q3 strategy session", body: "Suggested window: Sep 9-11, in Zürich or by video." },
    ],
  },
};

const SAMPLE_PROMPTS = [
  "What did my RM say about the tax implications?",
  "Summarize the real estate timeline we agreed on.",
  "List the documents I still need to sign.",
];

export function RMHub() {
  const [tab, setTab] = useState<Tab>("decisions");
  const [prompt, setPrompt] = useState("");

  return (
    <div className="px-8 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-midnight">
              RM Hub · Post-Meeting Briefing
            </div>
            <h1 className="mt-2 font-display text-4xl font-medium">Your session with Daniel Forrer.</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              JULIA has indexed your last conversation with your Relationship Manager. Replay the moments that matter, or ask precise questions about what was decided.
            </p>
          </div>
          <div className="hidden items-center gap-3 rounded-xl border-2 border-midnight/20 bg-card p-3 lg:flex">
            <div
              className="grid h-10 w-10 place-items-center rounded-full text-white"
              style={{ background: "var(--gradient-midnight)" }}
            >
              <User2 className="h-4 w-4 text-white" />
            </div>
            <div className="leading-tight">
              <div className="text-xs text-muted-foreground">Relationship Manager</div>
              <div className="text-sm font-medium">Daniel Forrer, CFA</div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div
              className="overflow-hidden rounded-2xl text-white shadow-[var(--shadow-elegant)]"
              style={{ background: "var(--gradient-midnight)" }}
            >
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Shared Private AI Advisory Document
                </div>
                <span className="rounded-full border border-white/15 px-2 py-0.5 text-[9px] uppercase tracking-[0.18em] text-white/60">
                  PDF · v1.0
                </span>
              </div>

              <div className="px-5 pt-6">
                <div className="flex items-start gap-4">
                  <div className="relative shrink-0">
                    <div
                      className="grid h-20 w-16 place-items-center rounded-md border border-white/15 bg-white/[0.06] text-white shadow-inner"
                    >
                      <FileText className="h-7 w-7" />
                    </div>
                    <div
                      className="absolute -bottom-1.5 -right-1.5 rounded bg-white px-1.5 py-0.5 text-[8px] font-bold tracking-wider text-midnight"
                    >
                      PDF
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                      Official Advisory Summary
                    </div>
                    <div className="mt-1 font-display text-lg font-medium leading-tight text-white">
                      Session with Daniel Forrer
                    </div>
                    <div className="mt-1 text-[11px] text-white/55">
                      Reference · JB-ADV-2026-0620-AW · 14 pages
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 px-5 pt-4">
                {[
                  { icon: <Sparkles className="h-3 w-3" />, label: "Generated by Private AI" },
                  { icon: <BadgeCheck className="h-3 w-3" />, label: "Verified by RM" },
                  { icon: <Lock className="h-3 w-3" />, label: "Shared Confidential" },
                ].map((b) => (
                  <span
                    key={b.label}
                    className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.04] px-2 py-1 text-[10px] tracking-wide text-white/80"
                  >
                    <span className="text-white/70">{b.icon}</span>
                    {b.label}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 p-5">
                <button
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-white py-2.5 text-xs font-semibold text-midnight transition hover:scale-[1.01]"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download Report
                </button>
                <button className="rounded-lg border border-white/15 px-3 py-2.5 text-xs font-medium text-white/85 transition hover:bg-white/10">
                  View Full Advisory Ledger
                </button>
              </div>

              <div className="grid grid-cols-3 border-t border-white/10 text-center text-[11px] text-white/60">
                {[
                  { l: "Issued", v: "Jun 20, 2026" },
                  { l: "Counter-signed", v: "D. Forrer" },
                  { l: "Vault", v: "JB Secure" },
                ].map((s) => (
                  <div key={s.l} className="border-r border-white/10 px-3 py-3 last:border-r-0">
                    <div className="uppercase tracking-[0.18em] text-white/40">{s.l}</div>
                    <div className="mt-1 text-white/90">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-xl border-2 border-midnight/20 bg-card p-3 text-xs text-muted-foreground">
              <Calendar className="h-4 w-4 text-midnight" />
              Next session diarized for <span className="ml-1 font-medium text-foreground">Sep 9, 2026 · Zürich</span>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-2xl border-2 border-midnight/20 bg-card shadow-[var(--shadow-soft)]">
              <div className="flex items-center justify-between border-b-2 border-midnight/20 p-5">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-midnight" />
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      JULIA · Executive Summary
                    </div>
                    <div className="font-display text-lg font-medium">What was decided in this meeting</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-1 border-b-2 border-midnight/20 bg-muted/40 p-1">
                {([
                  ["decisions", "Key Decisions"],
                  ["actions", "Action Items for RM"],
                  ["next", "Next Steps for Client"],
                ] as const).map(([id, label]) => (
                  <button
                    key={id}
                    onClick={() => setTab(id)}
                    className={cn(
                      "flex-1 rounded-lg px-3 py-2 text-xs font-medium transition",
                      tab === id
                        ? "bg-card text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="space-y-3 p-5">
                {TAB_CONTENT[tab].items.map((it, i) => (
                  <div
                    key={it.head}
                    className="group rounded-xl border-2 border-midnight/20 bg-background p-4 transition hover:border-midnight/40"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-midnight text-[11px] font-semibold text-white"
                      >
                        {i + 1}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium">{it.head}</div>
                        <div className="mt-1 text-xs leading-relaxed text-muted-foreground">{it.body}</div>
                      </div>
                      <ChevronRight className="mt-1 h-4 w-4 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-2xl border-2 border-midnight/20 bg-card p-5 shadow-[var(--shadow-soft)]">
              <div className="mb-3 flex items-center gap-2">
                <div
                  className="grid h-7 w-7 place-items-center rounded-full text-white"
                  style={{ background: "var(--gradient-midnight)" }}
                >
                  <Sparkles className="h-3.5 w-3.5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-medium">Ask JULIA about this specific meeting</div>
                  <div className="text-[11px] text-muted-foreground">Context-aware · grounded in the transcript</div>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl border-2 border-midnight/20 bg-background px-3 py-2 transition focus-within:border-midnight/50">
                <input
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. What did Daniel suggest about Liechtenstein governance?"
                  className="flex-1 bg-transparent py-1.5 text-sm outline-none placeholder:text-muted-foreground"
                />
                <button
                  className="grid h-8 w-8 place-items-center rounded-lg bg-midnight text-white"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {SAMPLE_PROMPTS.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPrompt(p)}
                    className="rounded-full border-2 border-midnight/15 bg-background px-3 py-1.5 text-xs text-muted-foreground transition hover:-translate-y-0.5 hover:border-midnight/35 hover:bg-midnight/5 hover:text-foreground"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}