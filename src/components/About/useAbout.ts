import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useInView } from "framer-motion";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useScrollToSection } from "@/hooks/useScrollToSection";

type AboutData = {
  description: string;
  techStack: string[];
};

export const useAbout = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { margin: "-20% 0px", once: false });
  const { scrollDirection } = useScrollDirection();
  const { scrollToSection } = useScrollToSection();
  const [instagramImages, setInstagramImages] = useState<string[]>([]);
  const [displayedImages, setDisplayedImages] = useState<string[]>([]);
  const usedImagesRef = useRef<Set<string>>(new Set());
  const [imageDataCache, setImageDataCache] = useState<Record<string, string>>({});

  const getProxyImageUrl = useCallback((imageUrl: string): string => {
    if (imageDataCache[imageUrl]) {
      return imageDataCache[imageUrl];
    }
    return `/api/instagram/image?url=${encodeURIComponent(imageUrl)}`;
  }, [imageDataCache]);

  const getRandomImages = useCallback((
    images: string[],
    count: number,
    exclude: Set<string>,
    currentImages: string[]
  ): { newImages: string[]; shouldReset: boolean } => {
    const available = images.filter((img) => !exclude.has(img));

    if (available.length === 0) {
      const shuffled = [...images].sort(() => 0.5 - Math.random());
      return { newImages: shuffled.slice(0, count), shouldReset: true };
    }

    const keepCount = Math.floor(count / 2);
    const keepImages = currentImages.slice(0, keepCount);
    const newCount = count - keepImages.length;

    if (newCount <= 0) {
      const shuffled = [...currentImages].sort(() => 0.5 - Math.random());
      return { newImages: shuffled.slice(0, count), shouldReset: false };
    }

    const shuffled = [...available]
      .filter((img) => !keepImages.includes(img))
      .sort(() => 0.5 - Math.random());
    const newImages = shuffled.slice(0, newCount);

    const result = [...keepImages, ...newImages].sort(() => 0.5 - Math.random());
    return { newImages: result, shouldReset: false };
  }, []);


  useEffect(() => {
    const fetchInstagramImages = async () => {
      try {
        const response = await fetch("/api/instagram");
        const data = await response.json();
        if (data.images && data.images.length > 0) {
          setInstagramImages(data.images);
          if (data.imageData) {
            setImageDataCache(data.imageData);
          }
          const { newImages } = getRandomImages(data.images, 4, new Set(), []);
          setDisplayedImages(newImages);
          usedImagesRef.current = new Set(newImages);
        }
      } catch (error) {
        console.error("Error fetching Instagram images:", error);
      }
    };

    fetchInstagramImages();
  }, []);

  useEffect(() => {
    if (instagramImages.length === 0) return;

    const interval = setInterval(() => {
      setDisplayedImages((current) => {
        const { newImages, shouldReset } = getRandomImages(
          instagramImages,
          4,
          usedImagesRef.current,
          current
        );
        if (shouldReset) {
          usedImagesRef.current = new Set();
        } else {
          newImages.forEach((img) => usedImagesRef.current.add(img));
        }
        return newImages;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [instagramImages, getRandomImages]);

  const about: AboutData = useMemo(
    () => ({
      description:
        "Hi, I'm Matias. I create websites that look good, feel smooth, and help businesses grow online.\nI believe a website shouldn't just exist, it should actually do something for you: bring clients, show your work, or sell what you offer.\n\nI work remotely while traveling, which inspires my creativity and keeps me curious. Every project here was designed and developed entirely by me, with care and attention to detail.\nIf you're looking for someone who listens, understands what you need, and builds something that truly works, let's team up.",
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

  const leftVariants = useMemo(
    () => ({
      hiddenEnter: { opacity: 0, x: -100 },
      visible: { opacity: 1, x: 0 },
      hiddenExit: { opacity: 0, x: -100 },
    }),
    []
  );

  const rightVariants = useMemo(
    () => ({
      hiddenEnter: { opacity: 0, x: 100, y: 20 },
      visible: { opacity: 1, x: 0, y: 0, transition: { staggerChildren: 0.1 } },
      hiddenExit: { opacity: 0, x: 100 },
    }),
    []
  );

  const getLeftAnimation = useCallback(() => {
    if (isInView) return "visible";
    if (scrollDirection === "down") return "hiddenEnter";
    return "hiddenExit";
  }, [isInView, scrollDirection]);

  const getRightAnimation = useCallback(() => {
    if (isInView) return "visible";
    if (scrollDirection === "down") return "hiddenEnter";
    return "hiddenExit";
  }, [isInView, scrollDirection]);

  const scrollToContact = useCallback(() => {
    scrollToSection("contact");
  }, [scrollToSection]);

  return {
    about,
    scrollToContact,
    ref,
    isInView,
    scrollDirection,
    leftVariants,
    rightVariants,
    getLeftAnimation,
    getRightAnimation,
    displayedImages,
    getProxyImageUrl,
  };
};
