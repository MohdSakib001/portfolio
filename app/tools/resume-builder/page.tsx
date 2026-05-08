import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ResumeBuilder from "./ResumeBuilder";

export const metadata: Metadata = {
  title: "Free Resume Builder — Create a Professional CV Online & Download PDF",
  description:
    "Build a professional resume or CV online for free. Fill in your experience, education, and skills with a live preview. Download as PDF instantly — no sign-up, no watermark, ATS-friendly.",
  keywords: [
    "resume builder",
    "free resume builder",
    "CV builder online",
    "professional resume maker",
    "resume template",
    "ATS resume builder",
    "resume generator",
    "create resume online",
    "download resume PDF",
    "free CV maker",
    "resume creator",
    "job application resume",
  ],
  alternates: { canonical: "https://mohdsakib.vercel.app/tools/resume-builder" },
  openGraph: {
    title: "Free Resume Builder — Create a Professional CV Online & Download PDF",
    description:
      "Build and download a professional resume in minutes. Live preview, ATS-friendly format, no sign-up required.",
    url: "https://mohdsakib.vercel.app/tools/resume-builder",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this resume builder completely free?",
    a: "Yes, it is 100% free with no account required, no watermarks, and no usage limits. All processing happens directly in your browser — your resume data is never sent to any server. It is saved locally in your browser's localStorage so your work persists between sessions.",
  },
  {
    q: "How do I download my resume as a PDF?",
    a: "Click the 'Download PDF' button at the bottom of the form. Your browser's native print dialog will open. Select 'Save as PDF' as the destination (available in Chrome, Firefox, Safari, and Edge). The print view automatically hides the form and shows only your clean resume document.",
  },
  {
    q: "Is the resume ATS-friendly?",
    a: "Yes. The preview uses clean, semantic HTML with standard section headings (Work Experience, Education, Skills, Certifications) that Applicant Tracking Systems can parse reliably. Avoid graphics, tables for layout, or unusual fonts when targeting ATS-heavy roles — this tool's structure follows best practices for automated parsing.",
  },
  {
    q: "What sections should every resume include?",
    a: "A strong resume should always include: (1) Contact information with name, email, phone, and location; (2) A professional summary tailored to the role; (3) Work experience in reverse-chronological order with bullet points that quantify achievements; (4) Education with degree and institution; and (5) Relevant skills. Certifications are optional but valuable for technical and regulated industries.",
  },
  {
    q: "How do I write strong resume bullet points?",
    a: "Use the CAR formula: Context, Action, Result. Start each bullet with a strong action verb (Led, Designed, Reduced, Increased, Implemented) and quantify the outcome where possible. For example: 'Reduced API latency by 42% through Redis caching, improving page load time for 200,000 daily active users.' Specific numbers make your bullets far more compelling.",
  },
  {
    q: "Will my resume data be saved if I close the browser?",
    a: "Yes. The tool automatically saves your resume to your browser's localStorage as you type. When you return to the page, your data will be restored automatically. Use the 'Clear / Start Over' button only when you want to discard your current resume and begin a new one.",
  },
];

const ATS_TIPS = [
  {
    title: "Use Standard Section Headings",
    tip: "ATS systems look for keywords like 'Work Experience', 'Education', and 'Skills'. Avoid creative labels like 'My Journey' or 'What I Know'.",
  },
  {
    title: "Mirror the Job Description",
    tip: "Identify keywords in the job posting (languages, tools, soft skills) and use the exact same phrasing in your resume. ATS scores are heavily keyword-driven.",
  },
  {
    title: "Quantify Everything You Can",
    tip: "Numbers stand out both to ATS and human readers. Instead of 'improved performance', write 'reduced load time by 35%'. Use percentages, dollar amounts, and user counts.",
  },
  {
    title: "Keep Formatting Clean",
    tip: "Avoid multi-column layouts, text boxes, graphics, and tables for structure. Single-column, left-to-right text is the safest format for ATS parsing.",
  },
];

