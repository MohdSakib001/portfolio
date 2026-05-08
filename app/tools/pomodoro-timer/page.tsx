import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import PomodoroTimer from "./PomodoroTimer";

export const metadata: Metadata = {
  title: "Free Pomodoro Timer — Focus Timer with Configurable Sessions",
  description:
    "A Pomodoro focus timer with 25-minute work sessions, 5-minute short breaks, and 15-minute long breaks every 4 sessions. Configurable, with a subtle sound cue. Free, browser-based.",
  keywords: [
    "pomodoro timer", "pomodoro technique", "focus timer online", "productivity timer",
    "25 minute timer", "pomodoro clock", "work timer", "study timer", "pomodoro app",
    "tomato timer", "focus session timer", "pomodoro online free",
  ],
  alternates: { canonical: "https://mohdsakib.vercel.app/tools/pomodoro-timer" },
  openGraph: {
    title: "Free Pomodoro Timer — Focus Timer with Sessions",
    description: "Pomodoro timer with configurable work/break lengths, session counter, and sound cue. Free, in-browser.",
    url: "https://mohdsakib.vercel.app/tools/pomodoro-timer",
    type: "website",
  },
};

const TECHNIQUE_STEPS = [
  { num: "01", title: "Choose a task",      desc: "Pick one specific task you want to complete. Write it down if it helps." },
  { num: "02", title: "Set the timer",      desc: "Start a 25-minute focus session. No interruptions — phones off, notifications off." },
  { num: "03", title: "Work until the bell", desc: "Work exclusively on the task until the chime sounds. Don't stop early." },
  { num: "04", title: "Short break",        desc: "Take 5 minutes away from your screen. Walk around, stretch, get water." },
  { num: "05", title: "Repeat × 4",         desc: "After 4 pomodoros, take a longer 15–30 minute break to recover properly." },
  { num: "06", title: "Track your sessions", desc: "Count completed sessions to estimate task effort for future planning." },
];

const FAQS = [
  { q: "What is the Pomodoro Technique?", a: "The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. It breaks work into 25-minute focused sessions separated by short breaks. The name comes from the tomato-shaped kitchen timer he used as a student ('pomodoro' is Italian for tomato)." },
  { q: "Why 25 minutes?", a: "Research suggests that 20–30 minutes is close to the optimal sustained attention span for most people before cognitive performance starts to decline. The 25-minute window is short enough to feel manageable and long enough to make meaningful progress." },
  { q: "Can I change the timer durations?", a: "Yes. Click the settings (⚙) button to open the configuration panel. You can set custom durations for the focus session, short break, and long break to suit your working style." },
  { q: "How many pomodoros make up a long break?", a: "After every 4 completed focus sessions, the timer automatically suggests a long break of 15 minutes (configurable). This is designed to give your brain a deeper recovery before the next set of sessions." },
  { q: "Does the timer make a sound?", a: "Yes, a gentle chime plays when each session ends. It uses the browser's Web Audio API, so no extra files are needed. The sound will only play after you interact with the page (browser security requirement)." },
  { q: "What should I do during a short break?", a: "Step away from the screen. Stand up, stretch, walk to another room, get a drink of water. Avoid checking social media — the goal is to let your mind rest, not switch to a different cognitive task." },
];

