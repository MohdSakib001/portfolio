import {
  AlignLeft,
  Copy,
  LayoutTemplate,
  Ruler,
  ShieldCheck,
  Shuffle,
} from "lucide-react";

import ToolPage, { type ToolFeature } from "@/components/tools/ToolPage";
import LoremIpsumGenerator from "./LoremIpsumGenerator";
import { FAQS } from "./content";

const FEATURES: ToolFeature[] = [
  {
    title: "Classic Lorem Ipsum",
    description:
      "The canonical Cicero-derived text designers and printers have used for decades.",
    icon: AlignLeft,
  },
  {
    title: "Exact Length",
    description:
      "Generate by word, sentence, or paragraph count instead of trimming by hand.",
    icon: Ruler,
  },
  {
    title: "Randomised Mode",
    description:
      "Switch to scrambled gibberish when the familiar opening line is distracting.",
    icon: Shuffle,
  },
  {
    title: "One-Click Copy",
    description:
      "Send the whole block to your clipboard and straight into the mockup.",
    icon: Copy,
  },
  {
    title: "Layout Testing",
    description:
      "Stress-test line length, spacing, and overflow before real copy exists.",
    icon: LayoutTemplate,
  },
  {
    title: "No Sign-Up",
    description:
      "No account, no rate limit, and nothing recorded about what you generate.",
    icon: ShieldCheck,
  },
];

export default function LoremIpsumGeneratorPage() {
  return (
    <ToolPage
      id="lorem-ipsum-generator"
      heading="Lorem Ipsum Generator."
      intro="Placeholder text for designs and mockups — by word, sentence, or paragraph."
      explainer={{
        heading: "What is Lorem Ipsum?",
        paragraphs: [
          "Lorem Ipsum is the oldest and most widely used placeholder text in the design and printing industry. Derived from Cicero's philosophical treatise from 45 BC, it was deliberately scrambled so that readers focus on the visual presentation of text — typeface, spacing, line length — rather than the words themselves. Graphic designers, web developers, and UI/UX professionals reach for it every day when building mockups and wireframes.",
        ],
      }}
      features={FEATURES}
      featuresDescription="Filler text shaped to the exact length your layout needs, generated instantly and copied in one click."
      faqs={FAQS}
      faqTitle="Lorem Ipsum Generator FAQ."
    >
      <LoremIpsumGenerator />
    </ToolPage>
  );
}
