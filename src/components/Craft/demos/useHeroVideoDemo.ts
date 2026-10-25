import { useEffect, useRef, useState } from "react";
import { HERO_VIDEO, heroVideoStatus } from "@/lib/craft/heroVideo";

export const useHeroVideoDemo = () => {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [replayId, setReplayId] = useState(0);
  const inView = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (el.readyState >= 3) setReady(true);
    const onCanPlay = () => setReady(true);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    el.addEventListener("canplay", onCanPlay);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);

    const io = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: HERO_VIDEO.threshold },
    );
    io.observe(el);

    return () => {
      el.removeEventListener("canplay", onCanPlay);
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || replayId === 0) return;
    const timer = setTimeout(() => {
      el.load();
      if (inView.current) el.play().catch(() => {});
    }, HERO_VIDEO.replayHoldMs);
    return () => clearTimeout(timer);
  }, [replayId]);

  const replay = () => {
    ref.current?.pause();
    setReady(false);
    setReplayId((id) => id + 1);
  };

  return { ref, ready, status: heroVideoStatus(ready, playing), replay };
};
