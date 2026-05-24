import confetti from "canvas-confetti";

const PLATINUM_COLORS = ["#ffffff", "#f1f5f9", "#cbd5e1", "#94a3b8"];

export const fireConfetti = () => {
  if (typeof window === "undefined") return;

  // Central burst — big, satisfying pop
  confetti({
    particleCount: 90,
    spread: 110,
    startVelocity: 45,
    origin: { x: 0.5, y: 0.5 },
    colors: PLATINUM_COLORS,
    scalar: 1.1,
    ticks: 220,
  });

  // Left + right cannons shoot toward center a moment later
  window.setTimeout(() => {
    confetti({
      particleCount: 55,
      angle: 60,
      spread: 75,
      startVelocity: 50,
      origin: { x: 0, y: 0.75 },
      colors: PLATINUM_COLORS,
      ticks: 220,
    });
    confetti({
      particleCount: 55,
      angle: 120,
      spread: 75,
      startVelocity: 50,
      origin: { x: 1, y: 0.75 },
      colors: PLATINUM_COLORS,
      ticks: 220,
    });
  }, 220);
};
