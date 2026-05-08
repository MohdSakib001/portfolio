import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import AgeCalculator from "./AgeCalculator";

export const metadata: Metadata = {
  title: "Free Age Calculator — Exact Age in Years, Months & Days",
  description:
    "Calculate your exact age in years, months, days, and hours from your date of birth. Find your zodiac sign, day of the week you were born, and next birthday countdown. Free, instant, private.",
  keywords: [
    "age calculator", "how old am I", "age calculator online", "calculate age from date of birth",
    "exact age calculator", "birthday calculator", "age in days", "how many days old am I",
    "zodiac sign calculator", "age counter", "date of birth age calculator",
  ],
  alternates: { canonical: "https://mohdsakib.vercel.app/tools/age-calculator" },
  openGraph: {
    title: "Free Age Calculator — Exact Age in Years, Months & Days",
    description: "Calculate your exact age from date of birth — years, months, days, hours, zodiac sign, and next birthday.",
    url: "https://mohdsakib.vercel.app/tools/age-calculator",
    type: "website",
  },
};

const FEATURES = [
  { title: "Exact to the day",       desc: "Precise calculation down to the current day, accounting for leap years and month lengths." },
  { title: "6 lifetime totals",      desc: "See your age expressed as total days, months, and hours — not just years." },
  { title: "Day of the week",        desc: "Find out which day of the week you were born on." },
  { title: "Zodiac sign",            desc: "Automatically calculates your Western zodiac sign based on your birthday." },
  { title: "Next birthday countdown","desc": "Shows how many days until your next birthday, highlighted orange when it's within a week." },
  { title: "No data stored",         desc: "Everything runs client-side. Your birthdate never leaves your browser." },
];

const FAQS = [
  { q: "How does the age calculator work?", a: "The tool subtracts your date of birth from today's date using JavaScript's Date object. It accounts for month lengths and leap years to give you the exact breakdown in years, months, and remaining days." },
  { q: "Does the age calculator account for leap years?", a: "Yes. The calculation uses actual calendar dates, so February 29 birthdays are handled correctly, and leap year days are included in the total day count." },
  { q: "How is the total hours count calculated?", a: "Total hours is simply total days multiplied by 24. It doesn't account for daylight saving time shifts, but it's accurate to within a few hours for practical purposes." },
  { q: "How accurate is the zodiac sign?", a: "The tool uses the standard Western (tropical) zodiac with the most commonly published date ranges. Edge cases on cusp dates (e.g., March 20 vs 21) may vary by source." },
  { q: "Can I use this to calculate someone else's age?", a: "Yes. Just enter any past date of birth — your own, a family member's, or even a historical figure's. The tool works for any valid past date." },
  { q: "Why do I need to know my age in days?", a: "The total day count is useful for medical calculations (e.g., \"how many days old is my baby\"), for fun facts, and for percentage-of-life-spent calculations. Some insurance and legal contexts also count in days." },
];

