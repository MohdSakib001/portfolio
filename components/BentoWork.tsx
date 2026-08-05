"use client";

import Image from "next/image";
import Link from "next/link";
import Icon from "./icon";
import BlurContainer from "./BlurContainer";
import AnimatedImage from "./AnimatedImage";
import Container from "./Container";
import FloatingButton from "./common/floatingButton";
import { getProjectTheme } from "@/data/projectTheme";

type StatType = "revenue" | "users" | "scale" | "clients";
type Stat = { label: string; value: string; type: StatType };

const products: {
  id: string;
  name: string;
  category: string;
  live: boolean;
  stats: Stat[];
  image?: string;
  stores: { ios?: string; android?: string; web?: string };
  col: string;
  row: string;
  priority: boolean;
  featuredComponent?: React.ReactNode;
}[] = [
  {
    id: "voizo",
    name: "Voizo",
    category: "Social · Real-Time Audio",
    live: true,
    stats: [
      { label: "Downloads", value: "50K+", type: "users" },
      { label: "Languages", value: "5 Languages", type: "scale" },
    ],
    stores: {
      ios: "https://apps.apple.com/in/app/voizo-talk-and-make-friends/id6670317708",
      android: "https://play.google.com/store/apps/details?id=com.speak_a_mind",
      web: "https://www.voizo.app",
    },
    col: "lg:col-span-1",
    row: "lg:row-span-2",
    priority: true,
    featuredComponent: (
      <div className="relative w-full h-full flex items-end justify-center m-6">
        <div className="absolute bottom-[-70%] sm:bottom-[-55%] left-1/2 z-10 -translate-x-[90%] -rotate-12 transition-all duration-300 ease-out hover:bottom-[-40%]">
          <Image
            src="/assets/projects/voizo/3.webp"
            alt="Voizo"
            width={240}
            height={500}
            sizes="(max-width: 640px) 160px, (max-width: 1024px) 180px, 200px"
            className="w-40 sm:w-45 lg:w-50 h-auto rounded-xl"
          />
        </div>

        <div className="absolute bottom-[-60%] sm:bottom-[-50%] md:bottom-[-55%] left-1/2 z-20 -translate-x-[10%] rotate-12 transition-all duration-300 ease-out hover:bottom-[-40%]">
          <Image
            src="/assets/projects/voizo/1.webp"
            alt="Voizo"
            width={240}
            height={500}
            sizes="(max-width: 640px) 160px, (max-width: 1024px) 180px, 200px"
            className="w-40 sm:w-45 lg:w-50 h-auto rounded-xl"
          />
        </div>
      </div>
    ),
  },
  {
    id: "artificialmufti",
    name: "Artificial Mufti",
    category: "AI · Islamic Tech",
    live: true,
    stats: [
      { label: "Userbase", value: "500+ MAU", type: "users" },
      { label: "Userbase", value: "100+ Downloads", type: "users" },
    ],
    // image: "/assets/projects/artificialmufti/1.png",
    stores: { ios: "#", android: "#", web: "https://www.artificialmufti.com" },
    col: "lg:col-span-1",
    row: "lg:row-span-2",
    priority: true,
    featuredComponent: (
      <div className="relative w-full h-full flex items-end justify-center m-6">
        <div className="absolute bottom-[-70%] sm:bottom-[-55%] left-1/2 z-10 -translate-x-[90%] -rotate-12 transition-all duration-300 ease-out hover:bottom-[-40%]">
          <Image
            src="/assets/projects/artificialmufti/2.png"
            alt="Artificial Mufti"
            width={240}
            height={500}
            sizes="(max-width: 640px) 160px, (max-width: 1024px) 180px, 200px"
            className="w-40 sm:w-45 lg:w-50 h-auto rounded-xl"
          />
        </div>

        <div className="absolute bottom-[-60%] sm:bottom-[-50%] md:bottom-[-55%] left-1/2 z-20 -translate-x-[10%] rotate-12 transition-all duration-300 ease-out hover:bottom-[-40%]">
          <Image
            src="/assets/projects/artificialmufti/1.png"
            alt="Artificial Mufti"
            width={240}
            height={500}
            sizes="(max-width: 640px) 160px, (max-width: 1024px) 180px, 200px"
            className="w-40 sm:w-45 lg:w-50 h-auto rounded-xl"
          />
        </div>
      </div>
    ),
  },
  {
    id: "pademi",
    name: "Pademi",
    category: "EdTech",
    live: true,
    stats: [{ label: "Students", value: "25K+", type: "users" }],
    stores: { ios: "#", web: "https://pademi.io" },
    col: "lg:col-span-1",
    row: "lg:row-span-2",
    priority: true,
    featuredComponent: (
      <div className="relative w-full h-full flex items-end justify-center m-6">
        <div className="absolute bottom-[-70%] sm:bottom-[-55%] left-1/2 z-10 -translate-x-[90%] -rotate-12 transition-all duration-300 ease-out hover:bottom-[-40%]">
          <Image
            src="/assets/projects/pademi/pademi2.webp"
            alt="Pademi"
            width={240}
            height={500}
            sizes="(max-width: 640px) 160px, (max-width: 1024px) 180px, 200px"
            className="w-40 sm:w-45 lg:w-50 h-auto rounded-xl"
          />
        </div>

        <div className="absolute bottom-[-60%] sm:bottom-[-50%] md:bottom-[-55%] left-1/2 z-20 -translate-x-[10%] rotate-12 transition-all duration-300 ease-out hover:bottom-[-40%]">
          <Image
            src="/assets/projects/pademi/pademi1.webp"
            alt="Pademi"
            width={240}
            height={500}
            sizes="(max-width: 640px) 160px, (max-width: 1024px) 180px, 200px"
            className="w-40 sm:w-45 lg:w-50 h-auto rounded-xl"
          />
        </div>
      </div>
    ),
  },
  {
    id: "stakeclash",
    name: "StakeClash",
    category: "Gaming · FinTech",
    live: true,
    stats: [
      { label: "Revenue", value: "$12K MRR", type: "revenue" },
      { label: "Userbase", value: "1K+ MAU", type: "users" },
    ],
    stores: { web: "https://app.stakeclash.com" },
    col: "lg:col-span-2",
    row: "lg:row-span-2",
    priority: true,
    featuredComponent: (
      <section className="bg-[#000518] -z-10 rounded-xl overflow-hidden">
        <div className="bg-[#7700FF] blur-[150px] w-50 h-50 absolute -z-10 opacity-50" />

        <div className="relative rounded-lg z-10 grid grid-cols-1 md:grid-cols-2 items-center ">
          <div className="absolute inset-0 -z-10 opacity-10">
            <img
              className="w-full h-full md:h-75 object-cover rounded-lg"
              src="/assets/projects/stakeclash/herobg.webp"
              alt="Hero Background"
            />
          </div>

          <div className="flex flex-col gap-y-4 p-4 text-white">
            <h1 className="text-title font-semibold">
              Back Yourself and Get Paid.
            </h1>
            <p className="text-caption">
              Challenge friends in skill-based games, lock in the stakes, and
              let the winner get paid automatically.
            </p>

            <div className="flex items-center gap-3">
              <Link
                href="https://app.stakeclash.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Stakeclash"
                className="text-label px-6 w-fit py-2 z-20 bg-white text-purple-800 font-semibold rounded-xl shadow-md hover:bg-gray-200 transition"
              >
                Join Now
              </Link>
              <div className="flex items-center gap-2">
                <Image
                  src="/assets/svg/solana.svg"
                  alt="Solana Logo"
                  width={24}
                  height={24}
                />
                <span className="text-label text-white font-bold">
                  Powered by Solana Blockchain
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-center h-60">
            <AnimatedImage
              style="items-end"
              url="/assets/projects/stakeclash/klaj.webp"
            />
          </div>
        </div>
      </section>
    ),
  },
  {
    id: "sendora",
    name: "Sendora",
    category: "FinTech",
    live: true,
    stats: [{ label: "Processed", value: "$50K+", type: "revenue" }],
    image: "/assets/projects/sendora/sendora1.webp",
    stores: { web: "https://www.sendora.com" },
    col: "lg:col-span-1",
    row: "lg:row-span-2",
    priority: false,
    featuredComponent: (
      <Image
        src={"/assets/projects/sendora/sendora1.webp"}
        alt={"CoLaw LegalTech"}
        fill
        className="object-contain object-center rounded-xl"
        priority={false}
        quality={90}
        sizes={"(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
      />
    ),
  },
];

export default function BentoWork() {
  return (
    <Container>
      <div className="flex flex-col items-center text-center mb-12 max-w-400 mx-auto">
        <p className="text-label uppercase tracking-[0.25em] opacity-30 mb-3 font-medium">
          Selected Work
        </p>
        <h2 className="text-heading font-semibold tracking-tight leading-none">
          Products I&apos;ve Built.
        </h2>
      </div>

      {/* BENTO GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-400 mx-auto lg:auto-rows-[min-h[300px]]">
        {products.map((p) => (
          <div
            key={p.id}
            className={`group relative overflow-hidden rounded-2xl flex flex-col min-h-75 sm:min-h-80 lg:min-h-full ${p.col} ${p.row} `}
            style={{ backgroundColor: getProjectTheme(p.id).bg }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-45"
              style={{
                backgroundImage: `url("/assets/paper-texture.avif")`,
                backgroundSize: "cover",
              }}
            />

            <div className="relative z-10 flex flex-col h-full p-4 gap-4">
              <Link
                href={`/projects/${p.id}`}
                title={p.name}
                className=" w-7 h-7 rounded-full flex items-center justify-center self-end p-4 bg-white"
              >
                <span className="text-body leading-none">↗</span>
              </Link>

              <div className="flex items-start justify-between gap-2 px-1 pt-1">
                <h3 className="text-title font-semibold tracking-tight leading-tight">
                  {p.name}
                </h3>
              </div>

              <div className="flex gap-x-4">
                <BlurContainer className="rounded-xl p-4 shrink-0 flex-1">
                  <p className="text-body font-semibold">Mertices</p>
                  <div className="flex items-center flex-wrap mt-4 gap-x-2">
                    {p.stats.map((stat, i) => (
                      <div key={i} className={`flex-1`}>
                        <span className="text-body font-semibold tracking-tight leading-none">
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </BlurContainer>

                <BlurContainer className="rounded-xl p-4 shrink-0 flex-1">
                  <p className="text-body font-semibold">Available On</p>
                  <div className="flex items-center flex-wrap gap-2 mt-4">
                    {p.stores.ios && (
                      <Icon
                        href={p.stores.ios}
                        title={"Appstore"}
                        type="img"
                        img="/assets/svg/app-store.svg"
                      />
                    )}
                    {p.stores.android && (
                      <Icon
                        href={p.stores.android}
                        title={"Playstore"}
                        type="img"
                        img="/assets/svg/playstore.svg"
                      />
                    )}
                    {p.stores.web && (
                      <Icon
                        href={p.stores.web}
                        title={"Web App"}
                        type="img"
                        img="/assets/svg/chrome.svg"
                      />
                    )}
                  </div>
                </BlurContainer>
              </div>

              <div className="relative w-full flex min-h-60 items-end">
                {p.featuredComponent}
              </div>
            </div>
          </div>
        ))}
      </div>

      <FloatingButton href="/projects" title="All projects" />
    </Container>
  );
}
