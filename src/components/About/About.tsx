"use client"

import { motion } from "framer-motion"
import { useAbout } from "./useAbout"
import { Button } from "@/components/ui/button"
import { FaArrowRight } from "react-icons/fa"
import Image from "next/image"
import { Share } from "@/components/Share/Share"

export const About = () => {
  const {
    about,
    ref,
    leftVariants,
    rightVariants,
    getLeftAnimation,
    getRightAnimation,
    displayedImages,
    getProxyImageUrl,
  } = useAbout()

  return (
    <section
      ref={ref}
      id="about"
      data-snap-section
      className="snap-start h-dvh flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24 overflow-hidden w-full"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            variants={leftVariants}
            initial="hiddenEnter"
            animate={getLeftAnimation()}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
                <span className="gradient-text">About Me</span>
              </h2>
              <div className="h-1 w-12 bg-linear-to-r from-cyan-400 to-purple-600 rounded-full" />
            </div>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed whitespace-pre-line">{about.description}</p>

            <div className="flex flex-wrap gap-4 mt-4">
              <Button asChild size="lg" variant="outline" className="text-base px-6 group bg-transparent">
                <a href="#contact">
                  Let&apos;s connect
                  <FaArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Share label="Tell a friend" asButton />
            </div>
          </motion.div>

          <motion.div
            variants={rightVariants}
            initial="hiddenEnter"
            animate={getRightAnimation()}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="grid grid-cols-2 gap-3 lg:gap-4"
          >
            {displayedImages.length > 0 ? (
              displayedImages.map((image) => (
                <motion.div
                  key={image}
                  layout
                  transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 300,
                  }}
                  className="relative aspect-square rounded-lg overflow-hidden border border-primary/30"
                >
                  <Image
                    src={getProxyImageUrl(image)}
                    alt={`Instagram post`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </motion.div>
              ))
            ) : undefined}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
