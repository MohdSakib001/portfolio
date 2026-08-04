import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { softwareApplicationSchema } from "@/seo-utils/softwareApplicationSchema";
import { faqSchemaFrom } from "@/seo-utils/faqSchema";
import { HOST } from "@/data/constants";
import { ageCalculatorKeyword } from "@/data/keywords";
import AgeCalculator from "@/components/pages/tools/age-calculator";
import { FAQS } from "@/components/pages/tools/age-calculator/content";

const url = `${HOST}/tools/age-calculator`;
const title = `Free Age Calculator — Exact Age in Years, Months & Days`;
const description = `Calculate your exact age in years, months, days, and hours from your date of birth. Find your zodiac sign, the day of the week you were born, and your next birthday countdown. Free, instant, and fully private.`;
const keywords = ageCalculatorKeyword;

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function AgeCalculatorPage() {
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
            name: "Age Calculator",
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
          __html: breadCrumbSchema("Age Calculator", HOST, url),
        }}
      />
      <AgeCalculator />
    </>
  );
}
