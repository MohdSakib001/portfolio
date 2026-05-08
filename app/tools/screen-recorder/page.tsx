import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ScreenRecorder from "./ScreenRecorder";

export const metadata: Metadata = {
  title: "Free Screen Recorder — Record Screen Online, No Extension Needed",
  description:
    "Record your screen directly in the browser with no extension or download needed. Supports system audio, microphone, and 1080p quality. Downloads as WebM. Works in Chrome, Edge, and Firefox.",
  keywords: [
    "screen recorder online", "free screen recorder", "record screen browser",
    "no extension screen recorder", "browser screen capture", "webm screen recording",
    "record screen chrome", "screen recorder no download", "online screen capture tool",
    "record tab screen window",
  ],
  alternates: { canonical: "https://mohdsakib.vercel.app/tools/screen-recorder" },
  openGraph: {
    title: "Free Screen Recorder — Record Screen Online, No Extension Needed",
    description: "In-browser screen recorder. No extension, no upload. Records screen, window, or tab with optional audio. Downloads as WebM.",
    url: "https://mohdsakib.vercel.app/tools/screen-recorder",
    type: "website",
  },
};

const BROWSER_SUPPORT = [
  { name: "Chrome", version: "72+", supported: true,  note: "Full support — screen, window, tab" },
  { name: "Edge",   version: "79+", supported: true,  note: "Full support — Chromium-based" },
  { name: "Firefox",version: "66+", supported: true,  note: "Screen and window — tab capture limited" },
  { name: "Safari", version: "—",   supported: false, note: "Not supported — lacks getDisplayMedia" },
];

const PRIVACY_POINTS = [
  { title: "Nothing leaves your device",    desc: "The recorded video is processed entirely in your browser using Web APIs. It is never uploaded to any server." },
  { title: "Browser permission required",  desc: "The browser shows an OS-level screen picker before recording begins. You choose exactly what is shared." },
  { title: "Stored in memory only",        desc: "The recording is held as an in-memory Blob. Closing or refreshing the tab permanently deletes it." },
  { title: "Download is local",           desc: "Clicking Download saves the file directly to your device. No third party is involved at any point." },
];

const FAQS = [
  {
    q: "Does this screen recorder require an extension or download?",
    a: "No. It uses the browser's built-in Screen Capture API (getDisplayMedia). Nothing is installed — just click the record button and grant permission when the browser asks.",
  },
  {
    q: "What can I record — full screen, a window, or a browser tab?",
    a: "All three. When you click the record button, the browser shows its own native screen picker where you can choose an entire monitor, a specific application window, or a single browser tab.",
  },
  {
    q: "What format is the recording saved in?",
    a: "WebM with VP9 video codec, which is the format natively produced by the MediaRecorder API in Chromium and Firefox. It is widely supported for playback and can be converted to MP4 with tools like FFmpeg or Handbrake.",
  },
  {
    q: "Can I record audio along with the screen?",
    a: "Yes. You can enable System Audio (captures what is playing through your speakers, subject to OS support) and/or Microphone independently before starting. Chrome supports both; Firefox has partial system audio support.",
  },
  {
    q: "Why doesn't Safari support screen recording?",
    a: "Safari does not implement the getDisplayMedia API that browser-based screen recorders rely on. Apple has not yet shipped this API in Safari. Use Chrome, Edge, or Firefox instead.",
  },
  {
    q: "Is my recorded video stored on your servers?",
    a: "Never. The entire recording stays in your browser's memory as a Blob object. When you click Download, the file goes straight to your device. There are no servers involved — not even for analytics on this tool.",
  },
];

