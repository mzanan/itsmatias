"use client"

import { use } from "react"
import { useSearchParams } from "next/navigation"
import { Pill } from "@/components/ui/Pill"
import { FaArrowRight } from "react-icons/fa"
import { CONTACT_EMAIL } from "@/lib/urls"
import { SalesPageShell } from "@/components/Sales/SalesPageShell"
import { ConfirmationCard } from "@/components/Sales/ConfirmationCard"
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
    <SalesPageShell>
      {status.state === "failed" ? (
        <ConfirmationCard showBack>
          <Failed />
        </ConfirmationCard>
      ) : status.state === "ready" ? (
        <ConfirmationCard showBack>
          <Ready productName={status.productName} deployUrl={status.deployUrl!} />
        </ConfirmationCard>
      ) : timedOut ? (
        <ConfirmationCard showBack>
          <CheckEmail />
        </ConfirmationCard>
      ) : (
        <div className="w-full max-w-lg text-center">
          <Preparing state={status.state} />
        </div>
      )}
    </SalesPageShell>
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
