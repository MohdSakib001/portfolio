import { HOST } from "@/app/data/constants";

export const createMetaData = ({
  url = `${HOST}`,
  title = `Mohd Sakib | Senior Full Stack & React Native Developer`,
  description = `Senior Full Stack Developer specializing in Next.js, Node.js, React Native, and AI systems. 8 live production products. 25K+ users served. Available for senior full-time roles and high-stakes freelance — Meerut, India.`,
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
  image = "https://mohdsakib.vercel.app/assets/custom_icons/logo-full.png",
} = {}) => {
  return {
    metadataBase: new URL("https://mohdsakib.vercel.app"),

    title: {
      default: title,
      template: "%s | Mohd Sakib",
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
      siteName: "Mohd Sakib — Portfolio",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: "Mohd Sakib — Senior Full Stack & React Native Developer",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@mohdsakib001",
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

    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
  };
};
