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
import PrimaryButton from "./primaryButton";
import MyLink from "./Link";

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

export const cardStyle = {
  background: "rgba(255,255,255, 0.45)",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)",
} as const;

export default function Header() {
  const [activePanel, setActivePanel] = useState<string | null>(null);

  const featuredTools = FEATURED.map((id) =>
    tools.find((t) => t.id === id),
  ).filter(Boolean) as typeof tools;

  const navLinks = [
    {
      id: "products",
      href: "products",
      title: "Products",
      text: "Products",
    },
    {
      id: "tools",
      href: "tools",
      title: "Tools",
      text: "Tools",
    },
    { id: "about", href: "/#about", title: "About", text: "About" },
    { id: "contact", href: "/#contact", title: "Contact", text: "Contact" },
  ];

  const navPanels = [
    {
      id: "products",
      label: "Products",
      panel: (
        <div className="p-4">
          <div className="grid grid-cols-3 gap-3">
            {projects.map((p) => (
              <Link
                key={p.id}
                href={`/projects/${p.id}`}
                className="flex flex-col rounded-xl overflow-hidden p-4"
                style={cardStyle}
              >
                <div className="flex flex-row gap-x-2 items-center">
                  <div className="relative aspect-square w-6 h-6 overflow-hidden rounded-lg">
                    <Image
                      src={p.hero.src}
                      alt={p.name}
                      fill
                      className="object-cover object-top"
                      sizes="185px"
                    />
                  </div>
                  <p className="text-caption font-semibold text-black tracking-[0.03em]">
                    {p.name}
                  </p>
                </div>
                {p.metrics?.users && (
                  <p className="text-label text-black/60 truncate tracking-[0.03em] mt-2">
                    {p.metrics.users}
                  </p>
                )}
              </Link>
            ))}

            <div className="md:hidden max-h-64 overflow-y-auto overscroll-contain flex flex-col divide-y divide-black/6">
              {projects.map((p) => (
                <Link
                  key={p.id}
                  href={`/projects/${p.id}`}
                  className="flex items-center justify-between py-3 text-caption font-medium text-black/75 hover:text-black transition-colors"
                >
                  {p.name}
                  <ArrowRight size={13} className="text-black/30" />
                </Link>
              ))}
            </div>
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
                        className="text-label uppercase tracking-[0.18em] font-semibold mb-0.5"
                        style={{ color: meta.color }}
                      >
                        Featured
                      </p>
                      <p className="text-caption font-semibold text-black/90 leading-tight">
                        {tool.name}
                      </p>
                    </div>
                  </div>
                  <p className="text-label text-black/50 leading-relaxed line-clamp-2">
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
                  <span className="text-caption font-semibold text-black/90">
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
              <span className="text-caption font-semibold text-black/50">
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
        className={`overflow-hidden ${activePanel ? "rounded-[25px]" : "rounded-[40px]"}`}
        style={{
          background: "rgba(255,255,255, 0.60)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.72)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.95), 0 4px 24px rgba(0,0,0,0.08)",
        }}
        onMouseLeave={() => setActivePanel(null)}
      >
        <div className="flex items-center justify-between px-4 py-2">
          <Link
            href="/"
            className="text-[15px] font-bold tracking-[0.07em] uppercase text-black"
          >
            Sakib
          </Link>

          <nav className="hidden md:flex items-center gap-x-4">
            {navLinks.map((nav) => {
              return (
                <span
                  key={nav.id}
                  data-nav={nav.id}
                  onMouseEnter={() => setActivePanel(nav.id)}
                  className="text-black/90 [nav:has([data-nav]:hover)_&:not(:hover)]:text-black/50 transition-colors duration-200 cursor-pointer select-none text-caption tracking-[0.03em] font-medium"
                >
                  <MyLink href={nav.href} title={nav.title} text={nav.text} />
                </span>
              );
            })}
          </nav>

          <div className="flex justify-center items-center gap-x-2">
            <PrimaryButton
              href="mailto:mohdsakib.work@gmail.com"
              title="Let's Talk"
              text="Let's Talk"
            />

            <summary className="md:hidden list-none cursor-pointer w-4 h-3 flex flex-col justify-between">
              <span className="h-0.5 w-full bg-black block transition-all duration-500 ease-in-out origin-center group-open/m:opacity-0" />
              <span className="h-0.5 w-full bg-black" />
              <span className="h-0.5 w-full bg-black block transition-all duration-500 ease-in-out origin-center group-open/m:opacity-0" />
            </summary>
          </div>
        </div>

        <div className="block overflow-hidden">
          {navPanels.map(({ id, panel }) => (
            <div
              key={id}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                activePanel === id ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">{panel}</div>
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE */}
      <details
        // className="md:hidden group/m absolute top-0 right-0 z-10"
        className="hidden"
      >
        {/* <summary className="list-none cursor-pointer absolute top-3.5 right-6 w-4 h-3 flex flex-col justify-between">
          <span className="h-0.5 w-full bg-black block transition-all duration-500 ease-in-out origin-center group-open/m:opacity-0" />
          <span className="h-0.5 w-full bg-black" />
          <span className="h-0.5 w-full bg-black block transition-all duration-500 ease-in-out origin-center group-open/m:opacity-0" />
        </summary> */}

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
              <summary className="list-none cursor-pointer flex items-center justify-between px-3 py-2.5 text-caption font-medium text-black/75 hover:text-black hover:bg-black/4 rounded-xl transition-colors">
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
                    className="py-1.5 text-caption text-black/55 hover:text-black transition-colors"
                  >
                    {p.name}
                  </Link>
                ))}
                <Link
                  href="/projects"
                  className="pt-1 pb-1.5 text-label uppercase tracking-wider text-black/35 hover:text-black transition-colors"
                >
                  View all →
                </Link>
              </div>
            </details>

            <details className="group/mt">
              <summary className="list-none cursor-pointer flex items-center justify-between px-3 py-2.5 text-caption font-medium text-black/75 hover:text-black hover:bg-black/4 rounded-xl transition-colors">
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
                    className="py-1.5 text-caption text-black/55 hover:text-black transition-colors"
                  >
                    {t.name}
                  </Link>
                ))}
                <Link
                  href="/tools"
                  className="pt-1 pb-1.5 text-label uppercase tracking-wider text-black/35 hover:text-black transition-colors"
                >
                  All tools →
                </Link>
              </div>
            </details>

            <div className="h-px bg-black/[0.06] my-1 mx-1" />

            <Link
              href="/#about"
              className="block px-3 py-2.5 text-caption font-medium text-black/75 hover:text-black hover:bg-black/4 rounded-xl transition-colors"
            >
              About
            </Link>
            <Link
              href="/#contact"
              className="block px-3 py-2.5 text-caption font-medium text-black/75 hover:text-black hover:bg-black/4 rounded-xl transition-colors"
            >
              Contact
            </Link>

            <a
              href="mailto:mohdsakib.work@gmail.com"
              className="mt-1.5 block text-center bg-black text-white text-label uppercase tracking-widest px-4 py-3 rounded-xl hover:bg-neutral-800 transition-colors"
            >
              Let&apos;s Talk
            </a>
          </div>
        </nav>
      </details>
    </header>
  );
}
