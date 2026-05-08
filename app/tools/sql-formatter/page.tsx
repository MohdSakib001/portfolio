import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import SqlFormatter from "./SqlFormatter";

export const metadata: Metadata = {
  title: "Free SQL Formatter & Beautifier — Format, Highlight & Minify SQL",
  description:
    "Format and beautify SQL queries with syntax highlighting. Uppercase keywords, indent SELECT columns, align WHERE conditions, and minify SQL. Free, browser-based, nothing sent to any server.",
  keywords: [
    "SQL formatter", "SQL beautifier", "SQL pretty printer", "format SQL online",
    "SQL syntax highlighter", "SQL minifier", "SQL indenter", "SQL query formatter",
    "beautify SQL", "SQL code formatter", "SQL keyword highlighter", "online SQL tool",
  ],
  alternates: { canonical: "https://mohdsakib.vercel.app/tools/sql-formatter" },
  openGraph: {
    title: "Free SQL Formatter & Beautifier — Format, Highlight & Minify SQL",
    description:
      "Format SQL queries with syntax highlighting, uppercase keywords, and proper indentation. Browser-based and instant.",
    url: "https://mohdsakib.vercel.app/tools/sql-formatter",
    type: "website",
  },
};

const FAQS = [
  {
    q: "What does an SQL formatter do?",
    a: "An SQL formatter takes raw or minified SQL queries and rewrites them with consistent indentation, line breaks, and keyword casing. This makes long queries readable at a glance: SELECT columns appear on separate lines, WHERE conditions are indented, and JOIN clauses are aligned at the left margin.",
  },
  {
    q: "Why should SQL keywords be uppercase?",
    a: "The SQL standard does not require uppercase, but the convention is universal across database engines, documentation, and ORMs. Uppercase keywords (SELECT, FROM, WHERE) visually separate structural tokens from identifiers and string values, making it much easier to scan a query for its logical structure.",
  },
  {
    q: "Does formatting SQL change how the database executes it?",
    a: "No. SQL is whitespace-insensitive. A minified single-line query and a beautifully formatted multi-line query produce identical query plans in every major database — PostgreSQL, MySQL, SQLite, SQL Server, and Oracle alike. Formatting is purely cosmetic.",
  },
  {
    q: "What is SQL minification?",
    a: "Minification strips all unnecessary whitespace and comments from a query, collapsing it to a single line. This is useful when embedding SQL in code strings, transferring queries over the wire, or storing them in configuration files where whitespace is irrelevant and compactness matters.",
  },
  {
    q: "Is my SQL sent to any server?",
    a: "No. This tool runs entirely in your browser using JavaScript. Your SQL never leaves your machine. There are no API calls, no logging, and no server-side processing of any kind.",
  },
  {
    q: "Which SQL dialects does this formatter support?",
    a: "The formatter handles standard ANSI SQL constructs — SELECT, INSERT, UPDATE, DELETE, CREATE TABLE, JOIN types, GROUP BY, ORDER BY, HAVING, CASE/WHEN, and common aggregate functions. Dialect-specific syntax (PostgreSQL dollar-quoting, SQL Server square brackets, MySQL backticks) is preserved as-is without modification.",
  },
];

const PATTERNS = [
  { label: "Basic SELECT", example: "SELECT id, name, email FROM users WHERE active = 1" },
  { label: "JOIN query", example: "SELECT u.name, o.total FROM users u INNER JOIN orders o ON u.id = o.user_id" },
  { label: "Aggregation", example: "SELECT department, COUNT(*) AS total, AVG(salary) FROM employees GROUP BY department HAVING COUNT(*) > 5" },
  { label: "Subquery", example: "SELECT * FROM products WHERE price > (SELECT AVG(price) FROM products)" },
  { label: "INSERT", example: "INSERT INTO logs (user_id, action, created_at) VALUES (42, 'login', NOW())" },
  { label: "UPDATE", example: "UPDATE users SET last_login = NOW(), login_count = login_count + 1 WHERE id = 42" },
];

const BG = "#061212";
const PANEL = "#0a1f1e";
const ACCENT = "#2dd4bf";
const BORDER = "rgba(45,212,191,0.08)";
const TEXT = "#e2e8f0";
const TEXT_DIM = "rgba(226,232,240,0.4)";
const TEXT_MUTED = "rgba(226,232,240,0.25)";

