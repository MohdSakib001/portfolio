import BlurContainer from "./BlurContainer";
import Container from "./Container";

export default function Performance() {
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

  const architecture = [
    {
      title: "React Concurrency",
      desc: "Interruptible rendering to eliminate input jank and main-thread blocking.",
      color: "bg-emerald-300/70",
    },
    {
      title: "Dynamic Code Splitting",
      desc: "Component-level granular chunking. Shipping precisely zero unnecessary bytes.",
      color: "bg-purple-300/70",
    },
    {
      title: "Edge Architecture",
      desc: "ISR and CDN edge rules creating sub-10ms Time To First Byte globally.",
      color: "bg-cyan-300/70",
    },
    {
      title: "Memory Allocation",
      desc: "Aggressive cleanup sweeps and strict object pooling to defeat memory leaks.",
      color: "bg-green-300/70",
    },
    {
      title: "Asset Pipeline",
      desc: "AVIF/WebP transpilation, lazy hydration, and hardcoded aspect ratios for zero CLS.",
      color: "bg-cyan-300/70",
    },
    {
      title: "Custom WebGL/GSAP",
      desc: "Offloading calculations to GPU threads avoiding standard DOM reflows.",
      color: "bg-cyan-300/70",
    },
  ];

  return (
    <>
      <Container className="relative z-10 bg-blue-300/70 rounded-4xl overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-45"
          style={{
            backgroundImage: `url("/assets/paper-texture.avif")`,
            backgroundSize: "cover",
          }}
        />

        <div className="flex flex-col lg:flex-row gap-y-12 lg:gap-x-24">
          <div className="mb-24 md:mb-40 text-left mx-auto gap-y-8 flex-[0.4]">
            <p className="text-body uppercase tracking-wide">Performance</p>
            <h2 className="text-heading tracking-tighter perf-reveal">
              Zero Tolerance For Latency.
            </h2>
            <p className="text-body text-black/80 leading-relaxed font-light perf-reveal ">
              I don’t merely build accessible UIs — I instrument, measure, and
              surgically optimize every millisecond of the execution thread.
              Real scores. Real impact.
            </p>
          </div>

          <div className="grid grid-cols-2 grid-rows-2 gap-6 flex-[0.6] metrics-wrapper">
            {vitals.map((metric, i) => (
              <BlurContainer key={i} className="p-6 rounded-2xl bg-white">
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

                <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="metric-fill h-full bg-linear-to-r from-emerald-600 to-emerald-400 rounded-full"
                    style={{ width: metric.pct }}
                  />
                </div>

                <p className="mt-2 text-label text-black/30 leading-relaxed font-light">
                  {metric.impact}
                </p>
              </BlurContainer>
            ))}
          </div>
        </div>
      </Container>

      <section className="relative z-10 px-6 md:px-16 py-24 max-w-6xl mx-auto rounded-4xl overflow-hidden flex flex-col gap-20">
        <div className="text-center mx-auto gap-y-16 flex-[0.4]">
          <p className="text-body uppercase tracking-wide font-medium">
            Performance
          </p>
          <h2 className="text-heading tracking-tighter ">Architecture</h2>
          <p className="text-body text-black/80 leading-relaxed font-light perf-reveal max-w-[70%] mx-auto">
            I don’t merely build accessible UIs — I instrument, measure, and
            surgically optimize every millisecond of the execution thread. Real
            scores. Real impact.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {architecture.map((system, i) => (
            <div
              key={i}
              className={`p-8 md:p-12 relative flex flex-col justify-between group rounded-2xl overflow-hidden ${system.color}`}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-45"
                style={{
                  backgroundImage: `url("/assets/paper-texture.avif")`,
                  backgroundSize: "cover",
                }}
              />
              <div>
                <h4 className="text-body font-medium mb-4">{system.title}</h4>
                <p className="text-caption text-gray-500 font-medium leading-relaxed">
                  {system.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

// {/* VISUAL BEFORE / AFTER CHARTS */}
// <div className="mb-40">
//   <h3 className="text-title mb-16 perf-reveal border-b border-white/10 pb-6">
//     Before & After Optimization Letency
//   </h3>

//   <div className="space-y-12">
//     {comparisons.map((item, i) => (
//       <div key={i} className="perf-reveal group ">
//         <p className="text-label opacity-60 mb-4 tracking-wide uppercase font-medium">
//           {item.label}
//         </p>
//         <div className="grid grid-cols-[1fr_80px_1fr] md:grid-cols-[1fr_120px_1fr] gap-4 items-center">
//           {/* Before Bar */}
//           <div className="relative h-12 w-full bg-white/5 rounded-sm overflow-hidden flex items-center px-4 justify-end">
//             <span className="text-rose-400 font-mono text-sm z-10">
//               {item.before}
//             </span>
//             {/* Background fill representing "slow" */}
//             <div className="absolute inset-y-0 right-0 w-full bg-rose-500/20 group-hover:bg-rose-500/30 transition-colors" />
//           </div>

//           {/* Arrow/Difference */}
//           <div className="flex flex-col items-center justify-center text-center">
//             <span className="block text-title font-light opacity-40 group-hover:opacity-100 transition-opacity">
//               →
//             </span>
//             <span className="text-label uppercase font-bold tracking-widest text-emerald-400 mt-1">
//               {item.diff} better
//             </span>
//           </div>

//           {/* After Bar */}
//           <div className="relative h-12 w-full bg-white/5 rounded-sm overflow-hidden flex items-center px-4">
//             <span
//               className={`${item.color.replace("bg-", "text-")} font-mono text-sm z-10 font-bold`}
//             >
//               {item.after}
//             </span>
//             <div
//               className={`absolute inset-y-0 left-0 w-1/4 ${item.color} opacity-80 group-hover:opacity-100 transition-colors`}
//             />
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
// </div>
