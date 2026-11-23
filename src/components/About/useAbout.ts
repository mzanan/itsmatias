import { useState, useEffect, useRef, useMemo } from "react";
import { useInView } from "motion/react";
import { staggerContainer, fadeInUp } from "@/lib/motion";

type AboutData = {
  description: string;
  descriptionMobile: string;
  techStack: string[];
};

const ABOUT_IMAGES = [
  "/about/1.jpg",
  "/about/2.jpg",
  "/about/3.jpg",
  "/about/4.jpg",
];

const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

export const useAbout = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { margin: "-20% 0px", once: false });
  const [displayedImages, setDisplayedImages] = useState<string[]>(ABOUT_IMAGES);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setDisplayedImages((current) => {
        let next = shuffle(current);
        if (next[0] === current[0] && next[1] === current[1]) {
          next = [next[1], next[0], ...next.slice(2)];
        }
        return next;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isInView]);

  const about: AboutData = useMemo(
    () => ({
      description:
        "Hi, I'm Matias.\n\nI've been building for the web since 2020, and these days I work remotely while I travel. I design the interfaces and write the code behind them, from the first sketch to production.\n\nEvery project here was designed and built by me, with close attention to the details.",
      descriptionMobile:
        "Hi, I'm Matias.\n\nI design and build web interfaces, from the first sketch to production.\n\nRemote, traveling, careful with the details.",
      techStack: [
        "Next.js",
        "TypeScript",
        "React",
        "Tailwind CSS",
        "Supabase",
        "Stripe",
      ],
    }),
    []
  );

  return {
    about,
    ref,
    isInView,
    containerVariants: staggerContainer,
    itemVariants: fadeInUp,
    displayedImages,
  };
};
