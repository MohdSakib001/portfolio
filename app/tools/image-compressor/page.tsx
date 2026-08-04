import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { softwareApplicationSchema } from "@/seo-utils/softwareApplicationSchema";
import { faqSchemaFrom } from "@/seo-utils/faqSchema";
import { HOST } from "@/data/constants";
import { toolKeywords } from "@/data/toolKeywords";
import ImageCompressor from "@/components/pages/tools/image-compressor";
import { FAQS } from "@/components/pages/tools/image-compressor/content";

const url = `${HOST}/tools/image-compressor`;
const title =
  "Free Image Compressor — Compress JPG, PNG, WebP Online (No Upload)";
const description =
  "Compress JPG, PNG, WebP, and GIF images directly in your browser. No files are uploaded to any server — 100% private, instant, and free.";
const keywords = toolKeywords["image-compressor"];

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function ImageCompressorPage() {
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
            name: "Image Compressor",
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
          __html: breadCrumbSchema("Image Compressor", HOST, url),
        }}
      />
      <ImageCompressor />
    </>
  );
}
