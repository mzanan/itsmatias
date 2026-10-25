import type { MediaSource } from "@/types/media";

export type HeroStackCard = {
  id: string;
  label: string;
  href: string;
  media: MediaSource;
  className: string;
  float: number;
  rotate: number;
  spread: { x: number; y: number };
};

export const HERO_CANVAS = { width: 760, height: 475 };

export const HERO_AUTOPLAY_STEP_MS = 1800;

export const heroCanvasScale = (stageWidth: number) =>
  stageWidth / HERO_CANVAS.width;
