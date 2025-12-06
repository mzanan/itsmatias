import { useEffect, useState, useMemo } from "react";

type VantaEffect = {
  destroy: () => void;
};

export const useHero = (vantaRef: React.RefObject<HTMLDivElement | null>) => {

  useEffect(() => {
    if (!vantaRef.current) return;
    let vantaEffect: VantaEffect | null = null;

    const initVanta = async () => {
      if (typeof window === "undefined") return;
      const element = vantaRef.current;
      if (!element) return;

      const checkDimensions = () => {
        const rect = element.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      };

      if (!checkDimensions()) {
        setTimeout(initVanta, 100);
        return;
      }

      try {
        const windowObj = window as Window & { THREE?: unknown; VANTA?: { WAVES: (options: Record<string, unknown>) => VantaEffect } };

        const waitForVanta = (): Promise<void> => {
          return new Promise((resolve) => {
            if (windowObj.VANTA && typeof windowObj.VANTA.WAVES === "function" && windowObj.THREE) {
              resolve();
              return;
            }
            const checkInterval = setInterval(() => {
              if (windowObj.VANTA && typeof windowObj.VANTA.WAVES === "function" && windowObj.THREE) {
                clearInterval(checkInterval);
                resolve();
              }
            }, 50);
            setTimeout(() => {
              clearInterval(checkInterval);
              resolve();
            }, 5000);
          });
        };

        await waitForVanta();
        if (!element) return;
        const VANTA = windowObj.VANTA;
        const THREE = windowObj.THREE;
        if (!VANTA || !VANTA.WAVES || !THREE) return;

        vantaEffect = VANTA.WAVES({
          el: element,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          shininess: 10.0,
          waveHeight: 40.0,
          zoom: 1,
        });
      } catch {}
    };

    const timer = setTimeout(() => { initVanta(); }, 200);
    return () => {
      clearTimeout(timer);
      if (vantaEffect && vantaEffect.destroy) vantaEffect.destroy();
    };
  }, [vantaRef]);

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2, delayChildren: 0.1 },
      },
    }),
    []
  );

  const scrollIndicatorVariants = useMemo(
    () => ({
      animate: { y: [0, 10, 0] },
      transition: { duration: 2, repeat: Number.POSITIVE_INFINITY },
    }),
    []
  );

  const wordVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.4 } },
      exit: { opacity: 0, transition: { duration: 0.3 } },
    }),
    []
  );

  const phrases = useMemo(() => [
    "Transform your ideas into modern, high-performing websites.",
    "Craft a digital presence that truly represents your brand.",
    "Designed to convert and ready to grow."
  ], []);

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [visibleWordIndex, setVisibleWordIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const currentPhrase = phrases[currentPhraseIndex];
  const words = currentPhrase.split(" ");

  useEffect(() => {
    if (isFadingOut) {
      const fadeOutTimer = setTimeout(() => {
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        setVisibleWordIndex(0);
        setIsFadingOut(false);
      }, 500);
      return () => clearTimeout(fadeOutTimer);
    }

    if (visibleWordIndex < words.length) {
      const wordTimer = setTimeout(() => {
        setVisibleWordIndex((prev) => prev + 1);
      }, 200);
      return () => clearTimeout(wordTimer);
    }

    else {
      const pauseTimer = setTimeout(() => {
        setIsFadingOut(true);
      }, 2000);
      return () => clearTimeout(pauseTimer);
    }
  }, [visibleWordIndex, isFadingOut, words.length, phrases.length]);

  const containerPhraseVariants = useMemo(
    () => ({
      visible: {
        opacity: isFadingOut ? 0 : 1,
        transition: { duration: 0.5 },
      },
    }),
    [isFadingOut]
  );

  return {
    containerVariants,
    scrollIndicatorVariants,
    words,
    visibleWordIndex,
    wordVariants,
    containerPhraseVariants,
    currentPhraseIndex,
    isFadingOut,
  };
};