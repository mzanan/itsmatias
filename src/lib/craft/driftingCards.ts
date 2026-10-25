const HERO_DRIFT_BASE_SECONDS = 44;
const HERO_DRIFT_STEP_SECONDS = 7;

export const SETS_PER_COLUMN = 4;

export const HERO_EDGE_MASK =
  "linear-gradient(to right, transparent, #000 9%, #000 91%, transparent), linear-gradient(to bottom, transparent, #000 10%, #000 90%, transparent)";

export const HERO_BOUNCE_CSS = `@keyframes socials-hero-bounce { from { transform: translateY(0); } to { transform: translateY(-50%); } }
@media (prefers-reduced-motion: reduce) { [style*="socials-hero-bounce"] { animation: none !important; } }`;

export const heroColumnAnimation = (index: number) =>
  `socials-hero-bounce ${HERO_DRIFT_BASE_SECONDS + index * HERO_DRIFT_STEP_SECONDS}s ease-in-out infinite ${
    index % 2 ? "alternate-reverse" : "alternate"
  }`;

export const heroSets = (count: number) => Array.from({ length: count }, (_, k) => k);
