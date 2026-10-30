import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import AdSlot from "@/components/AdSlot";
import NewsCard from "@/components/NewsCard";
import Link from "next/link";
import { getPost } from "@/lib/content";
import { CATEGORIES, Category, getNews } from "@/lib/news";

export const revalidate = 86400;
export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const meta = CATEGORIES.find((c) => c.slug === category);
  return meta ? { title: `${meta.label} news`, description: meta.blurb } : {};
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const meta = CATEGORIES.find((c) => c.slug === category);
  if (!meta) notFound();

  const articles = await getNews(category as Category);
  const guide = getPost("guides", meta.guide);

  return (
    <>
      <section className="hero hero--sm">
        <div className="hero__glow" aria-hidden />
        <div className="container">
          <span className="label">Section</span>
          <h1 className="hero__title">{meta.label}</h1>
          <p className="hero__lead">{meta.blurb}</p>
        </div>
      </section>

      <section className="container section">
        <div className="section-intro">
          {meta.intro.map((p) => <p key={p}>{p}</p>)}
          {guide && (
            <Link href={`/guides/${guide.slug}`} className="link">
              New to {meta.label.toLowerCase()}? Read our guide: {guide.title} →
            </Link>
          )}
        </div>
      </section>

      <div className="container">
        <AdSlot slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP} className="ad--banner" />
      </div>

      <section className="container section">
        {articles.length === 0 ? (
          <p className="empty">No headlines right now. Check back shortly.</p>
        ) : (
          <div className="with-sidebar">
            <div className="grid">
              {articles.map((a, i) => (
                <Fragment key={a.id}>
                  <NewsCard article={a} />
                  {i % 8 === 7 && (
                    <AdSlot slot={process.env.NEXT_PUBLIC_AD_SLOT_INFEED} format="fluid" layoutKey={process.env.NEXT_PUBLIC_AD_LAYOUT_KEY_INFEED} className="ad--infeed" />
                  )}
                </Fragment>
              ))}
            </div>
            <aside className="sidebar">
              <AdSlot slot={process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR} className="ad--sidebar" />
            </aside>
          </div>
        )}
      </section>
    </>
  );
}
