import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import PercentageCalculator from "./PercentageCalculator";

export const metadata: Metadata = {
  title: "Free Percentage Calculator — 3 Modes: What Is X%, X is What %, % Change",
  description:
    "Calculate percentages instantly with 3 modes: What is X% of Y, X is what percent of Y, and percentage change from X to Y. Free, no sign-up, works in your browser.",
  keywords: [
    "percentage calculator", "percent calculator online", "what is X percent of Y",
    "percentage change calculator", "calculate percentage", "percentage increase calculator",
    "percentage decrease calculator", "discount calculator", "percentage formula",
  ],
  alternates: { canonical: "https://mohdsakib.vercel.app/tools/percentage-calculator" },
  openGraph: {
    title: "Free Percentage Calculator — 3 Calculation Modes",
    description: "What is X% of Y? X is what % of Y? Percentage change? Three modes, instant results.",
    url: "https://mohdsakib.vercel.app/tools/percentage-calculator",
    type: "website",
  },
};

const USE_CASES = [
  { icon: "🛍️", title: "Discounts & Sales",   desc: "Work out sale prices instantly. What is 30% off £120?" },
  { icon: "📊", title: "Growth Rates",         desc: "Track business KPIs. Revenue went from £80k to £100k — what's the % increase?" },
  { icon: "🎓", title: "Grades & Scores",      desc: "Convert raw scores to percentages. Got 43 out of 60?" },
  { icon: "🏦", title: "Tax & VAT",            desc: "Calculate tax amounts. What is 20% VAT on £450?" },
  { icon: "💰", title: "Tips & Gratuities",    desc: "Split the bill fairly. 15% of £87.50 for a restaurant tip?" },
  { icon: "📈", title: "Profit Margins",       desc: "Compare costs and revenues. What percentage is £35 profit on a £200 sale?" },
];

const FAQS = [
  { q: "How do I calculate what is X% of Y?", a: "Multiply Y by X and divide by 100. For example, 20% of 250 = (20 × 250) ÷ 100 = 50. The \"What is X% of Y\" mode does this automatically as you type." },
  { q: "How do I find what percentage X is of Y?", a: "Divide X by Y and multiply by 100. For example, 50 is what % of 200? (50 ÷ 200) × 100 = 25%. Use the \"X is what % of Y\" mode for this." },
  { q: "How do I calculate percentage change?", a: "Subtract the original value from the new value, divide by the original value, and multiply by 100. Formula: ((New − Old) ÷ |Old|) × 100. A positive result is an increase; negative is a decrease." },
  { q: "What is the quick mental maths trick for 10%?", a: "To find 10% of any number, just move the decimal point one place to the left. For 350, 10% is 35. For 20%, double that: 70. For 5%, halve the 10% result: 17.5." },
  { q: "How do I calculate a discount?", a: "Use the \"What is X% of Y\" mode. Enter the discount percentage as X and the original price as Y. Subtract the result from the original price to get the sale price." },
  { q: "What is the difference between percentage increase and absolute increase?", a: "Absolute increase is the raw difference (e.g., £20 more). Percentage increase expresses that change relative to the starting value (e.g., 20% more). Percentage change is more useful for comparisons across different scales." },
];