export default function AgeCalculatorPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map(({ q, a }) => ({
      "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen" style={{ background: "#fdf8f3" }}>
        <header
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
          style={{ background: "rgba(253,248,243,0.9)", borderBottom: "1px solid rgba(249,115,22,0.1)" }}
        >
          <div className="max-w-3xl mx-auto px-6 h-13 flex items-center justify-between">
            <nav className="flex items-center gap-1.5" style={{ color: "rgba(3,3,2,0.4)", fontSize: "12px" }}>
              <Link href="/" className="font-medium hover:text-[#1c1b18] transition-colors" style={{ color: "inherit" }}>Sakib</Link>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
              <Link href="/tools" className="hover:text-[#1c1b18] transition-colors" style={{ color: "inherit" }}>Tools</Link>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
              <span style={{ color: "#1c1b18", fontWeight: 500 }}>Age Calculator</span>
            </nav>
            <Link href="/tools" className="hover:opacity-80 transition-opacity"
              style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(3,3,2,0.4)" }}>
              All tools
            </Link>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-6 pt-24 pb-20">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full text-[10px] font-semibold"
              style={{ background: "#fff7ed", color: "#f97316", border: "1px solid #fed7aa" }}>
              🎂 CALCULATORS
            </div>
            <h1 className="font-semibold tracking-tight leading-tight mb-2.5"
              style={{ fontSize: "clamp(26px,4vw,34px)", color: "#1c1b18" }}>
              Age Calculator
            </h1>
            <p style={{ fontSize: "13.5px", color: "rgba(3,3,2,0.45)", lineHeight: 1.65 }}>
              Enter your date of birth — get your exact age plus total days, zodiac sign, and next birthday.
            </p>
          </div>
          <AgeCalculator />
        </main>

        <div style={{ borderTop: "1px solid rgba(249,115,22,0.08)" }}>
          <div className="max-w-3xl mx-auto px-6 py-20 space-y-20">

            <section>
              <h2 className="font-semibold tracking-tight mb-4" style={{ fontSize: "21px", color: "#1c1b18" }}>
                How Does an Age Calculator Work?
              </h2>
              <p style={{ fontSize: "14px", color: "rgba(3,3,2,0.55)", lineHeight: 1.85 }}>
                An age calculator takes your date of birth and subtracts it from today's date to give you your exact age.
                Unlike a simple year subtraction, a precise calculator accounts for whether your birthday has occurred yet
                this calendar year, the varying lengths of months, and leap years — ensuring the years, months, and days
                are always accurate to today's date.
              </p>
              <p className="mt-4" style={{ fontSize: "14px", color: "rgba(3,3,2,0.55)", lineHeight: 1.85 }}>
                This tool also converts your age into lifetime totals: total days lived, total months, and total hours.
                These figures update automatically based on today's date, so you always get a fresh result.
              </p>
            </section>

            <section>
              <h2 className="font-semibold tracking-tight mb-6" style={{ fontSize: "21px", color: "#1c1b18" }}>Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FEATURES.map(({ title, desc }) => (
                  <div key={title} className="rounded-[14px] p-5"
                    style={{ background: "#ffffff", boxShadow: "0 0 0 1px rgba(3,3,2,0.06), 0 2px 8px rgba(3,3,2,0.04)" }}>
                    <p className="font-medium mb-1" style={{ fontSize: "13.5px", color: "#1c1b18" }}>{title}</p>
                    <p style={{ fontSize: "12.5px", color: "rgba(3,3,2,0.5)", lineHeight: 1.7 }}>{desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-semibold tracking-tight mb-6" style={{ fontSize: "21px", color: "#1c1b18" }}>Frequently Asked Questions</h2>
              <div className="space-y-px rounded-[16px] overflow-hidden" style={{ boxShadow: "0 0 0 1px rgba(3,3,2,0.06)" }}>
                {FAQS.map(({ q, a }, i) => (
                  <div key={i} className="px-6 py-5"
                    style={{ background: "#ffffff", borderBottom: i < FAQS.length - 1 ? "1px solid rgba(3,3,2,0.05)" : "none" }}>
                    <p className="font-medium mb-2" style={{ fontSize: "14px", color: "#1c1b18" }}>{q}</p>
                    <p style={{ fontSize: "13px", color: "rgba(3,3,2,0.5)", lineHeight: 1.75 }}>{a}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[20px] px-8 py-10 text-center"
              style={{ background: "#ffffff", boxShadow: "0 0 0 1px rgba(3,3,2,0.06), 0 4px 24px rgba(3,3,2,0.05)" }}>
              <p className="font-semibold tracking-tight mb-2" style={{ fontSize: "19px", color: "#1c1b18" }}>More free tools</p>
              <p className="mb-6" style={{ fontSize: "13px", color: "rgba(3,3,2,0.45)", lineHeight: 1.7 }}>
                BMI, percentage, mortgage calculators and dozens more — all free, all in your browser.
              </p>
              <Link href="/tools" className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] font-medium transition-opacity hover:opacity-80"
                style={{ background: "#1c1b18", color: "#fdf8f3", fontSize: "13px" }}>
                Browse all tools
              </Link>
            </section>

            <div className="pb-4">
              <Link href="/tools" className="inline-flex items-center gap-2.5 hover:opacity-70 transition-opacity"
                style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(3,3,2,0.35)" }}>
                <span>←</span> Back to tools
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
