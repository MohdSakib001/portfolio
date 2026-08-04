import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { softwareApplicationSchema } from "@/seo-utils/softwareApplicationSchema";
import { faqSchemaFrom } from "@/seo-utils/faqSchema";
import { HOST } from "@/data/constants";
import { toolKeywords } from "@/data/toolKeywords";
import BmiCalculator from "@/components/pages/tools/bmi-calculator";
import { FAQS } from "@/components/pages/tools/bmi-calculator/content";

const url = `${HOST}/tools/bmi-calculator`;
const title = "Free BMI Calculator — Body Mass Index with Visual Scale";
const description =
  "Calculate your BMI (Body Mass Index) in metric or imperial units instantly. See your category — underweight, normal, overweight, or obese — on a visual colour-coded scale.";
const keywords = toolKeywords["bmi-calculator"];

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function BmiCalculatorPage() {
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
            name: "BMI Calculator",
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
          __html: breadCrumbSchema("BMI Calculator", HOST, url),
        }}
      />
      <BmiCalculator />
    </>
  );
}
