"use client";

import {
  AnimatePresence,
  motion,
  useTransform,
  type MotionValue,
} from "motion/react";
import { FiArrowUpRight, FiMaximize2 } from "react-icons/fi";
import { Pill } from "@/components/ui/Pill";
import type { JourneyStop } from "./useJourney";

type JourneyStopInfoProps = {
  stop: JourneyStop;
  onOpen: () => void;
  stopProgress: MotionValue<number>;
  reducedMotion: boolean;
};

export const JourneyStopInfo = ({
  stop,
  onOpen,
  stopProgress,
  reducedMotion,
}: JourneyStopInfoProps) => {
  const parallax = useTransform(
    stopProgress,
    [0, 1],
    reducedMotion ? [0, 0] : [0, -28]
  );

  return (
    <motion.div style={{ y: parallax }} className="flex-1">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={stop.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex max-w-xl flex-col gap-5"
        >
          {stop.period && (
            <span className="text-xs font-medium uppercase tracking-[0.08em] text-journey-fg/70">
              {stop.period}
            </span>
          )}
          <h2 className="font-display text-5xl leading-none text-journey-fg sm:text-7xl">
            {stop.title}
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-journey-fg/80">
            {stop.summary}
          </p>
          <div className="flex gap-3">
            <Pill
              type="button"
              onClick={onOpen}
              variant="solid"
              size="lg"
              Icon={FiMaximize2}
              iconPosition="left"
            >
              Open
            </Pill>
            {stop.url && (
              <Pill
                as="a"
                href={stop.url}
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
                size="lg"
                Icon={FiArrowUpRight}
                iconPosition="left"
                aria-label={`Visit ${stop.title}`}
                className="px-5"
              />
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
