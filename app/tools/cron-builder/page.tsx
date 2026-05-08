import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import CronBuilder from "./CronBuilder";

export const metadata: Metadata = {
  title: "Free Cron Expression Builder — Visual Cron Generator for n8n & GitHub Actions",
  description:
    "Build and validate cron expressions visually. Get a human-readable description, copy the expression, and use it in Linux crontab, n8n workflows, or GitHub Actions schedules. Free, browser-based.",
  keywords: [
    "cron expression builder",
    "cron generator",
    "cron expression tester",
    "cron syntax",
    "n8n cron",
    "github actions cron",
    "linux crontab",
    "cron job scheduler",
    "cron expression validator",
    "online cron builder",
    "cron expression explainer",
    "schedule expression builder",
  ],
  alternates: { canonical: "https://mohdsakib.vercel.app/tools/cron-builder" },
  openGraph: {
    title: "Free Cron Expression Builder — Visual Cron Generator for n8n & GitHub Actions",
    description:
      "Build cron expressions visually with real-time human-readable descriptions. Works with Linux crontab, n8n, and GitHub Actions.",
    url: "https://mohdsakib.vercel.app/tools/cron-builder",
    type: "website",
  },
};

const SYNTAX_FIELDS = [
  { field: "Minute",       range: "0–59",  special: "* , - /" },
  { field: "Hour",         range: "0–23",  special: "* , - /" },
  { field: "Day of Month", range: "1–31",  special: "* , - / L W" },
  { field: "Month",        range: "1–12",  special: "* , - /" },
  { field: "Day of Week",  range: "0–6",   special: "* , - / L #" },
];

const PATTERNS = [
  { label: "Every minute",           cron: "* * * * *",   desc: "Runs once per minute, all day" },
  { label: "Every 5 minutes",        cron: "*/5 * * * *", desc: "Common for monitoring checks" },
  { label: "Every 15 minutes",       cron: "*/15 * * * *",desc: "Quarter-hourly polling" },
  { label: "Hourly",                 cron: "0 * * * *",   desc: "Runs at the start of every hour" },
  { label: "Daily at midnight",      cron: "0 0 * * *",   desc: "Common for nightly cleanup jobs" },
  { label: "Daily at 9am",           cron: "0 9 * * *",   desc: "Weekday morning report" },
  { label: "Weekdays at 9am",        cron: "0 9 * * 1-5", desc: "Mon–Fri business-hours trigger" },
  { label: "Weekends at noon",       cron: "0 12 * * 0,6",desc: "Sat & Sun at 12:00" },
  { label: "First of each month",    cron: "0 0 1 * *",   desc: "Monthly billing or rollup" },
  { label: "Every Sunday midnight",  cron: "0 0 * * 0",   desc: "Weekly reset or report" },
  { label: "Twice daily",            cron: "0 9,17 * * *", desc: "9am and 5pm every day" },
  { label: "Every 6 hours",          cron: "0 */6 * * *", desc: "Runs at 0, 6, 12, 18" },
];

const FAQS = [
  {
    q: "What is a cron expression?",
    a: "A cron expression is a compact string of five space-separated fields that defines a recurring schedule for a job or task. The fields represent — in order — minute, hour, day of month, month, and day of week. Asterisks (*) mean 'every', slashes define step intervals (*/5 = every 5), and commas list multiple values.",
  },
  {
    q: "How do I use a cron expression in n8n?",
    a: "In n8n, add a Schedule Trigger node to your workflow. Select 'Cron Expression' as the trigger mode and paste your expression into the 'Expression' field. The workflow runs in the timezone configured in your n8n instance settings. Note that n8n may not support all extended specifiers like L (last day) depending on the version.",
  },
  {
    q: "How do I use a cron expression in GitHub Actions?",
    a: "In your workflow YAML, use the on.schedule key with a cron sub-key. Example: on: schedule: - cron: '0 9 * * 1-5'. GitHub Actions always runs cron schedules in UTC. The minimum interval GitHub Actions enforces is 5 minutes. Expressions with a step shorter than */5 on the minute field will be clamped.",
  },
  {
    q: "What does */ mean in a cron expression?",
    a: "The */ syntax is called a step value. It means 'every N units'. For example, */15 in the minute field means 'every 15 minutes' (i.e. at 0, 15, 30, 45). */6 in the hour field means 'every 6 hours' (0, 6, 12, 18). You can also combine a range with a step: 1-5/2 means every 2 units within the 1-to-5 range.",
  },
  {
    q: "What is the difference between day-of-month and day-of-week?",
    a: "Day-of-month (field 3) specifies a calendar date (1–31), while day-of-week (field 5) specifies a named day (0 = Sunday, 6 = Saturday). If both are set to non-asterisk values, most cron implementations fire when either condition is true, not both. To target a specific weekday on a specific date, you often need additional application logic.",
  },
  {
    q: "Why is my scheduled GitHub Actions workflow not running?",
    a: "Several reasons are common: the repository may have gone inactive (GitHub pauses schedules on repos with no activity for 60 days), the cron expression may be invalid, or the interval is shorter than 5 minutes. Workflows are also queued, so there can be delays of several minutes under high GitHub infrastructure load. Always validate your expression with a tool before committing.",
  },
];

