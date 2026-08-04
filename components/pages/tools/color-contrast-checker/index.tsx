import {
  BadgeCheck,
  Contrast,
  Eye,
  Palette,
  ShieldCheck,
  Type,
} from "lucide-react";

import ToolPage, { type ToolFeature } from "@/components/tools/ToolPage";
import ToolTable from "@/components/tools/ToolTable";
import ColorContrastChecker from "./ColorContrastChecker";
import { FAQS } from "./content";

const FEATURES: ToolFeature[] = [
  {
    title: "Exact Ratio",
    description:
      "The computed contrast ratio, not a vague good or bad verdict.",
    icon: Contrast,
  },
  {
    title: "AA And AAA",
    description:
      "Pass or fail evaluated separately for each conformance level.",
    icon: BadgeCheck,
  },
  {
    title: "Text Size Aware",
    description: "Normal and large text thresholds are checked independently.",
    icon: Type,
  },
  {
    title: "Live Preview",
    description: "See the pairing rendered as real text before you ship it.",
    icon: Eye,
  },
  {
    title: "UI Components",
    description: "Covers the 3:1 requirement for borders, icons, and controls.",
    icon: Palette,
  },
  {
    title: "Instant Feedback",
    description: "Adjust either colour and every verdict updates immediately.",
    icon: ShieldCheck,
  },
];

const WCAG_REQUIREMENTS: (string | number)[][] = [
  [
    "AA — Normal text",
    "≥ 4.5:1",
    "Body copy, labels, input text (under 18pt / 14pt bold)",
  ],
  [
    "AA — Large text",
    "≥ 3:1",
    "Headings (18pt+ or 14pt+ bold), decorative text",
  ],
  [
    "AAA — Normal text",
    "≥ 7:1",
    "Enhanced accessibility for critical or extended reading",
  ],
  [
    "AAA — Large text",
    "≥ 4.5:1",
    "Enhanced large text — highest contrast requirement",
  ],
  [
    "UI components",
    "≥ 3:1",
    "Active UI elements, input borders, focus indicators (WCAG 1.4.11)",
  ],
];

export default function ColorContrastCheckerPage() {
  return (
    <ToolPage
      id="color-contrast-checker"
      heading="Color Contrast Checker."
      intro="Enter two hex colours for instant WCAG 2.1 AA and AAA pass or fail results."
      extra={
        <>
          <ToolTable
            heading="WCAG contrast requirements."
            description="Requirements from WCAG 2.1. Large text means at least 18pt (24px) regular or 14pt (18.67px) bold."
            columns={["Level", "Minimum ratio", "Applies to"]}
            rows={WCAG_REQUIREMENTS}
          />
        </>
      }
      features={FEATURES}
      featuresDescription="The exact WCAG ratio and a real pass or fail per level — the check that keeps an interface legible and compliant."
      faqs={FAQS}
      faqTitle="Color Contrast Checker FAQ."
    >
      <ColorContrastChecker />
    </ToolPage>
  );
}
