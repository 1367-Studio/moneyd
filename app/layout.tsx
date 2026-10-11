import type { Metadata } from "next";
import Script from "next/script";
import { Inter, JetBrains_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://moneydrops.news"),
  title: { default: "MoneyDrops — Financial news, every morning", template: "%s · MoneyDrops" },
  description: "The day's market, forex, crypto and deals headlines, collected fresh every morning.",
  openGraph: { siteName: "MoneyDrops", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <head>
        {adClient && <meta name="google-adsense-account" content={adClient} />}
      </head>
      <body>
        {adClient && (
          <Script
            id="adsense"
            async
            strategy="afterInteractive"
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`}
          />
        )}
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
