"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ArrowRight } from "lucide-react";
import { projects } from "../data/projects";

const CATEGORY_LABEL: Record<string, string> = {
  client: "Client Work",
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
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
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
        className="flex items-center gap-1 text-[11px] uppercase tracking-[0.18em] font-medium px-5 py-2 cursor-pointer"
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
        <div
          className="w-[740px] max-w-[calc(100vw-2rem)] rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.72)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.60)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.80), 0 24px 48px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.06)",
          }}
        >
          {/* Header */}
          <div
            className="px-6 pt-5 pb-3 flex items-center justify-between"
            style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}
          >
            <p
              className="text-[9px] uppercase tracking-[0.25em] font-medium"
              style={{ color: "rgba(0,0,0,0.35)" }}
            >
              Selected Work
            </p>
            <p
              className="text-[9px] font-mono"
              style={{ color: "rgba(0,0,0,0.25)" }}
            >
              {projects.length} projects
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-4 gap-3 p-4">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                onClick={() => setOpen(false)}
                className="group flex flex-col rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md"
                style={{ border: "1px solid rgba(0,0,0,0.06)" }}
              >
                {/* Image */}
                <div
                  className="relative aspect-[4/3] overflow-hidden"
                  style={{ background: "rgba(0,0,0,0.06)" }}
                >
                  <Image
                    src={project.hero.src}
                    alt={project.name}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="185px"
                  />
                  {/* Category pill */}
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 text-white text-[8px] font-medium tracking-wide rounded-full backdrop-blur-sm">
                    {CATEGORY_LABEL[project.category] ?? project.category}
                  </span>
                </div>

                {/* Name + metric */}
                <div
                  className="px-2.5 py-2.5 transition-colors duration-150"
                  style={{ background: "rgba(255,255,255,0.55)" }}
                >
                  <p
                    className="text-[11px] font-semibold leading-tight"
                    style={{ color: "rgba(0,0,0,0.82)" }}
                  >
                    {project.name}
                  </p>
                  {project.metrics?.users && (
                    <p
                      className="text-[9px] mt-0.5 truncate"
                      style={{ color: "rgba(0,0,0,0.36)" }}
                    >
                      {project.metrics.users}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* Footer */}
          <div
            className="px-6 py-3.5 flex items-center justify-between"
            style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}
          >
            <p
              className="text-[9px] uppercase tracking-widest"
              style={{ color: "rgba(0,0,0,0.25)" }}
            >
              Full-stack · Mobile · AI
            </p>
            <Link
              href="/projects"
              onClick={() => setOpen(false)}
              className="group inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] font-medium transition-colors"
              style={{ color: "rgba(0,0,0,0.70)" }}
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
