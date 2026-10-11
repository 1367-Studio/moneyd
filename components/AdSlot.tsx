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

  // Before AdSense is configured, show a labelled placeholder so the layout is visible.
  if (!client || !slot) {
    return (
      <div className={`ad ad--placeholder ${className}`}>
        <span className="label">Advertisement</span>
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
