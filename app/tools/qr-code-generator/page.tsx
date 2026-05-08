import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import QrCodeGenerator from "./QrCodeGenerator";

export const metadata: Metadata = {
  title: "Free QR Code Generator — Create QR Codes for URLs, WiFi & More",
  description:
    "Generate QR codes instantly for URLs, plain text, WiFi networks, and email links. Choose colors, error correction level, and download as PNG. 100% free, runs in your browser.",
  keywords: [
    "qr code generator", "free qr code generator", "qr code maker", "qr code creator online",
    "wifi qr code generator", "url qr code generator", "qr code download png",
    "custom qr code generator", "qr code color", "qr code error correction",
  ],
  alternates: { canonical: "https://mohdsakib.vercel.app/tools/qr-code-generator" },
  openGraph: {
    title: "Free QR Code Generator — Create QR Codes for URLs, WiFi & More",
    description: "Generate QR codes for URLs, WiFi, text, and email. Custom colors, error correction, download as PNG.",
    url: "https://mohdsakib.vercel.app/tools/qr-code-generator",
    type: "website",
  },
};

const QR_TYPES = [
  {
    name: "URL QR Code",
    desc: "Encode any web address. Scan to open a website instantly — no typing required. Ideal for business cards, flyers, and product packaging.",
  },
  {
    name: "WiFi QR Code",
    desc: "Let guests join your network by scanning a code. Encodes SSID, password, and security type in the standard WIFI: format recognised by all modern phones.",
  },
  {
    name: "Text QR Code",
    desc: "Encode any plain text message up to a few hundred characters. Useful for short notes, instructions, coupons, or hidden messages.",
  },
  {
    name: "Email QR Code",
    desc: "Generates a mailto: link that opens the default mail app pre-filled with recipient address, subject, and body — perfect for contact pages.",
  },
];

const FAQS = [
  {
    q: "What is a QR code and how does it work?",
    a: "A QR (Quick Response) code is a two-dimensional barcode that stores data as a pattern of black and white squares. A smartphone camera or QR scanner decodes the pattern back into text, a URL, or other data. They support error correction so they still scan even when partially damaged.",
  },
  {
    q: "Is this QR code generator free?",
    a: "Yes, completely free. The QR code is generated in your browser using a pure JavaScript implementation of the ISO/IEC 18004 standard. No account needed, no watermarks, no limits.",
  },
  {
    q: "What does error correction level mean?",
    a: "Error correction lets a QR code remain scannable even if part of it is obscured or damaged. Level L recovers 7% of data, M recovers 15%, Q recovers 25%, and H recovers 30%. Higher levels produce denser, more complex codes. Use H when adding a logo overlay; use L for clean, simple codes.",
  },
  {
    q: "Can I use colored QR codes?",
    a: "Yes. You can set any foreground and background color with the color pickers. For best scan reliability, maintain high contrast between foreground and background. Dark foreground on light background is safest; avoid very similar colors or red-on-green combinations.",
  },
  {
    q: "What is the maximum amount of data a QR code can store?",
    a: "This generator supports QR code versions 1–10, which can encode up to approximately 174 bytes in byte mode with ECC level M. For URLs this covers most real-world links. The standard supports up to version 40, which holds ~2,900 bytes of text.",
  },
  {
    q: "Does the QR code expire?",
    a: "No. QR codes generated here are static — they embed the data directly in the pattern. They never expire. Dynamic QR codes (that redirect through a short URL) can expire, but this tool generates true static codes.",
  },
];

export default function QrCodeGeneratorPage() {
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

      <div className="min-h-screen" style={{ background: "#f9f9f9" }}>
        <header
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
          style={{ background: "rgba(249,249,249,0.95)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}
        >
          <div className="max-w-3xl mx-auto px-6 h-13 flex items-center justify-between">
            <nav className="flex items-center gap-1.5" style={{ fontSize: "11px", color: "#9ca3af" }}>
              <Link href="/" className="hover:text-[#111111] transition-colors" style={{ color: "inherit" }}>
                Sakib
              </Link>
              <ChevronRight size={10} style={{ opacity: 0.5 }} />
              <Link href="/tools" className="hover:text-[#111111] transition-colors" style={{ color: "inherit" }}>
                Tools
              </Link>
              <ChevronRight size={10} style={{ opacity: 0.5 }} />
              <span style={{ color: "#111111" }}>QR Code Generator</span>
            </nav>
            <Link
              href="/tools"
              className="hover:opacity-60 transition-opacity"
              style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#9ca3af" }}
            >
              All Tools
            </Link>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-6 pt-24 pb-20">
          <div className="mb-8">
            <div
              className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full"
              style={{ background: "rgba(17,17,17,0.05)", color: "#111111", border: "1px solid rgba(17,17,17,0.08)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em" }}
            >
              DEVELOPER
            </div>
            <h1
              className="font-bold tracking-tight leading-tight mb-2.5"
              style={{ fontSize: "clamp(26px,4vw,36px)", color: "#111111", letterSpacing: "-0.02em" }}
            >
              QR Code Generator
            </h1>
            <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.65 }}>
              Generate QR codes for URLs, WiFi networks, text, and email — instantly in your browser. Custom colors, error correction, free PNG download.
            </p>
          </div>

          <QrCodeGenerator />
        </main>

        <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <div className="max-w-3xl mx-auto px-6 py-20 space-y-20">

            <section>
              <h2 className="font-bold mb-6" style={{ fontSize: "21px", color: "#111111", letterSpacing: "-0.01em" }}>
                Types of QR Codes
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {QR_TYPES.map(({ name, desc }) => (
                  <div
                    key={name}
                    className="rounded-[16px] p-5"
                    style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)" }}
                  >
                    <p className="font-semibold mb-2" style={{ fontSize: "13px", color: "#111111" }}>{name}</p>
                    <p style={{ fontSize: "12.5px", color: "#6b7280", lineHeight: 1.7 }}>{desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-bold mb-6" style={{ fontSize: "21px", color: "#111111", letterSpacing: "-0.01em" }}>
                Frequently Asked Questions
              </h2>
              <div className="rounded-[16px] overflow-hidden" style={{ border: "1px solid rgba(0,0,0,0.07)" }}>
                {FAQS.map(({ q, a }, i) => (
                  <div
                    key={i}
                    className="px-6 py-5"
                    style={{
                      background: "#ffffff",
                      borderBottom: i < FAQS.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none",
                    }}
                  >
                    <p className="font-semibold mb-2" style={{ fontSize: "13.5px", color: "#111111" }}>{q}</p>
                    <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.75 }}>{a}</p>
                  </div>
                ))}
              </div>
            </section>

            <section
              className="rounded-[20px] px-8 py-10 text-center"
              style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)" }}
            >
              <p className="font-bold mb-2" style={{ fontSize: "19px", color: "#111111", letterSpacing: "-0.01em" }}>
                More free developer tools
              </p>
              <p className="mb-6" style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.7 }}>
                Password generator, Base64 encoder, JSON formatter, Regex tester — all free, all in your browser.
              </p>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] font-semibold transition-opacity hover:opacity-80"
                style={{ background: "#111111", color: "#ffffff", fontSize: "13px" }}
              >
                Browse all tools
              </Link>
            </section>

            <div className="pb-4">
              <Link
                href="/tools"
                className="inline-flex items-center gap-2.5 hover:opacity-60 transition-opacity"
                style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#9ca3af" }}
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
