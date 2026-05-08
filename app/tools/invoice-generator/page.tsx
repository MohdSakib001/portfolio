import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import InvoiceGenerator from "./InvoiceGenerator";

export const metadata: Metadata = {
  title: "Free Invoice Generator — Create & Download Professional Invoices",
  description:
    "Generate professional invoices instantly. Add line items, apply tax and discount, preview in real time, and print or save as PDF. Free, no sign-up required.",
  keywords: [
    "invoice generator",
    "free invoice maker",
    "professional invoice creator",
    "online invoice generator",
    "invoice template",
    "freelance invoice",
    "PDF invoice generator",
    "invoice with tax",
    "small business invoice",
    "create invoice online",
  ],
  alternates: { canonical: "https://mohdsakib.vercel.app/tools/invoice-generator" },
  openGraph: {
    title: "Free Invoice Generator — Create & Download Professional Invoices",
    description:
      "Generate, preview, and print professional invoices instantly. Tax, discount, multi-currency support — no sign-up needed.",
    url: "https://mohdsakib.vercel.app/tools/invoice-generator",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Can I download the invoice as a PDF?",
    a: "Yes. Click the 'Print / Save as PDF' button. Your browser's print dialog will open — select 'Save as PDF' as the destination. This works in Chrome, Firefox, Safari, and Edge with no additional software required.",
  },
  {
    q: "Is this invoice generator completely free?",
    a: "Yes, it is 100% free with no account, no watermark, and no usage limits. All processing happens in your browser — your invoice data is never sent to any server.",
  },
  {
    q: "Can I add tax to my invoice?",
    a: "Yes. Enter a tax percentage (up to 30%) in the Tax field. The tool automatically calculates the tax amount based on your subtotal after any discount is applied, and displays the final total due.",
  },
  {
    q: "What currencies does the invoice generator support?",
    a: "The tool supports USD (US Dollar), EUR (Euro), GBP (British Pound), INR (Indian Rupee), and AED (UAE Dirham). The selected currency symbol appears throughout the invoice preview automatically.",
  },
  {
    q: "How do I create a professional-looking invoice?",
    a: "Fill in your company name and contact info, add your client's details, enter your line items with quantities and unit prices, set the issue and due dates, and add any payment terms in the notes field. The live preview on the right updates instantly as you type.",
  },
  {
    q: "Who should use an invoice generator?",
    a: "Freelancers, consultants, designers, developers, photographers, contractors, and small business owners who need to bill clients quickly without subscribing to expensive accounting software. It is ideal for one-off projects and recurring client billing.",
  },
];

const WHO_FOR = [
  {
    title: "Freelancers",
    description:
      "Bill clients after project completion without needing expensive accounting software. Generate a clean PDF invoice in under two minutes.",
  },
  {
    title: "Consultants",
    description:
      "Create itemized invoices for consulting hours, workshops, or advisory retainers with precise tax and discount control.",
  },
  {
    title: "Small Businesses",
    description:
      "Issue invoices for products or services with your company branding. Multi-currency support makes it easy for international clients.",
  },
  {
    title: "Agencies & Studios",
    description:
      "Generate project invoices with multiple line items covering design, development, hosting, and support in one clean document.",
  },
];

