import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { softwareApplicationSchema } from "@/seo-utils/softwareApplicationSchema";
import { faqSchemaFrom } from "@/seo-utils/faqSchema";
import { HOST } from "@/data/constants";
import { toolKeywords } from "@/data/toolKeywords";
import ImageResizer from "@/components/pages/tools/image-resizer";
import { FAQS } from "@/components/pages/tools/image-resizer/content";

const url = `${HOST}/tools/image-resizer`;
const title =
  "Free Image Resizer — Resize Images Online to Any Size (No Upload)";
const description =
  "Resize any image to exact pixels, percentage, or social media dimensions — 100% in your browser. No files are ever uploaded. Supports JPEG, PNG, and WebP output with quality control.";
const keywords = toolKeywords["image-resizer"];

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function ImageResizerPage() {
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
            name: "Image Resizer",
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
          __html: breadCrumbSchema("Image Resizer", HOST, url),
        }}
      />
      <ImageResizer />
    </>
  );
}
