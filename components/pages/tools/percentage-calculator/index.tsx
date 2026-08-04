import {
  Calculator,
  Divide,
  Percent,
  ShieldCheck,
  TrendingUp,
  Zap,
} from "lucide-react";

import ToolPage, { type ToolFeature } from "@/components/tools/ToolPage";
import PercentageCalculator from "./PercentageCalculator";
import { FAQS } from "./content";

const FEATURES: ToolFeature[] = [
  {
    title: "Percent Of A Number",
    description: "Work out a discount, a tip, or a share of a total directly.",
    icon: Percent,
  },
  {
    title: "Percentage Change",
    description:
      "Measure growth or decline between two values, with the direction shown.",
    icon: TrendingUp,
  },
  {
    title: "X Is What Percent Of Y",
    description: "Turn a raw score or a part-of-total into a percentage.",
    icon: Divide,
  },
  {
    title: "No Formula Needed",
    description: "Each mode is labelled in plain language rather than algebra.",
    icon: Zap,
  },
  {
    title: "Instant Results",
    description: "Answers update as you type, with no submit step.",
    icon: Calculator,
  },
  {
    title: "Runs Locally",
    description: "Plain arithmetic in your browser — nothing sent anywhere.",
    icon: ShieldCheck,
  },
];

export default function PercentageCalculatorPage() {
  return (
    <ToolPage
      id="percentage-calculator"
      heading="Percentage Calculator."
      intro="Three modes — pick yours and get the result instantly."
      explainer={{
        heading: "What you can calculate.",
        paragraphs: [
          "This percentage calculator covers the three most common percentage problems people face in everyday life. Whether you're working out a sale price, tracking a business metric, scoring a test, or calculating a restaurant tip — one of the three modes handles it directly without needing to remember a formula.",
        ],
      }}
      features={FEATURES}
      featuresDescription="The three percentage questions people actually ask, each with its own mode so you never have to recall the formula."
      faqs={FAQS}
      faqTitle="Percentage Calculator FAQ."
    >
      <PercentageCalculator />
    </ToolPage>
  );
}
