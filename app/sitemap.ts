import { MetadataRoute } from 'next';
import { projects } from './data/projects';

const HOST = 'https://mohdsakib.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const projectDetailUrls: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${HOST}/projects/${project.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: HOST,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${HOST}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...projectDetailUrls,
  ];
}
