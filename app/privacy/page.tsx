import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy & cookies",
  description: "How moneydrops.news handles personal data, cookies and advertising.",
};

export default function Privacy() {
  const p = SITE.publisher;
  return (
    <section className="container section prose">
      <span className="label">Legal</span>
      <h1>Privacy &amp; cookies</h1>
      <p className="muted">Last updated: October 2026</p>

      <h2>Who is responsible</h2>
      <p>
        The data controller for moneydrops.news is {p.name}, {p.form}, {p.address} ({p.rcs}). For any
        privacy question or request, email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>

      <h2>What we collect</h2>
      <p>
        MoneyDrops doesn&apos;t ask you to create an account and doesn&apos;t collect personal
        information through forms. Our hosting provider ({SITE.host.name}) keeps standard server logs,
        such as IP address, browser type and pages requested, for security and performance. If you
        email us, we keep your message and address only as long as needed to reply.
      </p>

      <h2>Advertising and cookies</h2>
      <p>
        We use Google AdSense to show ads. Google, as a third-party vendor, uses cookies to serve ads
        on this site. Google&apos;s use of advertising cookies, including the DoubleClick cookie,
        enables it and its partners to serve ads to you based on your visits to this site and/or other
        sites on the Internet. Other third-party vendors and ad networks may also use cookies to serve
        ads.
      </p>
      <p>
        Visitors in the European Economic Area, the UK and Switzerland are asked for consent through a
        consent message before any advertising cookies are used. You can change your choice at any time
        using the privacy settings link shown by the consent message.
      </p>
      <p>
        You can opt out of personalised advertising at{" "}
        <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>,
        or opt out of some third-party vendors&apos; cookies at{" "}
        <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">aboutads.info</a>{" "}
        and <a href="https://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer">youronlinechoices.eu</a>.
        Learn more about{" "}
        <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
          how Google uses information from sites that use its services
        </a>.
      </p>

      <h2>Legal basis</h2>
      <p>
        Server logs are kept on the basis of our legitimate interest in running a secure site.
        Advertising cookies are used only with your consent where the law requires it.
      </p>

      <h2>Your rights</h2>
      <p>
        Under the GDPR you can ask to access, correct or delete your personal data, object to or limit
        its use, and withdraw consent at any time. Email{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. You can also complain to the French data
        protection authority, the{" "}
        <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">CNIL</a>.
      </p>

      <h2>Third-party links</h2>
      <p>
        Headlines link to articles on their original publishers&apos; websites, which have their own
        privacy policies.
      </p>

      <h2>Changes</h2>
      <p>We&apos;ll update this page if our practices change and show the date of the latest version above.</p>
    </section>
  );
}
