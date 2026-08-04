import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { softwareApplicationSchema } from "@/seo-utils/softwareApplicationSchema";
import { faqSchemaFrom } from "@/seo-utils/faqSchema";
import { HOST } from "@/data/constants";
import { toolKeywords } from "@/data/toolKeywords";
import JsonFormatter from "@/components/pages/tools/json-formatter";
import { FAQS } from "@/components/pages/tools/json-formatter/content";

const url = `${HOST}/tools/json-formatter`;
const title = "Free JSON Formatter & Diff — Validate, Beautify & Compare JSON";
const description =
  "Format and validate JSON with syntax highlighting. Minify JSON, or use diff mode to compare two JSON blobs side by side. Free, browser-based, nothing sent to any server.";
const keywords = toolKeywords["json-formatter"];

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function JsonFormatterPage() {
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
            name: "JSON Formatter & Diff",
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
          __html: breadCrumbSchema("JSON Formatter & Diff", HOST, url),
        }}
      />
      <JsonFormatter />
    </>
  );
}
