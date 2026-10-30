import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "The terms that apply when you use moneydrops.news.",
};

export default function Terms() {
  const p = SITE.publisher;
  return (
    <section className="container section prose">
      <span className="label">Legal</span>
      <h1>Terms of use</h1>
      <p className="muted">Last updated: October 2026</p>

      <h2>1. Who we are</h2>
      <p>
        moneydrops.news is published by {p.name}, {p.form}, {p.address} ({p.rcs}). By using the site
        you accept these terms. If you don&apos;t accept them, please don&apos;t use the site.
      </p>

      <h2>2. Information only</h2>
      <p>
        Content on MoneyDrops is general information and education. It is not investment, tax, legal
        or financial advice, and it doesn&apos;t take your personal situation into account. Prices and
        news can change quickly and may be delayed or incomplete. You are responsible for your own
        decisions; consider speaking to a regulated adviser before investing.
      </p>

      <h2>3. Third-party content and links</h2>
      <p>
        Headlines and excerpts come from other publishers and link to their websites. We don&apos;t
        control those sites and aren&apos;t responsible for their content, accuracy or availability.
      </p>

      <h2>4. Intellectual property</h2>
      <p>
        Our original content (guides, briefings, section notes, design and code) belongs to {p.name}.
        You may share links and quote short passages with credit and a link to the source page. Please
        don&apos;t copy or republish whole articles without our written permission. Third-party
        headlines and excerpts belong to their publishers.
      </p>

      <h2>5. Availability</h2>
      <p>
        We aim to keep the site available and accurate but can&apos;t guarantee it will be
        uninterrupted or error-free. We may change or remove content at any time.
      </p>

      <h2>6. Liability</h2>
      <p>
        To the extent permitted by law, {p.name} is not liable for losses arising from the use of the
        site or reliance on its content. Nothing in these terms limits liability that cannot be
        limited under applicable law.
      </p>

      <h2>7. Privacy</h2>
      <p>
        How we handle data and cookies is explained in our <Link href="/privacy">privacy policy</Link>.
      </p>

      <h2>8. Governing law</h2>
      <p>
        These terms are governed by French law. Consumers keep the protection of the mandatory rules of
        their country of residence.
      </p>

      <h2>9. Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>
    </section>
  );
}
