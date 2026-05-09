export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-white text-black flex flex-col items-center justify-center">
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto w-full">
        {/* <p className="text-[11px] tracking-[0.08em] opacity-80 mb-7 uppercase">
          8 products &nbsp;·&nbsp; 25K+ users &nbsp;·&nbsp; $100K+ GMV
          &nbsp;·&nbsp; 98 Lighthouse
        </p> */}

        <h1 className="text-[clamp(2.8rem,7vw,6rem)] leading-none tracking-[-0.04em] font-semibold mb-10">
          I build software that
          <br />
          <span className="text-black">
            <span className="relative inline-block">
              ships
              <svg
                aria-hidden="true"
                style={{
                  position: "absolute",
                  bottom: "-0.12em",
                  left: 0,
                  width: "100%",
                  height: "0.22em",
                  overflow: "visible",
                }}
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,7 C12,3 28,10 48,6 C64,2 80,9 100,5"
                  stroke="#60A5FA"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="text-black/35">, </span>
            <span className="relative inline-block">
              scales
              <svg
                aria-hidden="true"
                style={{
                  position: "absolute",
                  bottom: "-0.12em",
                  left: 0,
                  width: "100%",
                  height: "0.22em",
                  overflow: "visible",
                }}
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,6 C15,2 35,10 58,5 C74,1 88,8 100,5"
                  stroke="#34D399"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="text-black/35"> and </span>
            <span
              className="relative inline-block"
              style={{ padding: "0 0.12em" }}
            >
              earns
              <svg
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "-0.22em",
                  left: "-0.18em",
                  width: "calc(100% + 0.36em)",
                  height: "calc(100% + 0.44em)",
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
            <span className="text-black/35">.</span>
          </span>
        </h1>

        {/* PROOF LINE */}
        {/* <p className="text-[11px] tracking-[0.08em] opacity-25 mb-14 uppercase">
          8 products &nbsp;·&nbsp; 25K+ users &nbsp;·&nbsp; $100K+ GMV
          &nbsp;·&nbsp; 98 Lighthouse
        </p> */}

        {/* CTA ROW */}
        <div className="flex items-center gap-8">
          <a
            href="#work"
            className="text-[11px] uppercase tracking-[0.2em] font-semibold px-8 py-3.5 bg-black text-white hover:bg-neutral-800 transition-colors duration-300"
          >
            View Case Studies →
          </a>
          <a
            href="mailto:mohdsakib.work@gmail.com"
            className="text-[11px] uppercase tracking-[0.2em] font-medium opacity-40 hover:opacity-100 transition-opacity duration-300"
          >
            Let&apos;s Talk →
          </a>
        </div>
      </div>
    </section>
  );
}
