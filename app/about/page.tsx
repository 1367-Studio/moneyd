import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About us",
  description: "Who makes MoneyDrops, how the morning news feed works and what we write ourselves.",
};

export default function About() {
  const p = SITE.publisher;
  return (
    <section className="container section prose">
      <span className="label">About</span>
      <h1>About MoneyDrops</h1>
      <p className="lead">
        MoneyDrops is a morning news site for people who follow markets but don&apos;t have time to
        read ten publications before breakfast. We gather the day&apos;s market, forex, crypto and
        deals headlines in one place and add plain-English writing that explains what they mean.
      </p>

      <h2>What you&apos;ll find here</h2>
      <ul>
        <li>
          <strong>The morning feed.</strong> Every day at 06:00 UTC the site refreshes with the latest
          headlines from established financial publishers. Each item shows a short excerpt, credits
          the original publisher and links to the full story on their site.
        </li>
        <li>
          <strong>Guides.</strong> Our own explainers on how markets work: how to read a forex quote,
          what drives crypto prices, what earnings season means for stocks and how deal spreads work.
          See all <Link href="/guides">guides</Link>.
        </li>
        <li>
          <strong>Section notes.</strong> Each section (Markets, Forex, Crypto, Deals) opens with our
          own context on what moves that market and what to watch.
        </li>
      </ul>

      <h2>Who we are</h2>
      <p>
        MoneyDrops is published by {p.name}, a {p.form} based in Paris, and built by {p.studio}, a
        design and development studio working with clients in France and Brazil. The site is run by{" "}
        {p.director}, who writes and edits the original content.
      </p>

      <h2>How we work</h2>
      <p>
        Headlines are collected automatically through the Finnhub news API and filtered so the
        Markets section stays on business and economic news. Our guides and section notes are
        written and reviewed by a person. You can read the details in our{" "}
        <Link href="/editorial-policy">editorial policy</Link>.
      </p>

      <h2>Not financial advice</h2>
      <p>
        MoneyDrops is for information and education. Nothing on the site is a recommendation to buy
        or sell any asset. Markets carry risk, including the loss of your capital.
      </p>

      <h2>Get in touch</h2>
      <p>
        Questions, corrections or partnership requests: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>,
        or see our <Link href="/contact">contact page</Link>.
      </p>
    </section>
  );
}
