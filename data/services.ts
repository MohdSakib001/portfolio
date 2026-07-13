import type { ServicePage } from "@/types/services";
import { HOST } from "@/data/constants";
import { createMetaData } from "@/seo-utils/CommonMeta";

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
    inquirySubject: "Next.js project inquiry",
    serviceName: "Mohd Sakib - Next.js Developer India",
    serviceType:
      "Next.js development, full-stack web development, SaaS development",
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
  {
    slug: "hire-react-native-developer-india",
    eyebrow: "Remote React Native Developer From India",
    title: "Hire a senior React Native developer to ship your mobile app.",
    subtitle:
      "I build cross-platform iOS and Android apps with React Native and Expo — real-time features, payments, offline sync, and native-feeling UX — for founders and product teams that need a senior mobile engineer without agency overhead.",
    metaTitle:
      "Hire React Native Developer India | Remote iOS & Android App Developer",
    metaDescription:
      "Hire Mohd Sakib, a senior React Native developer from India for remote iOS and Android app development. Expo, TypeScript, real-time features, payments, offline-first apps, and App Store / Play Store launches for US, UK, and global startups.",
    keywords: [
      "hire React Native developer India",
      "React Native freelancer India",
      "remote React Native developer",
      "iOS and Android app developer India",
      "Expo developer India",
      "cross platform mobile app developer",
      "React Native developer for US startups",
      "hire mobile app developer India",
      "freelance React Native engineer",
    ],
    primaryCta: "Book a mobile app call",
    secondaryCta: "See mobile work",
    inquirySubject: "React Native app inquiry",
    serviceName: "Mohd Sakib - React Native Developer India",
    serviceType:
      "React Native development, cross-platform mobile app development, iOS and Android engineering",
    proof: [
      { value: "iOS+Android", label: "One codebase" },
      { value: "25K+", label: "Users served" },
      { value: "60fps", label: "Native-feel UX" },
      { value: "US/UK", label: "Remote friendly" },
    ],
    services: [
      {
        title: "Cross-platform app builds",
        description:
          "Full iOS and Android apps from one React Native + Expo codebase — navigation, animations, gestures, and a native-feeling UI that ships to both stores.",
      },
      {
        title: "Real-time and offline-first features",
        description:
          "WebSocket live updates, chat, location, push notifications, and offline sync with local persistence so the app stays usable on weak networks.",
      },
      {
        title: "Payments and native integrations",
        description:
          "In-app purchases, Stripe, RevenueCat, maps, camera, biometrics, and other native modules wired cleanly with typed bridges.",
      },
      {
        title: "Release, OTA updates and store launch",
        description:
          "App Store and Play Store submission, EAS builds, over-the-air updates, crash reporting, and performance profiling on real devices.",
      },
    ],
    outcomes: [
      "Launch a polished iOS and Android app from a single maintainable codebase.",
      "Turn an existing web product into a fast, native-feeling mobile experience.",
      "Add senior mobile engineering capacity for a fixed scope or monthly contract.",
      "Fix a slow, crash-prone React Native app and get it store-ready.",
    ],
    stack: [
      "React Native",
      "Expo",
      "TypeScript",
      "Node.js",
      "GraphQL",
      "Firebase",
      "WebSockets",
      "Stripe",
      "Mapbox",
      "PostgreSQL",
    ],
    projectIds: ["stakeclash", "sendora", "teppe"],
    process: [
      {
        title: "Scope the app and platforms",
        description:
          "We clarify the core user flow, target devices, native features, store requirements, deadline, and what the first shippable version must include.",
      },
      {
        title: "Design the delivery plan",
        description:
          "I choose the navigation model, state and data layer, native modules, and milestone breakdown so a usable build lands early.",
      },
      {
        title: "Build with device demos",
        description:
          "You get installable builds on TestFlight and internal Play tracks each cycle, with async updates and overlap for US or UK decision makers.",
      },
      {
        title: "Ship to the stores",
        description:
          "I handle store submission, review fixes, OTA update flow, analytics, crash monitoring, and the next iteration after real users install it.",
      },
    ],
    faqs: [
      {
        question: "Do you build both iOS and Android from one codebase?",
        answer:
          "Yes. I build with React Native and Expo so iOS and Android ship from a single TypeScript codebase, with platform-specific tuning only where it improves the native feel.",
      },
      {
        question: "Can you take over an existing React Native project?",
        answer:
          "Yes. I regularly audit and rescue existing apps — fixing crashes, performance, navigation, and native module issues, then getting the app back to a stable store-ready state.",
      },
      {
        question: "Can you handle App Store and Play Store submission?",
        answer:
          "Yes. I manage EAS builds, store listings, review requirements, over-the-air updates, and post-launch crash and performance monitoring end to end.",
      },
      {
        question: "What kinds of mobile apps are a good fit?",
        answer:
          "Real-time and social apps, marketplaces, fintech and wallet apps, on-demand and location apps, AI-powered apps, and product companions to an existing web platform.",
      },
    ],
  },
  {
    slug: "hire-saas-developer-india",
    eyebrow: "Remote SaaS MVP Engineer From India",
    title: "Hire a senior developer to build your SaaS MVP end to end.",
    subtitle:
      "I take founders from idea to a launched, revenue-ready SaaS — auth, billing, multi-tenancy, dashboards, and the full backend — so non-technical founders can validate and sell without assembling a team first.",
    metaTitle:
      "Hire SaaS Developer India | Build Your MVP for US & UK Founders",
    metaDescription:
      "Hire Mohd Sakib, a senior SaaS developer from India to build your MVP from zero to launch. Subscriptions, Stripe billing, multi-tenant auth, dashboards, and scalable architecture for non-technical founders in the US, UK, and beyond.",
    keywords: [
      "hire SaaS developer India",
      "SaaS MVP developer India",
      "build my SaaS MVP",
      "MVP developer for non technical founders",
      "SaaS freelancer India",
      "Stripe subscription developer",
      "multi tenant SaaS developer",
      "hire developer to build SaaS",
      "startup MVP developer India",
    ],
    primaryCta: "Book an MVP call",
    secondaryCta: "See SaaS builds",
    inquirySubject: "SaaS MVP inquiry",
    serviceName: "Mohd Sakib - SaaS MVP Developer India",
    serviceType:
      "SaaS development, MVP engineering, multi-tenant product development",
    proof: [
      { value: "0 to 1", label: "MVP specialist" },
      { value: "$100K+", label: "Processed" },
      { value: "Stripe", label: "Billing ready" },
      { value: "US/UK", label: "Remote friendly" },
    ],
    services: [
      {
        title: "0 to 1 SaaS MVP builds",
        description:
          "The full first version — onboarding, core product, admin, and marketing site — scoped tight so you can launch and get paying users fast.",
      },
      {
        title: "Auth, billing and multi-tenancy",
        description:
          "Secure auth, roles and organizations, Stripe subscriptions, usage limits, trials, and webhooks so the money side works from day one.",
      },
      {
        title: "Dashboards and product backend",
        description:
          "Customer dashboards, analytics, background jobs, queues, and clean APIs on PostgreSQL and Redis that stay maintainable as you grow.",
      },
      {
        title: "Launch and iterate",
        description:
          "Deployment, SEO basics, analytics, and a fast feedback loop so you can act on real usage instead of guessing.",
      },
    ],
    outcomes: [
      "Launch a paid SaaS MVP without hiring a full engineering team first.",
      "Validate your idea with real users and real subscriptions in weeks, not quarters.",
      "Get a clean, documented codebase your future team can build on.",
      "Add senior product engineering for a fixed-scope MVP or monthly retainer.",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "Stripe",
      "Prisma",
      "AWS",
      "Vercel",
      "Tailwind",
    ],
    projectIds: ["tekish", "colaw", "sendora"],
    process: [
      {
        title: "Scope the MVP",
        description:
          "We cut the idea down to the smallest version that a customer would pay for, then define users, pricing, and the launch deadline.",
      },
      {
        title: "Design the delivery plan",
        description:
          "I map the architecture, data model, billing flow, and milestones so the product is demo-able early and de-risked as it grows.",
      },
      {
        title: "Build with weekly demos",
        description:
          "You get working software each week, clear async updates, and enough overlap to make product decisions with a US or UK schedule.",
      },
      {
        title: "Launch and improve",
        description:
          "I ship it live, wire analytics and payments, fix what real users hit, and plan the next iteration toward product-market fit.",
      },
    ],
    faqs: [
      {
        question: "I'm a non-technical founder — can you build the whole thing?",
        answer:
          "Yes. I handle the full build: frontend, backend, database, auth, billing, and deployment. You focus on customers and product decisions while I own the engineering.",
      },
      {
        question: "How fast can I launch a SaaS MVP?",
        answer:
          "Most focused MVPs launch in a handful of weeks. The timeline depends on scope — I keep the first version deliberately small so you reach real users and revenue quickly.",
      },
      {
        question: "Will I own the code and be able to hire a team later?",
        answer:
          "Absolutely. You own everything. I write clean, documented, conventional code so a future in-house team can pick it up without a rewrite.",
      },
      {
        question: "Can you add subscriptions and payments?",
        answer:
          "Yes. Stripe subscriptions, trials, usage-based limits, invoices, and webhooks are a standard part of the builds, wired securely from the start.",
      },
    ],
  },
  {
    slug: "hire-ai-developer-india",
    eyebrow: "Remote AI Product Engineer From India",
    title: "Hire a senior AI developer to ship LLM products and automation.",
    subtitle:
      "I build production AI features — RAG systems, LLM-powered product surfaces, streaming chat, and n8n automation — with the full-stack engineering to put them in front of real users, not just a demo notebook.",
    metaTitle:
      "Hire AI Developer India | LLM, RAG & n8n Automation Engineer",
    metaDescription:
      "Hire Mohd Sakib, a senior AI developer from India to build LLM products, RAG pipelines, AI dashboards, streaming chat, and n8n automation. Full-stack engineering for US, UK, and global startups shipping real AI features to production.",
    keywords: [
      "hire AI developer India",
      "LLM developer India",
      "RAG pipeline developer",
      "AI product engineer India",
      "n8n automation developer",
      "OpenAI developer India",
      "AI SaaS developer",
      "hire AI engineer for startup",
      "freelance AI developer India",
    ],
    primaryCta: "Book an AI project call",
    secondaryCta: "See AI work",
    inquirySubject: "AI product inquiry",
    serviceName: "Mohd Sakib - AI Developer India",
    serviceType:
      "AI product development, LLM and RAG engineering, workflow automation",
    proof: [
      { value: "RAG", label: "Retrieval systems" },
      { value: "Streaming", label: "LLM UX" },
      { value: "n8n", label: "Automation" },
      { value: "US/UK", label: "Remote friendly" },
    ],
    services: [
      {
        title: "LLM product surfaces",
        description:
          "Chat, copilots, and AI dashboards with streaming responses, tool calling, guardrails, and a UX that feels fast and trustworthy.",
      },
      {
        title: "RAG and retrieval systems",
        description:
          "Document ingestion, chunking, embeddings, vector search, and grounded answers with citations — tuned for accuracy over demos.",
      },
      {
        title: "Workflow and n8n automation",
        description:
          "Internal automation, data pipelines, and AI-in-the-loop workflows in n8n so lean teams cut manual work without more headcount.",
      },
      {
        title: "Production-grade delivery",
        description:
          "Cost controls, caching, evals, observability, and the full-stack app around the model so it ships and stays reliable.",
      },
    ],
    outcomes: [
      "Ship an AI feature that reaches real users, not a notebook demo.",
      "Add RAG so your product answers from your own data with citations.",
      "Automate repetitive internal work with AI-in-the-loop n8n workflows.",
      "Add senior AI + full-stack capacity for a fixed scope or monthly contract.",
    ],
    stack: [
      "OpenAI",
      "LangChain",
      "Python",
      "FastAPI",
      "Next.js",
      "TypeScript",
      "Pinecone",
      "n8n",
      "PostgreSQL",
      "Redis",
    ],
    projectIds: ["artificialmufti", "tekish", "sendora"],
    process: [
      {
        title: "Scope the AI use case",
        description:
          "We define the exact job the model should do, the data it needs, the quality bar, the budget, and how success is measured before writing code.",
      },
      {
        title: "Design the system",
        description:
          "I choose the model, retrieval strategy, prompts, tools, and guardrails, and plan evals so quality is measurable, not vibes.",
      },
      {
        title: "Build with demos and evals",
        description:
          "You get a working AI surface each cycle with test cases, cost tracking, and async updates aligned to a US or UK schedule.",
      },
      {
        title: "Launch and monitor",
        description:
          "I deploy it, add observability and cost controls, watch real usage, and tighten accuracy and latency after users hit it.",
      },
    ],
    faqs: [
      {
        question: "Can you build AI features that are actually production-ready?",
        answer:
          "Yes. I build the full-stack app around the model with caching, cost controls, evals, and observability — so the feature ships to users and stays reliable, not just works in a demo.",
      },
      {
        question: "Do you build RAG systems over private data?",
        answer:
          "Yes. I build ingestion, chunking, embeddings, and vector search so the product answers from your own documents with grounded, cited responses instead of hallucinations.",
      },
      {
        question: "Can you set up n8n automation for my team?",
        answer:
          "Yes. I build n8n workflows and AI-in-the-loop automations for data pipelines, internal ops, and repetitive tasks so a lean team can do more without extra headcount.",
      },
      {
        question: "Which models and tools do you work with?",
        answer:
          "OpenAI and other LLM providers, LangChain, vector databases like Pinecone, Python and FastAPI for AI services, and Next.js and Node.js for the product around them.",
      },
    ],
  },
];

export function getServicePage(slug: string) {
  return servicePages.find((page) => page.slug === slug);
}

export function buildServiceMetadata(slug: string) {
  const page = getServicePage(slug);
  if (!page) {
    throw new Error(`Missing service page: ${slug}`);
  }

  return createMetaData({
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    url: `${HOST}/${page.slug}`,
  });
}
