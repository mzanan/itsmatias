"use client";

import type { ReactNode } from "react";
import { MotionConfig, motion } from "motion/react";
import { fadeInUp } from "@/lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
};

export const FadeIn = ({ children, className }: Props) => (
  <MotionConfig reducedMotion="user">
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      className={className}
    >
      {children}
    </motion.div>
  </MotionConfig>
);
