import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import Container from "@/components/Container";
import GridSection from "@/components/GridSection";
import PrimaryButton from "@/components/primaryButton";
import MyLink from "@/components/Link";
import FloatingButton from "@/components/common/floatingButton";
import { aboutContent } from "@/data/about";
import { TESTIMONIALS } from "@/data/testimonials";
import { email } from "@/data/constants";

const contactHref = `mailto:${email}?subject=${encodeURIComponent(
  "Let's work together",
)}`;

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* HERO */}
      <Container className="pt-40 pb-10">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p className="mb-4 text-label font-medium uppercase tracking-[0.25em] text-black/40">
              {aboutContent.eyebrow}
            </p>
            <h1 className="max-w-3xl text-display font-semibold leading-none tracking-tight">
              {aboutContent.title}
            </h1>
            <p className="mt-6 max-w-2xl text-body leading-relaxed text-black/60">
              {aboutContent.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <PrimaryButton
                href={contactHref}
                title="Start a conversation"
                text="Start a conversation"
                size="base"
              />
              <MyLink href="/projects" title="See my work" text="See my work" />
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <div className="relative overflow-hidden rounded-4xl bg-[#E6E0F8] p-3">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-45"
                style={{
                  backgroundImage: `url("/assets/paper-texture.avif")`,
                  backgroundSize: "cover",
                }}
              />
              <div className="relative aspect-[3/4] overflow-hidden rounded-[26px] bg-white/50">
                <Image
                  src="/assets/me/1.png"
                  alt="Mohd Sakib"
                  fill
                  sizes="(max-width: 1024px) 100vw, 384px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* STATS */}
      <Container className="py-10">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {aboutContent.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-white/85 p-6 shadow-[0_0_0_1px_rgba(3,3,2,0.06),0_4px_24px_rgba(3,3,2,0.06)]"
            >
              <p className="font-mono text-3xl font-semibold tracking-tight tabular-nums">
                {stat.value}
              </p>
              <p className="mt-2 text-label uppercase tracking-[0.16em] text-black/45">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>

      {/* STORY */}
      <Container className="py-10">
        <div className="grid gap-10 lg:grid-cols-[0.4fr_0.6fr] lg:items-start">
          <div>
            <p className="text-label font-medium uppercase tracking-[0.25em] text-black/30">
              The Short Version
            </p>
            <h2 className="mt-3 text-heading font-semibold leading-none tracking-tight">
              Craft over decoration, shipped over perfect.
            </h2>
          </div>
          <div className="space-y-5">
            {aboutContent.story.map((paragraph, index) => (
              <p
                key={index}
                className="text-body leading-relaxed text-black/65"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Container>

      {/* CAPABILITIES */}
      <GridSection
        topic="What I Do"
        title="Senior execution across the stack."
        description="From product frontends and mobile apps to AI systems and the infrastructure that keeps them fast — the range that lets one engineer own a build end to end."
        cards={[...aboutContent.capabilities]}
      />

      {/* VALUES */}
      <Container className="py-10">
        <div className="mb-10">
          <p className="mb-3 text-label font-medium uppercase tracking-[0.25em] text-black/30">
            How I Work
          </p>
          <h2 className="text-heading font-semibold leading-none tracking-tight">
            Senior delivery without the agency fog.
          </h2>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {aboutContent.values.map((value) => (
            <div
              key={value.title}
              className="rounded-2xl border border-black/6 bg-white p-6 shadow-[0_0_0_1px_rgba(3,3,2,0.04),0_4px_24px_rgba(3,3,2,0.06)]"
            >
              <h3 className="text-lg font-semibold leading-tight tracking-tight">
                {value.title}
              </h3>
              <p className="mt-3 text-caption leading-relaxed text-black/55">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </Container>

      {/* TESTIMONIALS */}
      <Container className="py-10">
        <div className="mb-10">
          <p className="mb-3 text-label font-medium uppercase tracking-[0.25em] text-black/30">
            In Their Words
          </p>
          <h2 className="text-heading font-semibold leading-none tracking-tight">
            Founders I&apos;ve shipped with.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {TESTIMONIALS.map((testimonial) => (
            <figure
              key={testimonial.id}
              className="flex flex-col justify-between rounded-2xl bg-[#F4EDDA] p-6 md:p-8"
            >
              <blockquote className="text-title font-display italic leading-snug">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-[13px] font-semibold text-black/50">
                  {testimonial.name[0]}
                </span>
                <span className="text-caption font-medium text-black/70">
                  {testimonial.name}
                </span>
                <span className="text-label uppercase tracking-[0.12em] text-black/40">
                  {testimonial.company}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>

      {/* CTA */}
      <section className="px-4 pb-24 sm:px-6 md:px-10 lg:mx-auto lg:max-w-6xl lg:px-16">
        <div className="relative overflow-hidden rounded-4xl bg-black p-8 text-white md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="mb-3 text-label font-medium uppercase tracking-[0.25em] text-white/35">
                Available For Remote Work
              </p>
              <h2 className="max-w-3xl text-heading font-semibold leading-none tracking-tight">
                Have a product worth building? Let&apos;s talk.
              </h2>
              <p className="mt-4 max-w-xl text-caption leading-relaxed text-white/55">
                Fixed-scope builds, monthly retainers, technical rebuilds, or
                senior engineering support for an existing team.
              </p>
            </div>
            <a
              href={contactHref}
              className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-label font-semibold uppercase tracking-[0.12em] text-black transition hover:bg-neutral-200"
            >
              Start a conversation
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
        <FloatingButton href="/projects" title="Explore the work" />
      </section>
    </main>
  );
}
