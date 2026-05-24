"use client"

import { motion } from "motion/react"
import type { Project } from "../ProjectsShowcase/useProjectsShowcase"
import { useProjectShowcase } from "./useProjectShowcase"
import { Title } from "@/components/Styles/Texts/Title/Title"
import { LazyVideo } from "@/components/LazyVideo/LazyVideo"
import { GlassBadge } from "@/components/ui/GlassBadge"
import { Pill } from "@/components/ui/Pill"
import { FaArrowUpRightFromSquare } from "react-icons/fa6"

type ProjectShowcaseProps = {
  project: Project
  isFirst?: boolean
}

const posterFor = (videoSrc: string) =>
  videoSrc.replace("/videos/", "/videos/posters/").replace(/\.mp4$/, ".webp")

export const ProjectShowcase = ({ project, isFirst = false }: ProjectShowcaseProps) => {
  const { ref, videoVariants, textVariants, animationState } = useProjectShowcase()

  const cardClasses = "relative block w-full shadow-2xl rounded-2xl cursor-pointer group aspect-[9/16] md:aspect-video max-h-[calc(100dvh-240px)] md:max-h-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"

  return (
    <section
      ref={ref}
      id={isFirst ? "projects" : undefined}
      className="snap-start relative h-dvh md:min-h-dvh flex flex-col items-center overflow-hidden bg-transparent px-4 pt-20 pb-8 md:px-0 md:pt-0 md:pb-0"
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
          className="w-full max-w-5xl px-4 md:px-6"
        >
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cardClasses}
            suppressHydrationWarning
          >
            {/* Glow */}
            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-slate-200/25 via-white/15 to-slate-300/25 blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Video Wrapper */}
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden border border-primary/30 group-hover:border-primary/50 transition-colors z-10"
              suppressHydrationWarning
            >
              {/* Live badge */}
              <div className="absolute top-3 right-3 z-30 pointer-events-none">
                <GlassBadge tone="dark" withDot Icon={FaArrowUpRightFromSquare} className="shadow-lg">
                  Live site
                </GlassBadge>
              </div>

              <LazyVideo
                src={project.videoMobile}
                poster={posterFor(project.videoMobile)}
                playbackRate={1.25}
                className="block md:hidden w-full h-full object-cover"
              />
              <LazyVideo
                src={project.videoDesktop}
                poster={posterFor(project.videoDesktop)}
                playbackRate={1.25}
                className="hidden md:block w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Mobile bottom CTA */}
              <div className="md:hidden absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end justify-center pb-5 z-20 pointer-events-none">
                <Pill as="span" variant="ghost" size="sm" Icon={FaArrowUpRightFromSquare} iconClassName="group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  Visit Website
                </Pill>
              </div>

              {/* Desktop hover overlay */}
              <div className="hidden md:flex absolute inset-0 z-20 items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:bg-black/40 group-hover:backdrop-blur-[2px] pointer-events-none">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <Pill as="span" variant="outline" size="md" Icon={FaArrowUpRightFromSquare} iconClassName="group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    Visit Website
                  </Pill>
                </div>
              </div>

            </div>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
