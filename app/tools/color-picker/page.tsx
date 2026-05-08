import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ColorPicker from "./ColorPicker";

export const metadata: Metadata = {
  title: "Free Color Picker — HEX, RGB, HSL, CMYK Color Tool Online",
  description:
    "Pick any color and instantly get HEX, RGB, HSL, and CMYK values. Generate shades, tints, complementary, analogous and triadic palettes. Extract dominant colors from images. 100% free, browser-based.",
  keywords: [
    "color picker", "hex color picker", "rgb color picker", "hsl color converter",
    "cmyk converter", "color palette generator", "color shades generator", "complementary colors",
    "analogous colors", "triadic color scheme", "image color extractor", "web color tool",
    "online color picker", "color format converter", "design color tool",
  ],
  alternates: { canonical: "https://mohdsakib.vercel.app/tools/color-picker" },
  openGraph: {
    title: "Free Color Picker — HEX, RGB, HSL, CMYK Color Tool",
    description:
      "Instantly convert colors between HEX, RGB, HSL, and CMYK. Generate palettes and extract colors from images.",
    url: "https://mohdsakib.vercel.app/tools/color-picker",
    type: "website",
  },
};

const COLOR_FORMATS = [
  {
    name: "HEX",
    example: "#3B82F6",
    description:
      "Hexadecimal is the most common color format on the web. It encodes red, green, and blue channels as pairs of hex digits (00–FF), giving 16,777,216 possible colors. Used directly in CSS, SVG, and design tools like Figma.",
  },
  {
    name: "RGB",
    example: "rgb(59, 130, 246)",
    description:
      "RGB (Red, Green, Blue) expresses color as three integer values from 0 to 255. It maps directly to how screens emit light. CSS supports both rgb() and rgba() with an optional alpha channel for transparency.",
  },
  {
    name: "HSL",
    example: "hsl(217, 91%, 60%)",
    description:
      "HSL (Hue, Saturation, Lightness) is the most human-friendly format. Hue is a degree on the color wheel (0–360°), saturation controls intensity (0–100%), and lightness controls brightness (0% is black, 100% is white). Ideal for programmatic palette generation.",
  },
  {
    name: "CMYK",
    example: "cmyk(76%, 47%, 0%, 4%)",
    description:
      "CMYK (Cyan, Magenta, Yellow, Key/Black) is the standard for print. Unlike additive RGB, CMYK is subtractive — mixing inks absorbs light. Professional print workflows use CMYK values to match physical ink output on paper.",
  },
];

const FAQS = [
  {
    q: "What is a HEX color code and how do I read it?",
    a: "A HEX color code is a 6-digit hexadecimal string prefixed with #. The first two digits represent red intensity (00–FF), the middle two represent green, and the last two represent blue. For example, #FF0000 is pure red, #00FF00 is pure green, and #0000FF is pure blue. Short-hand 3-digit codes like #F00 expand to #FF0000.",
  },
  {
    q: "What is the difference between RGB and CMYK?",
    a: "RGB is an additive color model used by screens: mixing all channels at full intensity produces white. CMYK is a subtractive model used in print: mixing all inks at full intensity produces near-black. RGB values cannot always be reproduced exactly in CMYK print because the color gamut of print is smaller than that of a display.",
  },
  {
    q: "Why is HSL better for generating color palettes?",
    a: "HSL lets you manipulate color properties independently. To create a lighter tint, increase the lightness value. To create a shade, decrease it. To find a complementary color, add 180° to the hue. To find analogous colors, add or subtract 30°. This predictable math makes HSL ideal for programmatic palette generation, which is exactly how this tool works.",
  },
  {
    q: "What does the contrast ratio mean for accessibility?",
    a: "The contrast ratio measures how distinguishable two colors are from each other. WCAG 2.1 requires a minimum 4.5:1 ratio for normal text and 3:1 for large text to meet AA compliance. A ratio of 1:1 means identical colors (no contrast), while 21:1 is the maximum (black on white). This tool shows the contrast of your selected color against both pure white and pure black.",
  },
  {
    q: "How does the image color extractor work?",
    a: "When you upload an image, the tool draws it to a hidden HTML5 canvas element, samples pixels across a grid, and then runs a simplified k-means clustering algorithm over the sampled pixels. The algorithm groups similar colors together and computes the centroid (average color) of each cluster, producing 5 representative dominant colors from your image.",
  },
  {
    q: "What are complementary, analogous, and triadic colors?",
    a: "These are classic color harmony schemes from color theory. Complementary colors sit opposite each other on the color wheel (180° apart) and create high-contrast, vivid combinations. Analogous colors are neighbors on the wheel (±30°) and create harmonious, low-contrast schemes. Triadic colors form an equilateral triangle on the wheel (±120°) and balance contrast with variety — popular in logo and brand design.",
  },
];

