"use client"

import { useHero } from "./useHero"
import { motion, AnimatePresence } from "framer-motion"
import { useRef } from "react"

export const Hero = () => {
  const vantaRef = useRef<HTMLDivElement>(null)
  const {
    containerVariants,
    itemVariants,
    scrollIndicatorVariants,
    words,
    currentWordIndex,
    wordVariants,
  } = useHero(vantaRef)

  return (
    <section className="relative h-screen flex flex-col justify-center items-center text-center snap-start overflow-hidden">
      <div ref={vantaRef} className="absolute inset-0 z-0 w-full h-full" />
      <motion.div
        className="relative z-10 max-w-4xl px-4 flex flex-col gap-10 w-full h-full justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight leading-tight"
          variants={itemVariants}
        >
          <div className="relative h-[1.2em] flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentWordIndex}
                className="absolute bg-linear-to-t from-purple-700 to-purple-400 bg-clip-text text-transparent shadow-black drop-shadow-md"
                initial="enter"
                animate="center"
                exit="exit"
                variants={wordVariants}
              >
                {words[currentWordIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.h1>
      </motion.div>

      <motion.div
        className="flex flex-col justify-end pb-24"
        animate={scrollIndicatorVariants.animate}
        transition={scrollIndicatorVariants.transition}
      >
        <div className="flex flex-col items-center">
          <span className="tracking-widest">Scroll</span>
          <svg
            className="w-12 h-16 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
          >
            <rect x="9" y="3" width="6" height="18" rx="3" />
            <motion.circle
              cx="12"
              cy="7"
              r="1"
              fill="currentColor"
              animate={{
                cy: [7, 17, 7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </svg>
        </div>
      </motion.div>
    </section>
  )
}
