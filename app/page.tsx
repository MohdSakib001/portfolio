import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { faqSchema } from "@/seo-utils/faqSchema";
import { profilePageSchema } from "@/seo-utils/profilePageSchema";
import { HOST } from "../data/constants";
import { LOCATION, METRICS, TITLE } from "../data/profile";
import { homeKeyword } from "../data/keywords";
import Home from "@/components/pages/home";

const url = HOST;
const title = TITLE;
const description = `Senior Full Stack Developer building production-grade SaaS, FinTech, EdTech, and AI products. Next.js, Node.js, React Native, TypeScript. ${METRICS.products} live products. ${METRICS.usersShort} users served. Available for full-time & senior freelance — ${LOCATION.label}.`;
const keywords = homeKeyword;

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
      <Home />
    </>
  );
}
