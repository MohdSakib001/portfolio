import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Container from "@/components/Container";
import {
  FALLBACK_ICON,
  ICON_MAP,
  getToolPalette,
} from "@/components/tools/toolIcons";
import type { Tool } from "@/data/tools";

type ToolSectionProps = {
  tools: Tool[];
  label?: string;
  title?: string;
  description?: string;
  showViewAll?: boolean;
  className?: string;
};

function ToolCard({ tool }: { tool: Tool }) {
  const Icon = ICON_MAP[tool.icon] ?? FALLBACK_ICON;
  const palette = getToolPalette(tool.id);

  return (
    <Link
      href={`/tools/${tool.id}`}
      title={tool.name}
      className="group relative flex flex-col overflow-hidden rounded-2xl p-6 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl"
      style={{ backgroundColor: palette.bg }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-45 mix-blend-overlay"
        style={{
          backgroundImage: `url("/assets/paper-texture.avif")`,
          backgroundSize: "cover",
        }}
      />

      <Icon
        size={120}
        aria-hidden
        className="pointer-events-none absolute -bottom-6 -right-6 rotate-12"
        style={{ color: palette.color, opacity: 0.08 }}
      />

      <div className="relative z-10 mb-5">
        <Icon size={24} style={{ color: palette.color }} />
      </div>

      <h3 className="relative z-10 text-lg font-semibold leading-tight tracking-tight text-black">
        {tool.name}
      </h3>

      <p className="relative z-10 mt-3 line-clamp-3 flex-1 text-caption leading-relaxed text-black/60">
        {tool.description}
      </p>

      <div className="relative z-10 mt-6 flex items-center justify-between gap-4 pt-4">
        <span className="inline-flex flex-wrap gap-3">
          {tool.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-label font-medium uppercase tracking-[0.16em]"
              style={{ color: palette.color, opacity: 0.6 }}
            >
              {tag}
            </span>
          ))}
        </span>
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-white transition duration-200 group-hover:bg-neutral-800">
          <ArrowRight size={15} />
        </span>
      </div>
    </Link>
  );
}

export default function ToolSection({
  tools,
  label,
  title = "Related tools.",
  description = "More free browser-based utilities, connected by category and use case.",
  showViewAll = true,
  className,
}: ToolSectionProps) {
  if (!tools.length) return null;

  return (
    <Container className={className}>
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          {label && (
            <p className="mb-3 text-label font-medium uppercase tracking-[0.25em] text-black/30">
              {label}
            </p>
          )}
          <h2 className="text-heading font-semibold leading-none tracking-tight text-black">
            {title}
          </h2>
          <p className="mt-3 max-w-xl text-caption leading-relaxed text-black/40">
            {description}
          </p>
        </div>

        {showViewAll && (
          <Link
            href="/tools"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-black px-5 py-3 text-label font-semibold uppercase tracking-[0.12em] text-white transition duration-200 hover:bg-neutral-800"
          >
            All Tools
            <ArrowRight size={14} />
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </Container>
  );
}
