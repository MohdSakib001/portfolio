import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import JwtDecoder from "./JwtDecoder";

export const metadata: Metadata = {
  title: "Free JWT Decoder — Decode JSON Web Tokens Instantly",
  description:
    "Paste any JWT and instantly see the decoded header, payload, expiry date, and issued-at timestamp. Colour-coded sections, expiry status. Runs entirely in your browser — nothing is sent anywhere.",
  keywords: [
    "JWT decoder", "JSON Web Token decoder", "decode JWT online", "JWT parser",
    "JWT viewer", "JWT checker", "decode JWT token", "JWT header payload",
    "JWT expiry checker", "JSON web token online",
  ],
  alternates: { canonical: "https://mohdsakib.vercel.app/tools/jwt-decoder" },
  openGraph: {
    title: "Free JWT Decoder — Decode JSON Web Tokens Instantly",
    description: "Decode any JWT token — header, payload, expiry, issued-at. Browser-only, nothing sent anywhere.",
    url: "https://mohdsakib.vercel.app/tools/jwt-decoder",
    type: "website",
  },
};

const JWT_FIELDS = [
  { field: "alg",  section: "Header",  desc: "Algorithm used to sign the token (e.g. HS256, RS256, ES256)" },
  { field: "typ",  section: "Header",  desc: "Token type — always \"JWT\" for JSON Web Tokens" },
  { field: "sub",  section: "Payload", desc: "Subject — identifies the principal (usually a user ID)" },
  { field: "iss",  section: "Payload", desc: "Issuer — identifies the party that issued the token" },
  { field: "aud",  section: "Payload", desc: "Audience — the recipient(s) the token is intended for" },
  { field: "exp",  section: "Payload", desc: "Expiration time — Unix timestamp after which the token is invalid" },
  { field: "iat",  section: "Payload", desc: "Issued At — Unix timestamp of when the token was created" },
  { field: "nbf",  section: "Payload", desc: "Not Before — Unix timestamp before which the token must not be accepted" },
  { field: "jti",  section: "Payload", desc: "JWT ID — unique identifier to prevent token replay" },
];

const FAQS = [
  { q: "What is a JWT?", a: "A JSON Web Token (JWT) is a compact, URL-safe token format defined in RFC 7519. It encodes claims (statements about an entity) as a JSON object that is signed — ensuring it hasn't been tampered with. JWTs are widely used for authentication and information exchange in web applications and APIs." },
  { q: "What are the three parts of a JWT?", a: "A JWT has three Base64URL-encoded parts separated by dots: 1) Header — contains the token type and signing algorithm. 2) Payload — contains the claims (user data, expiry, etc.). 3) Signature — the HMAC or RSA signature that verifies the token's integrity." },
  { q: "Can you verify a JWT with this tool?", a: "No. Verification requires the secret key (for HMAC algorithms) or the public key (for RSA/ECDSA). This tool only decodes the Base64URL-encoded parts to make them readable. Never share your signing secret with any online tool." },
  { q: "Is it safe to paste my JWT here?", a: "This tool runs entirely in your browser — no data is sent to any server, logged, or stored. That said, JWTs can contain sensitive user information. Use test/development tokens for online tools and keep production tokens in secure environments." },
  { q: "What does 'exp' mean in a JWT payload?", a: "exp is the expiration claim — a Unix timestamp (seconds since January 1, 1970 UTC) after which the token should be considered invalid. This tool converts the raw timestamp to a human-readable date and marks the token as expired if the current time is past the expiry." },
  { q: "What is the difference between HS256 and RS256?", a: "HS256 (HMAC-SHA256) uses a single shared secret for both signing and verification — suitable for internal services where you control both sides. RS256 (RSA-SHA256) uses a private key to sign and a public key to verify — better for distributed systems where the verifier shouldn't have the signing key." },
];

