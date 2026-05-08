export const personSchema = () => {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://mohdsakib.vercel.app/#person",

    name: "Mohd Sakib",
    url: "https://mohdsakib.vercel.app",
    image: "https://mohdsakib.vercel.app/assets/me/1.png",
    jobTitle: "Senior Full Stack Developer",

    description:
      "Senior Full Stack Developer and React Native specialist based in Meerut, India. Architected 8 production-grade products across FinTech, EdTech, LegalTech, Gaming, and AI — serving 25,000+ users and processing $100K+ in transactions. Core stack: Next.js, Node.js, React Native, TypeScript, PostgreSQL, Redis, AWS.",

    address: {
      "@type": "PostalAddress",
      addressLocality: "Meerut",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },

    email: "mohdsakib.work@gmail.com",
    telephone: "+91-8800132527",

    sameAs: [
      "https://github.com/mohdsakib-Krapton",
      "https://www.linkedin.com/in/mohdsakib001",
      "https://twitter.com/mohdsakib001",
    ],

    knowsAbout: [
      "MERN Stack",
      "React.js",
      "React Native",
      "Next.js",
      "Node.js",
      "TypeScript",
      "Redux",
      "Tailwind CSS",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Docker",
      "AWS",
      "Kubernetes",
      "GraphQL",
      "WebSockets",
      "Firebase",
      "Python",
      "FastAPI",
      "RAG Pipelines",
      "LLM Integration",
      "Vector Databases",
      "Pinecone",
      "LangChain",
      "Kafka",
      "Microservices Architecture",
      "System Design",
      "Frontend Development",
      "Full Stack Development",
      "Mobile App Development",
      "REST APIs",
      "Performance Optimization",
      "Core Web Vitals",
      "CI/CD",
    ],

    hasOccupation: {
      "@type": "Occupation",
      name: "Senior Full Stack Developer",
      occupationalCategory: "15-1252.00",
      skills: [
        "React.js",
        "Node.js",
        "React Native",
        "Next.js",
        "TypeScript",
        "PostgreSQL",
        "Redis",
        "AWS",
        "System Design",
        "AI/LLM Integration",
      ],
    },
  });
};