export default function ColorPickerPage() {
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

      <div className="min-h-screen" style={{ background: "#fafafa" }}>
        <header
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
          style={{ background: "rgba(250,250,250,0.92)", borderBottom: "1px solid rgba(17,24,39,0.06)" }}
        >
          <div className="max-w-3xl mx-auto px-6 h-13 flex items-center justify-between">
            <nav className="flex items-center gap-1.5" style={{ color: "rgba(17,24,39,0.4)", fontSize: "12px" }}>
              <Link href="/" className="font-medium hover:text-[#111827] transition-colors" style={{ color: "inherit" }}>
                Sakib
              </Link>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
              <Link href="/tools" className="hover:text-[#111827] transition-colors" style={{ color: "inherit" }}>
                Tools
              </Link>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
              <span style={{ color: "#111827", fontWeight: 500 }}>Color Picker & Palette</span>
            </nav>
            <Link
              href="/tools"
              className="hover:opacity-80 transition-opacity"
              style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(17,24,39,0.4)" }}
            >
              All tools
            </Link>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-6 pt-24 pb-20">
          <div className="mb-8">
            <div
              className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full text-[10px] font-semibold"
              style={{ background: "#fdf4ff", color: "#9333ea", border: "1px solid #e9d5ff" }}
            >
              🎨 IMAGE & MEDIA
            </div>
            <h1
              className="font-semibold tracking-tight leading-tight mb-2.5"
              style={{ fontSize: "clamp(26px,4vw,34px)", color: "#111827" }}
            >
              Color Picker & Palette
            </h1>
            <p style={{ fontSize: "13.5px", color: "rgba(17,24,39,0.45)", lineHeight: 1.65 }}>
              Pick any color — get HEX, RGB, HSL, CMYK values instantly. Generate palettes, explore color harmonies, and extract dominant colors from images.
            </p>
          </div>

          <ColorPicker />
        </main>

        <div style={{ borderTop: "1px solid rgba(17,24,39,0.06)" }}>
          <div className="max-w-3xl mx-auto px-6 py-20 space-y-20">

            <section>
              <h2 className="font-semibold tracking-tight mb-2" style={{ fontSize: "21px", color: "#111827" }}>
                Understanding Color Formats
              </h2>
              <p className="mb-8" style={{ fontSize: "13.5px", color: "rgba(17,24,39,0.5)", lineHeight: 1.7 }}>
                Each color format is designed for a different purpose — screen rendering, design systems, or professional printing.
              </p>
              <div className="space-y-3">
                {COLOR_FORMATS.map(({ name, example, description }) => (
                  <div
                    key={name}
                    className="rounded-[16px] p-5"
                    style={{ background: "#ffffff", boxShadow: "0 0 0 1px rgba(17,24,39,0.06)" }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="px-2.5 py-1 rounded-[7px] font-bold"
                        style={{ background: "rgba(17,24,39,0.05)", color: "#111827", fontSize: "11px", letterSpacing: "0.06em" }}
                      >
                        {name}
                      </span>
                      <code style={{ fontSize: "12px", fontFamily: "monospace", color: "#9333ea" }}>{example}</code>
                    </div>
                    <p style={{ fontSize: "13px", color: "rgba(17,24,39,0.5)", lineHeight: 1.75 }}>{description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-semibold tracking-tight mb-6" style={{ fontSize: "21px", color: "#111827" }}>
                Frequently Asked Questions
              </h2>
              <div className="space-y-px rounded-[16px] overflow-hidden" style={{ boxShadow: "0 0 0 1px rgba(17,24,39,0.06)" }}>
                {FAQS.map(({ q, a }, i) => (
                  <div
                    key={i}
                    className="px-6 py-5"
                    style={{
                      background: "#ffffff",
                      borderBottom: i < FAQS.length - 1 ? "1px solid rgba(17,24,39,0.05)" : "none",
                    }}
                  >
                    <p className="font-medium mb-2" style={{ fontSize: "14px", color: "#111827" }}>{q}</p>
                    <p style={{ fontSize: "13px", color: "rgba(17,24,39,0.5)", lineHeight: 1.75 }}>{a}</p>
                  </div>
                ))}
              </div>
            </section>

            <section
              className="rounded-[20px] px-8 py-10 text-center"
              style={{ background: "#ffffff", boxShadow: "0 0 0 1px rgba(17,24,39,0.06), 0 4px 24px rgba(17,24,39,0.05)" }}
            >
              <p className="font-semibold tracking-tight mb-2" style={{ fontSize: "19px", color: "#111827" }}>
                More free tools
              </p>
              <p className="mb-6" style={{ fontSize: "13px", color: "rgba(17,24,39,0.45)", lineHeight: 1.7 }}>
                Color contrast checker, JWT decoder, regex tester — all free, all in your browser.
              </p>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] font-medium transition-opacity hover:opacity-80"
                style={{ background: "#111827", color: "#fafafa", fontSize: "13px" }}
              >
                Browse all tools
              </Link>
            </section>

            <div className="pb-4">
              <Link
                href="/tools"
                className="inline-flex items-center gap-2.5 hover:opacity-70 transition-opacity"
                style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(17,24,39,0.35)" }}
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
