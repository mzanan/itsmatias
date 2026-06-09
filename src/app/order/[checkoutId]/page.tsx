"use client"

import { use } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { motion } from "motion/react"
import { Pill } from "@/components/ui/Pill"
import { Title } from "@/components/Styles/Texts/Title/Title"
import { FaArrowRight } from "react-icons/fa"
import { MdMail } from "react-icons/md"
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
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <nav className="container mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-lg font-bold gradient-text transition-all hover:opacity-80">
            itsmatias
          </Link>
        </nav>
      </header>

      <main className="relative min-h-dvh flex items-center justify-center px-6 text-center">
        <div className="w-full max-w-2xl">
          {status.state === "failed" ? (
            <Failed />
          ) : status.state === "ready" ? (
            <Ready productName={status.productName} deployUrl={status.deployUrl!} />
          ) : timedOut ? (
            <CheckEmail />
          ) : (
            <Preparing state={status.state} />
          )}
        </div>
      </main>
    </>
  )
}

function Preparing({ state }: { state: "pending" | "paid" }) {
  const label = state === "pending" ? "Confirming payment." : "Preparing your site."
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center gap-10"
    >
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/15 border-t-white" />
      <Title as="h1" variant="display" centered showUnderline={false}>
        {label}
      </Title>
      <p className="text-white/60 max-w-md text-balance">
        This usually takes a few seconds. You can close this tab — the deploy link is also on its way to your inbox.
      </p>
    </motion.div>
  )
}

function Ready({
  productName,
  deployUrl,
}: {
  productName?: string
  deployUrl: string
}) {
  const heading = productName ? `Your ${productName} is ready.` : "Your site is ready."
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center gap-10"
    >
      <Title as="h1" variant="display" centered showUnderline={false}>
        {heading}
      </Title>
      <p className="text-white/60 max-w-md text-balance">
        One click and you are live. Vercel will clone the source into your own GitHub and deploy it.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
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
      </motion.div>

      <p className="text-xs text-white/35 max-w-sm">
        The source link expires in 72h. We also emailed it to you — safe to close this tab.
      </p>
    </motion.div>
  )
}

function CheckEmail() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center gap-10"
    >
      <MdMail className="h-10 w-10 text-white/40" />
      <Title as="h1" variant="display" centered showUnderline={false}>
        Still preparing your site.
      </Title>
      <p className="text-white/60 max-w-md text-balance">
        Taking longer than usual. We email the deploy link as soon as it is ready — safe to close this tab.
      </p>
      <p className="text-xs text-white/35">
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
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center gap-10"
    >
      <Title as="h1" variant="display" centered showUnderline={false}>
        Something went wrong.
      </Title>
      <p className="text-white/60 max-w-md text-balance">
        Email{" "}
        <a className="underline hover:text-white" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>{" "}
        with your receipt and I will sort it out.
      </p>
    </motion.div>
  )
}
