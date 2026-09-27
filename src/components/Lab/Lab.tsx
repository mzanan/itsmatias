"use client";

import { AnimatePresence, motion } from "motion/react";
import { FaGithub } from "react-icons/fa6";
import { Pill } from "@/components/ui/Pill";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LAB_REPO_URL } from "@/lib/shaders";
import { cn } from "@/lib/utils";
import { useLab } from "./useLab";

export const Lab = () => {
  const { shaders, active, setActiveId, stageRef } = useLab();

  return (
    <section
      id="lab"
      className="w-full snap-start px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-12 md:gap-16">
        <SectionHeader
          index="02"
          label="Lab"
          title="Shaders, measured before they ship."
          description="Small experiments I run to know what a technique costs before it reaches a real page. These four render live on your GPU; move your pointer over them."
        />

        <div className="relative aspect-4/5 sm:aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-card shadow-2xl shadow-black/40">
          <div
            key={active.id}
            ref={stageRef}
            aria-hidden
            className="absolute inset-0"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-5 md:flex-row md:items-end md:justify-between md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="max-w-md"
              >
                <p className="text-lg font-semibold tracking-tight">
                  {active.name}
                </p>
                <p className="mt-1 text-sm text-foreground/70 text-pretty">
                  {active.note}
                </p>
              </motion.div>
            </AnimatePresence>

            <div
              role="tablist"
              aria-label="Shader"
              className="flex w-fit gap-1 rounded-full border border-white/15 bg-black/50 p-1 backdrop-blur-md"
            >
              {shaders.map((shader) => {
                const selected = shader.id === active.id;
                return (
                  <button
                    key={shader.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActiveId(shader.id)}
                    className={cn(
                      "relative rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                      selected ? "text-black" : "text-white/70 hover:text-white"
                    )}
                  >
                    {selected && (
                      <motion.span
                        layoutId="lab-tab"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 40,
                        }}
                        className="absolute inset-0 rounded-full bg-white"
                      />
                    )}
                    <span className="relative">{shader.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl text-sm text-muted-foreground leading-relaxed text-pretty">
            The lab compared bundle size and GPU frame time across three
            renderers. This page applies the result: a 10 KB WebGL layer instead
            of three.js, pixel ratio capped, rendering paused off-screen and
            under reduced motion.
          </p>
          <Pill
            as="a"
            href={LAB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            size="md"
            Icon={FaGithub}
            iconPosition="left"
            className="w-fit"
          >
            Read the lab
          </Pill>
        </div>
      </div>
    </section>
  );
};
