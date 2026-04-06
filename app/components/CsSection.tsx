"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function CSSection() {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.set(".cs-reveal", { y: 60, opacity: 0 });

        ScrollTrigger.batch(".cs-reveal", {
            start: "top 85%",
            onEnter: (batch) => {
                gsap.to(batch, {
                    y: 0,
                    opacity: 1,
                    stagger: 0.06,
                    duration: 1,
                    ease: "power4.out",
                });
            },
            once: true,
        });
    }, { scope: ref });

    return (
        <section ref={ref} className="px-6 md:px-16 py-32 border-t">

            {/* HEADER */}
            <div className="max-w-4xl mb-32">
                <h2 className="text-[10vw] leading-none cs-reveal">CS</h2>
                <p className="text-xl opacity-70 max-w-xl cs-reveal">
                    From algorithms to distributed systems — trained daily, applied in production.
                </p>
            </div>

            {/* 🔥 DATA WALL (DENSE, NOT GRID) */}
            <div className="mb-40 space-y-6 cs-reveal">
                <div className="flex flex-wrap gap-10 text-2xl">
                    <span>450+ Solved</span>
                    <span>320+ Streak</span>
                    <span>82% Accuracy</span>
                    <span>Top 5%</span>
                    <span>Rating 1890</span>
                </div>

                <div className="text-sm opacity-60">
                    Easy: 180 / Medium: 210 / Hard: 60
                </div>
            </div>

            {/* 🔥 HORIZONTAL ALGO FLOW */}
            <div className="mb-40 overflow-x-auto">
                <div className="flex gap-16 w-max">

                    {[
                        ["Sliding Window", "O(n) over O(n²)"],
                        ["Two Pointers", "Linear scan optimizations"],
                        ["DFS / BFS", "Graph traversal backbone"],
                        ["Dynamic Programming", "State optimization"],
                        ["Binary Search", "Search on answer space"],
                        ["Backtracking", "Combinatorial pruning"],
                        ["Union Find", "Near O(1) connectivity"],
                    ].map(([title, desc], i) => (
                        <div
                            key={i}
                            className="min-w-[240px] border p-6 cs-reveal hover:bg-black hover:text-white transition "
                        >
                            <h4 className="mb-2 text-base font-medium">{title}</h4>
                            <p className="text-sm opacity-70">{desc}</p>
                        </div>
                    ))}

                </div>
            </div>

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
                <h3 className="text-4xl mb-12 cs-reveal">
                    Systems I Can Design
                </h3>

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

        </section >
    );
}