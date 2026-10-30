import Link from "next/link";
import { CATEGORIES } from "@/lib/news";
import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__about">
          <div className="footer__brand">moneydrops<span className="accent">.news</span></div>
          <p className="muted">
            Market, forex, crypto and deals news every morning, with plain-English guides to help you read it.
          </p>
          <p className="muted footer__publisher">
            Published by {SITE.publisher.name} ({SITE.publisher.studio}), Paris.{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </p>
        </div>
        <div className="footer__cols">
          <div>
            <span className="label">Sections</span>
            {CATEGORIES.map((c) => (
              <Link key={c.slug} href={`/${c.slug}`}>{c.label}</Link>
            ))}
            <Link href="/guides">Guides</Link>
          </div>
          <div>
            <span className="label">About</span>
            <Link href="/about">About us</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/editorial-policy">Editorial policy</Link>
            <a href="https://finnhub.io" target="_blank" rel="noopener noreferrer">News data: Finnhub</a>
          </div>
          <div>
            <span className="label">Legal</span>
            <Link href="/privacy">Privacy &amp; cookies</Link>
            <Link href="/terms">Terms of use</Link>
            <Link href="/legal">Legal notice</Link>
          </div>
        </div>
      </div>
      <div className="container footer__legal muted">
        © {new Date().getFullYear()} {SITE.publisher.name} · moneydrops.news · For information only, not financial advice.
        Headlines and excerpts belong to their original publishers and link to them.
      </div>
    </footer>
  );
}
