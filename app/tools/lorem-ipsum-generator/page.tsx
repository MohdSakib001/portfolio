import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { softwareApplicationSchema } from "@/seo-utils/softwareApplicationSchema";
import { faqSchemaFrom } from "@/seo-utils/faqSchema";
import { HOST } from "@/data/constants";
import { toolKeywords } from "@/data/toolKeywords";
import LoremIpsumGenerator from "@/components/pages/tools/lorem-ipsum-generator";
import { FAQS } from "@/components/pages/tools/lorem-ipsum-generator/content";

const url = `${HOST}/tools/lorem-ipsum-generator`;
const title = "Free Lorem Ipsum Generator — Words, Sentences & Paragraphs";
const description =
  "Generate Lorem Ipsum placeholder text by words, sentences, or paragraphs. Classic or randomised. One-click copy. Free, instant, browser-based — ideal for UI mockups and design.";
const keywords = toolKeywords["lorem-ipsum-generator"];

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function LoremIpsumGeneratorPage() {
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
            name: "Lorem Ipsum Generator",
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
          __html: breadCrumbSchema("Lorem Ipsum Generator", HOST, url),
        }}
      />
      <LoremIpsumGenerator />
    </>
  );
}
