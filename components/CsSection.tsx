"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Container from "./Container";
import GridSection from "./GridSection";

export const algorithms = [
  {
    title: "Sliding Window",
    description:
      "Efficient range-based processing technique used to reduce nested iteration into linear time complexity.",
  },

  {
    title: "Two Pointers",
    description:
      "Pointer manipulation strategy for optimized traversal, partitioning, and pair-based computations.",
  },

  {
    title: "DFS / BFS",
    description:
      "Core graph traversal algorithms powering search, connectivity analysis, and path exploration.",
  },

  {
    title: "Dynamic Programming",
    description:
      "State-transition optimization approach for solving overlapping subproblems efficiently.",
  },

  {
    title: "Binary Search",
    description:
      "Logarithmic-time searching technique applied across sorted data and answer-space optimization.",
  },

  {
    title: "Backtracking",
    description:
      "Recursive exploration strategy with pruning for combinatorial and constraint-based problems.",
  },

  {
    title: "Union Find",
    description:
      "Disjoint set data structure enabling near constant-time connectivity and component merging.",
  },
];

export default function CSSection() {
  return (
    <>
      <Container>
        <section className="">
          <div className="max-w-4xl mb-32">
            <h2 className="text-heading leading-none cs-reveal">
              DATA STRUCTURES & ALGORITHMS
            </h2>
            <p className="text-body opacity-70 max-w-xl cs-reveal">
              From algorithms to distributed systems — trained daily, applied in
              production.
            </p>
          </div>

          <LeetcodeStats />

          {/* 🔥 VISUAL + OVERLAY (NO SEPARATE BLOCK) */}
          {/* <div className="relative h-[200px] mb-40 cs-reveal">

                <Image
                    src="/assets/cs/algorithms.png"
                    alt="algorithms"
                    title="algorithms"
                    fill
                    className="object-contain opacity-40"
                />

                <div className="absolute inset-0 flex items-center justify-center">
                    <p className="max-w-xl text-center text-lg">
                        Patterns aren’t memorized — they are derived,
                        optimized, and applied under constraints.
                    </p>
                </div>
            </div> */}

          {/* 🔥 SYSTEM DESIGN (STACK + VISUAL MERGE) */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-40">
            <div className="space-y-6">
              <h3 className="text-4xl cs-reveal">System Design</h3>

              {[
                ["Scalability", "Sharding, CQRS, consistent hashing"],
                ["Caching", "Redis, CDN, write strategies"],
                ["Messaging", "Kafka, queues, API patterns"],
                ["Reliability", "Retries, circuit breakers"],
              ].map(([t, d], i) => (
                <div key={i} className="cs-reveal">
                  <p className="font-medium">{t}</p>
                  <p className="text-sm opacity-70">{d}</p>
                </div>
              ))}
            </div>

            <div className="relative h-[350px] cs-reveal">
              <Image
                src="/assets/cs/system-design.png"
                alt="system"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* 🔥 SYSTEMS MATRIX (FINAL HIT) */}
          <div>
            <h3 className="text-4xl mb-12 cs-reveal">Systems I Can Design</h3>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                "Twitter / X — fanout, timeline",
                "YouTube — pipeline, streaming",
                "E-commerce — inventory, payments",
                "Realtime Chat — WebSockets",
                "URL Shortener — high QPS",
                "Search Engine — indexing",
              ].map((sys, i) => (
                <div
                  key={i}
                  className="border p-6 cs-reveal hover:bg-black hover:text-white transition"
                >
                  {sys}
                </div>
              ))}
            </div>
          </div>
        </section>
      </Container>

      <GridSection
        topic="DSA"
        title="Algorithmic Thinking & Problem Solving"
        description="Built through consistent problem solving across data structures, graph theory, optimization, recursion, and scalable algorithm design."
        cards={algorithms}
      />
    </>
  );
}

const LeetcodeStats = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    async function loadStats() {
      const res = await fetch("/api/leetcode");
      const data = await res.json();

      setStats(data);
    }

    loadStats();
  }, []);

  const submissions =
    stats?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum || [];

  const all = submissions.find((x: any) => x.difficulty === "All")?.count || 0;

  const easy =
    submissions.find((x: any) => x.difficulty === "Easy")?.count || 0;

  const medium =
    submissions.find((x: any) => x.difficulty === "Medium")?.count || 0;

  const hard =
    submissions.find((x: any) => x.difficulty === "Hard")?.count || 0;

  const ranking = stats?.data?.matchedUser?.profile?.ranking;

  const topPercent = ranking
    ? Math.max(1, Math.floor((ranking / 7000000) * 100))
    : "--";

  return (
    <div className="mb-40 space-y-6 cs-reveal">
      <div className="flex flex-wrap gap-10 text-2xl">
        <span>{all}+ Solved</span>

        <span>Top {topPercent}%</span>
      </div>

      <div className="text-sm opacity-60">
        Easy: {easy}+ / Medium: {medium}+ / Hard: {hard}+
      </div>
    </div>
  );
};
