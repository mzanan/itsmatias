export const SCROLL_REVEALS_CSS = `
.fc-reveal-scope {
  --ease-out-soft: cubic-bezier(0.22, 0.61, 0.36, 1);
  --fc-brand: oklch(0.9 0.19 124);
  --fc-carbs: oklch(0.78 0.12 225);
  --fc-fat: oklch(0.82 0.14 70);
}
@supports (animation-timeline: view()) {
  .fc-reveal,
  .fc-reveal-late {
    animation: fc-reveal var(--ease-out-soft) both;
    animation-timeline: view();
    animation-range: entry 10% cover 30%;
  }
  .fc-reveal-late {
    animation-range: entry 22% cover 40%;
  }
}
@media (prefers-reduced-motion: reduce) {
  .fc-reveal,
  .fc-reveal-late {
    animation: none;
  }
}
@keyframes fc-reveal {
  from {
    opacity: 0;
    translate: 0 1.5rem;
  }
}
`;

export type RevealPreview =
  | { kind: "meals"; items: { name: string; protein: number }[] }
  | { kind: "coach"; question: string; answer: string }
  | { kind: "sets"; exercise: string; sets: { n: number; kg: number; reps: number }[] }
  | { kind: "body"; rows: { label: string; value: string; delta: number; good: "up" | "down" }[] };

export type RevealSection = {
  eyebrow: string;
  title: string;
  body: string;
  preview: RevealPreview;
};

export const REVEAL_SECTIONS: RevealSection[] = [
  {
    eyebrow: "Log",
    title: "A meal in a few taps.",
    body: "Pick from saved meals or recents. Macros update against your targets as you log.",
    preview: {
      kind: "meals",
      items: [
        { name: "Chicken rice bowl", protein: 48 },
        { name: "Greek yogurt, oats", protein: 32 },
        { name: "Salmon, potatoes", protein: 41 },
      ],
    },
  },
  {
    eyebrow: "Coach",
    title: "A coach that remembers what you told it.",
    body: "Calm about a high-fat day when calories are in range, direct when protein runs low.",
    preview: {
      kind: "coach",
      question: "Lunch was heavy on fat. Should I cut dinner?",
      answer: "No need. Protein is the gap: 42 g to go. Keep dinner lean.",
    },
  },
  {
    eyebrow: "Train",
    title: "Every set, with the form right there.",
    body: "Follow your routine and log sets as you go.",
    preview: {
      kind: "sets",
      exercise: "Single-leg press",
      sets: [
        { n: 1, kg: 60, reps: 10 },
        { n: 2, kg: 60, reps: 9 },
        { n: 3, kg: 65, reps: 8 },
      ],
    },
  },
  {
    eyebrow: "Body",
    title: "Progress is muscle up and fat down.",
    body: "See recomposition instead of just the scale.",
    preview: {
      kind: "body",
      rows: [
        { label: "Muscle", value: "34.2", delta: 0.8, good: "up" },
        { label: "Body fat", value: "15.1", delta: -1.6, good: "down" },
        { label: "Weight", value: "78.4", delta: -0.4, good: "down" },
      ],
    },
  },
];

export const formatDelta = (delta: number) => `${delta > 0 ? "+" : ""}${delta}`;

export const isGoodDelta = (delta: number, good: "up" | "down") => (good === "up" ? delta > 0 : delta < 0);
