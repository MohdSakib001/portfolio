import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { softwareApplicationSchema } from "@/seo-utils/softwareApplicationSchema";
import { faqSchemaFrom } from "@/seo-utils/faqSchema";
import { HOST } from "@/data/constants";
import { toolKeywords } from "@/data/toolKeywords";
import PasswordGenerator from "@/components/pages/tools/password-generator";
import { FAQS } from "@/components/pages/tools/password-generator/content";

const url = `${HOST}/tools/password-generator`;
const title =
  "Free Password Generator — Strong Random Passwords with Strength Meter";
const description =
  "Generate strong, random passwords up to 128 characters with uppercase, lowercase, numbers, and symbols. Strength meter, one-click copy. Runs entirely in your browser — nothing stored.";
const keywords = toolKeywords["password-generator"];

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function PasswordGeneratorPage() {
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
            name: "Password Generator",
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
          __html: breadCrumbSchema("Password Generator", HOST, url),
        }}
      />
      <PasswordGenerator />
    </>
  );
}
