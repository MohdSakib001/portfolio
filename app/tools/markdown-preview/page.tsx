import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { softwareApplicationSchema } from "@/seo-utils/softwareApplicationSchema";
import { faqSchemaFrom } from "@/seo-utils/faqSchema";
import { HOST } from "@/data/constants";
import { toolKeywords } from "@/data/toolKeywords";
import MarkdownPreview from "@/components/pages/tools/markdown-preview";
import { FAQS } from "@/components/pages/tools/markdown-preview/content";

const url = `${HOST}/tools/markdown-preview`;
const title = "Markdown Preview — Live Split-Pane Editor & HTML Renderer";
const description =
  "Write Markdown on the left, see rendered HTML on the right in real time. Supports headings, bold, italic, tables, code blocks, blockquotes, links, and more. Free, no account needed.";
const keywords = toolKeywords["markdown-preview"];

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function MarkdownPreviewPage() {
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
            name: "Markdown Preview",
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
          __html: breadCrumbSchema("Markdown Preview", HOST, url),
        }}
      />
      <MarkdownPreview />
    </>
  );
}