export default function ResumeBuilderPage() {
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

      <div className="min-h-screen" style={{ background: "#f8f9fa" }}>
        {/* HEADER */}
        <header
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
          style={{
            background: "rgba(248,249,250,0.93)",
            borderBottom: "1px solid rgba(15,118,110,0.1)",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 h-13 flex items-center justify-between">
            <nav
              className="flex items-center gap-1.5"
              style={{ color: "rgba(15,23,42,0.4)", fontSize: "12px" }}
            >
              <Link
                href="/"
                className="font-medium hover:text-[#0f172a] transition-colors"
                style={{ color: "inherit" }}
              >
                Sakib
              </Link>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
              <Link
                href="/tools"
                className="hover:text-[#0f172a] transition-colors"
                style={{ color: "inherit" }}
              >
                Tools
              </Link>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
              <span style={{ color: "#0f766e", fontWeight: 600 }}>Resume / CV Builder</span>
            </nav>
            <Link
              href="/tools"
              className="hover:opacity-80 transition-opacity"
              style={{
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(15,23,42,0.4)",
              }}
            >
              All tools
            </Link>
          </div>
        </header>

        {/* MAIN */}
        <main className="max-w-7xl mx-auto px-6 pt-24 pb-16">
          <div className="mb-8">
            <div
              className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full text-[10px] font-semibold"
              style={{ background: "#ccfbf1", color: "#0f766e", border: "1px solid #99f6e4" }}
            >
              💼 PRODUCTIVITY
            </div>
            <h1
              className="font-semibold tracking-tight leading-tight mb-2.5"
              style={{ fontSize: "clamp(26px,4vw,34px)", color: "#0f172a" }}
            >
              Resume / CV Builder
            </h1>
            <p style={{ fontSize: "13.5px", color: "rgba(15,23,42,0.5)", lineHeight: 1.65 }}>
              Build a professional resume with a live preview. Fill in your details, see the
              print-quality document update in real time, and download as PDF — free, no sign-up,
              nothing stored on any server.
            </p>
          </div>

          <ResumeBuilder />
        </main>

        {/* BELOW FOLD */}
        <div style={{ borderTop: "1px solid rgba(15,118,110,0.08)" }}>
          <div className="max-w-7xl mx-auto px-6 py-20 space-y-20">

            {/* ATS TIPS */}
            <section>
              <h2
                className="font-semibold tracking-tight mb-2"
                style={{ fontSize: "21px", color: "#0f172a" }}
              >
                ATS-Friendly Resume Tips
              </h2>
              <p
                className="mb-6"
                style={{ fontSize: "13.5px", color: "rgba(15,23,42,0.5)", lineHeight: 1.7 }}
              >
                Over 98% of Fortune 500 companies use Applicant Tracking Systems to screen resumes
                before a human sees them. Follow these principles to make sure yours passes.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ATS_TIPS.map(({ title, tip }) => (
                  <div
                    key={title}
                    className="rounded-[16px] p-6"
                    style={{
                      background: "#ffffff",
                      boxShadow: "0 0 0 1px rgba(15,118,110,0.1), 0 2px 12px rgba(15,118,110,0.04)",
                      borderLeft: "3px solid #0f766e",
                    }}
                  >
                    <p
                      className="font-semibold mb-2"
                      style={{ fontSize: "13.5px", color: "#0f172a" }}
                    >
                      {title}
                    </p>
                    <p style={{ fontSize: "13px", color: "rgba(15,23,42,0.5)", lineHeight: 1.75 }}>
                      {tip}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2
                className="font-semibold tracking-tight mb-6"
                style={{ fontSize: "21px", color: "#0f172a" }}
              >
                Frequently Asked Questions
              </h2>
              <div
                className="space-y-px rounded-[16px] overflow-hidden"
                style={{ boxShadow: "0 0 0 1px rgba(15,118,110,0.1)" }}
              >
                {FAQS.map(({ q, a }, i) => (
                  <div
                    key={i}
                    className="px-6 py-5"
                    style={{
                      background: "#ffffff",
                      borderBottom:
                        i < FAQS.length - 1 ? "1px solid rgba(15,118,110,0.06)" : "none",
                    }}
                  >
                    <p
                      className="font-medium mb-2"
                      style={{ fontSize: "14px", color: "#0f172a" }}
                    >
                      {q}
                    </p>
                    <p style={{ fontSize: "13px", color: "rgba(15,23,42,0.5)", lineHeight: 1.75 }}>
                      {a}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section
              className="rounded-[20px] px-8 py-10 text-center"
              style={{
                background: "linear-gradient(135deg, #0f766e, #0d9488)",
                boxShadow: "0 8px 32px rgba(15,118,110,0.25)",
              }}
            >
              <p
                className="font-semibold tracking-tight mb-2"
                style={{ fontSize: "19px", color: "#ffffff" }}
              >
                More free tools
              </p>
              <p
                className="mb-6"
                style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}
              >
                Invoice generator, mortgage calculator, password generator, QR code maker and
                more — all free, no sign-up.
              </p>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] font-medium transition-opacity hover:opacity-85"
                style={{ background: "#ffffff", color: "#0f766e", fontSize: "13px" }}
              >
                Browse all tools
              </Link>
            </section>

            {/* BACK LINK */}
            <div className="pb-4">
              <Link
                href="/tools"
                className="inline-flex items-center gap-2.5 hover:opacity-70 transition-opacity"
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(15,23,42,0.35)",
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
