import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";

import Container from "@/components/Container";
import { getProjectTheme } from "@/data/projectTheme";
import type { Project } from "@/types/projects";

type ProjectSectionProps = {
  projects: Project[];
  label?: string;
  title?: string;
  description?: string;
  showViewAll?: boolean;
  className?: string;
  compact?: boolean;
};

function ProjectCard({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  const theme = getProjectTheme(project.id);
  const headline = Object.values(project.metrics)[0];
  // Cards are static, so a video hero falls back to the first still it has.
  const thumbnail =
    project.hero.type === "image"
      ? project.hero.src
      : (project.hero.poster ??
        project.gallery.find((item) => item.type === "image")?.src);

  return (
    <Link
      href={`/projects/${project.id}`}
      className="group relative overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(0,0,0,0.10)]"
      style={{ backgroundColor: theme.bg }}
      title={project.name}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-45"
        style={{
          backgroundImage: `url("/assets/paper-texture.avif")`,
          backgroundSize: "cover",
        }}
      />

      <article className="relative flex h-full flex-col">
        <div
          className={`relative overflow-hidden bg-white/35 ${compact ? "aspect-video" : "aspect-4/3"}`}
        >
          {thumbnail && (
            <Image
              src={thumbnail}
              alt={project.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 360px"
              className={
                theme.platform === "mobile"
                  ? "object-contain p-4"
                  : "object-cover object-top"
              }
              loading="lazy"
            />
          )}
        </div>

        <div
          className={`${compact ? "p-5" : "p-6"} flex flex-1 flex-col justify-between`}
        >
          {headline && (
            <span className="mb-4 inline-flex w-fit items-center gap-1.5 text-label uppercase tracking-[0.16em] text-black/50">
              <Layers size={12} />
              {headline}
            </span>
          )}

          <div>
            <h3 className="text-lg font-semibold leading-tight tracking-tight text-black">
              {project.name}
            </h3>
            <p
              className={`${compact ? "line-clamp-2" : "line-clamp-3"} mt-3 text-caption leading-relaxed text-black/60`}
            >
              {project.tagline}
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4 pt-4 text-caption text-black/60">
            <span className="truncate">
              {project.stack.slice(0, 2).join(" · ")}
            </span>
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-white transition duration-200 group-hover:bg-neutral-800">
              <ArrowRight size={15} />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function ProjectSection({
  projects,
  label,
  title = "Featured projects.",
  description = "Products shipped end to end — mobile apps, AI systems, and full-stack platforms.",
  showViewAll = true,
  className,
  compact = false,
}: ProjectSectionProps) {
  if (!projects.length) return null;

  return (
    <Container className={className}>
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          {label && (
            <p className="mb-3 text-label font-medium uppercase tracking-[0.25em] text-black/30">
              {label}
            </p>
          )}
          <h2 className="text-heading font-semibold leading-none tracking-tight text-black">
            {title}
          </h2>
          <p className="mt-3 max-w-xl text-caption leading-relaxed text-black/40">
            {description}
          </p>
        </div>

        {showViewAll && (
          <Link
            href="/projects"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-black px-5 py-3 text-label font-semibold uppercase tracking-[0.12em] text-white transition duration-200 hover:bg-neutral-800"
          >
            All Projects
            <ArrowRight size={14} />
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} compact={compact} />
        ))}
      </div>
    </Container>
  );
}
