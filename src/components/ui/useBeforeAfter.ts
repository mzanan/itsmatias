"use client";

import * as React from "react";

const clamp = (n: number) => Math.min(100, Math.max(0, n));

type Frame = { width: number; height: number; scale: number };

export const useBeforeAfter = (initial: number, designWidth?: number) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const draggingRef = React.useRef(false);
  const [pos, setPos] = React.useState(clamp(initial));
  const [live, setLive] = React.useState(false);
  const [frame, setFrame] = React.useState<Frame | null>(null);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el || !("IntersectionObserver" in window)) {
      setLive(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setLive(entry.isIntersecting);
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el || !designWidth || !("ResizeObserver" in window)) return;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (!w || !h) return;
      const scale = w / designWidth;
      setFrame({ width: designWidth, height: h / scale, scale });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [designWidth]);

  const updateFromClientX = React.useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos(clamp(((clientX - rect.left) / rect.width) * 100));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (draggingRef.current) updateFromClientX(e.clientX);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    draggingRef.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPos((p) => clamp(p - 2));
    if (e.key === "ArrowRight") setPos((p) => clamp(p + 2));
  };

  return { containerRef, pos, live, frame, onPointerDown, onPointerMove, onPointerUp, onKeyDown };
};
