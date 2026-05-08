import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import N8nValidator from "./N8nValidator";

export const metadata: Metadata = {
  title: "Free n8n Workflow Validator — Check Connections & Orphaned Nodes",
  description:
    "Paste your n8n workflow JSON and instantly validate node connections, detect orphaned nodes, find missing parameters, identify disconnected subgraphs, and check for loops. Free, browser-based.",
  keywords: [
    "n8n workflow validator",
    "n8n node validation",
    "n8n orphaned nodes",
    "n8n connections checker",
    "workflow automation validator",
    "n8n JSON validator",
    "n8n debugging tool",
    "n8n workflow analysis",
    "node automation",
    "workflow validation",
    "n8n missing parameters",
    "automation flow checker",
  ],
  alternates: { canonical: "https://mohdsakib.vercel.app/tools/n8n-workflow-validator" },
  openGraph: {
    title: "Free n8n Workflow Validator — Check Connections & Orphaned Nodes",
    description: "Validate n8n workflow JSON: detect orphaned nodes, missing connections, loops, and parameter errors. Browser-based, nothing sent to any server.",
    url: "https://mohdsakib.vercel.app/tools/n8n-workflow-validator",
    type: "website",
  },
};

const CHECKS = [
  {
    icon: "{}",
    title: "Structure Validation",
    desc: "Confirms the input is valid JSON with the required top-level `nodes` array and `connections` object.",
  },
  {
    icon: "◎",
    title: "Node Analysis",
    desc: "Lists every node with its type, name, position, and whether it is a trigger, action, or utility node.",
  },
  {
    icon: "⚬",
    title: "Orphaned Node Detection",
    desc: "Flags nodes that have zero incoming and zero outgoing connections — they will never execute in a run.",
  },
  {
    icon: "⇢",
    title: "Missing Connections",
    desc: "Finds references in the connections map that point to node names not present in the nodes array.",
  },
  {
    icon: "⊞",
    title: "Disconnected Subgraphs",
    desc: "Uses BFS to count isolated groups of nodes. More than one subgraph means part of your flow is unreachable.",
  },
  {
    icon: "↻",
    title: "Loop Detection",
    desc: "Runs DFS cycle detection on the node graph to surface feedback loops that may cause infinite execution.",
  },
  {
    icon: "⚙",
    title: "Missing Node Parameters",
    desc: "Checks known n8n node types (HTTP Request, Set, Code, Slack, email, SQL…) for required fields.",
  },
  {
    icon: "⚡",
    title: "Trigger Identification",
    desc: "Identifies which node acts as the workflow entry point — Webhook, Schedule, Form, Chat, and others.",
  },
  {
    icon: "∑",
    title: "Summary Counts",
    desc: "Shows total nodes, total connections, error count, and warning count in a quick-glance dashboard.",
  },
];

const COMMON_ISSUES = [
  {
    title: "Orphaned node after a refactor",
    detail: 'When you reroute a flow and forget to delete an old node, it remains in the "nodes" array but loses all its edges. The validator catches this immediately.',
  },
  {
    title: "Typo in a connection target name",
    detail: "If you manually edit workflow JSON and misspell a node name in the connections object, the connection references a non-existent node. The validator reports it as a ghost target.",
  },
  {
    title: "HTTP Request node without a URL",
    detail: 'The "url" field is required for HTTP Request nodes. Workflows exported before filling in the URL will fail at runtime — the validator surfaces this as a missing parameter warning.',
  },
  {
    title: "No trigger node",
    detail: "Workflows without a recognizable trigger (Webhook, Schedule, Form Trigger, etc.) cannot be activated automatically. The validator warns you so you can add one before deploying.",
  },
  {
    title: "Accidentally duplicated node name",
    detail: "Copying and pasting nodes in the n8n canvas can produce two nodes with the same name. n8n resolves connections by name, so duplicates cause unpredictable routing.",
  },
  {
    title: "Loop from an error branch pointing back",
    detail: "Error branches wired back to an earlier node in the same flow create a cycle. While n8n supports limited looping patterns, unintentional cycles often cause stuck executions.",
  },
];

