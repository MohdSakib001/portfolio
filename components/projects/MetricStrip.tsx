import type { Project } from "@/types/projects";

const METRIC_LABELS: Record<string, string> = {
  users: "Reach",
  revenue: "Revenue",
  performance: "Performance",
  scale: "Scale",
};

/** Compact proof bar — the project's numbers on one line. */
export default function MetricStrip({
  metrics,
}: {
  metrics: Project["metrics"];
}) {
  const entries = Object.entries(metrics).filter(([, value]) => Boolean(value));
  if (!entries.length) return null;

  return (
    <div className="flex flex-wrap gap-x-8 gap-y-6 rounded-2xl border border-black/8 bg-white px-7 py-6 shadow-[0_2px_18px_rgba(3,3,2,0.04)] lg:gap-x-0">
      {entries.map(([key, value]) => (
        <div
          key={key}
          className="min-w-[7rem] flex-1 lg:border-l lg:border-black/8 lg:pl-8 lg:first:border-l-0 lg:first:pl-0"
        >
          <p className="text-label font-medium uppercase tracking-[0.18em] text-black/35">
            {METRIC_LABELS[key] ?? key}
          </p>
          <p className="mt-1.5 text-body font-semibold tracking-tight text-black">
            {value}
          </p>
        </div>
      ))}
    </div>
  );
}
