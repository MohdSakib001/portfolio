import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import AspectRatioCalculator from "./AspectRatioCalculator";

export const metadata: Metadata = {
  title: "Free Aspect Ratio Calculator — Calculate, Scale & Compare Ratios",
  description:
    "Calculate simplified aspect ratios from pixel dimensions, scale one side from a known ratio, or compare two resolutions. Supports 16:9, 4:3, 1:1, 21:9 and more. Free, instant, no sign-up.",
  keywords: [
    "aspect ratio calculator",
    "calculate aspect ratio",
    "16:9 aspect ratio",
    "resize image aspect ratio",
    "scale resolution",
    "aspect ratio converter",
    "video aspect ratio",
    "screen resolution ratio",
    "compare aspect ratios",
    "image ratio calculator",
  ],
  alternates: { canonical: "https://mohdsakib.vercel.app/tools/aspect-ratio-calculator" },
  openGraph: {
    title: "Free Aspect Ratio Calculator — Calculate, Scale & Compare",
    description:
      "Three modes: calculate a ratio from dimensions, scale a side from a known ratio, or compare two resolutions. Instant results for video, design, and photography.",
    url: "https://mohdsakib.vercel.app/tools/aspect-ratio-calculator",
    type: "website",
  },
};

const FAQS = [
  {
    q: "What is an aspect ratio?",
    a: "An aspect ratio is the proportional relationship between a rectangle's width and height, expressed as two numbers separated by a colon (e.g. 16:9). It describes shape, not size — a 1920×1080 monitor and a 640×360 video window share the same 16:9 ratio.",
  },
  {
    q: "Why is 16:9 the standard for video?",
    a: "The 16:9 ratio was chosen as the HDTV standard in the 1980s because it is a geometric compromise between the 4:3 TV format and the wider cinema formats. It matches the natural field of view of human peripheral vision and allows widescreen films to be displayed with minimal letterboxing.",
  },
  {
    q: "How do I calculate an aspect ratio from pixel dimensions?",
    a: "Divide both the width and height by their Greatest Common Divisor (GCD). For 1920×1080: GCD(1920,1080) = 120, so 1920÷120 = 16 and 1080÷120 = 9, giving 16:9. The 'Calculate Ratio' mode does this automatically.",
  },
  {
    q: "What aspect ratios do social media platforms use?",
    a: "Instagram square posts use 1:1, portrait posts and Stories use 9:16 (4:5 for feed portraits). Twitter/X headers are 3:1, profile banners 16:9. YouTube thumbnails are 16:9. Facebook covers are 2.7:1 (roughly). LinkedIn banners are approximately 4:1.",
  },
  {
    q: "How do I scale a resolution while keeping the aspect ratio?",
    a: "Use the 'Scale from Ratio' mode. Enter the ratio (e.g. 16:9) then provide either the target width or height — the calculator solves the missing dimension. Manually: if you know the width, height = width × (ratio height ÷ ratio width). For 16:9 at 1280px wide: height = 1280 × (9÷16) = 720px.",
  },
  {
    q: "What is the difference between 16:9 and 16:10?",
    a: "16:10 (also written 8:5) is slightly taller than 16:9, with a decimal value of 1.600 vs 1.778. It was common on older widescreen laptops and designers prefer it for extra vertical workspace. 16:9 became dominant when television and consumer electronics standardised on HD resolutions like 1280×720 and 1920×1080.",
  },
];

