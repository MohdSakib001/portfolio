import { Project } from "../projects";

export const projects: Project[] = [
  {
    id: "stakeclash",
    name: "StakeClash",
    tagline:
      "Real-time competitive gaming and decentralized wagering ecosystem",
    category: "client",
    hero: {
      type: "image",
      src: "/assets/projects/stakeclash/stakeclash.webp",
    },
    gallery: [
      { type: "image", src: "/assets/projects/stakeclash/stakeclash.webp" },
      { type: "image", src: "/assets/projects/stakeclash/stakeclash2.webp" },
      { type: "image", src: "/assets/projects/stakeclash/stakeclash3.webp" },
      { type: "image", src: "/assets/projects/stakeclash/stakeclash4.png" },
      { type: "image", src: "/assets/projects/stakeclash/stakeclash5.png" },
      { type: "image", src: "/assets/projects/stakeclash/stakeclash6.png" },
    ],
    overview: {
      problem:
        "Lack of fair, low-latency infrastructure for skill-based gaming and micro-transactions — existing solutions suffered from session affinity problems under horizontal load and had no validated anti-cheat layer.",
      solution:
        "Designed a stateless real-time sync layer using Redis pub/sub as the message broker between geographically distributed Node.js instances, chosen over a monolithic Socket.io setup to enable horizontal scaling without session stickiness. Implemented API-gateway-level anti-cheat validation to intercept and invalidate tampered payloads before they reach game state.",
      myRole: "Lead Full-Stack & System Design Engineer",
      timeline: "4 months",
    },
    metrics: {
      users: "1K+ MAU",
      revenue: "$12K MRR",
      performance: "99 Lighthouse",
      scale: "200+ concurrent",
    },
    achievements: [
      "Reduced p99 socket latency from 180ms to 72ms by replacing a centralized Socket.io topology with a Redis pub/sub mesh across geographically distributed Node.js instances — eliminating cross-region relay hops.",
      "Implemented stateless anti-cheat validation at the API gateway layer using HMAC-signed game-state snapshots, blocking payload tampering before it reaches the match engine — with zero false positives in 3 months of production.",
    ],
    stack: ["Next.js", "React Native", "Node.js", "Redis", "WebSockets"],
    architecture: {
      frontend: "Next.js & React Native",
      backend: "Node.js (Express) & Redis",
      realtime: "Socket.io",
      infra: "AWS EC2 & Load Balancers",
    },
    features: [
      "Live Multiplayer Matches",
      "Wallet Integration",
      "Real-time Leaderboards",
    ],
    links: {
      live: "https://stakeclash.com",
      webapp: "https://app.stakeclash.com",
      website: "https://stakeclash.com",
    },
  },
  {
    id: "artificialmufti",
    name: "Artificial Mufti",
    tagline: "AI-powered comprehensive Islamic knowledge and guidance platform",
    category: "startup",
    hero: {
      type: "image",
      src: "/assets/projects/artificialmufti/9.png",
    },
    gallery: [
      { type: "image", src: "/assets/projects/artificialmufti/1.png" },
      { type: "image", src: "/assets/projects/artificialmufti/2.png" },
      { type: "image", src: "/assets/projects/artificialmufti/3.png" },
      { type: "image", src: "/assets/projects/artificialmufti/4.png" },
      { type: "image", src: "/assets/projects/artificialmufti/5.png" },
      { type: "image", src: "/assets/projects/artificialmufti/6.png" },
      { type: "image", src: "/assets/projects/artificialmufti/7.png" },
      { type: "image", src: "/assets/projects/artificialmufti/8.png" },
      { type: "image", src: "/assets/projects/artificialmufti/9.png" },
    ],
    overview: {
      problem:
        "Traditional search engines return surface-level or contradictory Islamic rulings — the domain requires nuanced, source-verified answers referencing classical jurisprudence, which keyword search cannot provide.",
      solution:
        "Built a two-stage RAG pipeline in Python/FastAPI: a retrieval confidence scorer filters low-certainty chunks before LLM inference, and a post-generation validation layer cross-references responses against the source corpus using cosine similarity thresholds — reducing hallucinations without increasing latency.",
      myRole: "AI Solutions Architect & Full-Stack Developer",
      timeline: "6 months",
    },
    metrics: {
      users: "500+ DOWNLOADS",
      revenue: "$2K MRR",
      performance: "98 Lighthouse",
      scale: "200+ Daily Active Users",
    },
    achievements: [
      "Engineered a two-stage prompt-validation pipeline (retrieval confidence scoring + post-generation cross-reference check) that reduced hallucination rate from 18% to 9.9% on an internal evaluation benchmark — critical for a domain where factual precision is non-negotiable.",
      "Achieved <800ms average response time for complex semantic vector searches across a 500K+ document corpus in Pinecone by implementing hybrid dense-sparse retrieval and async SSE streaming — users see tokens within 400ms.",
    ],
    stack: [
      "Next.js",
      "React Native",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Pinecone",
    ],
    architecture: {
      frontend: "Next.js (App Router)",
      backend: "Python / FastAPI",
      realtime: "Server-Sent Events (SSE)",
      infra: "AWS ECS & Vercel",
    },
    features: [
      "Contextual Semantic Search",
      "Multilingual NLP Chatbot",
      "Fatwa Verification Engine",
    ],
    links: {
      live: "https://artificialmufti.com",
      webapp: "https://artificialmufti.com",
      website: "https://artificialmufti.com",
      github: "https://github.com/MohdSakib001/artificialmufti",
      playstore:
        "https://play.google.com/store/apps/details?id=com.artificialmufti",
      appstore: "https://apps.apple.com/us/app/artificial-mufti/id6758575342",
    },
  },
  {
    id: "pademi",
    name: "Pademi",
    tagline: "Interactive EdTech and Social Learning Mobile Platform",
    category: "client",
    hero: {
      type: "image",
      src: "/assets/projects/pademi/pademi10.png",
    },
    gallery: [
      { type: "image", src: "/assets/projects/pademi/pademi1.png" },
      { type: "image", src: "/assets/projects/pademi/pademi2.png" },
      { type: "image", src: "/assets/projects/pademi/pademi3.png" },
      { type: "image", src: "/assets/projects/pademi/pademi4.png" },
      { type: "image", src: "/assets/projects/pademi/pademi5.webp" },
      { type: "image", src: "/assets/projects/pademi/pademi6.webp" },
      { type: "image", src: "/assets/projects/pademi/pademi7.webp" },
      { type: "image", src: "/assets/projects/pademi/pademi8.webp" },
      { type: "image", src: "/assets/projects/pademi/pademi9.webp" },
      { type: "image", src: "/assets/projects/pademi/pademi10.png" },
    ],
    overview: {
      problem:
        "Remote learning platforms suffered 60%+ drop-off rates because video tools, assignments, quizzes, and messaging lived in separate apps — forcing students to context-switch constantly and losing engagement in the gaps.",
      solution:
        "Built a unified Flutter application with gRPC streams as the transport layer for real-time events (presence, quiz scores, chat) — chosen over REST polling because gRPC bidirectional streaming cut server-push latency from 800ms to under 80ms. Implemented an offline-first SQLite sync engine with conflict resolution so students can download course content and complete quizzes without internet, syncing when reconnected.",
      myRole: "Lead Mobile Developer (Flutter/React Native)",
      timeline: "5 months",
    },
    metrics: {
      users: "25K+ Students",
      revenue: "Enterprise B2B",
      performance: "Highly Optimized",
      scale: "Nationwide Deployment",
    },
    achievements: [
      "Integrated WebRTC video streaming for live classrooms with adaptive bitrate fallback — the stream degrades gracefully from 720p to 360p at 500Kbps rather than dropping entirely, keeping 91% of students in-session during low-connectivity conditions across rural India.",
      "Architected an offline-first sync engine using SQLite with a custom merge strategy for quiz state — students complete assessments offline and sync on reconnect with zero data loss, eliminating the 34% quiz abandonment rate caused by connectivity drops.",
    ],
    stack: ["Flutter", "Nextjs", "gRPC", "Firebase", "WebRTC"],
    architecture: {
      frontend: "Flutter & Dart",
      backend: "Nestjs & Firebase Functions",
      realtime: "gRPC Streams",
      infra: "Google Cloud Platform",
    },
    features: [
      "Live Video Classrooms",
      "Interactive Quizzes",
      "Offline Course Sync",
    ],
    links: {
      live: "https://pademi.io",
      playstore:
        "https://play.google.com/store/apps/details?id=com.meetminds.app",
      appstore: "https://apps.apple.com/us/app/pademi/id6742840788",
    },
  },
  {
    id: "techs",
    name: "Techs",
    tagline: "Comprehensive IT Infrastructure & Operations Dashboard",
    category: "client",
    hero: {
      type: "image",
      src: "/assets/projects/techs/techs.png",
    },
    gallery: [
      { type: "image", src: "/assets/projects/techs/techs.png" },
      { type: "image", src: "/assets/projects/techs/techs2.png" },
      { type: "image", src: "/assets/projects/techs/techs3.png" },
      { type: "image", src: "/assets/projects/techs/techs4.png" },
    ],
    overview: {
      problem:
        "The enterprise IT team was juggling 4 separate tools (Grafana, Kibana, a custom alerting script, and Slack for escalation) — context-switching between them added 12+ minutes to mean-time-to-resolution during incidents.",
      solution:
        "Built a single Vue.js observability dashboard that queries Elasticsearch directly via a Spring Boot aggregation API, reducing the query path from 4 hops to 1. Implemented virtual scrolling for log streams and Web Workers for off-thread JSON parsing — keeping the main thread unblocked while rendering 10K+ log entries per second.",
      myRole: "Frontend & Platform Engineer",
      timeline: "7 months",
    },
    metrics: {
      users: "Internal IT Teams",
      revenue: "Cost-Saver",
      performance: "Sub-second Queries",
      scale: "Millions of Logs/Day",
    },
    achievements: [
      "Implemented virtual scrolling for live telemetry feeds rendering 10,000+ log entries/second — offloading JSON parsing to Web Workers so the main thread stays unblocked, eliminating the UI freezes that were causing engineers to miss alert spikes during high-load events.",
      "Consolidated 4 observability tools into one dashboard, reducing mean-time-to-resolution by 40% (from 18 minutes to 11 minutes) by eliminating context-switching between Grafana, Kibana, and the custom alerting script during incident response.",
    ],
    stack: ["Vue.js", "Spring Boot", "Elasticsearch", "Kubernetes", "MySQL"],
    architecture: {
      frontend: "Vue.js & Tailwind",
      backend: "Java Spring Boot",
      realtime: "Polling & Webhooks",
      infra: "On-Premises Kubernetes",
    },
    features: [
      "Telemetry Visualizations",
      "Alerting Engine",
      "Log Aggregation",
    ],
    links: {
      live: "#",
    },
  },
  {
    id: "sendora",
    name: "Sendora",
    tagline:
      "Secure and seamless FinTech application for cross-border remittances",
    category: "startup",
    hero: {
      type: "image",
      src: "/assets/projects/sendora/sendora1.webp",
    },
    gallery: [
      { type: "image", src: "/assets/projects/sendora/sendora1.webp" },
      { type: "image", src: "/assets/projects/sendora/sendora2.webp" },
      { type: "image", src: "/assets/projects/sendora/sendora3.webp" },
      { type: "image", src: "/assets/projects/sendora/sendora4.webp" },
    ],
    overview: {
      problem:
        "International P2P transfers carry 3–7% fees and 1–3 day settlement times on traditional rails. The compliance surface (KYC, AML, PCI-DSS) also blocks most small FinTech teams from shipping fast.",
      solution:
        "Built a Kafka event-sourced microservices architecture where each transaction is an immutable ledger event — enabling full auditability and replay without touching mutable state. AES-256 field-level encryption on PII and financial data with AWS KMS key rotation satisfies PCI-DSS requirement 3.4 without full-database encryption overhead.",
      myRole: "Mobile & Backend Systems Engineer",
      timeline: "8 months",
    },
    metrics: {
      users: "10K+ Installs",
      revenue: "$50K+ Processed",
      performance: "60fps App Rendering",
      scale: "Microservices Architecture",
    },
    achievements: [
      "Designed the transaction ledger with AES-256 field-level encryption and AWS KMS key rotation satisfying PCI-DSS requirement 3.4 — avoiding the 30–40% performance penalty of full-database encryption while maintaining full compliance audit trails via Kafka event sourcing.",
      "Eliminated React Native JS thread blocking by offloading currency conversion animations to the native thread using Reanimated v3 worklets, achieving consistent 60fps on mid-range Android devices — previously dropping to 22fps on the same hardware.",
    ],
    stack: ["React Native", "NestJS", "GraphQL", "PostgreSQL", "Kafka"],
    architecture: {
      frontend: "React Native (CLI)",
      backend: "NestJS Microservices",
      realtime: "WebSockets & Hooks",
      infra: "AWS EKS & RDS",
    },
    features: [
      "Instant Global Transfers",
      "Multi-Currency Wallets",
      "Biometric Authentication",
    ],
    links: {
      live: "#",
      playstore: "#",
      appstore: "#",
    },
  },
  {
    id: "colaw",
    name: "CoLaw",
    tagline: "Enterprise LegalTech Case Management and Collaboration Tool",
    category: "client",
    hero: {
      type: "image",
      src: "/assets/projects/colaw/colaw1.webp",
    },
    gallery: [
      { type: "image", src: "/assets/projects/colaw/colaw1.webp" },
      { type: "image", src: "/assets/projects/colaw/colaw2.webp" },
      { type: "image", src: "/assets/projects/colaw/colaw3.webp" },
      { type: "image", src: "/assets/projects/colaw/colaw4.webp" },
      { type: "image", src: "/assets/projects/colaw/colaw5.webp" },
    ],
    overview: {
      problem:
        "Law firms handle sensitive case documents across email threads, shared drives, and WhatsApp — creating version-control chaos and GDPR exposure. Junior associates could accidentally access privileged partner-client communications with no audit trail.",
      solution:
        "Built a role-based access control system where document permissions are enforced at the API layer (not just the UI) using JWT claims scoped to case-file hierarchies. All documents are encrypted at rest with AES-256 and in transit via TLS 1.3. Socket.io powers the real-time audit log, emitting every view, edit, and download event to an immutable append-only Mongo collection.",
      myRole: "Full-Stack Software Engineer",
      timeline: "6 months",
    },
    metrics: {
      users: "200+ Firms",
      revenue: "$15K+ MRR",
      performance: "End-to-end Encrypted",
      scale: "100GB+ Daily Data",
    },
    achievements: [
      "Designed a Redux Toolkit-based optimistic update system for collaborative document editing — local state reflects changes instantly while the server confirms async, making the editor feel instantaneous even at 300ms network latency, without race conditions on concurrent edits.",
      "Automated CI/CD pipelines with GitHub Actions + Docker Compose, reducing average deployment time from 45 minutes (manual SSH + restart) to under 8 minutes — a 70% reduction in deployment friction that enabled the team to ship hotfixes without a maintenance window.",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "Docker"],
    architecture: {
      frontend: "React & Redux Toolkit",
      backend: "Node.js & Express",
      realtime: "Socket.io",
      infra: "AWS S3 & Docker Containers",
    },
    features: [
      "Secure Document Vault",
      "Real-time Auditing",
      "Role-based Access Control (RBAC)",
    ],
    links: {
      live: "#",
    },
  },
  {
    id: "tekish",
    name: "Tekish",
    tagline: "Modern High-Performance E-Commerce & Order Ecosystem",
    category: "startup",
    hero: {
      type: "image",
      src: "/assets/projects/tekish/th1.webp",
    },
    gallery: [
      { type: "image", src: "/assets/projects/tekish/th1.webp" },
      { type: "image", src: "/assets/projects/tekish/th2.webp" },
      { type: "image", src: "/assets/projects/tekish/th3.webp" },
      { type: "image", src: "/assets/projects/tekish/th4.webp" },
    ],
    overview: {
      problem:
        "The monolithic PHP storefront had a 4.8s LCP and couldn't handle Black Friday traffic spikes — resulting in a 34% cart abandonment rate and $18K in lost revenue during the previous peak season.",
      solution:
        "Migrated to a headless architecture: Next.js ISR for product pages (rebuilt every 60s) + serverless Node.js functions for checkout. Redis-backed inventory reservation with a 10-minute TTL prevents overselling under concurrent load without database lock contention. Deployed to Vercel Edge across 30+ regions for sub-10ms TTFB globally.",
      myRole: "Lead Full-Stack Web Developer",
      timeline: "4 months",
    },
    metrics: {
      users: "50K+ Monthly Shoppers",
      revenue: "$100K+ GMV/mo",
      performance: "100 Core Web Vitals",
      scale: "Multi-Region Edge",
    },
    achievements: [
      "Reduced LCP from 4.8s to 1.2s by replacing server-rendered PHP pages with Next.js ISR + Vercel Edge — a 75% improvement that directly correlated with a 22% lift in checkout conversion rate (measured via A/B test over 30 days).",
      "Designed a Redis-backed inventory reservation system with optimistic locking and TTL-based expiry, eliminating oversell errors under 200+ concurrent checkout attempts without introducing database row locks — previously causing transaction timeouts during flash sales.",
    ],
    stack: ["Next.js", "TypeScript", "Node.js", "Redis", "Stripe"],
    architecture: {
      frontend: "Next.js Static/ISR",
      backend: "Node.js Serverless Functions",
      realtime: "Webhooks",
      infra: "Vercel Edge Network",
    },
    features: [
      "Headless Commerce",
      "Frictionless Checkout",
      "Inventory Tracking",
    ],
    links: {
      live: "#",
    },
  },
  {
    id: "teppe",
    name: "Teppe",
    tagline: "Next-Gen PropTech and Real Estate Management Platform",
    category: "client",
    hero: {
      type: "image",
      src: "/assets/projects/teppe/teppe1.webp",
    },
    gallery: [
      { type: "image", src: "/assets/projects/teppe/teppe1.webp" },
      { type: "image", src: "/assets/projects/teppe/teppe2.webp" },
      { type: "image", src: "/assets/projects/teppe/teppe3.webp" },
      { type: "image", src: "/assets/projects/teppe/teppe4.webp" },
    ],
    overview: {
      problem:
        "Listing thousands of properties on a single Mapbox canvas caused severe frame drops — the native Mapbox clustering was dropping to 8fps when panning over dense metro areas with 5,000+ markers. Landlord-tenant communication was also scattered across WhatsApp and email with no audit trail.",
      solution:
        "Built a custom SuperCluster integration in React Native Expo that pre-clusters property pins at multiple zoom tiers on a background thread, feeding only visible cluster groups to the map renderer — eliminating the per-frame clustering computation that caused the stuttering. GraphQL subscriptions (via Hasura) power the in-app chat with real-time delivery receipts and read status.",
      myRole: "Mobile Developer & Architect",
      timeline: "5 months",
    },
    metrics: {
      users: "15K+ Active Tenants",
      revenue: "SaaS Subscriptions",
      performance: "Highly Responsive",
      scale: "Thousands of Properties",
    },
    achievements: [
      "Built a custom SuperCluster map rendering pipeline that pre-computes pin clusters off the main thread, reducing map panning from 8fps to a consistent 60fps across 5,000+ property markers in dense metro areas — making property discovery feel native rather than janky.",
      "Integrated Hasura GraphQL subscriptions for live tenant-landlord messaging with delivery receipts and read status — replacing WhatsApp as the communication channel and creating a full audit trail for dispute resolution, a key SaaS differentiator for property management companies.",
    ],
    stack: ["React Native", "Node.js", "GraphQL", "Hasura", "Mapbox"],
    architecture: {
      frontend: "React Native (Expo)",
      backend: "Node.js & Hasura Engine",
      realtime: "GraphQL Subscriptions",
      infra: "AWS & Mapbox API",
    },
    features: [
      "Interactive Map Search",
      "In-App Messaging",
      "Automated Rent Collection",
    ],
    links: {
      live: "#",
      playstore: "#",
      appstore: "#",
    },
  },
];
