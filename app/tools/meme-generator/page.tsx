import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import MemeGenerator from "./MemeGenerator";

export const metadata: Metadata = {
  title: "Free Meme Generator — Create Memes Online with Custom Text",
  description:
    "Create hilarious memes in seconds. Pick a popular template or upload your own image, add top and bottom text, customize font size and color, then download as PNG. 100% free, no login.",
  keywords: [
    "meme generator", "meme maker online", "create memes free", "meme template maker",
    "add text to image", "meme creator", "free meme generator", "custom meme maker",
    "meme generator no watermark", "online meme editor",
  ],
  alternates: { canonical: "https://mohdsakib.vercel.app/tools/meme-generator" },
  openGraph: {
    title: "Free Meme Generator — Create Memes Online with Custom Text",
    description: "Pick a template, add your text, download your meme. No watermarks, no login, no nonsense.",
    url: "https://mohdsakib.vercel.app/tools/meme-generator",
    type: "website",
  },
};

const TIPS = [
  { icon: "✍️", title: "Keep It Short",        desc: "The best meme text is punchy. Six words or fewer per line lands harder than a full sentence." },
  { icon: "🎨", title: "Use Impact Font",       desc: "Impact with a black outline is the classic meme look. It stays readable on any background." },
  { icon: "🔡", title: "ALL CAPS Hits Harder",  desc: "Capitalize everything for dramatic effect — the internet has accepted this as meme law." },
  { icon: "🖼️", title: "Match the Template",   desc: "Know your meme. The text should connect to the original context for the joke to land." },
  { icon: "⚖️", title: "Rule of Contrast",      desc: "Light text on dark images, dark text on light. The outline toggle handles most cases for you." },
  { icon: "📱", title: "Think in Squares",      desc: "Most memes go to Instagram or Twitter. A near-square canvas ratio compresses and previews best." },
];

const FAQS = [
  {
    q: "Is the meme generator completely free?",
    a: "Yes — 100% free with no watermarks, no account required, and no limits. Everything runs in your browser using the HTML5 Canvas API.",
  },
  {
    q: "How do I add text to a meme?",
    a: "Select a template or upload your own image. Type your top and bottom text in the text fields on the left. The canvas preview updates live as you type. Adjust font size, font family, and color using the style controls.",
  },
  {
    q: "What fonts can I use for meme text?",
    a: "The generator supports three fonts: Impact (classic meme style), Arial (clean and modern), and Comic Sans MS (ironic and expressive). Impact with the black outline option enabled produces the most traditional meme look.",
  },
  {
    q: "Are there any copyright issues with the meme templates?",
    a: "The template thumbnails use placeholder images from picsum.photos. For viral meme formats (Distracted Boyfriend, Drake, etc.), the underlying photos are often copyrighted. Memes created for personal, non-commercial, or commentary purposes generally fall under fair use in most jurisdictions — but always check local laws if you plan to use memes commercially.",
  },
  {
    q: "Can I upload my own photo instead of using a template?",
    a: "Absolutely. Click the 'Upload image' button and select any JPG, PNG, WebP, or GIF file from your device. The canvas resizes to match your image's aspect ratio and your uploaded image never leaves your browser.",
  },
  {
    q: "How do I download the finished meme?",
    a: "Click the 'Download Meme' button after adding your text. The canvas is exported as a PNG file using canvas.toDataURL() and saved directly to your device. No server is involved at any point.",
  },
];

