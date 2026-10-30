import Link from "next/link";
import { Fragment } from "react";
import AdSlot from "@/components/AdSlot";
import NewsCard from "@/components/NewsCard";
import ScrollVideoHero from "@/components/ScrollVideoHero";
import { formatDate, getPosts } from "@/lib/content";
import { CATEGORIES, articlePath, getAllNews } from "@/lib/news";

// Rebuilt at most once a day; the morning cron forces the refresh.
export const revalidate = 86400;

export default async function Home() {
  const news = await getAllNews();
  const markets = news.markets;
  const [lead, ...rest] = markets;
  const side = rest.slice(0, 4);
  const latest = rest.slice(4, 16);
  const edition = new Date().toLocaleDateString("en-GB", {
    weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  });
  const tickerItems = CATEGORIES.flatMap((c) => news[c.slug].slice(0, 4));
  const [briefing] = getPosts("briefings");
  const guides = getPosts("guides").slice(0, 4);

  return (
    <>
      <ScrollVideoHero scrollLength={2.5}>
        <div className="video-hero__copy">
          <span className="pill">
            <span className="pill__dot" /> Morning edition · {edition}
          </span>
          <h1 className="hero__title">
            Money moves.<br />
            <span className="accent">Every morning.</span>
          </h1>
          <p className="hero__lead">
            The headlines moving markets, forex, crypto and deals, collected fresh at sunrise
            so you start the day informed.
          </p>
          <div className="hero__actions">
            <Link href="#latest" className="btn btn--primary">Read today&apos;s drops</Link>
            <Link href="/markets" className="btn btn--ghost">Browse markets →</Link>
          </div>
        </div>
      </ScrollVideoHero>

      {tickerItems.length > 0 && (
        <div className="ticker" aria-label="Headlines">
          <div className="ticker__track">
            {[...tickerItems, ...tickerItems].map((a, i) => (
              <Link key={i} href={articlePath(a)}>
                <span className="tag">{a.category}</span> {a.headline}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="container">
        <AdSlot slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP} className="ad--banner" />
      </div>

      {briefing && (
        <section className="container section">
          <Link href={`/briefings/${briefing.slug}`} className="briefing-card">
            <span className="label">Morning briefing · {formatDate(briefing.date)}</span>
            <h2>{briefing.title}</h2>
            {briefing.description && <p>{briefing.description}</p>}
            <span className="link">Read the briefing · {briefing.readingMinutes} min →</span>
          </Link>
        </section>
      )}

      {lead ? (
        <section className="container section" id="latest">
          <div className="section__head">
            <span className="label">Top story</span>
          </div>
          <div className="lead-grid">
            <NewsCard article={lead} variant="lead" />
            <div className="stack">
              {side.map((a) => <NewsCard key={a.id} article={a} variant="compact" />)}
            </div>
          </div>
        </section>
      ) : (
        <section className="container section" id="latest">
          <p className="empty">No headlines right now. Check back shortly.</p>
        </section>
      )}

      {latest.length > 0 && (
        <section className="container section">
          <div className="section__head">
            <span className="label">Latest in markets</span>
            <Link href="/markets" className="link">View all →</Link>
          </div>
          <div className="with-sidebar">
            <div className="grid">
              {latest.map((a, i) => (
                <Fragment key={a.id}>
                  <NewsCard article={a} />
                  {i === 5 && (
                    <AdSlot slot={process.env.NEXT_PUBLIC_AD_SLOT_INFEED} format="fluid" layoutKey={process.env.NEXT_PUBLIC_AD_LAYOUT_KEY_INFEED} className="ad--infeed" />
                  )}
                </Fragment>
              ))}
            </div>
            <aside className="sidebar">
              <AdSlot slot={process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR} className="ad--sidebar" />
            </aside>
          </div>
        </section>
      )}

      {CATEGORIES.filter((c) => c.slug !== "markets").map((c) =>
        news[c.slug].length ? (
          <section key={c.slug} className="container section">
            <div className="section__head">
              <div>
                <span className="label">{c.label}</span>
                <h2 className="section__title">{c.blurb}</h2>
              </div>
              <Link href={`/${c.slug}`} className="link">View all →</Link>
            </div>
            <div className="grid grid--3">
              {news[c.slug].slice(0, 3).map((a) => <NewsCard key={a.id} article={a} />)}
            </div>
          </section>
        ) : null
      )}

      {guides.length > 0 && (
        <section className="container section">
          <div className="section__head">
            <div>
              <span className="label">Guides</span>
              <h2 className="section__title">Understand the news behind the numbers.</h2>
            </div>
            <Link href="/guides" className="link">All guides →</Link>
          </div>
          <div className="guide-grid">
            {guides.map((g) => (
              <Link key={g.slug} href={`/guides/${g.slug}`} className="guide-card">
                {g.category && <span className="tag">{g.category}</span>}
                <h3>{g.title}</h3>
                <p>{g.description}</p>
                <span className="card__cta">{g.readingMinutes} min read →</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="container section">
        <div className="cta">
          <h2>Fresh drops land every morning at 06:00 UTC.</h2>
          <p className="muted">Bookmark moneydrops.news and make it the first tab you open.</p>
        </div>
      </section>
    </>
  );
}
