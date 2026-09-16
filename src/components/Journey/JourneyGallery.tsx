"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "motion/react";
import { Card } from "@/components/ui/card";
import { GALLERY_REVEAL, type JourneyMedia } from "@/lib/journey";
import { JourneyVideo } from "./JourneyVideo";

type JourneyGalleryProps = {
  items: JourneyMedia[];
  stopProgress: MotionValue<number>;
  reducedMotion: boolean;
};

type GalleryCardProps = {
  item: JourneyMedia;
  range: [number, number];
  stopProgress: MotionValue<number>;
  reducedMotion: boolean;
};

const GalleryCard = ({ item, range, stopProgress, reducedMotion }: GalleryCardProps) => {
  const opacity = useTransform(stopProgress, range, [0, 1]);
  const y = useTransform(stopProgress, range, reducedMotion ? [0, 0] : [48, 0]);
  const rotate = useTransform(stopProgress, range, reducedMotion ? [0, 0] : [4, 0]);

  return (
    <motion.div style={{ opacity, y, rotate }} className="flex-1 lg:w-32 lg:flex-none">
      <Card className="relative aspect-[4/5] overflow-hidden border-journey-fg/15 bg-journey-bg/40 p-0 shadow-journey-card backdrop-blur-sm">
        {item.video ? (
          <JourneyVideo video={item.video} className="absolute inset-0 size-full object-cover" />
        ) : (
          <Image src={item.image} alt="" fill sizes="(max-width: 1024px) 30vw, 220px" className="object-cover" />
        )}
      </Card>
    </motion.div>
  );
};

export const JourneyGallery = ({ items, stopProgress, reducedMotion }: JourneyGalleryProps) => (
  <div className="flex w-full gap-3 sm:gap-4 lg:w-auto lg:max-w-md lg:shrink-0">
    {items.slice(0, GALLERY_REVEAL.length).map((item, i) => (
      <GalleryCard
        key={item.video ? item.video.desktop : item.image}
        item={item}
        range={GALLERY_REVEAL[i]}
        stopProgress={stopProgress}
        reducedMotion={reducedMotion}
      />
    ))}
  </div>
);
