import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import FlashcardMaker from "./FlashcardMaker";

export const metadata: Metadata = {
  title: "Free Flashcard Maker — Study with Digital Flashcards Online",
  description:
    "Create, edit, and study digital flashcards in your browser. Flip cards with 3D animation, track your score, shuffle your deck, and import from CSV. Free, no account needed.",
  keywords: [
    "flashcard maker", "digital flashcards", "online flashcard creator", "study flashcards",
    "free flashcard app", "spaced repetition", "active recall", "flashcard study tool",
    "make flashcards online", "flashcard generator", "study tool", "memorization tool",
  ],
  alternates: { canonical: "https://mohdsakib.vercel.app/tools/flashcard-maker" },
  openGraph: {
    title: "Free Flashcard Maker — Study with Digital Flashcards Online",
    description: "Create and study digital flashcards in your browser. 3D flip animation, score tracking, shuffle, and CSV import. Free, in-browser.",
    url: "https://mohdsakib.vercel.app/tools/flashcard-maker",
    type: "website",
  },
};

const SCIENCE_POINTS = [
  {
    num: "01",
    title: "Active Recall",
    desc: "Forcing your brain to retrieve information — rather than passively re-reading it — creates much stronger memory traces. Each time you flip a card and produce the answer yourself, you strengthen that neural pathway.",
  },
  {
    num: "02",
    title: "Spaced Repetition",
    desc: "Reviewing material at increasing intervals exploits the psychological spacing effect. Cards you mark 'Review again' should be revisited sooner, while well-known cards can be spaced further apart to maintain them with less effort.",
  },
  {
    num: "03",
    title: "Immediate Feedback",
    desc: "Flashcards give you instant confirmation of whether your recall was accurate. This tight feedback loop accelerates learning compared to methods where errors go uncorrected for long periods.",
  },
  {
    num: "04",
    title: "Chunking Information",
    desc: "Breaking a large subject into discrete term–definition pairs makes each piece of knowledge more manageable and easier to slot into long-term memory.",
  },
  {
    num: "05",
    title: "Interleaving",
    desc: "Shuffling your deck so related topics don't always appear together trains your brain to discriminate between concepts — a more demanding but far more effective practice than blocked repetition.",
  },
  {
    num: "06",
    title: "Metacognitive Awareness",
    desc: "Marking each card 'Know it' or 'Review again' forces you to honestly assess your own knowledge, which is a skill (metacognition) that improves academic outcomes across all subjects.",
  },
];

const FAQS = [
  {
    q: "What is a flashcard and why does it work for studying?",
    a: "A flashcard is a two-sided learning card with a prompt (term or question) on one side and the answer or definition on the other. They work because they leverage active recall — the act of retrieving information from memory — which is far more effective at building long-term retention than passively re-reading notes or a textbook.",
  },
  {
    q: "What is spaced repetition and how does it relate to flashcards?",
    a: "Spaced repetition is a study technique where you review information at gradually increasing intervals. Cards you struggle with are shown more frequently, while well-known cards are spaced further apart. Combined with flashcards, this produces dramatic improvements in long-term retention with less total study time than massed practice.",
  },
  {
    q: "How do I import my own flashcards using CSV?",
    a: "In the Create tab, click 'Import CSV' and paste your content. Each line should follow the format: term,definition. For example: Photosynthesis,The process by which plants convert light into glucose. You can import as many cards as you like in one go, and they are added to your existing deck.",
  },
  {
    q: "Are my flashcards saved between sessions?",
    a: "Yes. Your entire deck — including the deck name and all cards — is saved to your browser's localStorage automatically after every change. As long as you use the same browser on the same device, your cards will be there next time you visit.",
  },
  {
    q: "What is the difference between 'Know it' and 'Review again'?",
    a: "'Know it' (green checkmark) means you recalled the answer confidently. 'Review again' (red cross) means you hesitated or got it wrong. At the end of a session, the tool shows you your score and lists all cards marked for review so you know exactly where to focus next.",
  },
  {
    q: "Can I use keyboard shortcuts while studying?",
    a: "Yes. Press the Spacebar to flip the current card. Use the Arrow Left and Arrow Right keys to navigate to the previous or next card without needing to use the mouse.",
  },
];

