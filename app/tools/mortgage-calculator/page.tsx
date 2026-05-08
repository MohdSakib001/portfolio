import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import MortgageCalculator from "./MortgageCalculator";

export const metadata: Metadata = {
  title: "Free Mortgage Calculator — Monthly Payment & Amortization Schedule",
  description:
    "Calculate your monthly mortgage payment, total interest paid, and full amortization schedule. Enter loan amount, interest rate, term, and down payment. Free, instant, no sign-up.",
  keywords: [
    "mortgage calculator", "monthly mortgage payment calculator", "home loan calculator",
    "mortgage payment calculator", "amortization calculator", "mortgage interest calculator",
    "house loan calculator", "mortgage affordability calculator", "loan repayment calculator",
  ],
  alternates: { canonical: "https://mohdsakib.vercel.app/tools/mortgage-calculator" },
  openGraph: {
    title: "Free Mortgage Calculator — Monthly Payment & Amortization",
    description: "Calculate monthly payment, total interest, and full amortization schedule for any mortgage.",
    url: "https://mohdsakib.vercel.app/tools/mortgage-calculator",
    type: "website",
  },
};

const FAQS = [
  { q: "How is the monthly mortgage payment calculated?", a: "The standard formula is: M = P[r(1+r)^n] / [(1+r)^n − 1], where P is the principal (loan amount minus down payment), r is the monthly interest rate (annual rate ÷ 12), and n is the total number of payments (years × 12). This is the fixed monthly payment for a fixed-rate mortgage." },
  { q: "What is amortization?", a: "Amortization is the process of paying off a loan through regular scheduled payments. Each payment covers both principal and interest. Early in the loan, most of the payment goes toward interest. As the balance decreases, more goes to principal. This tool generates the full amortization schedule showing this split for every month." },
  { q: "Should I choose a 15-year or 30-year mortgage?", a: "A 30-year mortgage has lower monthly payments but significantly higher total interest paid. A 15-year mortgage costs less overall and builds equity faster, but requires higher monthly payments. The right choice depends on your monthly budget, how long you plan to stay in the home, and your other financial goals." },
  { q: "What is a down payment?", a: "A down payment is the upfront cash you pay toward the home's purchase price. The rest is financed through the mortgage. A 20% down payment is conventional — it typically avoids Private Mortgage Insurance (PMI) which adds to your monthly cost. Some loans allow as little as 3–5% down." },
  { q: "Does this calculator include property taxes and insurance?", a: "No. This calculator shows principal and interest only. Your actual monthly payment to the lender will also include property taxes and homeowners insurance (and possibly PMI), which are typically held in an escrow account. Add 20–30% to the calculated payment as a rough estimate of total housing costs." },
  { q: "What is a good interest rate for a mortgage?", a: "Mortgage rates vary by country, economic conditions, loan type, credit score, and down payment. In the US, 30-year fixed rates have historically ranged from 3% to 8%+. Check current rates from multiple lenders and compare the APR (annual percentage rate), which includes fees, for a fair comparison." },
];

export default function MortgageCalculatorPage() {
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

      <div className="min-h-screen" style={{ background: "#f0f4fa" }}>
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
          style={{ background: "rgba(240,244,250,0.92)", borderBottom: "1px solid rgba(15,39,68,0.08)" }}>
          <div className="max-w-3xl mx-auto px-6 h-13 flex items-center justify-between">
            <nav className="flex items-center gap-1.5" style={{ color: "rgba(15,39,68,0.4)", fontSize: "12px" }}>
              <Link href="/" className="font-medium hover:text-[#0f2744] transition-colors" style={{ color: "inherit" }}>Sakib</Link>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
              <Link href="/tools" className="hover:text-[#0f2744] transition-colors" style={{ color: "inherit" }}>Tools</Link>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
              <span style={{ color: "#0f2744", fontWeight: 600 }}>Mortgage Calculator</span>
            </nav>
            <Link href="/tools" className="hover:opacity-80 transition-opacity"
              style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(15,39,68,0.4)" }}>
              All tools
            </Link>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-6 pt-24 pb-20">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full text-[10px] font-semibold"
              style={{ background: "#dbeafe", color: "#1d4ed8", border: "1px solid #bfdbfe" }}>
              🏠 CALCULATORS
            </div>
            <h1 className="font-semibold tracking-tight leading-tight mb-2.5"
              style={{ fontSize: "clamp(26px,4vw,34px)", color: "#0f2744" }}>
              Mortgage Calculator
            </h1>
            <p style={{ fontSize: "13.5px", color: "rgba(15,39,68,0.5)", lineHeight: 1.65 }}>
              Calculate monthly payment, total interest, and full amortization schedule.
            </p>
          </div>
          <MortgageCalculator />
        </main>

        <div style={{ borderTop: "1px solid rgba(15,39,68,0.07)" }}>
          <div className="max-w-3xl mx-auto px-6 py-20 space-y-20">

            <section>
              <h2 className="font-semibold tracking-tight mb-4" style={{ fontSize: "21px", color: "#0f2744" }}>
                Understanding Your Mortgage
              </h2>
              <p style={{ fontSize: "14px", color: "rgba(15,39,68,0.55)", lineHeight: 1.85 }}>
                A mortgage is a loan secured by a property. You borrow the purchase price (minus your down payment) from
                a lender and repay it over the loan term with interest. Your monthly payment stays fixed for a fixed-rate
                mortgage, but the split between principal and interest changes over time — a process called amortization.
              </p>
              <p className="mt-4" style={{ fontSize: "14px", color: "rgba(15,39,68,0.55)", lineHeight: 1.85 }}>
                In the early years of a mortgage, the majority of your payment covers interest. As your balance decreases,
                more goes to principal. This is why making extra principal payments early in the loan saves a
                disproportionate amount of interest over the life of the loan.
              </p>
            </section>

            <section>
              <h2 className="font-semibold tracking-tight mb-6" style={{ fontSize: "21px", color: "#0f2744" }}>Frequently Asked Questions</h2>
              <div className="space-y-px rounded-[16px] overflow-hidden" style={{ boxShadow: "0 0 0 1px rgba(15,39,68,0.07)" }}>
                {FAQS.map(({ q, a }, i) => (
                  <div key={i} className="px-6 py-5"
                    style={{ background: "#ffffff", borderBottom: i < FAQS.length - 1 ? "1px solid rgba(15,39,68,0.05)" : "none" }}>
                    <p className="font-medium mb-2" style={{ fontSize: "14px", color: "#0f2744" }}>{q}</p>
                    <p style={{ fontSize: "13px", color: "rgba(15,39,68,0.5)", lineHeight: 1.75 }}>{a}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[20px] px-8 py-10 text-center"
              style={{ background: "linear-gradient(135deg, #0f2744, #1d4ed8)", boxShadow: "0 8px 32px rgba(15,39,68,0.2)" }}>
              <p className="font-semibold tracking-tight mb-2" style={{ fontSize: "19px", color: "#ffffff" }}>More free tools</p>
              <p className="mb-6" style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
                Percentage calculator, unit converter, tip calculator and more.
              </p>
              <Link href="/tools" className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] font-medium transition-opacity hover:opacity-85"
                style={{ background: "#ffffff", color: "#0f2744", fontSize: "13px" }}>
                Browse all tools
              </Link>
            </section>

            <div className="pb-4">
              <Link href="/tools" className="inline-flex items-center gap-2.5 hover:opacity-70 transition-opacity"
                style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(15,39,68,0.35)" }}>
                <span>←</span> Back to tools
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
