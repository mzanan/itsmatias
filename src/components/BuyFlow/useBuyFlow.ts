"use client"

import { useCallback, useRef, useState } from "react"
import { PolarEmbedCheckout } from "@polar-sh/checkout/embed"

type BuyFlowStep = "idle" | "loading" | "checkout" | "polling" | "error"

type CheckoutResponse = {
  checkoutUrl: string
  checkoutId: string
  env: "prod" | "sandbox"
}

type Options = {
  slug: "ecommerce" | "landing"
}

export function useBuyFlow({ slug }: Options) {
  const [step, setStep] = useState<BuyFlowStep>("idle")
  const [checkoutId, setCheckoutId] = useState<string | null>(null)
  const [envQuery, setEnvQuery] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const instanceRef = useRef<PolarEmbedCheckout | null>(null)

  const startCheckout = useCallback(async () => {
    setStep("loading")
    setErrorMessage(null)
    try {
      const res = await fetch(`/api/buy/${slug}`, { method: "GET", cache: "no-store" })
      if (!res.ok) throw new Error(`Checkout init failed (${res.status})`)
      const data = (await res.json()) as CheckoutResponse
      setCheckoutId(data.checkoutId)
      setEnvQuery(data.env === "sandbox" ? "?env=sandbox" : "")

      const instance = await PolarEmbedCheckout.create(data.checkoutUrl, { theme: "dark" })
      instanceRef.current = instance
      setStep("checkout")

      instance.addEventListener("success", () => {
        instance.close()
        instanceRef.current = null
        setStep("polling")
      })
      instance.addEventListener("close", () => {
        instanceRef.current = null
        if (step !== "polling") setStep("idle")
      })
    } catch (err) {
      console.error("[buy-flow] failed to start", err)
      setErrorMessage(err instanceof Error ? err.message : "Checkout unavailable")
      setStep("error")
    }
  }, [slug, step])

  const dismissModal = useCallback(() => {
    if (instanceRef.current) {
      instanceRef.current.close()
      instanceRef.current = null
    }
    setStep("idle")
    setCheckoutId(null)
  }, [])

  return { step, checkoutId, envQuery, errorMessage, startCheckout, dismissModal }
}
