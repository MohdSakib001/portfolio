import {
  Home,
  Receipt,
  ShieldCheck,
  SlidersHorizontal,
  Table2,
  TrendingDown,
} from "lucide-react";

import ToolPage, { type ToolFeature } from "@/components/tools/ToolPage";
import MortgageCalculator from "./MortgageCalculator";
import { FAQS } from "./content";

const FEATURES: ToolFeature[] = [
  {
    title: "Monthly Payment",
    description:
      "The standard amortization formula applied to your principal, rate, and term.",
    icon: Home,
  },
  {
    title: "Total Interest",
    description:
      "See the full lifetime cost of the loan, not just the monthly figure.",
    icon: Receipt,
  },
  {
    title: "Amortization Schedule",
    description: "A period-by-period breakdown of how each payment splits.",
    icon: TrendingDown,
  },
  {
    title: "Principal Vs Interest",
    description:
      "Watch the split shift from mostly interest to mostly principal over the term.",
    icon: Table2,
  },
  {
    title: "Instant Recalculation",
    description:
      "Adjust rate, term, or down payment and every figure updates immediately.",
    icon: SlidersHorizontal,
  },
  {
    title: "Nothing Recorded",
    description:
      "Your loan figures stay in the browser — no account and no stored data.",
    icon: ShieldCheck,
  },
];

export default function MortgageCalculatorPage() {
  return (
    <ToolPage
      id="mortgage-calculator"
      heading="Mortgage Calculator."
      intro="Calculate your monthly payment, total interest, and full amortization schedule."
      explainer={{
        heading: "Understanding your mortgage.",
        paragraphs: [
          "A mortgage is a loan secured by a property. You borrow the purchase price (minus your down payment) from a lender and repay it over the loan term with interest. Your monthly payment stays fixed for a fixed-rate mortgage, but the split between principal and interest changes over time — a process called amortization.",
          "In the early years of a mortgage, the majority of your payment covers interest. As your balance decreases, more goes to principal. This is why making extra principal payments early in the loan saves a disproportionate amount of interest over the life of the loan.",
        ],
      }}
      features={FEATURES}
      featuresDescription="The real cost of a loan — monthly payment, lifetime interest, and the year-by-year split between principal and interest."
      faqs={FAQS}
      faqTitle="Mortgage Calculator FAQ."
    >
      <MortgageCalculator />
    </ToolPage>
  );
}