export default function PercentageCalculatorPage() {
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

      <div className="min-h-screen" style={{ background: "#f5f0e3" }}>
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
          style={{ background: "rgba(245,240,227,0.92)", borderBottom: "1px solid rgba(28,27,24,0.08)" }}>
          <div className="max-w-3xl mx-auto px-6 h-13 flex items-center justify-between">
            <nav className="flex items-center gap-1.5" style={{ color: "rgba(28,27,24,0.4)", fontSize: "12px" }}>
              <Link href="/" className="font-medium hover:text-[#1c1b18] transition-colors" style={{ color: "inherit" }}>Sakib</Link>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
              <Link href="/tools" className="hover:text-[#1c1b18] transition-colors" style={{ color: "inherit" }}>Tools</Link>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
              <span style={{ color: "#1c1b18", fontWeight: 700 }}>Percentage Calculator</span>
            </nav>
            <Link href="/tools" className="hover:opacity-80 transition-opacity"
              style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(28,27,24,0.4)" }}>
              All tools
            </Link>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-6 pt-24 pb-20">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full text-[10px] font-bold"
              style={{ background: "#1c1b18", color: "#f4d949", border: "none" }}>
              % CALCULATORS
            </div>
            <h1 className="font-bold tracking-tight leading-tight mb-2.5"
              style={{ fontSize: "clamp(28px,5vw,40px)", color: "#1c1b18", letterSpacing: "-0.02em" }}>
              Percentage Calculator
            </h1>
            <p style={{ fontSize: "13.5px", color: "rgba(28,27,24,0.5)", lineHeight: 1.65 }}>
              Three modes — choose yours and get the result instantly.
            </p>
          </div>
          <PercentageCalculator />
        </main>

        <div style={{ borderTop: "2px solid #1c1b18" }}>
          <div className="max-w-3xl mx-auto px-6 py-20 space-y-20">

            <section>
              <h2 className="font-bold tracking-tight mb-4" style={{ fontSize: "22px", color: "#1c1b18" }}>
                What Can You Calculate with This Tool?
              </h2>
              <p style={{ fontSize: "14px", color: "rgba(28,27,24,0.6)", lineHeight: 1.85 }}>
                This percentage calculator covers the three most common percentage problems people face in everyday life.
                Whether you're working out a sale price, tracking a business metric, scoring a test, or calculating
                a restaurant tip — one of the three modes handles it directly without needing to remember a formula.
              </p>
            </section>

            <section>
              <h2 className="font-bold tracking-tight mb-6" style={{ fontSize: "22px", color: "#1c1b18" }}>Common Use Cases</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {USE_CASES.map(({ icon, title, desc }) => (
                  <div key={title} className="rounded-[16px] p-5"
                    style={{ background: "#ffffff", border: "2px solid #1c1b18" }}>
                    <p className="font-bold mb-1.5" style={{ fontSize: "14px", color: "#1c1b18" }}>{icon} {title}</p>
                    <p style={{ fontSize: "12.5px", color: "rgba(28,27,24,0.55)", lineHeight: 1.7 }}>{desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-bold tracking-tight mb-6" style={{ fontSize: "22px", color: "#1c1b18" }}>Frequently Asked Questions</h2>
              <div className="rounded-[16px] overflow-hidden" style={{ border: "2px solid #1c1b18" }}>
                {FAQS.map(({ q, a }, i) => (
                  <div key={i} className="px-6 py-5"
                    style={{ background: "#ffffff", borderBottom: i < FAQS.length - 1 ? "1px solid rgba(28,27,24,0.1)" : "none" }}>
                    <p className="font-bold mb-2" style={{ fontSize: "14px", color: "#1c1b18" }}>{q}</p>
                    <p style={{ fontSize: "13px", color: "rgba(28,27,24,0.55)", lineHeight: 1.75 }}>{a}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[20px] px-8 py-10 text-center" style={{ background: "#1c1b18" }}>
              <p className="font-bold tracking-tight mb-2" style={{ fontSize: "20px", color: "#f4d949" }}>More free tools</p>
              <p className="mb-6" style={{ fontSize: "13px", color: "rgba(244,217,73,0.5)", lineHeight: 1.7 }}>
                BMI, mortgage, tip calculator and dozens more — all free, all in your browser.
              </p>
              <Link href="/tools" className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] font-bold transition-opacity hover:opacity-85"
                style={{ background: "#f4d949", color: "#1c1b18", fontSize: "13px" }}>
                Browse all tools
              </Link>
            </section>

            <div className="pb-4">
              <Link href="/tools" className="inline-flex items-center gap-2.5 hover:opacity-70 transition-opacity"
                style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(28,27,24,0.35)" }}>
                <span>←</span> Back to tools
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
