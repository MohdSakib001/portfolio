import { tech, aiTech } from "../data/technologies";
import Icon from "./icon";

export default function Capabilities() {
  return (
    <section className="py-32 px-6 md:px-16 overflow-hidden max-w-6xl mx-auto flex flex-col items-center">
      <h2 className="text-heading mb-16">Technologies</h2>
      <div className="relative overflow-hidden mb-24 space-y-8">
        <div className="flex gap-6 max-w-2xl flex-wrap">
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

        <div className="flex gap-20 w-max">
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
      </div>
    </section>
  );
}
