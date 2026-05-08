import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ImageResizer from "./ImageResizer";

export const metadata: Metadata = {
  title: "Free Image Resizer — Resize Images Online to Any Size (No Upload)",
  description:
    "Resize any image to exact pixels, percentage, or social media dimensions — 100% in your browser. No files are ever uploaded. Supports JPEG, PNG, and WebP output with quality control.",
  keywords: [
    "image resizer",
    "resize image online",
    "free image resizer",
    "resize image without upload",
    "image resizer no upload",
    "resize jpg online",
    "resize png online",
    "social media image resizer",
    "Instagram image size",
    "image resize tool",
    "bulk image resizer",
    "photo resizer",
  ],
  alternates: { canonical: "https://mohdsakib.vercel.app/tools/image-resizer" },
  openGraph: {
    title: "Free Image Resizer — Resize Images Online to Any Size (No Upload)",
    description:
      "Resize images to any pixel dimension or social media preset instantly in your browser. No upload, no server, 100% private.",
    url: "https://mohdsakib.vercel.app/tools/image-resizer",
    type: "website",
  },
};

const SIZE_GUIDE = [
  { platform: "Instagram post", size: "1080 × 1080 px", ratio: "1:1", notes: "Square feed post" },
  { platform: "Instagram story", size: "1080 × 1920 px", ratio: "9:16", notes: "Vertical full-screen" },
  { platform: "Instagram landscape", size: "1080 × 566 px", ratio: "1.91:1", notes: "Landscape feed post" },
  { platform: "Twitter/X post", size: "1200 × 675 px", ratio: "16:9", notes: "In-feed image" },
  { platform: "Twitter/X banner", size: "1500 × 500 px", ratio: "3:1", notes: "Profile header" },
  { platform: "LinkedIn cover", size: "1584 × 396 px", ratio: "4:1", notes: "Company/personal page" },
  { platform: "LinkedIn post", size: "1200 × 627 px", ratio: "1.91:1", notes: "Shared link image" },
  { platform: "YouTube thumbnail", size: "1280 × 720 px", ratio: "16:9", notes: "Min 640 × 360 px" },
  { platform: "YouTube banner", size: "2560 × 1440 px", ratio: "16:9", notes: "Channel art" },
  { platform: "Facebook cover", size: "820 × 312 px", ratio: "2.63:1", notes: "Personal profile" },
  { platform: "Facebook post", size: "1200 × 630 px", ratio: "1.91:1", notes: "Shared image" },
  { platform: "Pinterest pin", size: "1000 × 1500 px", ratio: "2:3", notes: "Vertical pin" },
];

const FAQS = [
  {
    q: "Are my images uploaded to a server?",
    a: "No. This tool runs entirely in your browser using the HTML5 Canvas API. Your images never leave your device — nothing is uploaded, stored, or transmitted to any server. Your privacy is fully preserved.",
  },
  {
    q: "What image formats can I resize?",
    a: "You can upload any image format your browser supports — JPEG, PNG, WebP, GIF, BMP, AVIF, and more. You can export the resized image as JPEG, PNG, or WebP. JPEG supports quality control (1–100); PNG and WebP use lossless compression.",
  },
  {
    q: "What does 'lock aspect ratio' mean?",
    a: "When aspect ratio is locked, changing the width automatically updates the height (and vice versa) to maintain the original image proportions. This prevents distortion. Toggle the lock off to resize to any arbitrary dimensions freely.",
  },
  {
    q: "Can I resize to social media sizes?",
    a: "Yes. The tool includes one-click presets for Instagram posts (1080×1080), Instagram stories (1080×1920), Twitter/X banners (1500×500), LinkedIn covers (1584×396), YouTube thumbnails (1280×720), and Facebook covers (820×312).",
  },
  {
    q: "What JPEG quality setting should I use?",
    a: "For web publishing, a quality of 80–90 gives an excellent balance of file size and visual quality. For print or archival use, set it to 95–100. Quality 60–75 is suitable for thumbnails and previews where file size is the priority.",
  },
  {
    q: "Does resizing to a larger size improve image quality?",
    a: "No. Upscaling (making an image larger than its original dimensions) does not add detail — it only interpolates existing pixels, which can make the image appear blurry or pixelated. For best results, always start with the highest-resolution original available.",
  },
];

