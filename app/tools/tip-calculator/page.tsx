import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { softwareApplicationSchema } from "@/seo-utils/softwareApplicationSchema";
import { faqSchemaFrom } from "@/seo-utils/faqSchema";
import { HOST } from "@/data/constants";
import { toolKeywords } from "@/data/toolKeywords";
import TipCalculator from "@/components/pages/tools/tip-calculator";
import { FAQS } from "@/components/pages/tools/tip-calculator/content";

const url = `${HOST}/tools/tip-calculator`;
const title = "Free Tip Calculator & Bill Splitter — Split Any Bill Fairly";
const description =
  "Calculate the tip amount, total bill, and per-person share for any group size. Choose from preset tip percentages or enter a custom one. Free, instant, no sign-up.";
const keywords = toolKeywords["tip-calculator"];

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function TipCalculatorPage() {
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
            name: "Tip & Bill Splitter",
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
          __html: breadCrumbSchema("Tip & Bill Splitter", HOST, url),
        }}
      />
      <TipCalculator />
    </>
  );
}
