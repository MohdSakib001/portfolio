import {
  GITHUB_USERNAME,
  HOST,
  LINKEDIN_USERNAME,
  MOBILE_NUMBER,
  TWITTER_USERNAME,
  email,
} from "./constants";

/**
 * Single source of truth for every factual claim about the person behind this
 * site.
 *
 * Search engines and LLMs resolve an entity by cross-checking the same facts
 * repeated across pages and across the web. When those facts disagree the
 * entity fails to resolve, so every meta description, JSON-LD node, and OG
 * image must read from here — never restate a location, handle, or metric
 * inline.
 *
 * Keep these in sync with the LinkedIn, GitHub, and X profiles listed in
 * `SAME_AS`. Off-site agreement is what actually confirms the entity.
 */

export const NAME = "Mohd Sakib";
export const ALTERNATE_NAME = "Mohammad Sakib";
export const JOB_TITLE = "Senior Full Stack Developer";
export const TITLE = `${NAME} | Senior Full Stack & React Native Developer`;

export const LOCATION = {
  locality: "Delhi",
  region: "Delhi",
  country: "IN",
  /** Human-readable form for prose and meta descriptions. */
  label: "Delhi, India",
} as const;

/**
 * Headline metrics. Each must stay defensible against the per-project figures
 * in `data/projects.ts` — a schema claim that overstates a case study page is
 * an E-E-A-T liability, not a win.
 */
export const METRICS = {
  products: "8",
  users: "25,000+",
  /** Compact form for OG cards and social descriptions. Same figure as `users`. */
  usersShort: "25K+",
  /** Deliberately conservative. Per-project figures live on the case studies. */
  processed: "$100K+",
  lighthouse: "98",
} as const;

export const IMAGE = `${HOST}/assets/me/1.png`;

export const SAME_AS = [
  `https://github.com/${GITHUB_USERNAME}`,
  "https://github.com/mohdsakib-Krapton",
  `https://www.linkedin.com/in/${LINKEDIN_USERNAME}`,
  `https://twitter.com/${TWITTER_USERNAME}`,
];

export const CONTACT = {
  email,
  telephone: `+${MOBILE_NUMBER.slice(0, 2)}-${MOBILE_NUMBER.slice(2)}`,
};

export const ADDRESS_SCHEMA = {
  "@type": "PostalAddress",
  addressLocality: LOCATION.locality,
  addressRegion: LOCATION.region,
  addressCountry: LOCATION.country,
} as const;

/** Long-form description used by the Person node. */
export const BIO = `${JOB_TITLE} and React Native specialist based in ${LOCATION.label}. Architected ${METRICS.products} production-grade products across FinTech, EdTech, LegalTech, Gaming, and AI — serving ${METRICS.users} users and processing ${METRICS.processed} across FinTech and e-commerce systems. Core stack: Next.js, Node.js, React Native, TypeScript, PostgreSQL, Redis, AWS.`;

/** Short-form description used as the default meta description. */
export const META_DESCRIPTION = `Senior Full Stack Developer specializing in Next.js, Node.js, React Native, and AI systems. ${METRICS.products} live production products. ${METRICS.usersShort} users served. Available for senior full-time roles and high-stakes freelance — ${LOCATION.label}.`;

/**
 * Byline bio shown at the foot of every blog post.
 *
 * Every post is written by the same person, so this lives here rather than
 * being repeated per-post in `generatedBlogs.json`. The BlogPosting schema
 * points its `author` at `PERSON_ID` for the same reason — each post should
 * reinforce the one site-wide Person entity, not mint a detached one.
 */
export const AUTHOR_BIO = `Senior full-stack and React Native developer from ${LOCATION.label}. I build production web apps, mobile apps, and AI systems for founders and product teams in the US, UK, and beyond.`;

/** Punchy variant for OG/Twitter cards, where the snippet is truncated hard. */
export const SOCIAL_DESCRIPTION = `${METRICS.products} live production products. ${METRICS.usersShort} users. ${METRICS.lighthouse} Lighthouse. Next.js · Node.js · React Native · AI Systems.`;

/** Stable JSON-LD node identifiers, referenced across schema files. */
export const PERSON_ID = `${HOST}/#person`;
export const WEBSITE_ID = `${HOST}/#website`;
