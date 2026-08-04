import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { softwareApplicationSchema } from "@/seo-utils/softwareApplicationSchema";
import { faqSchemaFrom } from "@/seo-utils/faqSchema";
import { HOST } from "@/data/constants";
import { toolKeywords } from "@/data/toolKeywords";
import FlashcardMaker from "@/components/pages/tools/flashcard-maker";
import { FAQS } from "@/components/pages/tools/flashcard-maker/content";

const url = `${HOST}/tools/flashcard-maker`;
const title = "Free Flashcard Maker — Study with Digital Flashcards Online";
const description =
  "Create, edit, and study digital flashcards in your browser. Flip cards with 3D animation, track your score, shuffle your deck, and import from CSV. Free, no account needed.";
const keywords = toolKeywords["flashcard-maker"];

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function FlashcardMakerPage() {
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
            name: "Flashcard Maker",
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
          __html: breadCrumbSchema("Flashcard Maker", HOST, url),
        }}
      />
      <FlashcardMaker />
    </>
  );
}
