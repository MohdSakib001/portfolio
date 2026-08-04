import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { softwareApplicationSchema } from "@/seo-utils/softwareApplicationSchema";
import { faqSchemaFrom } from "@/seo-utils/faqSchema";
import { HOST } from "@/data/constants";
import { toolKeywords } from "@/data/toolKeywords";
import UnitConverter from "@/components/pages/tools/unit-converter";
import { FAQS } from "@/components/pages/tools/unit-converter/content";

const url = `${HOST}/tools/unit-converter`;
const title =
  "Free Unit Converter — Length, Weight, Temperature, Volume & More";
const description =
  "Convert units across length, weight, temperature, volume, speed, area, and data size. All conversions happen instantly in your browser. Free, no sign-up.";
const keywords = toolKeywords["unit-converter"];

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function UnitConverterPage() {
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
            name: "Unit Converter",
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
          __html: breadCrumbSchema("Unit Converter", HOST, url),
        }}
      />
      <UnitConverter />
    </>
  );
}
