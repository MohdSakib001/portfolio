// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import Container from "./Container";
// import GridSection from "./GridSection";
// import {
//   ScanLine,
//   MoveHorizontal,
//   Network,
//   Layers,
//   Split,
//   Undo2,
//   Combine,
// } from "lucide-react";

// export const algorithms = [
//   {
//     title: "Sliding Window",
//     description:
//       "Efficient range-based processing technique used to reduce nested iteration into linear time complexity.",
//     icon: ScanLine,
//     color: "bg-blue-300/70",
//   },
//   {
//     title: "Two Pointers",
//     description:
//       "Pointer manipulation strategy for optimized traversal, partitioning, and pair-based computations.",
//     icon: MoveHorizontal,
//     color: "bg-emerald-300/70",
//   },
//   {
//     title: "DFS / BFS",
//     description:
//       "Core graph traversal algorithms powering search, connectivity analysis, and path exploration.",
//     icon: Network,
//     color: "bg-rose-300/70",
//   },
//   {
//     title: "Dynamic Programming",
//     description:
//       "State-transition optimization approach for solving overlapping subproblems efficiently.",
//     icon: Layers,
//     color: "bg-amber-300/70",
//   },
//   {
//     title: "Binary Search",
//     description:
//       "Logarithmic-time searching technique applied across sorted data and answer-space optimization.",
//     icon: Split,
//     color: "bg-cyan-300/70",
//   },
//   {
//     title: "Backtracking",
//     description:
//       "Recursive exploration strategy with pruning for combinatorial and constraint-based problems.",
//     icon: Undo2,
//     color: "bg-fuchsia-300/70",
//   },
//   {
//     title: "Union Find",
//     description:
//       "Disjoint set data structure enabling near constant-time connectivity and component merging.",
//     icon: Combine,
//     color: "bg-indigo-300/70",
//   },
// ];
// export default function CSSection() {
//   return (
//     <>
//       <Container>
//         <section className="">
//           <div className="max-w-4xl mb-32">
//             <h2 className="text-heading leading-none cs-reveal">
//               DATA STRUCTURES & ALGORITHMS
//             </h2>
//             <p className="text-body opacity-70 max-w-xl cs-reveal">
//               From algorithms to distributed systems — trained daily, applied in
//               production.
//             </p>
//           </div>

//           <LeetcodeStats />

//           {/* 🔥 VISUAL + OVERLAY (NO SEPARATE BLOCK) */}
//           {/* <div className="relative h-[200px] mb-40 cs-reveal">

//                 <Image
//                     src="/assets/cs/algorithms.png"
//                     alt="algorithms"
//                     title="algorithms"
//                     fill
//                     className="object-contain opacity-40"
//                 />

//                 <div className="absolute inset-0 flex items-center justify-center">
//                     <p className="max-w-xl text-center text-lg">
//                         Patterns aren’t memorized — they are derived,
//                         optimized, and applied under constraints.
//                     </p>
//                 </div>
//             </div> */}

//           {/* 🔥 SYSTEM DESIGN (STACK + VISUAL MERGE) */}
//           <div className="grid md:grid-cols-2 gap-16 items-center mb-40">
//             <div className="space-y-6">
//               <h3 className="text-4xl cs-reveal">System Design</h3>

//               {[
//                 ["Scalability", "Sharding, CQRS, consistent hashing"],
//                 ["Caching", "Redis, CDN, write strategies"],
//                 ["Messaging", "Kafka, queues, API patterns"],
//                 ["Reliability", "Retries, circuit breakers"],
//               ].map(([t, d], i) => (
//                 <div key={i} className="cs-reveal">
//                   <p className="font-medium">{t}</p>
//                   <p className="text-sm opacity-70">{d}</p>
//                 </div>
//               ))}
//             </div>

//             <div className="relative h-[350px] cs-reveal">
//               <Image
//                 src="/assets/cs/system-design.png"
//                 alt="system"
//                 fill
//                 className="object-contain"
//               />
//             </div>
//           </div>

//           {/* 🔥 SYSTEMS MATRIX (FINAL HIT) */}
//           <div>
//             <h3 className="text-4xl mb-12 cs-reveal">Systems I Can Design</h3>

