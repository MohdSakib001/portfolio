"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search, X,
  FileText, Type, AlignLeft, FileCode, Sparkles, PenLine,
  Download, Maximize2, Eraser, Palette, Smile, FileImage, FileOutput, Video,
  CalendarDays, Scale, Percent, Shuffle, Receipt, Home, ArrowLeftRight,
  Timer, Clock, Globe, ClipboardList, Briefcase, BookOpen, Database, Crop,
  Braces, KeyRound, CalendarClock, Hash, Eye, Table2, Plug, GitBranch, QrCode, Lock,
  type LucideProps,
} from "lucide-react";
import type { ElementType } from "react";
import { tools, CATEGORY_META, type Tool, type ToolCategory } from "../data/tools";

const ICON_MAP: Record<string, ElementType<LucideProps>> = {
  FileText, Type, AlignLeft, FileCode, Sparkles, PenLine,
  Download, Maximize2, Eraser, Palette, Smile, FileImage, FileOutput, Video,
  CalendarDays, Scale, Percent, Shuffle, Receipt, Home, ArrowLeftRight,
  Timer, Clock, Globe, ClipboardList, Briefcase, BookOpen, Database, Crop,
  Braces, KeyRound, Search, CalendarClock, Hash, Eye, Table2, Plug, GitBranch, QrCode, Lock,
};


// Colors by index — not by category — so the bento looks varied
const PALETTE = [
  { bg: "#F0EBFF", color: "#7c3aed" },
  { bg: "#EFF6FF", color: "#3b82f6" },
  { bg: "#ECFDF5", color: "#059669" },
  { bg: "#FFF7ED", color: "#ea580c" },
  { bg: "#FFF1F2", color: "#e11d48" },
  { bg: "#F0FDFA", color: "#0d9488" },
  { bg: "#FEFCE8", color: "#b45309" },
  { bg: "#F5F3FF", color: "#8b5cf6" },
];

const TOOL_COLORS = tools.map((_, i) => PALETTE[i % PALETTE.length]);

const FEATURED = new Set([
  "word-counter", "lorem-ipsum-generator", "image-compressor",
  "color-picker", "pomodoro-timer", "json-formatter",
  "qr-code-generator", "password-generator",
]);

const CATEGORIES = Object.entries(CATEGORY_META) as [ToolCategory, (typeof CATEGORY_META)[ToolCategory]][];

function CardContent({
  tool,
  palette,
  featured,
  live,
}: {
  tool: Tool;
  palette: { bg: string; color: string };
  featured: boolean;
  live: boolean;
}) {
  const Icon = ICON_MAP[tool.icon] ?? FileText;
  return (
    <>
      {featured && (
        <Icon
          size={130}
          aria-hidden
          className="absolute -bottom-6 -right-6 pointer-events-none rotate-12"
          style={{ color: palette.color, opacity: 0.08 }}
        />
      )}

      <div className={`relative z-10 ${featured ? "mb-6" : "mb-5"}`}>
        <Icon size={featured ? 28 : 22} style={{ color: palette.color }} />
      </div>

      <div className="flex items-start justify-between gap-4 mb-2 relative z-10">
        <h3 className={`font-semibold text-neutral-800 leading-snug ${featured ? "text-[17px]" : "text-[13px]"}`}>
          {tool.name}
        </h3>
        {live ? (
          <span className="shrink-0 flex items-center gap-1 text-[9px] uppercase tracking-widest font-medium mt-0.5" style={{ color: palette.color }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: palette.color }} />
            Live
          </span>
        ) : (
          <span className="shrink-0 text-[9px] uppercase tracking-widest text-neutral-400/60 font-medium mt-0.5">
            Soon
          </span>
        )}
      </div>

      <p className={`text-neutral-500 leading-relaxed flex-1 relative z-10 ${featured ? "text-[12px] line-clamp-3" : "text-[11px] line-clamp-2"}`}>
        {tool.description}
      </p>

      <div className="flex flex-wrap items-center gap-3 mt-4 relative z-10">
        {tool.tags.slice(0, featured ? 3 : 2).map((tag) => (
          <span key={tag} className="text-[9px] font-medium uppercase tracking-wide" style={{ color: palette.color, opacity: 0.55 }}>
            {tag}
          </span>
        ))}
        {tool.needsApi && (
          <span className="ml-auto text-[9px] text-violet-500/50 font-medium tracking-wide">AI</span>
        )}
      </div>
    </>
  );
}

