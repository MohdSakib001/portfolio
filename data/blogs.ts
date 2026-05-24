import generatedBlogs from "./generatedBlogs.json";
import type { BlogPost } from "@/types/blogs";

export const blogs = (generatedBlogs as BlogPost[]).sort(
  (a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
);

export function getBlogBySlug(slug: string) {
  return blogs.find((blog) => blog.slug === slug);
}

export function getFeaturedBlogs(limit = 3) {
  return blogs.slice(0, limit);
}

export function getRelatedBlogs(blog: BlogPost, limit = 3) {
  const tagSet = new Set(blog.tags.map((tag) => tag.toLowerCase()));

  return blogs
    .filter((candidate) => candidate.slug !== blog.slug)
    .map((candidate) => {
      const sharedTags = candidate.tags.filter((tag) =>
        tagSet.has(tag.toLowerCase()),
      ).length;
      const categoryMatch = candidate.category === blog.category ? 2 : 0;

      return {
        blog: candidate,
        score: sharedTags + categoryMatch,
      };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;

      return (
        new Date(b.blog.createdAt).getTime() -
        new Date(a.blog.createdAt).getTime()
      );
    })
    .slice(0, limit)
    .map(({ blog }) => blog);
}

export function formatBlogDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function getReadingTime(content: string) {
  const words = content
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ").length;

  return Math.max(1, Math.ceil(words / 220));
}
