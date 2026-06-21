import { ScenarioCards } from "./ScenarioCards";

export function ScenariosView({ onOpenRM }: { onOpenRM: () => void }) {
  return (
    <div className="px-8 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-midnight">
            My Scenarios · Swiss Alps Villa 2029
          </div>
          <h1 className="mt-2 font-display text-4xl font-medium">Four pathways, one vision.</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            JULIA has modeled four mandate-ready scenarios from your conversation. Compare side by side, then bring the most resonant pathways to your Relationship Manager for a deeper review.
          </p>
        </div>
        <ScenarioCards onOpenRM={onOpenRM} />
      </div>
    </div>
  );
}