import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { softwareApplicationSchema } from "@/seo-utils/softwareApplicationSchema";
import { faqSchemaFrom } from "@/seo-utils/faqSchema";
import { HOST } from "@/data/constants";
import { toolKeywords } from "@/data/toolKeywords";
import Notepad from "@/components/pages/tools/notepad";
import { FAQS } from "@/components/pages/tools/notepad/content";

const url = `${HOST}/tools/notepad`;
const title = "Free Online Notepad — Auto-Save, Distraction-Free Writing";
const description =
  "A minimal browser-based notepad that auto-saves to your browser as you type. Download as .txt or .md. No account needed, no ads, no distractions — just write.";
const keywords = toolKeywords["notepad"];

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function NotepadPage() {
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
            name: "Notepad",
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
          __html: breadCrumbSchema("Notepad", HOST, url),
        }}
      />
      <Notepad />
    </>
  );
}
