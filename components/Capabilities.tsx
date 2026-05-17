import {
  BrainCircuit,
  Cloud,
  Database,
  LayoutDashboard,
  TextSearchIcon,
} from "lucide-react";
import {
  AiTech,
  BackendTech,
  DevopsTech,
  FrontendTech,
} from "../data/technologies";
import BlurContainer from "./BlurContainer";
import Icon from "./icon";
import Container from "./Container";

export default function Capabilities() {
  const sections = [
    {
      title: "Frontend Systems",
      icon: LayoutDashboard,
      items: FrontendTech,
    },
    {
      title: "Backend Architecture",
      icon: Database,
      items: BackendTech,
    },
    {
      title: "AI Infrastructure",
      icon: BrainCircuit,
      items: AiTech,
    },
    {
      title: "Deployment & Tooling",
      icon: Cloud,
      items: DevopsTech,
    },
  ];

  return (
    <Container>
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
            <p className="text-body uppercase tracking-wide">
              Engineering Stack
            </p>
            <h2 className="text-title tracking-tighter perf-reveal max-w-[70%]">
              Built For Speed, Scale & Clean UX.
            </h2>
            <p className="text-body text-black/80 leading-relaxed font-light perf-reveal max-w-[70%]">
              From responsive interfaces to production-ready systems, every tool
              here solves a specific performance or product problem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-[0.7]">
            {sections.map((section) => {
              const SectionIcon = section.icon;

              return (
                <BlurContainer
                  key={section.title}
                  className="p-6 rounded-3xl flex flex-col gap-y-8"
                >
                  <div className="flex items-center gap-3">
                    <SectionIcon className="w-5 h-5" />

                    <h3 className="text-body font-medium">{section.title}</h3>
                  </div>

                  <div className="flex flex-wrap gap-4 justify-start">
                    {section.items.map((t) => (
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
              );
            })}
          </div>
        </div>
      </section>
    </Container>
  );
}
