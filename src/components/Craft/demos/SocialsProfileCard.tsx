"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  BIO_TRANSITION,
  CARD_CONTENT_TRANSITION,
  TAB_SPRING,
  profileInitial,
} from "@/lib/craft/cardReveal";
import { cn } from "@/lib/utils";
import { SocialsLinkRow } from "./SocialsLinkRow";

type Tab = { id: string; label: string };
type Link = { network: string; title: string };

type Props = {
  name: string;
  bio: string;
  links: Link[];
  reveal: boolean;
  tabs?: Tab[];
  activeTabId?: string;
  activeIndex?: number;
  onTabChange?: (id: string) => void;
};

export const SocialsProfileCard = ({
  name,
  bio,
  links,
  reveal,
  tabs = [],
  activeTabId = "",
  activeIndex = 0,
  onTabChange,
}: Props) => (
  <div
    className="relative z-10 w-60 max-w-[calc(100%-2rem)] rounded-2xl shadow-2xl"
    style={{ visibility: reveal ? "visible" : "hidden", pointerEvents: reveal ? "auto" : "none" }}
  >
    <div className="absolute inset-0 rounded-2xl border border-white/18 bg-background/55 backdrop-blur-2xl [box-shadow:inset_0_1px_0_0_rgba(255,255,255,0.18)]" />
    <motion.div
      className="relative p-3"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: reveal ? 1 : 0, y: reveal ? 0 : 12 }}
      transition={CARD_CONTENT_TRANSITION}
    >
      <div className="flex items-center gap-3 pb-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/10 text-base font-semibold text-white ring-2 ring-white/18">
          {profileInitial(name)}
        </span>
        <div className="flex min-w-0 flex-col gap-0.5 text-left">
          <p className="truncate text-sm font-semibold tracking-tight text-white drop-shadow-md">{name}</p>
          <AnimatePresence mode="wait">
            <motion.p
              key={activeTabId}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={BIO_TRANSITION}
              className="truncate text-[10px] tracking-wide text-white/75 drop-shadow-md"
            >
              {bio}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {tabs.length > 1 && (
        <div
          role="tablist"
          className="relative mb-3 grid h-7 w-full rounded-lg border border-white/10 bg-white/[0.09] p-0.5 backdrop-blur-md"
          style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}
        >
          <motion.span
            aria-hidden
            className="absolute inset-y-0.5 left-0.5 rounded-md border border-white/18 bg-white/18 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]"
            style={{ width: `calc(${100 / tabs.length}% - 0.125rem)` }}
            animate={{ x: `${activeIndex * 100}%` }}
            transition={TAB_SPRING}
          />
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={tab.id === activeTabId}
              onClick={() => onTabChange?.(tab.id)}
              className={cn(
                "relative z-10 text-[11px] font-medium transition-colors hover:text-white",
                tab.id === activeTabId ? "text-white" : "text-white/58"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-1.5">
        {links.map((link) => (
          <SocialsLinkRow key={`${activeTabId}-${link.title}`} network={link.network} title={link.title} />
        ))}
      </div>
    </motion.div>
  </div>
);
