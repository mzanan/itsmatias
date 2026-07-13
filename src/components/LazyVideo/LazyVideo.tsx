"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  poster?: string;
  className?: string;
  playbackRate?: number;
};

export const LazyVideo = ({ src, poster, className, playbackRate = 1 }: Props) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.playbackRate = playbackRate;
  }, [playbackRate]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.dataset.loaded = "false";

    const load = () => {
      if (el.dataset.loaded === "true") return;
      el.dataset.loaded = "true";
      el.src = src;
      el.load();
    };

    if (!("IntersectionObserver" in window)) {
      load();
      el.play().catch(() => {});
      return;
    }

    const loadIo = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          load();
          loadIo.disconnect();
        }
      },
      { rootMargin: "50% 0px" },
    );

    const playbackIo = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          load();
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      }
    });

    loadIo.observe(el);
    playbackIo.observe(el);
    return () => {
      loadIo.disconnect();
      playbackIo.disconnect();
    };
  }, [src]);

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
