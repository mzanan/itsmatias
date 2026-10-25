import type { CreateTypes } from "canvas-confetti";

export const FIRST_POLL_MS = 800;
export const POLL_INTERVAL_MS = 1500;
export const MAX_ATTEMPTS = 20;
const CONFIRMED_ON_ATTEMPT = 1;
const BURST_MS = 900;
const BRAND_COLORS = ["#ff4f6b", "#b15cff", "#a78bfa"];

export type CheckoutStatus = "idle" | "confirming" | "success" | "timedout";

export const simulateConfirmCheckout = (attempt: number) =>
  Promise.resolve({ active: attempt >= CONFIRMED_ON_ATTEMPT });

export const createStageConfetti = async (canvas: HTMLCanvasElement): Promise<CreateTypes | null> => {
  const confettiModule = await import("canvas-confetti").catch(() => null);
  if (!confettiModule) return null;
  return confettiModule.default.create(canvas, { resize: true });
};

export const celebrate = (fire: CreateTypes) => {
  const end = Date.now() + BURST_MS;
  let frameId = 0;

  const frame = () => {
    fire({
      particleCount: 5,
      angle: 60,
      spread: 60,
      startVelocity: 55,
      origin: { x: 0, y: 0.7 },
      colors: BRAND_COLORS,
    });
    fire({
      particleCount: 5,
      angle: 120,
      spread: 60,
      startVelocity: 55,
      origin: { x: 1, y: 0.7 },
      colors: BRAND_COLORS,
    });
    if (Date.now() < end) frameId = requestAnimationFrame(frame);
  };

  frame();
  return () => cancelAnimationFrame(frameId);
};
