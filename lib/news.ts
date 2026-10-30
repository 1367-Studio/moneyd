import { clean, excerpt } from "@/lib/text";

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

export type CategoryMeta = {
  slug: Category;
  label: string;
  blurb: string;
  finnhub: string;
  /** Original intro shown at the top of the section page. */
  intro: string[];
  /** Slug of the guide that explains this section's basics. */
  guide: string;
};

export const CATEGORIES: CategoryMeta[] = [
  {
    slug: "markets", label: "Markets", blurb: "Stocks, earnings, macro and the economy.", finnhub: "general", guide: "earnings-season",
    intro: [
      "The Markets section follows what moves stock prices: company earnings and guidance, central bank decisions, inflation and jobs data, and the big swings in energy and commodities that feed into all of them.",
      "When you read a markets headline, ask two questions: was this expected, and does it change the outlook for profits or interest rates? Prices react to surprises, not to news the market already priced in.",
    ],
  },
  {
    slug: "forex", label: "Forex", blurb: "Currencies, central banks and rates.", finnhub: "forex", guide: "read-a-forex-quote",
    intro: [
      "Currencies trade in pairs, so every forex story is really about two economies at once. The biggest driver is the gap between interest rates, which is why central bank meetings and inflation releases dominate this section.",
      "Watch the US dollar first: most global trade and debt is priced in it, so a stronger or weaker dollar ripples through every other pair, commodities and emerging markets.",
    ],
  },
  {
    slug: "crypto", label: "Crypto", blurb: "Bitcoin, Ethereum and digital assets.", finnhub: "crypto", guide: "what-moves-crypto-prices",
    intro: [
      "Crypto trades around the clock and reacts fast to liquidity, regulation and security incidents. Bitcoin still sets the tone; most other tokens move with it, only more sharply.",
      "Treat headlines about hacks, exchange outages and regulatory action as risk signals first. They tend to move prices more, and faster, than technology announcements.",
    ],
  },
  {
    slug: "deals", label: "Deals", blurb: "Mergers, acquisitions and IPOs.", finnhub: "merger", guide: "merger-arbitrage-spreads",
    intro: [
      "Deals covers mergers, acquisitions, buyouts and listings. A deal headline matters for the buyer, the target and often their competitors, and the details (cash or shares, premium, regulatory risk) decide who wins.",
      "After an announcement the target usually trades a little below the offer price. That gap, the deal spread, is the market's estimate of the risk that the deal falls through.",
    ],
  },
];

// Finnhub's "general" feed mixes world politics into business news. The Markets section keeps
// only stories that mention something markets-related.
const FINANCE_TERMS =
  /\b(stocks?|shares?|equit(y|ies)|markets?|earnings|revenue|profits?|loss(es)?|guidance|investors?|invest(ing|ment)?s?|fund|funds|etfs?|portfolio|ipos?|deals?|merger|acquisitions?|buyouts?|valuation|dividends?|bonds?|yields?|treasur(y|ies)|rates?|fed|ecb|boe|boj|central bank|inflation|cpi|gdp|jobs|payrolls|unemployment|recession|economy|economic|tariffs?|trad(e|es|ing|ers?)|exchanges?|oil|crude|gas|lng|gold|copper|commodit(y|ies)|dollar|euro|yen|currenc(y|ies)|forex|bitcoin|crypto|banks?|banking|lenders?|credit|debt|loans?|ceo|cfo|company|companies|firms?|corp|inc|s&p|nasdaq|dow|index|indices|futures|prices?|sales|consumers?|spending|housing|mortgages?|insurers?|insurance|billion|million|analysts?|downgrad\w*|upgrad\w*|rall(y|ies)|selloff|sell-off)\b/i;

function isMarketsStory(a: { headline: string; summary: string }) {
  return FINANCE_TERMS.test(a.headline) || FINANCE_TERMS.test(a.summary.slice(0, 300));
}

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
      .map((a) => ({
        ...a,
        headline: clean(a.headline),
        summary: excerpt(clean(a.summary)),
        source: clean(a.source),
        category,
      }))
      .filter((a) => a.headline && a.url && !seen.has(a.headline) && seen.add(a.headline))
      .filter((a) => category !== "markets" || isMarketsStory(a))
      .sort((a, b) => b.datetime - a.datetime)
      .slice(0, 40);
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
