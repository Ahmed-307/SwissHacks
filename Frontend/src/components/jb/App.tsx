import { useState } from "react";
import { TopNav, type View } from "./TopNav";
import { Sidebar } from "./Sidebar";
import { VisionBoardChat } from "./VisionBoardChat";
import { ScenariosView } from "./ScenariosView";
import { RMHub } from "./RMHub";
import { WealthTimeline } from "./WealthTimeline";
import { GhostPortfolio } from "./GhostPortfolio";

export function JuliusBaerApp() {
  const [view, setView] = useState<View>("chat");
  const [activeSession, setActiveSession] = useState("Swiss Alps Villa 2029");
  const [scenariosUnlocked, setScenariosUnlocked] = useState(false);
  const [framework, setFramework] = useState({
    timeline: true,
    lifestyle: true,
    risk: false,
    assets: false,
    legacy: false,
  });

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <TopNav view={view} setView={setView} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          active={activeSession}
          setActive={setActiveSession}
          framework={framework}
        />
        <main className="flex-1 overflow-y-auto">
          {view === "chat" && (
            <VisionBoardChat
              session={activeSession}
              framework={framework}
              setFramework={setFramework}
              scenariosUnlocked={scenariosUnlocked}
              setScenariosUnlocked={setScenariosUnlocked}
              onOpenScenarios={() => setView("scenarios")}
              onOpenRM={() => setView("rm")}
            />
          )}
          {view === "scenarios" && <ScenariosView onOpenRM={() => setView("rm")} />}
          {view === "rm" && <RMHub />}
          {view === "timeline" && <WealthTimeline />}
          {view === "ghost" && <GhostPortfolio />}
        </main>
      </div>
    </div>
  );
}