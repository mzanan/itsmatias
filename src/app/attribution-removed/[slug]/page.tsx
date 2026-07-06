import { notFound } from "next/navigation"
import { SalesPageShell } from "@/components/Sales/SalesPageShell"
import { ConfirmationCard } from "@/components/Sales/ConfirmationCard"

const PRODUCT_NAMES: Record<string, string> = {
  ecommerce: "Full Ecommerce",
  landing: "Full Landing",
}

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function AttributionRemovedPage({ params }: PageProps) {
  const { slug } = await params
  const productName = PRODUCT_NAMES[slug]
  if (!productName) notFound()

  return (
    <SalesPageShell>
      <ConfirmationCard showBack>
        <p className="text-[11px] uppercase tracking-[0.25em] text-emerald-400 mb-4">Payment confirmed</p>
        <h1 className="text-3xl md:text-4xl font-semibold text-white text-balance leading-tight">
          Attribution removed for {productName}.
        </h1>
        <p className="mt-4 text-base text-slate-300">
          Set <code className="text-slate-100">NEXT_PUBLIC_HIDE_ATTRIBUTION=true</code> in your {productName} Vercel project&apos;s environment variables, then redeploy. The footer credit disappears immediately.
        </p>
        <div className="mt-8 pt-6 border-t border-white/15">
          <p className="text-sm text-slate-400">We also emailed you these instructions.</p>
        </div>
      </ConfirmationCard>
    </SalesPageShell>
  )
}
