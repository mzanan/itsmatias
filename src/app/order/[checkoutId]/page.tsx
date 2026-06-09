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
    <div className="min-h-dvh flex flex-col text-slate-200">
      <header className="w-full">
        <nav className="container mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-lg font-bold gradient-text transition-all hover:opacity-80">
            itsmatias
          </Link>
        </nav>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-10">
        {status.state === "failed" ? (
          <Card showBack>
            <Failed />
          </Card>
        ) : status.state === "ready" ? (
          <Card showBack>
            <Ready productName={status.productName} deployUrl={status.deployUrl!} />
          </Card>
        ) : timedOut ? (
          <Card showBack>
            <CheckEmail />
          </Card>
        ) : (
          <div className="w-full max-w-lg text-center">
            <Preparing state={status.state} />
          </div>
        )}
      </main>
    </div>
  )
}

function Card({ children, showBack }: { children: React.ReactNode; showBack: boolean }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-lg rounded-2xl border border-white/15 bg-black/55 backdrop-blur-xl px-6 py-8 md:px-10 md:py-10 shadow-2xl shadow-black/50"
    >
      {showBack && (
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-slate-200 transition-colors"
        >
          <FaArrowLeft className="h-3 w-3" />
          Back to itsmatias.com
        </Link>
      )}
      <div className={`${showBack ? "mt-6" : ""} text-center`}>{children}</div>
    </motion.section>
  )
}

function Preparing({ state }: { state: "pending" | "paid" }) {
  const isPending = state === "pending"
  const label = isPending ? "Confirming payment…" : "Preparing your site…"
  const helper = isPending
    ? "Polar is finishing up. This usually takes a couple of seconds. Please keep this tab open."
    : "Payment confirmed. Building your deploy link now. Safe to close this tab if you need to. We will email it to you too."
  return (
    <>
      <div className="mx-auto mb-8 h-10 w-10 animate-spin rounded-full border-2 border-slate-700 border-t-white" />
      <h1 className="text-2xl md:text-3xl font-semibold text-white text-balance">{label}</h1>
      <p className="mt-4 text-base text-slate-300 max-w-md mx-auto leading-relaxed">
        {helper}
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
      <p className="text-[11px] uppercase tracking-[0.25em] text-emerald-400 mb-4">Payment confirmed</p>

      <h1 className="text-3xl md:text-4xl font-semibold text-white text-balance leading-tight">
        {heading}.
      </h1>
      <p className="mt-4 text-base text-slate-300">One click and you are live.</p>

      <div className="mt-8">
        <Pill
          as="a"
          href={deployUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="solid"
          size="md"
          Icon={FaArrowRight}
        >
          Deploy to Vercel
        </Pill>
      </div>

      <p className="mt-6 text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
        Vercel clones the source into your own GitHub, installs Neon Postgres + Vercel Blob, and deploys it. The temporary source link expires in 72h.
      </p>

      <div className="mt-8 pt-6 border-t border-white/15">
        <p className="text-sm text-slate-400">
          We also emailed this link. Safe to close this tab.
        </p>
      </div>
    </>
  )
}

function CheckEmail() {
  return (
    <>
      <div className="mx-auto mb-6 h-10 w-10 rounded-full border border-white/15 flex items-center justify-center text-base text-slate-300">
        ✉
      </div>
      <h1 className="text-2xl md:text-3xl font-semibold text-white text-balance">Still preparing your site.</h1>
      <p className="mt-4 text-base text-slate-300 max-w-md mx-auto leading-relaxed">
        This is taking longer than usual. Check your email. We send the deploy link as soon as everything is ready.
      </p>
      <div className="mt-8 pt-6 border-t border-white/15">
        <p className="text-sm text-slate-400">
          Nothing after a few minutes? Email{" "}
          <a className="underline hover:text-white" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </div>
    </>
  )
}

function Failed() {
  return (
    <>
      <h1 className="text-2xl md:text-3xl font-semibold text-white text-balance">Something went wrong.</h1>
      <p className="mt-4 text-base text-slate-300 max-w-md mx-auto leading-relaxed">
        Your payment is safe. Reach me at{" "}
        <a className="underline hover:text-white" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>{" "}
        with your receipt and I will sort it out.
      </p>
    </>
  )
}
