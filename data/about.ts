import {
  Rocket,
  Smartphone,
  BrainCircuit,
  Gauge,
  Network,
  Workflow,
} from "lucide-react";

/**
 * Content for the /about page. Kept as data (project convention) so the page
 * component stays composition-only. Testimonials, projects and contact details
 * are reused from their existing data sources.
 */
export const aboutContent = {
  eyebrow: "About Mohd Sakib",
  title: "I turn ambitious product ideas into shipped, scalable software.",
  subtitle:
    "Senior full-stack and React Native developer from Meerut, India. I build production web apps, mobile apps, and AI systems for founders and product teams in the US, UK, and beyond — with senior execution and none of the agency drag.",
  story: [
    "I started as a developer who just wanted to ship things that people actually use. That instinct never left. Over the last few years I've architected and shipped eight production-grade products across FinTech, EdTech, LegalTech, gaming, and AI — serving 25,000+ users and processing over $100K in transactions.",
    "My core work is full-stack product engineering: Next.js and React on the frontend, Node.js and Python on the backend, React Native for mobile, and increasingly LLM and RAG systems where AI makes a product genuinely better. I care about the boring parts too — performance, clean architecture, and code a future team can build on.",
    "I work remotely with founders and teams who need a senior engineer who can own the build end to end: scope the goal, choose the architecture, ship in visible milestones, and stay accountable after real users touch it.",
  ],
  stats: [
    { value: "8", label: "Production products" },
    { value: "25K+", label: "Users served" },
    { value: "$100K+", label: "Processed" },
    { value: "5", label: "Industries shipped in" },
  ],
  capabilities: [
    {
      title: "Full-stack product builds",
      description:
        "Next.js, React, TypeScript, Node.js — SaaS dashboards, marketplaces, portals, and full product frontends with clean API boundaries.",
      color: "bg-violet-300/70",
      icon: Rocket,
    },
    {
      title: "React Native mobile apps",
      description:
        "Cross-platform iOS and Android apps with Expo — real-time features, payments, offline sync, and native-feeling UX from one codebase.",
      color: "bg-sky-300/70",
      icon: Smartphone,
    },
    {
      title: "AI & LLM systems",
      description:
        "RAG pipelines, streaming chat, AI dashboards, and tool-calling product surfaces built to reach production, not just a demo.",
      color: "bg-emerald-300/70",
      icon: BrainCircuit,
    },
    {
      title: "Performance & Core Web Vitals",
      description:
        "LCP, INP, image strategy, server components, and route-level optimization tied to real business outcomes.",
      color: "bg-amber-300/70",
      icon: Gauge,
    },
    {
      title: "System design & scale",
      description:
        "Redis, queues, WebSockets, PostgreSQL, and stateless services that stay fast and horizontally scalable under load.",
      color: "bg-rose-300/70",
      icon: Network,
    },
    {
      title: "Automation & workflows",
      description:
        "n8n automations and AI-in-the-loop pipelines that cut manual work for lean teams without adding headcount.",
      color: "bg-orange-300/70",
      icon: Workflow,
    },
  ],
  values: [
    {
      title: "Direct, not layered",
      description:
        "You talk to the engineer building the product — no handoff chains, no account managers translating your requirements.",
    },
    {
      title: "Ship in visible milestones",
      description:
        "Working software every cycle with clear async updates, so progress is real and decisions happen early.",
    },
    {
      title: "Own it after launch",
      description:
        "Deployment, analytics, performance, bug fixes, and the next iteration once real users are in the product.",
    },
  ],
} as const;
