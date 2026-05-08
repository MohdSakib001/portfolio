import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Base64Encoder from "./Base64Encoder";

export const metadata: Metadata = {
  title: "Free Base64 Encoder / Decoder & URL Encoder — Browser-Based",
  description:
    "Encode and decode Base64 strings, URL-encode and decode text, all in one tool. Instant, browser-based, nothing sent to any server. Free, no sign-up required.",
  keywords: [
    "base64 encoder", "base64 decoder", "base64 encode online", "base64 decode online",
    "URL encoder", "URL decoder", "encode base64", "decode base64 string",
    "base64 converter", "percent encoding", "URL encoding online",
  ],
  alternates: { canonical: "https://mohdsakib.vercel.app/tools/base64-encoder" },
  openGraph: {
    title: "Free Base64 Encoder / Decoder & URL Encoder",
    description: "Encode/decode Base64 and URL-encode/decode in one tool. Instant, browser-based.",
    url: "https://mohdsakib.vercel.app/tools/base64-encoder",
    type: "website",
  },
};

const USE_CASES = [
  { title: "API Authentication",  desc: "Basic auth headers use Base64-encoded \"username:password\" in the Authorization header." },
  { title: "Data URIs",           desc: "Embed images directly in HTML/CSS as Base64-encoded data:image/png;base64,... strings." },
  { title: "Email Attachments",   desc: "MIME email attachments are Base64-encoded so binary files can travel through text protocols." },
  { title: "JWT Tokens",          desc: "JSON Web Tokens encode the header and payload as Base64URL (a URL-safe variant of Base64)." },
  { title: "URL Parameters",      desc: "URL-encode strings to safely pass them as query parameters without breaking URL structure." },
  { title: "Config Files",        desc: "Kubernetes secrets and environment variables often store sensitive values as Base64-encoded strings." },
];

const FAQS = [
  { q: "What is Base64 encoding?", a: "Base64 is a binary-to-text encoding scheme that converts binary data into a string of 64 ASCII characters (A–Z, a–z, 0–9, +, /). It's used to safely transmit binary data over systems designed to handle text — like email, HTML attributes, or HTTP headers. The encoded output is about 33% larger than the original." },
  { q: "Is Base64 a form of encryption?", a: "No. Base64 is encoding, not encryption. Anyone can decode a Base64 string without a key. It's used for data representation, not security. If you need to protect data, use proper encryption (AES, RSA) rather than Base64." },
  { q: "What is the difference between Base64 and Base64URL?", a: "Base64URL replaces + with - and / with _ and removes padding = characters. This makes the output safe for use in URLs and file names without percent-encoding. JWT tokens use Base64URL encoding." },
  { q: "What is URL encoding?", a: "URL encoding (percent-encoding) converts characters that aren't safe in URLs into a % followed by two hex digits. For example, space becomes %20 and & becomes %26. It's required when passing special characters as URL query parameters." },
  { q: "Why does Base64-encoded output have = at the end?", a: "Base64 encodes data in 3-byte groups. If the input length isn't divisible by 3, padding characters (=) are added to make the output length a multiple of 4. One or two = characters at the end is normal and expected." },
  { q: "Does this tool handle Unicode and emoji?", a: "Yes. The encoder uses encodeURIComponent before calling btoa(), which handles multi-byte characters including accented letters, CJK characters, and emoji that would otherwise cause errors with the native btoa() function." },
];

