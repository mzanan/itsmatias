"use client"

import { motion, AnimatePresence } from "motion/react"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import shareHintAnim from "./share-hint.json"

const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

const SHOW_DELAY_MS = 800
const AUTO_DISMISS_MS = 15000

export const ShareHint = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const showTimer = window.setTimeout(() => setVisible(true), SHOW_DELAY_MS)
    const hideTimer = window.setTimeout(() => setVisible(false), AUTO_DISMISS_MS)
    return () => {
      window.clearTimeout(showTimer)
      window.clearTimeout(hideTimer)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4, transition: { duration: 0.25 } }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="absolute top-full left-1/2 -ml-10 -mt-2 pointer-events-none z-50 w-20 h-36 flex items-center justify-center"
          aria-hidden="true"
        >
          <Lottie
            animationData={shareHintAnim}
            loop
            className="-rotate-90 w-36 h-20"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
