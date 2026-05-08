import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Notepad from "./Notepad";

export const metadata: Metadata = {
  title: "Free Online Notepad — Auto-Save, Distraction-Free Writing",
  description:
    "A minimal browser-based notepad that auto-saves to your browser as you type. Download as .txt or .md. No account needed, no ads, no distractions — just write.",
  keywords: [
    "online notepad", "free notepad online", "browser notepad", "auto-save notepad",
    "distraction-free writing", "simple text editor online", "writing tool",
    "notes app online", "quick notes online", "markdown notepad",
  ],
  alternates: { canonical: "https://mohdsakib.vercel.app/tools/notepad" },
  openGraph: {
    title: "Free Online Notepad — Auto-Save, Distraction-Free",
    description: "A minimal auto-saving notepad in your browser. Download as .txt or .md. No account needed.",
    url: "https://mohdsakib.vercel.app/tools/notepad",
    type: "website",
  },
};

const FAQS = [
  { q: "Does my text save automatically?", a: "Yes. The notepad saves your text to your browser's localStorage about 1 second after you stop typing. A green dot in the toolbar confirms the save. The text will be there when you return to the page — as long as you don't clear your browser data." },
  { q: "What happens if I close the tab?", a: "Your text is saved in the browser's localStorage, so it persists across page reloads and tab closes. Next time you open the notepad, your text is restored automatically." },
  { q: "Is my text private?", a: "Yes. Everything stays in your browser's localStorage. Nothing is sent to any server. Only you can see your notes, on the device you're using." },
  { q: "Can I download my notes?", a: "Yes. Click '.txt' or '.md' in the toolbar to download your current text as a file. The .md option saves it as a Markdown file, which is useful if you're writing formatted content." },
  { q: "Is there a character limit?", a: "localStorage has a limit of approximately 5MB per origin in most browsers. That's about 2.5 million characters of plain text — enough for a long book. You're unlikely to hit the limit in normal use." },
  { q: "Can I use this as a temporary clipboard?", a: "Absolutely. Paste text here to hold it while you work elsewhere, or use it to compose a message before copying into another app. The auto-save means you won't lose anything even if you accidentally navigate away." },
];

export default function NotepadPage() {
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

      <div className="min-h-screen" style={{ background: "#faf9f0" }}>
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
          style={{ background: "rgba(250,249,240,0.92)", borderBottom: "1px solid rgba(28,26,20,0.06)" }}>
          <div className="max-w-3xl mx-auto px-6 h-13 flex items-center justify-between">
            <nav className="flex items-center gap-1.5" style={{ color: "rgba(28,26,20,0.4)", fontSize: "12px" }}>
              <Link href="/" className="font-medium hover:text-[#1c1a14] transition-colors" style={{ color: "inherit" }}>Sakib</Link>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
              <Link href="/tools" className="hover:text-[#1c1a14] transition-colors" style={{ color: "inherit" }}>Tools</Link>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
              <span style={{ color: "#1c1a14", fontWeight: 500 }}>Notepad</span>
            </nav>
            <Link href="/tools" className="hover:opacity-80 transition-opacity"
              style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(28,26,20,0.4)" }}>
              All tools
            </Link>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-6 pt-24 pb-20">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full text-[10px] font-semibold"
              style={{ background: "rgba(28,26,20,0.06)", color: "rgba(28,26,20,0.6)", border: "1px solid rgba(28,26,20,0.08)" }}>
              ✏️ TEXT & WRITING
            </div>
            <h1 className="font-semibold tracking-tight leading-tight mb-2"
              style={{ fontSize: "clamp(24px,4vw,32px)", color: "#1c1a14", fontFamily: "'Georgia', serif" }}>
              Notepad
            </h1>
            <p style={{ fontSize: "13px", color: "rgba(28,26,20,0.45)", lineHeight: 1.65 }}>
              Auto-saves as you type. Export as .txt or .md. Nothing leaves your browser.
            </p>
          </div>
          <Notepad />
        </main>

        <div style={{ borderTop: "1px solid rgba(28,26,20,0.06)" }}>
          <div className="max-w-3xl mx-auto px-6 py-20 space-y-20">

            <section>
              <h2 className="font-semibold tracking-tight mb-4" style={{ fontSize: "21px", color: "#1c1a14" }}>
                About This Notepad
              </h2>
              <p style={{ fontSize: "14px", color: "rgba(28,26,20,0.55)", lineHeight: 1.85, fontFamily: "'Georgia', serif", fontStyle: "italic" }}>
                This is a minimal, distraction-free notepad for quick notes, drafts, and writing. It automatically
                saves your text to your browser&apos;s localStorage as you type — no accounts, no servers, no sync.
                Close the tab and come back; your note will be waiting. Download as plain text or Markdown
                whenever you&apos;re done.
              </p>
            </section>

            <section>
              <h2 className="font-semibold tracking-tight mb-6" style={{ fontSize: "21px", color: "#1c1a14" }}>Frequently Asked Questions</h2>
              <div className="space-y-px rounded-[16px] overflow-hidden" style={{ boxShadow: "0 0 0 1px rgba(28,26,20,0.06)" }}>
                {FAQS.map(({ q, a }, i) => (
                  <div key={i} className="px-6 py-5"
                    style={{ background: "#ffffff", borderBottom: i < FAQS.length - 1 ? "1px solid rgba(28,26,20,0.05)" : "none" }}>
                    <p className="font-medium mb-2" style={{ fontSize: "14px", color: "#1c1a14" }}>{q}</p>
                    <p style={{ fontSize: "13px", color: "rgba(28,26,20,0.5)", lineHeight: 1.75 }}>{a}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[20px] px-8 py-10 text-center"
              style={{ background: "#ffffff", boxShadow: "0 0 0 1px rgba(28,26,20,0.06), 0 4px 24px rgba(28,26,20,0.04)" }}>
              <p className="font-semibold tracking-tight mb-2" style={{ fontSize: "19px", color: "#1c1a14" }}>More free tools</p>
              <p className="mb-6" style={{ fontSize: "13px", color: "rgba(28,26,20,0.45)", lineHeight: 1.7 }}>
                Word counter, lorem ipsum generator, markdown preview and more.
              </p>
              <Link href="/tools" className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] font-medium transition-opacity hover:opacity-80"
                style={{ background: "#1c1a14", color: "#faf9f0", fontSize: "13px" }}>
                Browse all tools
              </Link>
            </section>

            <div className="pb-4">
              <Link href="/tools" className="inline-flex items-center gap-2.5 hover:opacity-70 transition-opacity"
                style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(28,26,20,0.35)" }}>
                <span>←</span> Back to tools
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
