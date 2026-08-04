import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { softwareApplicationSchema } from "@/seo-utils/softwareApplicationSchema";
import { faqSchemaFrom } from "@/seo-utils/faqSchema";
import { HOST } from "@/data/constants";
import { toolKeywords } from "@/data/toolKeywords";
import MemeGenerator from "@/components/pages/tools/meme-generator";
import { FAQS } from "@/components/pages/tools/meme-generator/content";

const url = `${HOST}/tools/meme-generator`;
const title = "Free Meme Generator — Create Memes Online with Custom Text";
const description =
  "Create hilarious memes in seconds. Pick a popular template or upload your own image, add top and bottom text, customize font size and color, then download as PNG. 100% free, no login.";
const keywords = toolKeywords["meme-generator"];

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function MemeGeneratorPage() {
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
            name: "Meme Generator",
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
          __html: breadCrumbSchema("Meme Generator", HOST, url),
        }}
      />
      <MemeGenerator />
    </>
  );
}
