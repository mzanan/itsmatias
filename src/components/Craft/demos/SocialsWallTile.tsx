"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { WALL_ENTRANCE_EASE, wallEntranceDelay } from "@/lib/craft/videoWall";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  index: number;
  style: CSSProperties;
  className?: string;
};

export const SocialsWallTile = ({ src, index, style, className }: Props) => (
  <motion.div
    className={cn("relative overflow-hidden rounded-md bg-[#110f1a]", className)}
    style={style}
    initial={{ opacity: 0, scale: 1.04 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1.1, delay: wallEntranceDelay(index), ease: WALL_ENTRANCE_EASE }}
  >
    <Image src={src} alt="" fill sizes="220px" className="object-cover" />
  </motion.div>
);
