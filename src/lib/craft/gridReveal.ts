import type { Variants } from "motion/react";

export const GRID_GAP = 4;
export const READY_FALLBACK_MS = 2500;
const READY_PER_TILE_MS = 20;
const READY_BASE_MS = 700;
const MIN_COLS = 2;
const MAX_COLS = 8;
const SIMULATED_LATENCY_MAX_MS = 1400;

export const gridItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (index: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: index * 0.03,
      ease: [0, 0, 0.2, 1],
    },
  }),
};

export const SKELETON_KEYFRAMES = `@keyframes socials-skeleton-sweep { 100% { transform: translateX(100%); } }`;

export type GridShape = {
  cols: number;
  rows: number;
  count: number;
};

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

const targetCount = (width: number) => {
  if (width < 640) return 12;
  if (width < 1024) return 20;
  return 30;
};

export const gridShape = (poolSize: number, width: number, height: number): GridShape | null => {
  if (poolSize === 0 || !width || !height) return null;
  const target = Math.min(poolSize, targetCount(width));
  const cols = clamp(Math.round(Math.sqrt((target * width) / height)), MIN_COLS, MAX_COLS);
  const rows = Math.max(1, Math.round(target / cols));
  const count = Math.min(poolSize, cols * rows);
  return { cols, rows, count };
};

export const loadedPrefix = (loaded: Set<number>, from: number) => {
  let n = from;
  while (loaded.has(n)) n++;
  return n;
};

export const readyDelay = (total: number) => total * READY_PER_TILE_MS + READY_BASE_MS;

export const simulatedLatency = () => Math.round(Math.random() * SIMULATED_LATENCY_MAX_MS);
