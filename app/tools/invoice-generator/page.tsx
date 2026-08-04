import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { softwareApplicationSchema } from "@/seo-utils/softwareApplicationSchema";
import { faqSchemaFrom } from "@/seo-utils/faqSchema";
import { HOST } from "@/data/constants";
import { toolKeywords } from "@/data/toolKeywords";
import InvoiceGenerator from "@/components/pages/tools/invoice-generator";
import { FAQS } from "@/components/pages/tools/invoice-generator/content";

const url = `${HOST}/tools/invoice-generator`;
const title =
  "Free Invoice Generator — Create & Download Professional Invoices";
const description =
  "Generate professional invoices instantly. Add line items, apply tax and discount, preview in real time, and print or save as PDF. Free, no sign-up required.";
const keywords = toolKeywords["invoice-generator"];

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function InvoiceGeneratorPage() {
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
            name: "Invoice Generator",
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
          __html: breadCrumbSchema("Invoice Generator", HOST, url),
        }}
      />
      <InvoiceGenerator />
    </>
  );
}