const FAQS = [
  {
    q: "What is an n8n workflow?",
    a: "An n8n workflow is a visual automation flow made up of nodes connected by edges. Each node represents a step — fetching data from an API, transforming it, sending a notification, writing to a database. The workflow JSON file stores all node definitions and their connection map, and can be imported/exported from the n8n editor.",
  },
  {
    q: "What does 'orphaned node' mean in n8n?",
    a: "An orphaned node is a node that exists in the workflow's nodes array but has no connections to or from any other node. It will never execute during a workflow run. Orphaned nodes usually appear after refactoring — you rewire the main flow but forget to delete an old node. They waste memory and confuse anyone reading the workflow.",
  },
  {
    q: "How do I fix 'ghost target' connection errors?",
    a: "A ghost target error means your connections object references a node name that doesn't exist in your nodes array. This typically happens after renaming a node in the JSON by hand without updating all connection references. Open the JSON, search for the old name in the connections object, and update it to match the new node name exactly (n8n connections are case-sensitive).",
  },
  {
    q: "Can n8n workflows have loops?",
    a: "n8n supports controlled looping via the Loop Over Items node and recursion patterns, but accidental cycles — where node A connects to node B which connects back to node A — cause infinite execution and should be avoided. This validator uses depth-first search to detect any cycle in your node graph and flags it as a warning so you can decide whether it is intentional.",
  },
  {
    q: "Why does my workflow have multiple disconnected subgraphs?",
    a: "Multiple subgraphs usually mean you started building a second branch and never connected it to the main trigger path. The validator counts how many isolated clusters of nodes exist. If the count is greater than one, some nodes will never be reached from the trigger. You either need to connect them or move them to a separate workflow.",
  },
  {
    q: "Does this tool send my workflow JSON to any server?",
    a: "No. All validation runs entirely in your browser using JavaScript. Your workflow JSON never leaves your device and is not stored, logged, or transmitted anywhere. This makes it safe to paste credentials or private API configurations without concern.",
  },
];

