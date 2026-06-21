import { useEffect, useRef, useState } from "react";
import { Send, Sparkles, Mountain, Building2, Waves, Paperclip, Mic, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Framework } from "./Sidebar";
import { ScenarioCards } from "./ScenarioCards";

type Msg =
  | { id: string; role: "julia"; text: string; options?: { label: string; icon?: React.ReactNode }[] }
  | { id: string; role: "user"; text: string };

const INITIAL: Msg[] = [
  {
    id: "j1",
    role: "julia",
    text:
      "Good afternoon, Alex. Let's continue shaping your Swiss Alps vision. You mentioned a 2029 horizon — is this still a primary residence, or evolving toward a generational retreat?",
    options: [
      { label: "Generational retreat" },
      { label: "Primary residence" },
      { label: "Seasonal escape" },
    ],
  },
  {
    id: "u1",
    role: "user",
    text: "Generational retreat — I'd like the family to inherit it in good structure.",
  },
  {
    id: "j2",
    role: "julia",
    text:
      "Beautifully clear. That shifts us toward a long-horizon trust structure. To match the right region and architecture, where do you picture the property?",
    options: [
      { label: "Swiss Alps", icon: <Mountain className="h-3.5 w-3.5" /> },
      { label: "Mediterranean Coast", icon: <Waves className="h-3.5 w-3.5" /> },
      { label: "Metropolitan Hub", icon: <Building2 className="h-3.5 w-3.5" /> },
    ],
  },
];

export function VisionBoardChat({
  session,
  framework,
  setFramework,
  scenariosUnlocked,
  setScenariosUnlocked,
  onOpenScenarios,
  onOpenRM,
}: {
  session: string;
  framework: Framework;
  setFramework: (f: Framework) => void;
  scenariosUnlocked: boolean;
  setScenariosUnlocked: (b: boolean) => void;
  onOpenScenarios: () => void;
  onOpenRM: () => void;
}) {
  const [messages, setMessages] = useState<Msg[]>(INITIAL);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, scenariosUnlocked]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const id = `u-${Date.now()}`;
    setMessages((m) => [...m, { id, role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const next = { ...framework };
      if (!framework.risk) next.risk = true;
      else if (!framework.assets) next.assets = true;
      else if (!framework.legacy) next.legacy = true;
      setFramework(next);

      const allDone = next.risk && next.assets && next.legacy;
      if (allDone && !scenariosUnlocked) {
        setMessages((m) => [
          ...m,
          {
            id: `j-${Date.now()}`,
            role: "julia",
            text:
              "Wonderful. With timeline, lifestyle, risk profile, and legacy intent captured, I've translated your vision into four strategic pathways. Each one is calibrated to your mandate and ready to review with Daniel, your Relationship Manager.",
          },
        ]);
        setTimeout(() => setScenariosUnlocked(true), 700);
      } else {
        setMessages((m) => [
          ...m,
          {
            id: `j-${Date.now()}`,
            role: "julia",
            text: nextQuestion(next),
            options: nextOptions(next),
          },
        ]);
      }
    }, 1200);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card/60 px-8 py-6 backdrop-blur">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div
              className="relative grid h-14 w-14 place-items-center rounded-full text-white shadow-[var(--shadow-elegant)]"
              style={{ background: "var(--gradient-midnight)" }}
            >
              <Sparkles className="h-5 w-5 text-white" />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-white ring-2 ring-midnight" />
            </div>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-midnight">
                Vision Board
              </div>
              <h1 className="mt-1 flex items-baseline gap-3 font-display text-3xl font-semibold tracking-[0.18em] text-midnight-deep">
                JULIA
                <span className="font-sans text-sm font-normal tracking-[0.12em] text-muted-foreground">
                  — think through before you talk it through
                </span>
              </h1>
              <p className="mt-1 text-xs text-muted-foreground">
                Current session · <span className="font-medium text-foreground">{session}</span>
              </p>
            </div>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <div className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground">
              Mandate · Discretionary CHF
            </div>
            <button
              onClick={onOpenRM}
              className="rounded-full border border-midnight/20 px-4 py-1.5 text-xs font-medium text-midnight transition hover:bg-midnight hover:text-white"
            >
              Notify RM
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-8 py-8">
        <div className="mx-auto max-w-3xl space-y-6">
          {messages.map((m) =>
            m.role === "julia" ? (
              <JuliaMessage key={m.id} msg={m} onPick={send} />
            ) : (
              <UserMessage key={m.id} text={m.text} />
            ),
          )}
          {typing && <TypingIndicator />}

          {scenariosUnlocked && (
            <div className="pt-4 animate-fade-in">
              <ScenarioReveal onOpenRM={onOpenRM} onOpenScenarios={onOpenScenarios} />
            </div>
          )}
        </div>
      </div>

      {/* Composer */}
      <div className="border-t border-border bg-card/80 px-8 py-5 backdrop-blur">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-end gap-3 rounded-2xl border-2 border-midnight/20 bg-background p-2 pl-4 shadow-sm transition focus-within:border-midnight/50 focus-within:shadow-[var(--shadow-elegant)]">
            <button className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:bg-muted">
              <Paperclip className="h-4 w-4" />
            </button>
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              placeholder="Share another detail with JULIA..."
              className="max-h-32 flex-1 resize-none bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
            />
            <button className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:bg-muted">
              <Mic className="h-4 w-4" />
            </button>
            <button
              onClick={() => send(input)}
              disabled={!input.trim()}
              className="grid h-9 w-9 place-items-center rounded-lg text-white transition disabled:opacity-40"
              style={{ background: "var(--midnight)" }}
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-2 text-center text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Conversations are confidential · Bank-secrecy grade encryption
          </div>
        </div>
      </div>
    </div>
  );
}

