"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { FaArrowRight, FaTimes } from "react-icons/fa";
import { Pill } from "@/components/ui/Pill";
import type { JourneyStop } from "./useJourney";

type JourneyExpandedProps = {
  stop: JourneyStop;
  index: number;
  onClose: () => void;
};

export const JourneyExpanded = ({ stop, index, onClose }: JourneyExpandedProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-journey-bg/80 p-4 backdrop-blur-sm sm:p-8"
    onClick={onClose}
    role="dialog"
    aria-modal="true"
    aria-label={stop.title}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: 8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onClick={(e) => e.stopPropagation()}
      className="relative flex h-full max-h-[720px] w-full max-w-6xl flex-col overflow-hidden rounded-3xl bg-journey-bg shadow-journey-card lg:flex-row"
    >
      <div className="relative h-2/5 w-full shrink-0 lg:h-full lg:w-3/5">
        <Image src={stop.image} alt={stop.title} fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.15, duration: 0.35 }}
        className="flex flex-1 flex-col gap-5 overflow-y-auto p-6 sm:p-10"
      >
        <span className="text-xs font-medium uppercase tracking-[0.08em] text-journey-muted">
          {String(index + 1).padStart(2, "0")}
          {stop.period && ` · ${stop.period}`}
        </span>
        <h2 className="font-display text-4xl leading-none text-journey-fg sm:text-5xl">{stop.title}</h2>
        <p className="text-base leading-relaxed text-journey-fg/80">{stop.summary}</p>
        <p className="text-base leading-relaxed text-journey-muted">{stop.body}</p>
        {stop.tags && stop.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {stop.tags.map((tag) => (
              <Pill key={tag} as="span" variant="outline" size="sm">
                {tag}
              </Pill>
            ))}
          </div>
        )}
        {stop.url && (
          <Pill as="a" href={stop.url} target="_blank" rel="noopener noreferrer" variant="solid" size="md" Icon={FaArrowRight} className="mt-auto self-start">
            Visit
          </Pill>
        )}
      </motion.div>
      <Pill
        type="button"
        onClick={onClose}
        variant="ghost"
        size="sm"
        Icon={FaTimes}
        iconPosition="left"
        aria-label="Close"
        className="absolute right-4 top-4"
      >
        Close
      </Pill>
    </motion.div>
  </motion.div>
);
