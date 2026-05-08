import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mohdsakib.vercel.app"),
  title: {
    default: "Mohd Sakib | Senior Full Stack & React Native Developer",
    template: "%s | Mohd Sakib",
  },
  description:
    "Senior Full Stack Developer specializing in Next.js, Node.js, React Native, and AI systems. 8 live production products. 25K+ users served. Available for senior full-time roles and high-stakes freelance — Meerut, India.",
  keywords: [
    "Mohd Sakib",
    "Senior Full Stack Developer India",
    "React Native Developer",
    "Next.js Developer",
    "MERN Stack Developer",
    "hire full stack developer India",
    "AI systems developer",
    "Node.js developer India",
  ],
  authors: [{ name: "Mohd Sakib", url: "https://mohdsakib.vercel.app" }],
  creator: "Mohd Sakib",
  publisher: "Mohd Sakib",
  openGraph: {
    title: "Mohd Sakib | Senior Full Stack & React Native Developer",
    description:
      "8 live production products. 25K+ users. 98 Lighthouse. Next.js · Node.js · React Native · AI Systems.",
    type: "profile",
    locale: "en_US",
    siteName: "Mohd Sakib — Portfolio",
    url: "https://mohdsakib.vercel.app",
  },
  twitter: {
    title: "Mohd Sakib | Senior Full Stack & React Native Developer",
    description:
      "8 live production products. 25K+ users. 98 Lighthouse. Next.js · Node.js · React Native · AI Systems.",
    card: "summary_large_image",
    creator: "@mohdsakib001",
    site: "@mohdsakib001",
  },
  alternates: {
    canonical: "https://mohdsakib.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta
          name="google-site-verification"
          content="9vDfvwY7xOZFjDqlrT_qMTgdnIyX37sKts4MnS6dYNs"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <SmoothScroll>{children}</SmoothScroll>
        {/* JSON-LD Structured Data for robust SEO crawling */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": "https://mohdsakib.vercel.app/#person",
              name: "Mohd Sakib",
              url: "https://mohdsakib.vercel.app",
              image: "https://mohdsakib.vercel.app/assets/me/1.png",
              jobTitle: "Senior Full Stack Developer",
              description:
                "Senior Full Stack Developer and React Native specialist. Architected 8 production-grade products across FinTech, EdTech, LegalTech, Gaming, and AI — serving 25,000+ users and processing $100K+ in transactions. Core stack: Next.js, Node.js, React Native, TypeScript, PostgreSQL, Redis, AWS.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Meerut",
                addressRegion: "Uttar Pradesh",
                addressCountry: "IN",
              },
              email: "mohdsakib.work@gmail.com",
              sameAs: [
                "https://github.com/mohdsakib-Krapton",
                "https://www.linkedin.com/in/mohdsakib001",
                "https://twitter.com/mohdsakib001",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
