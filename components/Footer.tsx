import Link from "next/link";
import { CATEGORIES } from "@/lib/news";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <div className="footer__brand">moneydrops<span className="accent">.news</span></div>
          <p className="muted">Financial headlines, collected fresh every morning.</p>
        </div>
        <div className="footer__cols">
          <div>
            <span className="label">Sections</span>
            {CATEGORIES.map((c) => (
              <Link key={c.slug} href={`/${c.slug}`}>{c.label}</Link>
            ))}
          </div>
          <div>
            <span className="label">Site</span>
            <Link href="/privacy">Privacy policy</Link>
            <a href="https://finnhub.io" target="_blank" rel="noopener noreferrer">News data: Finnhub</a>
          </div>
        </div>
      </div>
      <div className="container footer__legal muted">
        © {new Date().getFullYear()} moneydrops.news · Not financial advice. Headlines link to their original publishers.
      </div>
    </footer>
  );
}
