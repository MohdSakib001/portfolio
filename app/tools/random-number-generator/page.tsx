import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { softwareApplicationSchema } from "@/seo-utils/softwareApplicationSchema";
import { faqSchemaFrom } from "@/seo-utils/faqSchema";
import { HOST } from "@/data/constants";
import { toolKeywords } from "@/data/toolKeywords";
import RandomNumberGenerator from "@/components/pages/tools/random-number-generator";
import { FAQS } from "@/components/pages/tools/random-number-generator/content";

const url = `${HOST}/tools/random-number-generator`;
const title =
  "Free Random Number Generator — Single or Bulk, Integer or Decimal";
const description =
  "Generate random numbers within any range. Choose count (up to 500), integers or decimals, unique values only, and ascending sort. Copy or use instantly. Free, browser-based.";
const keywords = toolKeywords["random-number-generator"];

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function RandomNumberGeneratorPage() {
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
            name: "Random Number Generator",
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
          __html: breadCrumbSchema("Random Number Generator", HOST, url),
        }}
      />
      <RandomNumberGenerator />
    </>
  );
}
