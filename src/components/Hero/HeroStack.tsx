"use client";

import { motion } from "motion/react";
import { GlassBadge } from "@/components/ui/GlassBadge";
import { Media } from "@/components/ui/Media";
import { surface } from "@/lib/surface";
import type { MediaSource } from "@/types/media";
import { fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/utils";
import stackData from "./heroStack.json";
import { useHeroStack } from "./useHeroStack";

type StackCard = {
  id: string;
  label: string;
  href: string;
  media: MediaSource;
  className: string;
  float: number;
  rotate: number;
  spread: { x: number; y: number };
};

const cards = stackData as StackCard[];

export const HeroStack = ({ className }: { className?: string }) => {
  const { open, focus, onHoverStart, onHoverEnd } = useHeroStack(cards.length);

  return (
    <motion.div
      variants={fadeInUp}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      className={cn("relative [container-type:size]", className)}
    >
      {cards.map((card, i) => (
        <motion.a
          key={card.id}
          href={card.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${card.label}`}
          initial={{ rotate: card.rotate }}
          animate={
            focus === i
              ? {
                  rotate: 0,
                  scale: 1.2,
                  zIndex: 20,
                  x: card.spread.x,
                  y: card.spread.y,
                }
              : {
                  rotate: open ? card.rotate * 1.6 : card.rotate,
                  scale: 1,
                  zIndex: 0,
                  x: open ? card.spread.x : 0,
                  y: open ? card.spread.y : 0,
                }
          }
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          whileHover={{ scale: 1.2, rotate: 0, zIndex: 20 }}
          className={cn("group absolute block", card.className)}
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: card.float,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
            className={cn(
              surface({ tone: "floating" }),
              "relative h-full w-full"
            )}
          >
            <Media
              media={card.media}
              title={card.label}
              sizes="(max-width: 768px) 60vw, 420px"
              eager
            />
            <span className="pointer-events-none absolute bottom-2 left-2">
              <GlassBadge tone="dark" size="sm">
                {card.label}
              </GlassBadge>
            </span>
          </motion.div>
        </motion.a>
      ))}
    </motion.div>
  );
};
