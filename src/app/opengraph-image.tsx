import { ImageResponse } from "next/og";
import { readOgImage } from "@/lib/og";

export const alt = "Matias Zanan: Design Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CARD = { width: 480, height: 270 };

const CARDS = [
  { file: "money-tracker-card.jpg", x: -210, y: -40, rotate: -12 },
  { file: "landing.jpg", x: 210, y: -40, rotate: 12 },
  { file: "nomad-events-card.jpg", x: -170, y: 90, rotate: -6 },
  { file: "links.jpg", x: 170, y: 90, rotate: 6 },
  { file: "ecommerce.jpg", x: 0, y: 20, rotate: 0 },
];

const FAN_CENTER = { x: 600, y: 290 };

export default async function Image() {
  const images = await Promise.all(CARDS.map((card) => readOgImage(card.file)));

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(ellipse 55% 65% at 50% 60%, rgba(40,56,110,0.6) 0%, transparent 70%), #05060b",
      }}
    >
      {CARDS.map((card, i) => (
        <div
          key={card.file}
          style={{
            position: "absolute",
            left: FAN_CENTER.x + card.x - CARD.width / 2,
            top: FAN_CENTER.y + card.y - CARD.height / 2,
            width: CARD.width,
            height: CARD.height,
            display: "flex",
            borderRadius: 16,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.18)",
            boxShadow: "0 30px 60px rgba(0,0,0,0.6)",
            transform: `rotate(${card.rotate}deg)`,
          }}
        >
          <img
            src={images[i]}
            alt=""
            width={CARD.width}
            height={CARD.height}
            style={{ objectFit: "cover", objectPosition: "top" }}
          />
        </div>
      ))}
    </div>,
    { ...size }
  );
}
