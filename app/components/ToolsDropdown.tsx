"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  FileText,
  QrCode,
  Lock,
  Braces,
  Download,
  Palette,
  Timer,
  AlignLeft,
  Percent,
  Hash,
  ArrowRight,
  ChevronDown,
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
  FileText,
  QrCode,
  Lock,
  Braces,
  Download,
  Palette,
  Timer,
  AlignLeft,
  Percent,
  Hash,
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

  const featured = FEATURED_IDS.map((id) =>
    tools.find((t) => t.id === id),
  ).filter(Boolean) as (typeof tools)[number][];

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className="flex items-center gap-1 text-[11px] uppercase tracking-[0.18em] font-medium px-5 py-2 cursor-pointer"
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
        <div
          className="w-[300px] max-w-[calc(100vw-2rem)] rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.72)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.60)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.80), 0 24px 48px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.06)",
          }}
        >
          {/* Header */}
          <div
            className="px-5 pt-4 pb-3 flex items-center justify-between"
            style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}
          >
            <p
              className="text-[9px] uppercase tracking-[0.25em] font-medium"
              style={{ color: "rgba(0,0,0,0.35)" }}
            >
              Free Tools
            </p>
            <p
              className="text-[9px] font-mono"
              style={{ color: "rgba(0,0,0,0.25)" }}
            >
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
                  className="group flex items-center gap-3 px-4 py-2.5 transition-colors duration-150"
                  style={{ ["--hover-bg" as string]: "rgba(0,0,0,0.04)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(0,0,0,0.04)")
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.background = "")}
                >
                  <span
                    className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                    style={{ background: meta.bg }}
                  >
                    <Icon size={12} style={{ color: meta.color }} />
                  </span>
                  <span
                    className="text-[12px] font-medium leading-none"
                    style={{ color: "rgba(0,0,0,0.82)" }}
                  >
                    {tool.name}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Footer */}
          <div
            className="px-5 py-3.5 flex items-center justify-between"
            style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}
          >
            <p
              className="text-[9px] uppercase tracking-widest"
              style={{ color: "rgba(0,0,0,0.25)" }}
            >
              No login · No ads
            </p>
            <Link
              href="/tools"
              onClick={() => setOpen(false)}
              className="group inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] font-medium transition-colors"
              style={{ color: "rgba(0,0,0,0.70)" }}
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
