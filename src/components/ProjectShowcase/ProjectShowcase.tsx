"use client"

import { motion } from "motion/react"
import type { Project } from "../ProjectsShowcase/useProjectsShowcase"
import { useProjectShowcase } from "./useProjectShowcase"
import { ProjectMedia } from "./ProjectMedia"
import { Title } from "@/components/Styles/Texts/Title/Title"
import { Pill } from "@/components/ui/Pill"
import { FaArrowUpRightFromSquare } from "react-icons/fa6"
import { FaArrowRight } from "react-icons/fa"
import { cn } from "@/lib/utils"

type ProjectShowcaseProps = {
  project: Project
  isFirst?: boolean
}

const mediaWidth = "w-full max-w-5xl md:max-w-[min(64rem,calc((100dvh-320px)*16/9))]"
const baseCard =
  "relative block h-full w-auto max-w-full aspect-[9/16] shadow-2xl rounded-2xl md:h-auto md:w-full md:aspect-video"
const linkCard =
  "cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"

export const ProjectShowcase = ({ project, isFirst = false }: ProjectShowcaseProps) => {
  const { ref, videoVariants, textVariants, animationState } = useProjectShowcase()
  const isComparison = project.media.kind === "beforeAfter"

  const mediaInner = (
    <>
      <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-slate-200/25 via-white/15 to-slate-300/25 blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="absolute inset-0 rounded-2xl overflow-hidden border border-primary/30 group-hover:border-primary/50 transition-colors z-10" suppressHydrationWarning>
        <ProjectMedia project={project} />
        {!isComparison && (
          <div className="hidden md:block absolute inset-0 z-10 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 pointer-events-none" />
        )}
      </div>
    </>
  )

  return (
    <section
      ref={ref}
      id={isFirst ? "projects" : undefined}
      className="snap-start relative h-dvh md:min-h-dvh flex flex-col items-center overflow-hidden bg-transparent px-4 pt-20 pb-12 md:px-0 md:pt-0 md:pb-0"
    >
      <div className="w-full h-full max-w-7xl flex flex-col items-center justify-start md:justify-center relative z-10 gap-4 md:gap-6">

        <motion.div
          variants={textVariants}
          initial="hiddenEnter"
          animate={animationState}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-center px-4 pb-2"
        >
          <Title href={project.url} centered>{project.title}</Title>
        </motion.div>

        <motion.div
          variants={videoVariants}
          initial="hiddenEnter"
          animate={animationState}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={cn(mediaWidth, "px-4 md:px-6 flex-1 min-h-0 md:flex-none flex justify-center")}
        >
          {isComparison ? (
            <div className={baseCard}>{mediaInner}</div>
          ) : (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${project.title} live site`}
              className={cn(baseCard, linkCard)}
              suppressHydrationWarning
            >
              {mediaInner}
            </a>
          )}
        </motion.div>

        <motion.div
          variants={textVariants}
          initial="hiddenEnter"
          animate={animationState}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 }}
          className={cn(mediaWidth, "flex flex-col items-center gap-1 px-4 md:px-6 text-center")}
        >
          <p className="text-sm md:text-base text-white/80">
            {project.description}
          </p>
          {project.descriptionExtra && (
            <p className="text-xs md:text-sm italic text-white/50">
              {project.descriptionExtra}
            </p>
          )}
        </motion.div>

        <motion.div
          variants={textVariants}
          initial="hiddenEnter"
          animate={animationState}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 px-4 w-full"
        >
          <Pill as="a" href={project.url} target="_blank" rel="noopener noreferrer" variant="outline" size="md" Icon={FaArrowUpRightFromSquare} iconClassName="group-hover:translate-x-0.5 group-hover:-translate-y-0.5" className="w-full max-w-xs justify-center sm:w-auto">
            Visit live site
          </Pill>
          {project.model === "sale" && (
            <Pill as="a" href={project.buyUrl} target="_blank" rel="noopener noreferrer" variant="solid" size="md" Icon={FaArrowRight} className="w-full max-w-xs justify-center sm:w-auto">
              Get the full website
            </Pill>
          )}
          {project.model === "subscription" && (
            <Pill as="a" href={project.subscribeUrl} target="_blank" rel="noopener noreferrer" variant="solid" size="md" Icon={FaArrowRight} className="w-full max-w-xs justify-center sm:w-auto">
              Subscribe
            </Pill>
          )}
        </motion.div>
      </div>
    </section>
  )
}
