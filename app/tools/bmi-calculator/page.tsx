import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import BmiCalculator from "./BmiCalculator";

export const metadata: Metadata = {
  title: "Free BMI Calculator — Body Mass Index with Visual Scale",
  description:
    "Calculate your BMI (Body Mass Index) in metric or imperial units instantly. See your category — underweight, normal, overweight, or obese — on a visual colour-coded scale.",
  keywords: [
    "BMI calculator", "body mass index calculator", "BMI calculator online", "calculate BMI",
    "BMI chart", "healthy BMI", "BMI for adults", "overweight BMI", "normal weight BMI",
    "BMI metric", "BMI imperial", "weight health calculator",
  ],
  alternates: { canonical: "https://mohdsakib.vercel.app/tools/bmi-calculator" },
  openGraph: {
    title: "Free BMI Calculator — Body Mass Index with Visual Scale",
    description: "Calculate your BMI instantly in metric or imperial. See category, visual scale, and ranges at a glance.",
    url: "https://mohdsakib.vercel.app/tools/bmi-calculator",
    type: "website",
  },
};

const BMI_TABLE = [
  { category: "Underweight",    range: "< 18.5",     risk: "Malnutrition, weakened immunity, bone density loss" },
  { category: "Normal weight",  range: "18.5 – 24.9", risk: "Lowest risk for weight-related health problems" },
  { category: "Overweight",     range: "25 – 29.9",  risk: "Elevated risk for hypertension, type 2 diabetes" },
  { category: "Obese (Class I)",range: "30 – 34.9",  risk: "High risk for cardiovascular disease, sleep apnea" },
  { category: "Obese (Class II)",range: "35 – 39.9", risk: "Very high risk — consult a healthcare provider" },
  { category: "Obese (Class III)",range: "≥ 40",     risk: "Extremely high risk — medical intervention recommended" },
];

const FAQS = [
  { q: "What is BMI?", a: "BMI (Body Mass Index) is a numerical value derived from a person's weight and height. It's calculated as weight (kg) divided by height (m) squared. It's used as a simple screening tool to categorise weight status, though it's not a diagnostic measure of body fatness or health." },
  { q: "What is a healthy BMI?", a: "For adults, a BMI between 18.5 and 24.9 is considered normal or healthy. Below 18.5 is underweight, 25–29.9 is overweight, and 30 or above is classified as obese. These ranges are the same for both men and women." },
  { q: "Is BMI accurate?", a: "BMI is a useful population-level screening tool, but it has limitations for individuals. It doesn't distinguish between fat mass and muscle mass — athletes may have a high BMI despite very low body fat. It also doesn't account for fat distribution, age, or ethnicity. Use it alongside other health indicators." },
  { q: "How is the BMI formula calculated?", a: "For metric units: BMI = weight in kg ÷ (height in metres)². For imperial: BMI = (weight in pounds × 703) ÷ (height in inches)². Both formulas give the same result when properly converted." },
  { q: "Does BMI apply to children?", a: "Children and teens use age- and sex-specific BMI percentiles rather than the adult categories. This tool is designed for adults aged 18 and over. For children, please consult a paediatric BMI chart." },
  { q: "What is the difference between overweight and obese?", a: "Overweight (BMI 25–29.9) means you are above a healthy weight but below the obesity threshold. Obese (BMI 30+) indicates a higher level of excess weight that significantly increases health risks. Both categories benefit from lifestyle changes, but obesity typically warrants medical attention." },
];

