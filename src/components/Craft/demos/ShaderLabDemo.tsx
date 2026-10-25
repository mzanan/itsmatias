"use client";

import { AnimatePresence, motion } from "motion/react";
import { useLab } from "@/components/Lab/useLab";
import { cn } from "@/lib/utils";

export const ShaderLabDemo = () => {
  const { shaders, active, setActiveId, stageRef } = useLab();

  return (
    <div className="relative h-full w-full overflow-hidden bg-background">
      <div key={active.id} ref={stageRef} aria-hidden className="absolute inset-0" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-black/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="max-w-xs"
          >
            <p className="text-sm font-semibold tracking-tight">{active.name}</p>
            <p className="mt-0.5 line-clamp-2 text-[11px] text-foreground/70 text-pretty">
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
                  "relative rounded-full px-2.5 py-1 text-[10px] font-medium transition-colors",
                  selected ? "text-black" : "text-white/70 hover:text-white"
                )}
              >
                {selected && (
                  <motion.span
                    layoutId="craft-lab-tab"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
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
  );
};
