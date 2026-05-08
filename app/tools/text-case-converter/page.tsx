import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import TextCaseConverter from "./TextCaseConverter";

export const metadata: Metadata = {
  title: "Free Text Case Converter — UPPERCASE, lowercase, camelCase & More",
  description:
    "Instantly convert text to UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, or kebab-case. Free, no sign-up, runs in your browser.",
  keywords: [
    "text case converter", "uppercase converter", "lowercase converter", "title case converter",
    "camelcase converter", "snake case converter", "kebab case converter", "PascalCase converter",
    "text formatter", "change text case online", "sentence case tool",
  ],
  alternates: { canonical: "https://mohdsakib.vercel.app/tools/text-case-converter" },
  openGraph: {
    title: "Free Text Case Converter — UPPERCASE, lowercase, camelCase & More",
    description: "Convert text to 8 different cases instantly. Free, no sign-up, works in your browser.",
    url: "https://mohdsakib.vercel.app/tools/text-case-converter",
    type: "website",
  },
};

const CASES_INFO = [
  { name: "UPPERCASE",     example: "HELLO WORLD",  use: "Titles, acronyms, emphasis in headings, constants in code" },
  { name: "lowercase",     example: "hello world",  use: "URLs, email addresses, CSS class names, database fields" },
  { name: "Title Case",    example: "Hello World",  use: "Article headlines, book titles, product names, SEO page titles" },
  { name: "Sentence case", example: "Hello world",  use: "Normal prose, email subjects, form labels, meta descriptions" },
  { name: "camelCase",     example: "helloWorld",   use: "JavaScript variables, JSON keys, function names in most languages" },
  { name: "PascalCase",    example: "HelloWorld",   use: "Class names, React components, TypeScript interfaces, constructors" },
  { name: "snake_case",    example: "hello_world",  use: "Python variables, database columns, file names, Ruby methods" },
  { name: "kebab-case",    example: "hello-world",  use: "HTML attributes, CSS classes, URL slugs, npm package names" },
];

const FEATURES = [
  { title: "8 formats at once",    desc: "All conversions appear simultaneously — no need to switch modes." },
  { title: "One-click copy",       desc: "Each result has its own copy button. Click once to grab the exact format you need." },
  { title: "Live updates",         desc: "Conversions happen as you type — zero latency, no button to press." },
  { title: "Handles long text",    desc: "Paragraphs, entire documents — paste anything and get all 8 versions instantly." },
  { title: "Browser only",         desc: "Your text never leaves your device. No server, no storage, no tracking." },
  { title: "Developer-friendly",   desc: "camelCase, PascalCase, snake_case and kebab-case — the four formats devs use every day." },
];

const FAQS = [
  { q: "What is camelCase?", a: "camelCase joins words without spaces, capitalising every word after the first. Example: \"hello world\" becomes \"helloWorld\". It's the most common naming convention in JavaScript, Java, and Swift." },
  { q: "When should I use snake_case vs kebab-case?", a: "snake_case uses underscores and is preferred in Python, Ruby, and SQL. kebab-case uses hyphens and is the standard for URLs, CSS class names, HTML attributes, and npm package names. Both are lowercase." },
  { q: "What is Title Case vs Sentence case?", a: "Title Case capitalises every word (\"The Quick Brown Fox\"), while Sentence case only capitalises the first word (\"The quick brown fox\"). Use Title Case for headlines and Sentence case for regular body copy or meta descriptions." },
  { q: "Does this convert entire paragraphs?", a: "Yes. Paste any amount of text — a single word, a sentence, or multiple paragraphs. The converter handles it all without any character limit." },
  { q: "Why is PascalCase different from Title Case?", a: "Title Case keeps spaces between words. PascalCase removes all spaces and capitalises each word, making it a single joined identifier (\"HelloWorld\"). PascalCase is standard for class names in most languages." },
  { q: "Does the tool handle special characters?", a: "For camelCase, PascalCase, snake_case, and kebab-case, special characters and punctuation are stripped to produce clean identifiers. For the other four cases, special characters are preserved as-is." },
];

