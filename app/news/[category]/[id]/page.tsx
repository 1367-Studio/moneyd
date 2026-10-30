import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import NewsCard from "@/components/NewsCard";
import { getPost } from "@/lib/content";
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
    description: article.summary || `${article.headline} (via ${article.source}).`,
    openGraph: { type: "article", images: article.image ? [article.image] : undefined },
    // Story pages are short excerpts of other publishers' reporting. Keep them out of search
    // results and out of the ad inventory; our own writing lives in Briefings and Guides.
    robots: { index: false, follow: true },
  };
}

export default async function StoryPage({ params }: Props) {
  const data = await load(params);
  // Stories drop out of the feed after a day or so.
  if (!data) notFound();
  const { meta, article, articles } = data;
  const more = articles.filter((a) => a.id !== article.id).slice(0, 6);
  const guide = getPost("guides", meta.guide);

  return (
    <>
      <section className="container section story">
        <article className="story__body">
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
              <img src={article.image} alt={article.headline} referrerPolicy="no-referrer" />
            </div>
          )}
          {article.summary && (
            <blockquote className="story__summary">
              <p>{article.summary}</p>
              <cite>Excerpt from {article.source}</cite>
            </blockquote>
          )}
          <div className="story__source">
            <p>Originally reported by <strong>{article.source}</strong>. Read the full story on their site.</p>
            <a className="btn btn--primary" href={article.url} target="_blank" rel="noopener noreferrer nofollow">
              Read on {article.source} ↗
            </a>
          </div>

          <aside className="context">
            <span className="label">Context · {meta.label}</span>
            {meta.intro.map((p) => <p key={p}>{p}</p>)}
            {guide && (
              <Link href={`/guides/${guide.slug}`} className="link">
                Guide: {guide.title} →
              </Link>
            )}
          </aside>
        </article>
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
        </section>
      )}
    </>
  );
}
