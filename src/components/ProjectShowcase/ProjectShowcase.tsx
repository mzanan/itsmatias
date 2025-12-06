"use client"

import { motion } from "framer-motion"
import type { Project } from "../ProjectsShowcase/useProjectsShowcase"
import { useProjectShowcase } from "./useProjectShowcase"
import { Title } from "@/components/Styles/Texts/Title/Title"

type ProjectShowcaseProps = {
  project: Project
  isFirst?: boolean
}

export const ProjectShowcase = ({ project, isFirst = false }: ProjectShowcaseProps) => {
  const { ref, videoVariants, textVariants, animationState } = useProjectShowcase(1.5)

  const cardClasses = "relative block shadow-2xl rounded-2xl cursor-pointer group aspect-[9/16] md:aspect-video max-h-[calc(100dvh-200px)] md:max-h-none"
  const desktopOverlayClasses = "hidden md:flex absolute inset-0 z-20 items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:bg-black/40 group-hover:backdrop-blur-[2px]"
  const desktopButtonClasses = "flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-md transform transition-all duration-300 translate-y-4 group-hover:translate-y-0 hover:scale-105 active:scale-95 active:bg-white/20"
  const mobileButtonClasses = "flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 transition-all duration-200 active:scale-95 active:bg-white/20"

  return (
    <section
      ref={ref}
      id={isFirst ? "projects" : undefined}
      className="snap-start relative h-dvh md:min-h-dvh flex flex-col items-center overflow-hidden bg-transparent pt-16 md:pt-0"
    >
      <div className="w-full h-full max-w-7xl flex flex-col items-center justify-start md:justify-center relative z-10 gap-4 md:gap-6">

        {/* --- TITLE --- */}
        <motion.div
          variants={textVariants}
          initial="hiddenEnter"
          animate={animationState}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-center px-4 pb-2"
        >
          <Title href={project.url}>{project.title}</Title>
        </motion.div>

        {/* --- VIDEO CARD --- */}
        <motion.div
          variants={videoVariants}
          initial="hiddenEnter"
          animate={animationState}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cardClasses}
            suppressHydrationWarning
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-cyan-500/20 via-blue-500/10 to-purple-600/20 blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Video Wrapper */}
            <div
              className="relative rounded-2xl overflow-hidden border border-primary/30 bg-black group-hover:border-primary/50 transition-colors z-10"
              suppressHydrationWarning
            >
              {/* MOBILE VIDEO */}
              <video
                src={project.videoMobile}
                muted
                loop
                playsInline
                preload="metadata"
                className="block md:hidden"
                suppressHydrationWarning
              />

              {/* DESKTOP VIDEO */}
              <video
                src={project.videoDesktop}
                muted
                loop
                playsInline
                preload="metadata"
                className="hidden md:block transition-transform duration-500 group-hover:scale-105"
                suppressHydrationWarning
              />

              {/* --- MOBILE OVERLAY (Bottom Gradient) --- */}
              <div className="md:hidden absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end justify-center pb-5 z-20">
                <div className={mobileButtonClasses}>
                  <span className="text-white/90 text-sm font-medium tracking-wide">
                    Visit Website
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white/90"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </div>
              </div>

              {/* --- DESKTOP OVERLAY (Hover Center) --- */}
              <div className={desktopOverlayClasses}>
                <div className={desktopButtonClasses}>
                  <span className="text-white font-medium text-base tracking-wide drop-shadow-md">
                    Visit Website
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white drop-shadow-md"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </div>
              </div>

            </div>
          </a>
        </motion.div>
      </div>
    </section>
  )
}