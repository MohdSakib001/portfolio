import {
  GitCompare,
  Monitor,
  Ratio,
  Scaling,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import ToolPage, { type ToolFeature } from "@/components/tools/ToolPage";
import AspectRatioCalculator from "./AspectRatioCalculator";
import { FAQS } from "./content";

const FEATURES: ToolFeature[] = [
  {
    title: "Exact Reduction",
    description:
      "Euclidean GCD reduces any width and height pair to its smallest equivalent form.",
    icon: Ratio,
  },
  {
    title: "Scale Mode",
    description:
      "Enter one dimension and get the other back, locked to the ratio you picked.",
    icon: Scaling,
  },
  {
    title: "Compare Mode",
    description:
      "Check whether two resolutions share proportions before you commit to a crop.",
    icon: GitCompare,
  },
  {
    title: "Live Preview",
    description:
      "A proportional box redraws as you type, so the ratio is visible, not just numeric.",
    icon: Monitor,
  },
  {
    title: "Common Presets",
    description:
      "16:9, 4:3, 1:1, and 21:9 are one click away for the formats you actually ship.",
    icon: Sparkles,
  },
  {
    title: "Runs Locally",
    description:
      "Pure arithmetic in your browser — no upload, no request, no stored dimensions.",
    icon: ShieldCheck,
  },
];

export default function AspectRatioCalculatorPage() {
  return (
    <ToolPage
      id="aspect-ratio-calculator"
      heading="Aspect Ratio Calculator."
      intro="Calculate, scale, or compare aspect ratios — three modes, with an instant live preview."
      explainer={{
        heading: "About aspect ratios.",
        paragraphs: [
          "An aspect ratio defines the proportional relationship between a rectangle's width and height. It appears everywhere in modern media: the 16:9 standard governs YouTube videos, HD monitors, and smartphone screens in landscape mode; 4:3 remains common in older displays and photography; 1:1 is the square format Instagram popularised; and cinema-scope formats such as 21:9 deliver immersive widescreen experiences.",
          "In graphic design and photography, choosing the right ratio affects composition, print dimensions, and platform compatibility. When resizing images or video frames, maintaining the original ratio prevents distortion. This tool lets you calculate the simplified ratio from any pixel dimensions, find the missing dimension when scaling, and instantly check whether two different resolutions share the same proportions.",
          "The calculation uses the Euclidean GCD algorithm to reduce any pair of integers to their smallest equivalent form, so 1920×1080 correctly simplifies to 16:9 rather than displaying the raw pixel values.",
        ],
      }}
      features={FEATURES}
      featuresDescription="Three modes over one exact algorithm — reduce, scale, and compare without ever leaving the page."
      faqs={FAQS}
      faqTitle="Aspect Ratio Calculator FAQ."
    >
      <AspectRatioCalculator />
    </ToolPage>
  );
}
