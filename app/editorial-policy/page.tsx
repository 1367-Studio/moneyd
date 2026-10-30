import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Editorial policy",
  description: "How MoneyDrops sources headlines, writes original content, uses automation and handles corrections.",
};

export default function EditorialPolicy() {
  return (
    <section className="container section prose">
      <span className="label">About</span>
      <h1>Editorial policy</h1>
      <p className="muted">Last updated: October 2026</p>

      <h2>Two kinds of content</h2>
      <p>MoneyDrops publishes two clearly separate kinds of content:</p>
      <ul>
        <li>
          <strong>News from other publishers.</strong> Headlines and short excerpts collected through
          the <a href="https://finnhub.io" target="_blank" rel="noopener noreferrer">Finnhub</a> news API.
          Every item names its original publisher and links to the full article on their site. We
          never republish full articles. These pages are not indexed by search engines and carry no ads.
        </li>
        <li>
          <strong>Our own writing.</strong> Guides, briefings and section notes written and reviewed by
          the MoneyDrops team. They carry an author and a date.
        </li>
      </ul>

      <h2>Automation and AI</h2>
      <p>
        Collecting, sorting and filtering the news feed is automated. Our own writing may be drafted
        with the help of AI tools, but a person checks every piece for accuracy, edits it and decides
        whether to publish it. We don&apos;t publish automatically generated articles.
      </p>

      <h2>Accuracy and corrections</h2>
      <p>
        We check facts and figures in our own content against primary sources where possible. If you
        spot an error, email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. We fix confirmed
        errors promptly and note significant corrections at the end of the article.
      </p>

      <h2>Independence</h2>
      <p>
        We don&apos;t accept payment to cover, promote or remove a story, and advertising never
        influences what we write. Any sponsored content would be clearly labelled as such.
      </p>

      <h2>Publishers&apos; rights</h2>
      <p>
        Headlines and excerpts remain the property of their publishers. If you&apos;re a publisher and
        want your content credited differently or removed from our feed, contact us and we&apos;ll act
        on it quickly.
      </p>

      <h2>Not financial advice</h2>
      <p>
        Everything on MoneyDrops is general information and education. It doesn&apos;t take your
        personal situation into account and isn&apos;t a recommendation to buy or sell anything.
      </p>
    </section>
  );
}
