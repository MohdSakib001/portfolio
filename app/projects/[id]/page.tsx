import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { personSchema } from "@/seo-utils/personSchema";
import { softwareApplicationSchema } from "@/seo-utils/softwareApplicationSchema";
import { projects } from "@/data/projects";
import { HOST } from "@/data/constants";
import { notFound } from "next/navigation";
import ProjectPage from "@/components/pages/projects/project/page";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return {};

  const url = `${HOST}/projects/${id}`;
  const title = `${project.name} — ${project.tagline} | Mohd Sakib`;
  const description = `${project.overview.problem} Built by Mohd Sakib using ${project.stack.join(", ")}.`;

  return {
    ...createMetaData({ title, description, keywords: project.stack, url }),
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();

  const url = `${HOST}/projects/${id}`;
  const title = `${project.name} — ${project.tagline} | Mohd Sakib`;
  const description = `${project.overview.problem} Built by Mohd Sakib using ${project.stack.join(", ")}.`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: webPageSchema(title, description, url),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: personSchema() }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: softwareApplicationSchema(project),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: siteNavigationElement() }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadCrumbSchema(title, HOST, url),
        }}
      />
      <ProjectPage project={project} />
    </>
  );
}