//             <div className="grid md:grid-cols-3 gap-6">
//               {[
//                 "Twitter / X — fanout, timeline",
//                 "YouTube — pipeline, streaming",
//                 "E-commerce — inventory, payments",
//                 "Realtime Chat — WebSockets",
//                 "URL Shortener — high QPS",
//                 "Search Engine — indexing",
//               ].map((sys, i) => (
//                 <div
//                   key={i}
//                   className="border p-6 cs-reveal hover:bg-black hover:text-white transition"
//                 >
//                   {sys}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       </Container>

//       <GridSection
//         topic="DSA"
//         title="Algorithmic Thinking & Problem Solving"
//         description="Built through consistent problem solving across data structures, graph theory, optimization, recursion, and scalable algorithm design."
//         cards={algorithms}
//       />
//     </>
//   );
// }

// const LeetcodeStats = () => {
//   const [stats, setStats] = useState<any>(null);

//   useEffect(() => {
//     async function loadStats() {
//       const res = await fetch("/api/leetcode");
//       const data = await res.json();

//       setStats(data);
//     }

//     loadStats();
//   }, []);

//   const submissions =
//     stats?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum || [];

//   const all = submissions.find((x: any) => x.difficulty === "All")?.count || 0;

//   const easy =
//     submissions.find((x: any) => x.difficulty === "Easy")?.count || 0;

//   const medium =
//     submissions.find((x: any) => x.difficulty === "Medium")?.count || 0;

//   const hard =
//     submissions.find((x: any) => x.difficulty === "Hard")?.count || 0;

//   const ranking = stats?.data?.matchedUser?.profile?.ranking;

//   const topPercent = ranking
//     ? Math.max(1, Math.floor((ranking / 7000000) * 100))
//     : "--";

//   return (
//     <div className="mb-40 space-y-6 cs-reveal">
//       <div className="flex flex-wrap gap-10 text-2xl">
//         <span>{all}+ Solved</span>

//         <span>Top {topPercent}%</span>
//       </div>

//       <div className="text-sm opacity-60">
//         Easy: {easy}+ / Medium: {medium}+ / Hard: {hard}+
//       </div>
//     </div>
//   );
// };

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Container from "./Container";
import GridSection from "./GridSection";
import BlurContainer from "./BlurContainer";
import {
  ScanLine,
  MoveHorizontal,
  Network,
  Layers,
  Split,
  Undo2,
  Combine,
  Trophy,
  Code2,
  BrainCircuit,
  Target,
  Globe,
  Server,
  Database,
  Zap,
  ArrowRight,
  Activity,
  Cpu,
} from "lucide-react";
import FloatingButton from "./common/floatingButton";
import { LEETCODE_USERNAME } from "@/data/constants";

export const algorithms = [
  {
    title: "Sliding Window",
    description:
      "Efficient range-based processing technique used to reduce nested iteration into linear time complexity.",
    icon: ScanLine,
    color: "bg-blue-300/70",
  },
  {
    title: "Two Pointers",
    description:
      "Pointer manipulation strategy for optimized traversal, partitioning, and pair-based computations.",
    icon: MoveHorizontal,
    color: "bg-emerald-300/70",
  },
  {
    title: "DFS / BFS",
    description:
      "Core graph traversal algorithms powering search, connectivity analysis, and path exploration.",
    icon: Network,
    color: "bg-rose-300/70",
  },
  {
    title: "Dynamic Programming",
    description:
      "State-transition optimization approach for solving overlapping subproblems efficiently.",
    icon: Layers,
    color: "bg-amber-300/70",
  },
  {
    title: "Binary Search",
    description:
      "Logarithmic-time searching technique applied across sorted data and answer-space optimization.",
    icon: Split,
    color: "bg-cyan-300/70",
  },
  {
    title: "Backtracking",
    description:
      "Recursive exploration strategy with pruning for combinatorial and constraint-based problems.",
    icon: Undo2,
    color: "bg-fuchsia-300/70",
  },
  {
    title: "Union Find",
    description:
      "Disjoint set data structure enabling near constant-time connectivity and component merging.",
    icon: Combine,
    color: "bg-indigo-300/70",
  },
];

