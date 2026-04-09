import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#375a3f",
        borderRadius: "20%",
      }}
    >
      <span
        style={{
          fontSize: 108,
          fontWeight: 700,
          color: "#ece5c7",
          letterSpacing: "-0.04em",
        }}
      >
        H
      </span>
    </div>,
    { ...size }
  );
}
