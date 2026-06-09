"use client"

import { useEffect, useState } from "react"
import { use } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "motion/react"
import { Pill } from "@/components/ui/Pill"
import { FaArrowRight } from "react-icons/fa"
import { FaGithub } from "react-icons/fa6"
import { CONTACT_EMAIL } from "@/lib/urls"

type RepoAccessState = "invited" | "already_collaborator"

type OrderStatus = {
  state: "pending" | "paid" | "ready" | "failed"
  deployUrl?: string
  repoUrl?: string
  repoAccessState?: RepoAccessState
  productName?: string
}

type PageProps = {
  params: Promise<{ checkoutId: string }>
}

const POLL_INTERVAL_MS = 2500
const MAX_POLL_ATTEMPTS = 48

export default function OrderPage({ params }: PageProps) {
  const { checkoutId } = use(params)
  const search = useSearchParams()
  const envQuery = search.get("env") === "sandbox" ? "?env=sandbox" : ""
  const [status, setStatus] = useState<OrderStatus>({ state: "pending" })
  const [timedOut, setTimedOut] = useState(false)

  useEffect(() => {
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
  }, [checkoutId, envQuery])

  return (
    <main className="min-h-dvh flex items-center justify-center px-6 py-24 text-slate-200">
      <div className="w-full max-w-xl text-center">
        {status.state === "failed" ? (
          <Failed />
        ) : status.state === "ready" ? (
          <Ready
            productName={status.productName}
            deployUrl={status.deployUrl!}
            repoUrl={status.repoUrl!}
            repoAccessState={status.repoAccessState!}
          />
        ) : timedOut ? (
          <CheckEmail />
        ) : (
          <Preparing state={status.state} />
        )}
      </div>
    </main>
  )
}

function Preparing({ state }: { state: "pending" | "paid" }) {
  const label = state === "pending" ? "Confirming payment…" : "Preparing your site…"
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="mx-auto mb-8 h-10 w-10 animate-spin rounded-full border-2 border-slate-700 border-t-white" />
      <h1 className="text-3xl font-light text-white">{label}</h1>
      <p className="mt-3 text-sm text-slate-400">
        This usually takes a few seconds. Keep this tab open.
      </p>
    </motion.div>
  )
}

function Ready({
  productName,
  deployUrl,
  repoUrl,
  repoAccessState,
}: {
  productName?: string
  deployUrl: string
  repoUrl: string
  repoAccessState: RepoAccessState
}) {
  const heading = productName ? `Your ${productName} is ready` : "Your site is ready"
  const alreadyCollab = repoAccessState === "already_collaborator"
  const repoLabel = alreadyCollab ? "Open repository" : "Accept GitHub invite"
  const repoHelper = alreadyCollab
    ? "You already have access to the private source. Use it to pull future updates."
    : "Permanent read access to the private source. Use it to pull future updates."
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <h1 className="text-3xl md:text-4xl font-light text-white">{heading}.</h1>
      <p className="mt-3 text-slate-400">Two steps and you are live.</p>

      <div className="mt-12 flex flex-col items-center gap-4">
        <Pill as="a" href={deployUrl} target="_blank" rel="noopener noreferrer" variant="solid" size="lg" Icon={FaArrowRight}>
          Deploy to Vercel
        </Pill>
        <p className="text-xs text-slate-500 max-w-sm">
          Vercel will create a copy of the source in your own GitHub account and deploy it. The temporary public source link expires in 72h.
        </p>

        <div className="mt-6 flex flex-col items-center gap-3">
          <Pill as="a" href={repoUrl} target="_blank" rel="noopener noreferrer" variant="outline" size="md" Icon={FaGithub}>
            {repoLabel}
          </Pill>
          <p className="text-xs text-slate-500 max-w-sm">
            {repoHelper}
          </p>
        </div>
      </div>

      <p className="mt-16 text-xs text-slate-600">
        We also emailed you these links. Safe to close this tab.
      </p>
    </motion.div>
  )
}

function CheckEmail() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <h1 className="text-3xl font-light text-white">Still preparing your site.</h1>
      <p className="mt-3 text-slate-400 max-w-md mx-auto">
        This is taking longer than usual. Check your email — we send the deploy and source links as soon as everything is ready. You can safely close this tab.
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="text-3xl font-light text-white">Something went wrong.</h1>
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
