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
    scrollToContact,
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
      className="snap-start min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24 overflow-hidden w-full"
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
              <Button
                onClick={scrollToContact}
                size="lg"
                variant="outline"
                className="text-base px-6 group bg-transparent"
              >
                Let&apos;s connect
                <FaArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
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
            ) : (
              about.techStack.map((tech, index) => (
                <motion.div
                  key={index}
                  className="px-4 lg:px-6 py-3 lg:py-4 bg-linear-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-lg text-sm font-medium text-primary hover:from-primary/20 hover:to-secondary/20 transition-all cursor-default"
                  whileHover={{ scale: 1.05, y: -2 }}
                  variants={{ hiddenEnter: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                >
                  {tech}
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
