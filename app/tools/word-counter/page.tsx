import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { softwareApplicationSchema } from "@/seo-utils/softwareApplicationSchema";
import { faqSchemaFrom } from "@/seo-utils/faqSchema";
import { HOST } from "@/data/constants";
import { toolKeywords } from "@/data/toolKeywords";
import WordCounter from "@/components/pages/tools/word-counter";
import { FAQS } from "@/components/pages/tools/word-counter/content";

const url = `${HOST}/tools/word-counter`;
const title =
  "Free Word Counter — Count Words, Characters & Reading Time Online";
const description =
  "Instantly count words, characters, sentences, paragraphs, and reading time as you type. Free, no sign-up, runs entirely in your browser. Nothing sent to any server.";
const keywords = toolKeywords["word-counter"];

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function WordCounterPage() {
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
            name: "Word Counter",
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
          __html: breadCrumbSchema("Word Counter", HOST, url),
        }}
      />
      <WordCounter />
    </>
  );
}
