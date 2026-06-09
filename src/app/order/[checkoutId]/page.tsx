"use client"

import { use } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { motion } from "motion/react"
import { Pill } from "@/components/ui/Pill"
import { FaArrowRight, FaArrowLeft } from "react-icons/fa"
import { CONTACT_EMAIL } from "@/lib/urls"
import { useOrderStatus } from "./useOrderStatus"

type PageProps = {
  params: Promise<{ checkoutId: string }>
}

export default function OrderPage({ params }: PageProps) {
  const { checkoutId } = use(params)
  const search = useSearchParams()
  const envQuery = search.get("env") === "sandbox" ? "?env=sandbox" : ""
  const { status, timedOut } = useOrderStatus(checkoutId, envQuery)

  return (
    <main className="min-h-dvh flex flex-col px-6 py-8 md:py-12 text-slate-200">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-slate-200 transition-colors w-fit"
      >
        <FaArrowLeft className="h-3 w-3" />
        Back to itsmatias.com
      </Link>

      <div className="flex-1 flex items-center justify-center">
        <Card>
          {status.state === "failed" ? (
            <Failed />
          ) : status.state === "ready" ? (
            <Ready productName={status.productName} deployUrl={status.deployUrl!} />
          ) : timedOut ? (
            <CheckEmail />
          ) : (
            <Preparing state={status.state} />
          )}
        </Card>
      </div>
    </main>
  )
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-2xl rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl px-8 py-12 md:px-14 md:py-16 text-center shadow-2xl shadow-black/40"
    >
      {children}
    </motion.section>
  )
}

function Preparing({ state }: { state: "pending" | "paid" }) {
  const label = state === "pending" ? "Confirming payment…" : "Preparing your site…"
  return (
    <>
      <div className="mx-auto mb-10 h-12 w-12 animate-spin rounded-full border-2 border-slate-700 border-t-white" />
      <h1 className="text-3xl md:text-4xl font-light text-white text-balance">{label}</h1>
      <p className="mt-4 text-sm text-slate-400 max-w-sm mx-auto">
        This usually takes a few seconds. Keep this tab open — you can also close it and we will email you the deploy link.
      </p>
    </>
  )
}

function Ready({
  productName,
  deployUrl,
}: {
  productName?: string
  deployUrl: string
}) {
  const heading = productName ? `Your ${productName} is ready` : "Your site is ready"
  return (
    <>
      <p className="text-xs uppercase tracking-[0.2em] text-emerald-400/80 mb-6">Payment confirmed</p>
      <h1 className="text-[var(--text-heading)] leading-[var(--text-heading--line-height)] font-light text-white text-balance">
        {heading}.
      </h1>
      <p className="mt-5 text-lg text-slate-300/90 text-balance">One click and you are live.</p>

      <div className="mt-12 flex flex-col items-center gap-5">
        <Pill
          as="a"
          href={deployUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="solid"
          size="lg"
          Icon={FaArrowRight}
        >
          Deploy to Vercel
        </Pill>
        <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
          Vercel will clone the source into your own GitHub account, install the integrations you choose, and deploy it.
          The temporary public source link expires in 72h.
        </p>
      </div>

      <div className="mt-14 pt-8 border-t border-white/5">
        <p className="text-xs text-slate-600">
          We also emailed this link to you. Safe to close this tab and come back later.
        </p>
      </div>
    </>
  )
}

function CheckEmail() {
  return (
    <>
      <div className="mx-auto mb-8 h-12 w-12 rounded-full border border-white/10 flex items-center justify-center text-slate-400">
        ✉
      </div>
      <h1 className="text-3xl md:text-4xl font-light text-white text-balance">Still preparing your site.</h1>
      <p className="mt-5 text-slate-400 max-w-md mx-auto leading-relaxed">
        This is taking longer than usual. Check your email — we send the deploy link as soon as everything is ready.
        Safe to close this tab.
      </p>
      <p className="mt-8 text-sm text-slate-500">
        Nothing after a few minutes? Email{" "}
        <a className="underline hover:text-white" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    </>
  )
}

function Failed() {
  return (
    <>
      <h1 className="text-3xl md:text-4xl font-light text-white text-balance">Something went wrong.</h1>
      <p className="mt-5 text-slate-400 max-w-md mx-auto leading-relaxed">
        Reach me at{" "}
        <a className="underline hover:text-white" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>{" "}
        with your receipt and I will sort it out.
      </p>
    </>
  )
}
