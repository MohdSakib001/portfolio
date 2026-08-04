import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { softwareApplicationSchema } from "@/seo-utils/softwareApplicationSchema";
import { faqSchemaFrom } from "@/seo-utils/faqSchema";
import { HOST } from "@/data/constants";
import { toolKeywords } from "@/data/toolKeywords";
import N8nWorkflowValidator from "@/components/pages/tools/n8n-workflow-validator";
import { FAQS } from "@/components/pages/tools/n8n-workflow-validator/content";

const url = `${HOST}/tools/n8n-workflow-validator`;
const title =
  "Free n8n Workflow Validator — Check Connections & Orphaned Nodes";
const description =
  "Paste your n8n workflow JSON and instantly validate node connections, detect orphaned nodes, find missing parameters, identify disconnected subgraphs, and check for loops. Free, browser-based.";
const keywords = toolKeywords["n8n-workflow-validator"];

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function N8nWorkflowValidatorPage() {
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
            name: "n8n Workflow Validator",
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
          __html: breadCrumbSchema("n8n Workflow Validator", HOST, url),
        }}
      />
      <N8nWorkflowValidator />
    </>
  );
}
