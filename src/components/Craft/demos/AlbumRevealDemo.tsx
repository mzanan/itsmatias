"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { aspectRatioOf, tileReveal } from "@/lib/craft/albumReveal";
import { useAlbumRevealDemo } from "./useAlbumRevealDemo";
import { ReplayPill } from "./ReplayPill";

export const AlbumRevealDemo = () => {
  const { scrollRef, runId, columnLists, viewport, replay } = useAlbumRevealDemo();

  return (
    <div className="relative h-full w-full">
      <div ref={scrollRef} className="absolute inset-0 overflow-y-auto overscroll-contain p-3 [scrollbar-width:thin]">
        <p className="mb-3 px-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white/45">
          Scroll the album
        </p>
        <div key={runId} className="flex items-start gap-2">
          {columnLists.map((col, ci) => (
            <div key={ci} className="flex min-w-0 flex-1 flex-col gap-2">
              {col.map(({ photo, originalIndex }) => (
                <motion.div
                  key={photo.id}
                  variants={tileReveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewport}
                >
                  <div
                    className="group relative overflow-hidden rounded-lg bg-white/5"
                    style={{ aspectRatio: aspectRatioOf(photo) }}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.caption || `Photo ${originalIndex + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 160px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15" />
                    {photo.caption && (
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <p className="text-[9px] uppercase tracking-[0.18em] text-white">{photo.caption}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <ReplayPill onClick={replay} />
    </div>
  );
};
