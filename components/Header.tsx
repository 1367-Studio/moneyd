import Link from "next/link";
import { getPosts } from "@/lib/content";
import { CATEGORIES } from "@/lib/news";

export default function Header() {
  const hasBriefings = getPosts("briefings").length > 0;
  return (
    <header className="header">
      <div className="container header__inner">
        <Link href="/" className="logo" aria-label="MoneyDrops home">
          <span className="logo__mark" aria-hidden>
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path d="M12 2c3.5 5 7 8.6 7 12.5A7 7 0 0 1 5 14.5C5 10.6 8.5 7 12 2z" fill="currentColor" />
            </svg>
          </span>
          <span>moneydrops<span className="logo__tld">.news</span></span>
        </Link>
        <nav className="nav">
          {CATEGORIES.map((c) => (
            <Link key={c.slug} href={`/${c.slug}`}>
              {c.label}
            </Link>
          ))}
          {hasBriefings && <Link href="/briefings">Briefings</Link>}
          <Link href="/guides">Guides</Link>
        </nav>
        <Link href={hasBriefings ? "/briefings" : "/#latest"} className="btn btn--primary btn--sm">
          Today&apos;s drops
        </Link>
      </div>
    </header>
  );
}