export default function AspectRatioCalculatorPage() {
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

      <div className="min-h-screen" style={{ background: "#f7f4ee" }}>
        <header
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
          style={{ background: "rgba(247,244,238,0.92)", borderBottom: "1px solid rgba(17,17,17,0.08)" }}
        >
          <div className="max-w-3xl mx-auto px-6 h-13 flex items-center justify-between">
            <nav
              className="flex items-center gap-1.5"
              style={{ color: "rgba(17,17,17,0.4)", fontSize: "12px" }}
            >
              <Link
                href="/"
                className="font-medium hover:text-[#111111] transition-colors"
                style={{ color: "inherit" }}
              >
                Sakib
              </Link>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
              <Link
                href="/tools"
                className="hover:text-[#111111] transition-colors"
                style={{ color: "inherit" }}
              >
                Tools
              </Link>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
              <span style={{ color: "#111111", fontWeight: 700 }}>Aspect Ratio Calculator</span>
            </nav>
            <Link
              href="/tools"
              className="hover:opacity-80 transition-opacity"
              style={{
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(17,17,17,0.4)",
              }}
            >
              All tools
            </Link>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-6 pt-24 pb-20">
          <div className="mb-8">
            <div
              className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 text-[10px] font-bold"
              style={{ background: "#dc2626", color: "#ffffff", borderRadius: "0" }}
            >
              📐 PRODUCTIVITY
            </div>
            <h1
              className="font-bold tracking-tight leading-tight mb-2.5"
              style={{
                fontSize: "clamp(28px,5vw,40px)",
                color: "#111111",
                letterSpacing: "-0.02em",
              }}
            >
              Aspect Ratio Calculator
            </h1>
            <p style={{ fontSize: "13.5px", color: "rgba(17,17,17,0.5)", lineHeight: 1.65 }}>
              Calculate, scale, or compare aspect ratios — three modes, instant live preview.
            </p>
          </div>

          <AspectRatioCalculator />
        </main>

        <div style={{ borderTop: "3px solid #111111" }}>
          <div className="max-w-3xl mx-auto px-6 py-20 space-y-20">

            <section>
              <h2
                className="font-bold tracking-tight mb-4"
                style={{ fontSize: "22px", color: "#111111" }}
              >
                About Aspect Ratios
              </h2>
              <p style={{ fontSize: "14px", color: "rgba(17,17,17,0.6)", lineHeight: 1.85, marginBottom: "16px" }}>
                An aspect ratio defines the proportional relationship between a rectangle's width and
                height. It appears everywhere in modern media: the 16:9 standard governs YouTube
                videos, HD monitors, and smartphone screens in landscape mode; 4:3 remains common in
                older displays and photography; 1:1 is the square format Instagram popularised; and
                cinema-scope formats such as 21:9 deliver immersive widescreen experiences.
              </p>
              <p style={{ fontSize: "14px", color: "rgba(17,17,17,0.6)", lineHeight: 1.85, marginBottom: "16px" }}>
                In graphic design and photography, choosing the right ratio affects composition,
                print dimensions, and platform compatibility. When resizing images or video frames,
                maintaining the original ratio prevents distortion. This tool lets you calculate the
                simplified ratio from any pixel dimensions, find the missing dimension when scaling,
                and instantly check whether two different resolutions share the same proportions.
              </p>
              <p style={{ fontSize: "14px", color: "rgba(17,17,17,0.6)", lineHeight: 1.85 }}>
                The calculation uses the Euclidean GCD algorithm to reduce any pair of integers to
                their smallest equivalent form, so 1920×1080 correctly simplifies to 16:9 rather
                than displaying the raw pixel values.
              </p>
            </section>

            <section>
              <h2
                className="font-bold tracking-tight mb-6"
                style={{ fontSize: "22px", color: "#111111" }}
              >
                Frequently Asked Questions
              </h2>
              <div
                className="overflow-hidden"
                style={{ border: "3px solid #111111" }}
              >
                {FAQS.map(({ q, a }, i) => (
                  <div
                    key={i}
                    className="px-6 py-5"
                    style={{
                      background: "#ffffff",
                      borderBottom:
                        i < FAQS.length - 1 ? "1px solid rgba(17,17,17,0.1)" : "none",
                    }}
                  >
                    <p
                      className="font-bold mb-2"
                      style={{ fontSize: "14px", color: "#111111" }}
                    >
                      {q}
                    </p>
                    <p style={{ fontSize: "13px", color: "rgba(17,17,17,0.55)", lineHeight: 1.75 }}>
                      {a}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section
              className="px-8 py-10 text-center"
              style={{ background: "#111111" }}
            >
              <p
                className="font-bold tracking-tight mb-2"
                style={{ fontSize: "20px", color: "#dc2626" }}
              >
                More free tools
              </p>
              <p
                className="mb-6"
                style={{ fontSize: "13px", color: "rgba(220,38,38,0.55)", lineHeight: 1.7 }}
              >
                Percentage, BMI, mortgage, tip calculators and dozens more — all free, all in your
                browser.
              </p>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 px-6 py-3 font-bold transition-opacity hover:opacity-85"
                style={{
                  background: "#dc2626",
                  color: "#ffffff",
                  fontSize: "13px",
                  borderRadius: "0",
                }}
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
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(17,17,17,0.35)",
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
