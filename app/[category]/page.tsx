import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import AdSlot from "@/components/AdSlot";
import NewsCard from "@/components/NewsCard";
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
