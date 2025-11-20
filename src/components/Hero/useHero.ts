import { FaBolt, FaMobileAlt, FaShieldAlt, FaCog } from "react-icons/fa";
import { IconType } from "react-icons";

type Benefit = {
  icon: string;
  label: string;
};

type HeroData = {
  subtitle: string;
  benefits: Benefit[];
};

export const useHero = () => {
  const hero: HeroData = {
    subtitle:
      "I build fast, responsive, and scalable websites for brands and creators, optimized for engagement and seamless online payments.",
    benefits: [
      { icon: "zap", label: "Fast Performance" },
      { icon: "smartphone", label: "Responsive Design" },
      { icon: "shield", label: "Secure Payments" },
      { icon: "settings", label: "Easy Management" },
    ],
  };

  const getIcon = (icon: string): IconType => {
    return icon === "zap"
      ? FaBolt
      : icon === "smartphone"
        ? FaMobileAlt
        : icon === "shield"
          ? FaShieldAlt
          : FaCog;
  };

  const scrollToProjects = () => {
    const element = document.getElementById("projects");
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

  return { hero, scrollToProjects, getIcon };
};
