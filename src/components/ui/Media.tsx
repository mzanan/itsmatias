"use client";

import Image from "next/image";
import { LazyVideo } from "@/components/LazyVideo/LazyVideo";
import { BeforeAfter } from "@/components/ui/BeforeAfter";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { comparisonSide } from "@/lib/media";
import { posterFor } from "@/lib/video";
import type { MediaSource } from "@/types/media";

type Props = {
  media: MediaSource;
  title: string;
  sizes: string;
  eager?: boolean;
};

const DESKTOP_QUERY = "(min-width: 768px)";

export const Media = ({ media, title, sizes, eager = false }: Props) => {
  const isDesktop = useMediaQuery(DESKTOP_QUERY);

  if (media.kind === "beforeAfter" && !isDesktop && media.mobileVideo) {
    return (
      <LazyVideo
        src={media.mobileVideo}
        poster={posterFor(media.mobileVideo)}
        playbackRate={1.25}
        className="h-full w-full object-cover"
      />
    );
  }

  if (media.kind === "beforeAfter") {
    return (
      <BeforeAfter
        key={isDesktop ? "desktop" : "mobile"}
        before={comparisonSide(media.before, isDesktop)}
        after={comparisonSide(media.after, isDesktop)}
        designWidth={isDesktop ? media.designWidth : undefined}
      />
    );
  }

  if (media.kind === "image") {
    return (
      <Image
        src={media.src}
        alt={`${title} screenshot`}
        fill
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
    );
  }

  return (
    <LazyVideo
      src={media.src}
      poster={posterFor(media.src)}
      playbackRate={1.25}
      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
    />
  );
};
