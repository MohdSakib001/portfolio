import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import JsonFormatter from "./JsonFormatter";

export const metadata: Metadata = {
  title: "Free JSON Formatter & Diff — Validate, Beautify & Compare JSON",
  description:
    "Format and validate JSON with syntax highlighting. Minify JSON, or use diff mode to compare two JSON blobs side by side. Free, browser-based, nothing sent to any server.",
  keywords: [
    "JSON formatter", "JSON beautifier", "JSON validator", "JSON minifier",
    "JSON diff", "format JSON online", "beautify JSON", "JSON parser online",
    "JSON compare tool", "JSON syntax checker",
  ],
  alternates: { canonical: "https://mohdsakib.vercel.app/tools/json-formatter" },
  openGraph: {
    title: "Free JSON Formatter & Diff — Validate, Beautify & Compare",
    description: "Format, minify, validate, and diff JSON. Syntax highlighted, browser-based.",
    url: "https://mohdsakib.vercel.app/tools/json-formatter",
    type: "website",
  },
};

const FAQS = [
  { q: "What is JSON?", a: "JSON (JavaScript Object Notation) is a lightweight, human-readable data interchange format. It represents data as key-value pairs (objects) and ordered lists (arrays). JSON is the dominant format for web APIs, configuration files, and data storage because it's easy to parse in virtually every programming language." },
  { q: "How do I validate JSON?", a: "Paste your JSON into the input area. The formatter shows 'Valid' in green or an error message in red pointing to the exact syntax problem. Valid JSON must have properly quoted strings, correct comma placement, no trailing commas, and matching brackets/braces." },
  { q: "What is JSON minification?", a: "Minification removes all unnecessary whitespace (spaces, newlines, indentation) from JSON, reducing file size without changing the data. Switch to 'Minify' mode to get the most compact possible representation — useful for reducing payload sizes in API responses." },
  { q: "What does the diff mode do?", a: "Diff mode lets you paste two JSON objects and see them side by side with changed lines highlighted. Lines that differ between A and B are highlighted in red (A) and green (B), making it easy to spot what changed between two API responses or config versions." },
  { q: "Why do I get 'SyntaxError: Unexpected token' in JSON?", a: "Common causes: trailing commas after the last item (not allowed in JSON, though allowed in JavaScript), single-quoted strings (JSON requires double quotes), undefined or unquoted values, or a missing closing bracket/brace. The error message will indicate the position in the string." },
  { q: "Is there a size limit for JSON I can format?", a: "There's no enforced limit — the tool processes everything in your browser's JavaScript engine. Very large JSON objects (10MB+) may be slow to format depending on your device. For smaller JSONs, formatting is instant." },
];

export default function JsonFormatterPage() {
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

      <div className="min-h-screen" style={{ background: "#141414" }}>
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
          style={{ background: "rgba(20,20,20,0.95)", borderBottom: "1px solid rgba(212,212,170,0.08)" }}>
          <div className="max-w-4xl mx-auto px-6 h-13 flex items-center justify-between">
            <nav className="flex items-center gap-1.5 font-mono" style={{ color: "rgba(212,212,170,0.4)", fontSize: "11px" }}>
              <Link href="/" className="hover:text-[#d4d4aa] transition-colors" style={{ color: "inherit" }}>sakib</Link>
              <ChevronRight size={10} style={{ opacity: 0.4 }} />
              <Link href="/tools" className="hover:text-[#d4d4aa] transition-colors" style={{ color: "inherit" }}>tools</Link>
              <ChevronRight size={10} style={{ opacity: 0.4 }} />
              <span style={{ color: "#d4d4aa" }}>json-formatter</span>
            </nav>
            <Link href="/tools" className="hover:opacity-80 transition-opacity font-mono"
              style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,212,170,0.3)" }}>
              all tools
            </Link>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 pt-24 pb-20">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full text-[10px] font-mono font-semibold"
              style={{ background: "rgba(212,212,170,0.08)", color: "#d4d4aa", border: "1px solid rgba(212,212,170,0.12)" }}>
              {} DEVELOPER
            </div>
            <h1 className="font-semibold tracking-tight leading-tight mb-2.5 font-mono"
              style={{ fontSize: "clamp(24px,4vw,32px)", color: "#d4d4d4" }}>
              JSON Formatter & Diff
            </h1>
            <p style={{ fontSize: "13.5px", color: "rgba(212,212,212,0.4)", lineHeight: 1.65, fontFamily: "monospace" }}>
              Format, validate, minify, and diff JSON. All in your browser.
            </p>
          </div>
          <JsonFormatter />
        </main>

        <div style={{ borderTop: "1px solid rgba(212,212,170,0.06)" }}>
          <div className="max-w-4xl mx-auto px-6 py-20 space-y-20">

            <section>
              <h2 className="font-semibold tracking-tight mb-4" style={{ fontSize: "21px", color: "#d4d4d4" }}>
                What Can You Do with This Tool?
              </h2>
              <p style={{ fontSize: "14px", color: "rgba(212,212,212,0.45)", lineHeight: 1.85 }}>
                This JSON tool covers the three most common tasks when working with JSON data. The formatter
                (Pretty mode) takes any valid JSON — even minified, single-line API responses — and returns
                it as properly indented, readable text with syntax highlighting. Minify mode does the reverse.
                Diff mode makes it easy to compare two API responses and immediately see what fields changed.
              </p>
            </section>

            <section>
              <h2 className="font-semibold tracking-tight mb-6" style={{ fontSize: "21px", color: "#d4d4d4" }}>Frequently Asked Questions</h2>
              <div className="rounded-[16px] overflow-hidden" style={{ border: "1px solid rgba(212,212,170,0.08)" }}>
                {FAQS.map(({ q, a }, i) => (
                  <div key={i} className="px-6 py-5"
                    style={{ background: "#1e1e1e", borderBottom: i < FAQS.length - 1 ? "1px solid rgba(212,212,170,0.05)" : "none" }}>
                    <p className="font-semibold mb-2 font-mono" style={{ fontSize: "13.5px", color: "#d4d4d4" }}>{q}</p>
                    <p style={{ fontSize: "12.5px", color: "rgba(212,212,212,0.45)", lineHeight: 1.75 }}>{a}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[20px] px-8 py-10 text-center"
              style={{ background: "#1e1e1e", border: "1px solid rgba(212,212,170,0.1)" }}>
              <p className="font-semibold tracking-tight mb-2" style={{ fontSize: "19px", color: "#d4d4d4" }}>More developer tools</p>
              <p className="mb-6" style={{ fontSize: "13px", color: "rgba(212,212,212,0.35)", lineHeight: 1.7 }}>
                JWT decoder, regex tester, SQL formatter, Base64 encoder and more.
              </p>
              <Link href="/tools" className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] font-mono font-medium transition-opacity hover:opacity-80"
                style={{ background: "#d4d4aa", color: "#1e1e1e", fontSize: "12px" }}>
                Browse all tools
              </Link>
            </section>

            <div className="pb-4">
              <Link href="/tools" className="inline-flex items-center gap-2.5 hover:opacity-60 transition-opacity font-mono"
                style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(212,212,170,0.3)" }}>
                <span>←</span> Back to tools
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
