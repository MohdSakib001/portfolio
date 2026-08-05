import { Lightbulb, ShieldCheck, Zap } from "lucide-react";

import CtaSection, { type CtaPill } from "@/components/CtaSection";
import { email } from "@/data/constants";
import { tools } from "@/data/tools";
import ToolsGrid from "./ToolsGrid";

const liveCount = tools.filter((tool) => tool.status === "live").length;

const TOOL_PILLS: CtaPill[] = [
  { icon: Zap, label: "Free forever" },
  { icon: ShieldCheck, label: "No login, no ads" },
  { icon: Lightbulb, label: "Built on request" },
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-40 pb-12 px-6 md:px-16 max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-black leading-none mb-5">
          Free Tools.
        </h1>
        <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
          {liveCount} utilities that run entirely in your browser. Nothing is
          sent anywhere.
        </p>
      </section>

      {/* Search + Bento grid (client component) */}
      <ToolsGrid />

      <CtaSection
        eyebrow="Roadmap"
        title="Got a tool idea?"
        description="Suggest it and I'll add it to the roadmap. Most requests ship as a working tool within a week."
        pills={TOOL_PILLS}
        href={`mailto:${email}?subject=${encodeURIComponent("Tool suggestion")}`}
        cta="Suggest a tool"
      />
    </main>
  );
}
