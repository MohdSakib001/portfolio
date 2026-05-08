import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ImageCompressor from "./ImageCompressor";

export const metadata: Metadata = {
  title: "Free Image Compressor — Compress JPG, PNG, WebP Online (No Upload)",
  description:
    "Compress JPG, PNG, WebP, and GIF images directly in your browser. No files are uploaded to any server — 100% private, instant, and free.",
  keywords: [
    "image compressor", "compress image online", "image compression tool", "compress jpg online",
    "compress png online", "compress webp", "reduce image size", "image optimizer",
    "free image compressor", "no upload image compressor", "browser image compression",
    "lossy compression", "lossless image", "reduce file size",
  ],
  alternates: { canonical: "https://mohdsakib.vercel.app/tools/image-compressor" },
  openGraph: {
    title: "Free Image Compressor — Compress JPG, PNG, WebP Online (No Upload)",
    description: "Compress images in your browser instantly. Choose quality, pick output format, and download — your files never leave your device.",
    url: "https://mohdsakib.vercel.app/tools/image-compressor",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Does this tool upload my images to a server?",
    a: "No. All compression happens entirely inside your browser using the Canvas API. Your images are never sent to any server, making this tool completely private and safe for sensitive or personal photos.",
  },
  {
    q: "What image formats are supported?",
    a: "You can upload JPG, PNG, WebP, and GIF images. You can also choose the output format — JPEG, PNG, or WebP — independently of the input. Converting a PNG to JPEG, for example, often gives the most dramatic file size reduction.",
  },
  {
    q: "What does the quality slider do?",
    a: "The quality slider (1–100) controls the lossy compression level applied by the Canvas API's toBlob method. A quality of 80 is generally a sweet spot — visually nearly identical to the original while reducing file size by 60–85% for JPEG output. PNG uses lossless compression so the slider has less effect on PNG output.",
  },
  {
    q: "Why is WebP often the best output format for the web?",
    a: "WebP is a modern image format developed by Google that achieves 25–35% smaller file sizes compared to JPEG at equivalent visual quality, and supports transparency like PNG. It is supported by all modern browsers and is the recommended format for web images when file size matters.",
  },
  {
    q: "How does image compression affect web performance?",
    a: "Images are typically the largest assets on a webpage. Reducing image sizes directly improves page load time, Core Web Vitals scores (especially Largest Contentful Paint), and bandwidth usage — which is especially impactful for users on mobile networks.",
  },
  {
    q: "Can I compress multiple images at once?",
    a: "Yes. You can upload up to 5 images at a time. The 'Compress All' button processes them sequentially in your browser. The 'Download All' button then triggers individual downloads for each compressed file.",
  },
];

