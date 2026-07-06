"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { FaArrowLeft } from "react-icons/fa"

type ConfirmationCardProps = {
  children: React.ReactNode
  showBack: boolean
}

export const ConfirmationCard = ({ children, showBack }: ConfirmationCardProps) => {
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
