"use client";

import { motion } from "motion/react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Media } from "@/components/ui/Media";
import { surface } from "@/lib/surface";
import type { WorkItem } from "./types";

const frame = cn(
  surface(),
  "group relative block transition-colors duration-300 hover:border-white/25"
);

type Props = { item: WorkItem };

export const WorkCard = ({ item }: Props) => {
  const isComparison = item.media.kind === "beforeAfter";
  const sizes = item.featured
    ? "(max-width: 768px) 100vw, 1152px"
    : "(max-width: 768px) 100vw, 560px";
  const aspect = cn(
    "aspect-video",
    isComparison && "aspect-[4/5] sm:aspect-video"
  );

  return (
    <motion.article
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      className={cn(
        "flex flex-col gap-5",
        item.featured &&
          "md:col-span-2 md:w-[min(100%,calc((100dvh-18rem)*16/9))]"
      )}
    >
      {isComparison ? (
        <div className={cn(frame, aspect)}>
          <Media media={item.media} title={item.title} sizes={sizes} />
        </div>
      ) : (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${item.title}`}
          className={cn(frame, aspect)}
        >
          <Media media={item.media} title={item.title} sizes={sizes} />
        </a>
      )}

      <div
        className={cn(
          "flex shrink-0 flex-col gap-3",
          item.featured &&
            "md:flex-row md:items-start md:justify-between md:gap-10"
        )}
      >
        <div className="flex max-w-xl flex-col gap-2">
          <h3 className="text-xl font-semibold tracking-tight">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-foreground/80 transition-colors"
            >
              {item.title}
              <FaArrowUpRightFromSquare className="h-3 w-3 text-muted-foreground" />
            </a>
          </h3>
          <p className="text-sm md:text-base text-foreground/70 leading-relaxed text-pretty">
            {item.summary}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
            {item.detail}
          </p>
        </div>
        <dl
          className={cn(
            "grid shrink-0 grid-cols-[auto_1fr] gap-x-4 gap-y-1 font-mono text-xs text-muted-foreground",
            item.featured && "md:min-w-56"
          )}
        >
          <dt className="text-foreground/40">Role</dt>
          <dd>{item.role}</dd>
          <dt className="text-foreground/40">Stack</dt>
          <dd>{item.stack.join(" · ")}</dd>
        </dl>
      </div>
    </motion.article>
  );
};
