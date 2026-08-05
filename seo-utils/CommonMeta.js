import { HOST, TWITTER_USERNAME } from "@/data/constants";
import { META_DESCRIPTION, NAME, TITLE } from "@/data/profile";

/**
 * Shared metadata builder.
 *
 * `image` defaults to the generated card from `app/opengraph-image.tsx`.
 *
 * It has to be set explicitly rather than left to the file convention: a page
 * that defines `openGraph` at all *replaces* the parent segment's openGraph
 * block instead of merging with it, so every route outside the root segment
 * would otherwise ship no `og:image` whatsoever. Pass `image` only when a page
 * has a genuinely better one of its own (e.g. a blog cover).
 *
 * @param {{
 *   url?: string,
 *   title?: string,
 *   description?: string,
 *   keywords?: string[],
 *   image?: string,
 * }} [options]
 */
export const createMetaData = ({
  url = `${HOST}`,
  title = TITLE,
  description = META_DESCRIPTION,
  keywords = [
    "Mohd Sakib",
    "Mohd Sakib developer",
    "Senior Full Stack Developer India",
    "hire full stack developer India",
    "React Native developer",
    "Next.js developer",
    "MERN stack developer",
    "Node.js developer India",
    "TypeScript developer",
    "AI systems developer India",
    "RAG pipeline developer",
    "microservices developer India",
    "SaaS developer India",
    "FinTech app developer India",
    "startup MVP developer",
    "freelance full stack developer India",
    "full stack developer portfolio",
    "mobile app development React Native",
  ],
  image = `${HOST}/opengraph-image`,
} = {}) => {
  const images = [
    {
      url: image,
      width: 1200,
      height: 630,
      alt: `${NAME} — Senior Full Stack & React Native Developer`,
    },
  ];

  return {
    metadataBase: new URL(HOST),

    title: {
      default: title,
      template: `%s | ${NAME}`,
    },

    description,
    keywords,
    alternates: {
      canonical: url,
    },

    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: `${NAME} — Portfolio`,
      images,
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: `@${TWITTER_USERNAME}`,
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
};