const SYSTEMS_MATRIX = [
  "Twitter / X — Fanout & Timeline",
  "YouTube — Video Transcoding Pipeline",
  "E-commerce — Distributed Transactions",
  "Realtime Chat — WebSockets & Pub/Sub",
  "URL Shortener — High QPS & Base62",
  "Search Engine — Reverse Indexing",
];

export default function CSSection() {
  return (
    <>
      <Container className="pt-20">
        <section className="flex flex-col gap-32 mb-32">
          {/* 🔥 HERO SECTION */}
          <div className="max-w-4xl text-center mx-auto">
            <h2 className="text-heading font-semibold tracking-tight leading-tight cs-reveal uppercase">
              Data Structures <br /> <span className="text-black/30">&</span>{" "}
              Algorithms.
            </h2>
            <p className="mt-6 text-body text-black/60 max-w-xl mx-auto leading-relaxed cs-reveal">
              From raw algorithmic theory to distributed systems architecture —
              trained daily, optimized continuously, and applied in production
              environments.
            </p>
          </div>

          <div className="space-y-8">
            <LeetcodeStats />

            <FloatingButton
              href={`https://leetcode.com/${LEETCODE_USERNAME}/`}
              title="Visit Leetcode"
            />
          </div>

          <div className="bg-violet-300/70 relative z-10 rounded-4xl p-8 md:p-14 overflow-hidden cs-reveal">
            {/* Paper Texture Overlay */}
            <div className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-45">
              <Image
                src="/assets/paper-texture.avif"
                alt="texture"
                fill
                quality={60}
                className="object-cover"
              />
            </div>

            <div className="relative z-10 flex flex-col xl:flex-row gap-16 items-center">
              {/* Text Side */}
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/30 border border-white/20 text-label font-medium mb-2">
                  <Activity size={14} />
                  Architecture
                </div>
                <h3 className="text-4xl font-semibold tracking-tight leading-tight max-w-md">
                  Designing for Scale & Fault Tolerance.
                </h3>
                <p className="text-body text-black/70 leading-relaxed max-w-md">
                  Systems built to survive peak loads. Leveraging consistent
                  hashing, aggressive caching layers, message queues, and
                  asynchronous workers to prevent bottlenecks and eliminate
                  single points of failure.
                </p>

                {/* Matrix Pills */}
                <div className="pt-6">
                  <p className="text-label font-medium text-black/50 uppercase tracking-wider mb-4">
                    Architectural Blueprints
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SYSTEMS_MATRIX.map((sys, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 rounded-full text-caption bg-white/40 border border-white/30 shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-black/90 font-medium whitespace-nowrap transition-transform hover:-translate-y-0.5 cursor-default"
                      >
                        {sys}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* SaaS Working Flow Diagram Side */}
              <div className="flex-[1.2] w-full">
                <SaaSArchitectureFlow />
              </div>
            </div>
          </div>
        </section>
      </Container>

      {/* 🔥 DSA GRID SECTION */}
      <GridSection
        topic="DSA"
        title="Algorithmic Thinking"
        description="Built through consistent problem solving across data structures, graph theory, optimization, recursion, and scalable algorithm design."
        cards={algorithms}
      />
    </>
  );
}

// ----------------------------------------------------------------------
// SUB-COMPONENTS
// ----------------------------------------------------------------------

const LeetcodeStats = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/api/leetcode");

        if (!res.ok) {
          console.error("API error:", res.status);
          return;
        }

        const data = await res.json();
        console.log("Data => ", data);
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch LeetCode stats", error);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 cs-reveal">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-32 bg-black/5 animate-pulse rounded-3xl border border-black/5"
          />
        ))}
      </div>
    );
  }
  const all = stats?.solvedProblem || 0;
  const easy = stats?.easySolved || 0;
  const medium = stats?.mediumSolved || 0;
  const hard = stats?.hardSolved || 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 cs-reveal">
      {/* Total Card */}
      <div className="p-6 rounded-3xl bg-blue-50 border border-blue-100/50 flex flex-col justify-between">
        <div className="flex items-center gap-2 text-blue-600/80 mb-6">
          <Code2 size={16} />
          <span className="text-label font-medium uppercase tracking-wider">
            Total Solved
          </span>
        </div>
        <div>
          <span className="text-4xl font-semibold text-blue-950 tracking-tighter">
            {all}
          </span>
        </div>
      </div>

      {/* Easy Card */}
      <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-100/50 flex flex-col justify-between">
        <div className="flex items-center gap-2 text-emerald-600/80 mb-6">
          <Target size={16} />
          <span className="text-label font-medium uppercase tracking-wider">
            Easy
          </span>
        </div>
        <div>
          <span className="text-4xl font-semibold text-emerald-950 tracking-tighter">
            {easy}
          </span>
        </div>
      </div>

      {/* Medium Card */}
      <div className="p-6 rounded-3xl bg-amber-50 border border-amber-100/50 flex flex-col justify-between">
        <div className="flex items-center gap-2 text-amber-600/80 mb-6">
          <Cpu size={16} />
          <span className="text-label font-medium uppercase tracking-wider">
            Medium
          </span>
        </div>
        <div>
          <span className="text-4xl font-semibold text-amber-950 tracking-tighter">
            {medium}
          </span>
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-red-50 border border-red-100/50 flex flex-col justify-between">
        <div className="flex items-center gap-2 text-red-600/80 mb-6">
          <Cpu size={16} />
          <span className="text-label font-medium uppercase tracking-wider">
            Hard
          </span>
        </div>
        <div>
          <span className="text-4xl font-semibold text-red-950 tracking-tighter">
            {hard}
          </span>
        </div>
      </div>
    </div>
  );
};

