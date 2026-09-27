"use client";

import { motion } from "motion/react";
import { FaArrowDown } from "react-icons/fa6";
import { Pill } from "@/components/ui/Pill";
import { useShaderCanvas } from "@/hooks/useShaderCanvas";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { URLS } from "@/lib/urls";
import { HeroStack } from "./HeroStack";
import { useHero } from "./useHero";

const STACK = ["Next.js", "React", "TypeScript", "Tailwind", "WebGL"];
const LOCATION = { city: "Da Nang, Vietnam", timeZone: "Asia/Ho_Chi_Minh" };
const CURRENTLY = { label: "Money Tracker", href: URLS.money };

export const Hero = () => {
  const shaderRef = useShaderCanvas("hero");
  const { clock } = useHero(LOCATION.timeZone);

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
        className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center gap-10 px-6 pb-10 pt-20 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] md:content-center md:items-center md:gap-12 md:px-10 md:pt-16 md:pb-0"
      >
        <HeroStack className="order-first h-[34dvh] w-full md:order-last md:h-auto md:self-stretch" />

        <div className="flex flex-col gap-8">
          <div>
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
              I design and build interfaces end to end: design tokens, motion
              and the production code behind them.
            </motion.p>
          </div>
          <div>
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-3"
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

            <motion.dl
              variants={fadeInUp}
              className="mt-12 grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 font-mono text-xs"
            >
              <dt className="text-foreground/40">Based in</dt>
              <dd className="text-muted-foreground">
                {LOCATION.city}
                <span
                  className="ml-2 text-foreground/70"
                  suppressHydrationWarning
                >
                  {clock ?? "--:--"}
                </span>
              </dd>
              <dt className="text-foreground/40">Building</dt>
              <dd>
                <a
                  href={CURRENTLY.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground underline decoration-white/20 underline-offset-4 transition-colors hover:text-foreground"
                >
                  {CURRENTLY.label}
                </a>
              </dd>
              <dt className="text-foreground/40">Stack</dt>
              <dd className="text-muted-foreground">{STACK.join(" · ")}</dd>
            </motion.dl>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
