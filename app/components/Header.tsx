"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
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
  type LucideProps,
} from "lucide-react";
import type { ElementType } from "react";
import { projects } from "../data/projects";
import { tools, CATEGORY_META } from "../data/tools";

const TOOL_ICONS: Record<string, ElementType<LucideProps>> = {
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

const FEATURED = [
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

const cardStyle = {
  background: "rgba(255,255,255, 0.40)",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)",
  border: "1px solid rgba(255,255,255,0.72)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.95), 0 4px 24px rgba(0,0,0,0.08)",
} as const;

export default function Header() {
  const [active, setActive] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const featuredTools = FEATURED.map((id) =>
    tools.find((t) => t.id === id),
  ).filter(Boolean) as typeof tools;

  const enter = (id: string) => {
    if (timer.current) clearTimeout(timer.current);
    setActive(id);
  };
  const leave = () => {
    timer.current = setTimeout(() => setActive(null), 150);
  };

  const navPanels = [
    {
      id: "products",
      label: "Products",
      panel: (
        <div className="px-6 pb-6 pt-5">
          <div className="grid grid-cols-3 gap-3">
            {projects.map((p) => (
              <Link
                key={p.id}
                href={`/projects/${p.id}`}
                className="flex flex-col rounded-xl overflow-hidden p-4"
                style={cardStyle}
              >
                <div className="flex flex-row gap-x-2 items-center mb-6">
                  <div className="relative aspect-square w-6 h-6 overflow-hidden rounded-lg">
                    <Image
                      src={p.hero.src}
                      alt={p.name}
                      fill
                      className="object-cover object-top"
                      sizes="185px"
                    />
                  </div>
                  <p className="text-sm font-semibold text-black tracking-[0.03em]">
                    {p.name}
                  </p>
                </div>
                {p.metrics?.users && (
                  <p className="text-sm text-black/60 truncate tracking-[0.03em]">
                    {p.metrics.users}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "tools",
      label: "Tools",
      panel: (
        <div className="px-6 pb-6 pt-5">
          <div className="grid grid-cols-3 gap-1">
            {/* Featured tool — spans 2 columns */}
            {(() => {
              const tool = featuredTools[0];
              if (!tool) return null;
              const Icon = TOOL_ICONS[tool.icon] ?? FileText;
              const meta = CATEGORY_META[tool.category];
              return (
                <Link
                  key={tool.id}
                  href={`/tools#${tool.id}`}
                  className="col-span-2 flex flex-col gap-2.5 px-4 py-3.5 rounded-xl hover:bg-black/6 transition-colors duration-150"
                  style={cardStyle}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: meta.bg }}
                    >
                      <Icon size={15} style={{ color: meta.color }} />
                    </span>
                    <div>
                      <p
                        className="text-[9px] uppercase tracking-[0.18em] font-semibold mb-0.5"
                        style={{ color: meta.color }}
                      >
                        Featured
                      </p>
                      <p className="text-sm font-semibold text-black/90 leading-tight">
                        {tool.name}
                      </p>
                    </div>
                  </div>
                  <p className="text-[11px] text-black/50 leading-relaxed line-clamp-2">
                    {tool.description}
                  </p>
                </Link>
              );
            })()}

            {/* Remaining tools */}
            {featuredTools.slice(1).map((tool) => {
              const Icon = TOOL_ICONS[tool.icon] ?? FileText;
              const meta = CATEGORY_META[tool.category];
              return (
                <Link
                  key={tool.id}
                  href={`/tools#${tool.id}`}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-black/4 transition-colors duration-150"
                  style={cardStyle}
                >
                  <span
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: meta.bg }}
                  >
                    <Icon size={13} style={{ color: meta.color }} />
                  </span>
                  <span className="text-sm font-semibold text-black/90">
                    {tool.name}
                  </span>
                </Link>
              );
            })}

            {/* See All */}
            <Link
              href="/tools"
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-black/4 transition-colors duration-150"
              style={cardStyle}
            >
              <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-black/6">
                <ArrowRight size={13} className="text-black/50" />
              </span>
              <span className="text-sm font-semibold text-black/50">
                See All
              </span>
            </Link>
          </div>
        </div>
      ),
    },
  ];

  return (
    <header className="fixed top-3 left-3 right-3 z-50 max-w-4xl mx-auto">
      <div
        className="rounded-4xl overflow-hidden"
        style={{
          background: "rgba(255,255,255, 0.40)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          border: "1px solid rgba(255,255,255,0.72)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.95), 0 4px 24px rgba(0,0,0,0.08)",
        }}
        onMouseEnter={() => {
          if (timer.current) clearTimeout(timer.current);
        }}
        onMouseLeave={leave}
      >
        {/* TOP ROW */}
        <div className="flex items-center justify-between px-6 py-2">
          <Link
            href="/"
            className="text-[15px] font-bold tracking-[0.07em] uppercase text-black"
          >
            Sakib
          </Link>

          <nav className="hidden lg:flex items-center gap-x-4">
            {navPanels.map(({ id, label }) => (
              <span
                key={id}
                onMouseEnter={() => enter(id)}
                className={`text-sm tracking-[0.03em] font-medium transition-colors duration-200 cursor-pointer select-none ${
                  active === id
                    ? "text-black/90"
                    : "text-black/50 hover:text-black/90"
                }`}
              >
                {label}
              </span>
            ))}
            <Link
              href="/#about"
              className="text-sm tracking-[0.03em] font-medium text-black/50 hover:text-black/90 transition-colors duration-200"
            >
              About
            </Link>
            <Link
              href="/#contact"
              className="text-sm tracking-[0.03em] font-medium text-black/50 hover:text-black/90 transition-colors duration-200"
            >
              Contact
            </Link>
          </nav>

          <a
            href="mailto:mohdsakib.work@gmail.com"
            className="hidden lg:block text-[11px] uppercase tracking-[0.12em] font-semibold bg-black text-white px-5 py-2.5 rounded-lg hover:bg-neutral-800 transition-colors duration-200"
          >
            Let&apos;s Talk
          </a>

          <div className="lg:hidden w-7 h-5" />
        </div>

        {/* SINGLE EXPANDABLE PANEL — driven by JS state, no competing transitions */}
        <div
          className="hidden lg:grid transition-[grid-template-rows] duration-300 ease-out"
          style={{ gridTemplateRows: active ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            {navPanels.map(({ id, panel }) => active === id && panel)}
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <details className="lg:hidden group/m absolute top-0 right-0 z-10">
        <summary className="list-none cursor-pointer absolute top-3.5 right-6 w-7 h-5 flex flex-col justify-between">
          <span className="h-0.5 w-full bg-black block transition-all duration-300 origin-center group-open/m:rotate-45 group-open/m:translate-y-2.25" />
          <span className="h-0.5 w-full bg-black block transition-all duration-300 group-open/m:opacity-0" />
          <span className="h-0.5 w-full bg-black block transition-all duration-300 origin-center group-open/m:-rotate-45 group-open/m:-translate-y-2.25" />
        </summary>

        <nav
          className="absolute right-0 top-13 w-64 rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.72)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.95), 0 16px 40px rgba(0,0,0,0.10)",
          }}
        >
          <div className="p-2.5 flex flex-col gap-0.5">
            <details className="group/mw">
              <summary className="list-none cursor-pointer flex items-center justify-between px-3 py-2.5 text-[13px] font-medium text-black/75 hover:text-black hover:bg-black/4 rounded-xl transition-colors">
                Work
                <svg
                  className="w-3 h-3 transition-transform duration-200 group-open/mw:rotate-180"
                  viewBox="0 0 10 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <path d="M1 1l4 4 4-4" />
                </svg>
              </summary>
              <div
                className="ml-3 mt-1 mb-1 pl-3 flex flex-col gap-0.5"
                style={{ borderLeft: "1px solid rgba(0,0,0,0.08)" }}
              >
                {projects.map((p) => (
                  <Link
                    key={p.id}
                    href={`/projects/${p.id}`}
                    className="py-1.5 text-[12px] text-black/55 hover:text-black transition-colors"
                  >
                    {p.name}
                  </Link>
                ))}
                <Link
                  href="/projects"
                  className="pt-1 pb-1.5 text-[10px] uppercase tracking-wider text-black/35 hover:text-black transition-colors"
                >
                  View all →
                </Link>
              </div>
            </details>

            <details className="group/mt">
              <summary className="list-none cursor-pointer flex items-center justify-between px-3 py-2.5 text-[13px] font-medium text-black/75 hover:text-black hover:bg-black/4 rounded-xl transition-colors">
                Tools
                <svg
                  className="w-3 h-3 transition-transform duration-200 group-open/mt:rotate-180"
                  viewBox="0 0 10 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <path d="M1 1l4 4 4-4" />
                </svg>
              </summary>
              <div
                className="ml-3 mt-1 mb-1 pl-3 flex flex-col gap-0.5"
                style={{ borderLeft: "1px solid rgba(0,0,0,0.08)" }}
              >
                {featuredTools.slice(0, 6).map((t) => (
                  <Link
                    key={t.id}
                    href={`/tools#${t.id}`}
                    className="py-1.5 text-[12px] text-black/55 hover:text-black transition-colors"
                  >
                    {t.name}
                  </Link>
                ))}
                <Link
                  href="/tools"
                  className="pt-1 pb-1.5 text-[10px] uppercase tracking-wider text-black/35 hover:text-black transition-colors"
                >
                  All tools →
                </Link>
              </div>
            </details>

            <div className="h-px bg-black/[0.06] my-1 mx-1" />

            <Link
              href="/#about"
              className="block px-3 py-2.5 text-[13px] font-medium text-black/75 hover:text-black hover:bg-black/4 rounded-xl transition-colors"
            >
              About
            </Link>
            <Link
              href="/#contact"
              className="block px-3 py-2.5 text-[13px] font-medium text-black/75 hover:text-black hover:bg-black/4 rounded-xl transition-colors"
            >
              Contact
            </Link>

            <a
              href="mailto:mohdsakib.work@gmail.com"
              className="mt-1.5 block text-center bg-black text-white text-[10px] uppercase tracking-widest px-4 py-3 rounded-xl hover:bg-neutral-800 transition-colors"
            >
              Let&apos;s Talk
            </a>
          </div>
        </nav>
      </details>
    </header>
  );
}
