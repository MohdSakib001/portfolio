import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ColorContrastChecker from "./ColorContrastChecker";

export const metadata: Metadata = {
  title: "Free Color Contrast Checker — WCAG AA & AAA Accessibility",
  description:
    "Check the contrast ratio between any two hex colours. Instant WCAG 2.1 AA and AAA pass/fail results for normal and large text. Essential for accessible web design.",
  keywords: [
    "color contrast checker", "WCAG contrast checker", "accessibility contrast ratio",
    "colour contrast tool", "WCAG AA checker", "WCAG AAA", "contrast ratio calculator",
    "web accessibility tool", "hex color contrast", "accessible colors",
  ],
  alternates: { canonical: "https://mohdsakib.vercel.app/tools/color-contrast-checker" },
  openGraph: {
    title: "Free Color Contrast Checker — WCAG AA & AAA",
    description: "Check WCAG contrast ratios for any two colours. AA/AAA pass/fail for small and large text.",
    url: "https://mohdsakib.vercel.app/tools/color-contrast-checker",
    type: "website",
  },
};

const WCAG_LEVELS = [
  { level: "AA — Normal text",  ratio: "≥ 4.5:1", use: "Body copy, labels, input text (under 18pt / 14pt bold)" },
  { level: "AA — Large text",   ratio: "≥ 3:1",   use: "Headings (18pt+ or 14pt+ bold), decorative text" },
  { level: "AAA — Normal text", ratio: "≥ 7:1",   use: "Enhanced accessibility for critical or extended reading" },
  { level: "AAA — Large text",  ratio: "≥ 4.5:1", use: "Enhanced large text — highest contrast requirement" },
  { level: "UI components",     ratio: "≥ 3:1",   use: "Active UI elements, input borders, focus indicators (WCAG 1.4.11)" },
];

const FAQS = [
  { q: "What is WCAG?", a: "WCAG (Web Content Accessibility Guidelines) is an international standard developed by the W3C that defines how to make web content more accessible to people with disabilities, including those with visual impairments. The contrast ratio requirements are found in WCAG 2.1 Success Criterion 1.4.3 (Contrast Minimum) and 1.4.6 (Contrast Enhanced)." },
  { q: "What contrast ratio do I need to pass WCAG AA?", a: "For AA compliance: normal text (under 18pt or 14pt bold) needs a minimum 4.5:1 ratio. Large text (18pt or 14pt bold) needs at least 3:1. Most websites aim for AA compliance at minimum." },
  { q: "What is WCAG AAA?", a: "AAA is the highest WCAG conformance level, requiring 7:1 for normal text and 4.5:1 for large text. AAA is recommended for text that users need to read for extended periods, but the W3C notes it may not be possible to achieve for all content." },
  { q: "How is contrast ratio calculated?", a: "Contrast ratio = (L1 + 0.05) / (L2 + 0.05), where L1 is the relative luminance of the lighter colour and L2 the darker. Luminance is calculated by converting sRGB values to linear light values. A ratio of 1:1 means identical colours; 21:1 is black on white (the maximum)." },
  { q: "Does the contrast checker work for dark mode?", a: "Yes. Enter your dark mode background as the background colour and your dark mode text as the foreground colour. The WCAG ratio requirements are the same regardless of whether the design is light or dark." },
  { q: "Why do I sometimes see colours that look fine but fail WCAG?", a: "Human perception of contrast is subjective and context-dependent. WCAG uses a mathematical formula that doesn't perfectly match perceived contrast in all cases. Some colours that seem fine to those with normal vision may be difficult for people with colour vision deficiencies or low contrast sensitivity." },
];

export default function ColorContrastCheckerPage() {
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

      <div className="min-h-screen" style={{ background: "#F8F7F4" }}>
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
          style={{ background: "rgba(248,247,244,0.9)", borderBottom: "1px solid rgba(3,3,2,0.06)" }}>
          <div className="max-w-3xl mx-auto px-6 h-13 flex items-center justify-between">
            <nav className="flex items-center gap-1.5" style={{ color: "rgba(3,3,2,0.4)", fontSize: "12px" }}>
              <Link href="/" className="font-medium hover:text-[#1c1b18] transition-colors" style={{ color: "inherit" }}>Sakib</Link>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
              <Link href="/tools" className="hover:text-[#1c1b18] transition-colors" style={{ color: "inherit" }}>Tools</Link>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
              <span style={{ color: "#1c1b18", fontWeight: 500 }}>Color Contrast Checker</span>
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
              style={{ background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe" }}>
              ♿ DEVELOPER · ACCESSIBILITY
            </div>
            <h1 className="font-semibold tracking-tight leading-tight mb-2.5"
              style={{ fontSize: "clamp(26px,4vw,34px)", color: "#1c1b18" }}>
              Color Contrast Checker
            </h1>
            <p style={{ fontSize: "13.5px", color: "rgba(3,3,2,0.45)", lineHeight: 1.65 }}>
              Enter two hex colours — get instant WCAG 2.1 AA and AAA pass/fail results.
            </p>
          </div>
          <ColorContrastChecker />
        </main>

        <div style={{ borderTop: "1px solid rgba(3,3,2,0.06)" }}>
          <div className="max-w-3xl mx-auto px-6 py-20 space-y-20">

            <section>
              <h2 className="font-semibold tracking-tight mb-2" style={{ fontSize: "21px", color: "#1c1b18" }}>
                WCAG Contrast Requirements at a Glance
              </h2>
              <p className="mb-6" style={{ fontSize: "13.5px", color: "rgba(3,3,2,0.5)", lineHeight: 1.7 }}>
                Requirements from WCAG 2.1. Large text means at least 18pt (24px) regular or 14pt (18.67px) bold.
              </p>
              <div className="rounded-[16px] overflow-hidden" style={{ boxShadow: "0 0 0 1px rgba(3,3,2,0.06)" }}>
                <table className="w-full text-left" style={{ background: "#ffffff" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(3,3,2,0.06)" }}>
                      {["Level", "Min Ratio", "Applies To"].map(h => (
                        <th key={h} className="px-5 py-3.5"
                          style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(3,3,2,0.35)" }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {WCAG_LEVELS.map(({ level, ratio, use }, i) => (
                      <tr key={level} style={{ borderBottom: i < WCAG_LEVELS.length - 1 ? "1px solid rgba(3,3,2,0.04)" : "none" }}>
                        <td className="px-5 py-3.5 font-medium" style={{ fontSize: "13px", color: "#1c1b18" }}>{level}</td>
                        <td className="px-5 py-3.5 font-mono font-bold" style={{ fontSize: "12.5px", color: "#2563eb" }}>{ratio}</td>
                        <td className="px-5 py-3.5" style={{ fontSize: "12px", color: "rgba(3,3,2,0.5)" }}>{use}</td>
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
              style={{ background: "#ffffff", boxShadow: "0 0 0 1px rgba(3,3,2,0.06), 0 4px 24px rgba(3,3,2,0.05)" }}>
              <p className="font-semibold tracking-tight mb-2" style={{ fontSize: "19px", color: "#1c1b18" }}>More free tools</p>
              <p className="mb-6" style={{ fontSize: "13px", color: "rgba(3,3,2,0.45)", lineHeight: 1.7 }}>
                JWT decoder, regex tester, JSON formatter — all free, all in your browser.
              </p>
              <Link href="/tools" className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] font-medium transition-opacity hover:opacity-80"
                style={{ background: "#1c1b18", color: "#F8F7F4", fontSize: "13px" }}>
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
