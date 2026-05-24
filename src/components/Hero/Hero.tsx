"use client"

import { useHero } from "./useHero"
import { motion } from "motion/react"
import { useRef } from "react"
import { FaArrowRight } from "react-icons/fa"
import { GlassBadge } from "@/components/ui/GlassBadge"
import { Pill } from "@/components/ui/Pill"

const projects = [
  {
    desktop: "/videos/ecommerce.mp4",
    mobile: "/videos/ecommerce-mobile.mp4",
    label: "ecommerce",
    href: "https://ecommerce.itsmatias.com",
  },
  {
    desktop: "/videos/landing.mp4",
    mobile: "/videos/landing-mobile.mp4",
    label: "landing",
    href: "https://landing.itsmatias.com",
  },
  {
    desktop: "/videos/links.mp4",
    mobile: "/videos/links-mobile.mp4",
    label: "social links",
    href: "https://links.itsmatias.com",
  },
]

type Card = { src: string; label: string; href: string; format: "desktop" | "mobile" }

const cards: Card[] = projects.flatMap((p) => [
  { src: p.desktop, label: p.label, href: p.href, format: "desktop" },
  { src: p.mobile, label: p.label, href: p.href, format: "mobile" },
])

const loop = [...cards, ...cards]

export const Hero = () => {
  const vantaRef = useRef<HTMLDivElement>(null)
  const { scrollIndicatorVariants } = useHero(vantaRef)

  return (
    <section id="home" className="relative h-dvh flex flex-col justify-center items-center text-center snap-start overflow-hidden w-full max-w-full">
      <h1 className="sr-only">Matias Zanan — Web Developer</h1>
      <div ref={vantaRef} className="absolute inset-0 z-0 w-full h-full" />

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-8">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center px-4"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="gradient-text">One of these could be yours.</span>
          </h2>
        </motion.div>

        <div className="relative w-full overflow-hidden py-2">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-black/40 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-black/40 to-transparent z-10" />
          <div className="hero-marquee flex gap-4 md:gap-6 w-max">
            {loop.map((item, i) => {
              const sizeClasses =
                item.format === "desktop"
                  ? "h-[32dvh] md:h-[40dvh] aspect-video"
                  : "h-[32dvh] md:h-[40dvh] aspect-[9/16]"
              return (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative block ${sizeClasses} rounded-xl overflow-hidden border border-white/15 shadow-xl bg-black group shrink-0`}
                >
                  <video
                    src={item.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-2 left-2">
                    <GlassBadge tone="dark">{item.label}</GlassBadge>
                  </div>
                </a>
              )
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Pill as="a" href="#projects" Icon={FaArrowRight}>
            See all projects
          </Pill>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-4 md:bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10"
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
