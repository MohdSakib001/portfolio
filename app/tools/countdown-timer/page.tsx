import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import CountdownTimer from "./CountdownTimer";

export const metadata: Metadata = {
  title: "Free Countdown Timer — Count Down to Any Date or Event",
  description:
    "Create a countdown to any event — a birthday, deadline, vacation, or new year. Displays days, hours, minutes, and seconds in real time. Free, browser-based, no sign-up.",
  keywords: [
    "countdown timer", "countdown to date", "event countdown", "countdown clock online",
    "days until calculator", "how many days until", "birthday countdown",
    "countdown to new year", "deadline countdown", "timer countdown online",
  ],
  alternates: { canonical: "https://mohdsakib.vercel.app/tools/countdown-timer" },
  openGraph: {
    title: "Free Countdown Timer — Count Down to Any Event",
    description: "Count down to any date in real time. Days, hours, minutes, seconds. Free, in-browser.",
    url: "https://mohdsakib.vercel.app/tools/countdown-timer",
    type: "website",
  },
};

const FAQS = [
  { q: "How do I create a countdown?", a: "Enter an event name and select a target date and time. The countdown starts immediately and updates every second until the target is reached." },
  { q: "What happens when the countdown reaches zero?", a: "A celebration message appears with a confetti emoji. You can then set a new target date to start a fresh countdown." },
  { q: "Can I count down to a specific time, not just a date?", a: "Yes. The date input includes both date and time components, so you can count down to a specific minute — useful for meeting deadlines, launch times, or live events." },
  { q: "Does the countdown continue if I close the tab?", a: "No. The countdown runs in your browser's JavaScript runtime. If you close the tab, the timer stops. When you return, the countdown will recalculate from the current time to the target date." },
  { q: "Can I use this for business launch countdowns?", a: "Yes — the tool works well for product launches, sale events, and promotional deadlines. Simply set the target to your launch date and time." },
  { q: "How accurate is the countdown?", a: "The countdown updates every second using the browser's system clock. It's accurate to within a second for most purposes. For sub-second precision, a different tool would be needed." },
];

export default function CountdownTimerPage() {
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

      <div className="min-h-screen" style={{ background: "#05050a" }}>
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
          style={{ background: "rgba(5,5,10,0.92)", borderBottom: "1px solid rgba(99,102,241,0.1)" }}>
          <div className="max-w-3xl mx-auto px-6 h-13 flex items-center justify-between">
            <nav className="flex items-center gap-1.5" style={{ color: "rgba(224,231,255,0.35)", fontSize: "12px" }}>
              <Link href="/" className="font-medium hover:text-white transition-colors" style={{ color: "inherit" }}>Sakib</Link>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
              <Link href="/tools" className="hover:text-white transition-colors" style={{ color: "inherit" }}>Tools</Link>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
              <span style={{ color: "#818cf8", fontWeight: 500 }}>Countdown Timer</span>
            </nav>
            <Link href="/tools" className="hover:opacity-80 transition-opacity"
              style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(224,231,255,0.3)" }}>
              All tools
            </Link>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-6 pt-24 pb-20">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full text-[10px] font-semibold"
              style={{ background: "rgba(99,102,241,0.1)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.2)" }}>
              ⏳ PRODUCTIVITY
            </div>
            <h1 className="font-semibold tracking-tight leading-tight mb-2.5"
              style={{ fontSize: "clamp(26px,4vw,34px)", color: "#e0e7ff" }}>
              Countdown Timer
            </h1>
            <p style={{ fontSize: "13.5px", color: "rgba(224,231,255,0.4)", lineHeight: 1.65 }}>
              Set any target date and watch the countdown tick live.
            </p>
          </div>
          <CountdownTimer />
        </main>

        <div style={{ borderTop: "1px solid rgba(99,102,241,0.08)" }}>
          <div className="max-w-3xl mx-auto px-6 py-20 space-y-20">

            <section>
              <h2 className="font-semibold tracking-tight mb-4" style={{ fontSize: "21px", color: "#e0e7ff" }}>
                What is a Countdown Timer?
              </h2>
              <p style={{ fontSize: "14px", color: "rgba(224,231,255,0.45)", lineHeight: 1.85 }}>
                A countdown timer counts down from a future date or time to the present moment, showing you exactly
                how much time remains in days, hours, minutes, and seconds. Countdowns create a sense of anticipation
                for upcoming events and help teams and individuals stay aware of approaching deadlines.
              </p>
            </section>

            <section>
              <h2 className="font-semibold tracking-tight mb-6" style={{ fontSize: "21px", color: "#e0e7ff" }}>Frequently Asked Questions</h2>
              <div className="rounded-[16px] overflow-hidden" style={{ border: "1px solid rgba(99,102,241,0.1)" }}>
                {FAQS.map(({ q, a }, i) => (
                  <div key={i} className="px-6 py-5"
                    style={{ background: "rgba(255,255,255,0.03)", borderBottom: i < FAQS.length - 1 ? "1px solid rgba(99,102,241,0.07)" : "none" }}>
                    <p className="font-semibold mb-2" style={{ fontSize: "14px", color: "#e0e7ff" }}>{q}</p>
                    <p style={{ fontSize: "13px", color: "rgba(224,231,255,0.45)", lineHeight: 1.75 }}>{a}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[20px] px-8 py-10 text-center"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(99,102,241,0.15)" }}>
              <p className="font-semibold tracking-tight mb-2" style={{ fontSize: "19px", color: "#e0e7ff" }}>More free tools</p>
              <p className="mb-6" style={{ fontSize: "13px", color: "rgba(224,231,255,0.35)", lineHeight: 1.7 }}>
                Pomodoro timer, timezone converter, age calculator and more.
              </p>
              <Link href="/tools" className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] font-medium transition-opacity hover:opacity-80"
                style={{ background: "#6366f1", color: "#ffffff", fontSize: "13px" }}>
                Browse all tools
              </Link>
            </section>

            <div className="pb-4">
              <Link href="/tools" className="inline-flex items-center gap-2.5 hover:opacity-60 transition-opacity"
                style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(224,231,255,0.3)" }}>
                <span>←</span> Back to tools
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
