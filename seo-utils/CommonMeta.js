import { HOST } from "@/app/data/constants";

export const createMetaData = ({
  url = `${HOST}`,
  title = `Mohd Sakib | Full Stack Developer (MERN, React, React Native)`,
  description = `Mohd Sakib is a Full Stack Developer specializing in MERN stack, React.js, and React Native. I build scalable web and mobile apps, high-performance UI, and production-ready solutions for startups and businesses.`,
  keywords = [
    "Mohd Sakib developer",
    "Full Stack Developer India",
    "MERN stack developer",
    "React developer portfolio",
    "React Native developer",
    "Frontend developer React.js",
    "JavaScript developer India",
    "Freelance web developer India",
    "App developer React Native",
    "Hire MERN developer",
    "Next.js developer",
    "Redux developer",
    "Tailwind CSS developer",
    "Firebase developer",
    "Web app development services",
    "Mobile app development services",
    "Startup MVP developer",
    "Portfolio React developer",
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
      siteName: "Mohd Sakib Portfolio",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: "Mohd Sakib Full Stack Developer Portfolio",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
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