export default function ImageCompressorPage() {
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

      <div className="min-h-screen" style={{ background: "#f0f7ff" }}>
        <header
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
          style={{ background: "rgba(240,247,255,0.92)", borderBottom: "1px solid rgba(37,99,235,0.08)" }}
        >
          <div className="max-w-3xl mx-auto px-6 h-13 flex items-center justify-between">
            <nav
              className="flex items-center gap-1.5"
              style={{ color: "rgba(30,58,95,0.45)", fontSize: "12px" }}
            >
              <Link
                href="/"
                className="font-medium hover:text-blue-700 transition-colors"
                style={{ color: "inherit" }}
              >
                Sakib
              </Link>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
              <Link
                href="/tools"
                className="hover:text-blue-700 transition-colors"
                style={{ color: "inherit" }}
              >
                Tools
              </Link>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
              <span style={{ color: "#2563eb", fontWeight: 500 }}>Image Compressor</span>
            </nav>
            <Link
              href="/tools"
              className="hover:opacity-80 transition-opacity"
              style={{
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(30,58,95,0.35)",
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
                background: "rgba(37,99,235,0.08)",
                color: "#2563eb",
                border: "1px solid rgba(37,99,235,0.18)",
              }}
            >
              🖼️ IMAGE &amp; MEDIA
            </div>
            <h1
              className="font-semibold tracking-tight leading-tight mb-2.5"
              style={{ fontSize: "clamp(26px,4vw,34px)", color: "#1e3a5f" }}
            >
              Image Compressor
            </h1>
            <p style={{ fontSize: "13.5px", color: "rgba(30,58,95,0.55)", lineHeight: 1.65 }}>
              Compress JPG, PNG, WebP, and GIF images instantly — no upload, no server, 100% private.
              All processing happens in your browser using the Canvas API.
            </p>
          </div>

          <ImageCompressor />
        </main>

        <div style={{ borderTop: "1px solid rgba(37,99,235,0.08)" }}>
          <div className="max-w-3xl mx-auto px-6 py-20 space-y-20">

            <section>
              <h2
                className="font-semibold tracking-tight mb-4"
                style={{ fontSize: "21px", color: "#1e3a5f" }}
              >
                How Image Compression Works
              </h2>
              <p style={{ fontSize: "14px", color: "rgba(30,58,95,0.55)", lineHeight: 1.85 }}>
                This tool uses the browser's built-in Canvas API to redraw each image onto an
                off-screen canvas and then export it at the quality level you specify via
                <code style={{ background: "#dbeafe", padding: "1px 5px", borderRadius: "4px", fontSize: "12px", color: "#1d4ed8" }}> canvas.toBlob()</code>.
                Lossy formats like JPEG and WebP discard imperceptible detail to achieve dramatic
                file size reductions — often 60–85% smaller — while PNG uses lossless compression
                that preserves every pixel.
              </p>
              <p className="mt-4" style={{ fontSize: "14px", color: "rgba(30,58,95,0.55)", lineHeight: 1.85 }}>
                Because all processing runs client-side (in your browser's JavaScript engine), your
                images are never transmitted to any external server. This makes the tool safe for
                confidential, personal, or proprietary images. There are no file-size caps, no sign-up
                requirements, and no watermarks.
              </p>
            </section>

            <section>
              <h2
                className="font-semibold tracking-tight mb-4"
                style={{ fontSize: "21px", color: "#1e3a5f" }}
              >
                Choosing the Right Format
              </h2>
              <div
                className="rounded-[16px] overflow-hidden"
                style={{ boxShadow: "0 0 0 1px rgba(37,99,235,0.1)" }}
              >
                <table className="w-full text-left" style={{ background: "#ffffff" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(37,99,235,0.08)" }}>
                      {["Format", "Best for", "Transparency", "Typical saving"].map((h) => (
                        <th
                          key={h}
                          className="px-5 py-3.5"
                          style={{
                            fontSize: "9px",
                            fontWeight: 600,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: "rgba(30,58,95,0.4)",
                            background: "#f0f7ff",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { fmt: "JPEG", best: "Photos, gradients", alpha: "No", saving: "60–85%" },
                      { fmt: "PNG", best: "Screenshots, logos", alpha: "Yes", saving: "10–30%" },
                      { fmt: "WebP", best: "Web images (all types)", alpha: "Yes", saving: "25–80%" },
                    ].map(({ fmt, best, alpha, saving }, i) => (
                      <tr
                        key={fmt}
                        style={{
                          borderBottom:
                            i < 2 ? "1px solid rgba(37,99,235,0.05)" : "none",
                        }}
                      >
                        <td
                          className="px-5 py-3.5 font-mono font-bold"
                          style={{ fontSize: "13px", color: "#2563eb" }}
                        >
                          {fmt}
                        </td>
                        <td className="px-5 py-3.5" style={{ fontSize: "13px", color: "#1e3a5f" }}>{best}</td>
                        <td className="px-5 py-3.5" style={{ fontSize: "13px", color: alpha === "Yes" ? "#16a34a" : "#94a3b8" }}>{alpha}</td>
                        <td
                          className="px-5 py-3.5 font-semibold"
                          style={{ fontSize: "13px", color: "#16a34a" }}
                        >
                          {saving}
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
                style={{ fontSize: "21px", color: "#1e3a5f" }}
              >
                Frequently Asked Questions
              </h2>
              <div
                className="space-y-px rounded-[16px] overflow-hidden"
                style={{ boxShadow: "0 0 0 1px rgba(37,99,235,0.1)" }}
              >
                {FAQS.map(({ q, a }, i) => (
                  <div
                    key={i}
                    className="px-6 py-5"
                    style={{
                      background: "#ffffff",
                      borderBottom:
                        i < FAQS.length - 1
                          ? "1px solid rgba(37,99,235,0.05)"
                          : "none",
                    }}
                  >
                    <p
                      className="font-medium mb-2"
                      style={{ fontSize: "14px", color: "#1e3a5f" }}
                    >
                      {q}
                    </p>
                    <p style={{ fontSize: "13px", color: "rgba(30,58,95,0.55)", lineHeight: 1.75 }}>
                      {a}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section
              className="rounded-[20px] px-8 py-10 text-center"
              style={{
                background: "#ffffff",
                boxShadow: "0 0 0 1px rgba(37,99,235,0.1)",
              }}
            >
              <p
                className="font-semibold tracking-tight mb-2"
                style={{ fontSize: "19px", color: "#1e3a5f" }}
              >
                More free tools
              </p>
              <p
                className="mb-6"
                style={{ fontSize: "13px", color: "rgba(30,58,95,0.4)", lineHeight: 1.7 }}
              >
                QR code generator, JSON formatter, Base64 encoder — all free, all in your browser.
              </p>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] font-medium transition-opacity hover:opacity-80"
                style={{ background: "#2563eb", color: "#ffffff", fontSize: "13px" }}
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
                  color: "rgba(30,58,95,0.35)",
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
