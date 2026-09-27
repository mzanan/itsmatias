import { cva } from "class-variance-authority";

export const surface = cva("overflow-hidden border bg-card shadow-2xl", {
  variants: {
    tone: {
      card: "rounded-2xl border-white/10 shadow-black/40",
      floating: "rounded-xl border-white/15 shadow-black/60",
    },
  },
  defaultVariants: { tone: "card" },
});
