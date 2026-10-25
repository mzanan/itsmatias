"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { GRID_GAP, gridItemVariants, type GridShape } from "@/lib/craft/gridReveal";
import { useSocialsPhotoGridView } from "./useSocialsPhotoGridView";

type Props = {
  grid: GridShape;
  slots: string[];
  isActive: boolean;
  simulateLatency: boolean;
  onReady?: () => void;
};

export const SocialsPhotoGridView = ({ grid, slots, isActive, simulateLatency, onReady }: Props) => {
  const { readyCount, markLoaded } = useSocialsPhotoGridView({
    total: slots.length,
    isActive,
    simulateLatency,
    onReady,
  });

  return (
    <div
      className="absolute inset-0 grid"
      style={{
        gridTemplateColumns: `repeat(${grid.cols}, 1fr)`,
        gridTemplateRows: `repeat(${grid.rows}, 1fr)`,
        gap: GRID_GAP,
      }}
    >
      {slots.map((src, i) => (
        <div
          key={i}
          className="relative overflow-hidden rounded-sm bg-[#1a1a2e] before:absolute before:inset-0 before:-translate-x-full before:bg-[linear-gradient(100deg,transparent_30%,rgba(255,255,255,0.07)_50%,transparent_70%)] before:animate-[socials-skeleton-sweep_1.4s_ease-in-out_infinite] motion-reduce:before:animate-none"
        >
          <motion.div
            className="absolute inset-0"
            variants={gridItemVariants}
            custom={i}
            initial="hidden"
            animate={isActive && i < readyCount ? "visible" : "hidden"}
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={src}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="120px"
                  loading="eager"
                  className="object-cover"
                  onLoad={() => markLoaded(i)}
                  onError={() => markLoaded(i)}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      ))}
    </div>
  );
};
