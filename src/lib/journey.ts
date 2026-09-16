import { URLS } from "@/lib/urls";

export const JOURNEY_CARD_LAYOUT_ID = "journey-card";

export type JourneyStop = {
  id: string;
  label: string;
  title: string;
  period: string;
  summary: string;
  body: string;
  image: string;
  url?: string;
  tags?: string[];
  stats?: JourneyStat[];
};

export type JourneyStat = { value: string; label: string };

export type RawJourneyStop = Omit<JourneyStop, "url"> & { url?: keyof typeof URLS };

export const resolveJourneyStops = (stops: RawJourneyStop[]): JourneyStop[] =>
  stops.map((stop) => ({ ...stop, url: stop.url ? URLS[stop.url] : undefined }));

export type JourneyPoint = { x: number; y: number };

export type JourneyGeometry = {
  d: string;
  points: JourneyPoint[];
  segments: number;
};

export const buildJourneyGeometry = (
  count: number,
  width: number,
  height: number,
  padding = 8,
): JourneyGeometry => {
  const segments = Math.max(count - 1, 1);
  const cx = width / 2;
  const amplitude = width / 2 - padding;
  const step = (height - padding * 2) / segments;
  const points: JourneyPoint[] = Array.from({ length: count }, (_, i) => ({
    x: cx - Math.sin((i * Math.PI) / 2) * amplitude,
    y: padding + i * step,
  }));
  const d = points.reduce((acc, p, i) => {
    if (i === 0) return `M${p.x} ${p.y}`;
    const prev = points[i - 1];
    const k = (p.y - prev.y) * 0.5;
    return `${acc} C ${prev.x} ${prev.y + k}, ${p.x} ${p.y - k}, ${p.x} ${p.y}`;
  }, "");
  return { d, points, segments };
};

export const indexFromProgress = (progress: number, count: number): number => {
  if (count <= 1) return 0;
  return Math.min(count - 1, Math.max(0, Math.floor(progress * count)));
};

export const progressFromIndex = (index: number, count: number): number => {
  if (count <= 1) return 0;
  return index / count;
};

export const reachFromProgress = (progress: number, count: number): number => {
  if (count <= 1) return 0;
  return Math.min(count - 1, Math.max(0, progress * count));
};
