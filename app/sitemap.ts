import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/content";
import { CATEGORIES } from "@/lib/news";

const SITE = "https://moneydrops.news";

export const revalidate = 86400;

// Story pages (/news/...) are excerpts of other publishers' work and are noindexed, so they are
// left out. The sitemap lists our own pages and writing.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const guides = getPosts("guides");
  const briefings = getPosts("briefings");
  const post = (kind: string, p: { slug: string; date: string; updated?: string }) => ({
    url: `${SITE}/${kind}/${p.slug}`,
    lastModified: new Date(`${p.updated || p.date}T06:00:00Z`),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  });

  return [
    { url: SITE, lastModified: now, changeFrequency: "daily", priority: 1 },
    ...CATEGORIES.map((c) => ({ url: `${SITE}/${c.slug}`, lastModified: now, changeFrequency: "daily" as const, priority: 0.8 })),
    ...(briefings.length ? [{ url: `${SITE}/briefings`, lastModified: now, changeFrequency: "daily" as const, priority: 0.9 }] : []),
    ...briefings.map((b) => post("briefings", b)),
    { url: `${SITE}/guides`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...guides.map((g) => post("guides", g)),
    ...["about", "contact", "editorial-policy"].map((p) => ({ url: `${SITE}/${p}`, changeFrequency: "yearly" as const, priority: 0.4 })),
    ...["privacy", "terms", "legal"].map((p) => ({ url: `${SITE}/${p}`, changeFrequency: "yearly" as const, priority: 0.2 })),
  ];
}
