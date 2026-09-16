"use client";

import { motion, useMotionTemplate, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";
import { buildJourneyGeometry } from "@/lib/journey";
import type { JourneyStop } from "./useJourney";

const VIEW_W = 240;
const VIEW_H = 704;

type JourneyPathProps = {
  stops: JourneyStop[];
  activeIndex: number;
  pathReach: MotionValue<number>;
  onSelect: (index: number) => void;
  reducedMotion: boolean;
};

export const JourneyPath = ({ stops, activeIndex, pathReach, onSelect, reducedMotion }: JourneyPathProps) => {
  const { d, points, segments } = buildJourneyGeometry(stops.length, VIEW_W, VIEW_H);
  const dash = useMotionTemplate`${pathReach} ${segments}`;

  return (
    <div className="relative h-full w-16 shrink-0 sm:w-24 lg:w-60">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full overflow-visible"
        aria-hidden="true"
      >
        <path d={d} className="stroke-journey-line" strokeWidth={4} strokeLinecap="round" fill="none" vectorEffect="non-scaling-stroke" />
        <motion.path
          d={d}
          pathLength={segments}
          style={{ strokeDasharray: dash }}
          className="stroke-journey-muted"
          strokeWidth={4}
          strokeLinecap="round"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {stops.map((stop, i) => {
        const p = points[i];
        const isActive = i === activeIndex;
        const isDone = i < activeIndex;
        const onRight = p.x > VIEW_W / 2;
        return (
          <button
            key={stop.id}
            type="button"
            onClick={() => onSelect(i)}
            aria-label={stop.label}
            aria-current={isActive ? "step" : undefined}
            className="group absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-3"
            style={{ left: `${(p.x / VIEW_W) * 100}%`, top: `${(p.y / VIEW_H) * 100}%` }}
          >
            <span className="relative flex size-11 items-center justify-center">
              <span
                className={cn(
                  "block rounded-full transition-all duration-300",
                  isActive
                    ? "size-4 bg-journey-accent shadow-journey-dot"
                    : isDone
                      ? "size-2.5 bg-journey-muted group-hover:bg-journey-fg"
                      : "size-2.5 bg-journey-line group-hover:bg-journey-dim",
                )}
              />
              {isActive && !reducedMotion && (
                <span className="absolute size-4 animate-journey-halo rounded-full border border-journey-accent" />
              )}
            </span>
            <span
              className={cn(
                "hidden whitespace-nowrap text-xs tracking-[0.04em] transition-colors lg:block",
                onRight && "order-first",
                isActive ? "font-semibold text-journey-fg" : isDone ? "font-medium text-journey-muted" : "font-medium text-journey-dim",
              )}
            >
              {stop.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
