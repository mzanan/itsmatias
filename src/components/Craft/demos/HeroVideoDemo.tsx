"use client";

import Image from "next/image";
import { GlassBadge } from "@/components/ui/GlassBadge";
import { HERO_VIDEO, STATUS_LABEL } from "@/lib/craft/heroVideo";
import { cn } from "@/lib/utils";
import { useHeroVideoDemo } from "./useHeroVideoDemo";
import { ReplayPill } from "./ReplayPill";

export const HeroVideoDemo = () => {
  const { ref, ready, status, replay } = useHeroVideoDemo();

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image src={HERO_VIDEO.still} alt="" fill sizes="(max-width: 768px) 100vw, 448px" className="object-cover" />
        <video
          ref={ref}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
            ready ? "opacity-100" : "opacity-0",
          )}
        >
          <source src={HERO_VIDEO.video} type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/10" />

      <div className="relative z-10 flex h-full flex-col justify-center px-5">
        <span className="mb-3 max-w-[14rem] text-[9px] uppercase leading-[1.6] tracking-[0.28em] text-white/85">
          Curated social experiences in Vietnam &amp; Thailand
        </span>
        <p className="max-w-[16rem] font-serif text-xl leading-[1.1] text-white sm:text-2xl">
          <span className="text-[#D5D7BD]">Build connections,</span>
          <br />
          <em>not just contacts.</em>
        </p>
      </div>

      <GlassBadge size="sm" className="absolute bottom-3 left-3 z-10">
        {STATUS_LABEL[status]}
      </GlassBadge>
      <ReplayPill onClick={replay} />
    </div>
  );
};
