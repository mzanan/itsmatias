export const HERO_VIDEO = {
  still: "/craft/demo/hero-video/still.webp",
  video: "/craft/demo/hero-video/hero.mp4",
  threshold: 0.1,
  replayHoldMs: 900,
};

export type HeroVideoStatus = "still" | "playing" | "paused";

export const STATUS_LABEL: Record<HeroVideoStatus, string> = {
  still: "Still image, waiting for canplay",
  playing: "Video playing",
  paused: "Paused off-screen",
};

export const heroVideoStatus = (ready: boolean, playing: boolean): HeroVideoStatus =>
  !ready ? "still" : playing ? "playing" : "paused";
