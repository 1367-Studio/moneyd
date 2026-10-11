import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: "https://moneydrops.news/sitemap.xml",
    host: "https://moneydrops.news",
  };
}
