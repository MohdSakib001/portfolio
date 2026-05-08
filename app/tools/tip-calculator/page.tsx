import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import TipCalculator from "./TipCalculator";

export const metadata: Metadata = {
  title: "Free Tip Calculator & Bill Splitter — Split Any Bill Fairly",
  description:
    "Calculate the tip amount, total bill, and per-person share for any group size. Choose from preset tip percentages or enter a custom one. Free, instant, no sign-up.",
  keywords: [
    "tip calculator", "bill splitter", "tip calculator online", "how much to tip",
    "restaurant tip calculator", "split bill calculator", "gratuity calculator",
    "tip percentage calculator", "divide bill equally", "split restaurant bill",
  ],
  alternates: { canonical: "https://mohdsakib.vercel.app/tools/tip-calculator" },
  openGraph: {
    title: "Free Tip Calculator & Bill Splitter",
    description: "Calculate tip and split any bill between any number of people. Instant, free, no sign-up.",
    url: "https://mohdsakib.vercel.app/tools/tip-calculator",
    type: "website",
  },
};

const TIP_ETIQUETTE = [
  { service: "Restaurant (full service)", tip: "18–20%", note: "Standard for sit-down dining" },
  { service: "Restaurant (fast casual)",  tip: "10–15%", note: "Counter service, no table wait" },
  { service: "Bar / Drinks",             tip: "$1–2/drink or 15–20%", note: "Bartender standard" },
  { service: "Coffee shop",              tip: "$0.50–$1",   note: "Counter service, optional" },
  { service: "Food delivery",            tip: "15–20%",    note: "Minimum $3–5 for short distances" },
  { service: "Taxi / Rideshare",         tip: "15–20%",    note: "Extra for help with luggage" },
  { service: "Hotel housekeeping",       tip: "$2–5/night", note: "Left daily, not just checkout" },
  { service: "Hairdresser / Salon",      tip: "15–20%",    note: "Standard for personal services" },
];

const FAQS = [
  { q: "How do I calculate a 20% tip?", a: "Multiply the bill total by 0.20, or use the quick shortcut: move the decimal one place left to get 10%, then double it to get 20%. Example: $47 → $4.70 → $9.40 tip. Add that to the bill: $56.40 total." },
  { q: "How do I split a bill equally?", a: "Add up the full bill including tax and tip, then divide by the number of people. This tool does exactly that — enter the bill amount, tip percentage, and number of people, and you'll see the per-person total instantly." },
  { q: "Should the tip be calculated before or after tax?", a: "Convention varies. In the US, most people tip on the pre-tax subtotal, though many tip on the post-tax total because it's simpler. This tool tips on the bill amount you enter, so enter the subtotal if you want pre-tax tipping." },
  { q: "What is the standard tip at a restaurant?", a: "15% is considered the minimum acceptable tip for adequate service in the US. 18–20% is the standard for good service. 20%+ shows exceptional appreciation. The tipping norm varies by country — some cultures have no tipping tradition at all." },
  { q: "How much should I tip for food delivery?", a: "15–20% of the order total, with a minimum of $3–5 for short distances. Consider tipping more for bad weather, large orders, long distances, or above-average service." },
  { q: "What is the easiest way to calculate any tip percentage mentally?", a: "Find 10% (move decimal one place left) as your base. 15% = 10% + half of 10%. 20% = double 10%. 25% = 10% + 10% + 5%. For 18%, find 20% then subtract 10% of the result." },
];

export default function TipCalculatorPage() {
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

      <div className="min-h-screen" style={{ background: "#fffbf0" }}>
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
          style={{ background: "rgba(255,251,240,0.92)", borderBottom: "1px solid rgba(245,158,11,0.12)" }}>
          <div className="max-w-3xl mx-auto px-6 h-13 flex items-center justify-between">
            <nav className="flex items-center gap-1.5" style={{ color: "rgba(120,53,15,0.5)", fontSize: "12px" }}>
              <Link href="/" className="font-medium hover:text-[#78350f] transition-colors" style={{ color: "inherit" }}>Sakib</Link>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
              <Link href="/tools" className="hover:text-[#78350f] transition-colors" style={{ color: "inherit" }}>Tools</Link>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
              <span style={{ color: "#78350f", fontWeight: 600 }}>Tip Calculator</span>
            </nav>
            <Link href="/tools" className="hover:opacity-80 transition-opacity"
              style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(120,53,15,0.4)" }}>
              All tools
            </Link>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-6 pt-24 pb-20">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full text-[10px] font-semibold"
              style={{ background: "#fef3c7", color: "#92400e", border: "1px solid #fde68a" }}>
              🧾 CALCULATORS
            </div>
            <h1 className="font-semibold tracking-tight leading-tight mb-2.5"
              style={{ fontSize: "clamp(26px,4vw,34px)", color: "#1c1b18" }}>
              Tip Calculator & Bill Splitter
            </h1>
            <p style={{ fontSize: "13.5px", color: "rgba(3,3,2,0.45)", lineHeight: 1.65 }}>
              Enter the bill, pick a tip percentage, and split between any number of people.
            </p>
          </div>
          <TipCalculator />
        </main>

        <div style={{ borderTop: "1px solid rgba(245,158,11,0.1)" }}>
          <div className="max-w-3xl mx-auto px-6 py-20 space-y-20">

            <section>
              <h2 className="font-semibold tracking-tight mb-2" style={{ fontSize: "21px", color: "#1c1b18" }}>
                Tipping Etiquette Guide
              </h2>
              <p className="mb-6" style={{ fontSize: "13.5px", color: "rgba(3,3,2,0.5)", lineHeight: 1.7 }}>
                Standard tip amounts by service type in the United States.
              </p>
              <div className="rounded-[16px] overflow-hidden" style={{ boxShadow: "0 0 0 1px rgba(245,158,11,0.15)" }}>
                <table className="w-full text-left" style={{ background: "#ffffff" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(245,158,11,0.1)", background: "#fffbf0" }}>
                      {["Service", "Typical Tip", "Note"].map(h => (
                        <th key={h} className="px-5 py-3.5"
                          style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(120,53,15,0.5)" }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {TIP_ETIQUETTE.map(({ service, tip, note }, i) => (
                      <tr key={service} style={{ borderBottom: i < TIP_ETIQUETTE.length - 1 ? "1px solid rgba(245,158,11,0.06)" : "none" }}>
                        <td className="px-5 py-3.5 font-medium" style={{ fontSize: "13px", color: "#1c1b18" }}>{service}</td>
                        <td className="px-5 py-3.5 font-bold" style={{ fontSize: "12.5px", color: "#92400e" }}>{tip}</td>
                        <td className="px-5 py-3.5" style={{ fontSize: "12px", color: "rgba(3,3,2,0.45)" }}>{note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
              style={{ background: "#f59e0b", boxShadow: "0 8px 32px rgba(245,158,11,0.25)" }}>
              <p className="font-semibold tracking-tight mb-2" style={{ fontSize: "19px", color: "#ffffff" }}>More free tools</p>
              <p className="mb-6" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>
                Mortgage calculator, percentage tool, unit converter and more.
              </p>
              <Link href="/tools" className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] font-medium transition-opacity hover:opacity-85"
                style={{ background: "#ffffff", color: "#92400e", fontSize: "13px" }}>
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
