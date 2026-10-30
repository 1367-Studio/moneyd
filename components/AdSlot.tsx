"use client";

import { useEffect, useRef } from "react";
import { ADSENSE_CLIENT } from "@/lib/adsense";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

type Props = {
  slot?: string;
  format?: "auto" | "fluid" | "rectangle";
  layoutKey?: string;
  className?: string;
};

// Ad units only render once their slot ID is configured (after AdSense approval).
// Until then nothing is shown in production: empty "Advertisement" boxes make the site look
// unfinished to AdSense reviewers. In `npm run dev` a placeholder still shows the layout.
export default function AdSlot({ slot, format = "auto", layoutKey, className = "" }: Props) {
  const client = ADSENSE_CLIENT;
  const pushed = useRef(false);

  useEffect(() => {
    if (!client || !slot || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      /* ad blocker or script not loaded yet */
    }
  }, [client, slot]);

  if (!client || !slot) {
    if (process.env.NODE_ENV !== "development") return null;
    return (
      <div className={`ad ad--placeholder ${className}`}>
        <span className="label">Advertisement (dev preview)</span>
      </div>
    );
  }

  return (
    <div className={`ad ${className}`}>
      <span className="label">Advertisement</span>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-ad-layout-key={layoutKey}
        data-full-width-responsive={format === "fluid" ? undefined : "true"}
      />
    </div>
  );
}
