import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { softwareApplicationSchema } from "@/seo-utils/softwareApplicationSchema";
import { faqSchemaFrom } from "@/seo-utils/faqSchema";
import { HOST } from "@/data/constants";
import { toolKeywords } from "@/data/toolKeywords";
import QrCodeGenerator from "@/components/pages/tools/qr-code-generator";
import { FAQS } from "@/components/pages/tools/qr-code-generator/content";

const url = `${HOST}/tools/qr-code-generator`;
const title = "Free QR Code Generator — Create QR Codes for URLs, WiFi & More";
const description =
  "Generate QR codes instantly for URLs, plain text, WiFi networks, and email links. Choose colors, error correction level, and download as PNG. 100% free, runs in your browser.";
const keywords = toolKeywords["qr-code-generator"];

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function QrCodeGeneratorPage() {
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
            name: "QR Code Generator",
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
          __html: breadCrumbSchema("QR Code Generator", HOST, url),
        }}
      />
      <QrCodeGenerator />
    </>
  );
}
