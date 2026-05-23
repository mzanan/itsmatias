import { ImageResponse } from "next/og";

export const alt = "Matias Zanan — Web Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #050816 0%, #0b1a3a 45%, #1a0b3a 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: "#67e8f9",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          itsmatias.com
        </div>
        <div
          style={{
            fontSize: 108,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            marginTop: 24,
          }}
        >
          Matias Zanan
        </div>
        <div
          style={{
            fontSize: 48,
            color: "#a5f3fc",
            marginTop: 16,
            fontWeight: 600,
          }}
        >
          Web Developer
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#cbd5e1",
            marginTop: 48,
            maxWidth: 1000,
            lineHeight: 1.35,
          }}
        >
          I build production websites end-to-end. Remote, traveling, made with care.
        </div>
      </div>
    ),
    { ...size },
  );
}
