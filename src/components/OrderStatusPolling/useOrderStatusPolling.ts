"use client"

import { useEffect, useState } from "react"

export type OrderStatusState = "pending" | "paid" | "ready" | "failed"

export type OrderStatus = {
  state: OrderStatusState
  deployUrl?: string
  productName?: string
}

const POLL_INTERVAL_MS = 2500
const MAX_POLL_ATTEMPTS = 48

type Options = {
  checkoutId: string
  envQuery: string
  enabled?: boolean
}

export function useOrderStatusPolling({ checkoutId, envQuery, enabled = true }: Options) {
  const [status, setStatus] = useState<OrderStatus>({ state: "pending" })
  const [timedOut, setTimedOut] = useState(false)

  useEffect(() => {
    if (!enabled) return
    let active = true
    let timer: number | undefined
    let attempts = 0

    const poll = async () => {
      try {
        const res = await fetch(`/api/order/${checkoutId}${envQuery}`, { cache: "no-store" })
        const data = (await res.json()) as OrderStatus
        if (!active) return
        setStatus(data)
        if (data.state === "ready" || data.state === "failed") return
      } catch {
        if (!active) return
      }
      attempts += 1
      if (attempts >= MAX_POLL_ATTEMPTS) {
        setTimedOut(true)
        return
      }
      timer = window.setTimeout(poll, POLL_INTERVAL_MS)
    }

    poll()
    return () => {
      active = false
      if (timer) window.clearTimeout(timer)
    }
  }, [checkoutId, envQuery, enabled])

  return { status, timedOut }
}
