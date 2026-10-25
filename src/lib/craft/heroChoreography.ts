export const HERO_CHOREOGRAPHY_CSS = `
.fc-hero {
  --stagger-1: 70ms;
  --stagger-2: 140ms;
  --stagger-3: 210ms;
  --stagger-4: 280ms;
  --stagger-6: 420ms;
  --stagger-8: 560ms;
  --dur-reveal: 720ms;
  --dur-data: 780ms;
  --delay-hero-data: 900ms;
  --ease-out-soft: cubic-bezier(0.22, 0.61, 0.36, 1);
  --fc-brand: oklch(0.9 0.19 124);
  --fc-brand-soft: oklch(0.9 0.19 124 / 14%);
  --fc-carbs: oklch(0.78 0.12 225);
  --fc-fat: oklch(0.82 0.14 70);
  --fc-track: oklch(1 0 0 / 12%);
  --fc-well: oklch(0 0 0 / 26%);
}
.fc-ring-fill {
  animation: fc-ring-fill var(--dur-data) var(--ease-out-soft) var(--bar-delay, 0ms) both;
}
.fc-bar-fill {
  animation: fc-bar-fill var(--dur-data) var(--ease-out-soft) var(--bar-delay, 0ms) both;
}
@media (prefers-reduced-motion: reduce) {
  .fc-ring-fill,
  .fc-bar-fill {
    animation: none;
  }
}
@keyframes fc-ring-fill {
  from {
    stroke-dashoffset: var(--ring-c);
  }
}
@keyframes fc-bar-fill {
  from {
    width: 0;
  }
}
`;

export const ENTER_CLASS =
  "animate-in fade-in fill-mode-backwards duration-(--dur-reveal) ease-(--ease-out-soft) motion-reduce:animate-none";

export const HERO_MACROS = {
  kcal: 1746,
  kcalTarget: 2400,
  proteinLeft: 42,
  bars: [
    { key: "protein", label: "Protein", current: 128, target: "170", pct: 75 },
    { key: "carbs", label: "Carbs", current: 142, target: "240", pct: 59 },
    { key: "fat", label: "Fat", current: 74, target: "60-80", pct: 92 },
  ],
} as const;

export const HERO_REMAINING = HERO_MACROS.kcalTarget - HERO_MACROS.kcal;

export const HERO_KCAL_PCT = Math.round((HERO_MACROS.kcal / HERO_MACROS.kcalTarget) * 100);

export const MACRO_COLOR = {
  protein: "bg-(--fc-brand)",
  carbs: "bg-(--fc-carbs)",
  fat: "bg-(--fc-fat)",
} as const;

export const BAR_DELAY = [
  "[--bar-delay:calc(var(--delay-hero-data)+var(--stagger-1))]",
  "[--bar-delay:calc(var(--delay-hero-data)+var(--stagger-2))]",
  "[--bar-delay:calc(var(--delay-hero-data)+var(--stagger-3))]",
];

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export const ringGeometry = (size: number, stroke: number, value: number) => {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return { r, c, offset: c * (1 - clamp(value, 0, 100) / 100), center: size / 2 };
};

export const barWidth = (pct: number) => `${clamp(pct, 0, 100)}%`;
