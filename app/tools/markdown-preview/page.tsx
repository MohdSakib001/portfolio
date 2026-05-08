import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import MarkdownPreview from "./MarkdownPreview";

export const metadata: Metadata = {
  title: "Markdown Preview — Live Split-Pane Editor & HTML Renderer",
  description:
    "Write Markdown on the left, see rendered HTML on the right in real time. Supports headings, bold, italic, tables, code blocks, blockquotes, links, and more. Free, no account needed.",
  keywords: [
    "markdown preview", "markdown editor online", "markdown to html", "live markdown preview",
    "split pane markdown", "gfm preview", "github flavored markdown", "markdown renderer",
    "markdown viewer", "online markdown editor", "markdown formatter", "free markdown tool",
  ],
  alternates: { canonical: "https://mohdsakib.vercel.app/tools/markdown-preview" },
  openGraph: {
    title: "Markdown Preview — Live Split-Pane Editor & HTML Renderer",
    description: "Write Markdown on the left, see rendered HTML on the right in real time. Supports GFM tables, code blocks, and more.",
    url: "https://mohdsakib.vercel.app/tools/markdown-preview",
    type: "website",
  },
};

const FAQS = [
  {
    q: "What is Markdown?",
    a: "Markdown is a lightweight markup language created by John Gruber in 2004. It uses plain text formatting syntax that converts to HTML. Writers use it for documentation, README files, blog posts, and notes because it's easy to read in raw form and renders cleanly to HTML.",
  },
  {
    q: "What is GitHub Flavored Markdown (GFM)?",
    a: "GitHub Flavored Markdown (GFM) is a dialect of Markdown created by GitHub. It extends standard Markdown with tables, fenced code blocks with syntax highlighting hints, strikethrough text, and task list items. This tool supports GFM features including tables and fenced code blocks.",
  },
  {
    q: "How do I create a table in Markdown?",
    a: "Use pipe characters to define columns and a row of dashes to separate the header from the body. Example: | Name | Age | on the first line, | --- | --- | on the second, then data rows. At least three dashes are required in each separator cell.",
  },
  {
    q: "How do I add a code block in Markdown?",
    a: "Use triple backticks (```) before and after your code. Optionally add a language name after the opening backticks for syntax highlighting hints, for example ```javascript. For inline code, wrap the text in single backticks like `code`.",
  },
  {
    q: "What's the difference between * and ** in Markdown?",
    a: "A single asterisk (*text*) or underscore (_text_) makes text italic. Double asterisks (**text**) or double underscores (__text__) make it bold. You can combine them — ***text*** or **_text_** — for bold italic.",
  },
  {
    q: "Can I use this tool to convert Markdown to HTML?",
    a: "Yes. Click the 'Copy HTML' button in the toolbar to copy the rendered HTML to your clipboard. This gives you the full HTML output of your Markdown, which you can paste directly into any HTML file or CMS.",
  },
];

const CHEATSHEET = [
  { syntax: "# Heading 1", description: "Largest heading (H1)" },
  { syntax: "## Heading 2", description: "Second-level heading (H2)" },
  { syntax: "**bold**", description: "Bold text" },
  { syntax: "*italic*", description: "Italic text" },
  { syntax: "~~strikethrough~~", description: "Strikethrough text" },
  { syntax: "`inline code`", description: "Inline code span" },
  { syntax: "```lang\\ncode\\n```", description: "Fenced code block" },
  { syntax: "> blockquote", description: "Block quotation" },
  { syntax: "- item", description: "Unordered list item" },
  { syntax: "1. item", description: "Ordered list item" },
  { syntax: "[text](url)", description: "Hyperlink" },
  { syntax: "![alt](url)", description: "Image" },
  { syntax: "---", description: "Horizontal rule" },
  { syntax: "| col | col |\\n|---|---|", description: "Table (GFM)" },
];

