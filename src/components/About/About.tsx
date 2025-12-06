"use client"

import { motion } from "framer-motion"
import { useAbout } from "./useAbout"
import { Button } from "@/components/ui/button"
import { FaArrowRight } from "react-icons/fa"
import Image from "next/image"
import { Share } from "@/components/Share/Share"
import { Title } from "@/components/Styles/Texts/Title/Title"

export const About = () => {
  const {
    about,
    ref,
    leftVariants,
    rightVariants,
    displayedImages,
    getLeftAnimation,
    getRightAnimation,
    getProxyImageUrl,
  } = useAbout()

  return (
    <section
      ref={ref}
      id="about"
      data-snap-section
      className="snap-start min-h-dvh flex items-center justify-center px-4 sm:px-6 lg:px-8 lg:py-24 overflow-hidden w-full"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="block lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start">
          <motion.div
            variants={leftVariants}
            initial="hiddenEnter"
            animate={getLeftAnimation()}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <Title>About Me</Title>

            {displayedImages.length > 0 && (
              <motion.div
                variants={rightVariants}
                initial="hiddenEnter"
                animate={getRightAnimation()}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="grid grid-cols-2 gap-3 lg:gap-4 mb-6 lg:mb-0 lg:hidden"
              >
                {displayedImages.slice(0, 2).map((image) => (
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
                ))}
              </motion.div>
            )}

            <p className="block lg:hidden text-lg md:text-xl text-muted-foreground leading-snug whitespace-pre-line">{about.descriptionMobile}</p>
            <p className="hidden lg:block text-lg md:text-xl text-muted-foreground leading-relaxed whitespace-pre-line">{about.description}</p>

            <div className="flex flex-wrap gap-4 mt-4">
              <Button asChild size="lg" variant="outline" className="text-base px-6 group shiny-border text-white hover:text-primary-foreground">
                <a href="#contact">
                  Let&apos;s connect
                  <FaArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Share label="Tell a friend" asButton />
            </div>
          </motion.div>

          {displayedImages.length > 0 && (
            <motion.div
              variants={rightVariants}
              initial="hiddenEnter"
              animate={getRightAnimation()}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="hidden lg:grid lg:grid-cols-2 gap-4"
            >
              {displayedImages.map((image) => (
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
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
