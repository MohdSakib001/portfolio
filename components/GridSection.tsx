import React from "react";
import Container from "./Container";

const GridSection = ({
  topic,
  title,
  description,
  cards,
}: {
  topic: string;
  title: string;
  description: string;
  cards: {
    title: string;
    description: string;
    color?: string;
    tags?: string[];
    icon?: any;
  }[];
}) => {
  return (
    <Container>
      <div className="relative z-10 rounded-4xl overflow-hidden flex flex-col gap-20 py-24">
        <div className="text-center mx-auto gap-y-16 flex-[0.4]">
          <p className="text-body uppercase tracking-wide font-medium">
            {topic}
          </p>
          <h2 className="text-heading tracking-tighter ">{title}</h2>
          <p className="text-body text-black/80 leading-relaxed font-light perf-reveal max-w-[70%] mx-auto">
            {description}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((system, i) => (
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
                <div className="flex items-center justify-start gap-x-2 mb-4">
                  {system.icon &&
                    React.createElement(system.icon, {
                      size: 20,
                      strokeWidth: 1.5,
                    })}

                  <h3 className="text-body font-medium">{system.title}</h3>
                </div>
                <p className="text-caption text-black/50 font-medium leading-relaxed">
                  {system.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default GridSection;
