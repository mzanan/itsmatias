"use client";

import { motion } from "motion/react";
import { LuCreditCard, LuLoaderCircle, LuPartyPopper } from "react-icons/lu";
import { Pill } from "@/components/ui/Pill";
import { ReplayPill } from "./ReplayPill";
import { usePaymentCelebrationDemo } from "./usePaymentCelebrationDemo";

export const PaymentCelebrationDemo = () => {
  const { canvasRef, status, simulate, reset } = usePaymentCelebrationDemo();

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-background p-4">
      <div className="flex w-full max-w-[16rem] flex-col items-center gap-3 rounded-2xl border border-white/10 bg-card px-5 py-5 text-center shadow-2xl">
        {status === "idle" && (
          <>
            <div className="flex size-12 items-center justify-center rounded-full bg-white/10">
              <LuCreditCard aria-hidden className="size-5 text-white/75" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold tracking-tight">Pro plan</p>
              <p className="text-xs text-muted-foreground">Simulate the return from checkout.</p>
            </div>
            <Pill size="sm" variant="solid" onClick={simulate}>
              Simulate payment
            </Pill>
          </>
        )}

        {status === "confirming" && (
          <>
            <div className="flex size-12 items-center justify-center rounded-full bg-white/[0.13]">
              <LuLoaderCircle aria-hidden className="size-6 animate-spin text-[#a78bfa]" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold tracking-tight">Confirming your payment…</p>
              <p className="text-xs text-muted-foreground">This only takes a few seconds.</p>
            </div>
          </>
        )}

        {status === "success" && (
          <>
            <motion.div
              initial={{ scale: 0.4, opacity: 0, rotate: -12 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 15 }}
              className="flex size-12 items-center justify-center rounded-full bg-[#a78bfa]/10"
            >
              <LuPartyPopper aria-hidden className="size-6 text-[#a78bfa]" strokeWidth={2} />
            </motion.div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold tracking-tight">You’re all set</p>
              <p className="text-xs text-muted-foreground">
                Thanks for subscribing.
                <br />
                Your profile is now active and published.
              </p>
            </div>
          </>
        )}

        {status === "timedout" && (
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold tracking-tight">Still processing</p>
            <p className="text-xs text-muted-foreground">Your payment is taking longer than usual.</p>
          </div>
        )}
      </div>
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 z-10 h-full w-full" />
      {(status === "success" || status === "timedout") && <ReplayPill onClick={reset} />}
    </div>
  );
};
