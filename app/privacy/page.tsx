import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy policy" };

export default function Privacy() {
  return (
    <section className="container section prose">
      <span className="label">Legal</span>
      <h1>Privacy policy</h1>
      <p className="muted">Last updated: October 2026</p>

      <h2>What we collect</h2>
      <p>
        moneydrops.news does not ask you to create an account and does not collect personal
        information directly. Our hosting provider may keep standard server logs (such as IP
        address and browser type) for security and performance.
      </p>

      <h2>Advertising</h2>
      <p>
        We use Google AdSense to show ads. Google and its partners use cookies to serve ads based on
        your previous visits to this and other websites. Google&apos;s use of advertising cookies
        enables it and its partners to serve ads based on your visits to this site and/or other
        sites on the Internet.
      </p>
      <p>
        You can opt out of personalised advertising at{" "}
        <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>,
        or opt out of third-party vendor cookies at{" "}
        <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">aboutads.info</a>.
        Learn more in{" "}
        <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
          how Google uses information from sites that use its services
        </a>.
      </p>

      <h2>Third-party links</h2>
      <p>
        Headlines link to articles on their original publishers&apos; websites, which have their own
        privacy policies.
      </p>

      <h2>Not financial advice</h2>
      <p>Content on this site is for information only and is not investment advice.</p>
    </section>
  );
}
