import type { ServicePage } from "@/types/services";

export const servicePages: ServicePage[] = [
  {
    slug: "hire-nextjs-developer-india",
    eyebrow: "Remote Next.js Developer From India",
    title: "Hire a senior Next.js developer for US and UK product teams.",
    subtitle:
      "I build production-grade Next.js apps, SaaS dashboards, marketplaces, AI products, and high-performance web platforms for startups that need senior execution without agency drag.",
    metaTitle:
      "Hire Next.js Developer India | Remote Freelancer for US & UK Startups",
    metaDescription:
      "Hire Mohd Sakib, a senior Next.js developer from India for remote freelance work with US and UK startups. Next.js, TypeScript, Node.js, React Native, AI systems, performance, and scalable product engineering.",
    keywords: [
      "hire Next.js developer India",
      "Next.js freelancer India",
      "remote Next.js developer",
      "Next.js developer for US startups",
      "Next.js developer for UK startups",
      "freelance full stack developer India",
      "senior Next.js developer",
      "hire React developer India",
      "TypeScript developer India",
    ],
    primaryCta: "Book a project call",
    secondaryCta: "See case studies",
    proof: [
      { value: "8", label: "Production products" },
      { value: "25K+", label: "Users served" },
      { value: "98+", label: "Lighthouse targets" },
      { value: "US/UK", label: "Remote friendly" },
    ],
    services: [
      {
        title: "Next.js SaaS and product builds",
        description:
          "Dashboards, admin panels, customer portals, marketplaces, landing systems, and full product frontends with App Router, TypeScript, and clean API boundaries.",
      },
      {
        title: "Performance and Core Web Vitals",
        description:
          "LCP, INP, image strategy, dynamic loading, route-level optimization, server components, and practical profiling tied to business outcomes.",
      },
      {
        title: "Backend and API integration",
        description:
          "Node.js, REST, GraphQL, auth, payments, webhooks, queues, Redis, PostgreSQL, and third-party integrations that keep the frontend honest.",
      },
      {
        title: "AI and automation interfaces",
        description:
          "LLM product surfaces, RAG-powered workflows, AI dashboards, streaming responses, and internal automation tools for lean teams.",
      },
    ],
    outcomes: [
      "Launch a polished MVP without hiring a full internal team.",
      "Modernize a slow React or PHP product into a fast Next.js experience.",
      "Add senior product engineering capacity for a fixed scope or monthly contract.",
      "Turn messy requirements into an architecture, delivery plan, and shipped product.",
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "GraphQL",
      "Stripe",
      "AWS",
      "Vercel",
      "OpenAI",
      "Tailwind",
    ],
    projectIds: ["tekish", "artificialmufti", "stakeclash"],
    process: [
      {
        title: "Scope the business goal",
        description:
          "We clarify users, conversion goals, technical constraints, deadline, budget, and what must be true for the project to be considered successful.",
      },
      {
        title: "Design the delivery plan",
        description:
          "I break the work into milestones, choose the architecture, map risks, and define what ships first so progress is visible early.",
      },
      {
        title: "Build with weekly demos",
        description:
          "You get working software, clear async updates, code that is easy to maintain, and enough overlap for US or UK decision makers.",
      },
      {
        title: "Launch and improve",
        description:
          "I help with deployment, SEO basics, analytics, performance checks, bug fixes, and the next iteration after real users touch it.",
      },
    ],
    faqs: [
      {
        question: "Can I hire you from the US or UK while you are based in India?",
        answer:
          "Yes. I work remotely with clear async updates, scheduled overlap calls, and written delivery checkpoints so timezone differences do not slow the project down.",
      },
      {
        question: "Do you only build frontend Next.js work?",
        answer:
          "No. My strongest fit is full-stack product work: Next.js on the frontend, Node.js or Python APIs, databases, auth, payments, AI integrations, and deployment.",
      },
      {
        question: "Are you available for fixed-scope freelance projects?",
        answer:
          "Yes. I can work on fixed-scope MVPs, monthly retainers, technical rebuilds, performance audits, or senior engineering support for an existing team.",
      },
      {
        question: "What kind of Next.js projects are a good fit?",
        answer:
          "SaaS products, AI tools, marketplaces, dashboards, customer portals, conversion-focused sites, e-commerce rebuilds, and products that need strong performance and clean architecture.",
      },
    ],
  },
];

export function getServicePage(slug: string) {
  return servicePages.find((page) => page.slug === slug);
}
