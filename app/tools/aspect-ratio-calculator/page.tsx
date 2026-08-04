import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { softwareApplicationSchema } from "@/seo-utils/softwareApplicationSchema";
import { faqSchemaFrom } from "@/seo-utils/faqSchema";
import { HOST } from "@/data/constants";
import { toolKeywords } from "@/data/toolKeywords";
import AspectRatioCalculator from "@/components/pages/tools/aspect-ratio-calculator";
import { FAQS } from "@/components/pages/tools/aspect-ratio-calculator/content";

const url = `${HOST}/tools/aspect-ratio-calculator`;
const title =
  "Free Aspect Ratio Calculator — Calculate, Scale & Compare Ratios";
const description =
  "Calculate simplified aspect ratios from pixel dimensions, scale one side from a known ratio, or compare two resolutions. Supports 16:9, 4:3, 1:1, 21:9 and more. Free, instant, no sign-up.";
const keywords = toolKeywords["aspect-ratio-calculator"];

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function AspectRatioCalculatorPage() {
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
            name: "Aspect Ratio Calculator",
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
          __html: breadCrumbSchema("Aspect Ratio Calculator", HOST, url),
        }}
      />
      <AspectRatioCalculator />
    </>
  );
}
