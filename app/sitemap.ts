import { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog-data";

export const revalidate = 86400; // Cache sitemap for 24 hours on Edge CDN

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.launchlive.studio";

  const siteUpdatedDate = new Date("2026-08-24T00:00:00.000Z");
  const legalUpdatedDate = new Date("2026-01-01T00:00:00.000Z");

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: siteUpdatedDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: siteUpdatedDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: siteUpdatedDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/book-a-call`,
      lastModified: siteUpdatedDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: siteUpdatedDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: siteUpdatedDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services/websites`,
      lastModified: siteUpdatedDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/systems`,
      lastModified: siteUpdatedDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/seo`,
      lastModified: siteUpdatedDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/ai-tools`,
      lastModified: siteUpdatedDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/automation`,
      lastModified: siteUpdatedDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/branding`,
      lastModified: siteUpdatedDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/design`,
      lastModified: siteUpdatedDate,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/services/consulting`,
      lastModified: siteUpdatedDate,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: siteUpdatedDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: siteUpdatedDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: legalUpdatedDate,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: legalUpdatedDate,
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => {
    const parsedDate = post.date && !isNaN(Date.parse(post.date))
      ? new Date(post.date)
      : new Date();

    return {
      url: `${baseUrl}/blogs/${post.slug}`,
      lastModified: parsedDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    };
  });

  return [...staticRoutes, ...blogRoutes];
}

