"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { OrderStatusPolling } from "@/components/OrderStatusPolling/OrderStatusPolling"
import { useBuyFlow } from "./useBuyFlow"

type Props = {
  slug: "ecommerce" | "landing"
  children: (props: { onClick: () => void; loading: boolean }) => React.ReactNode
}

export function BuyFlow({ slug, children }: Props) {
  const { step, checkoutId, envQuery, errorMessage, startCheckout, dismissModal } = useBuyFlow({ slug })

  const modalOpen = step === "polling" || step === "error"

  return (
    <>
      {children({ onClick: startCheckout, loading: step === "loading" })}
      <Dialog open={modalOpen} onOpenChange={(open) => !open && dismissModal()}>
        <DialogContent className="border-slate-800 bg-slate-950 text-slate-200 sm:max-w-md">
          {step === "polling" && checkoutId && (
            <div className="py-6">
              <OrderStatusPolling checkoutId={checkoutId} envQuery={envQuery} />
            </div>
          )}
          {step === "error" && (
            <div className="py-6 text-center">
              <h2 className="text-2xl font-light text-white">Checkout unavailable.</h2>
              <p className="mt-3 text-slate-400">{errorMessage}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
