import { useEffect, useRef } from "react";
import { runAfterLoadWhenIdle } from "@/lib/idle";

const PLAY_THRESHOLD = 0.25;

export const useLazyVideo = (src: string, playbackRate: number) => {
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

    let loadIo: IntersectionObserver | undefined;
    let playbackIo: IntersectionObserver | undefined;

    const cancelIdle = runAfterLoadWhenIdle(() => {
      if (!("IntersectionObserver" in window)) {
        load();
        el.play().catch(() => {});
        return;
      }

      loadIo = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            load();
            loadIo?.disconnect();
          }
        },
        { rootMargin: "50% 0px" },
      );

      playbackIo = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.intersectionRatio >= PLAY_THRESHOLD) {
              load();
              el.play().catch(() => {});
            } else {
              el.pause();
            }
          }
        },
        { threshold: [0, PLAY_THRESHOLD] },
      );

      loadIo.observe(el);
      playbackIo.observe(el);
    });

    return () => {
      cancelIdle();
      loadIo?.disconnect();
      playbackIo?.disconnect();
    };
  }, [src]);

  return { ref };
};
