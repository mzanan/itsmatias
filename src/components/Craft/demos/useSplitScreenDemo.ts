import { useEffect, useRef, useState } from "react";
import { getDiagonalPosition, type PathType } from "@/lib/craft/splitScreen";

export const useSplitScreenDemo = () => {
  const [selectedType, setSelectedType] = useState<PathType | null>(null);
  const [hoveredPath, setHoveredPath] = useState<PathType | null>(null);
  const [arrivedType, setArrivedType] = useState<PathType | null>(null);
  const whiteSideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const whiteSideElement = whiteSideRef.current;
    if (!whiteSideElement) return;

    const handleTransitionEnd = (event: TransitionEvent) => {
      if (event.propertyName === "clip-path" && selectedType) {
        setArrivedType(selectedType);
      }
    };

    whiteSideElement.addEventListener("transitionend", handleTransitionEnd);
    return () => {
      whiteSideElement.removeEventListener("transitionend", handleTransitionEnd);
    };
  }, [selectedType]);

  const selectDay = () => setSelectedType("DAY");
  const selectNight = () => setSelectedType("NIGHT");

  const reset = () => {
    setSelectedType(null);
    setArrivedType(null);
  };

  const { topPosition, bottomPosition } = getDiagonalPosition(selectedType, hoveredPath);

  return {
    whiteSideRef,
    topPosition,
    bottomPosition,
    arrivedType,
    selectDay,
    selectNight,
    reset,
    dayHandlers: {
      onClick: selectDay,
      onMouseEnter: () => setHoveredPath("DAY"),
      onMouseLeave: () => setHoveredPath(null),
    },
    nightHandlers: {
      onClick: selectNight,
      onMouseEnter: () => setHoveredPath("NIGHT"),
      onMouseLeave: () => setHoveredPath(null),
    },
  };
};
