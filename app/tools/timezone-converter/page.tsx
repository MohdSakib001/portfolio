import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { softwareApplicationSchema } from "@/seo-utils/softwareApplicationSchema";
import { faqSchemaFrom } from "@/seo-utils/faqSchema";
import { HOST } from "@/data/constants";
import { toolKeywords } from "@/data/toolKeywords";
import TimezoneConverter from "@/components/pages/tools/timezone-converter";
import { FAQS } from "@/components/pages/tools/timezone-converter/content";

const url = `${HOST}/tools/timezone-converter`;
const title = "Free Time Zone Converter — World Clock for Any City";
const description =
  "Convert times across world time zones instantly. See New York, London, Dubai, Tokyo, Sydney and 30+ cities simultaneously. Free, browser-based, no sign-up required.";
const keywords = toolKeywords["timezone-converter"];

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function TimezoneConverterPage() {
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
            name: "Time Zone Converter",
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
          __html: breadCrumbSchema("Time Zone Converter", HOST, url),
        }}
      />
      <TimezoneConverter />
    </>
  );
}
