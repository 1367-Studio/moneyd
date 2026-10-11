import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#ff5a1f" }}>
        <svg viewBox="0 0 24 24" width="112" height="112">
          <path d="M12 2c3.5 5 7 8.6 7 12.5A7 7 0 0 1 5 14.5C5 10.6 8.5 7 12 2z" fill="#0a0a0a" />
        </svg>
      </div>
    ),
    size
  );
}
