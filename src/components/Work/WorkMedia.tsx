"use client";

import Image from "next/image";
import { LazyVideo } from "@/components/LazyVideo/LazyVideo";
import { BeforeAfter } from "@/components/ui/BeforeAfter";
import { posterFor } from "@/lib/video";
import { URLS } from "@/lib/urls";
import type { WorkMedia as WorkMediaType } from "./types";

type Props = {
  media: WorkMediaType;
  title: string;
  sizes: string;
  eager?: boolean;
};

export const WorkMedia = ({ media, title, sizes, eager = false }: Props) => {
  if (media.kind === "beforeAfter") {
    return (
      <BeforeAfter
        before={{
          src: URLS.hangoutBefore,
          poster: "/showcase/hangout-before-desktop.webp",
          alt: `${title} original design`,
        }}
        after={{
          src: URLS.hangoutAfter,
          poster: "/showcase/hangout-after-desktop.webp",
          alt: `${title} redesign`,
        }}
        designWidth={1728}
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