export default function JwtDecoderPage() {
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

      <div className="min-h-screen" style={{ background: "#080b10" }}>
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
          style={{ background: "rgba(8,11,16,0.92)", borderBottom: "1px solid rgba(251,191,36,0.1)" }}>
          <div className="max-w-3xl mx-auto px-6 h-13 flex items-center justify-between">
            <nav className="flex items-center gap-1.5" style={{ color: "rgba(251,191,36,0.4)", fontSize: "12px" }}>
              <Link href="/" className="font-medium hover:text-[#fbbf24] transition-colors" style={{ color: "inherit" }}>Sakib</Link>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
              <Link href="/tools" className="hover:text-[#fbbf24] transition-colors" style={{ color: "inherit" }}>Tools</Link>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
              <span style={{ color: "#fbbf24", fontWeight: 500 }}>JWT Decoder</span>
            </nav>
            <Link href="/tools" className="hover:opacity-80 transition-opacity"
              style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(251,191,36,0.35)" }}>
              All tools
            </Link>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-6 pt-24 pb-20">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full text-[10px] font-mono font-semibold"
              style={{ background: "rgba(251,191,36,0.08)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.15)" }}>
              🔑 DEVELOPER
            </div>
            <h1 className="font-semibold tracking-tight leading-tight mb-2.5"
              style={{ fontSize: "clamp(26px,4vw,34px)", color: "#f8f5e4", fontFamily: "monospace" }}>
              JWT Decoder
            </h1>
            <p style={{ fontSize: "13.5px", color: "rgba(248,245,228,0.4)", lineHeight: 1.65, fontFamily: "monospace" }}>
              Paste any JWT — see decoded header, payload, expiry, and signature.
            </p>
          </div>
          <JwtDecoder />
        </main>

        <div style={{ borderTop: "1px solid rgba(251,191,36,0.08)" }}>
          <div className="max-w-3xl mx-auto px-6 py-20 space-y-20">

            <section>
              <h2 className="font-semibold tracking-tight mb-2" style={{ fontSize: "21px", color: "#f8f5e4" }}>
                Standard JWT Claim Reference
              </h2>
              <p className="mb-5" style={{ fontSize: "13.5px", color: "rgba(248,245,228,0.4)", lineHeight: 1.7 }}>
                These are the registered claim names defined in the JWT specification (RFC 7519).
              </p>
              <div className="rounded-[16px] overflow-hidden" style={{ border: "1px solid rgba(251,191,36,0.1)" }}>
                <table className="w-full text-left" style={{ background: "#161b22" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(251,191,36,0.08)" }}>
                      {["Claim", "Section", "Meaning"].map(h => (
                        <th key={h} className="px-5 py-3.5"
                          style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(251,191,36,0.4)", fontFamily: "monospace" }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {JWT_FIELDS.map(({ field, section, desc }, i) => (
                      <tr key={field} style={{ borderBottom: i < JWT_FIELDS.length - 1 ? "1px solid rgba(251,191,36,0.04)" : "none" }}>
                        <td className="px-5 py-3 font-mono font-bold" style={{ fontSize: "12.5px", color: "#fbbf24" }}>{field}</td>
                        <td className="px-5 py-3 font-mono" style={{ fontSize: "11px", color: "rgba(248,245,228,0.4)" }}>{section}</td>
                        <td className="px-5 py-3" style={{ fontSize: "12px", color: "rgba(248,245,228,0.45)" }}>{desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="font-semibold tracking-tight mb-6" style={{ fontSize: "21px", color: "#f8f5e4" }}>Frequently Asked Questions</h2>
              <div className="rounded-[16px] overflow-hidden" style={{ border: "1px solid rgba(251,191,36,0.1)" }}>
                {FAQS.map(({ q, a }, i) => (
                  <div key={i} className="px-6 py-5"
                    style={{ background: "#161b22", borderBottom: i < FAQS.length - 1 ? "1px solid rgba(251,191,36,0.05)" : "none" }}>
                    <p className="font-semibold mb-2 font-mono" style={{ fontSize: "13.5px", color: "#f8f5e4" }}>{q}</p>
                    <p style={{ fontSize: "12.5px", color: "rgba(248,245,228,0.45)", lineHeight: 1.75 }}>{a}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[20px] px-8 py-10 text-center"
              style={{ background: "#161b22", border: "1px solid rgba(251,191,36,0.15)" }}>
              <p className="font-semibold tracking-tight mb-2" style={{ fontSize: "19px", color: "#f8f5e4" }}>More developer tools</p>
              <p className="mb-6" style={{ fontSize: "13px", color: "rgba(248,245,228,0.35)", lineHeight: 1.7 }}>
                Base64 encoder, regex tester, JSON formatter, password generator and more.
              </p>
              <Link href="/tools" className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] font-mono font-medium transition-opacity hover:opacity-80"
                style={{ background: "#fbbf24", color: "#080b10", fontSize: "12px" }}>
                Browse all tools
              </Link>
            </section>

            <div className="pb-4">
              <Link href="/tools" className="inline-flex items-center gap-2.5 hover:opacity-60 transition-opacity font-mono"
                style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(251,191,36,0.3)" }}>
                <span>←</span> Back to tools
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
