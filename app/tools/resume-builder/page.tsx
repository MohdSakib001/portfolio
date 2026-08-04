import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { softwareApplicationSchema } from "@/seo-utils/softwareApplicationSchema";
import { faqSchemaFrom } from "@/seo-utils/faqSchema";
import { HOST } from "@/data/constants";
import { toolKeywords } from "@/data/toolKeywords";
import ResumeBuilder from "@/components/pages/tools/resume-builder";
import { FAQS } from "@/components/pages/tools/resume-builder/content";

const url = `${HOST}/tools/resume-builder`;
const title =
  "Free Resume Builder — Create a Professional CV Online & Download PDF";
const description =
  "Build a professional resume or CV online for free. Fill in your experience, education, and skills with a live preview. Download as PDF instantly — no sign-up, no watermark, ATS-friendly.";
const keywords = toolKeywords["resume-builder"];

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function ResumeBuilderPage() {
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
            name: "Resume / CV Builder",
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
          __html: breadCrumbSchema("Resume / CV Builder", HOST, url),
        }}
      />
      <ResumeBuilder />
    </>
  );
}
