"use client";

import { motion } from "motion/react";
import { spotlightGradient } from "@/lib/craft/wordSpotlight";
import { cn } from "@/lib/utils";
import { useAnimatedWord } from "./useAnimatedWord";

type Props = {
  word: string;
  className?: string;
  hoverColor?: string;
  onClick?: () => void;
};

export const AnimatedWord = ({ word, className, hoverColor = "deeppink", onClick }: Props) => {
  const { textRef, isHovering, mousePosition, eventHandlers } = useAnimatedWord(onClick);
  const textClasses = cn("select-none p-3 text-4xl tracking-tight", className);

  return (
    <motion.div
      ref={textRef}
      className="group relative cursor-pointer text-center"
      {...eventHandlers}
      initial={{ y: -8 }}
      animate={{ y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <p className={cn(textClasses, "relative")} aria-hidden="true">
        {word}
      </p>
      <p
        className={cn(textClasses, "pointer-events-none absolute inset-0 z-10")}
        style={{
          color: hoverColor,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundImage: isHovering
            ? spotlightGradient(mousePosition.x, mousePosition.y, hoverColor)
            : "none",
          opacity: isHovering ? 1 : 0,
          transition: "opacity 0.2s ease-in-out",
        }}
      >
        {word}
      </p>
    </motion.div>
  );
};
