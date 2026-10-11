import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdSlot from "@/components/AdSlot";
import NewsCard from "@/components/NewsCard";
import { CATEGORIES, Category, getArticle, timeAgo } from "@/lib/news";

export const revalidate = 86400;

// Stories are rendered on first visit, then cached until the morning refresh.
export async function generateStaticParams() {
  return [];
}

type Props = { params: Promise<{ category: string; id: string }> };

async function load(params: Props["params"]) {
  const { category, id } = await params;
  const meta = CATEGORIES.find((c) => c.slug === category);
  if (!meta) return null;
  const { article, articles } = await getArticle(category as Category, Number(id));
  return article ? { meta, article, articles } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await load(params);
  if (!data) return {};
  const { article } = data;
  return {
    title: article.headline,
    description: article.summary || `${article.headline} — via ${article.source}.`,
    openGraph: { type: "article", images: article.image ? [article.image] : undefined },
  };
}

export default async function StoryPage({ params }: Props) {
  const data = await load(params);
  // Stories drop out of the feed after a day or so.
  if (!data) notFound();
  const { meta, article, articles } = data;
  const more = articles.filter((a) => a.id !== article.id).slice(0, 6);

  return (
    <>
      <div className="container">
        <AdSlot slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP} className="ad--banner" />
      </div>

      <section className="container section story">
        <div className="with-sidebar">
          <article>
            <Link href={`/${meta.slug}`} className="link story__back">← {meta.label}</Link>
            <div className="meta">
              <span className="tag">{article.category}</span>
              <span>{article.source}</span>
              <span className="dot" />
              <time dateTime={new Date(article.datetime * 1000).toISOString()}>{timeAgo(article.datetime)}</time>
            </div>
            <h1 className="story__title">{article.headline}</h1>
            {article.image && (
              <div className="story__media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={article.image} alt="" referrerPolicy="no-referrer" />
              </div>
            )}
            {article.summary && <p className="story__summary">{article.summary}</p>}
            <div className="story__source">
              <p>Originally reported by <strong>{article.source}</strong>.</p>
              <a className="btn btn--primary" href={article.url} target="_blank" rel="noopener noreferrer nofollow">
                Read the full story on {article.source} ↗
              </a>
            </div>
          </article>
          <aside className="sidebar">
            <AdSlot slot={process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR} className="ad--sidebar" />
          </aside>
        </div>
      </section>

      {more.length > 0 && (
        <section className="container section">
          <div className="section__head">
            <span className="label">More in {meta.label}</span>
            <Link href={`/${meta.slug}`} className="link">View all →</Link>
          </div>
          <div className="grid grid--3">
            {more.map((a) => <NewsCard key={a.id} article={a} />)}
          </div>
          <AdSlot slot={process.env.NEXT_PUBLIC_AD_SLOT_INFEED} format="fluid" layoutKey={process.env.NEXT_PUBLIC_AD_LAYOUT_KEY_INFEED} className="ad--infeed" />
        </section>
      )}
    </>
  );
}
