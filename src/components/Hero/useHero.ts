import { useEffect, useState } from "react";

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
        
        if (!VANTA || !VANTA.WAVES || !THREE) {
          return;
        }

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
          shininess: 50.0,
          waveHeight: 20.0,
          zoom: 1.05,
        });
      } catch {
      }
    };

    const timer = setTimeout(() => {
      initVanta();
    }, 200);

    return () => {
      clearTimeout(timer);
      if (vantaEffect && vantaEffect.destroy) {
        vantaEffect.destroy();
      }
    };
  }, [vantaRef]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const scrollIndicatorVariants = {
    animate: { y: [0, 10, 0] },
    transition: { duration: 2, repeat: Number.POSITIVE_INFINITY },
  };

  const words = ["Build.", "Create.", "Deploy."];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [words.length]);

  const wordVariants = {
    enter: {
      y: 50,
      opacity: 0,
    },
    center: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      y: -50,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return {
    containerVariants,
    itemVariants,
    scrollIndicatorVariants,
    words,
    currentWordIndex,
    wordVariants,
  };
};
