"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useAbout } from "@/components/About/useAbout";

export const AboutShuffleDemo = () => {
  const { ref, displayedImages } = useAbout();

  return (
    <section
      ref={ref}
      aria-label="About photos"
      className="relative flex h-full w-full items-center justify-center overflow-hidden p-4"
    >
      <div className="grid aspect-square h-full grid-cols-2 gap-2">
        {displayedImages.map((image) => (
          <motion.div
            key={image}
            layout
            transition={{ type: "spring", damping: 32, stiffness: 500 }}
            className="relative aspect-square overflow-hidden rounded-lg border border-primary/30"
          >
            <Image
              src={image}
              alt="Matias Zanan, web developer"
              fill
              sizes="120px"
              className="object-cover"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
