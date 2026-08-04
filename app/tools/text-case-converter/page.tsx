import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { softwareApplicationSchema } from "@/seo-utils/softwareApplicationSchema";
import { faqSchemaFrom } from "@/seo-utils/faqSchema";
import { HOST } from "@/data/constants";
import { toolKeywords } from "@/data/toolKeywords";
import TextCaseConverter from "@/components/pages/tools/text-case-converter";
import { FAQS } from "@/components/pages/tools/text-case-converter/content";

const url = `${HOST}/tools/text-case-converter`;
const title =
  "Free Text Case Converter — UPPERCASE, lowercase, camelCase & More";
const description =
  "Instantly convert text to UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, or kebab-case. Free, no sign-up, runs in your browser.";
const keywords = toolKeywords["text-case-converter"];

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function TextCaseConverterPage() {
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
            name: "Text Case Converter",
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
          __html: breadCrumbSchema("Text Case Converter", HOST, url),
        }}
      />
      <TextCaseConverter />
    </>
  );
}