export default function MarkdownPreviewPage() {
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

      <div className="min-h-screen" style={{ background: "#111111" }}>
        <header
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
          style={{ background: "rgba(17,17,17,0.92)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="max-w-6xl mx-auto px-6 h-13 flex items-center justify-between">
            <nav className="flex items-center gap-1.5" style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px" }}>
              <Link href="/" className="font-medium transition-colors hover:text-white" style={{ color: "inherit" }}>
                Sakib
              </Link>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
              <Link href="/tools" className="transition-colors hover:text-white" style={{ color: "inherit" }}>
                Tools
              </Link>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
              <span style={{ color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>Markdown Preview</span>
            </nav>
            <Link
              href="/tools"
              className="hover:opacity-80 transition-opacity"
              style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}
            >
              All tools
            </Link>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-6 pt-24 pb-20">
          <div className="mb-8">
            <div
              className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full text-[10px] font-semibold"
              style={{ background: "rgba(22,163,74,0.12)", color: "#16a34a", border: "1px solid rgba(22,163,74,0.2)" }}
            >
              ✍️ TEXT & WRITING
            </div>
            <h1
              className="font-bold tracking-tight leading-tight mb-2"
              style={{ fontSize: "clamp(26px,4vw,36px)", color: "#ffffff", fontFamily: "'Georgia', serif" }}
            >
              Markdown Preview
            </h1>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", lineHeight: 1.65 }}>
              Write on the left, see rendered HTML on the right. Supports GFM tables, fenced code blocks, links, images, and more.
            </p>
          </div>

          <MarkdownPreview />
        </main>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "#0e0e0e" }}>
          <div className="max-w-6xl mx-auto px-6 py-20 space-y-20">

            <section>
              <h2 className="font-semibold tracking-tight mb-6" style={{ fontSize: "20px", color: "#ffffff" }}>
                Markdown Syntax Cheatsheet
              </h2>
              <div style={{ borderRadius: "14px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#1a1a1a" }}>
                      <th style={{ padding: "11px 16px", textAlign: "left", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                        Syntax
                      </th>
                      <th style={{ padding: "11px 16px", textAlign: "left", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                        Result
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {CHEATSHEET.map(({ syntax, description }, i) => (
                      <tr
                        key={i}
                        style={{ background: i % 2 === 0 ? "#111111" : "#131313" }}
                      >
                        <td style={{ padding: "10px 16px", borderBottom: i < CHEATSHEET.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                          <code style={{ fontSize: "12px", color: "#16a34a", fontFamily: "'JetBrains Mono','Fira Code',monospace", background: "rgba(22,163,74,0.08)", padding: "2px 7px", borderRadius: "4px" }}>
                            {syntax}
                          </code>
                        </td>
                        <td style={{ padding: "10px 16px", fontSize: "13px", color: "rgba(255,255,255,0.5)", borderBottom: i < CHEATSHEET.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                          {description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="font-semibold tracking-tight mb-6" style={{ fontSize: "20px", color: "#ffffff" }}>
                Frequently Asked Questions
              </h2>
              <div className="space-y-px rounded-[16px] overflow-hidden" style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.07)" }}>
                {FAQS.map(({ q, a }, i) => (
                  <div
                    key={i}
                    className="px-6 py-5"
                    style={{
                      background: "#161616",
                      borderBottom: i < FAQS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                    }}
                  >
                    <p className="font-medium mb-2" style={{ fontSize: "14px", color: "#ffffff" }}>
                      {q}
                    </p>
                    <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: 1.75 }}>
                      {a}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section
              className="rounded-[20px] px-8 py-10 text-center"
              style={{ background: "#161616", boxShadow: "0 0 0 1px rgba(255,255,255,0.07), 0 4px 24px rgba(0,0,0,0.3)" }}
            >
              <p className="font-semibold tracking-tight mb-2" style={{ fontSize: "19px", color: "#ffffff" }}>
                More free tools
              </p>
              <p className="mb-6" style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>
                Word counter, notepad, JSON formatter, regex tester, and many more.
              </p>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] font-medium transition-opacity hover:opacity-80"
                style={{ background: "#16a34a", color: "#ffffff", fontSize: "13px" }}
              >
                Browse all tools
              </Link>
            </section>

            <div className="pb-4">
              <Link
                href="/tools"
                className="inline-flex items-center gap-2.5 hover:opacity-70 transition-opacity"
                style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}
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
