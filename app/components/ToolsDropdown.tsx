"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  FileText, QrCode, Lock, Braces, Download,
  Palette, Timer, AlignLeft, Percent, Hash,
  ArrowRight, ChevronDown,
  type LucideProps,
} from "lucide-react";
import type { ElementType } from "react";
import { tools, CATEGORY_META } from "../data/tools";

const FEATURED_IDS = [
  "word-counter",
  "qr-code-generator",
  "password-generator",
  "json-formatter",
  "image-compressor",
  "color-picker",
  "pomodoro-timer",
  "lorem-ipsum-generator",
  "percentage-calculator",
  "base64-encoder",
];

const ICON_MAP: Record<string, ElementType<LucideProps>> = {
  FileText, QrCode, Lock, Braces, Download,
  Palette, Timer, AlignLeft, Percent, Hash,
};

export default function ToolsDropdown() {
  const [open, setOpen] = useState(false);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const enter = () => {
    if (timeout.current) clearTimeout(timeout.current);
    setOpen(true);
  };
  const leave = () => {
    timeout.current = setTimeout(() => setOpen(false), 160);
  };

  const featured = FEATURED_IDS
    .map((id) => tools.find((t) => t.id === id))
    .filter(Boolean) as (typeof tools)[number][];

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className="flex items-center gap-1 text-[11px] uppercase tracking-[0.18em] font-medium px-5 py-2 opacity-70 hover:opacity-100 transition-opacity duration-300"
      >
        Tools
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50 transition-all duration-200 ease-out ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="w-[300px] max-w-[calc(100vw-2rem)] rounded-2xl border border-neutral-200/70 bg-white shadow-2xl shadow-black/8 overflow-hidden">

          {/* Header */}
          <div className="px-5 pt-4 pb-3 border-b border-neutral-100 flex items-center justify-between">
            <p className="text-[9px] uppercase tracking-[0.25em] text-neutral-400 font-medium">
              Free Tools
            </p>
            <p className="text-[9px] text-neutral-300 font-mono">
              {tools.length} total
            </p>
          </div>

          {/* Tool list */}
          <div className="py-2">
            {featured.map((tool) => {
              const Icon = ICON_MAP[tool.icon] ?? FileText;
              const meta = CATEGORY_META[tool.category];
              return (
                <Link
                  key={tool.id}
                  href={`/tools#${tool.id}`}
                  onClick={() => setOpen(false)}
                  className="group flex items-center gap-3 px-4 py-2.5 hover:bg-neutral-50 transition-colors duration-150"
                >
                  <span
                    className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                    style={{ background: meta.bg }}
                  >
                    <Icon size={12} style={{ color: meta.color }} />
                  </span>
                  <span className="text-[12px] font-medium text-black leading-none">
                    {tool.name}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Footer */}
          <div className="border-t border-neutral-100 px-5 py-3.5 flex items-center justify-between">
            <p className="text-[9px] text-neutral-300 uppercase tracking-widest">
              No login · No ads
            </p>
            <Link
              href="/tools"
              onClick={() => setOpen(false)}
              className="group inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] font-medium text-black hover:text-neutral-500 transition-colors"
            >
              All tools
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
