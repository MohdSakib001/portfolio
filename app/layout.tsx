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
  title: "Mohd Sakib | Portfolio | Full Stack Developer | React Native Developer",
  description: "Portfolio of Mohd Sakib, a Full Stack Developer and React Native Developer",
  keywords: ["Mohd Sakib", "Portfolio", "Full Stack Developer", "React Native Developer"],
  authors: [{ name: "Mohd Sakib" }],
  creator: "Mohd Sakib",
  publisher: "Mohd Sakib",
  openGraph: {
    title: "Mohd Sakib | Portfolio | Full Stack Developer | React Native Developer",
    description: "Portfolio of Mohd Sakib, a Full Stack Developer and React Native Developer",
    type: "website",
    locale: "en_US",
    siteName: "Mohd Sakib | Portfolio | Full Stack Developer | React Native Developer",
  },
  twitter: {
    title: "Mohd Sakib | Portfolio | Full Stack Developer | React Native Developer",
    description: "Portfolio of Mohd Sakib, a Full Stack Developer and React Native Developer",
    card: "summary_large_image",
    creator: "@mohdsakib",
    site: "@mohdsakib",
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
      <body className="min-h-full flex flex-col">
        <SmoothScroll>
          {children}
        </SmoothScroll>
        {/* JSON-LD Structured Data for robust SEO crawling */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Mohd Sakib",
              "url": "https://mohdsakib.com", // Replace with production URL when ready
              "jobTitle": "Full Stack Developer",
              "description": "Portfolio of Mohd Sakib, a Full Stack Developer and React Native Developer specializing in high-performance web and mobile applications.",
              "sameAs": [
                "https://github.com/MohdSakib001" // Feel free to inject actual linkedin/twitter links here later
              ]
            })
          }}
        />
      </body>
    </html>
  );
}
