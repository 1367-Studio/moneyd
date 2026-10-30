import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "How to reach the MoneyDrops team for questions, corrections and partnerships.",
};

export default function Contact() {
  const p = SITE.publisher;
  return (
    <section className="container section prose">
      <span className="label">Contact</span>
      <h1>Contact us</h1>
      <p className="lead">
        We read every message and usually reply within two working days.
      </p>

      <div className="contact-card">
        <span className="label">Email</span>
        <a className="contact-card__email" href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </div>

      <h2>What to write to us about</h2>
      <ul>
        <li><strong>Corrections.</strong> If something on the site is wrong, tell us the page and what needs fixing. See how we handle corrections in our <Link href="/editorial-policy">editorial policy</Link>.</li>
        <li><strong>Publishers.</strong> If you publish news that appears in our feed and want it credited differently or removed, email us and we&apos;ll act on it quickly.</li>
        <li><strong>Privacy requests.</strong> To exercise your data rights, see our <Link href="/privacy">privacy policy</Link> and email us.</li>
        <li><strong>Advertising and partnerships.</strong> Tell us a little about your company and what you have in mind.</li>
      </ul>
      <p>
        We can&apos;t give personal investment advice, so we won&apos;t reply to questions about
        whether to buy or sell a particular asset.
      </p>

      <h2>Postal address</h2>
      <p>
        {p.name}
        <br />
        {p.address}
      </p>
    </section>
  );
}
