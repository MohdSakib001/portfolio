import { TextSearchIcon } from "lucide-react";
import { tech, aiTech } from "../data/technologies";
import BlurContainer from "./BlurContainer";
import Icon from "./icon";

export default function Capabilities() {
  return (
    <section className="relative z-10 px-6 md:px-16 py-16 my-32 max-w-6xl mx-auto bg-violet-300/70 rounded-4xl overflow-hidden flex gap-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-45"
        style={{
          backgroundImage: `url("/assets/paper-texture.avif")`,
          backgroundSize: "cover",
        }}
      />

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="text-left mx-auto gap-16 flex-[0.3]">
          <p className="text-body uppercase tracking-wide">Engineering Stack</p>
          <h2 className="text-title tracking-tighter perf-reveal max-w-[70%]">
            Built For Speed, Scale & Clean UX.
          </h2>
          <p className="text-body text-black/80 leading-relaxed font-light perf-reveal max-w-[70%]">
            From responsive interfaces to production-ready systems, every tool
            here solves a specific performance or product problem.
          </p>
        </div>

        <div className="flex flex-[0.7] gap-x-6">
          <BlurContainer className="flex-1 gap-y-8 flex flex-col p-6 rounded-3xl">
            <div className="flex items-center gap-x-4">
              <TextSearchIcon />
              <h2 className="text-body font-medium">Technologies</h2>
            </div>
            <div className="flex gap-6 flex-wrap">
              {tech.map((t) => (
                <Icon
                  key={t.name}
                  href={`https://www.google.com/search?q=${t.name}`}
                  title={t.name}
                  img={t.icon}
                  type="img"
                  className="w-12 h-12"
                />
              ))}
            </div>
          </BlurContainer>

          <BlurContainer className="flex-1 gap-y-8 flex flex-col p-6 rounded-3xl">
            <h2 className="text-body font-medium">AI Systems</h2>
            <div className="flex gap-6 flex-wrap">
              {aiTech.map((t) => (
                <Icon
                  key={t.name}
                  href={`https://www.google.com/search?q=${t.name}`}
                  title={t.name}
                  img={t.icon}
                  type="img"
                  className="w-12 h-12"
                />
              ))}
            </div>
          </BlurContainer>
        </div>
      </div>
    </section>
  );
}
