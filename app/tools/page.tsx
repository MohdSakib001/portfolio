import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { collectionPageSchema } from "@/seo-utils/collectionPageSchema";
import { HOST } from "@/data/constants";
import { toolsIndexKeywords } from "@/data/toolKeywords";
import { tools } from "@/data/tools";
import Tools from "@/components/pages/tools";

const liveTools = tools.filter((tool) => tool.status === "live");

const url = `${HOST}/tools`;
const title = `Free Online Tools — ${liveTools.length} Browser-Based Utilities`;
const description = `${liveTools.length} free browser-based tools — word counter, JSON formatter, QR code generator, image compressor, regex tester, Pomodoro timer, invoice generator, and more. No login. No ads. Nothing sent to any server.`;
const keywords = toolsIndexKeywords;

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function ToolsPage() {
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
          __html: collectionPageSchema({
            name: "Free Online Tools by Mohd Sakib",
            description,
            url,
            items: liveTools,
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: siteNavigationElement() }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadCrumbSchema("Tools", HOST, url),
        }}
      />
      <Tools />
    </>
  );
}
