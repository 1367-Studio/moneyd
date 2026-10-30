# moneydrops.news

Financial news site (Next.js). Black and orange design. Headlines come from the Finnhub API and refresh automatically every morning. Google AdSense slots are built in.

## Run locally

```bash
cp .env.example .env.local   # then fill in the values
npm install
npm run dev                  # http://localhost:3000
```

Without `FINNHUB_API_KEY` the site shows demo headlines so you can preview the design.

## How the daily refresh works

- Pages are cached for 24h (`revalidate = 86400`).
- `vercel.json` defines a cron job that calls `/api/revalidate` every day at **06:00 UTC**.
  That clears the cache, so the next visitor triggers a fresh fetch from Finnhub.
- To change the time, edit the cron expression in `vercel.json` (it's in UTC).

## Go live (one-time setup)

1. **News API key:** sign up free at https://finnhub.io/register and copy your API key.
2. **Deploy:** push this folder to a GitHub repo, then import it at https://vercel.com/new.
3. **Environment variables (Vercel → Project → Settings → Environment Variables):**
   - `FINNHUB_API_KEY`: your Finnhub key
   - `CRON_SECRET`: any long random string (e.g. `openssl rand -hex 32`)
   - the AdSense variables below, once approved
4. **Domain:** Vercel → Project → Settings → Domains → add `moneydrops.news`, then set the DNS records it shows at your registrar.

## Google AdSense

1. Apply at https://adsense.google.com with `moneydrops.news` (the site must be live on the domain).
2. Set `NEXT_PUBLIC_ADSENSE_CLIENT` to your publisher ID (`ca-pub-…`) and redeploy. This adds the
   verification meta tag and the AdSense script.
3. Edit `public/ads.txt` and replace `pub-XXXXXXXXXXXXXXXX` with your ID (without `ca-`).
4. After approval, create 3 ad units (Display: top banner, In-feed, Display: sidebar) and set
   `NEXT_PUBLIC_AD_SLOT_TOP`, `NEXT_PUBLIC_AD_SLOT_INFEED`, `NEXT_PUBLIC_AD_SLOT_SIDEBAR`, plus the in-feed unit's `data-ad-layout-key` as `NEXT_PUBLIC_AD_LAYOUT_KEY_INFEED`.

Until these are set, ad units render nothing in production (placeholders only show in `npm run dev`).

**Consent (EU):** in AdSense go to Privacy & messaging → European regulations and publish the consent
message for moneydrops.news. Google requires a certified consent banner for visitors in the EEA, UK and Switzerland.

## Original content (what gets the site approved)

AdSense only approves sites with enough original writing. Our own content lives in `/content` as Markdown:

- `content/guides/*.md`: evergreen explainers (shown at `/guides`, on the homepage and linked from each section).
- `content/briefings/YYYY-MM-DD.md`: the daily morning briefing. Copy `content/briefings/_template.md`,
  write 300–600 words in your own words, commit and push. The newest briefing appears on the homepage and
  a "Briefings" link appears in the nav. `/briefings` stays hidden until the first one exists.

Story pages (`/news/...`) only show a short excerpt from the original publisher. They're `noindex`, left
out of the sitemap and carry no ad units.

Publisher details (company, address, email, publication director) live in `lib/site.ts` and feed the
About, Contact, Legal notice, Terms, Privacy pages and the footer.

## Where things live

- `lib/news.ts`: Finnhub fetching, categories and section intros, markets topic filter, demo data
- `lib/text.ts`: cleans feed text (HTML tags, entities) and trims summaries to short excerpts
- `lib/content.ts`: reads Markdown guides and briefings from `/content`
- `lib/site.ts`: publisher and legal details
- `app/page.tsx`: homepage · `app/[category]/page.tsx`: Markets / Forex / Crypto / Deals
- `components/AdSlot.tsx`: AdSense ad unit
- `app/globals.css`: all styling (colour tokens at the top)
