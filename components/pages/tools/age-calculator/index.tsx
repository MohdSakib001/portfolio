import {
  Cake,
  CalendarCheck,
  CalendarDays,
  Hourglass,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import Container from "@/components/Container";
import FaqSection from "@/components/FaqSection";
import GridSection from "@/components/GridSection";
import ToolSection from "@/components/tools/ToolSection";
import { getRelatedTools } from "@/data/tools";
import Calculator from "./Calculator";
import { FAQS } from "./content";

const FEATURES = [
  {
    title: "Exact To The Day",
    description:
      "Precise down to today, accounting for leap years, month lengths, and your local timezone.",
    icon: CalendarCheck,
    color: "bg-emerald-300/70",
  },
  {
    title: "Lifetime Totals",
    description:
      "Your age expressed as total days, months, and hours — not just years.",
    icon: Hourglass,
    color: "bg-purple-300/70",
  },
  {
    title: "Day Of The Week",
    description: "Find out which day of the week you were actually born on.",
    icon: CalendarDays,
    color: "bg-sky-300/70",
  },
  {
    title: "Zodiac Sign",
    description:
      "Your Western zodiac sign, derived from the birth date you enter.",
    icon: Sparkles,
    color: "bg-amber-300/70",
  },
  {
    title: "Birthday Countdown",
    description:
      "Days remaining until your next birthday, with a progress bar for the current year.",
    icon: Cake,
    color: "bg-rose-300/70",
  },
  {
    title: "Nothing Leaves Your Browser",
    description:
      "Every calculation runs client-side. Your birth date is never uploaded or stored.",
    icon: ShieldCheck,
    color: "bg-indigo-300/70",
  },
];

export default function AgeCalculatorPage() {
  const relatedTools = getRelatedTools("age-calculator");

  return (
    <main className="min-h-screen bg-white text-black">
      <Container className="pb-12 pt-36">
        <h1 className="max-w-3xl text-heading font-semibold leading-none tracking-tight">
          Age Calculator.
        </h1>
        <p className="mt-4 max-w-xl text-body leading-relaxed text-black/50">
          Enter your date of birth to get your exact age, total days lived,
          zodiac sign, and next birthday — instantly, in your browser.
        </p>

        <div className="mt-12">
          <Calculator />
        </div>
      </Container>

      <Container className="py-12">
        <h2 className="text-title font-semibold tracking-tight">
          How an age calculator works.
        </h2>
        <div className="mt-5 max-w-3xl space-y-4 text-body leading-relaxed text-black/55">
          <p>
            An age calculator takes your date of birth and subtracts it from
            today&apos;s date. Unlike a plain year subtraction, a precise
            calculator checks whether your birthday has already happened this
            calendar year, then accounts for the varying lengths of months and
            for leap years — so the years, months, and days are always accurate
            to today.
          </p>
          <p>
            This tool also converts your age into lifetime totals: total days
            lived, total months, and total hours. All three recalculate against
            the current date every time you load the page, so the numbers never
            go stale.
          </p>
        </div>
      </Container>

      <GridSection
        topic="Precision"
        title="What You Get"
        description="Every figure is derived from real calendar dates in your own timezone — no rounded 365-day years, no server round-trip, no stored birth date."
        cards={FEATURES}
      />

      <ToolSection
        tools={relatedTools}
        title="Related tools."
        description="More free calculators and utilities that run entirely in your browser."
      />

      <FaqSection faqs={FAQS} title="Age Calculator FAQ." defaultOpenIndex={0} />
    </main>
  );
}