export default function ScreenRecorderPage() {
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

      <div className="min-h-screen" style={{ background: "#0c0c0c" }}>
        <header
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
          style={{ background: "rgba(12,12,12,0.92)", borderBottom: "1px solid rgba(239,68,68,0.08)" }}
        >
          <div className="max-w-3xl mx-auto px-6 h-13 flex items-center justify-between">
            <nav className="flex items-center gap-1.5" style={{ color: "rgba(239,68,68,0.4)", fontSize: "12px" }}>
              <Link href="/" className="font-medium hover:text-[#ef4444] transition-colors" style={{ color: "inherit" }}>
                Sakib
              </Link>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
              <Link href="/tools" className="hover:text-[#ef4444] transition-colors" style={{ color: "inherit" }}>
                Tools
              </Link>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
              <span style={{ color: "#ef4444", fontWeight: 500 }}>Screen Recorder</span>
            </nav>
            <Link
              href="/tools"
              className="hover:opacity-80 transition-opacity"
              style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(239,68,68,0.35)" }}
            >
              All tools
            </Link>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-6 pt-24 pb-20">
          <div className="mb-8">
            <div
              className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full text-[10px] font-semibold"
              style={{ background: "rgba(239,68,68,0.08)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.18)" }}
            >
              🎥 IMAGE & MEDIA
            </div>
            <h1
              className="font-semibold tracking-tight leading-tight mb-2.5"
              style={{ fontSize: "clamp(26px,4vw,34px)", color: "#fafafa" }}
            >
              Screen Recorder
            </h1>
            <p style={{ fontSize: "13.5px", color: "rgba(250,250,250,0.4)", lineHeight: 1.65 }}>
              Record your screen, window, or tab directly in the browser. No extension, no sign-up.
            </p>
          </div>

          <ScreenRecorder />
        </main>

        <div style={{ borderTop: "1px solid rgba(239,68,68,0.07)" }}>
          <div className="max-w-3xl mx-auto px-6 py-20 space-y-20">

            <section>
              <h2 className="font-semibold tracking-tight mb-6" style={{ fontSize: "21px", color: "#fafafa" }}>
                Browser Support
              </h2>
              <div className="rounded-[16px] overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                {BROWSER_SUPPORT.map(({ name, version, supported, note }, i) => (
                  <div
                    key={name}
                    className="flex items-center gap-4 px-6 py-4"
                    style={{
                      background: "#141414",
                      borderBottom: i < BROWSER_SUPPORT.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                    }}
                  >
                    <div
                      style={{
                        width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
                        background: supported ? "#22c55e" : "rgba(255,255,255,0.15)",
                      }}
                    />
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className="font-semibold" style={{ fontSize: "13.5px", color: supported ? "#fafafa" : "rgba(255,255,255,0.3)" }}>
                          {name}
                        </span>
                        <span
                          className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                          style={{
                            background: supported ? "rgba(34,197,94,0.1)" : "rgba(255,255,255,0.05)",
                            color: supported ? "#22c55e" : "rgba(255,255,255,0.25)",
                          }}
                        >
                          {version}
                        </span>
                      </div>
                      <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", marginTop: "2px" }}>{note}</p>
                    </div>
                    <span
                      style={{
                        fontSize: "11px", fontWeight: 600,
                        color: supported ? "#22c55e" : "rgba(255,255,255,0.2)",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {supported ? "Supported" : "Not supported"}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-semibold tracking-tight mb-2" style={{ fontSize: "21px", color: "#fafafa" }}>
                Privacy & Security
              </h2>
              <p className="mb-6" style={{ fontSize: "13px", color: "rgba(250,250,250,0.4)", lineHeight: 1.7 }}>
                Screen recording is sensitive. Here is exactly what happens to your data.
              </p>
              <div className="space-y-2.5">
                {PRIVACY_POINTS.map(({ title, desc }) => (
                  <div
                    key={title}
                    className="flex gap-5 rounded-[14px] p-5"
                    style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <div
                      style={{
                        width: 20, height: 20, borderRadius: "50%", flexShrink: 0, marginTop: "1px",
                        background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.2)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                    >
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} />
                    </div>
                    <div>
                      <p className="font-semibold mb-1" style={{ fontSize: "13.5px", color: "#fafafa" }}>{title}</p>
                      <p style={{ fontSize: "12.5px", color: "rgba(250,250,250,0.4)", lineHeight: 1.7 }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-semibold tracking-tight mb-6" style={{ fontSize: "21px", color: "#fafafa" }}>
                Frequently Asked Questions
              </h2>
              <div className="rounded-[16px] overflow-hidden" style={{ border: "1px solid rgba(239,68,68,0.1)" }}>
                {FAQS.map(({ q, a }, i) => (
                  <div
                    key={i}
                    className="px-6 py-5"
                    style={{
                      background: "#141414",
                      borderBottom: i < FAQS.length - 1 ? "1px solid rgba(239,68,68,0.06)" : "none",
                    }}
                  >
                    <p className="font-semibold mb-2" style={{ fontSize: "14px", color: "#fafafa" }}>{q}</p>
                    <p style={{ fontSize: "13px", color: "rgba(250,250,250,0.4)", lineHeight: 1.75 }}>{a}</p>
                  </div>
                ))}
              </div>
            </section>

            <section
              className="rounded-[20px] px-8 py-10 text-center"
              style={{ background: "#141414", border: "1px solid rgba(239,68,68,0.14)" }}
            >
              <p className="font-semibold tracking-tight mb-2" style={{ fontSize: "19px", color: "#fafafa" }}>
                More free tools
              </p>
              <p className="mb-6" style={{ fontSize: "13px", color: "rgba(250,250,250,0.35)", lineHeight: 1.7 }}>
                Pomodoro timer, QR code generator, JSON formatter, and more — all free, all in-browser.
              </p>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] font-medium transition-opacity hover:opacity-80"
                style={{ background: "#ef4444", color: "#ffffff", fontSize: "13px" }}
              >
                Browse all tools
              </Link>
            </section>

            <div className="pb-4">
              <Link
                href="/tools"
                className="inline-flex items-center gap-2.5 hover:opacity-60 transition-opacity"
                style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(239,68,68,0.3)" }}
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
