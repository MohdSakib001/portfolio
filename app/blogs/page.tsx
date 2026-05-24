import Blogs from "@/components/pages/blogs/page";
import { blogs } from "@/data/blogs";
import { HOST } from "@/data/constants";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { personSchema } from "@/seo-utils/personSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { webPageSchema } from "@/seo-utils/webPageSchema";

const url = `${HOST}/blogs`;
const title = "Blogs | Mohd Sakib";
const description =
  "Engineering notes on AI systems, React Native, Next.js, automation, hiring, product architecture, and practical software delivery.";
const keywords = [
  "Mohd Sakib blog",
  "software engineering blog",
  "AI systems",
  "React Native",
  "Next.js",
  "automation",
  "developer hiring",
];

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function BlogsPage() {
  const categories = Array.from(new Set(blogs.map((blog) => blog.category)));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: webPageSchema(title, description, url),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: personSchema() }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: siteNavigationElement() }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadCrumbSchema(title, HOST, url) }}
      />

      <Blogs blogs={blogs} categories={categories} />
    </>
  );
}
