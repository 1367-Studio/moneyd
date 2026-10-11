import type { MetadataRoute } from "next";
import { CATEGORIES, articlePath, getAllNews } from "@/lib/news";

const SITE = "https://moneydrops.news";

// Refreshed with the news, so today's stories are always listed.
export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const news = await getAllNews();
  const now = new Date();
  const stories = Object.values(news).flat().map((a) => ({
    url: `${SITE}${articlePath(a)}`,
    lastModified: new Date(a.datetime * 1000),
    changeFrequency: "never" as const,
    priority: 0.6,
  }));

  return [
    { url: SITE, lastModified: now, changeFrequency: "daily", priority: 1 },
    ...CATEGORIES.map((c) => ({ url: `${SITE}/${c.slug}`, lastModified: now, changeFrequency: "daily" as const, priority: 0.8 })),
    ...stories,
    { url: `${SITE}/privacy`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
