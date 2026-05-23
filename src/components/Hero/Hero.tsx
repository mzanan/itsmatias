"use client"

import { useHero } from "./useHero"
import { motion } from "framer-motion"
import { useRef } from "react"
import { FaArrowRight } from "react-icons/fa"

export const Hero = () => {
  const vantaRef = useRef<HTMLDivElement>(null)
  const {
    containerVariants,
    scrollIndicatorVariants,
    words,
    visibleWordIndex,
    wordVariants,
    containerPhraseVariants,
    currentPhraseIndex,
    isFadingOut,
  } = useHero(vantaRef)

  return (
    <section id="home" className="relative h-dvh flex flex-col justify-center items-center text-center snap-start overflow-hidden w-full max-w-full">
      <h1 className="sr-only">Matias Zanan — Web Developer</h1>
      <div ref={vantaRef} className="absolute inset-0 z-0 w-full h-full" />
      <motion.div
        className="relative z-10 w-full h-full flex items-center justify-center px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="flex flex-wrap items-center justify-center gap-2 md:gap-3 max-w-6xl"
          variants={containerPhraseVariants}
          animate="visible"
          aria-hidden="true"
        >
          {words.map((word, index) => (
            <motion.div
              key={`${currentPhraseIndex}-${index}`}
              variants={wordVariants}
              initial="hidden"
              animate={index < visibleWordIndex && !isFadingOut ? "visible" : "hidden"}
              exit="exit"
              className="inline-block"
            >
              <span className="text-3xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg tracking-tight">
                {word}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* CTA — absolute, no se mueve al cambiar el largo del título rotativo */}
      <motion.a
        href="#projects"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="group absolute bottom-32 md:bottom-40 left-1/2 -translate-x-1/2 z-10 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/30 bg-white/5 text-white text-sm md:text-base font-medium backdrop-blur-sm hover:bg-white/10 hover:border-white/60 transition-all whitespace-nowrap"
      >
        See my work
        <FaArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
      </motion.a>

      <motion.div
        className="absolute bottom-4 md:bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        animate={scrollIndicatorVariants.animate}
        transition={scrollIndicatorVariants.transition}
      >
        <div className="flex flex-col items-center">
          <span className="text-xs md:text-sm tracking-widest">Scroll</span>
          <svg
            className="w-12 h-16 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
          >
            <rect x="9" y="3" width="6" height="18" rx="3" />
            <motion.g
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <circle
                cx="12"
                cy="7"
                r="1"
                fill="currentColor"
              />
            </motion.g>
          </svg>
        </div>
      </motion.div>
    </section>
  )
}