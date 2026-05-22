import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useInView } from "framer-motion";

type AboutData = {
  description: string;
  descriptionMobile: string;
  techStack: string[];
};

export const useAbout = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { margin: "-20% 0px", once: false });
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
          if (data.imageData && Object.keys(data.imageData).length > 0) {
            setImageDataCache(data.imageData);
          const { newImages } = getRandomImages(data.images, 4, new Set(), []);
            const availableImages = newImages.filter(img => data.imageData[img]);
            if (availableImages.length > 0) {
              setDisplayedImages(availableImages);
              usedImagesRef.current = new Set(availableImages);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching Instagram images:", error);
      }
    };

    fetchInstagramImages();
  }, [getRandomImages]);

  useEffect(() => {
    if (instagramImages.length === 0 || Object.keys(imageDataCache).length === 0) return;

    const interval = setInterval(() => {
      setDisplayedImages((current) => {
        const availableImages = instagramImages.filter(img => imageDataCache[img]);
        if (availableImages.length === 0) return current;

        const { newImages, shouldReset } = getRandomImages(
          availableImages,
          4,
          usedImagesRef.current,
          current
        );
        const validImages = newImages.filter(img => imageDataCache[img]);
        if (shouldReset) {
          usedImagesRef.current = new Set();
        } else {
          validImages.forEach((img) => usedImagesRef.current.add(img));
        }
        return validImages.length > 0 ? validImages : current;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [instagramImages, imageDataCache, getRandomImages]);

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

  // Unificado con el patrón de Contact: fade + slight y, sin x-translate.
  // El stagger entre left/right viene del containerVariants envolvente.
  const leftVariants = useMemo(
    () => ({
      hiddenEnter: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      hiddenExit: { opacity: 0, y: 20 },
    }),
    []
  );

  const rightVariants = useMemo(
    () => ({
      hiddenEnter: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.15 } },
      hiddenExit: { opacity: 0, y: 20 },
    }),
    []
  );

  const getLeftAnimation = () => {
    return isInView ? "visible" : "hiddenEnter";
  };

  const getRightAnimation = () => {
    return isInView ? "visible" : "hiddenEnter";
  };

  return {
    about,
    ref,
    isInView,
    leftVariants,
    rightVariants,
    getLeftAnimation,
    getRightAnimation,
    displayedImages,
    getProxyImageUrl,
  };
};
