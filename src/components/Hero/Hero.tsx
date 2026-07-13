"use client";

import { useHero } from "./useHero";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { GlassBadge } from "@/components/ui/GlassBadge";
import { Pill } from "@/components/ui/Pill";
import { LazyVideo } from "@/components/LazyVideo/LazyVideo";
import { Title } from "@/components/Styles/Texts/Title/Title";
import { posterFor } from "@/lib/video";
import { URLS } from "@/lib/urls";

const projects = [
  {
    desktop: "/videos/ecommerce.mp4",
    mobile: "/videos/ecommerce-mobile.mp4",
    label: "ecommerce",
    href: URLS.ecommerce,
  },
  {
    desktop: "/videos/landing.mp4",
    mobile: "/videos/landing-mobile.mp4",
    label: "landing",
    href: URLS.landing,
  },
  {
    desktop: "/videos/links.mp4",
    mobile: "/videos/links-mobile.mp4",
    label: "social links",
    href: URLS.links,
  },
];

type Card = {
  src: string;
  label: string;
  href: string;
  format: "desktop" | "mobile";
};

const cards: Card[] = projects.flatMap((p) => [
  { src: p.desktop, label: p.label, href: p.href, format: "desktop" },
  { src: p.mobile, label: p.label, href: p.href, format: "mobile" },
]);

const loop = [...cards, ...cards];

const SPEED_DESKTOP = 90;
const SPEED_MOBILE = 100;

export const Hero = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const { scrollIndicatorVariants } = useHero(vantaRef);

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const sectionInView = useInView(sectionRef, { margin: "0px" });
  const [halfTrack, setHalfTrack] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isWheeling, setIsWheeling] = useState(false);
  const [speed, setSpeed] = useState(SPEED_DESKTOP);
  const [reduceMotion, setReduceMotion] = useState(false);
  const pointerStart = useRef({ x: 0, y: 0 });
  const movedFar = useRef(false);
  const wheelTimeoutRef = useRef<number | null>(null);

  const paused = isHovered || isDragging || isWheeling;

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => {
      const firstChild = el.children[0] as HTMLElement | undefined;
      const halfChild = el.children[cards.length] as HTMLElement | undefined;
      if (firstChild && halfChild) {
        setHalfTrack(halfChild.offsetLeft - firstChild.offsetLeft);
      } else {
        setHalfTrack(el.scrollWidth / 2);
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const speedMq = window.matchMedia("(max-width: 768px)");
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateSpeed = () =>
      setSpeed(speedMq.matches ? SPEED_MOBILE : SPEED_DESKTOP);
    const updateMotion = () => setReduceMotion(motionMq.matches);
    updateSpeed();
    updateMotion();
    speedMq.addEventListener("change", updateSpeed);
    motionMq.addEventListener("change", updateMotion);
    return () => {
      speedMq.removeEventListener("change", updateSpeed);
      motionMq.removeEventListener("change", updateMotion);
    };
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY) || Math.abs(e.deltaX) < 1)
        return;
      e.preventDefault();
      let next = x.get() - e.deltaX;
      while (halfTrack > 0 && next <= -halfTrack) next += halfTrack;
      while (halfTrack > 0 && next > 0) next -= halfTrack;
      x.set(next);
      setIsWheeling(true);
      if (wheelTimeoutRef.current) window.clearTimeout(wheelTimeoutRef.current);
      wheelTimeoutRef.current = window.setTimeout(
        () => setIsWheeling(false),
        600
      );
    };
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheel);
      if (wheelTimeoutRef.current) window.clearTimeout(wheelTimeoutRef.current);
    };
  }, [x, halfTrack]);

  useEffect(() => {
    if (reduceMotion) x.set(0);
  }, [reduceMotion, x]);

  useAnimationFrame((_, delta) => {
    if (paused || reduceMotion || !sectionInView || halfTrack === 0) return;
    let next = x.get() - (speed * delta) / 1000;
    while (next <= -halfTrack) next += halfTrack;
    while (next > 0) next -= halfTrack;
    x.set(next);
  });

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative h-dvh flex flex-col justify-center items-center text-center snap-start overflow-hidden w-full max-w-full"
    >
      <h1 className="sr-only">Matias Zanan: Web Developer</h1>
      <div
        ref={vantaRef}
        className="absolute inset-x-0 bottom-0 z-0 h-[70%] mask-[linear-gradient(to_bottom,transparent,black_45%)]"
      />

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-8">
        <motion.div
          initial={{ y: -12 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center px-4"
        >
          <Title as="h2" variant="display" centered showUnderline={false}>
            One of these could be yours.
          </Title>
        </motion.div>

        <div className="relative w-full overflow-hidden py-2">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-black/40 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-black/40 to-transparent z-10" />
          <motion.div
            ref={trackRef}
            style={{ x }}
            drag="x"
            dragMomentum={false}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            onPointerDownCapture={(e) => {
              pointerStart.current = { x: e.clientX, y: e.clientY };
              movedFar.current = false;
            }}
            onPointerMoveCapture={(e) => {
              if (movedFar.current) return;
              const dx = Math.abs(e.clientX - pointerStart.current.x);
              const dy = Math.abs(e.clientY - pointerStart.current.y);
              if (dx > 6 || dy > 6) movedFar.current = true;
            }}
            onClickCapture={(e) => {
              if (movedFar.current) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
            onPointerEnter={(e) => {
              if (e.pointerType === "mouse") setIsHovered(true);
            }}
            onPointerLeave={(e) => {
              if (e.pointerType === "mouse") setIsHovered(false);
            }}
            className="flex gap-4 md:gap-6 w-max cursor-grab active:cursor-grabbing touch-pan-y"
          >
            {loop.map((item, i) => {
              const sizeClasses =
                item.format === "desktop"
                  ? "h-[32dvh] md:h-[40dvh] aspect-video"
                  : "h-[32dvh] md:h-[40dvh] aspect-[9/16]";
              return (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  draggable={false}
                  className={`relative block ${sizeClasses} rounded-xl overflow-hidden border border-white/15 shadow-xl bg-black group shrink-0`}
                >
                  <LazyVideo
                    src={item.src}
                    poster={posterFor(item.src)}
                    playbackRate={1.25}
                    className="w-full h-full object-cover pointer-events-none transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-2 left-2 pointer-events-none">
                    <GlassBadge tone="dark">{item.label}</GlassBadge>
                  </div>
                </a>
              );
            })}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Pill as="a" href="#projects" Icon={FaArrowRight}>
            See all projects
          </Pill>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-4 md:bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10"
        animate={
          reduceMotion || !sectionInView
            ? { y: 0 }
            : scrollIndicatorVariants.animate
        }
        transition={scrollIndicatorVariants.transition}
      >
        <div className="flex flex-col items-center">
          <span className="text-xs md:text-sm tracking-widest">Scroll</span>
          <svg
            className="w-12 h-16 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
          >
            <rect x="9" y="3" width="6" height="18" rx="3" />
            <motion.g
              animate={
                reduceMotion || !sectionInView
                  ? { y: 0 }
                  : {
                      y: [0, 10, 0],
                    }
              }
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <circle cx="12" cy="7" r="1" fill="currentColor" />
            </motion.g>
          </svg>
        </div>
      </motion.div>
    </section>
  );
};
