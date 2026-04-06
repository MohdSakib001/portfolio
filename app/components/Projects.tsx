"use client";
import Image from "next/image";
import { useState } from "react";

const projects = [
  {
    title: "StakeClash",
    tagline: "Real-time competitive gaming platform.",
    image: "/assets/projects/stakeclash/stakeclash.webp",
    description:
      "Built a fast, real-time system with live match tracking, optimized UI performance and scalable backend integrations.",
    links: {
      web: true,
      play: true,
      app: true,
    },
  },
  {
    title: "StakeClash",
    tagline: "Real-time competitive gaming platform.",
    image: "/assets/projects/stakeclash/stakeclash.webp",
    description:
      "Built a fast, real-time system with live match tracking, optimized UI performance and scalable backend integrations.",
    links: {
      web: true,
      play: true,
      app: false,
    },
  },
  {
    title: "StakeClash",
    tagline: "Real-time competitive gaming platform.",
    image: "/assets/projects/stakeclash/stakeclash.webp",
    description:
      "Built a fast, real-time system with live match tracking, optimized UI performance and scalable backend integrations.",
    links: {
      web: true,
      play: true,
      app: false,
    },
  },
  // 👉 add unlimited projects here
];

function ProjectCard({ project }: { project: any }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="group border border-neutral-200 p-6 md:p-10 transition duration-500 hover:bg-black hover:text-white cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      {/* TOP */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* IMAGE */}
        <div className="relative w-full md:w-[400px] h-[260px] overflow-hidden">
          <Image
            src={project.image}
            alt="project"
            fill
            className="object-contain transition duration-700 group-hover:scale-105"
          />
        </div>

        {/* CONTENT */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl md:text-3xl mb-3">
              {project.title}
            </h3>

            <p className="text-sm opacity-70 mb-6">
              {project.tagline}
            </p>
          </div>

          {/* LINKS (images not text) */}
          <div className="flex gap-4 items-center">
            {project.links.web && (
              <Image src="/assets/icons/web.png" width={28} height={28} alt="web" />
            )}
            {project.links.play && (
              <Image src="/assets/playstore.png" width={120} height={60} alt="play" />
            )}
            {project.links.app && (
              <Image src="/assets/appstore.png" width={120} height={60} alt="app" />
            )}
          </div>
        </div>
      </div>

      {/* EXPANDABLE */}
      <div
        className={`overflow-hidden transition-all duration-500 ${open ? "max-h-[300px] mt-6 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <p className="text-sm opacity-80 leading-relaxed">
          {project.description}
        </p>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section className="px-6 md:px-16 py-32 border-t">
      <h2 className="text-5xl mb-16 reveal">Projects</h2>

      <div className="flex flex-col gap-12">
        {projects.map((p, i) => (
          <div key={i} className="reveal">
            <ProjectCard project={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
