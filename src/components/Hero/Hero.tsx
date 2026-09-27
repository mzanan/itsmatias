"use client";

import { motion } from "motion/react";
import { FaArrowDown } from "react-icons/fa6";
import { Pill } from "@/components/ui/Pill";
import { useShaderCanvas } from "@/hooks/useShaderCanvas";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const STACK = ["Next.js", "React", "TypeScript", "Tailwind", "WebGL"];

export const Hero = () => {
  const shaderRef = useShaderCanvas("hero");

  return (
    <section
      id="home"
      className="relative h-dvh w-full snap-start overflow-hidden"
    >
      <div ref={shaderRef} aria-hidden className="absolute inset-0 z-0" />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-0 h-1/2 bg-linear-to-t from-background to-transparent pointer-events-none"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-6 pt-16 md:px-10"
      >
        <motion.p
          variants={fadeInUp}
          className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
        >
          Design Engineer
        </motion.p>
        <motion.h1
          variants={fadeInUp}
          className="mt-4 text-display font-semibold tracking-tight text-balance"
        >
          Matias Zanan
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          className="mt-5 max-w-xl text-subtitle text-foreground/70 leading-snug text-pretty"
        >
          I design and build interfaces end to end: design tokens, motion and
          the production code behind them.
        </motion.p>
        <motion.div
          variants={fadeInUp}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <Pill
            as="a"
            href="#work"
            variant="solid"
            size="md"
            Icon={FaArrowDown}
          >
            Selected work
          </Pill>
          <Pill as="a" href="#lab" variant="ghost" size="md">
            Lab
          </Pill>
        </motion.div>
        <motion.ul
          variants={fadeInUp}
          className="mt-12 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-muted-foreground"
        >
          {STACK.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
};
