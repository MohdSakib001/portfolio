import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { softwareApplicationSchema } from "@/seo-utils/softwareApplicationSchema";
import { faqSchemaFrom } from "@/seo-utils/faqSchema";
import { HOST } from "@/data/constants";
import { toolKeywords } from "@/data/toolKeywords";
import CronBuilder from "@/components/pages/tools/cron-builder";
import { FAQS } from "@/components/pages/tools/cron-builder/content";

const url = `${HOST}/tools/cron-builder`;
const title =
  "Free Cron Expression Builder — Visual Cron Generator for n8n & GitHub Actions";
const description =
  "Build and validate cron expressions visually. Get a human-readable description, copy the expression, and use it in Linux crontab, n8n workflows, or GitHub Actions schedules. Free, browser-based.";
const keywords = toolKeywords["cron-builder"];

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function CronBuilderPage() {
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
        dangerouslySetInnerHTML={{
          __html: softwareApplicationSchema({
            name: "Cron Expression Builder",
            tagline: description,
            links: { live: url },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchemaFrom(FAQS) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: siteNavigationElement() }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadCrumbSchema("Cron Expression Builder", HOST, url),
        }}
      />
      <CronBuilder />
    </>
  );
}