export default function N8nWorkflowValidatorPage() {
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

      <div className="min-h-screen" style={{ background: "#130d1f" }}>
        <header
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
          style={{ background: "rgba(19,13,31,0.95)", borderBottom: "1px solid rgba(168,85,247,0.1)" }}>
          <div className="max-w-4xl mx-auto px-6 h-13 flex items-center justify-between">
            <nav className="flex items-center gap-1.5 font-mono" style={{ color: "rgba(168,85,247,0.4)", fontSize: "11px" }}>
              <Link href="/" className="hover:text-[#a855f7] transition-colors" style={{ color: "inherit" }}>sakib</Link>
              <ChevronRight size={10} style={{ opacity: 0.4 }} />
              <Link href="/tools" className="hover:text-[#a855f7] transition-colors" style={{ color: "inherit" }}>tools</Link>
              <ChevronRight size={10} style={{ opacity: 0.4 }} />
              <span style={{ color: "#a855f7" }}>n8n-workflow-validator</span>
            </nav>
            <Link
              href="/tools"
              className="hover:opacity-80 transition-opacity font-mono"
              style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(168,85,247,0.3)" }}>
              all tools
            </Link>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 pt-24 pb-20">
          <div className="mb-8">
            <div
              className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full text-[10px] font-mono font-semibold"
              style={{ background: "rgba(168,85,247,0.1)", color: "#a855f7", border: "1px solid rgba(168,85,247,0.2)" }}>
              ⬡ DEVELOPER
            </div>
            <h1
              className="font-semibold tracking-tight leading-tight mb-2.5 font-mono"
              style={{ fontSize: "clamp(24px,4vw,32px)", color: "#e2e8f0" }}>
              n8n Workflow Validator
            </h1>
            <p style={{ fontSize: "13.5px", color: "rgba(226,232,240,0.4)", lineHeight: 1.65, fontFamily: "monospace" }}>
              Paste your workflow JSON to detect orphaned nodes, broken connections, missing parameters, and loops — all in your browser.
            </p>
          </div>

          <N8nValidator />
        </main>

        <div style={{ borderTop: "1px solid rgba(168,85,247,0.08)" }}>
          <div className="max-w-4xl mx-auto px-6 py-20 space-y-20">

            <section>
              <h2 className="font-semibold tracking-tight mb-6 font-mono" style={{ fontSize: "21px", color: "#e2e8f0" }}>
                What We Check
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {CHECKS.map(({ icon, title, desc }) => (
                  <div
                    key={title}
                    className="rounded-[16px] px-5 py-5"
                    style={{ background: "#1c1329", border: "1px solid rgba(168,85,247,0.12)" }}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-[14px]" style={{ color: "#ff6d5a" }}>{icon}</span>
                      <p className="font-mono font-semibold text-[12px]" style={{ color: "#e2e8f0" }}>{title}</p>
                    </div>
                    <p style={{ fontSize: "11.5px", color: "rgba(226,232,240,0.4)", lineHeight: 1.75 }}>{desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-semibold tracking-tight mb-6 font-mono" style={{ fontSize: "21px", color: "#e2e8f0" }}>
                Common n8n Workflow Issues
              </h2>
              <div className="space-y-3">
                {COMMON_ISSUES.map(({ title, detail }, i) => (
                  <div
                    key={i}
                    className="rounded-[14px] px-5 py-4"
                    style={{ background: "#1c1329", border: "1px solid rgba(168,85,247,0.1)" }}>
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-[10px] font-bold mt-0.5 shrink-0" style={{ color: "#ff6d5a" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="font-mono font-semibold text-[12.5px] mb-1" style={{ color: "#e2e8f0" }}>{title}</p>
                        <p style={{ fontSize: "12px", color: "rgba(226,232,240,0.4)", lineHeight: 1.75 }}>{detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-semibold tracking-tight mb-6 font-mono" style={{ fontSize: "21px", color: "#e2e8f0" }}>
                Frequently Asked Questions
              </h2>
              <div className="rounded-[16px] overflow-hidden" style={{ border: "1px solid rgba(168,85,247,0.12)" }}>
                {FAQS.map(({ q, a }, i) => (
                  <div
                    key={i}
                    className="px-6 py-5"
                    style={{ background: "#1c1329", borderBottom: i < FAQS.length - 1 ? "1px solid rgba(168,85,247,0.07)" : "none" }}>
                    <p className="font-semibold mb-2 font-mono" style={{ fontSize: "13px", color: "#e2e8f0" }}>{q}</p>
                    <p style={{ fontSize: "12.5px", color: "rgba(226,232,240,0.4)", lineHeight: 1.75 }}>{a}</p>
                  </div>
                ))}
              </div>
            </section>

            <section
              className="rounded-[20px] px-8 py-10 text-center"
              style={{ background: "#1c1329", border: "1px solid rgba(168,85,247,0.15)" }}>
              <p className="font-semibold tracking-tight mb-2 font-mono" style={{ fontSize: "19px", color: "#e2e8f0" }}>
                More developer tools
              </p>
              <p className="mb-6" style={{ fontSize: "13px", color: "rgba(226,232,240,0.35)", lineHeight: 1.7 }}>
                JSON formatter, JWT decoder, Base64 encoder, regex tester, and more.
              </p>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] font-mono font-bold transition-opacity hover:opacity-80"
                style={{ background: "#ff6d5a", color: "#130d1f", fontSize: "12px" }}>
                Browse all tools
              </Link>
            </section>

            <div className="pb-4">
              <Link
                href="/tools"
                className="inline-flex items-center gap-2.5 hover:opacity-60 transition-opacity font-mono"
                style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(168,85,247,0.3)" }}>
                <span>←</span> Back to tools
              </Link>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