export default function Base64EncoderPage() {
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

      <div className="min-h-screen" style={{ background: "#0d1117" }}>
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
          style={{ background: "rgba(13,17,23,0.92)", borderBottom: "1px solid rgba(99,102,241,0.1)" }}>
          <div className="max-w-3xl mx-auto px-6 h-13 flex items-center justify-between">
            <nav className="flex items-center gap-1.5" style={{ color: "rgba(163,176,200,0.4)", fontSize: "12px" }}>
              <Link href="/" className="font-medium hover:text-white transition-colors" style={{ color: "inherit" }}>Sakib</Link>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
              <Link href="/tools" className="hover:text-white transition-colors" style={{ color: "inherit" }}>Tools</Link>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
              <span style={{ color: "#818cf8", fontWeight: 500 }}>Base64 Encoder</span>
            </nav>
            <Link href="/tools" className="hover:opacity-80 transition-opacity"
              style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(163,176,200,0.35)" }}>
              All tools
            </Link>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-6 pt-24 pb-20">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full text-[10px] font-mono font-semibold"
              style={{ background: "rgba(99,102,241,0.1)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.2)" }}>
              # DEVELOPER
            </div>
            <h1 className="font-semibold tracking-tight leading-tight mb-2.5"
              style={{ fontSize: "clamp(26px,4vw,34px)", color: "#e2e8f0", fontFamily: "monospace" }}>
              Base64 Encoder / Decoder
            </h1>
            <p style={{ fontSize: "13.5px", color: "rgba(226,232,240,0.4)", lineHeight: 1.65, fontFamily: "monospace" }}>
              Base64 encode/decode + URL encode/decode. Browser-only, nothing sent anywhere.
            </p>
          </div>
          <Base64Encoder />
        </main>

        <div style={{ borderTop: "1px solid rgba(99,102,241,0.08)" }}>
          <div className="max-w-3xl mx-auto px-6 py-20 space-y-20">

            <section>
              <h2 className="font-semibold tracking-tight mb-6" style={{ fontSize: "21px", color: "#e2e8f0" }}>
                Common Use Cases
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {USE_CASES.map(({ title, desc }) => (
                  <div key={title} className="rounded-[14px] p-5"
                    style={{ background: "#161b22", border: "1px solid rgba(99,102,241,0.1)" }}>
                    <p className="font-semibold mb-1 font-mono" style={{ fontSize: "12.5px", color: "#818cf8" }}>{title}</p>
                    <p style={{ fontSize: "12px", color: "rgba(226,232,240,0.4)", lineHeight: 1.7 }}>{desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-semibold tracking-tight mb-6" style={{ fontSize: "21px", color: "#e2e8f0" }}>Frequently Asked Questions</h2>
              <div className="rounded-[16px] overflow-hidden" style={{ border: "1px solid rgba(99,102,241,0.1)" }}>
                {FAQS.map(({ q, a }, i) => (
                  <div key={i} className="px-6 py-5"
                    style={{ background: "#161b22", borderBottom: i < FAQS.length - 1 ? "1px solid rgba(99,102,241,0.06)" : "none" }}>
                    <p className="font-semibold mb-2 font-mono" style={{ fontSize: "13.5px", color: "#e2e8f0" }}>{q}</p>
                    <p style={{ fontSize: "12.5px", color: "rgba(226,232,240,0.45)", lineHeight: 1.75 }}>{a}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[20px] px-8 py-10 text-center"
              style={{ background: "#161b22", border: "1px solid rgba(99,102,241,0.15)" }}>
              <p className="font-semibold tracking-tight mb-2" style={{ fontSize: "19px", color: "#e2e8f0" }}>More developer tools</p>
              <p className="mb-6" style={{ fontSize: "13px", color: "rgba(226,232,240,0.35)", lineHeight: 1.7 }}>
                JWT decoder, regex tester, JSON formatter, password generator and more.
              </p>
              <Link href="/tools" className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] font-mono font-medium transition-opacity hover:opacity-80"
                style={{ background: "#6366f1", color: "#ffffff", fontSize: "12px" }}>
                Browse all tools
              </Link>
            </section>

            <div className="pb-4">
              <Link href="/tools" className="inline-flex items-center gap-2.5 hover:opacity-60 transition-opacity font-mono"
                style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(129,140,248,0.3)" }}>
                <span>←</span> Back to tools
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
