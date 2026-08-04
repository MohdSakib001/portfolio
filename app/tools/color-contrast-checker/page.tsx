import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { softwareApplicationSchema } from "@/seo-utils/softwareApplicationSchema";
import { faqSchemaFrom } from "@/seo-utils/faqSchema";
import { HOST } from "@/data/constants";
import { toolKeywords } from "@/data/toolKeywords";
import ColorContrastChecker from "@/components/pages/tools/color-contrast-checker";
import { FAQS } from "@/components/pages/tools/color-contrast-checker/content";

const url = `${HOST}/tools/color-contrast-checker`;
const title = "Free Color Contrast Checker — WCAG AA & AAA Accessibility";
const description =
  "Check the contrast ratio between any two hex colours. Instant WCAG 2.1 AA and AAA pass/fail results for normal and large text. Essential for accessible web design.";
const keywords = toolKeywords["color-contrast-checker"];

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function ColorContrastCheckerPage() {
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
            name: "Color Contrast Checker",
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
          __html: breadCrumbSchema("Color Contrast Checker", HOST, url),
        }}
      />
      <ColorContrastChecker />
    </>
  );
}
