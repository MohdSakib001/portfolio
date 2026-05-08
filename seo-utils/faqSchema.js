export const faqsData = [
  {
    question: "Is Mohd Sakib available for full-time employment or freelance contracts?",
    answer: "Yes — I am currently open to senior full-time roles and high-stakes freelance contracts. I'm based in Meerut, India and work remotely across time zones. Reach out at mohdsakib.work@gmail.com to discuss opportunities.",
  },
  {
    question: "What tech stack does Mohd Sakib specialize in?",
    answer: "My core stack is Next.js, Node.js, React Native, TypeScript, and PostgreSQL. I have production experience with Redis (pub/sub, caching), WebSockets, GraphQL, Kafka, Docker, AWS (EC2, ECS, EKS, S3), Python/FastAPI, and AI/LLM systems including RAG pipelines with LangChain, Pinecone, and pgvector. I choose tools based on the problem, not preference.",
  },
  {
    question: "What kind of products has Mohd Sakib shipped in production?",
    answer: "I've architected and shipped 8 production-grade products: FinTech (Sendora — cross-border remittances, PCI-DSS compliant, $50K+ processed), EdTech (Pademi — 25K+ students, WebRTC live classrooms), Gaming (StakeClash — real-time wagering, $12K MRR, 200+ concurrent users), LegalTech (CoLaw — 200+ law firms, $15K+ MRR, 100GB+ daily data), E-Commerce (Tekish — $100K+ GMV/month, 50K+ monthly shoppers), and AI (Artificial Mufti — RAG system with 45% hallucination reduction, 200+ DAU).",
  },
  {
    question: "Can Mohd Sakib lead technical architecture and system design decisions?",
    answer: "Yes. Across every project I've owned full system design decisions — from stateless WebSocket architectures with Redis pub/sub for horizontal scaling, to Kafka event-sourced microservices for FinTech compliance, to multi-stage RAG pipeline design with vector reranking. I've set up containerized Kubernetes deployments, automated CI/CD pipelines reducing deployment friction by 70%, and made explicit technology-tradeoff decisions documented in each case study.",
  },
  {
    question: "What performance standards does Mohd Sakib build to?",
    answer: "I treat performance as a business requirement, not an afterthought. My portfolio itself scores 98 on Lighthouse with LCP 1.2s, INP 38ms, and CLS 0.01. Across client work: improved LCP by 2.1s on Tekish (boosting conversions 22%), achieved sub-72ms p99 socket latency on StakeClash, reduced React Native bundle size by 88%, maintained 60fps rendering on Sendora's fintech flows, and cut INP by 90% through React concurrency and dynamic code splitting.",
  },
];

export const faqSchema = () => {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqsData.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  });
};
