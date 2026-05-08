import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import LoremIpsumGenerator from "./LoremIpsumGenerator";

export const metadata: Metadata = {
  title: "Free Lorem Ipsum Generator — Words, Sentences & Paragraphs",
  description:
    "Generate Lorem Ipsum placeholder text by words, sentences, or paragraphs. Classic or randomised. One-click copy. Free, instant, browser-based — ideal for UI mockups and design.",
  keywords: [
    "lorem ipsum generator", "lorem ipsum online", "placeholder text generator",
    "dummy text generator", "lorem ipsum words", "lorem ipsum paragraphs",
    "generate lorem ipsum", "random text generator", "filler text online",
  ],
  alternates: { canonical: "https://mohdsakib.vercel.app/tools/lorem-ipsum-generator" },
  openGraph: {
    title: "Free Lorem Ipsum Generator — Words, Sentences & Paragraphs",
    description: "Generate placeholder text for mockups and designs. Classic or random, any length.",
    url: "https://mohdsakib.vercel.app/tools/lorem-ipsum-generator",
    type: "website",
  },
};

const FAQS = [
  { q: "What is Lorem Ipsum?", a: "Lorem Ipsum is placeholder text derived from Cicero's work 'de Finibus Bonorum et Malorum' written in 45 BC. It has been the industry's standard dummy text since the 1500s, when an unknown printer scrambled a passage to create a type specimen book. It's used in design and publishing to show a visual layout without using distracting meaningful text." },
  { q: "Why do designers use placeholder text?", a: "Placeholder text allows designers and clients to focus on the visual layout, typography, spacing, and overall structure of a design without being distracted by the content itself. If real text were used, readers would unconsciously evaluate the words rather than the design." },
  { q: "What is the difference between Classic and Randomised Lorem Ipsum?", a: "Classic Lorem Ipsum always starts with 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...' — the traditional Cicero-derived text. Randomised mode shuffles from a larger Latin-like vocabulary to produce varied output that won't look identical in every placeholder on the page." },
  { q: "Can I generate Lorem Ipsum by word count?", a: "Yes. Switch the 'Generate' selector to 'Words' and enter the number of words you need. The tool will generate exactly that many words — useful when you have a specific word budget for a UI element like a card description or button label." },
  { q: "Is Lorem Ipsum real Latin?", a: "Almost. It's derived from classical Latin but is deliberately scrambled so it doesn't form coherent sentences. The intent is text that looks like natural prose at a glance without carrying any meaning that would distract from the design." },
  { q: "Can I use generated Lorem Ipsum in commercial projects?", a: "Yes. Lorem Ipsum is in the public domain and can be used freely in any personal or commercial project without attribution." },
];

export default function LoremIpsumGeneratorPage() {
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

      <div className="min-h-screen" style={{ background: "#1a1613" }}>
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
          style={{ background: "rgba(26,22,19,0.92)", borderBottom: "1px solid rgba(212,168,83,0.1)" }}>
          <div className="max-w-3xl mx-auto px-6 h-13 flex items-center justify-between">
            <nav className="flex items-center gap-1.5" style={{ color: "rgba(212,168,83,0.45)", fontSize: "12px" }}>
              <Link href="/" className="font-medium hover:text-[#d4a853] transition-colors" style={{ color: "inherit" }}>Sakib</Link>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
              <Link href="/tools" className="hover:text-[#d4a853] transition-colors" style={{ color: "inherit" }}>Tools</Link>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
              <span style={{ color: "#d4a853", fontWeight: 500 }}>Lorem Ipsum Generator</span>
            </nav>
            <Link href="/tools" className="hover:opacity-80 transition-opacity"
              style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,168,83,0.35)" }}>
              All tools
            </Link>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-6 pt-24 pb-20">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full text-[10px] font-semibold"
              style={{ background: "rgba(212,168,83,0.1)", color: "#d4a853", border: "1px solid rgba(212,168,83,0.2)" }}>
              📖 TEXT & WRITING
            </div>
            <h1 className="font-semibold tracking-tight leading-tight mb-2.5"
              style={{ fontSize: "clamp(26px,4vw,34px)", color: "#f5f0e3", fontFamily: "'Georgia', serif", fontStyle: "italic" }}>
              Lorem Ipsum Generator
            </h1>
            <p style={{ fontSize: "13.5px", color: "rgba(245,240,227,0.4)", lineHeight: 1.65 }}>
              Placeholder text for designs and mockups — words, sentences, or paragraphs.
            </p>
          </div>
          <LoremIpsumGenerator />
        </main>

        <div style={{ borderTop: "1px solid rgba(212,168,83,0.08)" }}>
          <div className="max-w-3xl mx-auto px-6 py-20 space-y-20">

            <section>
              <h2 className="font-semibold tracking-tight mb-4" style={{ fontSize: "21px", color: "#f5f0e3" }}>
                What is Lorem Ipsum?
              </h2>
              <p style={{ fontSize: "14px", color: "rgba(245,240,227,0.45)", lineHeight: 1.85 }}>
                Lorem Ipsum is the oldest and most widely used placeholder text in the design and printing industry.
                Derived from Cicero&apos;s philosophical treatise from 45 BC, it was deliberately scrambled so that
                readers focus on the visual presentation of text — typeface, spacing, line length — rather than
                the words themselves. Graphic designers, web developers, and UI/UX professionals reach for it
                every day when building mockups and wireframes.
              </p>
            </section>

            <section>
              <h2 className="font-semibold tracking-tight mb-6" style={{ fontSize: "21px", color: "#f5f0e3" }}>Frequently Asked Questions</h2>
              <div className="rounded-[16px] overflow-hidden" style={{ border: "1px solid rgba(212,168,83,0.12)" }}>
                {FAQS.map(({ q, a }, i) => (
                  <div key={i} className="px-6 py-5"
                    style={{ background: "#2d2926", borderBottom: i < FAQS.length - 1 ? "1px solid rgba(212,168,83,0.07)" : "none" }}>
                    <p className="font-semibold mb-2" style={{ fontSize: "14px", color: "#f5f0e3" }}>{q}</p>
                    <p style={{ fontSize: "13px", color: "rgba(245,240,227,0.45)", lineHeight: 1.75 }}>{a}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[20px] px-8 py-10 text-center"
              style={{ background: "#2d2926", border: "1px solid rgba(212,168,83,0.15)" }}>
              <p className="font-semibold tracking-tight mb-2" style={{ fontSize: "19px", color: "#f5f0e3" }}>More free tools</p>
              <p className="mb-6" style={{ fontSize: "13px", color: "rgba(245,240,227,0.35)", lineHeight: 1.7 }}>
                Word counter, text case converter, markdown preview and more.
              </p>
              <Link href="/tools" className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] font-medium transition-opacity hover:opacity-80"
                style={{ background: "#d4a853", color: "#1a1613", fontSize: "13px" }}>
                Browse all tools
              </Link>
            </section>

            <div className="pb-4">
              <Link href="/tools" className="inline-flex items-center gap-2.5 hover:opacity-60 transition-opacity"
                style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,168,83,0.3)" }}>
                <span>←</span> Back to tools
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
