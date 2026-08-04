import {
  Divide,
  Percent,
  Receipt,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";

import ToolPage, { type ToolFeature } from "@/components/tools/ToolPage";
import ToolTable from "@/components/tools/ToolTable";
import TipCalculator from "./TipCalculator";
import { FAQS } from "./content";

const FEATURES: ToolFeature[] = [
  {
    title: "Any Tip Rate",
    description: "Use the common presets or type an exact custom percentage.",
    icon: Receipt,
  },
  {
    title: "Split Any Way",
    description:
      "Divide between any number of people, with per-person totals shown.",
    icon: Percent,
  },
  {
    title: "Tip And Total",
    description:
      "See the tip amount and the final bill separately, not merged.",
    icon: Users,
  },
  {
    title: "Rounding",
    description:
      "Settle on clean per-person numbers instead of awkward change.",
    icon: Divide,
  },
  {
    title: "Instant Math",
    description:
      "Every figure recalculates as you adjust the bill or the rate.",
    icon: Zap,
  },
  {
    title: "Nothing Recorded",
    description: "Bill amounts stay on your device — no account, no history.",
    icon: ShieldCheck,
  },
];

const ETIQUETTE: (string | number)[][] = [
  ["Restaurant (full service)", "18–20%", "Standard for sit-down dining"],
  ["Restaurant (fast casual)", "10–15%", "Counter service, no table wait"],
  ["Bar / Drinks", "$1–2/drink or 15–20%", "Bartender standard"],
  ["Coffee shop", "$0.50–$1", "Counter service, optional"],
  ["Food delivery", "15–20%", "Minimum $3–5 for short distances"],
  ["Taxi / Rideshare", "15–20%", "Extra for help with luggage"],
  ["Hotel housekeeping", "$2–5/night", "Left daily, not just checkout"],
  ["Hairdresser / Salon", "15–20%", "Standard for personal services"],
];

export default function TipCalculatorPage() {
  return (
    <ToolPage
      id="tip-calculator"
      heading="Tip Calculator & Bill Splitter."
      intro="Enter the bill, pick a tip percentage, and split it between any number of people."
      extra={
        <>
          <ToolTable
            heading="Tipping etiquette."
            description="Customary rates by service type — a starting point, not a rule."
            columns={["Service", "Customary tip", "Notes"]}
            rows={ETIQUETTE}
          />
        </>
      }
      features={FEATURES}
      featuresDescription="Bill, tip, and split resolved together — including the per-person figure that actually settles the table."
      faqs={FAQS}
      faqTitle="Tip Calculator & Bill Splitter FAQ."
    >
      <TipCalculator />
    </ToolPage>
  );
}