function nextQuestion(f: Framework) {
  if (!f.risk) return "Thank you. When markets correct sharply, which feels closer to you — protect the capital, or lean in for opportunity?";
  if (!f.assets) return "Noted. Beyond the property itself, are there asset classes you'd like to favor or avoid within this mandate?";
  if (!f.legacy) return "And for the legacy frame — how should the structure handle Swiss residency, inheritance jurisdictions, and tax optimization across generations?";
  return "Anything else you'd like me to weave into the vision?";
}

function nextOptions(f: Framework) {
  if (!f.risk)
    return [
      { label: "Protect capital" },
      { label: "Balanced approach" },
      { label: "Lean in for opportunity" },
    ];
  if (!f.assets)
    return [
      { label: "Favor real assets" },
      { label: "Favor public equities" },
      { label: "Include private markets" },
    ];
  if (!f.legacy)
    return [
      { label: "Swiss family foundation" },
      { label: "Liechtenstein trust" },
      { label: "Discuss with RM first" },
    ];
  return undefined;
}

function JuliaAvatar() {
  return (
    <div className="relative shrink-0">
      <div
        className="grid h-10 w-10 place-items-center rounded-full text-white shadow-md"
        style={{ background: "var(--gradient-midnight)" }}
      >
        <Sparkles className="h-4 w-4 text-white" />
      </div>
      <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-white ring-2 ring-midnight" />
    </div>
  );
}

function JuliaMessage({ msg, onPick }: { msg: Extract<Msg, { role: "julia" }>; onPick: (s: string) => void }) {
  return (
    <div className="flex items-start gap-3 animate-fade-in">
      <JuliaAvatar />
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          <span className="font-display text-sm font-medium">JULIA</span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Wealth Intelligence</span>
        </div>
        <div className="rounded-2xl rounded-tl-sm border-2 border-midnight/25 bg-card p-4 text-[15px] leading-relaxed text-foreground shadow-[var(--shadow-soft)]">
          {msg.text}
        </div>
        {msg.options && (
          <div className="mt-3 flex flex-wrap gap-2">
            {msg.options.map((o) => (
              <button
                key={o.label}
                onClick={() => onPick(o.label)}
                className="group inline-flex items-center gap-2 rounded-full border-2 border-midnight/20 bg-card px-4 py-2 text-xs font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-midnight/40 hover:bg-midnight/5 hover:shadow-[var(--shadow-soft)]"
              >
                {o.icon}
                {o.label}
                <ArrowRight className="h-3 w-3 opacity-0 transition group-hover:opacity-60" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function UserMessage({ text }: { text: string }) {
  return (
    <div className="flex justify-end animate-fade-in">
      <div
        className="max-w-[75%] rounded-2xl rounded-tr-sm px-4 py-3 text-[15px] leading-relaxed text-white shadow-[var(--shadow-soft)]"
        style={{ background: "var(--gradient-midnight)" }}
      >
        {text}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-start gap-3">
      <JuliaAvatar />
      <div className="rounded-2xl rounded-tl-sm border-2 border-midnight/25 bg-card px-4 py-3 shadow-[var(--shadow-soft)]">
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-midnight"
              style={{
                animation: `typing-dot 1.4s ${i * 0.2}s infinite ease-in-out`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ScenarioReveal({ onOpenRM, onOpenScenarios }: { onOpenRM: () => void; onOpenScenarios: () => void }) {
  return (
    <div className="rounded-3xl border border-midnight/20 bg-gradient-to-br from-card to-midnight/5 p-6 shadow-[var(--shadow-elegant)]">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-midnight">
            4 Strategic Scenarios · Unlocked
          </div>
          <h2 className="mt-1 font-display text-2xl font-medium">Translating your vision into mandate-ready pathways</h2>
        </div>
        <button
          onClick={onOpenScenarios}
          className="hidden rounded-full border border-midnight/20 px-4 py-2 text-xs font-medium text-midnight transition hover:bg-midnight hover:text-white md:inline-flex"
        >
          Expand full view
        </button>
      </div>
      <ScenarioCards onOpenRM={onOpenRM} compact />
    </div>
  );
}