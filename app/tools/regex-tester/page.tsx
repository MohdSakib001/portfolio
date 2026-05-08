import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import RegexTester from "./RegexTester";

export const metadata: Metadata = {
  title: "Free Regex Tester — Test & Debug Regular Expressions Online",
  description:
    "Test regular expressions against live input with real-time match highlighting. Supports all standard flags (g, i, m, s), capture groups, and a replace mode. Free, browser-based.",
  keywords: [
    "regex tester", "regular expression tester", "regex online", "test regex online",
    "regex debugger", "regular expression checker", "regex validator",
    "regex match", "regex replace online", "regex flags",
  ],
  alternates: { canonical: "https://mohdsakib.vercel.app/tools/regex-tester" },
  openGraph: {
    title: "Free Regex Tester — Test Regular Expressions with Live Highlighting",
    description: "Test regex patterns with live match highlighting, flags, capture groups, and replace mode.",
    url: "https://mohdsakib.vercel.app/tools/regex-tester",
    type: "website",
  },
};

const COMMON_PATTERNS = [
  { name: "Email address",        pattern: "\\b[\\w.+-]+@[\\w-]+\\.[\\w.]+\\b",          flags: "gi" },
  { name: "URL",                  pattern: "https?:\\/\\/[^\\s]+",                         flags: "gi" },
  { name: "Phone (US)",           pattern: "\\+?1?[-.\\s]?\\(?[2-9]\\d{2}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}", flags: "g" },
  { name: "IPv4 address",         pattern: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b",            flags: "g" },
  { name: "Date (YYYY-MM-DD)",    pattern: "\\b\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])\\b", flags: "g" },
  { name: "Hex colour",           pattern: "#(?:[0-9a-fA-F]{3}){1,2}\\b",                 flags: "g" },
  { name: "HTML tag",             pattern: "<[^>]+>",                                       flags: "gi" },
  { name: "Whitespace only lines","pattern": "^\\s*$",                                      flags: "gm" },
];

const FAQS = [
  { q: "What is a regular expression?", a: "A regular expression (regex) is a sequence of characters that defines a search pattern. Used in programming and text processing, regex can match specific strings, validate formats (email, phone), extract data, and perform complex find-and-replace operations in a single line." },
  { q: "What do the flags mean?", a: "g (global) finds all matches instead of stopping at the first. i (case-insensitive) matches regardless of case. m (multiline) makes ^ and $ match line boundaries. s (dotall) makes . match newline characters too. You can combine flags." },
  { q: "What is a capture group?", a: "A capture group is a part of the pattern wrapped in parentheses (). When the regex matches, each group captures the text it matched. For example, in (\\d{4})-(\\d{2})-(\\d{2}), three groups would capture the year, month, and day separately from a date string." },
  { q: "How do I use the replace mode?", a: "Switch to 'Replace' mode, write your pattern in the regex box, type the replacement string below the test area, and see the result instantly. You can reference capture groups in the replacement using $1, $2, etc." },
  { q: "Why is my regex matching too much?", a: "You may need quantifier constraints. .* matches any characters greedily. Use .*? for non-greedy matching, or be more specific with your character classes. For example, to match a word, use \\w+ rather than .+." },
  { q: "How do I match a literal dot or bracket?", a: "Escape them with a backslash: \\. matches a literal dot, \\( and \\) match literal parentheses. The tool's pattern input treats \\. as a literal dot just as JavaScript's RegExp constructor does." },
];

export default function RegexTesterPage() {
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

      <div className="min-h-screen" style={{ background: "#100614" }}>
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
          style={{ background: "rgba(16,6,20,0.92)", borderBottom: "1px solid rgba(232,121,249,0.1)" }}>
          <div className="max-w-3xl mx-auto px-6 h-13 flex items-center justify-between">
            <nav className="flex items-center gap-1.5 font-mono" style={{ color: "rgba(232,121,249,0.4)", fontSize: "11px" }}>
              <Link href="/" className="hover:text-[#e879f9] transition-colors" style={{ color: "inherit" }}>sakib</Link>
              <ChevronRight size={10} style={{ opacity: 0.4 }} />
              <Link href="/tools" className="hover:text-[#e879f9] transition-colors" style={{ color: "inherit" }}>tools</Link>
              <ChevronRight size={10} style={{ opacity: 0.4 }} />
              <span style={{ color: "#e879f9" }}>regex-tester</span>
            </nav>
            <Link href="/tools" className="hover:opacity-80 transition-opacity font-mono"
              style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(232,121,249,0.3)" }}>
              all tools
            </Link>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-6 pt-24 pb-20">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full text-[10px] font-mono font-semibold"
              style={{ background: "rgba(232,121,249,0.08)", color: "#e879f9", border: "1px solid rgba(232,121,249,0.15)" }}>
              ⬡ DEVELOPER
            </div>
            <h1 className="font-semibold tracking-tight leading-tight mb-2.5"
              style={{ fontSize: "clamp(26px,4vw,34px)", color: "#fdf4ff", fontFamily: "monospace" }}>
              Regex Tester
            </h1>
            <p style={{ fontSize: "13.5px", color: "rgba(253,244,255,0.4)", lineHeight: 1.65, fontFamily: "monospace" }}>
              Live match highlighting, flags, capture groups, and replace mode.
            </p>
          </div>
          <RegexTester />
        </main>

        <div style={{ borderTop: "1px solid rgba(232,121,249,0.08)" }}>
          <div className="max-w-3xl mx-auto px-6 py-20 space-y-20">

            <section>
              <h2 className="font-semibold tracking-tight mb-2" style={{ fontSize: "21px", color: "#fdf4ff" }}>
                Common Regex Patterns
              </h2>
              <p className="mb-5" style={{ fontSize: "13.5px", color: "rgba(253,244,255,0.4)" }}>
                Copy and paste any of these patterns into the tester above.
              </p>
              <div className="rounded-[16px] overflow-hidden" style={{ border: "1px solid rgba(232,121,249,0.1)" }}>
                <table className="w-full text-left" style={{ background: "#18091c" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(232,121,249,0.08)" }}>
                      {["Pattern Name", "Regex", "Flags"].map(h => (
                        <th key={h} className="px-5 py-3.5"
                          style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(232,121,249,0.4)", fontFamily: "monospace" }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {COMMON_PATTERNS.map(({ name, pattern, flags }, i) => (
                      <tr key={name} style={{ borderBottom: i < COMMON_PATTERNS.length - 1 ? "1px solid rgba(232,121,249,0.04)" : "none" }}>
                        <td className="px-5 py-3 font-medium" style={{ fontSize: "12.5px", color: "#fdf4ff" }}>{name}</td>
                        <td className="px-5 py-3 font-mono" style={{ fontSize: "11px", color: "#e879f9", wordBreak: "break-all" }}>{pattern}</td>
                        <td className="px-5 py-3 font-mono" style={{ fontSize: "12px", color: "rgba(232,121,249,0.5)" }}>{flags}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="font-semibold tracking-tight mb-6" style={{ fontSize: "21px", color: "#fdf4ff" }}>Frequently Asked Questions</h2>
              <div className="rounded-[16px] overflow-hidden" style={{ border: "1px solid rgba(232,121,249,0.1)" }}>
                {FAQS.map(({ q, a }, i) => (
                  <div key={i} className="px-6 py-5"
                    style={{ background: "#18091c", borderBottom: i < FAQS.length - 1 ? "1px solid rgba(232,121,249,0.05)" : "none" }}>
                    <p className="font-semibold mb-2 font-mono" style={{ fontSize: "13.5px", color: "#fdf4ff" }}>{q}</p>
                    <p style={{ fontSize: "12.5px", color: "rgba(253,244,255,0.45)", lineHeight: 1.75 }}>{a}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[20px] px-8 py-10 text-center"
              style={{ background: "#18091c", border: "1px solid rgba(232,121,249,0.15)" }}>
              <p className="font-semibold tracking-tight mb-2" style={{ fontSize: "19px", color: "#fdf4ff" }}>More developer tools</p>
              <p className="mb-6" style={{ fontSize: "13px", color: "rgba(253,244,255,0.35)", lineHeight: 1.7 }}>
                JSON formatter, JWT decoder, Base64 encoder, cron builder and more.
              </p>
              <Link href="/tools" className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] font-mono font-medium transition-opacity hover:opacity-80"
                style={{ background: "#e879f9", color: "#100614", fontSize: "12px" }}>
                Browse all tools
              </Link>
            </section>

            <div className="pb-4">
              <Link href="/tools" className="inline-flex items-center gap-2.5 hover:opacity-60 transition-opacity font-mono"
                style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(232,121,249,0.3)" }}>
                <span>←</span> Back to tools
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