export default function SqlFormatterPage() {
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

      <div className="min-h-screen" style={{ background: BG }}>
        <header
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
          style={{ background: "rgba(6,18,18,0.95)", borderBottom: `1px solid ${BORDER}` }}
        >
          <div className="max-w-4xl mx-auto px-6 h-13 flex items-center justify-between">
            <nav
              className="flex items-center gap-1.5 font-mono"
              style={{ color: "rgba(45,212,191,0.35)", fontSize: "11px" }}
            >
              <Link
                href="/"
                className="transition-colors hover:text-[#2dd4bf]"
                style={{ color: "inherit" }}
              >
                sakib
              </Link>
              <ChevronRight size={10} style={{ opacity: 0.4 }} />
              <Link
                href="/tools"
                className="transition-colors hover:text-[#2dd4bf]"
                style={{ color: "inherit" }}
              >
                tools
              </Link>
              <ChevronRight size={10} style={{ opacity: 0.4 }} />
              <span style={{ color: ACCENT }}>sql-formatter</span>
            </nav>
            <Link
              href="/tools"
              className="hover:opacity-80 transition-opacity font-mono"
              style={{
                fontSize: "9px",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(45,212,191,0.3)",
              }}
            >
              all tools
            </Link>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 pt-24 pb-20">
          <div className="mb-8">
            <div
              className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full text-[10px] font-mono font-semibold"
              style={{
                background: "rgba(45,212,191,0.08)",
                color: ACCENT,
                border: `1px solid rgba(45,212,191,0.14)`,
              }}
            >
              ⬡ DEVELOPER
            </div>
            <h1
              className="font-semibold tracking-tight leading-tight mb-2.5 font-mono"
              style={{ fontSize: "clamp(24px,4vw,32px)", color: TEXT }}
            >
              SQL Formatter & Beautifier
            </h1>
            <p
              style={{
                fontSize: "13.5px",
                color: TEXT_DIM,
                lineHeight: 1.65,
                fontFamily: "monospace",
              }}
            >
              Format, highlight, and minify SQL. Runs entirely in your browser.
            </p>
          </div>

          <SqlFormatter />
        </main>

        <div style={{ borderTop: `1px solid ${BORDER}` }}>
          <div className="max-w-4xl mx-auto px-6 py-20 space-y-20">

            <section>
              <h2
                className="font-semibold tracking-tight mb-4"
                style={{ fontSize: "21px", color: TEXT }}
              >
                What This Tool Does
              </h2>
              <p style={{ fontSize: "14px", color: TEXT_DIM, lineHeight: 1.85 }}>
                Paste any SQL query — minified API output, a one-liner from a log file, or a hand-written
                query with inconsistent spacing — and the formatter rewrites it with proper indentation,
                uppercased keywords, and newlines before each major clause. SELECT columns are listed one
                per line. WHERE conditions are indented under the clause. JOIN types stay at the left margin.
                Switch to Minify mode to do the reverse: collapse everything to a single compact line for
                use in code strings or API payloads.
              </p>
            </section>

            <section>
              <h2
                className="font-semibold tracking-tight mb-6"
                style={{ fontSize: "21px", color: TEXT }}
              >
                Common SQL Patterns
              </h2>
              <div
                className="rounded-[16px] overflow-hidden"
                style={{ border: `1px solid ${BORDER}` }}
              >
                <table className="w-full" style={{ borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: PANEL }}>
                      <th
                        className="text-left px-5 py-3 font-mono font-semibold"
                        style={{ fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(45,212,191,0.5)", width: "160px" }}
                      >
                        Pattern
                      </th>
                      <th
                        className="text-left px-5 py-3 font-mono font-semibold"
                        style={{ fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(45,212,191,0.5)" }}
                      >
                        Example
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {PATTERNS.map(({ label, example }, i) => (
                      <tr
                        key={i}
                        style={{
                          background: i % 2 === 0 ? "rgba(10,31,30,0.5)" : "transparent",
                          borderTop: `1px solid rgba(45,212,191,0.05)`,
                        }}
                      >
                        <td
                          className="px-5 py-3 font-mono align-top"
                          style={{ fontSize: "11px", color: ACCENT, whiteSpace: "nowrap" }}
                        >
                          {label}
                        </td>
                        <td
                          className="px-5 py-3 font-mono"
                          style={{ fontSize: "11px", color: TEXT_DIM, lineHeight: 1.6 }}
                        >
                          {example}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2
                className="font-semibold tracking-tight mb-6"
                style={{ fontSize: "21px", color: TEXT }}
              >
                Frequently Asked Questions
              </h2>
              <div
                className="rounded-[16px] overflow-hidden"
                style={{ border: `1px solid ${BORDER}` }}
              >
                {FAQS.map(({ q, a }, i) => (
                  <div
                    key={i}
                    className="px-6 py-5"
                    style={{
                      background: PANEL,
                      borderBottom: i < FAQS.length - 1 ? `1px solid rgba(45,212,191,0.05)` : "none",
                    }}
                  >
                    <p
                      className="font-semibold mb-2 font-mono"
                      style={{ fontSize: "13.5px", color: TEXT }}
                    >
                      {q}
                    </p>
                    <p style={{ fontSize: "12.5px", color: TEXT_DIM, lineHeight: 1.75 }}>{a}</p>
                  </div>
                ))}
              </div>
            </section>

            <section
              className="rounded-[20px] px-8 py-10 text-center"
              style={{ background: PANEL, border: `1px solid rgba(45,212,191,0.1)` }}
            >
              <p
                className="font-semibold tracking-tight mb-2"
                style={{ fontSize: "19px", color: TEXT }}
              >
                More developer tools
              </p>
              <p
                className="mb-6"
                style={{ fontSize: "13px", color: TEXT_DIM, lineHeight: 1.7 }}
              >
                JSON formatter, JWT decoder, regex tester, Base64 encoder, and more.
              </p>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] font-mono font-medium transition-opacity hover:opacity-80"
                style={{ background: ACCENT, color: "#061212", fontSize: "12px" }}
              >
                Browse all tools
              </Link>
            </section>

            <div className="pb-4">
              <Link
                href="/tools"
                className="inline-flex items-center gap-2.5 hover:opacity-60 transition-opacity font-mono"
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "rgba(45,212,191,0.3)",
                }}
              >
                <span>←</span> Back to tools
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
