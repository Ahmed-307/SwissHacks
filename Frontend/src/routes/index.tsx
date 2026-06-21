import { createFileRoute } from "@tanstack/react-router";
import { JuliusBaerApp } from "@/components/jb/App";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Julius Baer · Private Banking Vision Board" },
      { name: "description", content: "An elite private banking experience for translating life goals into strategic wealth scenarios with your Relationship Manager." },
      { property: "og:title", content: "Julius Baer · Private Banking Vision Board" },
      { property: "og:description", content: "Translate your life vision into bespoke wealth strategies with JULIA and your Relationship Manager." },
    ],
  }),
  component: Index,
});

function Index() {
  return <JuliusBaerApp />;
}