export default function InvoiceGeneratorPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen" style={{ background: "#f0f4f8" }}>
        {/* HEADER */}
        <header
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
          style={{
            background: "rgba(240,244,248,0.92)",
            borderBottom: "1px solid rgba(15,23,42,0.08)",
          }}>
          <div className="max-w-7xl mx-auto px-6 h-13 flex items-center justify-between">
            <nav
              className="flex items-center gap-1.5"
              style={{ color: "rgba(15,23,42,0.4)", fontSize: "12px" }}>
              <Link
                href="/"
                className="font-medium hover:text-[#0f172a] transition-colors"
                style={{ color: "inherit" }}>
                Sakib
              </Link>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
              <Link
                href="/tools"
                className="hover:text-[#0f172a] transition-colors"
                style={{ color: "inherit" }}>
                Tools
              </Link>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
              <span style={{ color: "#0f172a", fontWeight: 600 }}>Invoice Generator</span>
            </nav>
            <Link
              href="/tools"
              className="hover:opacity-80 transition-opacity"
              style={{
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(15,23,42,0.4)",
              }}>
              All tools
            </Link>
          </div>
        </header>

        {/* MAIN */}
        <main className="max-w-7xl mx-auto px-6 pt-24 pb-16">
          <div className="mb-8">
            <div
              className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full text-[10px] font-semibold"
              style={{ background: "#dbeafe", color: "#1e40af", border: "1px solid #bfdbfe" }}>
              💼 PRODUCTIVITY
            </div>
            <h1
              className="font-semibold tracking-tight leading-tight mb-2.5"
              style={{ fontSize: "clamp(26px,4vw,34px)", color: "#0f172a" }}>
              Free Invoice Generator
            </h1>
            <p style={{ fontSize: "13.5px", color: "rgba(15,23,42,0.5)", lineHeight: 1.65 }}>
              Create professional invoices instantly. Live preview, tax &amp; discount support,
              multi-currency — print or save as PDF in one click. Built for freelancers and small
              businesses.
            </p>
          </div>

          <InvoiceGenerator />
        </main>

        {/* BELOW FOLD */}
        <div style={{ borderTop: "1px solid rgba(15,23,42,0.07)" }}>
          <div className="max-w-7xl mx-auto px-6 py-20 space-y-20">

            {/* WHO IS THIS FOR */}
            <section>
              <h2
                className="font-semibold tracking-tight mb-6"
                style={{ fontSize: "21px", color: "#0f172a" }}>
                Who Is This For?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {WHO_FOR.map(({ title, description }) => (
                  <div
                    key={title}
                    className="rounded-[16px] p-6"
                    style={{
                      background: "#ffffff",
                      boxShadow: "0 0 0 1px rgba(15,23,42,0.07), 0 2px 12px rgba(15,23,42,0.04)",
                    }}>
                    <p
                      className="font-semibold mb-2"
                      style={{ fontSize: "14px", color: "#0f172a" }}>
                      {title}
                    </p>
                    <p style={{ fontSize: "13px", color: "rgba(15,23,42,0.5)", lineHeight: 1.75 }}>
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2
                className="font-semibold tracking-tight mb-6"
                style={{ fontSize: "21px", color: "#0f172a" }}>
                Frequently Asked Questions
              </h2>
              <div
                className="space-y-px rounded-[16px] overflow-hidden"
                style={{ boxShadow: "0 0 0 1px rgba(15,23,42,0.07)" }}>
                {FAQS.map(({ q, a }, i) => (
                  <div
                    key={i}
                    className="px-6 py-5"
                    style={{
                      background: "#ffffff",
                      borderBottom:
                        i < FAQS.length - 1 ? "1px solid rgba(15,23,42,0.05)" : "none",
                    }}>
                    <p
                      className="font-medium mb-2"
                      style={{ fontSize: "14px", color: "#0f172a" }}>
                      {q}
                    </p>
                    <p style={{ fontSize: "13px", color: "rgba(15,23,42,0.5)", lineHeight: 1.75 }}>
                      {a}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section
              className="rounded-[20px] px-8 py-10 text-center"
              style={{
                background: "linear-gradient(135deg, #0f172a, #1e40af)",
                boxShadow: "0 8px 32px rgba(15,23,42,0.2)",
              }}>
              <p
                className="font-semibold tracking-tight mb-2"
                style={{ fontSize: "19px", color: "#ffffff" }}>
                More free tools
              </p>
              <p
                className="mb-6"
                style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
                Mortgage calculator, unit converter, password generator and more — all free, no
                sign-up.
              </p>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] font-medium transition-opacity hover:opacity-85"
                style={{ background: "#ffffff", color: "#0f172a", fontSize: "13px" }}>
                Browse all tools
              </Link>
            </section>

            {/* BACK LINK */}
            <div className="pb-4">
              <Link
                href="/tools"
                className="inline-flex items-center gap-2.5 hover:opacity-70 transition-opacity"
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(15,23,42,0.35)",
                }}>
                <span>←</span> Back to tools
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
