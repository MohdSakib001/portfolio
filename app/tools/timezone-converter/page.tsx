import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import TimezoneConverter from "./TimezoneConverter";

export const metadata: Metadata = {
  title: "Free Time Zone Converter — World Clock for Any City",
  description:
    "Convert times across world time zones instantly. See New York, London, Dubai, Tokyo, Sydney and 30+ cities simultaneously. Free, browser-based, no sign-up required.",
  keywords: [
    "time zone converter",
    "world clock",
    "time zone calculator",
    "convert time zones",
    "international time converter",
    "UTC offset",
    "time difference calculator",
    "remote work time zones",
    "meeting time planner",
    "city time zones",
    "current time in city",
    "timezone tool",
  ],
  alternates: { canonical: "https://mohdsakib.vercel.app/tools/timezone-converter" },
  openGraph: {
    title: "Free Time Zone Converter — World Clock for Any City",
    description:
      "See the current time in 30+ cities at once. Convert any date and time across time zones instantly.",
    url: "https://mohdsakib.vercel.app/tools/timezone-converter",
    type: "website",
  },
};

const FAQS = [
  {
    q: "What is a time zone converter?",
    a: "A time zone converter lets you see what time it is in multiple cities around the world simultaneously, and convert a specific date and time from one time zone to another. It removes the mental arithmetic of calculating UTC offsets manually.",
  },
  {
    q: "How do I use this time zone converter?",
    a: "The tool defaults to the current live time in your local timezone. All city cards update every second. To check a specific time, change the source date and time using the input at the top. The cards will immediately show the equivalent time in every listed city.",
  },
  {
    q: "Why does a card show '+1 day' or '−1 day'?",
    a: "When converting across the International Date Line or large UTC offsets, the calendar date in the target city may be one day ahead or behind your source date. The badge makes this difference visible at a glance so you don't accidentally schedule a meeting on the wrong day.",
  },
  {
    q: "How can I use this for remote work scheduling?",
    a: "Add the timezones of all your teammates from the dropdown, then adjust the source time to a proposed meeting slot. You can instantly see whether the time falls within business hours for each person, and avoid accidentally scheduling calls at 3 AM for a colleague in Tokyo.",
  },
  {
    q: "What does the moon icon on a card mean?",
    a: "A moon icon indicates that the current or selected time falls between 10 PM and 6 AM in that city — nighttime hours when people are typically asleep. The card is also displayed with a dimmer style to make this immediately recognizable.",
  },
  {
    q: "Which time zones are supported?",
    a: "The tool uses the IANA timezone database via the browser's built-in Intl.DateTimeFormat API, which supports hundreds of named zones. The searchable dropdown includes 30+ of the most commonly used city timezones. UTC offsets are calculated automatically, including daylight saving time adjustments.",
  },
];

export default function TimezoneConverterPage() {
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

      <div className="min-h-screen" style={{ background: "#0b1320" }}>
        <header
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
          style={{
            background: "rgba(11,19,32,0.92)",
            borderBottom: "1px solid rgba(56,189,248,0.08)",
          }}
        >
          <div className="max-w-3xl mx-auto px-6 h-13 flex items-center justify-between">
            <nav
              className="flex items-center gap-1.5"
              style={{ color: "rgba(224,231,255,0.35)", fontSize: "12px" }}
            >
              <Link
                href="/"
                className="font-medium hover:text-white transition-colors"
                style={{ color: "inherit" }}
              >
                Sakib
              </Link>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
              <Link
                href="/tools"
                className="hover:text-white transition-colors"
                style={{ color: "inherit" }}
              >
                Tools
              </Link>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
              <span style={{ color: "#38bdf8", fontWeight: 500 }}>Time Zone Converter</span>
            </nav>
            <Link
              href="/tools"
              className="hover:opacity-80 transition-opacity"
              style={{
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(224,231,255,0.3)",
              }}
            >
              All tools
            </Link>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-6 pt-24 pb-20">
          <div className="mb-8">
            <div
              className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full text-[10px] font-semibold"
              style={{
                background: "rgba(56,189,248,0.08)",
                color: "#38bdf8",
                border: "1px solid rgba(56,189,248,0.18)",
              }}
            >
              🌍 PRODUCTIVITY
            </div>
            <h1
              className="font-semibold tracking-tight leading-tight mb-2.5"
              style={{ fontSize: "clamp(26px,4vw,34px)", color: "#e0e7ff" }}
            >
              Time Zone Converter
            </h1>
            <p style={{ fontSize: "13.5px", color: "rgba(224,231,255,0.4)", lineHeight: 1.65 }}>
              See the current time in cities worldwide — or convert any date and time across zones instantly.
            </p>
          </div>
          <TimezoneConverter />
        </main>

        <div style={{ borderTop: "1px solid rgba(56,189,248,0.07)" }}>
          <div className="max-w-3xl mx-auto px-6 py-20 space-y-20">

            <section>
              <h2
                className="font-semibold tracking-tight mb-4"
                style={{ fontSize: "21px", color: "#e0e7ff" }}
              >
                Why Use a Time Zone Converter?
              </h2>
              <p style={{ fontSize: "14px", color: "rgba(224,231,255,0.45)", lineHeight: 1.85 }}>
                Time zone differences cause genuine problems — missed meetings, late-night calls,
                and scheduling confusion are all common when teams or families span multiple continents.
                A time zone converter gives you a single, reliable view of what time it is everywhere
                that matters to you. Instead of searching "what time is it in Tokyo right now" for every
                interaction, you can glance at all relevant cities at once, spot nighttime windows at a
                glance, and make decisions with confidence. For remote workers, freelancers, and anyone
                with international relationships, it is an indispensable daily utility.
              </p>
            </section>

            <section>
              <h2
                className="font-semibold tracking-tight mb-6"
                style={{ fontSize: "21px", color: "#e0e7ff" }}
              >
                Frequently Asked Questions
              </h2>
              <div
                className="rounded-[16px] overflow-hidden"
                style={{ border: "1px solid rgba(56,189,248,0.10)" }}
              >
                {FAQS.map(({ q, a }, i) => (
                  <div
                    key={i}
                    className="px-6 py-5"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      borderBottom:
                        i < FAQS.length - 1 ? "1px solid rgba(56,189,248,0.06)" : "none",
                    }}
                  >
                    <p
                      className="font-semibold mb-2"
                      style={{ fontSize: "14px", color: "#e0e7ff" }}
                    >
                      {q}
                    </p>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "rgba(224,231,255,0.45)",
                        lineHeight: 1.75,
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
              style={{
                background: "rgba(56,189,248,0.04)",
                border: "1px solid rgba(56,189,248,0.12)",
              }}
            >
              <p
                className="font-semibold tracking-tight mb-2"
                style={{ fontSize: "19px", color: "#e0e7ff" }}
              >
                More free tools
              </p>
              <p
                className="mb-6"
                style={{ fontSize: "13px", color: "rgba(224,231,255,0.35)", lineHeight: 1.7 }}
              >
                Pomodoro timer, countdown clock, age calculator, unit converter and more.
              </p>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] font-medium transition-opacity hover:opacity-80"
                style={{ background: "#38bdf8", color: "#0b1320", fontSize: "13px" }}
              >
                Browse all tools
              </Link>
            </section>

            <div className="pb-4">
              <Link
                href="/tools"
                className="inline-flex items-center gap-2.5 hover:opacity-60 transition-opacity"
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(224,231,255,0.3)",
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
