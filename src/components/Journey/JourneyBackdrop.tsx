"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "motion/react";
import { backdropKeyframes } from "@/lib/journey";
import type { JourneyStop } from "./useJourney";
import { JourneyVideo } from "./JourneyVideo";

type JourneyBackdropProps = {
  stops: JourneyStop[];
  activeIndex: number;
  scrollProgress: MotionValue<number>;
  reducedMotion: boolean;
};

type LayerProps = {
  stop: JourneyStop;
  index: number;
  count: number;
  near: boolean;
  scrollProgress: MotionValue<number>;
  reducedMotion: boolean;
};

const Layer = ({ stop, index, count, near, scrollProgress, reducedMotion }: LayerProps) => {
  const frames = backdropKeyframes(index, count);
  const opacity = useTransform(scrollProgress, frames.opacityIn, frames.opacityOut);
  const scale = useTransform(scrollProgress, frames.scaleIn, reducedMotion ? [1, 1] : frames.scaleOut);

  return (
    <motion.div style={{ opacity, scale }} className="absolute inset-0 will-change-[opacity,transform]">
      {stop.video ? (
        <JourneyVideo video={stop.video} playing={near} near={near} className="absolute inset-0 size-full object-cover" />
      ) : (
        <Image src={stop.image} alt="" fill sizes="100vw" priority={near} className="object-cover" />
      )}
    </motion.div>
  );
};

export const JourneyBackdrop = ({ stops, activeIndex, scrollProgress, reducedMotion }: JourneyBackdropProps) => (
  <div className="absolute inset-0 overflow-hidden bg-journey-bg">
    {stops.map((stop, i) => (
      <Layer
        key={stop.id}
        stop={stop}
        index={i}
        count={stops.length}
        near={Math.abs(i - activeIndex) <= 1}
        scrollProgress={scrollProgress}
        reducedMotion={reducedMotion}
      />
    ))}
    <div className="absolute inset-0 bg-gradient-to-t from-journey-bg/85 via-journey-bg/10 to-journey-bg/40" />
  </div>
);
