import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import FakeDataGenerator from "./FakeDataGenerator";

export const metadata: Metadata = {
  title: "Free Fake Data Generator — Generate Test Data Online",
  description:
    "Generate realistic fake data for testing: names, emails, phones, addresses, UUIDs, credit cards and more. Export as JSON, CSV, SQL INSERT, or JavaScript array. Free, no sign-up, runs in your browser.",
  keywords: [
    "fake data generator", "test data generator", "dummy data generator", "mock data generator",
    "random data generator", "fake name generator", "fake email generator", "fake address generator",
    "generate test data online", "sample data generator", "placeholder data", "seed data generator",
    "database test data", "fake JSON data", "CSV test data", "fake user data",
  ],
  alternates: { canonical: "https://mohdsakib.vercel.app/tools/fake-data-generator" },
  openGraph: {
    title: "Free Fake Data Generator — Generate Test Data Online",
    description: "Generate realistic fake data for testing. Names, emails, phones, UUIDs and more. Export JSON, CSV, SQL. Free, in-browser.",
    url: "https://mohdsakib.vercel.app/tools/fake-data-generator",
    type: "website",
  },
};

const USE_CASES = [
  {
    title: "Unit & Integration Testing",
    desc: "Seed your test databases with realistic records. Generate hundreds of rows of diverse, believable data to exercise edge cases in your application logic without relying on production data.",
  },
  {
    title: "UI Demos & Prototypes",
    desc: "Populate dashboards, tables, and admin panels with realistic-looking data for client demos or design reviews. Fake data makes prototypes feel finished and convincing.",
  },
  {
    title: "Development & Staging Environments",
    desc: "Bootstrap local or staging databases instantly. Stop writing hardcoded seed files — generate the exact schema you need in seconds and paste or import it directly.",
  },
  {
    title: "Data Pipeline Testing",
    desc: "Validate ETL pipelines, data transformations, and import scripts with consistent, reproducible datasets. Test your parsing logic against varied formats before touching real data.",
  },
  {
    title: "Privacy-Safe Training Data",
    desc: "Create mock datasets for ML experiments or AI training that contain no real personal information. Share freely with teams without any GDPR or CCPA compliance concerns.",
  },
  {
    title: "Documentation & Tutorials",
    desc: "Produce example JSON or CSV files for API documentation, blog posts, video tutorials, and code samples. Realistic fake data makes examples far more readable than 'foo/bar' placeholders.",
  },
];

const FAQS = [
  {
    q: "Is the generated data completely fake?",
    a: "Yes, 100%. All names, emails, phone numbers, addresses, and other fields are randomly assembled from curated word lists. No real person's information is ever used. The data is realistic-looking but entirely synthetic and non-identifiable.",
  },
  {
    q: "What formats can I export fake data in?",
    a: "You can export in four formats: JSON (array of objects), CSV (comma-separated values with a header row), SQL INSERT statements ready to paste into any relational database, and a JavaScript const array literal. Choose the format that matches your toolchain.",
  },
  {
    q: "Does this tool send my data to a server?",
    a: "No. The entire generator runs in JavaScript inside your browser. No data is transmitted, logged, or stored anywhere. Close the tab and everything is gone. It works offline once the page is loaded.",
  },
  {
    q: "Can I use the generated data in production?",
    a: "The data is intended for testing, development, and non-production uses. Because it is randomly generated, it is not suitable for production systems that require validated or verified information.",
  },
  {
    q: "How do I generate fake data as CSV?",
    a: "Select your desired fields using the checkboxes, set the row count with the slider, choose 'CSV' as the output format, then click Generate. A preview table and the raw CSV text both appear. Use the Copy All button or Download button to save the file.",
  },
  {
    q: "What is the maximum number of rows I can generate?",
    a: "You can generate up to 100 rows per batch, which covers the vast majority of testing and demo scenarios. The generation is instant and runs entirely in your browser with no rate limiting.",
  },
];

const ACCENT = "#00d4aa";
const ACCENT_DIM = "rgba(0,212,170,0.4)";
const ACCENT_BORDER = "rgba(0,212,170,0.15)";

