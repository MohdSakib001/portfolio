import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { personSchema } from "@/seo-utils/personSchema";
import { faqSchema } from "@/seo-utils/faqSchema";
import { profilePageSchema } from "@/seo-utils/profilePageSchema";
import ProjectsArchive from "@/pages/projects/page";
import { HOST } from "@/data/constants";
import { projectsKeyword } from "@/data/keywords";

const url = HOST;
const title =
  "Projects | Mohd Sakib — Freelance Full Stack & React Native Developer India";
const description =
  "Production-grade SaaS, AI, FinTech, EdTech, and real-time systems built for startups and businesses worldwide. Senior Full Stack Developer from India specializing in Next.js, React Native, Node.js, Redis, WebSockets, scalable backend architecture, and high-performance applications.";
const keywords = projectsKeyword;

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function HomePage() {
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
        dangerouslySetInnerHTML={{ __html: faqSchema() }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: siteNavigationElement() }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadCrumbSchema(title, HOST, url) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: profilePageSchema() }}
      />
      <ProjectsArchive />
    </>
  );
}
