import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Globe2,
  Layers3,
  MessageCircle,
  Sparkles,
} from "lucide-react";

import BlogSection from "@/components/blogs/BlogSection";
import Container from "@/components/Container";
import PrimaryButton from "@/components/primaryButton";
import { getFeaturedBlogs } from "@/data/blogs";
import { projects } from "@/data/projects";
import type { ServicePage } from "@/types/services";

type ServiceLandingProps = {
  page: ServicePage;
};

const selectedIcons = [Layers3, Sparkles, BriefcaseBusiness, Globe2];

export default function ServiceLanding({ page }: ServiceLandingProps) {
  const featuredProjects = page.projectIds
    .map((id) => projects.find((project) => project.id === id))
    .filter(Boolean) as typeof projects;
  const featuredBlogs = getFeaturedBlogs(3);

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="px-4 pb-12 pt-40 sm:px-6 md:px-10 lg:mx-auto lg:max-w-6xl lg:px-16">
        <div className="relative overflow-hidden rounded-4xl bg-[#E6E0F8] p-6 md:p-10 lg:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-45"
            style={{
              backgroundImage: `url("/assets/paper-texture.avif")`,
              backgroundSize: "cover",
            }}
          />

          <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="mb-4 text-label font-medium uppercase tracking-[0.25em] text-black/40">
                {page.eyebrow}
              </p>
              <h1 className="max-w-4xl text-display font-semibold leading-none tracking-tight">
                {page.title}
              </h1>
              <p className="mt-6 max-w-2xl text-body leading-relaxed text-black/60">
                {page.subtitle}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <PrimaryButton
                  href="mailto:mohdsakib.work@gmail.com?subject=Next.js%20project%20inquiry"
                  title={page.primaryCta}
                  text={page.primaryCta}
                  size="base"
                />
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-full bg-white/65 px-5 py-4 text-label font-semibold uppercase tracking-[0.12em] text-black shadow-[0_0_0_1px_rgba(3,3,2,0.06),0_4px_24px_rgba(3,3,2,0.06)] transition hover:bg-white"
                >
                  {page.secondaryCta}
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {page.proof.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl bg-white/65 p-5 shadow-[0_0_0_1px_rgba(3,3,2,0.06),0_4px_24px_rgba(3,3,2,0.06)] backdrop-blur"
                >
                  <p className="text-3xl font-semibold tracking-tight">
                    {item.value}
                  </p>
                  <p className="mt-2 text-label uppercase tracking-[0.16em] text-black/45">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Container className="pt-12">
        <div className="grid gap-4 lg:grid-cols-4">
          {page.services.map((service, index) => {
            const Icon = selectedIcons[index % selectedIcons.length];

            return (
              <article
                key={service.title}
                className="rounded-2xl border border-black/6 bg-white p-6 shadow-[0_0_0_1px_rgba(3,3,2,0.04),0_4px_24px_rgba(3,3,2,0.06)]"
              >
                <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-black text-white">
                  <Icon size={18} />
                </span>
                <h2 className="text-lg font-semibold leading-tight tracking-tight">
                  {service.title}
                </h2>
                <p className="mt-3 text-caption leading-relaxed text-black/55">
                  {service.description}
                </p>
              </article>
            );
          })}
        </div>
      </Container>

      <Container className="pt-10">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="mb-3 text-label font-medium uppercase tracking-[0.25em] text-black/30">
              Why Hire Me
            </p>
            <h2 className="text-heading font-semibold leading-none tracking-tight">
              Senior delivery without the agency fog.
            </h2>
            <p className="mt-4 text-caption leading-relaxed text-black/45">
              You get direct communication with the engineer building the
              product, not a chain of handoffs. That matters when the work
              touches architecture, performance, and product decisions.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {page.outcomes.map((outcome) => (
              <div
                key={outcome}
                className="flex gap-3 rounded-2xl bg-[#DAF0DE] p-5"
              >
                <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                <p className="text-caption leading-relaxed text-black/65">
                  {outcome}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <Container className="pt-10">
        <div className="mb-10">
          <p className="mb-3 text-label font-medium uppercase tracking-[0.25em] text-black/30">
            Relevant Work
          </p>
          <h2 className="text-heading font-semibold leading-none tracking-tight">
            Proof from shipped products.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {featuredProjects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="group overflow-hidden rounded-2xl border border-black/6 bg-[#F4EDDA] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(0,0,0,0.10)]"
            >
              <div className="relative aspect-[4/3] bg-white/45">
                <Image
                  src={project.hero.src}
                  alt={project.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 360px"
                  className="object-contain p-5 transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <p className="mb-3 text-label uppercase tracking-[0.16em] text-black/40">
                  {project.category}
                </p>
                <h3 className="text-title font-semibold leading-tight tracking-tight">
                  {project.name}
                </h3>
                <p className="mt-3 line-clamp-3 text-caption leading-relaxed text-black/55">
                  {project.overview.solution}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-white/70 px-3 py-1 text-label uppercase tracking-[0.12em] text-black/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>

      <Container className="pt-10">
        <div className="relative overflow-hidden rounded-4xl bg-[#DCE8F6] p-8 md:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-45"
            style={{
              backgroundImage: `url("/assets/paper-texture.avif")`,
              backgroundSize: "cover",
            }}
          />
          <div className="relative grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="mb-3 text-label font-medium uppercase tracking-[0.25em] text-black/35">
                How We Work
              </p>
              <h2 className="text-heading font-semibold leading-none tracking-tight">
                Clear milestones, async updates, real overlap.
              </h2>
              <div className="mt-6 flex flex-wrap gap-2">
                {page.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-white/60 px-3 py-1.5 text-label uppercase tracking-[0.12em] text-black/55"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-3">
              {page.process.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-2xl bg-white/65 p-5 shadow-[0_0_0_1px_rgba(3,3,2,0.06),0_4px_24px_rgba(3,3,2,0.06)] backdrop-blur"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-label font-semibold text-white">
                      {index + 1}
                    </span>
                    <h3 className="text-lg font-semibold tracking-tight">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-caption leading-relaxed text-black/55">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <Container className="pt-10">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="mb-3 text-label font-medium uppercase tracking-[0.25em] text-black/30">
              FAQ
            </p>
            <h2 className="text-heading font-semibold leading-none tracking-tight">
              Questions clients usually ask.
            </h2>
          </div>
          <div className="grid gap-3">
            {page.faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-black/6 bg-white p-5 shadow-[0_0_0_1px_rgba(3,3,2,0.04),0_4px_24px_rgba(3,3,2,0.05)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold tracking-tight">
                  {faq.question}
                  <ArrowRight
                    size={16}
                    className="shrink-0 transition group-open:rotate-90"
                  />
                </summary>
                <p className="mt-4 text-caption leading-relaxed text-black/55">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Container>

      <section className="px-4 py-10 sm:px-6 md:px-10 lg:mx-auto lg:max-w-6xl lg:px-16">
        <div className="relative overflow-hidden rounded-4xl bg-black p-8 text-white md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="mb-3 text-label font-medium uppercase tracking-[0.25em] text-white/35">
                Available For Remote Work
              </p>
              <h2 className="max-w-3xl text-heading font-semibold leading-none tracking-tight">
                Need a Next.js freelancer who can own the build?
              </h2>
              <div className="mt-5 flex flex-wrap gap-3 text-caption text-white/55">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                  <Clock3 size={15} />
                  US/UK overlap calls
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                  <MessageCircle size={15} />
                  Async updates
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                  <Globe2 size={15} />
                  Remote from India
                </span>
              </div>
            </div>
            <a
              href="mailto:mohdsakib.work@gmail.com?subject=Next.js%20freelance%20project"
              className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-label font-semibold uppercase tracking-[0.12em] text-black transition hover:bg-neutral-200"
            >
              Start a conversation
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      <BlogSection
        blogs={featuredBlogs}
        label="Engineering Notes"
        title="Related reading."
        description="Technical writing that supports how I think about product engineering, AI systems, and web performance."
        compact
        className="pt-10"
      />
    </main>
  );
}
