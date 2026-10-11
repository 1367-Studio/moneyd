// Publisher IDs are public, so a hardcoded fallback is safe and keeps the
// AdSense tag in production even if the Vercel env var is missing.
export const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-3707272403739034";
