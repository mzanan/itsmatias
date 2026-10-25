import { useEffect, useRef, useState } from "react";
import type { CreateTypes } from "canvas-confetti";
import {
  FIRST_POLL_MS,
  MAX_ATTEMPTS,
  POLL_INTERVAL_MS,
  celebrate,
  createStageConfetti,
  simulateConfirmCheckout,
  type CheckoutStatus,
} from "@/lib/craft/paymentCelebration";

export const usePaymentCelebrationDemo = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const confettiRef = useRef<CreateTypes | null>(null);
  const [status, setStatus] = useState<CheckoutStatus>("idle");
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (run === 0) return;
    let cancelled = false;
    let attempts = 0;
    let timer = 0;
    let stopBurst: (() => void) | null = null;

    const fireCelebration = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      confettiRef.current ??= await createStageConfetti(canvas);
      if (cancelled || !confettiRef.current) return;
      stopBurst = celebrate(confettiRef.current);
    };

    const poll = async () => {
      if (cancelled) return;
      const res = await simulateConfirmCheckout(attempts).catch(() => ({ active: false }));
      if (cancelled) return;
      if (res.active) {
        setStatus("success");
        void fireCelebration();
        return;
      }
      attempts += 1;
      if (attempts >= MAX_ATTEMPTS) {
        setStatus("timedout");
        return;
      }
      timer = window.setTimeout(poll, POLL_INTERVAL_MS);
    };

    timer = window.setTimeout(poll, FIRST_POLL_MS);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      stopBurst?.();
    };
  }, [run]);

  useEffect(() => () => confettiRef.current?.reset(), []);

  const simulate = () => {
    setStatus("confirming");
    setRun((prev) => prev + 1);
  };

  const reset = () => setStatus("idle");

  return { canvasRef, status, simulate, reset };
};
