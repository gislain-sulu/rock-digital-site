import type { MetadataRoute } from 'next';

import { siteConfig } from '@/lib/seo';

const routes = [
  { path: '/', priority: 1, changeFrequency: 'weekly' as const },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/portfolio', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/a-propos', priority: 0.7, changeFrequency: 'yearly' as const },
  { path: '/contact', priority: 0.8, changeFrequency: 'yearly' as const },
  { path: '/blog', priority: 0.6, changeFrequency: 'weekly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
