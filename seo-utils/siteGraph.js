import { HOST } from "@/data/constants";
import {
  ADDRESS_SCHEMA,
  ALTERNATE_NAME,
  BIO,
  CONTACT,
  IMAGE,
  JOB_TITLE,
  NAME,
  PERSON_ID,
  SAME_AS,
  WEBSITE_ID,
} from "@/data/profile";

/**
 * The canonical entity graph for the whole site — emitted exactly once, in the
 * root layout, so it applies to every page including the tools.
 *
 * Two nodes are declared here and referenced by `@id` everywhere else:
 *
 *   - `#person`  — the Person that every page's `publisher` points at.
 *   - `#website` — previously referenced by `webPageSchema`'s `isPartOf` but
 *                  never actually defined, leaving a dangling reference.
 *
 * Do not re-declare either node on individual pages. Two nodes sharing one
 * `@id` with different properties is worse for entity resolution than a single
 * imperfect node.
 */
export const siteGraph = () => {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: NAME,
        alternateName: ALTERNATE_NAME,
        url: HOST,
        image: IMAGE,
        jobTitle: JOB_TITLE,
        description: BIO,
        address: ADDRESS_SCHEMA,
        email: CONTACT.email,
        telephone: CONTACT.telephone,
        sameAs: SAME_AS,
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
          name: JOB_TITLE,
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
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: `${NAME} — Portfolio`,
        url: HOST,
        inLanguage: "en-US",
        publisher: { "@id": PERSON_ID },
      },
    ],
  });
};
