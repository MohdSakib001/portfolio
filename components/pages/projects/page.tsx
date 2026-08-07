import Link from "next/link";
import { ArrowRight, Boxes, Layers, Smartphone, Zap } from "lucide-react";

import Container from "@/components/Container";
import CtaSection from "@/components/CtaSection";
import PaperOverlay from "@/components/PaperOverlay";
import ProjectGallery from "@/components/projects/ProjectGallery";
import { resolveProjectLinks } from "@/components/projects/ProjectLinks";
import { email } from "@/data/constants";
import { PORTFOLIO_PILLS } from "@/data/cta";
import { projects } from "@/data/projects";
import { getProjectTheme } from "@/data/projectTheme";

const liveCount = projects.filter((project) => {
  const { site, stores } = resolveProjectLinks(project);
  return Boolean(site) || stores.length > 0;
}).length;

const mobileCount = projects.filter(
  (project) => getProjectTheme(project.id).platform === "mobile",
).length;

const techCount = new Set(projects.flatMap((project) => project.stack)).size;

const HERO_STATS = [
  { icon: Boxes, value: projects.length, label: "Projects" },
  { icon: Zap, value: liveCount, label: "Live" },
  { icon: Smartphone, value: mobileCount, label: "Mobile Apps" },
  { icon: Layers, value: techCount, label: "Technologies" },
];

export default function ProjectsArchive() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* Hero — same panel language as the blog archive. */}
      <section className="px-4 pb-8 pt-40 sm:px-6 md:px-10 lg:mx-auto lg:max-w-6xl lg:px-16">
        <div className="relative overflow-hidden rounded-4xl bg-[#E6E0F8] p-8 md:p-12">
          <PaperOverlay />

          <div className="relative">
            <h1 className="mx-auto max-w-3xl text-center text-display font-semibold leading-none tracking-tight">
              Everything I&apos;ve shipped.
            </h1>

            <div className="mt-10 grid grid-cols-2 gap-3 md:mt-12 lg:grid-cols-4">
              {HERO_STATS.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="rounded-2xl bg-white/60 p-5 shadow-[0_0_0_1px_rgba(3,3,2,0.06),0_4px_24px_rgba(3,3,2,0.06)] backdrop-blur"
                >
                  <Icon size={18} className="mb-4 text-black/45" />
                  <p className="text-3xl font-semibold tracking-tight">
                    {value}
                  </p>
                  <p className="mt-1 text-label uppercase tracking-[0.16em] text-black/40">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* One showcase per project, each on its own colour. */}
      {projects.map((project) => {
        const theme = getProjectTheme(project.id);

        return (
          <div key={project.id} id={project.id} className="scroll-mt-32">
            <Container>
              <ProjectGallery
                items={project.gallery}
                projectName={project.name}
                variant={theme.platform}
                bg={theme.bg}
                title={project.name}
                description={project.tagline}
                action={
                  <Link
                    href={`/projects/${project.id}`}
                    className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-label font-semibold uppercase tracking-[0.12em] text-white transition duration-200 hover:bg-neutral-800"
                  >
                    Case Study
                    <ArrowRight size={14} />
                  </Link>
                }
              />
            </Container>
          </div>
        );
      })}

      <CtaSection
        eyebrow="Next Build"
        title="Want a product like these shipped end to end?"
        description="I design, build, and ship full-stack products — mobile apps, AI systems, and the infrastructure behind them."
        pills={PORTFOLIO_PILLS}
        href={`mailto:${email}?subject=${encodeURIComponent(
          "Project inquiry",
        )}`}
        cta="Start a conversation"
      />
    </main>
  );
}