export default function CronBuilderPage() {
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

      <div className="min-h-screen" style={{ background: "#080b14" }}>
        <header
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
          style={{ background: "rgba(8,11,20,0.92)", borderBottom: "1px solid rgba(167,139,250,0.1)" }}>
          <div className="max-w-3xl mx-auto px-6 h-13 flex items-center justify-between">
            <nav className="flex items-center gap-1.5 font-mono" style={{ color: "rgba(167,139,250,0.4)", fontSize: "11px" }}>
              <Link href="/" className="hover:text-[#a78bfa] transition-colors" style={{ color: "inherit" }}>sakib</Link>
              <ChevronRight size={10} style={{ opacity: 0.4 }} />
              <Link href="/tools" className="hover:text-[#a78bfa] transition-colors" style={{ color: "inherit" }}>tools</Link>
              <ChevronRight size={10} style={{ opacity: 0.4 }} />
              <span style={{ color: "#a78bfa" }}>cron-builder</span>
            </nav>
            <Link
              href="/tools"
              className="hover:opacity-80 transition-opacity font-mono"
              style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(167,139,250,0.3)" }}>
              all tools
            </Link>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-6 pt-24 pb-20">
          <div className="mb-8">
            <div
              className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full text-[10px] font-mono font-semibold"
              style={{ background: "rgba(167,139,250,0.08)", color: "#a78bfa", border: "1px solid rgba(167,139,250,0.15)" }}>
              ⬡ DEVELOPER
            </div>
            <h1
              className="font-semibold tracking-tight leading-tight mb-2.5"
              style={{ fontSize: "clamp(26px,4vw,34px)", color: "#e2e8f0", fontFamily: "monospace" }}>
              Cron Expression Builder
            </h1>
            <p style={{ fontSize: "13.5px", color: "rgba(226,232,240,0.4)", lineHeight: 1.65, fontFamily: "monospace" }}>
              Build, validate, and understand cron expressions for n8n, GitHub Actions, and Linux crontab.
            </p>
          </div>

          <CronBuilder />
        </main>

        <div style={{ borderTop: "1px solid rgba(167,139,250,0.08)" }}>
          <div className="max-w-3xl mx-auto px-6 py-20 space-y-20">

            <section>
              <h2 className="font-semibold tracking-tight mb-2" style={{ fontSize: "21px", color: "#e2e8f0" }}>
                Cron Syntax Reference
              </h2>
              <p className="mb-5" style={{ fontSize: "13.5px", color: "rgba(226,232,240,0.4)" }}>
                A cron expression is read left to right: minute hour dom month dow. Special characters control ranges, steps, and wildcards.
              </p>
              <div className="rounded-[16px] overflow-hidden" style={{ border: "1px solid rgba(167,139,250,0.1)" }}>
                <table className="w-full text-left" style={{ background: "#0f1424" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(167,139,250,0.08)" }}>
                      {["Field", "Allowed Range", "Special Characters"].map(h => (
                        <th key={h} className="px-5 py-3.5"
                          style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(167,139,250,0.4)", fontFamily: "monospace" }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {SYNTAX_FIELDS.map(({ field, range, special }, i) => (
                      <tr key={field} style={{ borderBottom: i < SYNTAX_FIELDS.length - 1 ? "1px solid rgba(167,139,250,0.04)" : "none" }}>
                        <td className="px-5 py-3 font-medium" style={{ fontSize: "12.5px", color: "#e2e8f0", fontFamily: "monospace" }}>{field}</td>
                        <td className="px-5 py-3 font-mono" style={{ fontSize: "11px", color: "#a78bfa" }}>{range}</td>
                        <td className="px-5 py-3 font-mono" style={{ fontSize: "11px", color: "rgba(167,139,250,0.5)" }}>{special}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { char: "*",  meaning: "Every value in the field" },
                  { char: ",",  meaning: "List separator: 1,3,5" },
                  { char: "-",  meaning: "Range: 1-5 means 1 through 5" },
                  { char: "/",  meaning: "Step: */10 means every 10 units" },
                  { char: "L",  meaning: "Last — last day of month or week" },
                  { char: "W",  meaning: "Weekday nearest to given day" },
                ].map(({ char, meaning }) => (
                  <div key={char} className="flex items-start gap-3 px-4 py-3 rounded-[10px]"
                    style={{ background: "#0f1424", border: "1px solid rgba(167,139,250,0.08)" }}>
                    <code style={{ color: "#a78bfa", fontSize: "16px", minWidth: "18px", fontFamily: "monospace" }}>{char}</code>
                    <p style={{ fontSize: "12px", color: "rgba(226,232,240,0.45)", lineHeight: 1.6 }}>{meaning}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-semibold tracking-tight mb-2" style={{ fontSize: "21px", color: "#e2e8f0" }}>
                Common Cron Patterns
              </h2>
              <p className="mb-5" style={{ fontSize: "13.5px", color: "rgba(226,232,240,0.4)" }}>
                Click any expression in the builder above to apply it, or copy from the reference below.
              </p>
              <div className="rounded-[16px] overflow-hidden" style={{ border: "1px solid rgba(167,139,250,0.1)" }}>
                <table className="w-full text-left" style={{ background: "#0f1424" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(167,139,250,0.08)" }}>
                      {["Schedule", "Expression", "Description"].map(h => (
                        <th key={h} className="px-5 py-3.5"
                          style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(167,139,250,0.4)", fontFamily: "monospace" }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {PATTERNS.map(({ label, cron, desc }, i) => (
                      <tr key={cron} style={{ borderBottom: i < PATTERNS.length - 1 ? "1px solid rgba(167,139,250,0.04)" : "none" }}>
                        <td className="px-5 py-3 font-medium" style={{ fontSize: "12.5px", color: "#e2e8f0" }}>{label}</td>
                        <td className="px-5 py-3 font-mono" style={{ fontSize: "11px", color: "#a78bfa", whiteSpace: "nowrap" }}>{cron}</td>
                        <td className="px-5 py-3" style={{ fontSize: "12px", color: "rgba(226,232,240,0.4)" }}>{desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="font-semibold tracking-tight mb-6" style={{ fontSize: "21px", color: "#e2e8f0" }}>
                Frequently Asked Questions
              </h2>
              <div className="rounded-[16px] overflow-hidden" style={{ border: "1px solid rgba(167,139,250,0.1)" }}>
                {FAQS.map(({ q, a }, i) => (
                  <div key={i} className="px-6 py-5"
                    style={{ background: "#0f1424", borderBottom: i < FAQS.length - 1 ? "1px solid rgba(167,139,250,0.05)" : "none" }}>
                    <p className="font-semibold mb-2 font-mono" style={{ fontSize: "13.5px", color: "#e2e8f0" }}>{q}</p>
                    <p style={{ fontSize: "12.5px", color: "rgba(226,232,240,0.45)", lineHeight: 1.75 }}>{a}</p>
                  </div>
                ))}
              </div>
            </section>

            <section
              className="rounded-[20px] px-8 py-10 text-center"
              style={{ background: "#0f1424", border: "1px solid rgba(167,139,250,0.15)" }}>
              <p className="font-semibold tracking-tight mb-2" style={{ fontSize: "19px", color: "#e2e8f0" }}>
                More developer tools
              </p>
              <p className="mb-6" style={{ fontSize: "13px", color: "rgba(226,232,240,0.35)", lineHeight: 1.7 }}>
                JSON formatter, JWT decoder, Base64 encoder, regex tester and more.
              </p>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] font-mono font-medium transition-opacity hover:opacity-80"
                style={{ background: "#a78bfa", color: "#080b14", fontSize: "12px" }}>
                Browse all tools
              </Link>
            </section>

            <div className="pb-4">
              <Link
                href="/tools"
                className="inline-flex items-center gap-2.5 hover:opacity-60 transition-opacity font-mono"
                style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(167,139,250,0.3)" }}>
                <span>←</span> Back to tools
              </Link>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
