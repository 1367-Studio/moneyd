export type Category = "markets" | "forex" | "crypto" | "deals";

export type Article = {
  id: number;
  headline: string;
  summary: string;
  source: string;
  url: string;
  image: string;
  datetime: number; // unix seconds
  category: Category;
  related: string;
};

export const CATEGORIES: { slug: Category; label: string; blurb: string; finnhub: string }[] = [
  { slug: "markets", label: "Markets", blurb: "Stocks, earnings, macro and the economy.", finnhub: "general" },
  { slug: "forex", label: "Forex", blurb: "Currencies, central banks and rates.", finnhub: "forex" },
  { slug: "crypto", label: "Crypto", blurb: "Bitcoin, Ethereum and digital assets.", finnhub: "crypto" },
  { slug: "deals", label: "Deals", blurb: "Mergers, acquisitions and IPOs.", finnhub: "merger" },
];

// One day. The Vercel Cron job (vercel.json) refreshes earlier, every morning at 06:00 UTC.
const ONE_DAY = 60 * 60 * 24;

type FinnhubItem = {
  id: number;
  headline: string;
  summary: string;
  source: string;
  url: string;
  image: string;
  datetime: number;
  related: string;
};

export async function getNews(category: Category): Promise<Article[]> {
  const key = process.env.FINNHUB_API_KEY;
  const meta = CATEGORIES.find((c) => c.slug === category)!;

  if (!key) return demoArticles(category);

  try {
    const res = await fetch(
      `https://finnhub.io/api/v1/news?category=${meta.finnhub}&token=${key}`,
      { next: { revalidate: ONE_DAY, tags: ["news"] } }
    );
    if (!res.ok) throw new Error(`Finnhub ${res.status}`);
    const items: FinnhubItem[] = await res.json();

    const seen = new Set<string>();
    return items
      .filter((a) => a.headline && a.url && !seen.has(a.headline) && seen.add(a.headline))
      .sort((a, b) => b.datetime - a.datetime)
      .slice(0, 40)
      .map((a) => ({ ...a, summary: a.summary?.trim() ?? "", category }));
  } catch (err) {
    console.error(`[news] failed to load ${category}:`, err);
    return [];
  }
}

export async function getAllNews() {
  const lists = await Promise.all(CATEGORIES.map((c) => getNews(c.slug)));
  return Object.fromEntries(CATEGORIES.map((c, i) => [c.slug, lists[i]])) as Record<Category, Article[]>;
}

export async function getArticle(category: Category, id: number) {
  const articles = await getNews(category);
  return { article: articles.find((a) => a.id === id), articles };
}

export function articlePath(article: Pick<Article, "category" | "id">) {
  return `/news/${article.category}/${article.id}`;
}

export function timeAgo(unix: number) {
  const s = Math.max(0, Math.floor(Date.now() / 1000 - unix));
  if (s < 3600) return `${Math.max(1, Math.floor(s / 60))}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

// Shown only when FINNHUB_API_KEY is missing, so the design can be previewed locally.
function demoArticles(category: Category): Article[] {
  const now = Math.floor(Date.now() / 1000);
  const headlines = [
    "Stocks edge higher as investors weigh fresh inflation data",
    "Central bank signals patience on rate cuts amid sticky prices",
    "Tech giants lead rally as earnings season kicks off",
    "Oil slips as supply concerns ease and demand outlook softens",
    "Dollar steadies ahead of key jobs report",
    "Bond yields climb to multi-week highs on strong retail sales",
    "Chipmaker shares jump after upbeat guidance",
    "Gold holds near record as traders seek safe havens",
    "Bank stocks rebound after better-than-expected results",
    "Consumer confidence dips for a second straight month",
    "Retailers brace for a cautious holiday shopping season",
    "Emerging market currencies rally on weaker dollar",
  ];
  return headlines.map((headline, i) => ({
    id: i + 1,
    headline: `[Demo] ${headline}`,
    summary:
      "This is placeholder text. Add your FINNHUB_API_KEY to .env.local to load real financial headlines, refreshed automatically every morning.",
    source: ["Reuters", "Bloomberg", "CNBC", "MarketWatch"][i % 4],
    url: "https://finnhub.io",
    image: "",
    datetime: now - i * 2700,
    category,
    related: "",
  }));
}
