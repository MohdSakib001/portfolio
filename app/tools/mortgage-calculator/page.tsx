import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { softwareApplicationSchema } from "@/seo-utils/softwareApplicationSchema";
import { faqSchemaFrom } from "@/seo-utils/faqSchema";
import { HOST } from "@/data/constants";
import { toolKeywords } from "@/data/toolKeywords";
import MortgageCalculator from "@/components/pages/tools/mortgage-calculator";
import { FAQS } from "@/components/pages/tools/mortgage-calculator/content";

const url = `${HOST}/tools/mortgage-calculator`;
const title =
  "Free Mortgage Calculator — Monthly Payment & Amortization Schedule";
const description =
  "Calculate your monthly mortgage payment, total interest paid, and full amortization schedule. Enter loan amount, interest rate, term, and down payment. Free, instant, no sign-up.";
const keywords = toolKeywords["mortgage-calculator"];

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function MortgageCalculatorPage() {
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
            name: "Mortgage & Loan Calculator",
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
          __html: breadCrumbSchema("Mortgage & Loan Calculator", HOST, url),
        }}
      />
      <MortgageCalculator />
    </>
  );
}