export default function MemeGeneratorPage() {
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

      <div className="min-h-screen" style={{ background: "#1a0533" }}>
        <header
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
          style={{ background: "rgba(26,5,51,0.92)", borderBottom: "1px solid rgba(250,204,21,0.12)" }}
        >
          <div className="max-w-3xl mx-auto px-6 h-13 flex items-center justify-between">
            <nav className="flex items-center gap-1.5" style={{ fontSize: "12px", color: "rgba(250,204,21,0.45)" }}>
              <Link href="/" className="font-medium transition-colors hover:text-[#facc15]" style={{ color: "inherit" }}>
                Sakib
              </Link>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
              <Link href="/tools" className="transition-colors hover:text-[#facc15]" style={{ color: "inherit" }}>
                Tools
              </Link>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
              <span style={{ color: "#facc15", fontWeight: 600 }}>Meme Generator</span>
            </nav>
            <Link
              href="/tools"
              className="hover:opacity-80 transition-opacity"
              style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(250,204,21,0.45)" }}
            >
              All tools
            </Link>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-6 pt-24 pb-20">
          <div className="mb-8">
            <div
              className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest"
              style={{ background: "rgba(250,204,21,0.1)", color: "#facc15", border: "1px solid rgba(250,204,21,0.25)" }}
            >
              😂 IMAGE & MEDIA
            </div>
            <h1
              className="font-black tracking-tight leading-tight mb-3"
              style={{ fontSize: "clamp(28px,5vw,40px)", color: "#fafafa" }}
            >
              Meme Generator
            </h1>
            <p style={{ fontSize: "14px", color: "rgba(250,250,250,0.5)", lineHeight: 1.7 }}>
              Pick a meme template or upload your own image. Add top and bottom text, tweak the font, pick a color, and download your creation as PNG — all in your browser.
            </p>
          </div>

          <MemeGenerator />
        </main>

        <div style={{ borderTop: "1px solid rgba(250,204,21,0.08)" }}>
          <div className="max-w-3xl mx-auto px-6 py-20 space-y-20">

            <section>
              <h2 className="font-bold tracking-tight mb-6" style={{ fontSize: "21px", color: "#fafafa" }}>
                Tips for Making Great Memes
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TIPS.map(({ icon, title, desc }) => (
                  <div
                    key={title}
                    className="rounded-[14px] p-5"
                    style={{ background: "#250840", border: "1px solid rgba(250,204,21,0.12)" }}
                  >
                    <p className="font-bold mb-1.5" style={{ fontSize: "13.5px", color: "#fafafa" }}>
                      {icon} {title}
                    </p>
                    <p style={{ fontSize: "12.5px", color: "rgba(250,250,250,0.45)", lineHeight: 1.7 }}>{desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-bold tracking-tight mb-6" style={{ fontSize: "21px", color: "#fafafa" }}>
                Frequently Asked Questions
              </h2>
              <div className="space-y-px rounded-[16px] overflow-hidden" style={{ boxShadow: "0 0 0 1px rgba(250,204,21,0.1)" }}>
                {FAQS.map(({ q, a }, i) => (
                  <div
                    key={i}
                    className="px-6 py-5"
                    style={{
                      background: "#250840",
                      borderBottom: i < FAQS.length - 1 ? "1px solid rgba(250,204,21,0.07)" : "none",
                    }}
                  >
                    <p className="font-semibold mb-2" style={{ fontSize: "14px", color: "#fafafa" }}>{q}</p>
                    <p style={{ fontSize: "13px", color: "rgba(250,250,250,0.45)", lineHeight: 1.75 }}>{a}</p>
                  </div>
                ))}
              </div>
            </section>

            <section
              className="rounded-[20px] px-8 py-10 text-center"
              style={{
                background: "linear-gradient(135deg, #2d0a52 0%, #1a0533 50%, #2d0a52 100%)",
                boxShadow: "0 0 0 1px rgba(250,204,21,0.2), 0 8px 40px rgba(250,204,21,0.08)",
              }}
            >
              <p className="font-black tracking-tight mb-2" style={{ fontSize: "20px", color: "#facc15" }}>
                More free tools
              </p>
              <p className="mb-6" style={{ fontSize: "13px", color: "rgba(250,250,250,0.45)", lineHeight: 1.7 }}>
                QR code generator, image compressor, password generator and dozens more — all free, all in your browser.
              </p>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] font-bold transition-opacity hover:opacity-85"
                style={{ background: "linear-gradient(135deg, #facc15, #f97316)", color: "#1a0533", fontSize: "13px" }}
              >
                Browse all tools
              </Link>
            </section>

            <div className="pb-4">
              <Link
                href="/tools"
                className="inline-flex items-center gap-2.5 hover:opacity-70 transition-opacity"
                style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(250,204,21,0.35)" }}
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
