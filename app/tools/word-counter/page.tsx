import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import WordCounterTool from "./WordCounter";

export const metadata: Metadata = {
  title: "Free Word Counter — Count Words, Characters & Reading Time Online",
  description:
    "Instantly count words, characters, sentences, paragraphs, and reading time as you type. Free, no sign-up, runs entirely in your browser. Nothing sent to any server.",
  keywords: [
    "word counter", "word count online", "character counter", "free word counter",
    "count words online", "word counter tool", "reading time calculator",
    "character count", "sentence counter", "paragraph counter",
  ],
  alternates: { canonical: "https://mohdsakib.vercel.app/tools/word-counter" },
  openGraph: {
    title: "Free Word Counter — Count Words, Characters & Reading Time",
    description: "Instantly count words, characters, sentences, paragraphs, and reading time. Free, no sign-up.",
    url: "https://mohdsakib.vercel.app/tools/word-counter",
    type: "website",
  },
};

const PLATFORM_LIMITS = [
  { platform: "Twitter / X",      chars: "280",    words: "~50"  },
  { platform: "LinkedIn Post",    chars: "3,000",  words: "~500" },
  { platform: "Instagram Caption",chars: "2,200",  words: "~350" },
  { platform: "Facebook Post",    chars: "63,206", words: "~10K" },
  { platform: "TikTok Bio",       chars: "80",     words: "~15"  },
  { platform: "YouTube Title",    chars: "100",    words: "~15"  },
  { platform: "Email Subject",    chars: "60",     words: "~8"   },
  { platform: "Meta Description", chars: "160",    words: "~25"  },
];

const FEATURES = [
  { title: "Live counting",     desc: "Every stat updates instantly — no button press needed." },
  { title: "6 metrics at once", desc: "Words, characters, characters without spaces, sentences, paragraphs, and reading time." },
  { title: "Reading time",      desc: "Calculated at 200 words per minute — the average adult reading speed." },
  { title: "One-click copy",    desc: "Copy your entire text to clipboard in one click." },
  { title: "Completely private", desc: "Your text never leaves your browser. No server. No storage." },
  { title: "Free forever",      desc: "No sign-up, no paywall, no ads. Just the tool." },
];

const FAQS = [
  {
    q: "How is reading time calculated?",
    a: "Reading time is estimated at 200 words per minute, which is the average adult reading speed. The result is rounded up to the nearest minute.",
  },
  {
    q: "What counts as a sentence?",
    a: "A sentence is counted whenever a period (.), exclamation mark (!), or question mark (?) is followed by text. If your text has no punctuation, it is counted as one sentence.",
  },
  {
    q: "What is the difference between characters and characters without spaces?",
    a: "Characters counts every character including spaces, line breaks, and punctuation. Characters without spaces strips all whitespace before counting, which is useful for platforms that count visible characters only.",
  },
  {
    q: "Does this tool save my text?",
    a: "No. Your text is processed entirely in your browser using JavaScript. Nothing is ever sent to a server or stored anywhere.",
  },
  {
    q: "Can I use this to check SEO meta descriptions?",
    a: "Yes. Google typically displays meta descriptions up to 155–160 characters. Paste your description and watch the character count to make sure it fits.",
  },
  {
    q: "What counts as a paragraph?",
    a: "A paragraph is counted as a block of text separated by one or more blank lines. If there are no blank lines, the entire text is counted as one paragraph.",
  },
];

