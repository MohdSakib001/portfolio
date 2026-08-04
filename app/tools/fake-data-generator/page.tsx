import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { softwareApplicationSchema } from "@/seo-utils/softwareApplicationSchema";
import { faqSchemaFrom } from "@/seo-utils/faqSchema";
import { HOST } from "@/data/constants";
import { toolKeywords } from "@/data/toolKeywords";
import FakeDataGenerator from "@/components/pages/tools/fake-data-generator";
import { FAQS } from "@/components/pages/tools/fake-data-generator/content";

const url = `${HOST}/tools/fake-data-generator`;
const title = "Free Fake Data Generator — Generate Test Data Online";
const description =
  "Generate realistic fake data for testing: names, emails, phones, addresses, UUIDs, credit cards and more. Export as JSON, CSV, SQL INSERT, or JavaScript array. Free, no sign-up, runs in your browser.";
const keywords = toolKeywords["fake-data-generator"];

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function FakeDataGeneratorPage() {
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
            name: "Fake Data Generator",
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
          __html: breadCrumbSchema("Fake Data Generator", HOST, url),
        }}
      />
      <FakeDataGenerator />
    </>
  );
}
