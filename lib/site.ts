// Who publishes MoneyDrops. Shown on About, Contact, Legal notice, Privacy and in the footer.
// Edit here and every page updates.
export const SITE = {
  name: "MoneyDrops",
  url: "https://moneydrops.news",
  domain: "moneydrops.news",
  // Make sure this mailbox exists and is read: AdSense reviewers and readers use it.
  email: "contact@moneydrops.news",
  publisher: {
    name: "PROVENCETECH",
    form: "SAS (société par actions simplifiée)",
    // Share capital is a required mention for a French SAS. Fill it in, e.g. "1 000 €".
    capital: "",
    address: "47 rue Vivienne, 75002 Paris, France",
    rcs: "RCS Paris 130 779 796",
    siret: "130 779 796 00015",
    vat: "FR08 130779796",
    director: "Leandro Barbosa Lemos",
    studio: "1367 Studio",
  },
  host: {
    name: "Vercel Inc.",
    address: "440 N Barranca Ave #4133, Covina, CA 91723, United States",
    url: "https://vercel.com",
  },
} as const;
