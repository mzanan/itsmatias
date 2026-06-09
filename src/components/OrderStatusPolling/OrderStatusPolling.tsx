"use client"

import { motion } from "motion/react"
import { Pill } from "@/components/ui/Pill"
import { FaArrowRight } from "react-icons/fa"
import { CONTACT_EMAIL } from "@/lib/urls"
import { useOrderStatusPolling, type OrderStatusState } from "./useOrderStatusPolling"

type Props = {
  checkoutId: string
  envQuery: string
  enabled?: boolean
}

export function OrderStatusPolling({ checkoutId, envQuery, enabled }: Props) {
  const { status, timedOut } = useOrderStatusPolling({ checkoutId, envQuery, enabled })

  if (status.state === "failed") return <Failed />
  if (status.state === "ready") {
    return <Ready productName={status.productName} deployUrl={status.deployUrl!} />
  }
  if (timedOut) return <CheckEmail />
  return <Preparing state={status.state} />
}

function Preparing({ state }: { state: Exclude<OrderStatusState, "ready" | "failed"> }) {
  const label = state === "pending" ? "Confirming payment…" : "Preparing your site…"
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="text-center">
      <div className="mx-auto mb-8 h-10 w-10 animate-spin rounded-full border-2 border-slate-700 border-t-white" />
      <h2 className="text-2xl font-light text-white">{label}</h2>
      <p className="mt-3 text-sm text-slate-400">This usually takes a few seconds.</p>
    </motion.div>
  )
}

function Ready({ productName, deployUrl }: { productName?: string; deployUrl: string }) {
  const heading = productName ? `Your ${productName} is ready` : "Your site is ready"
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center">
      <h2 className="text-2xl md:text-3xl font-light text-white">{heading}.</h2>
      <p className="mt-3 text-slate-400">One click and you are live.</p>
      <div className="mt-8 flex flex-col items-center gap-4">
        <Pill as="a" href={deployUrl} target="_blank" rel="noopener noreferrer" variant="solid" size="lg" Icon={FaArrowRight}>
          Deploy to Vercel
        </Pill>
        <p className="text-xs text-slate-500 max-w-sm">
          Vercel will clone the source into your own GitHub account and deploy it. The temporary source link expires in 72h.
        </p>
      </div>
      <p className="mt-10 text-xs text-slate-600">We also emailed you this link.</p>
    </motion.div>
  )
}

function CheckEmail() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="text-center">
      <h2 className="text-2xl font-light text-white">Still preparing your site.</h2>
      <p className="mt-3 text-slate-400 max-w-md mx-auto">
        This is taking longer than usual. Check your email — we send the deploy link as soon as it&apos;s ready. You can safely close this.
      </p>
      <p className="mt-6 text-sm text-slate-500">
        Nothing in your inbox after a few minutes? Email{" "}
        <a className="underline hover:text-white" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    </motion.div>
  )
}

function Failed() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
      <h2 className="text-2xl font-light text-white">Something went wrong.</h2>
      <p className="mt-3 text-slate-400">
        Reach me at{" "}
        <a className="underline hover:text-white" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>{" "}
        with your receipt and I will sort it out.
      </p>
    </motion.div>
  )
}
