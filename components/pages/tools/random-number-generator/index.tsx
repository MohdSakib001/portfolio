import {
  Copy,
  Dices,
  ListOrdered,
  ShieldCheck,
  Shuffle,
  Sliders,
} from "lucide-react";

import ToolPage, { type ToolFeature } from "@/components/tools/ToolPage";
import RandomNumberGenerator from "./RandomNumberGenerator";
import { FAQS } from "./content";

const FEATURES: ToolFeature[] = [
  {
    title: "Cryptographic Source",
    description:
      "Uses the Web Crypto API rather than the predictable Math.random.",
    icon: Shuffle,
  },
  {
    title: "Any Range",
    description: "Set your own minimum and maximum bounds for the draw.",
    icon: Dices,
  },
  {
    title: "Bulk Generation",
    description: "Produce many numbers at once instead of rolling repeatedly.",
    icon: ListOrdered,
  },
  {
    title: "Unique Mode",
    description:
      "Exclude repeats when drawing winners or sampling without replacement.",
    icon: Copy,
  },
  {
    title: "One-Click Copy",
    description: "Copy the whole result set straight to the clipboard.",
    icon: Sliders,
  },
  {
    title: "No Seed Stored",
    description:
      "Nothing about your draws is recorded, logged, or transmitted.",
    icon: ShieldCheck,
  },
];

export default function RandomNumberGeneratorPage() {
  return (
    <ToolPage
      id="random-number-generator"
      heading="Random Number Generator."
      intro="Set your range and count — get cryptographically random results instantly."
      explainer={{
        heading: "What is a random number generator?",
        paragraphs: [
          "A random number generator produces numbers with no discernible pattern — each number in the range is equally likely. True randomness has applications across gaming, statistics, cryptography, education, and decision-making. This tool uses the browser's cryptographic random API to generate high-quality random numbers with no predictable sequence.",
        ],
      }}
      features={FEATURES}
      featuresDescription="Backed by the browser's crypto API rather than Math.random, so results are suitable for draws and sampling."
      faqs={FAQS}
      faqTitle="Random Number Generator FAQ."
    >
      <RandomNumberGenerator />
    </ToolPage>
  );
}
