export const SPOTLIGHT_MEDIA_QUERY = "(min-width: 1024px)";

export const spotlightGradient = (x: number, y: number, color: string) =>
  `radial-gradient(circle 100px at ${x}px ${y}px, ${color} 50%, transparent 100%)`;

export const relativePoint = (clientX: number, clientY: number, rect: DOMRect) => ({
  x: clientX - rect.left,
  y: clientY - rect.top,
});
