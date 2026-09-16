import { URLS } from "@/lib/urls";

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
  video?: JourneyVideo;
  gallery?: JourneyMedia[];
};

export type JourneyMedia = { image: string; video?: undefined } | { video: JourneyVideo; image?: undefined };

export const GALLERY_REVEAL: [number, number][] = [
  [0.18, 0.34],
  [0.34, 0.5],
  [0.5, 0.66],
];


export type JourneyVideo = { desktop: string; mobile: string };

export type JourneyStat = { value: string; label: string };

export type RawJourneyStop = Omit<JourneyStop, "url"> & { url?: keyof typeof URLS };

export const resolveJourneyStops = (stops: RawJourneyStop[]): JourneyStop[] =>
  stops.map((stop) => ({ ...stop, url: stop.url ? URLS[stop.url] : undefined }));

export const indexFromProgress = (progress: number, count: number): number => {
  if (count <= 1) return 0;
  return Math.min(count - 1, Math.max(0, Math.floor(progress * count)));
};

export const progressFromIndex = (index: number, count: number): number => {
  if (count <= 1) return 0;
  return index / count;
};

export const stopProgressFromProgress = (progress: number, count: number): number => {
  if (count <= 1) return 0;
  const scaled = Math.min(count - 0.0001, Math.max(0, progress * count));
  return scaled - Math.floor(scaled);
};

export const CROSSFADE_FRACTION = 0.45;

export type BackdropKeyframes = { opacityIn: number[]; opacityOut: number[]; scaleIn: number[]; scaleOut: number[] };

export const backdropKeyframes = (index: number, count: number): BackdropKeyframes => {
  const len = 1 / Math.max(count, 1);
  const half = (len * CROSSFADE_FRACTION) / 2;
  const start = index * len;
  const end = (index + 1) * len;
  const isFirst = index === 0;
  const isLast = index === count - 1;
  const opacityIn = [isFirst ? 0 : start - half, isFirst ? 0 : start + half, isLast ? 1 : end - half, isLast ? 1 : end + half];
  const opacityOut = [isFirst ? 1 : 0, 1, 1, isLast ? 1 : 0];
  const scaleIn = [isFirst ? 0 : start - half, isLast ? 1 : end + half];
  const scaleOut = [1, 1.1];
  return { opacityIn, opacityOut, scaleIn, scaleOut };
};
