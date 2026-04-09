import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site-config";

export const alt = "Town of Harmony, North Carolina";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#375a3f",
        color: "#ece5c7",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          fontSize: 120,
          fontWeight: 700,
          letterSpacing: "-0.04em",
          marginBottom: 8,
        }}
      >
        {siteConfig.title}
      </div>
      <div
        style={{
          fontSize: 36,
          fontWeight: 400,
          opacity: 0.8,
        }}
      >
        {siteConfig.tagline}
      </div>
      <div
        style={{
          fontSize: 24,
          fontWeight: 400,
          opacity: 0.6,
          marginTop: 24,
        }}
      >
        Harmony, North Carolina
      </div>
    </div>,
    { ...size }
  );
}
