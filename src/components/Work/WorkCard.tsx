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

type Fit = "always" | "desktop";

const fitClasses: Record<
  Fit,
  { article: string; stage: string; media: string }
> = {
  always: {
    article: "min-h-0 flex-1",
    stage: "[container-type:size] min-h-0 flex-1",
    media: "w-[min(100cqw,calc(100cqh*16/9))]",
  },
  desktop: {
    article: "md:min-h-0 md:flex-1",
    stage: "md:[container-type:size] md:min-h-0 md:flex-1",
    media: "md:w-[min(100cqw,calc(100cqh*16/9))]",
  },
};

type Props = { item: WorkItem; fit?: Fit; className?: string };

export const WorkCard = ({ item, fit, className }: Props) => {
  const fitted = fit ? fitClasses[fit] : undefined;
  const isComparison = item.media.kind === "beforeAfter";
  const sizes = item.featured
    ? "(max-width: 768px) 100vw, 1152px"
    : "(max-width: 768px) 100vw, 560px";
  const aspect = cn(
    "aspect-video",
    isComparison && "aspect-[4/5] sm:aspect-video",
    fitted?.media
  );

  return (
    <motion.article
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      className={cn(
        "flex flex-col gap-5",
        item.featured && "md:col-span-2",
        fitted?.article,
        className
      )}
    >
      <div className={fitted?.stage}>
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
      </div>

      <div className="flex shrink-0 flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-10">
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
        <dl className="grid shrink-0 grid-cols-[auto_1fr] gap-x-4 gap-y-1 font-mono text-xs text-muted-foreground md:min-w-56">
          <dt className="text-foreground/40">Role</dt>
          <dd>{item.role}</dd>
          <dt className="text-foreground/40">Stack</dt>
          <dd>{item.stack.join(" · ")}</dd>
        </dl>
      </div>
    </motion.article>
  );
};
