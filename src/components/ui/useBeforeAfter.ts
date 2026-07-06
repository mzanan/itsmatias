"use client";

import * as React from "react";

const clamp = (n: number) => Math.min(100, Math.max(0, n));

type Frame = { width: number; height: number; scale: number };

export const useBeforeAfter = (initial: number, designWidth?: number) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState(clamp(initial));
  const [dragging, setDragging] = React.useState(false);
  const [live, setLive] = React.useState(false);
  const [inView, setInView] = React.useState(false);
  const [frame, setFrame] = React.useState<Frame | null>(null);
  const [interacted, setInteracted] = React.useState(false);
  const nudgedRef = React.useRef(false);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el || !("IntersectionObserver" in window)) {
      setLive(true);
      setInView(true);
      return;
    }
    const warmIo = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setLive(true);
          warmIo.disconnect();
        }
      },
      { rootMargin: "100% 0px" },
    );
    const viewIo = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setInView(entry.isIntersecting);
      },
      { threshold: 0.35 },
    );
    warmIo.observe(el);
    viewIo.observe(el);
    return () => {
      warmIo.disconnect();
      viewIo.disconnect();
    };
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

  React.useEffect(() => {
    if (!dragging) return;
    const onMove = (e: PointerEvent) => updateFromClientX(e.clientX);
    const onUp = () => setDragging(false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [dragging, updateFromClientX]);

  React.useEffect(() => {
    if (!inView || interacted || nudgedRef.current) return;
    nudgedRef.current = true;
    let raf = 0;
    let start = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const t = (ts - start) / 2800;
      if (t >= 1) {
        setPos(clamp(initial));
        return;
      }
      setPos(clamp(initial + Math.sin(t * 4 * Math.PI) * 12 * (1 - t)));
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, interacted, initial]);

  const startDrag = React.useCallback(
    (clientX: number) => {
      setDragging(true);
      setInteracted(true);
      updateFromClientX(clientX);
    },
    [updateFromClientX],
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setInteracted(true);
      setPos((p) => clamp(p - 2));
    }
    if (e.key === "ArrowRight") {
      setInteracted(true);
      setPos((p) => clamp(p + 2));
    }
  };

  const hinting = inView && !interacted;

  return { containerRef, pos, dragging, live, frame, hinting, startDrag, onKeyDown };
};