export default function BmiCalculatorPage() {
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

      <div className="min-h-screen" style={{ background: "#060c14" }}>
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
          style={{ background: "rgba(6,12,20,0.92)", borderBottom: "1px solid rgba(34,197,94,0.08)" }}>
          <div className="max-w-3xl mx-auto px-6 h-13 flex items-center justify-between">
            <nav className="flex items-center gap-1.5" style={{ color: "rgba(226,232,240,0.4)", fontSize: "12px" }}>
              <Link href="/" className="font-medium hover:text-white transition-colors" style={{ color: "inherit" }}>Sakib</Link>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
              <Link href="/tools" className="hover:text-white transition-colors" style={{ color: "inherit" }}>Tools</Link>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
              <span style={{ color: "#22c55e", fontWeight: 500 }}>BMI Calculator</span>
            </nav>
            <Link href="/tools" className="hover:opacity-80 transition-opacity"
              style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(226,232,240,0.35)" }}>
              All tools
            </Link>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-6 pt-24 pb-20">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full text-[10px] font-semibold"
              style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.2)" }}>
              ⚖️ CALCULATORS
            </div>
            <h1 className="font-semibold tracking-tight leading-tight mb-2.5"
              style={{ fontSize: "clamp(26px,4vw,34px)", color: "#e2e8f0" }}>
              BMI Calculator
            </h1>
            <p style={{ fontSize: "13.5px", color: "rgba(226,232,240,0.4)", lineHeight: 1.65 }}>
              Enter your height and weight — get your Body Mass Index with a visual health scale.
            </p>
          </div>
          <BmiCalculator />
        </main>

        <div style={{ borderTop: "1px solid rgba(34,197,94,0.06)" }}>
          <div className="max-w-3xl mx-auto px-6 py-20 space-y-20">

            <section>
              <h2 className="font-semibold tracking-tight mb-4" style={{ fontSize: "21px", color: "#e2e8f0" }}>
                What is Body Mass Index (BMI)?
              </h2>
              <p style={{ fontSize: "14px", color: "rgba(226,232,240,0.45)", lineHeight: 1.85 }}>
                Body Mass Index is a widely used screening metric that relates a person's body weight to their height.
                Developed by Belgian mathematician Adolphe Quetelet in the 19th century, it provides a quick, costless
                way to categorise weight status across large populations. Doctors and public health agencies use it as
                the first filter when assessing weight-related health risks.
              </p>
              <p className="mt-4" style={{ fontSize: "14px", color: "rgba(226,232,240,0.45)", lineHeight: 1.85 }}>
                While BMI is a useful starting point, it has known limitations — it doesn't directly measure body fat
                percentage or account for muscle mass, bone density, age, sex, or ethnic differences in body composition.
                Always interpret BMI results in the context of a full health assessment.
              </p>
            </section>

            <section>
              <h2 className="font-semibold tracking-tight mb-2" style={{ fontSize: "21px", color: "#e2e8f0" }}>
                BMI Categories & Health Risks
              </h2>
              <p className="mb-6" style={{ fontSize: "13.5px", color: "rgba(226,232,240,0.4)", lineHeight: 1.7 }}>
                WHO classification for adults aged 18 and over.
              </p>
              <div className="rounded-[16px] overflow-hidden" style={{ boxShadow: "0 0 0 1px rgba(34,197,94,0.1)" }}>
                <table className="w-full text-left" style={{ background: "#0d1a2a" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(34,197,94,0.08)" }}>
                      {["Category", "BMI Range", "Associated Risks"].map(h => (
                        <th key={h} className="px-5 py-3.5"
                          style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(226,232,240,0.35)" }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {BMI_TABLE.map(({ category, range, risk }, i) => (
                      <tr key={category} style={{ borderBottom: i < BMI_TABLE.length - 1 ? "1px solid rgba(34,197,94,0.04)" : "none" }}>
                        <td className="px-5 py-3.5 font-medium" style={{ fontSize: "13px", color: "#e2e8f0" }}>{category}</td>
                        <td className="px-5 py-3.5 font-mono" style={{ fontSize: "12.5px", color: "#22c55e" }}>{range}</td>
                        <td className="px-5 py-3.5" style={{ fontSize: "12px", color: "rgba(226,232,240,0.45)", lineHeight: 1.5 }}>{risk}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="font-semibold tracking-tight mb-6" style={{ fontSize: "21px", color: "#e2e8f0" }}>Frequently Asked Questions</h2>
              <div className="space-y-px rounded-[16px] overflow-hidden" style={{ boxShadow: "0 0 0 1px rgba(34,197,94,0.08)" }}>
                {FAQS.map(({ q, a }, i) => (
                  <div key={i} className="px-6 py-5"
                    style={{ background: "#0d1a2a", borderBottom: i < FAQS.length - 1 ? "1px solid rgba(34,197,94,0.04)" : "none" }}>
                    <p className="font-medium mb-2" style={{ fontSize: "14px", color: "#e2e8f0" }}>{q}</p>
                    <p style={{ fontSize: "13px", color: "rgba(226,232,240,0.45)", lineHeight: 1.75 }}>{a}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[20px] px-8 py-10 text-center"
              style={{ background: "#0d1a2a", boxShadow: "0 0 0 1px rgba(34,197,94,0.1)" }}>
              <p className="font-semibold tracking-tight mb-2" style={{ fontSize: "19px", color: "#e2e8f0" }}>More free tools</p>
              <p className="mb-6" style={{ fontSize: "13px", color: "rgba(226,232,240,0.35)", lineHeight: 1.7 }}>
                Age calculator, tip splitter, mortgage calculator — all free, all in your browser.
              </p>
              <Link href="/tools" className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] font-medium transition-opacity hover:opacity-80"
                style={{ background: "#22c55e", color: "#060c14", fontSize: "13px" }}>
                Browse all tools
              </Link>
            </section>

            <div className="pb-4">
              <Link href="/tools" className="inline-flex items-center gap-2.5 hover:opacity-70 transition-opacity"
                style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(226,232,240,0.3)" }}>
                <span>←</span> Back to tools
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
