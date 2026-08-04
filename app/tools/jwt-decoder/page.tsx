import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { softwareApplicationSchema } from "@/seo-utils/softwareApplicationSchema";
import { faqSchemaFrom } from "@/seo-utils/faqSchema";
import { HOST } from "@/data/constants";
import { toolKeywords } from "@/data/toolKeywords";
import JwtDecoder from "@/components/pages/tools/jwt-decoder";
import { FAQS } from "@/components/pages/tools/jwt-decoder/content";

const url = `${HOST}/tools/jwt-decoder`;
const title = "Free JWT Decoder — Decode JSON Web Tokens Instantly";
const description =
  "Paste any JWT and instantly see the decoded header, payload, expiry date, and issued-at timestamp. Colour-coded sections, expiry status. Runs entirely in your browser — nothing is sent anywhere.";
const keywords = toolKeywords["jwt-decoder"];

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function JwtDecoderPage() {
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
            name: "JWT Decoder",
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
          __html: breadCrumbSchema("JWT Decoder", HOST, url),
        }}
      />
      <JwtDecoder />
    </>
  );
}
