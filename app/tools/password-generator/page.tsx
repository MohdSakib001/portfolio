import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import PasswordGenerator from "./PasswordGenerator";

export const metadata: Metadata = {
  title: "Free Password Generator — Strong Random Passwords with Strength Meter",
  description:
    "Generate strong, random passwords up to 128 characters with uppercase, lowercase, numbers, and symbols. Strength meter, one-click copy. Runs entirely in your browser — nothing stored.",
  keywords: [
    "password generator", "strong password generator", "random password generator",
    "secure password generator online", "password creator", "generate strong password",
    "password strength checker", "random password online", "password maker",
  ],
  alternates: { canonical: "https://mohdsakib.vercel.app/tools/password-generator" },
  openGraph: {
    title: "Free Password Generator — Strong Random Passwords",
    description: "Generate strong random passwords up to 128 characters. Strength meter, one-click copy. 100% in-browser.",
    url: "https://mohdsakib.vercel.app/tools/password-generator",
    type: "website",
  },
};

const TIPS = [
  { tip: "Use 16+ characters",    desc: "Password length is the single biggest factor in security. Every extra character exponentially increases the time to crack." },
  { tip: "Enable all character types", desc: "Combining uppercase, lowercase, numbers, and symbols creates a search space of 95^n for a length-n password." },
  { tip: "Use unique passwords",  desc: "Never reuse passwords across sites. A breach on one site then exposes all your other accounts to credential stuffing." },
  { tip: "Use a password manager", desc: "You only need to remember one strong master password. Let the manager handle the rest." },
  { tip: "Enable 2FA everywhere", desc: "A second factor makes a stolen password useless on its own. Use an authenticator app over SMS when possible." },
  { tip: "Never share passwords", desc: "Even with trusted people. Share access through permission systems, not credentials." },
];

const FAQS = [
  { q: "Is this password generator truly random?", a: "Yes. The tool uses the browser's built-in crypto.getRandomValues() API, which generates cryptographically secure random numbers. This is the same entropy source used by password managers and security tools." },
  { q: "Does this tool store or send my passwords anywhere?", a: "No. The generator runs entirely in JavaScript in your browser. No password is ever sent to a server, logged, or stored. Close the tab and it's gone forever." },
  { q: "How long should my password be?", a: "At minimum, use 12 characters for non-critical accounts and 16+ for email, banking, and password manager master passwords. Longer is always better — a 20-character random password is essentially uncrackable with current technology." },
  { q: "What makes a password strong?", a: "Length, randomness, and character diversity. A strong password is long (16+ chars), fully random (not a phrase), and uses all character types. Avoid dictionary words, names, or predictable patterns even if you substitute letters with numbers." },
  { q: "Should I include symbols in my password?", a: "Yes, when allowed by the site. Symbols increase the character set size from 62 (alphanumeric) to 95 (all printable ASCII), which significantly increases the number of possible combinations and time to brute-force." },
  { q: "What is the entropy of the passwords generated?", a: "With all character sets enabled (95 characters), a 16-character password has approximately 105 bits of entropy (log2(95^16) ≈ 105). NIST considers 112+ bits sufficient for long-term security." },
];

