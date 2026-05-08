import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ApiMockBuilder from "./ApiMockBuilder";

export const metadata: Metadata = {
  title: "API Mock Builder — Generate curl, fetch & JSON Responses Instantly",
  description:
    "Build and preview API mock responses in seconds. Configure HTTP method, status code, headers, and response body. Generates curl commands and JavaScript fetch snippets. Free, browser-based, no signup required.",
  keywords: [
    "api mock builder",
    "mock api response",
    "generate curl command",
    "fetch code generator",
    "api testing tool",
    "rest api mock",
    "http mock server",
    "json response generator",
    "api development tool",
    "postman alternative",
    "api response simulator",
    "mock rest api online",
  ],
  alternates: { canonical: "https://mohdsakib.vercel.app/tools/api-mock-builder" },
  openGraph: {
    title: "API Mock Builder — Generate curl & fetch Snippets Instantly",
    description: "Configure HTTP method, status code, headers, and JSON body. Get curl commands and fetch code instantly. Free, browser-based.",
    url: "https://mohdsakib.vercel.app/tools/api-mock-builder",
    type: "website",
  },
};

const WHY_MOCK = [
  { title: "Frontend Before Backend", desc: "Build and test your UI against realistic data shapes before the real API endpoint is ready. No more blocked sprints." },
  { title: "Reproduce Edge Cases", desc: "Simulate 401 Unauthorized, 404 Not Found, or 500 Server Error responses to validate your error-handling logic every time." },
  { title: "Faster TDD Cycles", desc: "Write tests against a predictable mock contract rather than a live, flaky service. Faster feedback, fewer flaky tests." },
  { title: "Demo Without a Server", desc: "Present a working prototype to stakeholders using mocked endpoints — no backend deployment required." },
  { title: "Offline Development", desc: "Keep coding on planes and coffee shops. Mocked APIs never go down, rate-limit, or require VPN access." },
  { title: "Share Reproducible Bugs", desc: "Paste a curl or fetch snippet from this tool into a bug report to give teammates an exact reproduction step." },
];

const FAQS = [
  {
    q: "What is an API mock and why would I need one?",
    a: "An API mock is a simulated HTTP endpoint that returns a predefined response without executing any real server logic. You need one when the backend isn't built yet, when you want to test specific status codes (like 500 errors) that are hard to trigger in production, or when you want to work offline. Mocks let frontend and backend teams work in parallel without blocking each other.",
  },
  {
    q: "How does this tool generate curl and fetch snippets?",
    a: "The tool reads your configured HTTP method, URL path, headers, and response body and assembles them into a syntactically correct curl command and a JavaScript fetch snippet. Both are generated entirely in the browser — no data leaves your device. You can copy either snippet and use it in a terminal, a test file, or a code review comment.",
  },
  {
    q: "What does the response delay slider do?",
    a: "The delay value represents a simulated latency in milliseconds. It's reflected in the generated fetch snippet as an await new Promise(r => setTimeout(r, Nms)) call before the fetch, so your code behaves as if the server takes N milliseconds to respond. This is useful for testing loading states, skeleton screens, and timeout logic.",
  },
  {
    q: "Can I use this tool instead of Postman or Insomnia?",
    a: "This tool is a lightweight companion for quickly generating request snippets and visualising mock responses — it doesn't send real HTTP requests. For full API testing (sending live requests, reading real responses, scripting test chains) you'll still want Postman, Insomnia, or HTTPie. Think of this as a fast snippet generator and response visualiser, not a full API client.",
  },
  {
    q: "How does 'Generate Sample Response' decide what JSON to produce?",
    a: "The generator inspects your URL path for keywords. Paths containing 'user', 'auth', 'login', or 'account' produce a user object with id, name, email, and role fields. Paths with 'product', 'item', or 'catalog' produce a product object with price and stock fields. Paths with 'order', 'cart', or 'checkout' produce an order object. All other paths produce a generic success payload. You can edit the generated JSON freely.",
  },
  {
    q: "Is any of my data sent to a server?",
    a: "No. This tool runs entirely in your browser. The URL path, headers, JSON body, and any sensitive values you type never leave your machine. There are no analytics events, no server requests, and no storage beyond the current browser tab session. Close the tab and everything is gone.",
  },
];

