import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { EMBLA_OPTIONS, ROTATION_MS, isHorizontalWheel } from "@/lib/craft/vibeCarousel";

export const useVibeCarouselDemo = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(EMBLA_OPTIONS, [WheelGesturesPlugin({ forceWheelAxis: "x" })]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIdx(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onPointerDown = () => setPaused(true);
    emblaApi.on("pointerDown", onPointerDown);
    const node = emblaApi.rootNode();
    const onWheel = (e: WheelEvent) => {
      setPaused(true);
      if (isHorizontalWheel(e)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    node?.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      emblaApi.off("pointerDown", onPointerDown);
      node?.removeEventListener("wheel", onWheel);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi || paused) return;
    const t = window.setInterval(() => emblaApi.scrollNext(), ROTATION_MS);
    return () => window.clearInterval(t);
  }, [emblaApi, paused]);

  const goPrev = useCallback(() => {
    setPaused(true);
    emblaApi?.scrollPrev();
  }, [emblaApi]);
  const goNext = useCallback(() => {
    setPaused(true);
    emblaApi?.scrollNext();
  }, [emblaApi]);
  const goTo = useCallback(
    (i: number) => {
      setPaused(true);
      emblaApi?.scrollTo(i);
    },
    [emblaApi],
  );
  const resume = useCallback(() => setPaused(false), []);

  return { emblaRef, selectedIdx, paused, goPrev, goNext, goTo, resume };
};
