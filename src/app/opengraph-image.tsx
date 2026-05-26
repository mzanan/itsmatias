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
          padding: "72px",
          background:
            "radial-gradient(ellipse at 20% 10%, rgba(99,102,241,0.18) 0%, transparent 50%), radial-gradient(ellipse at 85% 90%, rgba(34,211,238,0.14) 0%, transparent 50%), #0a0a0a",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#94a3b8",
            letterSpacing: "0.04em",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#22c55e",
                boxShadow: "0 0 14px rgba(34,197,94,0.7)",
              }}
            />
            itsmatias.com
          </div>
          <div>Web Developer · Remote</div>
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontSize: 132,
              fontWeight: 300,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              backgroundImage:
                "linear-gradient(180deg, #f8fafc 0%, #ffffff 40%, #cbd5e1 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Hi, I&apos;m Matias.
          </div>
          <div
            style={{
              fontSize: 38,
              color: "#e2e8f0",
              marginTop: 28,
              maxWidth: 1000,
              lineHeight: 1.3,
              fontWeight: 400,
              letterSpacing: "-0.01em",
            }}
          >
            I build smooth, elegant, pixel-perfect websites end-to-end.
          </div>
          <div
            style={{
              fontSize: 26,
              color: "#94a3b8",
              marginTop: 18,
              letterSpacing: "0.01em",
            }}
          >
            Designed, coded, and shipped by me.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
