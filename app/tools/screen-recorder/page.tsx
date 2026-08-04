import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { softwareApplicationSchema } from "@/seo-utils/softwareApplicationSchema";
import { faqSchemaFrom } from "@/seo-utils/faqSchema";
import { HOST } from "@/data/constants";
import { toolKeywords } from "@/data/toolKeywords";
import ScreenRecorder from "@/components/pages/tools/screen-recorder";
import { FAQS } from "@/components/pages/tools/screen-recorder/content";

const url = `${HOST}/tools/screen-recorder`;
const title =
  "Free Screen Recorder — Record Screen Online, No Extension Needed";
const description =
  "Record your screen directly in the browser with no extension or download needed. Supports system audio, microphone, and 1080p quality. Downloads as WebM. Works in Chrome, Edge, and Firefox.";
const keywords = toolKeywords["screen-recorder"];

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function ScreenRecorderPage() {
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
            name: "Screen Recorder",
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
          __html: breadCrumbSchema("Screen Recorder", HOST, url),
        }}
      />
      <ScreenRecorder />
    </>
  );
}