export default function TextCaseConverterPage() {
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

      <div className="min-h-screen" style={{ background: "#0a0a08" }}>
        {/* Breadcrumb nav */}
        <header
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
          style={{
            background: "rgba(10,10,8,0.9)",
            borderBottom: "1px solid rgba(163,230,53,0.08)",
          }}
        >
          <div className="max-w-3xl mx-auto px-6 h-13 flex items-center justify-between">
            <nav className="flex items-center gap-1.5 font-mono" style={{ color: "rgba(163,230,53,0.4)", fontSize: "11px" }}>
              <Link href="/" className="hover:text-[#a3e635] transition-colors" style={{ color: "inherit" }}>
                sakib
              </Link>
              <ChevronRight size={10} style={{ opacity: 0.4 }} />
              <Link href="/tools" className="hover:text-[#a3e635] transition-colors" style={{ color: "inherit" }}>
                tools
              </Link>
              <ChevronRight size={10} style={{ opacity: 0.4 }} />
              <span style={{ color: "#a3e635" }}>text-case-converter</span>
            </nav>
            <Link
              href="/tools"
              className="hover:opacity-70 transition-opacity font-mono"
              style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(163,230,53,0.35)" }}
            >
              all tools
            </Link>
          </div>
        </header>

        {/* Tool section */}
        <main className="max-w-3xl mx-auto px-6 pt-24 pb-20">
          <div className="mb-8">
            <div
              className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full font-mono text-[10px]"
              style={{ background: "rgba(163,230,53,0.08)", color: "#a3e635", border: "1px solid rgba(163,230,53,0.12)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635] inline-block" />
              TEXT &amp; WRITING
            </div>
            <h1
              className="font-semibold tracking-tight leading-tight mb-2.5"
              style={{ fontSize: "clamp(26px,4vw,34px)", color: "#e8e6e0" }}
            >
              Text Case Converter
            </h1>
            <p style={{ fontSize: "13.5px", color: "rgba(232,230,224,0.4)", lineHeight: 1.65, fontFamily: "monospace" }}>
              Type or paste below — all 8 case formats update instantly.
            </p>
          </div>

          <TextCaseConverter />
        </main>

        {/* SEO section */}
        <div style={{ borderTop: "1px solid rgba(163,230,53,0.06)" }}>
          <div className="max-w-3xl mx-auto px-6 py-20 space-y-20">

            <section>
              <h2 className="font-semibold tracking-tight mb-4" style={{ fontSize: "21px", color: "#e8e6e0" }}>
                What is a Text Case Converter?
              </h2>
              <p style={{ fontSize: "14px", color: "rgba(232,230,224,0.45)", lineHeight: 1.85 }}>
                A text case converter transforms a string of text into different capitalisation formats — UPPERCASE, lowercase,
                Title Case, Sentence case, camelCase, PascalCase, snake_case, and kebab-case. Writers use it to fix accidental
                caps-lock text, format headlines, or normalise copy. Developers use it to convert variable names between the
                naming conventions of different languages without retyping.
              </p>
              <p className="mt-4" style={{ fontSize: "14px", color: "rgba(232,230,224,0.45)", lineHeight: 1.85 }}>
                This tool runs entirely in your browser. Paste a word, a sentence, or an entire document and all eight conversions
                appear simultaneously. Nothing is sent to any server.
              </p>
            </section>

            <section>
              <h2 className="font-semibold tracking-tight mb-6" style={{ fontSize: "21px", color: "#e8e6e0" }}>
                All 8 Case Formats Explained
              </h2>
              <div
                className="rounded-[16px] overflow-hidden"
                style={{ boxShadow: "0 0 0 1px rgba(163,230,53,0.08)" }}
              >
                <table className="w-full text-left" style={{ background: "#111110" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(163,230,53,0.08)" }}>
                      {["Format", "Example", "Common use"].map(h => (
                        <th key={h} className="px-5 py-3.5"
                          style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(163,230,53,0.4)", fontFamily: "monospace" }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {CASES_INFO.map(({ name, example, use }, i) => (
                      <tr key={name} style={{ borderBottom: i < CASES_INFO.length - 1 ? "1px solid rgba(163,230,53,0.04)" : "none" }}>
                        <td className="px-5 py-3.5 font-mono" style={{ fontSize: "12.5px", color: "#a3e635", fontWeight: 600 }}>{name}</td>
                        <td className="px-5 py-3.5 font-mono" style={{ fontSize: "12px", color: "rgba(232,230,224,0.6)" }}>{example}</td>
                        <td className="px-5 py-3.5" style={{ fontSize: "12px", color: "rgba(232,230,224,0.4)", lineHeight: 1.5 }}>{use}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="font-semibold tracking-tight mb-6" style={{ fontSize: "21px", color: "#e8e6e0" }}>Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FEATURES.map(({ title, desc }) => (
                  <div key={title} className="rounded-[14px] p-5" style={{ background: "#111110", boxShadow: "0 0 0 1px rgba(163,230,53,0.06)" }}>
                    <p className="font-medium mb-1 font-mono" style={{ fontSize: "12.5px", color: "#a3e635" }}>{title}</p>
                    <p style={{ fontSize: "12px", color: "rgba(232,230,224,0.4)", lineHeight: 1.7 }}>{desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-semibold tracking-tight mb-6" style={{ fontSize: "21px", color: "#e8e6e0" }}>Frequently Asked Questions</h2>
              <div className="space-y-px rounded-[16px] overflow-hidden" style={{ boxShadow: "0 0 0 1px rgba(163,230,53,0.08)" }}>
                {FAQS.map(({ q, a }, i) => (
                  <div key={i} className="px-6 py-5"
                    style={{ background: "#111110", borderBottom: i < FAQS.length - 1 ? "1px solid rgba(163,230,53,0.05)" : "none" }}>
                    <p className="font-medium mb-2" style={{ fontSize: "13.5px", color: "#e8e6e0" }}>{q}</p>
                    <p style={{ fontSize: "12.5px", color: "rgba(232,230,224,0.4)", lineHeight: 1.75 }}>{a}</p>
                  </div>
                ))}
              </div>
            </section>

            <section
              className="rounded-[20px] px-8 py-10 text-center"
              style={{ background: "#111110", boxShadow: "0 0 0 1px rgba(163,230,53,0.1)" }}
            >
              <p className="font-semibold tracking-tight mb-2" style={{ fontSize: "19px", color: "#e8e6e0" }}>More free tools</p>
              <p className="mb-6" style={{ fontSize: "13px", color: "rgba(232,230,224,0.35)", lineHeight: 1.7 }}>
                Calculators, developer utilities, image tools — all free, all in your browser.
              </p>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] font-mono font-medium transition-opacity hover:opacity-80"
                style={{ background: "#a3e635", color: "#0a0a08", fontSize: "12px", letterSpacing: "0.05em" }}
              >
                Browse all tools
              </Link>
            </section>

            <div className="pb-4">
              <Link href="/tools" className="inline-flex items-center gap-2.5 hover:opacity-60 transition-opacity font-mono"
                style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(163,230,53,0.3)" }}>
                <span>←</span> Back to tools
              </Link>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
