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
  }, []);

  const about: AboutData = useMemo(
    () => ({
      description:
        "Hi, I'm Matias.\n\nI work remotely while traveling, building production websites end-to-end: design, code, deploy. No agencies, no handoffs, just code that ships.\n\nEvery project here was made by me, with care and attention to detail.",
      descriptionMobile:
        "Hi, I'm Matias.\n\nI build production websites end-to-end: design, code, deploy.\n\nRemote, traveling, made with care.",
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
