import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) return {};

  const title = `${project.name} — ${project.tagline}`;
  const description = `${project.overview.problem} Built by Mohd Sakib using ${project.stack.join(", ")}. ${Object.values(project.metrics).join(" · ")}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://mohdsakib.vercel.app/projects/${id}`,
    },
    openGraph: {
      title: `${project.name} | Mohd Sakib`,
      description,
      type: "website",
      url: `https://mohdsakib.vercel.app/projects/${id}`,
      images: [
        {
          url: project.hero.src,
          width: 1200,
          height: 630,
          alt: `${project.name} — ${project.tagline}`,
        },
      ],
    },
    twitter: {
      title: `${project.name} | Mohd Sakib`,
      description,
      card: "summary_large_image",
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) notFound();

  const softwareApplicationSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    description: project.tagline,
    url:
      project.links.live && project.links.live !== "#"
        ? project.links.live
        : undefined,
    applicationCategory: "WebApplication",
    operatingSystem: "Web",
    author: {
      "@type": "Person",
      "@id": "https://mohdsakib.vercel.app/#person",
      name: "Mohd Sakib",
      url: "https://mohdsakib.vercel.app",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  });

  const breadcrumbSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://mohdsakib.vercel.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: "https://mohdsakib.vercel.app/projects",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.name,
        item: `https://mohdsakib.vercel.app/projects/${project.id}`,
      },
    ],
  });

  return (
    <main className="bg-white text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: softwareApplicationSchema }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
      />

      {/* BACK LINK */}
      <div className="px-6 md:px-16 pt-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] opacity-50 hover:opacity-100 transition-opacity"
        >
          <span>←</span>
          <span>All Projects</span>
        </Link>
      </div>

      {/* HERO */}
      <section className="relative h-[80vh] w-full mt-4">
        {project.hero.type === "image" ? (
          <Image
            src={project.hero.src}
            alt={`${project.name} — ${project.tagline}`}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <video
            src={project.hero.src}
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute bottom-10 left-10 text-white">
          <p className="text-xs uppercase tracking-[0.2em] opacity-60 mb-2">
            {project.category}
          </p>
          <h1 className="text-5xl md:text-7xl font-semibold">{project.name}</h1>
          <p className="mt-2 opacity-80 max-w-lg">{project.tagline}</p>
        </div>
      </section>

      {/* METRICS */}
      <section className="px-6 md:px-16 py-16 border-b">
        <div className="flex flex-wrap gap-6 text-lg">
          {Object.values(project.metrics).map((m, i) => (
            <div key={i} className="border px-4 py-2 text-sm font-medium">
              {m}
            </div>
          ))}
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="px-6 md:px-16 py-24 grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-xs uppercase tracking-[0.2em] opacity-40 mb-4">
            The Problem
          </h2>
          <p className="opacity-70 leading-relaxed">
            {project.overview.problem}
          </p>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-[0.2em] opacity-40 mb-4">
            The Solution
          </h2>
          <p className="opacity-70 leading-relaxed">
            {project.overview.solution}
          </p>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-[0.2em] opacity-40 mb-4">
            My Role
          </h2>
          <p className="opacity-70">{project.overview.myRole}</p>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-[0.2em] opacity-40 mb-4">
            Timeline
          </h2>
          <p className="opacity-70">{project.overview.timeline}</p>
        </div>
      </section>

      {/* GALLERY */}
      <section className="px-6 md:px-16 py-24">
        <h2 className="text-4xl mb-12">Product</h2>

        <div className="flex flex-col gap-10">
          {project.gallery.map((item, i) => (
            <div key={i} className="relative w-full h-[400px]">
              {item.type === "image" ? (
                <Image
                  src={item.src}
                  alt={`${project.name} screenshot ${i + 1}`}
                  fill
                  className="object-cover"
                />
              ) : (
                <video
                  src={item.src}
                  autoPlay
                  loop
                  muted
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section className="px-6 md:px-16 py-24 border-t">
        <h2 className="text-4xl mb-12">Architecture</h2>

        <div className="grid md:grid-cols-2 gap-10 text-sm">
          <div>
            <p className="font-semibold mb-2">Frontend</p>
            <p className="opacity-70">{project.architecture.frontend}</p>
          </div>

          <div>
            <p className="font-semibold mb-2">Backend</p>
            <p className="opacity-70">{project.architecture.backend}</p>
          </div>

          {project.architecture.realtime && (
            <div>
              <p className="font-semibold mb-2">Realtime</p>
              <p className="opacity-70">{project.architecture.realtime}</p>
            </div>
          )}

          {project.architecture.infra && (
            <div>
              <p className="font-semibold mb-2">Infrastructure</p>
              <p className="opacity-70">{project.architecture.infra}</p>
            </div>
          )}
        </div>

        <div className="mt-12">
          <p className="text-xs uppercase tracking-[0.2em] opacity-40 mb-4">
            Tech Stack
          </p>
          <div className="flex flex-wrap gap-3">
            {project.stack.map((tech) => (
              <span key={tech} className="px-3 py-1.5 border text-xs font-mono">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="px-6 md:px-16 py-24 border-t">
        <h2 className="text-4xl mb-12">Impact</h2>

        <div className="flex flex-col gap-6">
          {project.achievements.map((a, i) => (
            <div key={i} className="flex gap-4">
              <span className="text-xs opacity-30 mt-1 font-mono">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-base leading-relaxed opacity-80">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 md:px-16 py-24 border-t">
        <h2 className="text-4xl mb-12">Features</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {project.features.map((f, i) => (
            <div key={i} className="border p-4 text-sm">
              {f}
            </div>
          ))}
        </div>
      </section>

      {/* LINKS */}
      <section className="px-6 md:px-16 py-24 border-t">
        <h2 className="text-4xl mb-8">Explore</h2>

        <div className="flex flex-wrap gap-4">
          {project.links.live && project.links.live !== "#" && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-black text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
            >
              Live Project ↗
            </a>
          )}
          {project.links.github && project.links.github !== "#" && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border text-sm font-medium hover:bg-neutral-50 transition-colors"
            >
              Source Code ↗
            </a>
          )}
          {project.links.playstore && project.links.playstore !== "#" && (
            <a href={project.links.playstore} target="_blank" rel="noreferrer">
              <Image
                width={140}
                height={44}
                src="/assets/playstore.webp"
                alt="Get it on Google Play"
                className="h-12 w-auto"
              />
            </a>
          )}
          {project.links.appstore && project.links.appstore !== "#" && (
            <a href={project.links.appstore} target="_blank" rel="noreferrer">
              <Image
                width={140}
                height={44}
                src="/assets/appstore.webp"
                alt="Download on the App Store"
                className="h-12 w-auto"
              />
            </a>
          )}
        </div>
      </section>
    </main>
  );
}
