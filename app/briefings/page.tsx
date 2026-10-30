import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Morning briefings",
  description: "The MoneyDrops morning briefing: the stories that matter, explained in a few minutes.",
};

export default function BriefingsPage() {
  const briefings = getPosts("briefings");
  // Hidden until the first briefing is published, so the site never shows an empty section.
  if (briefings.length === 0) notFound();
  return (
    <>
      <section className="hero hero--sm">
        <div className="hero__glow" aria-hidden />
        <div className="container">
          <span className="label">Every morning</span>
          <h1 className="hero__title">Briefings</h1>
          <p className="hero__lead">
            The stories that matter across markets, forex, crypto and deals, with what they mean
            and what to watch next.
          </p>
        </div>
      </section>
      <section className="container section">
        <div className="briefing-list">
          {briefings.map((b) => (
            <Link key={b.slug} href={`/briefings/${b.slug}`} className="briefing-card">
              <span className="label">{formatDate(b.date)} · {b.readingMinutes} min</span>
              <h2>{b.title}</h2>
              {b.description && <p>{b.description}</p>}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
