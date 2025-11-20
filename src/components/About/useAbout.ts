import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { FaShoppingCart, FaRocket, FaCode } from "react-icons/fa";
import { IconType } from "react-icons";

type Capability = {
  icon: string;
  title: string;
  description: string;
};

type AboutData = {
  description: string;
  capabilities: Capability[];
  techStack: string[];
};

export const useAbout = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { margin: "-20% 0px", once: false });
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");
  const lastY = useRef(0);

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

  const about: AboutData = {
    description:
      "I help brands, creators, and entrepreneurs build powerful online presence through modern web solutions. Every project is tailored to drive real business results.",
    capabilities: [
      {
        icon: "shopping-cart",
        title: "Conversion-Focused E-commerce",
        description:
          "Building platforms that turn visitors into customers with optimized checkout flows and seamless payment integration.",
      },
      {
        icon: "rocket",
        title: "Lead Generation Landing Pages",
        description:
          "Crafting modern landing pages designed to capture leads and convert visitors into clients.",
      },
      {
        icon: "code",
        title: "Scalable Full-Stack Applications",
        description:
          "Developing optimized and scalable applications that grow with your business needs.",
      },
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "Supabase",
      "Stripe",
    ],
  };

  const getIcon = (icon: string): IconType => {
    return icon === "shopping-cart" ? FaShoppingCart : icon === "rocket" ? FaRocket : FaCode;
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
    getIcon,
    leftVariants,
    rightVariants,
    getLeftAnimation,
    getRightAnimation,
  };
};
