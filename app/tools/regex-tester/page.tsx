import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { softwareApplicationSchema } from "@/seo-utils/softwareApplicationSchema";
import { faqSchemaFrom } from "@/seo-utils/faqSchema";
import { HOST } from "@/data/constants";
import { toolKeywords } from "@/data/toolKeywords";
import RegexTester from "@/components/pages/tools/regex-tester";
import { FAQS } from "@/components/pages/tools/regex-tester/content";

const url = `${HOST}/tools/regex-tester`;
const title = "Free Regex Tester — Test & Debug Regular Expressions Online";
const description =
  "Test regular expressions against live input with real-time match highlighting. Supports all standard flags (g, i, m, s), capture groups, and a replace mode. Free, browser-based.";
const keywords = toolKeywords["regex-tester"];

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function RegexTesterPage() {
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
            name: "Regex Tester",
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
          __html: breadCrumbSchema("Regex Tester", HOST, url),
        }}
      />
      <RegexTester />
    </>
  );
}
