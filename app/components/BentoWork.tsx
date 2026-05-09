"use client";

import Image from "next/image";
import Link from "next/link";

type StatType = "revenue" | "users" | "scale" | "clients";
type Platform = "mobile" | "web";
type Stat = { label: string; value: string; type: StatType };

const products: {
  id: string;
  name: string;
  category: string;
  platform: Platform;
  live: boolean;
  stats: Stat[];
  image: string;
  bg: string;
  accent: string;
  stores: { ios?: string; android?: string };
  col: string;
  row: string;
  priority: boolean;
}[] = [
  {
    id: "stakeclash",
    name: "StakeClash",
    category: "Gaming · FinTech",
    platform: "mobile",
    live: true,
    stats: [
      { label: "Revenue", value: "$12K MRR", type: "revenue" },
      { label: "Userbase", value: "1K+ MAU", type: "users" },
    ],
    image: "/assets/projects/stakeclash/stakeclash2.webp",
    bg: "#E6E0F8",
    accent: "#7C6FD4",
    stores: { ios: "#", android: "#" },
    col: "lg:col-span-2",
    row: "lg:row-span-2",
    priority: true,
  },
  {
    id: "artificialmufti",
    name: "Artificial Mufti",
    category: "AI · Islamic Tech",
    platform: "mobile",
    live: true,
    stats: [{ label: "Userbase", value: "200+ DAU", type: "users" }],
    image: "/assets/projects/artificialmufti/1.png",
    bg: "#F4EDDA",
    accent: "#B8860B",
    stores: { ios: "#", android: "#" },
    col: "lg:col-span-1",
    row: "lg:row-span-2",
    priority: true,
  },
  {
    id: "pademi",
    name: "Pademi",
    category: "EdTech",
    platform: "mobile",
    live: true,
    stats: [{ label: "Students", value: "25K+", type: "users" }],
    image: "/assets/projects/pademi/pademi6.webp",
    bg: "#DAF0DE",
    accent: "#2E8B47",
    stores: { ios: "#", android: "#" },
    col: "lg:col-span-1",
    row: "",
    priority: false,
  },
  {
    id: "sendora",
    name: "Sendora",
    category: "FinTech",
    platform: "mobile",
    live: true,
    stats: [{ label: "Processed", value: "$50K+", type: "revenue" }],
    image: "/assets/projects/sendora/sendora1.webp",
    bg: "#DCE8F6",
    accent: "#2563EB",
    stores: { ios: "#", android: "#" },
    col: "lg:col-span-1",
    row: "",
    priority: false,
  },
  {
    id: "colaw",
    name: "CoLaw",
    category: "LegalTech",
    platform: "web",
    live: true,
    stats: [{ label: "Clients", value: "200+ Firms", type: "clients" }],
    image: "/assets/projects/colaw/colaw1.webp",
    bg: "#E8E4DA",
    accent: "#7D6E55",
    stores: {},
    col: "lg:col-span-1",
    row: "",
    priority: false,
  },
  {
    id: "teppe",
    name: "Teppe",
    category: "PropTech",
    platform: "mobile",
    live: true,
    stats: [{ label: "Tenants", value: "15K+", type: "users" }],
    image: "/assets/projects/teppe/teppe1.webp",
    bg: "#D4EDE8",
    accent: "#1A8C7E",
    stores: { ios: "#", android: "#" },
    col: "lg:col-span-1",
    row: "",
    priority: false,
  },
  {
    id: "tekish",
    name: "Tekish",
    category: "E-Commerce",
    platform: "web",
    live: true,
    stats: [{ label: "GMV / mo", value: "$100K+", type: "revenue" }],
    image: "/assets/projects/tekish/th2.webp",
    bg: "#F2E2CC",
    accent: "#C4713A",
    stores: {},
    col: "lg:col-span-2",
    row: "",
    priority: false,
  },
  {
    id: "techs",
    name: "Techs",
    category: "Enterprise · DevOps",
    platform: "web",
    live: true,
    stats: [{ label: "Scale", value: "M+ Logs/day", type: "scale" }],
    image: "/assets/projects/techs/techs2.png",
    bg: "#E2E6EE",
    accent: "#3B5EA6",
    stores: {},
    col: "lg:col-span-3",
    row: "",
    priority: false,
  },
];

