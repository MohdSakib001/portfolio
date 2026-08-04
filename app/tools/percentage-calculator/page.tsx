import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { softwareApplicationSchema } from "@/seo-utils/softwareApplicationSchema";
import { faqSchemaFrom } from "@/seo-utils/faqSchema";
import { HOST } from "@/data/constants";
import { toolKeywords } from "@/data/toolKeywords";
import PercentageCalculator from "@/components/pages/tools/percentage-calculator";
import { FAQS } from "@/components/pages/tools/percentage-calculator/content";

const url = `${HOST}/tools/percentage-calculator`;
const title =
  "Free Percentage Calculator — 3 Modes: What Is X%, X is What %, % Change";
const description =
  "Calculate percentages instantly with 3 modes: What is X% of Y, X is what percent of Y, and percentage change from X to Y. Free, no sign-up, works in your browser.";
const keywords = toolKeywords["percentage-calculator"];

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function PercentageCalculatorPage() {
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
            name: "Percentage Calculator",
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
          __html: breadCrumbSchema("Percentage Calculator", HOST, url),
        }}
      />
      <PercentageCalculator />
    </>
  );
}
