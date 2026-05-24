import { MetadataRoute } from "next";
import { projects } from "../data/projects";
import { tools } from "../data/tools";
import { blogs } from "../data/blogs";
import { servicePages } from "../data/services";

const HOST = "https://mohdsakib.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectUrls: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${HOST}/projects/${p.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const liveToolUrls: MetadataRoute.Sitemap = tools
    .filter((t) => t.status === "live")
    .map((t) => ({
      url: `${HOST}/tools/${t.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }));

  const blogUrls: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${HOST}/blogs/${blog.slug}`,
    lastModified: new Date(blog.generatedAt || blog.createdAt),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const serviceUrls: MetadataRoute.Sitemap = servicePages.map((page) => ({
    url: `${HOST}/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.92,
  }));

  return [
    {
      url: HOST,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${HOST}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...projectUrls,
    {
      url: `${HOST}/tools`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...liveToolUrls,
    {
      url: `${HOST}/blogs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.85,
    },
    ...blogUrls,
    ...serviceUrls,
  ];
}
