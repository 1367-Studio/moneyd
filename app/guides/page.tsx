import type { Metadata } from "next";
import Link from "next/link";
import { getPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Guides",
  description: "Plain-English explainers on markets, forex, crypto and deals, written by the MoneyDrops team.",
};

export default function GuidesPage() {
  const guides = getPosts("guides");
  return (
    <>
      <section className="hero hero--sm">
        <div className="hero__glow" aria-hidden />
        <div className="container">
          <span className="label">Learn</span>
          <h1 className="hero__title">Guides</h1>
          <p className="hero__lead">
            Short explainers that help you read the day&apos;s headlines: what moves prices, how the
            numbers work and what to watch next.
          </p>
        </div>
      </section>
      <section className="container section">
        <div className="guide-grid">
          {guides.map((g) => (
            <Link key={g.slug} href={`/guides/${g.slug}`} className="guide-card">
              {g.category && <span className="tag">{g.category}</span>}
              <h2>{g.title}</h2>
              <p>{g.description}</p>
              <span className="card__cta">{g.readingMinutes} min read →</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
