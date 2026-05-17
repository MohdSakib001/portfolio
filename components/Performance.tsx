import BlurContainer from "./BlurContainer";
import Container from "./Container";
import GridSection from "./GridSection";

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
      afterPct: 75,
      cardTint: "bg-rose-100/60",
    },
    {
      label: "Interaction to Next Paint",
      before: "380ms",
      after: "38ms",
      diff: "90%",
      afterPct: 90,
      cardTint: "bg-sky-100/60",
    },
    {
      label: "Total Bundle Size",
      before: "1.8MB",
      after: "210KB",
      diff: "88%",
      afterPct: 88,
      cardTint: "bg-emerald-100/60",
    },
  ];

  const architecture = [
    {
      title: "React Concurrency",
      description:
        "Interruptible rendering to eliminate input jank and main-thread blocking.",
      color: "bg-emerald-300/70",
    },
    {
      title: "Dynamic Code Splitting",
      description:
        "Component-level granular chunking. Shipping precisely zero unnecessary bytes.",
      color: "bg-purple-300/70",
    },
    {
      title: "Edge Architecture",
      description:
        "ISR and CDN edge rules creating sub-10ms Time To First Byte globally.",
      color: "bg-cyan-300/70",
    },
    {
      title: "Memory Allocation",
      description:
        "Aggressive cleanup sweeps and strict object pooling to defeat memory leaks.",
      color: "bg-green-300/70",
    },
    {
      title: "Asset Pipeline",
      description:
        "AVIF/WebP transpilation, lazy hydration, and hardcoded aspect ratios for zero CLS.",
      color: "bg-cyan-300/70",
    },
    {
      title: "Custom WebGL/GSAP",
      description:
        "Offloading calculations to GPU threads avoiding standard DOM reflows.",
      color: "bg-cyan-300/70",
    },
  ];

  return (
    <>
      <Container>
        <div className="px-4 sm:px-6 md:px-10 lg:px-16 py-24 relative z-10 bg-green-200/70 rounded-4xl overflow-hidden flex flex-col gap-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-45"
            style={{
              backgroundImage: `url("/assets/paper-texture.avif")`,
              backgroundSize: "cover",
            }}
          />

          <div className="text-center relative z-10">
            <p className="text-body uppercase tracking-wide font-medium mb-2">
              Performance
            </p>
            <h2 className="text-heading tracking-tighter">
              Before &{" "}
              <span className="relative inline-block">
                After
                <svg
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    bottom: "-0.1em",
                    left: 0,
                    width: "100%",
                    height: "0.2em",
                    overflow: "visible",
                  }}
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,7 C12,3 28,10 48,6 C64,2 80,9 100,5"
                    stroke="#34D399"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>{" "}
              Optimization{" "}
              <span
                className="relative inline-block"
                style={{ padding: "0 0.08em" }}
              >
                Latency
                <svg
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: "-0.2em",
                    left: "-0.14em",
                    width: "calc(100% + 0.28em)",
                    height: "calc(100% + 0.4em)",
                    overflow: "visible",
                    pointerEvents: "none",
                  }}
                  viewBox="0 0 110 46"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path
                    d="M22,8 C38,0 68,0 90,10 C108,18 110,32 96,44 C80,56 38,58 16,46 C2,36 0,22 22,8 C26,5 32,2 40,0"
                    stroke="#FBBF24"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {comparisons.map((item, i) => {
              const cx = 100,
                cy = 105,
                r = 78,
                nR = 58;
              const beforeAngle = 0.9 * Math.PI;
              const afterAngle = (1 - item.afterPct / 100) * Math.PI;
              const bx = cx + nR * Math.cos(beforeAngle);
              const by = cy - nR * Math.sin(beforeAngle);
              const ax = cx + nR * Math.cos(afterAngle);
              const ay = cy - nR * Math.sin(afterAngle);

              return (
                <BlurContainer
                  key={i}
                  className={`p-6 rounded-2xl ${item.cardTint} backdrop-blur-sm flex flex-col gap-4`}
                >
                  <svg viewBox="0 0 200 115" className="w-full">
                    <defs>
                      <linearGradient
                        id={`gauge-${i}`}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="45%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                    </defs>
                    {/* Track */}
                    <path
                      d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
                      fill="none"
                      stroke="rgba(0,0,0,0.08)"
                      strokeWidth="10"
                      strokeLinecap="round"
                    />
                    {/* Gradient arc */}
                    <path
                      d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
                      fill="none"
                      stroke={`url(#gauge-${i})`}
                      strokeWidth="10"
                      strokeLinecap="round"
                    />
                    {/* Before needle */}
                    <line
                      x1={cx}
                      y1={cy}
                      x2={bx}
                      y2={by}
                      stroke="#ef4444"
                      strokeWidth="1.5"
                      strokeOpacity="0.35"
                      strokeLinecap="round"
                    />
                    {/* After needle */}
                    <line
                      x1={cx}
                      y1={cy}
                      x2={ax}
                      y2={ay}
                      stroke="#10b981"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    {/* Cap */}
                    <circle cx={cx} cy={cy} r="6" fill="#10b981" />
                    <circle cx={cx} cy={cy} r="3" fill="white" />
                  </svg>

                  <p className="text-label uppercase tracking-wide opacity-50 font-medium text-center -mt-2">
                    {item.label}
                  </p>
                  <div className="flex items-end justify-between px-2">
                    <div className="text-center">
                      <p className="font-mono text-sm text-rose-500 font-bold">
                        {item.before}
                      </p>
                      <p className="text-xs opacity-40 mt-0.5">before</p>
                    </div>
                    <div className="text-center">
                      <p className="text-title font-bold text-emerald-500">
                        {item.diff}
                      </p>
                      <p className="text-xs opacity-40 mt-0.5">faster</p>
                    </div>
                    <div className="text-center">
                      <p className="font-mono text-sm text-emerald-500 font-bold">
                        {item.after}
                      </p>
                      <p className="text-xs opacity-40 mt-0.5">after</p>
                    </div>
                  </div>
                </BlurContainer>
              );
            })}
          </div>
        </div>
      </Container>

      <Container>
        <div className="px-4 sm:px-6 md:px-10 lg:px-16 py-24 relative z-10 bg-blue-300/70 rounded-4xl overflow-hidden">
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
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-title tracking-tight">
                        {metric.label}
                      </span>
                      <span className="text-label opacity-60">
                        Target: {metric.target}
                      </span>
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
        </div>
      </Container>

      <GridSection
        topic="Performance"
        title="Architecture"
        description="I don’t merely build accessible UIs — I instrument, measure, and surgically optimize every millisecond of the execution thread. Realscores. Real impact."
        cards={architecture}
      />
    </>
  );
}
