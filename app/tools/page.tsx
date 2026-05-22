import type { Metadata } from "next";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { tools } from "../../data/tools";
import ToolsGrid from "./ToolsGrid";

export const metadata: Metadata = {
  title: "Free Online Tools — 36 Browser-Based Utilities",
  description:
    "36 free browser-based tools — word counter, JSON formatter, QR code generator, image compressor, regex tester, Pomodoro timer, invoice generator, and more. No login. No ads. Nothing sent to any server.",
  keywords: [
    "free online tools",
    "browser tools",
    "web utilities",
    "free developer tools",
    "word counter",
    "JSON formatter",
    "QR code generator",
    "image compressor",
    "regex tester",
    "password generator",
    "Pomodoro timer",
    "base64 encoder",
    "invoice generator",
    "resume builder",
    "markdown preview",
    "color picker",
    "unit converter",
    "cron builder",
    "n8n workflow validator",
    "JWT decoder",
    "free productivity tools",
    "free tools no login",
  ],
  alternates: { canonical: "https://mohdsakib.vercel.app/tools" },
  openGraph: {
    title: "36 Free Online Tools — No Login, No Ads",
    description:
      "Word counter, JSON formatter, QR generator, image compressor, Pomodoro timer, invoice generator and 30 more — all free, all in your browser.",
    url: "https://mohdsakib.vercel.app/tools",
    type: "website",
  },
};

const HOST = "https://mohdsakib.vercel.app";

const liveTools = tools.filter((t) => t.status === "live");

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${HOST}/tools`,
  name: "Free Online Tools by Mohd Sakib",
  description:
    "36 free browser-based utilities — word counter, JSON formatter, QR code generator, image compressor, regex tester, and more.",
  url: `${HOST}/tools`,
  author: { "@type": "Person", name: "Mohd Sakib", url: HOST },
  hasPart: liveTools.map((t) => ({
    "@type": "WebApplication",
    name: t.name,
    description: t.description,
    url: `${HOST}/tools/${t.id}`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  })),
};

export default function ToolsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="pt-40 pb-12 px-6 md:px-16 max-w-6xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-400 font-medium mb-5">
            Free · No login · No ads
          </p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-black leading-none mb-5">
            Free Tools.
          </h1>
          <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
            {tools.length} utilities that run entirely in your browser. Nothing
            is sent anywhere.
          </p>
        </section>

        {/* Search + Bento grid (client component) */}
        <ToolsGrid />

        {/* Suggest strip */}
        <div className="border-t border-neutral-100 px-6 md:px-16 max-w-6xl mx-auto py-14 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <p className="text-sm font-semibold text-black mb-1">
              Got a tool idea?
            </p>
            <p className="text-[12px] text-neutral-400">
              Suggest it and I&apos;ll add it to the roadmap.
            </p>
          </div>
          <a
            href="mailto:mohdsakib.work@gmail.com"
            className="shrink-0 px-6 py-3 bg-black text-white text-label uppercase tracking-[0.15em] font-medium hover:bg-neutral-800 transition-colors duration-200"
          >
            Suggest a tool
          </a>
        </div>

        {/* Back */}
        <div className="border-t border-neutral-100 px-6 md:px-16 py-8 max-w-6xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-label uppercase tracking-[0.2em] text-neutral-400 hover:text-black transition-colors duration-300 group"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            Back to portfolio
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
