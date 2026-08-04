import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { softwareApplicationSchema } from "@/seo-utils/softwareApplicationSchema";
import { faqSchemaFrom } from "@/seo-utils/faqSchema";
import { HOST } from "@/data/constants";
import { toolKeywords } from "@/data/toolKeywords";
import Base64Encoder from "@/components/pages/tools/base64-encoder";
import { FAQS } from "@/components/pages/tools/base64-encoder/content";

const url = `${HOST}/tools/base64-encoder`;
const title = "Free Base64 Encoder / Decoder & URL Encoder — Browser-Based";
const description =
  "Encode and decode Base64 strings, URL-encode and decode text, all in one tool. Instant, browser-based, nothing sent to any server. Free, no sign-up required.";
const keywords = toolKeywords["base64-encoder"];

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function Base64EncoderPage() {
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
            name: "Base64 Encoder / Decoder",
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
          __html: breadCrumbSchema("Base64 Encoder / Decoder", HOST, url),
        }}
      />
      <Base64Encoder />
    </>
  );
}