export default function WordCounterPage() {
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
      {/* FAQ schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen" style={{ background: "#F8F7F4" }}>

        {/* Minimal breadcrumb nav */}
        <header
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
          style={{
            background: "rgba(248,247,244,0.88)",
            borderBottom: "1px solid rgba(3,3,2,0.06)",
          }}
        >
          <div className="max-w-3xl mx-auto px-6 h-13 flex items-center justify-between">
            <nav className="flex items-center gap-1.5" style={{ color: "rgba(3,3,2,0.4)", fontSize: "12px" }}>
              <Link href="/" className="font-medium hover:text-[#030302] transition-colors" style={{ color: "inherit" }}>
                Sakib
              </Link>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
              <Link href="/tools" className="hover:text-[#030302] transition-colors" style={{ color: "inherit" }}>
                Tools
              </Link>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
              <span style={{ color: "#1c1b18", fontWeight: 500 }}>Word Counter</span>
            </nav>
            <Link
              href="/tools"
              className="hover:opacity-80 transition-opacity"
              style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(3,3,2,0.4)" }}
            >
              All tools
            </Link>
          </div>
        </header>

        {/* ── TOOL SECTION ── */}
        <main className="max-w-3xl mx-auto px-6 pt-24 pb-20">

          {/* Title */}
          <div className="mb-8">
            <h1
              className="font-semibold tracking-tight leading-tight mb-2"
              style={{ fontSize: "clamp(26px,4vw,32px)", color: "#1c1b18" }}
            >
              Word Counter
            </h1>
            <p style={{ fontSize: "13.5px", color: "rgba(3,3,2,0.45)", lineHeight: 1.6 }}>
              Paste or type below — words, characters, sentences, paragraphs,
              and reading time update as you write.
            </p>
          </div>

          {/* Interactive tool */}
          <WordCounterTool />

        </main>

        {/* ── LANDING / SEO SECTION ── */}
        <div style={{ borderTop: "1px solid rgba(3,3,2,0.06)" }}>
          <div className="max-w-3xl mx-auto px-6 py-20 space-y-20">

            {/* What is a word counter */}
            <section>
              <h2
                className="font-semibold tracking-tight mb-4"
                style={{ fontSize: "22px", color: "#1c1b18" }}
              >
                What is a Word Counter?
              </h2>
              <p style={{ fontSize: "14px", color: "rgba(3,3,2,0.55)", lineHeight: 1.85 }}>
                A word counter is a tool that measures the length of your text in multiple dimensions — words,
                characters, sentences, and paragraphs — in real time. Writers use it to hit platform character
                limits, estimate reading time, and verify essay or article lengths. Unlike a basic character count,
                a good word counter surfaces the metrics you actually need without switching tools.
              </p>
              <p className="mt-4" style={{ fontSize: "14px", color: "rgba(3,3,2,0.55)", lineHeight: 1.85 }}>
                This tool counts everything client-side in your browser. Your text is never sent to a server,
                never stored, and never shared. Paste a 50,000-word document or a single tweet — it handles
                both instantly.
              </p>
            </section>

            {/* How to use */}
            <section>
              <h2
                className="font-semibold tracking-tight mb-6"
                style={{ fontSize: "22px", color: "#1c1b18" }}
              >
                How to Use This Tool
              </h2>
              <ol className="space-y-4">
                {[
                  ["Paste or type your text", "Click anywhere in the text area above and start typing, or use Ctrl+V / Cmd+V to paste from your clipboard."],
                  ["Read your stats instantly", "All six counters update in real time — no button needed. Scroll down to the stat row to see the full breakdown."],
                  ["Copy your text", "Click the Copy button in the toolbar to copy everything back to your clipboard, ready to paste into your email, post, or document."],
                  ["Clear and start over", "Hit Clear to wipe the text area. All stats reset to zero."],
                ].map(([title, desc], i) => (
                  <li key={i} className="flex gap-4">
                    <span
                      className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold mt-0.5"
                      style={{ background: "rgba(3,3,2,0.07)", color: "#1c1b18" }}
                    >
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-medium mb-0.5" style={{ fontSize: "14px", color: "#1c1b18" }}>{title}</p>
                      <p style={{ fontSize: "13px", color: "rgba(3,3,2,0.5)", lineHeight: 1.7 }}>{desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Features */}
            <section>
              <h2
                className="font-semibold tracking-tight mb-6"
                style={{ fontSize: "22px", color: "#1c1b18" }}
              >
                Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {FEATURES.map(({ title, desc }) => (
                  <div
                    key={title}
                    className="rounded-[16px] p-5"
                    style={{
                      background: "#ffffff",
                      boxShadow: "0 0 0 1px rgba(3,3,2,0.06), 0 2px 8px rgba(3,3,2,0.04)",
                    }}
                  >
                    <p className="font-medium mb-1" style={{ fontSize: "13.5px", color: "#1c1b18" }}>{title}</p>
                    <p style={{ fontSize: "12.5px", color: "rgba(3,3,2,0.5)", lineHeight: 1.7 }}>{desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Platform limits */}
            <section>
              <h2
                className="font-semibold tracking-tight mb-2"
                style={{ fontSize: "22px", color: "#1c1b18" }}
              >
                Word & Character Limits by Platform
              </h2>
              <p className="mb-6" style={{ fontSize: "13.5px", color: "rgba(3,3,2,0.5)", lineHeight: 1.7 }}>
                Use this table as a quick reference when writing for specific platforms.
              </p>
              <div
                className="rounded-[16px] overflow-hidden"
                style={{ boxShadow: "0 0 0 1px rgba(3,3,2,0.06)" }}
              >
                <table className="w-full text-left" style={{ background: "#ffffff" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(3,3,2,0.06)" }}>
                      {["Platform", "Characters", "≈ Words"].map((h) => (
                        <th
                          key={h}
                          className="px-5 py-3.5"
                          style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(3,3,2,0.35)" }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {PLATFORM_LIMITS.map(({ platform, chars, words }, i) => (
                      <tr
                        key={platform}
                        style={{ borderBottom: i < PLATFORM_LIMITS.length - 1 ? "1px solid rgba(3,3,2,0.04)" : "none" }}
                      >
                        <td className="px-5 py-3.5" style={{ fontSize: "13.5px", color: "#1c1b18", fontWeight: 500 }}>{platform}</td>
                        <td className="px-5 py-3.5 font-mono" style={{ fontSize: "13px", color: "rgba(3,3,2,0.6)" }}>{chars}</td>
                        <td className="px-5 py-3.5 font-mono" style={{ fontSize: "13px", color: "rgba(3,3,2,0.6)" }}>{words}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2
                className="font-semibold tracking-tight mb-6"
                style={{ fontSize: "22px", color: "#1c1b18" }}
              >
                Frequently Asked Questions
              </h2>
              <div className="space-y-px" style={{ boxShadow: "0 0 0 1px rgba(3,3,2,0.06)", borderRadius: "16px", overflow: "hidden" }}>
                {FAQS.map(({ q, a }, i) => (
                  <div
                    key={i}
                    className="px-6 py-5"
                    style={{
                      background: "#ffffff",
                      borderBottom: i < FAQS.length - 1 ? "1px solid rgba(3,3,2,0.06)" : "none",
                    }}
                  >
                    <p className="font-medium mb-2" style={{ fontSize: "14px", color: "#1c1b18" }}>{q}</p>
                    <p style={{ fontSize: "13px", color: "rgba(3,3,2,0.5)", lineHeight: 1.75 }}>{a}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* More tools CTA */}
            <section
              className="rounded-[20px] px-8 py-10 text-center"
              style={{
                background: "#ffffff",
                boxShadow: "0 0 0 1px rgba(3,3,2,0.06), 0 4px 24px rgba(3,3,2,0.05)",
              }}
            >
              <p
                className="font-semibold tracking-tight mb-2"
                style={{ fontSize: "20px", color: "#1c1b18" }}
              >
                More free tools
              </p>
              <p className="mb-6" style={{ fontSize: "13.5px", color: "rgba(3,3,2,0.45)", lineHeight: 1.7 }}>
                Text converters, image utilities, developer tools — all free, all in your browser.
              </p>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] font-medium transition-opacity hover:opacity-80"
                style={{ background: "#1c1b18", color: "#F8F7F4", fontSize: "13px" }}
              >
                Browse all tools
              </Link>
            </section>

            {/* Back link */}
            <div className="pb-4">
              <Link
                href="/tools"
                className="inline-flex items-center gap-2.5 hover:opacity-70 transition-opacity"
                style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(3,3,2,0.35)" }}
              >
                <span>←</span>
                Back to tools
              </Link>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
