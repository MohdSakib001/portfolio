import Image from "next/image";
import { CalendarDays, Check, Layers, UserRound } from "lucide-react";

import CtaSection from "@/components/CtaSection";
import PaperOverlay from "@/components/PaperOverlay";
import MetricStrip from "@/components/projects/MetricStrip";
import ProjectGallery from "@/components/projects/ProjectGallery";
import ProjectLinks from "@/components/projects/ProjectLinks";
import ProjectSection from "@/components/projects/ProjectSection";
import { ScreenShell, PhoneShell } from "@/components/projects/frames";
import { email } from "@/data/constants";
import { AVAILABILITY_PILLS } from "@/data/cta";
import { getProjectTheme } from "@/data/projectTheme";
import type { Project } from "@/types/projects";

const ARCHITECTURE_LABELS: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend",
  realtime: "Realtime",
  infra: "Infrastructure",
};

/**
 * Same measure as the blog detail page. Inlined rather than using `Container`,
 * whose baked-in `py-24` collides with a narrower rhythm on a page this long.
 */
const SECTION = "px-4 py-12 sm:px-6 md:px-10 lg:mx-auto lg:max-w-6xl lg:px-16";

export default function ProjectPage({
  project,
  relatedProjects = [],
}: {
  project: Project;
  relatedProjects?: Project[];
}) {
  const theme = getProjectTheme(project.id);

  const architecture = Object.entries(project.architecture).filter(([, v]) =>
    Boolean(v),
  );

  const isMobile = theme.platform === "mobile";
  const stills = project.gallery.filter((item) => item.type === "image");
  // A phone hero wants the app captures, never the marketing-site shot.
  const heroShots = (stills.length ? stills : [{ src: project.hero.src }]).slice(
    0,
    2,
  );
  const wideShot =
    project.hero.type === "image" ? project.hero.src : project.hero.poster;

  return (
    <main className="min-h-screen bg-white text-black">
      <article>
        {/* HERO */}
        <section className="px-4 pt-32 sm:px-6 md:px-10 md:pt-36 lg:mx-auto lg:max-w-6xl lg:px-16">
          <div
            className="relative overflow-hidden rounded-4xl"
            style={{ backgroundColor: theme.bg }}
          >
            <PaperOverlay />

            {/*
              Phone heroes bleed past the bottom edge, so the panel drops its
              bottom padding and the copy column carries it instead. A framed
              web shot sits inside the panel, so it keeps padding on all four
              sides and centres against the copy.
            */}
            <div
              className={`relative grid gap-8 px-6 pt-6 md:px-10 md:pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 ${
                isMobile
                  ? "pb-0 lg:items-end"
                  : "pb-6 md:pb-10 lg:items-center"
              }`}
            >
              <div className={isMobile ? "pb-10 md:pb-14" : ""}>
                <h1 className="max-w-4xl text-heading font-semibold leading-none tracking-tight md:text-[4.5rem]">
                  {project.name}
                </h1>

                <p className="mt-5 max-w-2xl text-body leading-relaxed text-black/55">
                  {project.tagline}
                </p>

                <div className="mt-6 flex flex-wrap gap-3 text-caption text-black/55">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/55 px-4 py-2">
                    <CalendarDays size={15} />
                    {project.overview.timeline}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/55 px-4 py-2">
                    <UserRound size={15} />
                    {project.overview.myRole}
                  </span>
                </div>

                <ProjectLinks project={project} className="mt-8" />
              </div>

              {/* Media respects the surface the product actually lives on. */}
              {isMobile ? (
                <div className="relative mx-auto h-[340px] w-full max-w-[460px] self-end sm:h-[400px] lg:h-[450px]">
                  {heroShots[1] && (
                    <PhoneShell className="absolute bottom-6 left-[12%] w-[140px] -rotate-[10deg] sm:w-[170px] lg:w-[188px]">
                      <Image
                        src={heroShots[1].src}
                        alt={`${project.name} app screen`}
                        width={720}
                        height={1560}
                        sizes="(max-width: 640px) 140px, 190px"
                        className="h-auto w-full"
                      />
                    </PhoneShell>
                  )}

                  <PhoneShell className="absolute -bottom-10 right-[12%] z-10 w-[140px] rotate-[7deg] sm:w-[170px] lg:w-[188px]">
                    <Image
                      src={heroShots[0].src}
                      alt={`${project.name} — ${project.tagline}`}
                      width={720}
                      height={1560}
                      sizes="(max-width: 640px) 140px, 190px"
                      priority
                      className="h-auto w-full"
                    />
                  </PhoneShell>
                </div>
              ) : (
                <div>
                  <ScreenShell>
                    {project.hero.type === "video" && !wideShot ? (
                      <video
                        src={project.hero.src}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="h-auto w-full"
                      />
                    ) : (
                      <Image
                        src={wideShot ?? project.hero.src}
                        alt={`${project.name} — ${project.tagline}`}
                        width={1600}
                        height={900}
                        sizes="(max-width: 1024px) 100vw, 520px"
                        priority
                        className="h-auto w-full"
                      />
                    )}
                  </ScreenShell>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* METRICS */}
        <section className={`${SECTION} pt-8`}>
          <MetricStrip metrics={project.metrics} />
        </section>

        {/* OVERVIEW */}
        <section className={SECTION}>
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-4xl bg-[#EFECE5] p-8 md:p-10">
              <PaperOverlay />
              <div className="relative">
                <h2 className="mb-5 text-title font-semibold leading-none tracking-tight">
                  The Problem
                </h2>
                <p className="text-[1.125rem] font-medium leading-[1.55] tracking-tight text-black/80 md:text-[1.375rem] md:leading-[1.5]">
                  {project.overview.problem}
                </p>
              </div>
            </div>

            <div
              className="relative overflow-hidden rounded-4xl p-8 md:p-10"
              style={{ backgroundColor: theme.bg }}
            >
              <PaperOverlay />
              <div className="relative">
                <h2 className="mb-5 text-title font-semibold leading-none tracking-tight">
                  The Solution
                </h2>
                <p className="text-[1.125rem] font-medium leading-[1.55] tracking-tight text-black/80 md:text-[1.375rem] md:leading-[1.5]">
                  {project.overview.solution}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* GALLERY */}
        {project.gallery.length > 0 && (
          <section className={SECTION}>
            <ProjectGallery
              items={project.gallery}
              projectName={project.name}
              variant={theme.platform}
              bg={theme.bg}
            />
          </section>
        )}

        {/* FEATURES */}
        {project.features.length > 0 && (
          <section className={SECTION}>
            <h2 className="mb-8 text-heading font-semibold leading-none tracking-tight">
              What it does.
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 rounded-2xl border border-black/6 bg-white p-5 shadow-[0_0_0_1px_rgba(3,3,2,0.04),0_4px_24px_rgba(3,3,2,0.05)]"
                >
                  <span
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: theme.bg }}
                  >
                    <Check size={15} style={{ color: theme.accent }} />
                  </span>
                  <p className="text-caption font-medium leading-snug text-black/75">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ARCHITECTURE + STACK */}
        <section className={SECTION}>
          <div className="relative overflow-hidden rounded-4xl bg-[#E6E0F8] p-8 md:p-12">
            <PaperOverlay />

            <div className="relative">
              <h2 className="text-heading font-semibold leading-none tracking-tight">
                How it&apos;s built.
              </h2>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {architecture.map(([key, value]) => (
                  <div
                    key={key}
                    className="rounded-2xl bg-white/65 p-5 shadow-[0_0_0_1px_rgba(3,3,2,0.06),0_4px_24px_rgba(3,3,2,0.06)] backdrop-blur"
                  >
                    <p className="mb-2 text-label font-medium uppercase tracking-[0.2em] text-black/40">
                      {ARCHITECTURE_LABELS[key] ?? key}
                    </p>
                    <p className="text-caption font-medium leading-relaxed text-black/70">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <p className="mb-4 inline-flex items-center gap-2 text-label font-medium uppercase tracking-[0.2em] text-black/40">
                  <Layers size={13} />
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/30 bg-white/40 px-4 py-2 text-caption font-medium text-black/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-transform hover:-translate-y-0.5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* IMPACT */}
        {project.achievements.length > 0 && (
          <section className={SECTION}>
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <h2 className="text-heading font-semibold leading-none tracking-tight">
                What changed.
              </h2>

              <div className="grid gap-3">
                {project.achievements.map((achievement, i) => (
                  <div
                    key={achievement}
                    className="flex gap-5 rounded-2xl border border-black/6 bg-white p-6 shadow-[0_0_0_1px_rgba(3,3,2,0.04),0_4px_24px_rgba(3,3,2,0.05)]"
                  >
                    <span
                      className="text-label font-semibold tracking-[0.1em]"
                      style={{ color: theme.accent }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-caption leading-relaxed text-black/65">
                      {achievement}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      <CtaSection
        title={`Need a developer who can own a build like ${project.name}?`}
        description="I design and ship full-stack products end to end — mobile apps, AI systems, and the infrastructure behind them."
        pills={AVAILABILITY_PILLS}
        href={`mailto:${email}?subject=${encodeURIComponent(
          `Project inquiry — something like ${project.name}`,
        )}`}
        cta="Start a conversation"
      />

      <ProjectSection
        projects={relatedProjects}
        title="Related projects."
        description="Other products built with an overlapping stack and problem space."
        showViewAll
        compact
        className="pt-8"
      />
    </main>
  );
}
