"use client"

import { motion } from "framer-motion"
import { useAbout } from "./useAbout"
import { Button } from "@/components/ui/button"
import { FaArrowRight } from "react-icons/fa"

export const About = () => {
  const {
    about,
    scrollToContact,
    ref,
    getIcon,
    leftVariants,
    rightVariants,
    getLeftAnimation,
    getRightAnimation,
  } = useAbout()

  return (
    <section
      ref={ref}
      id="about"
      className="snap-start min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24"
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

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">{about.description}</p>

            <div className="space-y-6 pt-4">
              {about.capabilities.map((capability, index) => {
                const Icon = getIcon(capability.icon);

                return (
                  <motion.div key={index} className="flex gap-4 group" whileHover={{ x: 10 }}>
                    <div className="flex-shrink-0">
                      <div className="p-2 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                        {capability.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">{capability.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <Button
              onClick={scrollToContact}
              size="lg"
              variant="outline"
              className="text-base px-6 group mt-4 bg-transparent"
            >
              Let&apos;s Collaborate
              <FaArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          <motion.div
            variants={rightVariants}
            initial="hiddenEnter"
            animate={getRightAnimation()}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="grid grid-cols-2 gap-3 lg:gap-4"
          >
            {about.techStack.map((tech, index) => (
              <motion.div
                key={index}
                className="px-4 lg:px-6 py-3 lg:py-4 bg-linear-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-lg text-sm font-medium text-primary hover:from-primary/20 hover:to-secondary/20 transition-all cursor-default"
                whileHover={{ scale: 1.05, y: -2 }}
                variants={{ hiddenEnter: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              >
                {tech}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
