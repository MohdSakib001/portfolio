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

  const isMobileMenuOpen =
    activePanel === "mobile-nav" ||
    activePanel === "mobile-products" ||
    activePanel === "mobile-tools";

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
        <div className="p-4 max-h-[80vh] overflow-y-scroll">
          <div className="grid grid-cols-3 gap-3">
            {projects.map((p) => (
              <Link
                key={p.id}
                href={`/products/${p.id}`}
                className="flex flex-col rounded-xl overflow-hidden p-4"
                style={cardStyle}
                title={p.name}
              >
                <div className="flex flex-row gap-x-2 items-center">
                  <div className="relative aspect-square w-24 h-24 overflow-hidden rounded-lg">
                    <Image
                      src={p.hero.src}
                      alt={p.name}
                      fill
                      className="object-contain object-center"
                      sizes="740px"
                      title={p.name}
                    />
                  </div>
                  <div>
                    <p className="text-caption font-semibold text-black tracking-[0.03em]">
                      {p.name}
                    </p>
                    {p.metrics?.users && (
                      <p className="text-label text-black/60 truncate tracking-[0.03em] mt-2">
                        {p.metrics.users}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}

            <div className="md:hidden max-h-64 overflow-y-auto overscroll-contain flex flex-col divide-y divide-black/6">
              {projects.map((p) => (
                <Link
                  key={p.id}
                  href={`/projects/${p.id}`}
                  className="flex items-center justify-between py-3 text-caption font-medium text-black/75 hover:text-black transition-colors"
                  title={p.name}
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
        <div className="p-6 max-h-[80vh] overflow-y-scroll">
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
                  title={tool.name}
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
                  title={tool.name}
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
              title="See All Tools"
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
    {
      id: "mobile-nav",
      label: "Mobile Nav",
      panel: (
        <div className="md:hidden p-4 flex flex-col gap-0.5 gap-y-4 max-h-[70vh] overflow-y-scroll">
          <div
            className="rounded-2xl"
            style={{
              background: "rgba(255,255,255, 0.90)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            <button
              onClick={() =>
                setActivePanel((prev) =>
                  prev === "mobile-products" ? "mobile-nav" : "mobile-products",
                )
              }
              className="list-none cursor-pointer flex items-center justify-between px-3 py-2.5 text-black w-full rounded-xl transition-colors"
              name="Mobile Products Toggle"
              title="Mobile Products Toggle"
            >
              <p className="text-caption font-medium text-black/75">Products</p>
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${activePanel === "mobile-products" ? "rotate-180" : ""}`}
                viewBox="0 0 10 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M1 1l4 4 4-4" />
              </svg>
            </button>

            <div
              className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${activePanel === "mobile-products" ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <div className="px-2 pb-3 flex flex-col gap-2">
                  {projects.map((p) => (
                    <Link
                      key={p.id}
                      href={`/projects/${p.id}`}
                      className="flex items-center gap-3 p-3 rounded-xl"
                      style={cardStyle}
                      title={p.name}
                    >
                      <div className="relative w-12 h-12 shrink-0 rounded-lg overflow-hidden">
                        <Image
                          src={p.hero.src}
                          alt={p.name}
                          fill
                          className="object-contain object-center"
                          sizes="48px"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-caption font-semibold text-black tracking-[0.03em]">
                          {p.name}
                        </p>
                        {p.metrics?.users && (
                          <p className="text-label text-black/50 mt-0.5 truncate">
                            {p.metrics.users}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            className="rounded-2xl"
            style={{
              background: "rgba(255,255,255, 0.90)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            <button
              onClick={() =>
                setActivePanel((prev) =>
                  prev === "mobile-tools" ? "mobile-nav" : "mobile-tools",
                )
              }
              className="list-none cursor-pointer flex w-full items-center justify-between text-black px-3 py-2.5  rounded-xl transition-all"
              name="Mobile Tools Toggle"
              title="Mobile Tools Toggle"
            >
              <p className="text-caption font-medium text-black/75">Tools</p>
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${activePanel === "mobile-tools" ? "rotate-180" : ""}`}
                viewBox="0 0 10 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M1 1l4 4 4-4" />
              </svg>
            </button>

            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out overflow-hidden ${activePanel === "mobile-tools" ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <div className="px-2 pb-3 pt-1 flex flex-col gap-2">
                  {featuredTools.slice(0, 6).map((tool) => {
                    const Icon = TOOL_ICONS[tool.icon] ?? FileText;
                    const meta = CATEGORY_META[tool.category];
                    return (
                      <Link
                        key={tool.id}
                        href={`/tools#${tool.id}`}
                        className="flex items-center gap-3 p-3 rounded-xl"
                        style={cardStyle}
                        title={tool.name}
                      >
                        <span
                          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: meta.bg }}
                        >
                          <Icon size={15} style={{ color: meta.color }} />
                        </span>
                        <div className="min-w-0">
                          <p className="text-caption font-semibold text-black/90">
                            {tool.name}
                          </p>
                          <p className="text-label text-black/50 mt-0.5 truncate">
                            {tool.description}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                  <Link
                    href="/tools"
                    className="px-3 pt-1 pb-0.5 text-label uppercase tracking-wider text-black/35"
                  >
                    All tools →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/#about"
            title="About"
            style={{
              background: "rgba(255,255,255, 0.90)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
            className="px-3 py-2.5 text-caption font-medium text-black/75 hover:text-black hover:bg-black/4 rounded-2xl transition-colors"
          >
            About
          </Link>
          <Link
            href="/#contact"
            title="Contact"
            style={{
              background: "rgba(255,255,255, 0.90)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
            className="px-3 py-2.5 text-caption font-medium text-black/75 hover:text-black hover:bg-black/4 rounded-2xl transition-colors"
          >
            Contact
          </Link>
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
            title="Home"
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

            <button
              className="md:hidden flex flex-col justify-between w-4 h-3"
              onClick={() =>
                setActivePanel(isMobileMenuOpen ? null : "mobile-nav")
              }
              name="HamburgerMenu"
            >
              <span
                className={`h-0.5 w-full bg-black block transition-all duration-500 ease-in-out ${isMobileMenuOpen ? "translate-y-1.25 rotate-45" : ""}`}
              />
              <span
                className={`h-0.5 w-full bg-black block transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`}
              />
              <span
                className={`h-0.5 w-full bg-black block transition-all duration-500 ease-in-out ${isMobileMenuOpen ? "-translate-y-1.25 -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>

        <div className="block overflow-hidden">
          {navPanels.map(({ id, panel }) => {
            const isOpen =
              id === "mobile-nav" ? isMobileMenuOpen : activePanel === id;

            return (
              <div
                key={id}
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">{panel}</div>
              </div>
            );
          })}
        </div>
      </div>
    </header>
  );
}
