import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import UnitConverter from "./UnitConverter";

export const metadata: Metadata = {
  title: "Free Unit Converter — Length, Weight, Temperature, Volume & More",
  description:
    "Convert units across length, weight, temperature, volume, speed, area, and data size. All conversions happen instantly in your browser. Free, no sign-up.",
  keywords: [
    "unit converter", "unit conversion online", "length converter", "weight converter",
    "temperature converter", "metric to imperial", "km to miles", "kg to pounds",
    "celsius to fahrenheit", "litre to gallon", "data size converter",
  ],
  alternates: { canonical: "https://mohdsakib.vercel.app/tools/unit-converter" },
  openGraph: {
    title: "Free Unit Converter — 7 Categories, Instant Conversion",
    description: "Convert length, weight, temperature, volume, speed, area, and data. Browser-based, free.",
    url: "https://mohdsakib.vercel.app/tools/unit-converter",
    type: "website",
  },
};

const QUICK_CONVERSIONS = [
  { from: "1 mile",       to: "1.609344 km",     category: "Length" },
  { from: "1 foot",       to: "30.48 cm",         category: "Length" },
  { from: "1 kg",         to: "2.20462 lbs",      category: "Weight" },
  { from: "1 stone",      to: "6.35029 kg",       category: "Weight" },
  { from: "0°C",          to: "32°F / 273.15 K",  category: "Temperature" },
  { from: "100°C",        to: "212°F / 373.15 K", category: "Temperature" },
  { from: "1 US gallon",  to: "3.78541 L",        category: "Volume" },
  { from: "1 GB",         to: "1,024 MB",         category: "Data" },
];

const FAQS = [
  { q: "How accurate are the conversions?", a: "The conversions use precise, internationally defined factors (e.g., 1 international mile = exactly 1609.344 metres; 1 pound = exactly 0.45359237 kg). Results are shown with up to 10 significant figures, with exponential notation for very large or very small values." },
  { q: "How is temperature conversion different from other units?", a: "Temperature uses offset formulas rather than multiplicative factors. °C to °F = (°C × 9/5) + 32. °C to Kelvin = °C + 273.15. The tool handles this automatically — you don't need to remember the formulas." },
  { q: "What's the difference between metric and imperial?", a: "The metric (SI) system is based on powers of 10 and is used by most countries worldwide. The imperial system uses non-decimal relationships (12 inches to a foot, 3 feet to a yard, etc.) and is primarily used in the United States." },
  { q: "How is data size calculated — binary or decimal?", a: "This tool uses binary (IEC) units: 1 KB = 1,024 bytes; 1 MB = 1,048,576 bytes. This matches how operating systems (Windows, macOS, Linux) report file sizes. Note that hard drive manufacturers often use decimal (1 KB = 1,000 bytes), which is why a '1 TB' drive shows as ~931 GB in your OS." },
  { q: "What is a nautical mile?", a: "A nautical mile (1,852 metres) is based on the circumference of the Earth and equals one minute of latitude. It's used in maritime and aviation navigation because it has a direct relationship to the geographic coordinate system." },
  { q: "What is a knot?", a: "A knot (kt) is a unit of speed equal to one nautical mile per hour (~1.852 km/h). It's the standard speed unit in maritime and aviation contexts. A vessel travelling at 30 knots covers 30 nautical miles per hour." },
];

