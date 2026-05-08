import KineticBackground from "./KineticBackground";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-white text-black flex flex-col items-center justify-center">
      {/* KINETIC BACKGROUND — priority, no touch */}
      {/* <KineticBackground opacity={0.04} strokeWidth="2px" color="black" /> */}

      {/* CENTER CONTENT */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto w-full">
        {/* EYEBROW */}
        {/* <p className="text-[10px] uppercase tracking-[0.3em] opacity-25 mb-7 font-medium">
          Full Stack Engineer &nbsp;·&nbsp; React Native &nbsp;·&nbsp; AI
          Systems
        </p> */}

        <p className="text-[11px] tracking-[0.08em] opacity-25 mb-7 uppercase">
          8 products &nbsp;·&nbsp; 25K+ users &nbsp;·&nbsp; $100K+ GMV
          &nbsp;·&nbsp; 98 Lighthouse
        </p>

        {/* H1 — VALUE PROPOSITION, NOT NAME */}
        <h1 className="text-[clamp(2.8rem,7vw,6rem)] leading-none tracking-[-0.04em] font-semibold mb-10">
          I build software that
          <br />
          <span className="opacity-30">ships, scales, and earns.</span>
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