export default function PasswordGeneratorPage() {
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

      <div className="min-h-screen" style={{ background: "#000000" }}>
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
          style={{ background: "rgba(0,0,0,0.95)", borderBottom: "1px solid rgba(0,255,65,0.08)" }}>
          <div className="max-w-3xl mx-auto px-6 h-13 flex items-center justify-between">
            <nav className="flex items-center gap-1.5 font-mono" style={{ color: "rgba(0,255,65,0.4)", fontSize: "11px" }}>
              <Link href="/" className="hover:text-[#00ff41] transition-colors" style={{ color: "inherit" }}>sakib</Link>
              <ChevronRight size={10} style={{ opacity: 0.4 }} />
              <Link href="/tools" className="hover:text-[#00ff41] transition-colors" style={{ color: "inherit" }}>tools</Link>
              <ChevronRight size={10} style={{ opacity: 0.4 }} />
              <span style={{ color: "#00ff41" }}>password-generator</span>
            </nav>
            <Link href="/tools" className="hover:opacity-70 transition-opacity font-mono"
              style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(0,255,65,0.35)" }}>
              all tools
            </Link>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-6 pt-24 pb-20">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full font-mono text-[10px]"
              style={{ background: "rgba(0,255,65,0.08)", color: "#00ff41", border: "1px solid rgba(0,255,65,0.15)" }}>
              🔐 SECURITY
            </div>
            <h1 className="font-bold tracking-tight leading-tight mb-2.5"
              style={{ fontSize: "clamp(26px,4vw,36px)", color: "#00ff41", fontFamily: "monospace", letterSpacing: "-0.01em" }}>
              Password Generator
            </h1>
            <p style={{ fontSize: "13.5px", color: "rgba(0,255,65,0.4)", lineHeight: 1.65, fontFamily: "monospace" }}>
              Cryptographically secure. Nothing stored. Nothing sent.
            </p>
          </div>
          <PasswordGenerator />
        </main>

        <div style={{ borderTop: "1px solid rgba(0,255,65,0.08)" }}>
          <div className="max-w-3xl mx-auto px-6 py-20 space-y-20">

            <section>
              <h2 className="font-bold mb-4" style={{ fontSize: "21px", color: "#00ff41", fontFamily: "monospace" }}>
                Why Do You Need a Strong Password?
              </h2>
              <p style={{ fontSize: "14px", color: "rgba(0,255,65,0.45)", lineHeight: 1.85, fontFamily: "monospace" }}>
                Weak passwords are the most common entry point for account takeovers. Attackers use automated tools that
                can test billions of guesses per second against leaked password hashes. A 6-character lowercase password
                can be cracked in under a second. A 16-character random password with all character types would take
                millions of years with the same hardware.
              </p>
              <p className="mt-4" style={{ fontSize: "14px", color: "rgba(0,255,65,0.45)", lineHeight: 1.85, fontFamily: "monospace" }}>
                This generator uses the browser's cryptographic random number API — the same standard used by
                operating systems for security keys. Every password is different, truly random, and never logged.
              </p>
            </section>

            <section>
              <h2 className="font-bold mb-6" style={{ fontSize: "21px", color: "#00ff41", fontFamily: "monospace" }}>
                Password Security Best Practices
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {TIPS.map(({ tip, desc }) => (
                  <div key={tip} className="rounded-[14px] p-5"
                    style={{ background: "#0a0a0a", border: "1px solid rgba(0,255,65,0.08)" }}>
                    <p className="font-bold mb-1 font-mono" style={{ fontSize: "12.5px", color: "#00ff41" }}>{tip}</p>
                    <p style={{ fontSize: "12px", color: "rgba(0,255,65,0.4)", lineHeight: 1.7 }}>{desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-bold mb-6" style={{ fontSize: "21px", color: "#00ff41", fontFamily: "monospace" }}>
                Frequently Asked Questions
              </h2>
              <div className="rounded-[16px] overflow-hidden" style={{ border: "1px solid rgba(0,255,65,0.1)" }}>
                {FAQS.map(({ q, a }, i) => (
                  <div key={i} className="px-6 py-5"
                    style={{ background: "#0a0a0a", borderBottom: i < FAQS.length - 1 ? "1px solid rgba(0,255,65,0.05)" : "none" }}>
                    <p className="font-bold mb-2 font-mono" style={{ fontSize: "13.5px", color: "#00ff41" }}>{q}</p>
                    <p style={{ fontSize: "12.5px", color: "rgba(0,255,65,0.4)", lineHeight: 1.75 }}>{a}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[20px] px-8 py-10 text-center"
              style={{ background: "#0a0a0a", border: "1px solid rgba(0,255,65,0.12)" }}>
              <p className="font-bold mb-2 font-mono" style={{ fontSize: "19px", color: "#00ff41" }}>More free tools</p>
              <p className="mb-6 font-mono" style={{ fontSize: "12.5px", color: "rgba(0,255,65,0.35)", lineHeight: 1.7 }}>
                Regex tester, Base64 encoder, JSON formatter — all free, all in your browser.
              </p>
              <Link href="/tools" className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] font-mono font-bold transition-opacity hover:opacity-80"
                style={{ background: "#00ff41", color: "#000000", fontSize: "12px" }}>
                Browse all tools
              </Link>
            </section>

            <div className="pb-4">
              <Link href="/tools" className="inline-flex items-center gap-2.5 hover:opacity-60 transition-opacity font-mono"
                style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(0,255,65,0.3)" }}>
                <span>←</span> Back to tools
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
