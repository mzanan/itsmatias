"use client";

import type React from "react";
import { motion, useTransform, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";
import type { JourneyStop } from "./useJourney";

type JourneyProgressProps = {
  stops: JourneyStop[];
  activeIndex: number;
  stopProgress: MotionValue<number>;
  onSelect: (index: number) => void;
};

type SegmentProps = {
  stop: JourneyStop;
  state: "done" | "active" | "pending";
  stopProgress: MotionValue<number>;
  onSelect: () => void;
};

const Segment = ({ stop, state, stopProgress, onSelect }: SegmentProps) => {
  const activeFill = useTransform(stopProgress, (p) => `${Math.round(p * 100)}%`);
  const fill = state === "done" ? "100%" : state === "pending" ? "0%" : activeFill;

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={stop.label}
      aria-current={state === "active" ? "step" : undefined}
      className="group relative flex h-6 flex-1 items-center lg:h-auto lg:w-6 lg:flex-1 lg:justify-center"
    >
      <span className="relative h-0.5 w-full overflow-hidden rounded-full bg-journey-fg/25 transition-colors group-hover:bg-journey-fg/40 lg:h-full lg:w-0.5">
        <motion.span style={{ "--fill": fill } as React.CSSProperties} className="absolute left-0 top-0 h-full w-[var(--fill)] rounded-full bg-journey-fg lg:h-[var(--fill)] lg:w-full" />
      </span>
      <motion.span
        initial={false}
        animate={{ opacity: state === "active" ? 1 : 0, x: state === "active" ? 0 : -6 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="pointer-events-none absolute left-8 top-1/2 hidden -translate-y-1/2 whitespace-nowrap text-xs font-medium tracking-[0.06em] text-journey-fg lg:block"
      >
        {stop.label}
      </motion.span>
    </button>
  );
};

export const JourneyProgress = ({ stops, activeIndex, stopProgress, onSelect }: JourneyProgressProps) => {
  const active = stops[activeIndex];

  return (
    <div className="flex flex-col gap-2 px-5 pt-5 sm:px-10 lg:absolute lg:inset-y-0 lg:left-0 lg:w-40 lg:justify-center lg:px-16 lg:pt-0">
      <div className="flex gap-1.5 sm:gap-2 lg:h-72 lg:w-6 lg:flex-col lg:gap-2">
        {stops.map((stop, i) => (
          <Segment
            key={stop.id}
            stop={stop}
            state={i < activeIndex ? "done" : i === activeIndex ? "active" : "pending"}
            stopProgress={stopProgress}
            onSelect={() => onSelect(i)}
          />
        ))}
      </div>
      <span className={cn("whitespace-nowrap text-xs font-medium tracking-[0.06em] text-journey-fg/70 lg:hidden")}>
        {String(activeIndex + 1).padStart(2, "0")} / {String(stops.length).padStart(2, "0")} · {active?.label}
      </span>
    </div>
  );
};
