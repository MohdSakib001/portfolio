import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { softwareApplicationSchema } from "@/seo-utils/softwareApplicationSchema";
import { faqSchemaFrom } from "@/seo-utils/faqSchema";
import { HOST } from "@/data/constants";
import { toolKeywords } from "@/data/toolKeywords";
import ApiMockBuilder from "@/components/pages/tools/api-mock-builder";
import { FAQS } from "@/components/pages/tools/api-mock-builder/content";

const url = `${HOST}/tools/api-mock-builder`;
const title =
  "API Mock Builder — Generate curl, fetch & JSON Responses Instantly";
const description =
  "Build and preview API mock responses in seconds. Configure HTTP method, status code, headers, and response body. Generates curl commands and JavaScript fetch snippets. Free, browser-based, no signup required.";
const keywords = toolKeywords["api-mock-builder"];

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function ApiMockBuilderPage() {
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
            name: "API Mock Builder",
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
          __html: breadCrumbSchema("API Mock Builder", HOST, url),
        }}
      />
      <ApiMockBuilder />
    </>
  );
}
