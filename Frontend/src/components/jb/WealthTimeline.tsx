import { useState } from "react";
import { ShieldCheck, Building2, TrendingUp, Landmark, CheckCircle2, Clock, CircleDot, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

type ProfileKey = "wealthplanning" | "investing" | "financing";

type Milestone = {
  date: string;
  title: string;
  status: "Confirmed" | "Pending RM Action" | "In Progress" | "Scheduled" | "Active" | "Completed";
  detail: string;
};

type ChatLine = { from: "client" | "julia"; text: string; meta?: string };

const PROFILES: {
  key: ProfileKey;
  label: string;
  sub: string;
  icon: typeof Building2;
  chat: ChatLine[];
  milestones: Milestone[];
}[] = [
  {
    key: "wealthplanning",
    label: "Wealth Planning",
    sub: "Structuring & Wealth Transfer",
    icon: Building2,
    chat: [
      {
        from: "client",
        text: "I want to organize a multi-generational structure to handle wealth accumulation and eventual transfer to our future generations.",
        meta: "Alex W. · Jun 20, 2026",
      },
      {
        from: "julia",
        text: "Understood. I have mapped out an integrated framework balancing your current asset distribution, wealth preservation milestones, and structured family office services.",
        meta: "JULIA · Compliance reviewed",
      },
    ],
    milestones: [
      {
        date: "Q4 2026",
        title: "Comprehensive Wealth Overview & Taxation Blueprint",
        status: "Confirmed",
        detail: "Full asset inventory completed. Tax optimisation strategy drafted across Swiss, EU, and offshore jurisdictions.",
      },
      {
        date: "2028",
        title: "Family Office Structure Onboarding",
        status: "Pending RM Action",
        detail: "Single-family office framework to be established. RM to coordinate with legal counsel on governance documentation.",
      },
      {
        date: "2035",
        title: "Succession & Philanthropy Trust Activation",
        status: "Scheduled",
        detail: "Multi-generational trust activated at defined horizon. Philanthropic endowment sleeve integrated with succession plan.",
      },
    ],
  },
  {
    key: "investing",
    label: "Investing",
    sub: "Discretionary & Advisory Mandates",
    icon: TrendingUp,
    chat: [
      {
        from: "client",
        text: "Let's review our discretionary goals versus active advisory portfolio allocations.",
        meta: "Alex W. · Jun 15, 2026",
      },
      {
        from: "julia",
        text: "Your discretionary mandate is currently weighted toward Secular Global Megatrends, with advisory sleeves covering Energy Transition and Digital Disruption themes. I've flagged a rebalancing review for Q3 2027.",
        meta: "JULIA · Mandate aligned",
      },
    ],
    milestones: [
      {
        date: "Current",
        title: "Discretionary Mandate Rebalancing — Secular Global Megatrends Focus",
        status: "Active",
        detail: "Portfolio tilt toward high-conviction secular growth themes. Quarterly drift monitoring active.",
      },
      {
        date: "Q3 2027",
        title: "Advisory Mandate Review (Energy Transition & Digital Disruption Sleeves)",
        status: "Scheduled",
        detail: "Thematic sleeve allocation review. RM to present updated conviction scores and position sizing recommendations.",
      },
    ],
  },
  {
    key: "financing",
    label: "Financing",
    sub: "Lombard Lending & Real Estate",
    icon: Landmark,
    chat: [
      {
        from: "client",
        text: "We need liquidity flexibility for complex transactions without liquidating core assets.",
        meta: "Alex W. · May 30, 2026",
      },
      {
        from: "julia",
        text: "A Lombard Lending Facility has been established against your liquid portfolio, providing immediate access to collateralised credit. A Swiss Real Estate Value-Chain Financing milestone is queued for 2029.",
        meta: "JULIA · Risk reviewed",
      },
    ],
    milestones: [
      {
        date: "Immediate",
        title: "Lombard Lending Facility Establishment (Collateralised by Liquid Portfolio)",
        status: "Completed",
        detail: "Facility active. CHF 8M credit line secured against diversified liquid portfolio. Draw-down available on request.",
      },
      {
        date: "2029",
        title: "Swiss Real Estate Value-Chain Financing",
        status: "Pending RM Action",
        detail: "Structured financing package for Alpine property acquisition. RM to coordinate term sheet with credit committee.",
      },
    ],
  },
];

const STATUS_ICON: Record<Milestone["status"], typeof CheckCircle2> = {
  Confirmed: CheckCircle2,
  Completed: CheckCircle2,
  Active: Zap,
  "In Progress": CircleDot,
  "Pending RM Action": Clock,
  Scheduled: Clock,
};

export function WealthTimeline() {
  const [active, setActive] = useState<ProfileKey>("wealthplanning");
  const profile = PROFILES.find((p) => p.key === active)!;

  return (
    <div className="min-h-full bg-white px-6 py-10 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 border-b border-black/10 pb-8">
          <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#001C55]">
            <ShieldCheck className="h-3.5 w-3.5" />
            Private AI · Wealth Advisory
          </div>
          <h1 className="font-display text-4xl font-medium leading-tight text-black lg:text-5xl">
            JULIA <span className="text-[#001C55]">—</span> Wealth Timeline
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-black/60">
            A structured chronology of planning milestones, investment mandates, and financing arrangements —
            derived from your private dialogue and verified by your Relationship Manager.
          </p>
        </div>

        {/* Profile sub-tabs */}
        <div className="mb-10 flex flex-wrap gap-2 border-b border-black/10">
          {PROFILES.map((p) => {
            const Icon = p.icon;
            const isActive = p.key === active;
            return (
              <button
                key={p.key}
                onClick={() => setActive(p.key)}
                className={cn(
                  "group relative -mb-px flex items-center gap-3 border-b-2 px-5 py-4 text-left transition-all",
                  isActive
                    ? "border-[#001C55]"
                    : "border-transparent hover:border-black/20",
                )}
              >
                <div
                  className={cn(
                    "grid h-9 w-9 place-items-center border",
                    isActive
                      ? "border-[#001C55] bg-[#001C55] text-white"
                      : "border-black/15 bg-white text-black/60",
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="leading-tight">
                  <div className={cn("text-sm font-medium", isActive ? "text-black" : "text-black/70")}>
                    {p.label}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-black/40">{p.sub}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dual pane */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left — Contextual Intent Chat */}
          <section className="border-2 border-[#001C55]/20 bg-white">
            <div className="flex items-center justify-between border-b-2 border-[#001C55]/20 px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="font-display text-2xl text-black/30">01</span>
                <div className="leading-tight">
                  <div className="text-sm font-medium text-black">Contextual Intent Chat</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-black/40">
                    Source-of-truth dialogue
                  </div>
                </div>
              </div>
              <span className="border-2 border-[#001C55]/20 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-black/60">
                Verified
              </span>
            </div>
            <div className="space-y-5 px-6 py-6">
              {profile.chat.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex",
                    m.from === "client" ? "justify-end" : "justify-start",
                  )}
                >
                  <div className={cn("max-w-[85%]", m.from === "client" ? "text-right" : "text-left")}>
                    <div
                      className={cn(
                        "border px-4 py-3 text-sm leading-relaxed",
                        m.from === "client"
                          ? "border-[#001C55] bg-[#001C55] text-white"
                          : "border-2 border-[#001C55]/25 bg-white text-black",
                      )}
                    >
                      {m.text}
                    </div>
                    {m.meta && (
                      <div className="mt-1.5 text-[10px] uppercase tracking-[0.18em] text-black/40">
                        {m.meta}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Right — Visual Milestone Timeline */}
          <section className="border-2 border-[#001C55]/20 bg-white">
            <div className="flex items-center justify-between border-b-2 border-[#001C55]/20 px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="font-display text-2xl text-black/30">02</span>
                <div className="leading-tight">
                  <div className="text-sm font-medium text-black">Visual Milestone Timeline</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-black/40">
                    Chronological — {profile.label}
                  </div>
                </div>
              </div>
              <span className="border-2 border-[#001C55]/20 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-black/60">
                {profile.milestones.length} events
              </span>
            </div>
            <div className="relative px-6 py-6">
              {/* vertical axis */}
              <div className="absolute bottom-6 left-[2.25rem] top-6 w-px bg-black/15" />
              <div className="space-y-5">
                {profile.milestones.map((ms, i) => {
                  const Icon = STATUS_ICON[ms.status];
                  const isAction = ms.status === "Pending RM Action";
                  const isHighlight = ms.status === "Active" || ms.status === "Pending RM Action";
                  return (
                    <div key={i} className="relative flex gap-5">
                      <div className="relative z-10 shrink-0">
                        <div
                          className={cn(
                            "grid h-9 w-9 place-items-center border-2",
                            isAction
                              ? "border-[#001C55] bg-white text-[#001C55]"
                              : "border-[#001C55] bg-[#001C55] text-white",
                          )}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                      </div>
                      <div className="flex-1 border-2 border-[#001C55]/20 bg-white p-4">
                        <div className="mb-1 flex items-center justify-between gap-3">
                          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#001C55]">
                            {ms.date}
                          </div>
                          <span
                            className={cn(
                              "border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.18em]",
                              isHighlight
                                ? "border-[#001C55] text-[#001C55]"
                                : "border-black/20 text-black/60",
                            )}
                          >
                            {ms.status}
                          </span>
                        </div>
                        <div className="text-base font-medium text-black">{ms.title}</div>
                        <div className="mt-1 text-xs leading-relaxed text-black/60">{ms.detail}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
