import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { softwareApplicationSchema } from "@/seo-utils/softwareApplicationSchema";
import { faqSchemaFrom } from "@/seo-utils/faqSchema";
import { HOST } from "@/data/constants";
import { toolKeywords } from "@/data/toolKeywords";
import SqlFormatter from "@/components/pages/tools/sql-formatter";
import { FAQS } from "@/components/pages/tools/sql-formatter/content";

const url = `${HOST}/tools/sql-formatter`;
const title =
  "Free SQL Formatter & Beautifier — Format, Highlight & Minify SQL";
const description =
  "Format and beautify SQL queries with syntax highlighting. Uppercase keywords, indent SELECT columns, align WHERE conditions, and minify SQL. Free, browser-based, nothing sent to any server.";
const keywords = toolKeywords["sql-formatter"];

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function SqlFormatterPage() {
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
            name: "SQL Formatter",
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
          __html: breadCrumbSchema("SQL Formatter", HOST, url),
        }}
      />
      <SqlFormatter />
    </>
  );
}