export default function ApiMockBuilderPage() {
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

      <div className="min-h-screen" style={{ background: "#1a1523" }}>
        <header
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
          style={{ background: "rgba(26,21,35,0.92)", borderBottom: "1px solid rgba(124,58,237,0.1)" }}>
          <div className="max-w-7xl mx-auto px-6 h-13 flex items-center justify-between">
            <nav className="flex items-center gap-1.5" style={{ color: "rgba(163,176,200,0.4)", fontSize: "12px" }}>
              <Link href="/" className="font-medium hover:text-white transition-colors" style={{ color: "inherit" }}>Sakib</Link>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
              <Link href="/tools" className="hover:text-white transition-colors" style={{ color: "inherit" }}>Tools</Link>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
              <span style={{ color: "#a78bfa", fontWeight: 500 }}>API Mock Builder</span>
            </nav>
            <Link href="/tools" className="hover:opacity-80 transition-opacity"
              style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(163,176,200,0.35)" }}>
              All tools
            </Link>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 pt-24 pb-20">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full text-[10px] font-mono font-semibold"
              style={{ background: "rgba(124,58,237,0.1)", color: "#a78bfa", border: "1px solid rgba(124,58,237,0.2)" }}>
              ⬡ DEVELOPER
            </div>
            <h1 className="font-semibold tracking-tight leading-tight mb-2.5"
              style={{ fontSize: "clamp(26px,4vw,34px)", color: "#e2e8f0", fontFamily: "monospace" }}>
              API Mock Builder
            </h1>
            <p style={{ fontSize: "13.5px", color: "rgba(226,232,240,0.4)", lineHeight: 1.65, fontFamily: "monospace" }}>
              Configure HTTP method, status code, headers, and response body. Get curl and fetch snippets instantly.
            </p>
          </div>
          <ApiMockBuilder />
        </main>

        <div style={{ borderTop: "1px solid rgba(124,58,237,0.08)" }}>
          <div className="max-w-7xl mx-auto px-6 py-20 space-y-20">

            <section>
              <h2 className="font-semibold tracking-tight mb-6" style={{ fontSize: "21px", color: "#e2e8f0" }}>
                Why Mock APIs?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {WHY_MOCK.map(({ title, desc }) => (
                  <div key={title} className="rounded-[14px] p-5"
                    style={{ background: "#221b2e", border: "1px solid rgba(124,58,237,0.12)" }}>
                    <p className="font-semibold mb-1 font-mono" style={{ fontSize: "12.5px", color: "#a78bfa" }}>{title}</p>
                    <p style={{ fontSize: "12px", color: "rgba(226,232,240,0.4)", lineHeight: 1.7 }}>{desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-semibold tracking-tight mb-6" style={{ fontSize: "21px", color: "#e2e8f0" }}>Frequently Asked Questions</h2>
              <div className="rounded-[16px] overflow-hidden" style={{ border: "1px solid rgba(124,58,237,0.12)" }}>
                {FAQS.map(({ q, a }, i) => (
                  <div key={i} className="px-6 py-5"
                    style={{ background: "#221b2e", borderBottom: i < FAQS.length - 1 ? "1px solid rgba(124,58,237,0.07)" : "none" }}>
                    <p className="font-semibold mb-2 font-mono" style={{ fontSize: "13.5px", color: "#e2e8f0" }}>{q}</p>
                    <p style={{ fontSize: "12.5px", color: "rgba(226,232,240,0.45)", lineHeight: 1.75 }}>{a}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[20px] px-8 py-10 text-center"
              style={{ background: "#221b2e", border: "1px solid rgba(124,58,237,0.18)" }}>
              <p className="font-semibold tracking-tight mb-2" style={{ fontSize: "19px", color: "#e2e8f0" }}>More developer tools</p>
              <p className="mb-6" style={{ fontSize: "13px", color: "rgba(226,232,240,0.35)", lineHeight: 1.7 }}>
                JWT decoder, regex tester, JSON formatter, Base64 encoder and more.
              </p>
              <Link href="/tools" className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] font-mono font-medium transition-opacity hover:opacity-80"
                style={{ background: "#7c3aed", color: "#ffffff", fontSize: "12px" }}>
                Browse all tools
              </Link>
            </section>

            <div className="pb-4">
              <Link href="/tools" className="inline-flex items-center gap-2.5 hover:opacity-60 transition-opacity font-mono"
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