function StatIcon({ type }: { type: StatType }) {
  if (type === "revenue")
    return (
      <svg
        width="10"
        height="10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    );
  if (type === "users")
    return (
      <svg
        width="10"
        height="10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  if (type === "scale")
    return (
      <svg
        width="10"
        height="10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    );
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function PlatformIcon({ platform }: { platform: Platform }) {
  if (platform === "mobile")
    return (
      <svg
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    );
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

export default function BentoWork() {
  return (
    <section className="px-4 sm:px-6 md:px-10 lg:px-16 py-24 bg-white">
      {/* HEADER */}
      <div className="flex flex-col items-center text-center mb-12 max-w-400 mx-auto">
        <p className="text-label uppercase tracking-[0.25em] opacity-30 mb-3 font-medium">
          Selected Work
        </p>
        <h2 className="text-heading font-semibold tracking-tight leading-none">
          Products I&apos;ve Built.
        </h2>
      </div>

      {/* BENTO GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-400 mx-auto lg:auto-rows-[300px]">
        {products.map((p) => (
          <Link
            key={p.id}
            href={`/projects/${p.id}`}
            className={`group relative overflow-hidden rounded-2xl flex flex-col h-75 sm:h-80 lg:h-full ${p.col} ${p.row} shadow-[0_1px_4px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.10)] transition-shadow duration-500`}
            style={{ backgroundColor: p.bg }}
          >
            {/* PAPER TEXTURE */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-45"
              style={{
                backgroundImage: `url("/assets/paper-texture.avif")`,
                backgroundSize: "cover",
              }}
            />
            {/* TOP EDGE HIGHLIGHT */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{ background: "rgba(255,255,255,0.65)" }}
            />

            <div className="relative z-10 flex flex-col h-full p-3 gap-2">
              {/* ── ZONE 1: NAME + CATEGORY ── */}
              <div className="flex items-start justify-between gap-2 px-1 pt-1">
                <div>
                  <p
                    className="text-label uppercase tracking-[0.28em] font-semibold leading-none mb-1.5"
                    style={{ color: "rgba(0,0,0,0.28)" }}
                  >
                    {p.category}
                  </p>
                  <h3
                    className="text-title font-semibold tracking-tight leading-tight"
                    style={{ color: "rgba(0,0,0,0.88)" }}
                  >
                    {p.name}
                  </h3>
                </div>
                {/* Arrow circle */}
                <div
                  className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 mt-0.5"
                  style={{ background: "rgba(0,0,0,0.07)" }}
                >
                  <span
                    className="text-[10px] leading-none transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ color: "rgba(0,0,0,0.35)" }}
                  >
                    ↗
                  </span>
                </div>
              </div>

              {/* ── ZONE 2: PLATFORM ICON · LIVE BADGE · STORE LINKS ── */}
              <div className="flex items-center gap-2 px-1">
                {/* Platform type icon */}
                <span style={{ color: "rgba(0,0,0,0.28)" }}>
                  <PlatformIcon platform={p.platform} />
                </span>

                {/* Live pulse badge */}
                {p.live && (
                  <div
                    className="flex items-center gap-1.5 rounded-full px-2 py-[3px]"
                    style={{ background: "rgba(0,0,0,0.06)" }}
                  >
                    <span className="relative flex w-[6px] h-[6px]">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60" />
                      <span className="relative inline-flex rounded-full w-[6px] h-[6px] bg-emerald-500" />
                    </span>
                    <span
                      className="text-label font-semibold uppercase tracking-[0.18em]"
                      style={{ color: "rgba(0,0,0,0.42)" }}
                    >
                      Live
                    </span>
                  </div>
                )}

                {/* Clickable store badges — stop propagation so outer Link doesn't fire */}
                {p.stores.ios && (
                  <a
                    href={p.stores.ios}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="opacity-22 hover:opacity-55 transition-opacity duration-200"
                  >
                    <img
                      src="/assets/svg/app-store.svg"
                      alt="App Store"
                      className="h-[14px]"
                    />
                  </a>
                )}
                {p.stores.android && (
                  <a
                    href={p.stores.android}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="opacity-22 hover:opacity-55 transition-opacity duration-200"
                  >
                    <img
                      src="/assets/svg/playstore.svg"
                      alt="Play Store"
                      className="h-[14px]"
                    />
                  </a>
                )}
              </div>

              {/* ── ZONE 3: GLASSMORPHISM METRICS BOX ── */}
              <div
                className="backdrop-blur-sm rounded-xl px-3.5 py-2.5 shrink-0"
                style={{
                  background: "rgba(255,255,255,0.60)",
                  border: "1px solid rgba(255,255,255,0.72)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.88), 0 2px 12px rgba(0,0,0,0.055)",
                }}
              >
                <div className="flex">
                  {p.stats.map((stat, i) => (
                    <div
                      key={i}
                      className={`flex-1 ${i > 0 ? "pl-3 ml-3" : ""}`}
                      style={
                        i > 0
                          ? { borderLeft: "1px solid rgba(0,0,0,0.07)" }
                          : {}
                      }
                    >
                      <div className="flex items-center gap-1 mb-[3px]">
                        <span style={{ color: p.accent, opacity: 0.72 }}>
                          <StatIcon type={stat.type} />
                        </span>
                        <span
                          className="text-label uppercase tracking-[0.22em] font-semibold"
                          style={{ color: "rgba(0,0,0,0.30)" }}
                        >
                          {stat.label}
                        </span>
                      </div>
                      <span
                        className="text-body font-semibold tracking-tight leading-none"
                        style={{ color: "rgba(0,0,0,0.84)" }}
                      >
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── ZONE 4: IMAGE ── */}
              <div
                className="relative flex-1 min-h-0 overflow-hidden rounded-xl"
                style={{
                  boxShadow:
                    "inset 0 0 0 1px rgba(0,0,0,0.05), 0 2px 16px rgba(0,0,0,0.09)",
                }}
              >
                <Image
                  src={p.image}
                  alt={`${p.name} — ${p.category}`}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                  priority={p.priority}
                  quality={90}
                  sizes={
                    p.col === "lg:col-span-3"
                      ? "100vw"
                      : p.col === "lg:col-span-2"
                        ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 67vw"
                        : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  }
                />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* MOBILE VIEW ALL */}
      <div className="mt-6 sm:hidden text-center">
        <Link
          href="/projects"
          className="text-label uppercase tracking-[0.2em] opacity-35 hover:opacity-100 transition-opacity duration-300"
        >
          View All Products →
        </Link>
      </div>
    </section>
  );
}
