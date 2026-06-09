"use client"

import { use } from "react"
import { useSearchParams } from "next/navigation"
import { OrderStatusPolling } from "@/components/OrderStatusPolling/OrderStatusPolling"

type PageProps = {
  params: Promise<{ checkoutId: string }>
}

export default function OrderPage({ params }: PageProps) {
  const { checkoutId } = use(params)
  const search = useSearchParams()
  const envQuery = search.get("env") === "sandbox" ? "?env=sandbox" : ""

  return (
    <main className="min-h-dvh flex items-center justify-center px-6 py-24 text-slate-200">
      <div className="w-full max-w-xl">
        <OrderStatusPolling checkoutId={checkoutId} envQuery={envQuery} />
      </div>
    </main>
  )
}
