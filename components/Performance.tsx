"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Performance() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // General reveal
      gsap.set(".perf-reveal", { y: 60, opacity: 0 });
      ScrollTrigger.batch(".perf-reveal", {
        start: "top 85%",
        onEnter: (batch) => {
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 1.2,
            ease: "power4.out",
          });
        },
        once: true,
      });

      // Number Counter Animation
      if (scoreRef.current) {
        gsap.to(scoreRef.current, {
          scrollTrigger: {
            trigger: scoreRef.current,
            start: "top 85%",
            once: true,
          },
          innerHTML: 98,
          duration: 2.5,
          snap: { innerHTML: 1 },
          ease: "expo.out",
        });

        // SVG Circular Progress
        gsap.fromTo(
          ".score-circle",
          { strokeDasharray: "0, 1000" },
          {
            scrollTrigger: {
              trigger: scoreRef.current,
              start: "top 85%",
              once: true,
            },
            strokeDasharray: "280, 1000", // roughly 98% of circumference
            duration: 2.5,
            ease: "expo.out",
          },
        );
      }

      // Metric Bars Fill Animation
      gsap.fromTo(
        ".metric-fill",
        { scaleX: 0 },
        {
          scrollTrigger: {
            trigger: ".metrics-wrapper",
            start: "top 80%",
            once: true,
          },
          scaleX: 1,
          stagger: 0.15,
          duration: 1.5,
          ease: "power3.out",
          transformOrigin: "left center",
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const vitals = [
    {
      label: "LCP",
      value: "1.2s",
      target: "<2.5s",
      pct: "90%",
      impact:
        "1s delay in page load = 7% drop in conversions. At 1.2s, checkout flows stay frictionless.",
    },
    {
      label: "CLS",
      value: "0.01",
      target: "<0.1",
      pct: "95%",
      impact:
        "Zero layout shift during load means users never misclick. Critical for e-commerce CTAs and form inputs.",
    },
    {
      label: "INP",
      value: "38ms",
      target: "<200ms",
      pct: "85%",
      impact:
        "Inputs feel instant. At 38ms users perceive zero lag — the threshold for 'feels native'.",
    },
    {
      label: "FCP",
      value: "0.6s",
      target: "<1.8s",
      pct: "92%",
      impact:
        "Content visible in 0.6s keeps bounce rate low. Users see something before they can even lift their finger.",
    },
  ];

  const comparisons = [
    {
      label: "Largest Contentful Paint",
      before: "4.8s",
      after: "1.2s",
      diff: "75%",
      color: "bg-emerald-500",
    },
    {
      label: "Interaction to Next Paint",
      before: "380ms",
      after: "38ms",
      diff: "90%",
      color: "bg-emerald-500",
    },
    {
      label: "Total Bundle Size",
      before: "1.8MB",
      after: "210KB",
      diff: "88%",
      color: "bg-blue-500",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="px-6 md:px-16 py-32 border-t border-black/10 bg-[#0a0a0a] text-white overflow-hidden relative"
    >
      {/* BACKGROUND GRID */}
      <div
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="max-w-3xl mb-24 md:mb-40">
          <h2 className="text-heading tracking-tighter mb-8 perf-reveal">
            Zero Tolerance <br /> For Latency.
          </h2>
          <p className="text-body opacity-60 leading-relaxed font-light perf-reveal max-w-xl">
            I don’t merely build accessible UIs — I instrument, measure, and
            surgically optimize every millisecond of the execution thread. Real
            scores. Real impact.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 mb-40">
          {/* LEFT COLUMN: The 98 Score */}
          <div className="lg:col-span-5 flex flex-col items-start justify-center perf-reveal">
            <div className="relative flex items-center justify-center w-64 h-64 md:w-80 md:h-80 mb-6 group">
              {/* SVG Ring Background */}
              <svg className="absolute inset-0 w-full h-full transform -rotate-90 pointer-events-none">
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  className="stroke-white/10"
                  strokeWidth="2"
                  fill="none"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  className="score-circle stroke-emerald-500 transition-all duration-1000 ease-out"
                  strokeWidth="2"
                  fill="none"
                  pathLength="100"
                  strokeDasharray="98 100"
                  strokeDashoffset="0"
                  strokeLinecap="round"
                />
              </svg>

              <div className="text-center">
                <span
                  className="text-[120px] md:text-[150px] font-bold leading-none tracking-tighter text-white"
                  ref={scoreRef}
                >
                  0
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-2xl mb-2">Lighthouse Performance</h3>
              <p className="opacity-50 max-w-sm">
                Average auditing score across production environments, factoring
                in edge caching and asset optimization.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Core Web Vitals */}
          <div className="lg:col-span-7 flex flex-col justify-center metrics-wrapper">
            <h4 className="text-label uppercase tracking-[0.2em] opacity-40 mb-10 perf-reveal">
              Core Web Vitals
            </h4>

            <div className="space-y-10">
              {vitals.map((metric, i) => (
                <div key={i} className="perf-reveal">
                  <div className="flex justify-between items-end mb-3">
                    <div className="flex items-baseline gap-3">
                      <span className="text-title tracking-tight">
                        {metric.label}
                      </span>
                      <span className="text-caption font-mono opacity-60">
                        Target: {metric.target}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-title font-light text-emerald-400">
                        {metric.value}
                      </span>
                    </div>
                  </div>

                  {/* Progress track */}
                  <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="metric-fill h-full bg-linear-to-r from-emerald-600 to-emerald-400 rounded-full"
                      style={{ width: metric.pct }}
                    />
                  </div>

                  {/* Business impact line */}
                  <p className="mt-2 text-label opacity-30 leading-relaxed font-light">
                    {metric.impact}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* VISUAL BEFORE / AFTER CHARTS */}
        <div className="mb-40">
          <h3 className="text-title mb-16 perf-reveal border-b border-white/10 pb-6">
            Before & After Optimization Letency
          </h3>

          <div className="space-y-12">
            {comparisons.map((item, i) => (
              <div key={i} className="perf-reveal group ">
                <p className="text-label opacity-60 mb-4 tracking-wide uppercase font-medium">
                  {item.label}
                </p>
                <div className="grid grid-cols-[1fr_80px_1fr] md:grid-cols-[1fr_120px_1fr] gap-4 items-center">
                  {/* Before Bar */}
                  <div className="relative h-12 w-full bg-white/5 rounded-sm overflow-hidden flex items-center px-4 justify-end">
                    <span className="text-rose-400 font-mono text-sm z-10">
                      {item.before}
                    </span>
                    {/* Background fill representing "slow" */}
                    <div className="absolute inset-y-0 right-0 w-full bg-rose-500/20 group-hover:bg-rose-500/30 transition-colors" />
                  </div>

                  {/* Arrow/Difference */}
                  <div className="flex flex-col items-center justify-center text-center">
                    <span className="block text-title font-light opacity-40 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                    <span className="text-label uppercase font-bold tracking-widest text-emerald-400 mt-1">
                      {item.diff} better
                    </span>
                  </div>

                  {/* After Bar */}
                  <div className="relative h-12 w-full bg-white/5 rounded-sm overflow-hidden flex items-center px-4">
                    <span
                      className={`${item.color.replace("bg-", "text-")} font-mono text-sm z-10 font-bold`}
                    >
                      {item.after}
                    </span>
                    <div
                      className={`absolute inset-y-0 left-0 w-1/4 ${item.color} opacity-80 group-hover:opacity-100 transition-colors`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ARCHITECTURE / TECH MATRIX */}
        <div>
          <h3 className="text-title font-semibold mb-12 perf-reveal">
            Optimization Architecture
          </h3>
          <div className="grid md:grid-cols-3 gap-px">
            {[
              {
                title: "React Concurrency",
                desc: "Interruptible rendering to eliminate input jank and main-thread blocking.",
              },
              {
                title: "Dynamic Code Splitting",
                desc: "Component-level granular chunking. Shipping precisely zero unnecessary bytes.",
              },
              {
                title: "Edge Architecture",
                desc: "ISR and CDN edge rules creating sub-10ms Time To First Byte globally.",
              },
              {
                title: "Memory Allocation",
                desc: "Aggressive cleanup sweeps and strict object pooling to defeat memory leaks.",
              },
              {
                title: "Asset Pipeline",
                desc: "AVIF/WebP transpilation, lazy hydration, and hardcoded aspect ratios for zero CLS.",
              },
              {
                title: "Custom WebGL/GSAP",
                desc: "Offloading calculations to GPU threads avoiding standard DOM reflows.",
              },
            ].map((system, i) => (
              <div
                key={i}
                className="bg-[#0a0a0a] p-8 md:p-12 perf-reveal hover:bg-white/5 transition-colors duration-500 flex flex-col justify-between group rounded-2xl"
              >
                <div>
                  <div className="w-8 h-8 rounded border border-white/20 mb-8 flex items-center justify-center opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all">
                    <span className="text-label font-mono">0{i + 1}</span>
                  </div>
                  <h4 className="text-body font-medium mb-4">{system.title}</h4>
                  <p className="text-caption opacity-50 font-light leading-relaxed">
                    {system.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
