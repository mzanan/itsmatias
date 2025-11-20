"use client"

import { useHero } from "./useHero"
import { Button } from "@/components/ui/button"
import { FaArrowRight } from "react-icons/fa"
import { motion } from "framer-motion"

export const Hero = () => {
  const { hero, scrollToProjects, getIcon } = useHero()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  }

  return (
    <section className="relative h-screen flex flex-col justify-center items-center text-center snap-start overflow-hidden pt-16">
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-30">
        <source src="/demo-project-showcase.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10 mix-blend-overlay" />

      <motion.div
        className="relative z-10 max-w-4xl px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight leading-tight"
          variants={itemVariants}
        >
          <span className="gradient-text">Build.</span>
          <br />
          <span>Create. Deploy.</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          {hero.subtitle}
        </motion.p>

        <motion.div className="flex flex-wrap justify-center gap-8 mb-12" variants={itemVariants}>
          {hero.benefits.map((benefit, index) => {
            const Icon = getIcon(benefit.icon);

            return (
              <motion.div
                key={index}
                className="flex flex-col items-center gap-2 text-sm group"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                  {benefit.label}
                </span>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button onClick={scrollToProjects} size="lg" className="text-base px-8 py-6 group">
            View My Work
            <FaArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </section>
  )
}
