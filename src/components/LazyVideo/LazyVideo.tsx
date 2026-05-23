"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  className?: string;
};

export const LazyVideo = ({ src, className }: Props) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const load = () => {
      if (el.dataset.loaded === "true") return;
      el.dataset.loaded = "true";
      el.src = src;
      el.load();
      el.play().catch(() => {});
    };

    if (!("IntersectionObserver" in window)) {
      load();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            load();
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "50% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [src]);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      className={className}
      suppressHydrationWarning
    />
  );
};