const SaaSArchitectureFlow = () => {
  return (
    <div className="relative w-full h-[320px] bg-white/20 rounded-3xl border border-white/30 backdrop-blur-sm p-6 flex items-center justify-between shadow-sm">
      {/* 1. Client Layer */}
      <div className="flex flex-col items-center gap-3 relative z-10">
        <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-white/50 flex items-center justify-center text-black/70">
          <Globe size={24} strokeWidth={1.5} />
        </div>
        <span className="text-caption font-medium text-black/60">Clients</span>
      </div>

      {/* Arrow */}
      <ArrowRight size={20} className="text-black/30" />

      {/* 2. Load Balancer / API Gateway */}
      <div className="flex flex-col items-center gap-3 relative z-10">
        <div className="w-16 h-16 bg-blue-400/20 rounded-2xl border border-blue-400/30 flex items-center justify-center text-blue-900 relative">
          <Server size={28} strokeWidth={1.5} />
          {/* Animated ping to show activity */}
          <span className="absolute top-0 right-0 w-3 h-3 bg-blue-500 rounded-full animate-ping opacity-75" />
          <span className="absolute top-0 right-0 w-3 h-3 bg-blue-500 rounded-full" />
        </div>
        <span className="text-caption font-medium text-black/60">
          Load Balancer
        </span>
      </div>

      {/* Dashed Connecting Lines (CSS based) */}
      <div
        className="flex flex-col justify-center h-full w-12 border-y border-r border-dashed border-black/20 rounded-r-xl opacity-50 ml-2 relative"
        style={{ height: "180px" }}
      >
        <div className="absolute top-1/2 -left-4 w-4 border-t border-dashed border-black/20" />
      </div>

      {/* 3. Services Stack (Cache, Queue, DB) */}
      <div className="flex flex-col gap-6 relative z-10">
        {/* Cache Layer */}
        <div className="flex items-center gap-4 bg-white/50 border border-white/50 pl-2 pr-4 py-2 rounded-xl shadow-sm">
          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-700">
            <Zap size={18} />
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-semibold text-black">
              Redis Cache
            </span>
            <span className="text-[11px] text-black/50 font-medium">
              Sub-ms reads
            </span>
          </div>
        </div>

        {/* Async Queue Layer */}
        <div className="flex items-center gap-4 bg-white/50 border border-white/50 pl-2 pr-4 py-2 rounded-xl shadow-sm">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-700">
            <Layers size={18} />
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-semibold text-black">
              Kafka Queue
            </span>
            <span className="text-[11px] text-black/50 font-medium">
              Event streaming
            </span>
          </div>
        </div>

        {/* Database Layer */}
        <div className="flex items-center gap-4 bg-white/50 border border-white/50 pl-2 pr-4 py-2 rounded-xl shadow-sm">
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-700">
            <Database size={18} />
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-semibold text-black">
              PostgreSQL
            </span>
            <span className="text-[11px] text-black/50 font-medium">
              Primary Shards
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
