export const WALL_GAP = 4;
export const WALL_READY_MS = 1100;
const FILL_PER_COL = 4;

export const WALL_ENTRANCE_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export const wallEntranceDelay = (index: number) => Math.min(index * 0.06, 0.6);

export type WallLayout = "justified" | "masonry";

export type WallStill = {
  src: string;
  width: number;
  height: number;
};

export type WallSlot = WallStill & { key: string };

export type WallRect = { x: number; y: number; width: number; height: number };

export const stillAspect = (still: WallStill) => still.width / still.height;

const packRow = (aspects: number[], containerWidth: number, gap: number, rowHeight: number) => {
  const rows: number[][] = [];
  let row: number[] = [];
  let sumAspect = 0;
  aspects.forEach((aspect, i) => {
    row.push(i);
    sumAspect += aspect;
    const rowWidth = sumAspect * rowHeight + (row.length - 1) * gap;
    if (rowWidth >= containerWidth && i < aspects.length - 1) {
      rows.push(row);
      row = [];
      sumAspect = 0;
    }
  });
  if (row.length) rows.push(row);
  return rows;
};

const totalHeightAt = (rows: number[][], aspects: number[], containerWidth: number, gap: number) => {
  const rowHeights = rows.map((row) => {
    const sumAspect = row.reduce((s, i) => s + aspects[i], 0);
    return (containerWidth - (row.length - 1) * gap) / sumAspect;
  });
  return rowHeights.reduce((a, b) => a + b, 0) + (rows.length - 1) * gap;
};

export const justifyLayout = (
  aspects: number[],
  containerWidth: number,
  containerHeight: number,
  gap: number
): WallRect[] => {
  if (aspects.length === 0 || containerWidth <= 0 || containerHeight <= 0) return [];

  const initialRows = Math.max(1, Math.round(Math.sqrt(aspects.length)));
  let rowHeight = containerHeight / initialRows;
  let rows = packRow(aspects, containerWidth, gap, rowHeight);

  for (let i = 0; i < 8; i++) {
    const height = totalHeightAt(rows, aspects, containerWidth, gap);
    if (height <= 0) break;
    rowHeight *= containerHeight / height;
    rows = packRow(aspects, containerWidth, gap, rowHeight);
  }

  const positions: WallRect[] = new Array(aspects.length);
  let y = 0;
  rows.forEach((row) => {
    const sumAspect = row.reduce((s, i) => s + aspects[i], 0);
    const height = (containerWidth - (row.length - 1) * gap) / sumAspect;
    let x = 0;
    row.forEach((i) => {
      const width = aspects[i] * height;
      positions[i] = { x, y, width, height };
      x += width + gap;
    });
    y += height + gap;
  });
  return positions;
};

export const wallColumns = (count: number, width: number) => {
  if (count <= 1) return 1;
  if (width >= 1024) {
    if (count <= 2) return 2;
    if (count <= 6) return 3;
    return 4;
  }
  if (width >= 640) return count <= 2 ? 2 : 3;
  return count <= 2 ? 1 : 2;
};

export const assignColumns = (aspects: number[], cols: number): number[][] => {
  const columns: number[][] = Array.from({ length: cols }, () => []);
  const colHeights = new Array(cols).fill(0);
  aspects.forEach((aspect, i) => {
    let shortest = 0;
    for (let c = 1; c < cols; c++) {
      if (colHeights[c] < colHeights[shortest]) shortest = c;
    }
    columns[shortest].push(i);
    colHeights[shortest] += 1 / (aspect || 1);
  });
  return columns;
};

export const buildSlots = (stills: WallStill[], cols: number): WallSlot[] => {
  if (stills.length === 0) return [];
  const target = Math.max(stills.length, cols * FILL_PER_COL);
  return Array.from({ length: target }, (_, i) => {
    const still = stills[i % stills.length];
    return { ...still, key: `${still.src}-${i}` };
  });
};

export const justifiedTiles = (stills: WallStill[], width: number, height: number) => {
  if (width <= 0 || height <= 0) return [];
  const rects = justifyLayout(stills.map(stillAspect), width - WALL_GAP * 2, height - WALL_GAP * 2, WALL_GAP);
  return stills.map((still, index) => ({ key: still.src, src: still.src, index, rect: rects[index] }));
};

export const masonryColumns = (stills: WallStill[], width: number) => {
  if (width <= 0) return [];
  const cols = wallColumns(stills.length, width);
  const slots = buildSlots(stills, cols);
  return assignColumns(slots.map(stillAspect), cols).map((indices, c) => ({
    key: String(c),
    tiles: indices.map((index) => ({
      key: slots[index].key,
      src: slots[index].src,
      index,
      aspect: stillAspect(slots[index]),
    })),
  }));
};