export default function FlashcardMakerPage() {
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen" style={{ background: "#f5ede0" }}>
        <header
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
          style={{ background: "rgba(245,237,224,0.92)", borderBottom: "1px solid rgba(230,126,34,0.12)" }}
        >
          <div className="max-w-3xl mx-auto px-6 h-13 flex items-center justify-between">
            <nav className="flex items-center gap-1.5" style={{ color: "rgba(230,126,34,0.45)", fontSize: "12px" }}>
              <Link href="/" className="font-medium hover:text-[#e67e22] transition-colors" style={{ color: "inherit" }}>
                Sakib
              </Link>
              <ChevronRight size={11} style={{ opacity: 0.45 }} />
              <Link href="/tools" className="hover:text-[#e67e22] transition-colors" style={{ color: "inherit" }}>
                Tools
              </Link>
              <ChevronRight size={11} style={{ opacity: 0.45 }} />
              <span style={{ color: "#e67e22", fontWeight: 500 }}>Flashcard Maker</span>
            </nav>
            <Link
              href="/tools"
              className="hover:opacity-70 transition-opacity"
              style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(230,126,34,0.4)" }}
            >
              All tools
            </Link>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-6 pt-24 pb-20">
          <div className="mb-8">
            <div
              className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full text-[10px] font-semibold"
              style={{ background: "rgba(230,126,34,0.12)", color: "#e67e22", border: "1px solid rgba(230,126,34,0.22)" }}
            >
              📚 PRODUCTIVITY
            </div>
            <h1
              className="font-semibold tracking-tight leading-tight mb-2.5"
              style={{ fontSize: "clamp(26px,4vw,34px)", color: "#2c3e50" }}
            >
              Flashcard Maker
            </h1>
            <p style={{ fontSize: "13.5px", color: "rgba(44,62,80,0.5)", lineHeight: 1.65 }}>
              Create your deck, flip cards with a 3D animation, and track what you know.
              Study smarter with active recall — no account, no install.
            </p>
          </div>

          <FlashcardMaker />
        </main>

        <div style={{ borderTop: "1px solid rgba(230,126,34,0.1)" }}>
          <div className="max-w-3xl mx-auto px-6 py-20 space-y-20">

            <section>
              <h2 className="font-semibold tracking-tight mb-6" style={{ fontSize: "21px", color: "#2c3e50" }}>
                The Science of Flashcards
              </h2>
              <div className="space-y-3">
                {SCIENCE_POINTS.map(({ num, title, desc }) => (
                  <div
                    key={num}
                    className="flex gap-5 rounded-[14px] p-5"
                    style={{ background: "#fffef9", border: "1px solid rgba(0,0,0,0.07)" }}
                  >
                    <span className="shrink-0 font-bold text-[11px]" style={{ color: "rgba(230,126,34,0.4)", fontFamily: "monospace" }}>
                      {num}
                    </span>
                    <div>
                      <p className="font-semibold mb-1" style={{ fontSize: "13.5px", color: "#2c3e50" }}>{title}</p>
                      <p style={{ fontSize: "12.5px", color: "rgba(44,62,80,0.5)", lineHeight: 1.7 }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-semibold tracking-tight mb-6" style={{ fontSize: "21px", color: "#2c3e50" }}>
                Frequently Asked Questions
              </h2>
              <div className="rounded-[16px] overflow-hidden" style={{ border: "1px solid rgba(0,0,0,0.08)" }}>
                {FAQS.map(({ q, a }, i) => (
                  <div
                    key={i}
                    className="px-6 py-5"
                    style={{
                      background: "#fffef9",
                      borderBottom: i < FAQS.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none",
                    }}
                  >
                    <p className="font-semibold mb-2" style={{ fontSize: "14px", color: "#2c3e50" }}>{q}</p>
                    <p style={{ fontSize: "13px", color: "rgba(44,62,80,0.5)", lineHeight: 1.75 }}>{a}</p>
                  </div>
                ))}
              </div>
            </section>

            <section
              className="rounded-[20px] px-8 py-10 text-center"
              style={{ background: "#fffef9", border: "1px solid rgba(230,126,34,0.18)" }}
            >
              <p className="font-semibold tracking-tight mb-2" style={{ fontSize: "19px", color: "#2c3e50" }}>
                More free tools
              </p>
              <p className="mb-6" style={{ fontSize: "13px", color: "rgba(44,62,80,0.4)", lineHeight: 1.7 }}>
                Pomodoro timer, countdown timer, word counter, and more — all free, in-browser.
              </p>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] font-medium transition-opacity hover:opacity-80"
                style={{ background: "#e67e22", color: "#ffffff", fontSize: "13px" }}
              >
                Browse all tools
              </Link>
            </section>

            <div className="pb-4">
              <Link
                href="/tools"
                className="inline-flex items-center gap-2.5 hover:opacity-60 transition-opacity"
                style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(230,126,34,0.35)" }}
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
