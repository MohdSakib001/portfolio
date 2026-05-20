import { projects } from "./projects";

export const homeKeyword = [
  // Identity / Brand
  "Mohd Sakib",
  "Mohd Sakib developer",
  "Mohd Sakib portfolio",

  // Hiring Intent
  "hire full stack developer India",
  "hire senior React Native developer",
  "hire Next.js developer India",
  "full stack developer for hire",
  "senior full stack developer portfolio",
  "React developer available for hire",

  // Core Stack
  "Full Stack Developer India",
  "MERN stack developer",
  "React.js developer",
  "React Native developer",
  "Next.js developer",
  "Node.js developer India",
  "TypeScript developer",
  "JavaScript developer India",

  // Niche Technical
  "WebSocket Redis developer",
  "RAG pipeline developer",
  "AI systems developer India",
  "LLM integration developer",
  "microservices developer India",
  "GraphQL React Native developer",
  "real-time app developer",
  "WebRTC mobile developer",

  // Domain Verticals
  "SaaS developer India",
  "FinTech app developer India",
  "EdTech mobile app developer",
  "startup MVP developer",

  // General
  "freelance full stack developer India",
  "full stack developer portfolio",
  "web app development services India",
  "mobile app development React Native",
];

export const projectsKeyword = projects.flatMap((project) => {
  const architecture = Object.values(project.architecture || {});

  return [
    // Project
    `${project.name} project`,
    `${project.name} case study`,
    `${project.name} architecture`,
    `${project.name} tech stack`,
    `${project.name} system design`,

    // Tagline
    project.tagline,

    // Stack
    ...project.stack.map((tech) => `${tech} ${project.category} application`),

    // Features
    ...project.features.map((feature) => `${feature} implementation`),

    // Architecture
    ...architecture.map((item) => `${item} scalable architecture`),

    // Semantic SEO
    `${project.name} built with ${project.stack.join(", ")}`,

    `${project.name} scalable ${project.category} platform`,
  ];
});