export default function FakeDataGeneratorPage() {
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

      <div className="min-h-screen" style={{ background: "#0a0a0a" }}>
        <header
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
          style={{
            background: "rgba(10,10,10,0.92)",
            borderBottom: `1px solid ${ACCENT_BORDER}`,
          }}
        >
          <div className="max-w-5xl mx-auto px-6 h-13 flex items-center justify-between">
            <nav
              className="flex items-center gap-1.5 font-mono"
              style={{ color: ACCENT_DIM, fontSize: "11px" }}
            >
              <Link
                href="/"
                className="hover:text-[#00d4aa] transition-colors"
                style={{ color: "inherit" }}
              >
                sakib
              </Link>
              <ChevronRight size={10} style={{ opacity: 0.4 }} />
              <Link
                href="/tools"
                className="hover:text-[#00d4aa] transition-colors"
                style={{ color: "inherit" }}
              >
                tools
              </Link>
              <ChevronRight size={10} style={{ opacity: 0.4 }} />
              <span style={{ color: ACCENT }}>fake-data-generator</span>
            </nav>
            <Link
              href="/tools"
              className="transition-opacity hover:opacity-70 font-mono"
              style={{
                fontSize: "9px",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(0,212,170,0.35)",
              }}
            >
              all tools
            </Link>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-6 pt-24 pb-20">
          <div className="mb-8">
            <div
              className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full font-mono text-[10px]"
              style={{
                background: "rgba(0,212,170,0.07)",
                color: ACCENT,
                border: `1px solid ${ACCENT_BORDER}`,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full inline-block"
                style={{ background: ACCENT }}
              />
              PRODUCTIVITY
            </div>
            <h1
              className="font-bold tracking-tight leading-tight mb-2.5"
              style={{
                fontSize: "clamp(26px,4vw,36px)",
                color: ACCENT,
                fontFamily: "monospace",
                letterSpacing: "-0.01em",
              }}
            >
              Fake Data Generator
            </h1>
            <p
              style={{
                fontSize: "13.5px",
                color: ACCENT_DIM,
                lineHeight: 1.65,
                fontFamily: "monospace",
              }}
            >
              Generate realistic test data — names, emails, addresses, UUIDs &amp; more. Export as JSON, CSV, SQL, or JS.
            </p>
          </div>

          <FakeDataGenerator />
        </main>

        <div style={{ borderTop: `1px solid ${ACCENT_BORDER}` }}>
          <div className="max-w-5xl mx-auto px-6 py-20 space-y-20">

            <section>
              <h2
                className="font-bold mb-4"
                style={{ fontSize: "21px", color: ACCENT, fontFamily: "monospace" }}
              >
                What Is a Fake Data Generator?
              </h2>
              <p
                style={{
                  fontSize: "14px",
                  color: ACCENT_DIM,
                  lineHeight: 1.85,
                  fontFamily: "monospace",
                }}
              >
                A fake data generator produces synthetic but realistic-looking records — names, email addresses,
                phone numbers, street addresses, UUIDs, and more — without using any real personal information.
                Developers and QA engineers use fake data to seed test databases, populate UI prototypes, validate
                import pipelines, and create safe sample datasets for documentation or tutorials.
              </p>
              <p
                className="mt-4"
                style={{
                  fontSize: "14px",
                  color: ACCENT_DIM,
                  lineHeight: 1.85,
                  fontFamily: "monospace",
                }}
              >
                This tool generates data entirely in your browser using JavaScript. Nothing is sent to a server.
                Select the fields you need, set the row count, pick your output format, and click Generate.
              </p>
            </section>

            <section>
              <h2
                className="font-bold mb-6"
                style={{ fontSize: "21px", color: ACCENT, fontFamily: "monospace" }}
              >
                Use Cases
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {USE_CASES.map(({ title, desc }) => (
                  <div
                    key={title}
                    className="rounded-[14px] p-5"
                    style={{
                      background: "#111",
                      border: `1px solid ${ACCENT_BORDER}`,
                    }}
                  >
                    <p
                      className="font-bold mb-1.5 font-mono"
                      style={{ fontSize: "12.5px", color: ACCENT }}
                    >
                      {title}
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        color: ACCENT_DIM,
                        lineHeight: 1.75,
                        fontFamily: "monospace",
                      }}
                    >
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2
                className="font-bold mb-6"
                style={{ fontSize: "21px", color: ACCENT, fontFamily: "monospace" }}
              >
                Frequently Asked Questions
              </h2>
              <div
                className="rounded-[16px] overflow-hidden"
                style={{ border: `1px solid ${ACCENT_BORDER}` }}
              >
                {FAQS.map(({ q, a }, i) => (
                  <div
                    key={i}
                    className="px-6 py-5"
                    style={{
                      background: "#111",
                      borderBottom:
                        i < FAQS.length - 1
                          ? "1px solid rgba(0,212,170,0.07)"
                          : "none",
                    }}
                  >
                    <p
                      className="font-bold mb-2 font-mono"
                      style={{ fontSize: "13.5px", color: ACCENT }}
                    >
                      {q}
                    </p>
                    <p
                      style={{
                        fontSize: "12.5px",
                        color: ACCENT_DIM,
                        lineHeight: 1.75,
                        fontFamily: "monospace",
                      }}
                    >
                      {a}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section
              className="rounded-[20px] px-8 py-10 text-center"
              style={{ background: "#111", border: `1px solid ${ACCENT_BORDER}` }}
            >
              <p
                className="font-bold mb-2 font-mono"
                style={{ fontSize: "19px", color: ACCENT }}
              >
                More free developer tools
              </p>
              <p
                className="mb-6 font-mono"
                style={{ fontSize: "12.5px", color: ACCENT_DIM, lineHeight: 1.7 }}
              >
                JSON formatter, Base64 encoder, regex tester, JWT decoder — all free, all in your browser.
              </p>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] font-mono font-bold transition-opacity hover:opacity-80"
                style={{
                  background: ACCENT,
                  color: "#0a0a0a",
                  fontSize: "12px",
                  letterSpacing: "0.05em",
                }}
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
                  color: "rgba(0,212,170,0.3)",
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
