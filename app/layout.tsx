import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { lazy, Suspense } from "react";
import { getHeaderBlogs } from "@/data/blogs";
import { siteGraph } from "@/seo-utils/siteGraph";
import { HOST, TWITTER_USERNAME } from "@/data/constants";
import {
  META_DESCRIPTION,
  NAME,
  SOCIAL_DESCRIPTION,
  TITLE,
} from "@/data/profile";

const Header = lazy(() => import("@/components/Header"));
const Footer = lazy(() => import("@/components/Footer"));

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(HOST),
  title: {
    default: TITLE,
    template: `%s | ${NAME}`,
  },
  description: META_DESCRIPTION,
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
  authors: [{ name: NAME, url: HOST }],
  creator: NAME,
  publisher: NAME,
  openGraph: {
    title: TITLE,
    description: SOCIAL_DESCRIPTION,
    type: "profile",
    locale: "en_US",
    siteName: `${NAME} — Portfolio`,
    url: HOST,
  },
  twitter: {
    title: TITLE,
    description: SOCIAL_DESCRIPTION,
    card: "summary_large_image",
    creator: `@${TWITTER_USERNAME}`,
    site: `@${TWITTER_USERNAME}`,
  },
  alternates: {
    canonical: HOST,
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
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased`}
    >
      <head>
        <meta
          name="google-site-verification"
          content="9vDfvwY7xOZFjDqlrT_qMTgdnIyX37sKts4MnS6dYNs"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Suspense fallback={null}>
          <Header featuredBlogs={getHeaderBlogs(5)} />
        </Suspense>
        {children}
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
        {/*
          Canonical Person + WebSite entity graph. Declared once here so it
          covers every route — including the tool pages, which previously had
          no Person node at all. Individual pages must not re-declare it.
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: siteGraph() }}
        />
      </body>
    </html>
  );
}
