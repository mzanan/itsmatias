import { useRef, useState, type MouseEvent } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { relativePoint, SPOTLIGHT_MEDIA_QUERY } from "@/lib/craft/wordSpotlight";

export const useAnimatedWord = (onClick?: () => void) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const textRef = useRef<HTMLDivElement>(null);
  const [isHoveringState, setIsHoveringState] = useState(false);

  const isDesktop = useMediaQuery(SPOTLIGHT_MEDIA_QUERY);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!isDesktop || !textRef.current) return;
    setMousePosition(
      relativePoint(event.clientX, event.clientY, textRef.current.getBoundingClientRect()),
    );
  };

  const handleMouseEnter = () => {
    if (!isDesktop) return;
    setIsHoveringState(true);
  };

  const handleMouseLeave = () => {
    if (!isDesktop) return;
    setIsHoveringState(false);
  };

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    onClick?.();
  };

  return {
    textRef,
    isHovering: isHoveringState && isDesktop,
    mousePosition,
    eventHandlers: {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onClick: handleClick,
    },
  };
};
