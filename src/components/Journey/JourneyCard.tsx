"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { FiArrowUpRight, FiMaximize2 } from "react-icons/fi";
import { Pill } from "@/components/ui/Pill";
import { JOURNEY_CARD_LAYOUT_ID } from "@/lib/journey";
import type { JourneyStop } from "./useJourney";

type JourneyCardProps = {
  stop: JourneyStop;
  onOpen: () => void;
};

export const JourneyCard = ({ stop, onOpen }: JourneyCardProps) => (
  <motion.div
    layoutId={JOURNEY_CARD_LAYOUT_ID}
    onClick={onOpen}
    className="group relative aspect-[5/6] w-[min(560px,100%)] max-h-[calc(100dvh-10rem)] cursor-pointer overflow-hidden rounded-3xl bg-journey-line shadow-journey-card"
  >
    <AnimatePresence initial={false} mode="popLayout">
      <motion.div
        key={stop.id}
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <Image
          src={stop.image}
          alt={stop.title}
          fill
          sizes="(max-width: 1024px) 90vw, 560px"
          priority
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </motion.div>
    </AnimatePresence>

    <div className="absolute inset-x-0 bottom-0 h-3/5 backdrop-blur-2xl [mask-image:linear-gradient(to_top,black_55%,transparent)]" />
    <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-journey-bg/90 via-journey-bg/50 to-transparent" />

    <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={stop.id}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 sm:p-7"
      >
        <div className="flex flex-col gap-2">
          <span className="text-2xl font-bold tracking-tight text-journey-fg sm:text-3xl">{stop.title}</span>
          <p className="text-base leading-relaxed text-journey-fg/70">{stop.summary}</p>
        </div>

        {stop.stats && stop.stats.length > 0 && (
          <div className="flex items-center divide-x divide-journey-fg/20 py-1">
            {stop.stats.map((stat) => (
              <div key={stat.label} className="flex flex-1 flex-col items-center gap-1 px-2 first:items-start last:items-end">
                <span className="text-xl font-bold text-journey-fg">{stat.value}</span>
                <span className="text-sm text-journey-fg/70">{stat.label}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-3">
          <Pill
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
            variant="solid"
            size="lg"
            Icon={FiMaximize2}
            iconPosition="left"
            className="flex-1 justify-center"
          >
            Open
          </Pill>
          {stop.url && (
            <Pill
              as="a"
              href={stop.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              variant="ghost"
              size="lg"
              Icon={FiArrowUpRight}
              iconPosition="left"
              aria-label={`Visit ${stop.title}`}
              className="bg-journey-fg/15 px-5"
            />
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  </motion.div>
);
