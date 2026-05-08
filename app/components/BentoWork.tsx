import Image from "next/image";
import Link from "next/link";

const products = [
  {
    id: "stakeclash",
    name: "StakeClash",
    category: "Gaming · FinTech",
    metric: "$12K MRR · 1K+ MAU",
    image: "/assets/projects/stakeclash/stakeclash2.webp",
    bg: "#F0EBFF",
    border: "#C9B8FD",
    stores: ["appstore", "playstore"],
    col: "lg:col-span-2",
    row: "lg:row-span-2",
    priority: true,
    imageH: "55%", // ← adjust this
  },
  {
    id: "artificialmufti",
    name: "Artificial Mufti",
    category: "AI · Islamic Tech",
    metric: "200+ Daily Active Users",
    image: "/assets/projects/artificialmufti/1.png",
    bg: "#FFF8E1",
    border: "#F0DFA0",
    stores: ["appstore", "playstore"],
    col: "lg:col-span-1",
    row: "lg:row-span-2",
    priority: true,
    imageH: "65%", // ← adjust this
  },
  {
    id: "pademi",
    name: "Pademi",
    category: "EdTech",
    metric: "25K+ Students",
    image: "/assets/projects/pademi/pademi6.webp",
    bg: "#F0FDF4",
    border: "#B6EFC6",
    stores: ["appstore", "playstore"],
    col: "lg:col-span-1",
    row: "",
    priority: false,
  },
  {
    id: "sendora",
    name: "Sendora",
    category: "FinTech",
    metric: "$50K+ Processed",
    image: "/assets/projects/sendora/sendora1.webp",
    bg: "#EFF6FF",
    border: "#BCD8FB",
    stores: ["appstore", "playstore"],
    col: "lg:col-span-1",
    row: "",
    priority: false,
  },
  {
    id: "colaw",
    name: "CoLaw",
    category: "LegalTech",
    metric: "200+ Law Firms",
    image: "/assets/projects/colaw/colaw1.webp",
    bg: "#F8F7F4",
    border: "#D8D4CB",
    stores: [],
    col: "lg:col-span-1",
    row: "",
    priority: false,
  },
  {
    id: "tekish",
    name: "Tekish",
    category: "E-Commerce",
    metric: "$100K+ GMV / month",
    image: "/assets/projects/tekish/th2.webp",
    bg: "#FFF4EC",
    border: "#F8D4B0",
    stores: [],
    col: "lg:col-span-2",
    row: "",
    priority: false,
  },
  {
    id: "teppe",
    name: "Teppe",
    category: "PropTech",
    metric: "15K+ Active Tenants",
    image: "/assets/projects/teppe/teppe1.webp",
    bg: "#F0FDFA",
    border: "#A8EEE0",
    stores: ["appstore", "playstore"],
    col: "lg:col-span-1",
    row: "",
    priority: false,
  },
  {
    id: "techs",
    name: "Techs",
    category: "Enterprise · DevOps",
    metric: "Millions of Logs / Day",
    image: "/assets/projects/techs/techs2.png",
    bg: "#F4F6F9",
    border: "#C4CBD8",
    stores: [],
    col: "lg:col-span-3",
    row: "",
    priority: false,
  },
];

export default function BentoWork() {
  return (
    <section className="px-4 sm:px-6 md:px-10 lg:px-16 py-24 bg-white">
      {/* HEADER */}
      <div className="flex flex-col items-center text-center mb-12 max-w-400 mx-auto">
        <p className="text-[10px] uppercase tracking-[0.25em] opacity-30 mb-3 font-medium">
          Selected Work
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-none">
          Products I&apos;ve Built.
        </h2>
      </div>

      {/* BENTO GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-400 mx-auto lg:auto-rows-[300px]">
        {products.map((p) => (
          <Link
            key={p.id}
            href={`/projects/${p.id}`}
            className={`group relative overflow-hidden rounded-2xl flex flex-col justify-between h-75 sm:h-80 lg:h-full ${p.col} ${p.row}`}
            style={{ backgroundColor: p.bg }}
          >
            {/* ARROW */}
            <span className="absolute top-5 right-5 z-10 text-black/20 group-hover:text-black/55 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 text-base leading-none">
              ↗
            </span>

            {/* TEXT ZONE */}
            <div className="flex flex-col items-center text-center pt-8 pb-4 px-6 shrink-0">
              <h3 className="text-4xl font-semibold text-black/80 tracking-tight leading-tight">
                {p.name}
              </h3>
              {p.stores.length > 0 && (
                <div className="flex items-center gap-2.5 mt-3">
                  {p.stores.includes("appstore") && (
                    <img
                      src="/assets/svg/app-store.svg"
                      alt="App Store"
                      className="h-3.25 opacity-30"
                    />
                  )}
                  {p.stores.includes("playstore") && (
                    <img
                      src="/assets/svg/playstore.svg"
                      alt="Play Store"
                      className="h-3.25 opacity-30"
                    />
                  )}
                </div>
              )}
            </div>

            {/* IMAGE ZONE */}
            {p.imageH ? (
              /* StakeClash & Artificial Mufti — full width, no side crop, adjustable height */
              <div
                className="overflow-hidden w-full shrink-0"
                style={{ height: p.imageH }}
              >
                <Image
                  src={p.image}
                  alt={`${p.name} — ${p.category}`}
                  width={0}
                  height={0}
                  priority={p.priority}
                  quality={90}
                  sizes={
                    p.col === "lg:col-span-2"
                      ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 67vw"
                      : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  }
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
            ) : (
              /* All other cards — flex-1 zone, fills remaining height, cuts from bottom */
              <div className="relative flex-1 min-h-0 overflow-hidden">
                <Image
                  src={p.image}
                  alt={`${p.name} — ${p.category}`}
                  fill
                  className="object-cover object-top"
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
            )}
          </Link>
        ))}
      </div>

      {/* MOBILE VIEW ALL */}
      <div className="mt-6 sm:hidden text-center">
        <Link
          href="/projects"
          className="text-[11px] uppercase tracking-[0.2em] opacity-35 hover:opacity-100 transition-opacity duration-300"
        >
          View All Products →
        </Link>
      </div>
    </section>
  );
}
