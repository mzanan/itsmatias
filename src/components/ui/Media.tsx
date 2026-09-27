"use client";

import Image from "next/image";
import { LazyVideo } from "@/components/LazyVideo/LazyVideo";
import { BeforeAfter } from "@/components/ui/BeforeAfter";
import { posterFor } from "@/lib/video";
import type { MediaSource } from "@/types/media";

type Props = {
  media: MediaSource;
  title: string;
  sizes: string;
  eager?: boolean;
};

export const Media = ({ media, title, sizes, eager = false }: Props) => {
  if (media.kind === "beforeAfter") {
    return (
      <BeforeAfter
        before={media.before}
        after={media.after}
        designWidth={media.designWidth}
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
