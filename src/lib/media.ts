import type { ComparisonSide } from "@/types/media";

export const comparisonSide = (side: ComparisonSide, isDesktop: boolean) => ({
  src: side.src,
  alt: side.alt,
  poster: isDesktop ? side.poster : side.posterMobile,
});
