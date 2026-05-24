import { notFound } from "next/navigation";

import BlogDetail from "@/components/pages/blogs/blog/page";
import {
  blogs,
  getBlogBySlug,
  getRelatedBlogs,
} from "@/data/blogs";
import { HOST } from "@/data/constants";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { personSchema } from "@/seo-utils/personSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { webPageSchema } from "@/seo-utils/webPageSchema";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog) return {};

  const url = `${HOST}/blogs/${blog.slug}`;
  const title = blog.seo_meta_title || `${blog.title} | Mohd Sakib`;
  const description = blog.seo_meta_description || blog.excerpt;
  const keywords = [
    blog.focus_keyword,
    ...blog.secondary_keywords,
    ...blog.tags,
  ].filter(Boolean);

  return {
    ...createMetaData({
      title,
      description,
      keywords,
      url,
      image: blog.cover_image_url,
    }),
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog) notFound();

  const relatedBlogs = getRelatedBlogs(blog, 3);
  const url = `${HOST}/blogs/${blog.slug}`;
  const title = blog.seo_meta_title || blog.title;
  const description = blog.seo_meta_description || blog.excerpt;

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description,
    image: blog.cover_image_url,
    datePublished: blog.createdAt,
    dateModified: blog.generatedAt || blog.createdAt,
    author: {
      "@type": "Person",
      name: blog.author_name || "Mohd Sakib",
    },
    publisher: {
      "@type": "Person",
      name: "Mohd Sakib",
      url: HOST,
    },
    mainEntityOfPage: url,
    keywords: [blog.focus_keyword, ...blog.tags].filter(Boolean).join(", "),
  };

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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostingSchema),
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

      <BlogDetail blog={blog} relatedBlogs={relatedBlogs} />
    </>
  );
}
