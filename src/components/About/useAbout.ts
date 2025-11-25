import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

type AboutData = {
  description: string;
  techStack: string[];
};

export const useAbout = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { margin: "-20% 0px", once: false });
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");
  const lastY = useRef(0);
  const [instagramImages, setInstagramImages] = useState<string[]>([]);
  const [displayedImages, setDisplayedImages] = useState<string[]>([]);
  const [usedImages, setUsedImages] = useState<Set<string>>(new Set());
  const [imageDataCache, setImageDataCache] = useState<Record<string, string>>({});

  const getProxyImageUrl = (imageUrl: string): string => {
    if (imageDataCache[imageUrl]) {
      return imageDataCache[imageUrl];
    }
    return `/api/instagram/image?url=${encodeURIComponent(imageUrl)}`;
  };

  const getRandomImages = (
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
  };

  useEffect(() => {
    const mainElement = document.querySelector("main");
    if (!mainElement) return;

    const updateScrollDirection = () => {
      const scrollTop = mainElement.scrollTop;
      if (scrollTop > lastY.current) {
        setScrollDirection("down");
      } else if (scrollTop < lastY.current) {
        setScrollDirection("up");
      }
      lastY.current = scrollTop;
    };

    mainElement.addEventListener("scroll", updateScrollDirection);
    return () => {
      mainElement.removeEventListener("scroll", updateScrollDirection);
    };
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
          setUsedImages(new Set(newImages));
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
          usedImages,
          current
        );
        if (shouldReset) {
          setUsedImages(new Set());
        } else {
          setUsedImages((prev) => {
            const updated = new Set(prev);
            newImages.forEach((img) => updated.add(img));
            return updated;
          });
        }
        return newImages;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [instagramImages, usedImages]);

  const about: AboutData = {
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
  };

  const leftVariants = {
    hiddenEnter: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
    hiddenExit: { opacity: 0, x: -100 },
  };

  const rightVariants = {
    hiddenEnter: { opacity: 0, x: 100, y: 20 },
    visible: { opacity: 1, x: 0, y: 0, transition: { staggerChildren: 0.1 } },
    hiddenExit: { opacity: 0, x: 100 },
  };

  const getLeftAnimation = () => {
    if (isInView) return "visible";
    if (scrollDirection === "down") return "hiddenEnter";
    return "hiddenExit";
  };

  const getRightAnimation = () => {
    if (isInView) return "visible";
    if (scrollDirection === "down") return "hiddenEnter";
    return "hiddenExit";
  };

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    const mainElement = document.querySelector("main");

    if (element && mainElement) {
      const headerHeight = 64;
      const elementPosition = element.getBoundingClientRect().top;
      const mainScrollTop = mainElement.scrollTop;
      const offsetPosition = elementPosition + mainScrollTop - headerHeight;

      mainElement.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

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
