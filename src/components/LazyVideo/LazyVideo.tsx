"use client";

import { useLazyVideo } from "./useLazyVideo";

type Props = {
  src: string;
  poster?: string;
  className?: string;
  playbackRate?: number;
};

export const LazyVideo = ({ src, poster, className, playbackRate = 1 }: Props) => {
  const { ref } = useLazyVideo(src, playbackRate);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      className={className}
      suppressHydrationWarning
    />
  );
};
