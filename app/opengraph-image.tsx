import { ImageResponse } from "next/og";

export const alt = "MoneyDrops — Financial news, every morning";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between",
          padding: 80, background: "#0a0a0a", color: "#f5f5f4",
          backgroundImage: "radial-gradient(ellipse at 50% 0%, rgba(255,90,31,0.35), transparent 60%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 40, fontWeight: 700 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 72, height: 72, borderRadius: 18, background: "#ff5a1f" }}>
            <svg viewBox="0 0 24 24" width="44" height="44">
              <path d="M12 2c3.5 5 7 8.6 7 12.5A7 7 0 0 1 5 14.5C5 10.6 8.5 7 12 2z" fill="#0a0a0a" />
            </svg>
          </div>
          <span style={{ display: "flex" }}>moneydrops<span style={{ color: "#ff5a1f" }}>.news</span></span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 104, fontWeight: 700, lineHeight: 1, letterSpacing: -4 }}>
          <span>Money moves.</span>
          <span style={{ color: "#ff5a1f" }}>Every morning.</span>
        </div>
        <div style={{ display: "flex", fontSize: 32, color: "#9a9a96" }}>
          Markets · Forex · Crypto · Deals — collected fresh at sunrise.
        </div>
      </div>
    ),
    size
  );
}