function ToolCard({ tool, palette, featured }: { tool: Tool; palette: { bg: string; color: string }; featured: boolean }) {
  const live = tool.status === "live";
  const sharedClass = [
    "group relative overflow-hidden rounded-2xl flex flex-col scroll-mt-28",
    "hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200",
    featured ? "sm:col-span-2 p-7" : "p-5",
  ].join(" ");

  if (live) {
    return (
      <Link href={`/tools/${tool.id}`} id={tool.id} className={sharedClass} style={{ backgroundColor: palette.bg }}>
        <CardContent tool={tool} palette={palette} featured={featured} live={live} />
      </Link>
    );
  }

  return (
    <div id={tool.id} className={sharedClass} style={{ backgroundColor: palette.bg }}>
      <CardContent tool={tool} palette={palette} featured={featured} live={live} />
    </div>
  );
}

export default function ToolsGrid() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<ToolCategory | "all">("all");

  const filtered = useMemo(() => {
    let result = tools;
    if (activeCategory !== "all") result = result.filter((t) => t.category === activeCategory);
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }
    return result;
  }, [query, activeCategory]);

  const isDefault = !query.trim() && activeCategory === "all";

  return (
    <section className="px-6 md:px-16 max-w-6xl mx-auto pb-32">

      {/* Search */}
      <div className="relative mb-4">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tools…"
          className="w-full pl-11 pr-10 py-3.5 bg-white border border-neutral-200 rounded-xl text-sm text-black placeholder:text-neutral-400 outline-none focus:border-neutral-400 transition-colors duration-150"
        />
        {query && (
          <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors">
            <X size={14} />
          </button>
        )}
      </div>

      {/* Category chips */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory("all")}
          className={`px-3.5 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors duration-150 ${activeCategory === "all" ? "bg-black text-white" : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"}`}
        >
          All {activeCategory === "all" && `· ${tools.length}`}
        </button>
        {CATEGORIES.map(([key, meta]) => {
          const active = activeCategory === key;
          const count = tools.filter((t) => t.category === key).length;
          return (
            <button
              key={key}
              onClick={() => setActiveCategory(active ? "all" : key)}
              className={`px-3.5 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors duration-150 ${active ? "text-white" : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"}`}
              style={active ? { backgroundColor: meta.color } : {}}
            >
              {meta.label} {active && `· ${count}`}
            </button>
          );
        })}
      </div>

      {query.trim() && (
        <p className="text-[11px] text-neutral-400 mb-5">
          {filtered.length === 0 ? `No results for "${query}"` : `${filtered.length} tool${filtered.length === 1 ? "" : "s"} found`}
        </p>
      )}

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 grid-flow-dense">
          {filtered.map((tool) => {
            const originalIndex = tools.indexOf(tool);
            return (
              <ToolCard
                key={tool.id}
                tool={tool}
                palette={TOOL_COLORS[originalIndex]}
                featured={isDefault && FEATURED.has(tool.id)}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <p className="text-neutral-400 text-sm mb-3">No tools match &ldquo;{query}&rdquo;</p>
          <button
            onClick={() => { setQuery(""); setActiveCategory("all"); }}
            className="text-[11px] uppercase tracking-[0.15em] font-medium text-black underline underline-offset-4"
          >
            Clear search
          </button>
        </div>
      )}
    </section>
  );
}
