"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ArrowRight } from "lucide-react";
import { projects } from "../data/projects";

const CATEGORY_LABEL: Record<string, string> = {
  client:  "Client Work",
  startup: "Startup",
};

export default function WorkDropdown() {
  const [open, setOpen] = useState(false);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const enter = () => {
    if (timeout.current) clearTimeout(timeout.current);
    setOpen(true);
  };
  const leave = () => {
    timeout.current = setTimeout(() => setOpen(false), 160);
  };

  useEffect(() => {
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, []);

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>

      {/* Trigger — same style as existing nav buttons */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className="flex items-center gap-1 text-[11px] uppercase tracking-[0.18em] font-medium px-5 py-2 opacity-70 hover:opacity-100 transition-opacity duration-300"
      >
        Work
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Panel */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50 transition-all duration-200 ease-out ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="w-[740px] max-w-[calc(100vw-2rem)] rounded-2xl border border-neutral-200/70 bg-white shadow-2xl shadow-black/8 overflow-hidden">

          {/* Header */}
          <div className="px-6 pt-5 pb-3 border-b border-neutral-100 flex items-center justify-between">
            <p className="text-[9px] uppercase tracking-[0.25em] text-neutral-400 font-medium">
              Selected Work
            </p>
            <p className="text-[9px] text-neutral-300 font-mono">{projects.length} projects</p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-4 gap-3 p-4">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                onClick={() => setOpen(false)}
                className="group flex flex-col rounded-xl overflow-hidden border border-transparent hover:border-neutral-200 transition-all duration-200 hover:shadow-sm"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                  <Image
                    src={project.hero.src}
                    alt={project.name}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="185px"
                  />
                  {/* Category pill overlaid bottom-left */}
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 text-white text-[8px] font-medium tracking-wide rounded-full backdrop-blur-sm">
                    {CATEGORY_LABEL[project.category] ?? project.category}
                  </span>
                </div>

                {/* Name + metric */}
                <div className="px-2.5 py-2.5 bg-white group-hover:bg-neutral-50 transition-colors">
                  <p className="text-[11px] font-semibold text-black leading-tight">
                    {project.name}
                  </p>
                  {project.metrics?.users && (
                    <p className="text-[9px] text-neutral-400 mt-0.5 truncate">
                      {project.metrics.users}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t border-neutral-100 px-6 py-3.5 flex items-center justify-between">
            <p className="text-[9px] text-neutral-300 uppercase tracking-widest">
              Full-stack · Mobile · AI
            </p>
            <Link
              href="/projects"
              onClick={() => setOpen(false)}
              className="group inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] font-medium text-black hover:text-neutral-500 transition-colors"
            >
              View all projects
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
