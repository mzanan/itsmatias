import type { Variants } from "motion/react";

export type AlbumPhoto = {
  id: string;
  src: string;
  width: number;
  height: number;
  caption?: string;
};

export type MasonryEntry = { photo: AlbumPhoto; originalIndex: number };

const cinematicEase = [0.16, 1, 0.3, 1] as const;

export const tileReveal: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.94, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: cinematicEase },
  },
};

export const TILE_VIEWPORT_MARGIN = "60px";

export const COLUMN_BREAKPOINTS = { md: 400, lg: 640 };

export const COLUMN_COUNTS = { sm: 2, md: 3, lg: 4 };

export const columnCountFor = (width: number) =>
  width >= COLUMN_BREAKPOINTS.lg
    ? COLUMN_COUNTS.lg
    : width >= COLUMN_BREAKPOINTS.md
      ? COLUMN_COUNTS.md
      : COLUMN_COUNTS.sm;

export const buildMasonryColumns = (photos: AlbumPhoto[], cols: number): MasonryEntry[][] => {
  const out: MasonryEntry[][] = Array.from({ length: cols }, () => []);
  const heights = new Array<number>(cols).fill(0);
  photos.forEach((p, i) => {
    let minCol = 0;
    for (let c = 1; c < cols; c++) {
      if (heights[c] < heights[minCol]) minCol = c;
    }
    out[minCol].push({ photo: p, originalIndex: i });
    const w = p.width || 4;
    const h = p.height || 5;
    heights[minCol] += h / w;
  });
  return out;
};

export const aspectRatioOf = (photo: AlbumPhoto) =>
  photo.width && photo.height ? `${photo.width} / ${photo.height}` : "4 / 5";
