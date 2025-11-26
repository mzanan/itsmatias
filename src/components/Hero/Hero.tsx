"use client"

import { useHero } from "./useHero"
import { motion, AnimatePresence } from "framer-motion"
import { useRef } from "react"
import { Title } from "@/components/Styles/Texts/Title/Title"

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
    <section id="home" className="relative h-dvh flex flex-col justify-center items-center text-center snap-start overflow-hidden w-full max-w-full">
      <div ref={vantaRef} className="absolute inset-0 z-0 w-full h-full" />
      <motion.div
        className="relative z-10 max-w-4xl px-4 flex flex-col gap-6 md:gap-10 w-full h-full justify-center py-8 overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Title
            as="h1"
            showUnderline={false}
            wrapContent={false}
          >
            <div className="relative h-[1.2em] flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWordIndex}
                  className="absolute bg-linear-to-b from-sky-400 to-pink-400 bg-clip-text text-transparent shadow-black drop-shadow-md"
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={wordVariants}
                >
                  {words[currentWordIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </Title>
        </motion.div>
      </motion.div>

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