export default function ImageResizerPage() {
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

      <div className="min-h-screen" style={{ background: "#181520" }}>
        <header
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
          style={{
            background: "rgba(24,21,32,0.92)",
            borderBottom: "1px solid rgba(192,132,252,0.08)",
          }}
        >
          <div className="max-w-3xl mx-auto px-6 h-13 flex items-center justify-between">
            <nav
              className="flex items-center gap-1.5"
              style={{ color: "rgba(226,232,240,0.4)", fontSize: "12px" }}
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
              <span style={{ color: "#c084fc", fontWeight: 500 }}>Image Resizer</span>
            </nav>
            <Link
              href="/tools"
              className="hover:opacity-80 transition-opacity"
              style={{
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(226,232,240,0.35)",
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
                background: "rgba(192,132,252,0.1)",
                color: "#c084fc",
                border: "1px solid rgba(192,132,252,0.2)",
              }}
            >
              🖼️ IMAGE &amp; MEDIA
            </div>
            <h1
              className="font-semibold tracking-tight leading-tight mb-2.5"
              style={{ fontSize: "clamp(26px,4vw,34px)", color: "#e2e8f0" }}
            >
              Image Resizer
            </h1>
            <p style={{ fontSize: "13.5px", color: "rgba(226,232,240,0.4)", lineHeight: 1.65 }}>
              Resize images to any dimension or social media preset — directly in your browser.
              No upload, no account, no data ever leaves your device.
            </p>
          </div>

          <ImageResizer />
        </main>

        <div style={{ borderTop: "1px solid rgba(192,132,252,0.06)" }}>
          <div className="max-w-3xl mx-auto px-6 py-20 space-y-20">

            <section>
              <h2
                className="font-semibold tracking-tight mb-2"
                style={{ fontSize: "21px", color: "#e2e8f0" }}
              >
                Social Media Image Size Guide
              </h2>
              <p
                className="mb-6"
                style={{ fontSize: "13.5px", color: "rgba(226,232,240,0.4)", lineHeight: 1.7 }}
              >
                Recommended pixel dimensions for all major platforms (2025).
              </p>
              <div
                className="rounded-[16px] overflow-hidden"
                style={{ boxShadow: "0 0 0 1px rgba(192,132,252,0.1)" }}
              >
                <table className="w-full text-left" style={{ background: "#1e1a2b" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(192,132,252,0.08)" }}>
                      {["Platform", "Dimensions", "Ratio", "Notes"].map((h) => (
                        <th
                          key={h}
                          className="px-5 py-3.5"
                          style={{
                            fontSize: "9px",
                            fontWeight: 600,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: "rgba(226,232,240,0.35)",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {SIZE_GUIDE.map(({ platform, size, ratio, notes }, i) => (
                      <tr
                        key={platform}
                        style={{
                          borderBottom:
                            i < SIZE_GUIDE.length - 1
                              ? "1px solid rgba(192,132,252,0.04)"
                              : "none",
                        }}
                      >
                        <td
                          className="px-5 py-3.5 font-medium"
                          style={{ fontSize: "13px", color: "#e2e8f0" }}
                        >
                          {platform}
                        </td>
                        <td
                          className="px-5 py-3.5 font-mono"
                          style={{ fontSize: "12.5px", color: "#c084fc" }}
                        >
                          {size}
                        </td>
                        <td
                          className="px-5 py-3.5 font-mono"
                          style={{ fontSize: "12px", color: "rgba(226,232,240,0.45)" }}
                        >
                          {ratio}
                        </td>
                        <td
                          className="px-5 py-3.5"
                          style={{
                            fontSize: "12px",
                            color: "rgba(226,232,240,0.35)",
                            lineHeight: 1.5,
                          }}
                        >
                          {notes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2
                className="font-semibold tracking-tight mb-6"
                style={{ fontSize: "21px", color: "#e2e8f0" }}
              >
                Frequently Asked Questions
              </h2>
              <div
                className="space-y-px rounded-[16px] overflow-hidden"
                style={{ boxShadow: "0 0 0 1px rgba(192,132,252,0.08)" }}
              >
                {FAQS.map(({ q, a }, i) => (
                  <div
                    key={i}
                    className="px-6 py-5"
                    style={{
                      background: "#1e1a2b",
                      borderBottom:
                        i < FAQS.length - 1
                          ? "1px solid rgba(192,132,252,0.04)"
                          : "none",
                    }}
                  >
                    <p
                      className="font-medium mb-2"
                      style={{ fontSize: "14px", color: "#e2e8f0" }}
                    >
                      {q}
                    </p>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "rgba(226,232,240,0.45)",
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
                background: "#1e1a2b",
                boxShadow: "0 0 0 1px rgba(192,132,252,0.1)",
              }}
            >
              <p
                className="font-semibold tracking-tight mb-2"
                style={{ fontSize: "19px", color: "#e2e8f0" }}
              >
                More free tools
              </p>
              <p
                className="mb-6"
                style={{ fontSize: "13px", color: "rgba(226,232,240,0.35)", lineHeight: 1.7 }}
              >
                Password generator, unit converter, JSON formatter — all free, all in your browser.
              </p>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] font-medium transition-opacity hover:opacity-80"
                style={{ background: "#c084fc", color: "#181520", fontSize: "13px" }}
              >
                Browse all tools
              </Link>
            </section>

            <div className="pb-4">
              <Link
                href="/tools"
                className="inline-flex items-center gap-2.5 hover:opacity-70 transition-opacity"
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(226,232,240,0.3)",
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
