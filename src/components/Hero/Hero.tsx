"use client"

import { useHero } from "./useHero"
import { motion } from "framer-motion"
import { useRef } from "react"
import { Title } from "@/components/Styles/Texts/Title/Title"

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
        >
          {words.map((word, index) => (
            <motion.div
              key={`${currentPhraseIndex}-${index}`}
              variants={wordVariants}
              initial="hidden"
              animate={index < visibleWordIndex && !isFadingOut ? "visible" : "hidden"}
              exit="exit"
            >
              <Title
                as="h1"
                showUnderline={false}
                wrapContent={false}
                className="inline"
              >
                <span className="text-3xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg">
                  {word}
                </span>
              </Title>
            </motion.div>
          ))}
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