export default function PomodoroTimerPage() {
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

      <div className="min-h-screen" style={{ background: "#0d0803" }}>
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
          style={{ background: "rgba(13,8,3,0.92)", borderBottom: "1px solid rgba(249,115,22,0.1)" }}>
          <div className="max-w-3xl mx-auto px-6 h-13 flex items-center justify-between">
            <nav className="flex items-center gap-1.5" style={{ color: "rgba(249,115,22,0.4)", fontSize: "12px" }}>
              <Link href="/" className="font-medium hover:text-[#f97316] transition-colors" style={{ color: "inherit" }}>Sakib</Link>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
              <Link href="/tools" className="hover:text-[#f97316] transition-colors" style={{ color: "inherit" }}>Tools</Link>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
              <span style={{ color: "#f97316", fontWeight: 500 }}>Pomodoro Timer</span>
            </nav>
            <Link href="/tools" className="hover:opacity-80 transition-opacity"
              style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(249,115,22,0.35)" }}>
              All tools
            </Link>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-6 pt-24 pb-20">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full text-[10px] font-semibold"
              style={{ background: "rgba(249,115,22,0.1)", color: "#f97316", border: "1px solid rgba(249,115,22,0.2)" }}>
              🍅 PRODUCTIVITY
            </div>
            <h1 className="font-semibold tracking-tight leading-tight mb-2.5"
              style={{ fontSize: "clamp(26px,4vw,34px)", color: "#fef3e2" }}>
              Pomodoro Timer
            </h1>
            <p style={{ fontSize: "13.5px", color: "rgba(254,243,226,0.4)", lineHeight: 1.65 }}>
              Focus for 25 minutes. Break for 5. Long break every 4 sessions.
            </p>
          </div>
          <PomodoroTimer />
        </main>

        <div style={{ borderTop: "1px solid rgba(249,115,22,0.08)" }}>
          <div className="max-w-3xl mx-auto px-6 py-20 space-y-20">

            <section>
              <h2 className="font-semibold tracking-tight mb-6" style={{ fontSize: "21px", color: "#fef3e2" }}>
                How the Pomodoro Technique Works
              </h2>
              <div className="space-y-3">
                {TECHNIQUE_STEPS.map(({ num, title, desc }) => (
                  <div key={num} className="flex gap-5 rounded-[14px] p-5"
                    style={{ background: "#150e05", border: "1px solid rgba(249,115,22,0.08)" }}>
                    <span className="shrink-0 font-bold text-[11px]" style={{ color: "rgba(249,115,22,0.4)", fontFamily: "monospace" }}>{num}</span>
                    <div>
                      <p className="font-semibold mb-1" style={{ fontSize: "13.5px", color: "#fef3e2" }}>{title}</p>
                      <p style={{ fontSize: "12.5px", color: "rgba(254,243,226,0.4)", lineHeight: 1.7 }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-semibold tracking-tight mb-6" style={{ fontSize: "21px", color: "#fef3e2" }}>Frequently Asked Questions</h2>
              <div className="rounded-[16px] overflow-hidden" style={{ border: "1px solid rgba(249,115,22,0.1)" }}>
                {FAQS.map(({ q, a }, i) => (
                  <div key={i} className="px-6 py-5"
                    style={{ background: "#150e05", borderBottom: i < FAQS.length - 1 ? "1px solid rgba(249,115,22,0.06)" : "none" }}>
                    <p className="font-semibold mb-2" style={{ fontSize: "14px", color: "#fef3e2" }}>{q}</p>
                    <p style={{ fontSize: "13px", color: "rgba(254,243,226,0.45)", lineHeight: 1.75 }}>{a}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[20px] px-8 py-10 text-center"
              style={{ background: "#150e05", border: "1px solid rgba(249,115,22,0.15)" }}>
              <p className="font-semibold tracking-tight mb-2" style={{ fontSize: "19px", color: "#fef3e2" }}>More free tools</p>
              <p className="mb-6" style={{ fontSize: "13px", color: "rgba(254,243,226,0.35)", lineHeight: 1.7 }}>
                Countdown timer, timezone converter, flashcard maker and more.
              </p>
              <Link href="/tools" className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] font-medium transition-opacity hover:opacity-80"
                style={{ background: "#f97316", color: "#ffffff", fontSize: "13px" }}>
                Browse all tools
              </Link>
            </section>

            <div className="pb-4">
              <Link href="/tools" className="inline-flex items-center gap-2.5 hover:opacity-60 transition-opacity"
                style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(249,115,22,0.3)" }}>
                <span>←</span> Back to tools
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
