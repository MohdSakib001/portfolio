import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { personSchema } from "@/seo-utils/personSchema";
import { faqSchema } from "@/seo-utils/faqSchema";
import { profilePageSchema } from "@/seo-utils/profilePageSchema";
import Home from "../pages/home";
import { HOST } from "../data/constants";
import { homeKeyword } from "../data/keywords";

const url = HOST;
const title = `Mohd Sakib | Senior Full Stack & React Native Developer`;
const description = `Senior Full Stack Developer with 3+ years building production-grade SaaS, FinTech, EdTech, and AI products. Next.js, Node.js, React Native, TypeScript. 8 live products. 25K+ users served. Available for full-time & senior freelance — Delhi, India.`;
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
      <Home />
    </>
  );
}
