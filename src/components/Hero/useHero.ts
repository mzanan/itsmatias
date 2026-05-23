import { useEffect, useState, useMemo } from "react";

type VantaEffect = {
  destroy: () => void;
};

type WindowWithVanta = Window & {
  THREE?: unknown;
  VANTA?: { WAVES: (options: Record<string, unknown>) => VantaEffect };
};

const THREE_SRC =
  "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
const VANTA_SRC =
  "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js";

const loadScript = (src: string): Promise<void> =>
  new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${src}"]`,
    );
    if (existing) {
      if (existing.dataset.loaded === "true") {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject());
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = () => {
      s.dataset.loaded = "true";
      resolve();
    };
    s.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(s);
  });

export const useHero = (vantaRef: React.RefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    if (!vantaRef.current) return;
    let vantaEffect: VantaEffect | null = null;
    let cancelled = false;

    const init = async () => {
      try {
        await loadScript(THREE_SRC);
        await loadScript(VANTA_SRC);
        if (cancelled || !vantaRef.current) return;

        const w = window as WindowWithVanta;
        if (!w.VANTA?.WAVES || !w.THREE) return;

        vantaEffect = w.VANTA.WAVES({
          el: vantaRef.current,
          THREE: w.THREE,
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

    const idle =
      (window as Window & { requestIdleCallback?: (cb: () => void) => number })
        .requestIdleCallback;
    const handle = idle
      ? idle(() => init())
      : window.setTimeout(() => init(), 100);

    return () => {
      cancelled = true;
      if (typeof handle === "number") {
        clearTimeout(handle);
      }
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
    "Hi, I'm Matias.",
    "I build smooth, elegant, pixel-perfect websites end-to-end.",
    "Designed, coded, and shipped by me. Remote, traveling, deeply curious."
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
