import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Legal notice",
  description: "Publisher, publication director and hosting information for moneydrops.news (mentions légales).",
};

export default function Legal() {
  const p = SITE.publisher;
  const h = SITE.host;
  return (
    <section className="container section prose">
      <span className="label">Legal</span>
      <h1>Legal notice</h1>
      <p className="muted">Mentions légales, as required by French law (LCEN, article 6).</p>

      <h2>Publisher</h2>
      <dl className="facts">
        <dt>Company</dt><dd>{p.name}</dd>
        <dt>Legal form</dt><dd>{p.form}{p.capital ? `, share capital ${p.capital}` : ""}</dd>
        <dt>Registered office</dt><dd>{p.address}</dd>
        <dt>Registration</dt><dd>{p.rcs}</dd>
        <dt>SIRET</dt><dd>{p.siret}</dd>
        <dt>VAT number</dt><dd>{p.vat}</dd>
        <dt>Email</dt><dd><a href={`mailto:${SITE.email}`}>{SITE.email}</a></dd>
        <dt>Publication director</dt><dd>{p.director}</dd>
      </dl>

      <h2>Hosting</h2>
      <dl className="facts">
        <dt>Host</dt><dd>{h.name}</dd>
        <dt>Address</dt><dd>{h.address}</dd>
        <dt>Website</dt><dd><a href={h.url} target="_blank" rel="noopener noreferrer">{h.url.replace("https://", "")}</a></dd>
      </dl>

      <h2>News data</h2>
      <p>
        Headlines and excerpts are provided through the{" "}
        <a href="https://finnhub.io" target="_blank" rel="noopener noreferrer">Finnhub</a> API and remain
        the property of their original publishers.
      </p>
    </section>
  );
}