export default function UnitConverterPage() {
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

      <div className="min-h-screen" style={{ background: "#f0fdfa" }}>
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
          style={{ background: "rgba(240,253,250,0.92)", borderBottom: "1px solid rgba(13,148,136,0.1)" }}>
          <div className="max-w-3xl mx-auto px-6 h-13 flex items-center justify-between">
            <nav className="flex items-center gap-1.5" style={{ color: "rgba(15,118,110,0.5)", fontSize: "12px" }}>
              <Link href="/" className="font-medium hover:text-[#0d9488] transition-colors" style={{ color: "inherit" }}>Sakib</Link>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
              <Link href="/tools" className="hover:text-[#0d9488] transition-colors" style={{ color: "inherit" }}>Tools</Link>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
              <span style={{ color: "#0d9488", fontWeight: 600 }}>Unit Converter</span>
            </nav>
            <Link href="/tools" className="hover:opacity-80 transition-opacity"
              style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(15,118,110,0.4)" }}>
              All tools
            </Link>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-6 pt-24 pb-20">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full text-[10px] font-semibold"
              style={{ background: "rgba(13,148,136,0.1)", color: "#0d9488", border: "1px solid rgba(13,148,136,0.2)" }}>
              🔬 CALCULATORS
            </div>
            <h1 className="font-semibold tracking-tight leading-tight mb-2.5"
              style={{ fontSize: "clamp(26px,4vw,34px)", color: "#134e4a" }}>
              Unit Converter
            </h1>
            <p style={{ fontSize: "13.5px", color: "rgba(15,118,110,0.6)", lineHeight: 1.65 }}>
              Length, weight, temperature, volume, speed, area, data — 7 categories, instant results.
            </p>
          </div>
          <UnitConverter />
        </main>

        <div style={{ borderTop: "1px solid rgba(13,148,136,0.1)" }}>
          <div className="max-w-3xl mx-auto px-6 py-20 space-y-20">

            <section>
              <h2 className="font-semibold tracking-tight mb-2" style={{ fontSize: "21px", color: "#134e4a" }}>
                Quick Reference Conversions
              </h2>
              <p className="mb-5" style={{ fontSize: "13.5px", color: "rgba(15,118,110,0.6)", lineHeight: 1.7 }}>
                The most commonly searched conversions.
              </p>
              <div className="rounded-[16px] overflow-hidden" style={{ boxShadow: "0 0 0 1px rgba(13,148,136,0.12)" }}>
                <table className="w-full text-left" style={{ background: "#ffffff" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(13,148,136,0.08)", background: "#f0fdfa" }}>
                      {["From", "Equals", "Category"].map(h => (
                        <th key={h} className="px-5 py-3.5"
                          style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(15,118,110,0.5)" }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {QUICK_CONVERSIONS.map(({ from, to, category }, i) => (
                      <tr key={from} style={{ borderBottom: i < QUICK_CONVERSIONS.length - 1 ? "1px solid rgba(13,148,136,0.05)" : "none" }}>
                        <td className="px-5 py-3 font-semibold font-mono" style={{ fontSize: "13px", color: "#0d9488" }}>{from}</td>
                        <td className="px-5 py-3 font-mono" style={{ fontSize: "13px", color: "#134e4a" }}>{to}</td>
                        <td className="px-5 py-3" style={{ fontSize: "12px", color: "rgba(15,118,110,0.55)" }}>{category}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="font-semibold tracking-tight mb-6" style={{ fontSize: "21px", color: "#134e4a" }}>Frequently Asked Questions</h2>
              <div className="space-y-px rounded-[16px] overflow-hidden" style={{ boxShadow: "0 0 0 1px rgba(13,148,136,0.1)" }}>
                {FAQS.map(({ q, a }, i) => (
                  <div key={i} className="px-6 py-5"
                    style={{ background: "#ffffff", borderBottom: i < FAQS.length - 1 ? "1px solid rgba(13,148,136,0.06)" : "none" }}>
                    <p className="font-medium mb-2" style={{ fontSize: "14px", color: "#134e4a" }}>{q}</p>
                    <p style={{ fontSize: "13px", color: "rgba(15,118,110,0.6)", lineHeight: 1.75 }}>{a}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[20px] px-8 py-10 text-center"
              style={{ background: "#0d9488", boxShadow: "0 8px 32px rgba(13,148,136,0.3)" }}>
              <p className="font-semibold tracking-tight mb-2" style={{ fontSize: "19px", color: "#ffffff" }}>More free tools</p>
              <p className="mb-6" style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>
                Age calculator, percentage tool, mortgage calculator and more.
              </p>
              <Link href="/tools" className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] font-medium transition-opacity hover:opacity-85"
                style={{ background: "#ffffff", color: "#0d9488", fontSize: "13px" }}>
                Browse all tools
              </Link>
            </section>

            <div className="pb-4">
              <Link href="/tools" className="inline-flex items-center gap-2.5 hover:opacity-70 transition-opacity"
                style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(15,118,110,0.4)" }}>
                <span>←</span> Back to tools
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
