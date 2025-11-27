"use client"

import { motion } from "framer-motion"
import type { Project } from "../ProjectsShowcase/useProjectsShowcase"
import { useProjectShowcase } from "./useProjectShowcase"
import { useRef } from "react"
import { Title } from "@/components/Styles/Texts/Title/Title"

type ProjectShowcaseProps = {
  project: Project
  isFirst?: boolean
}

export const ProjectShowcase = ({ project, isFirst = false }: ProjectShowcaseProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { ref, videoVariants, textVariants, getVideoAnimation, getTextAnimation } =
    useProjectShowcase(videoRef)

  return (
    <section
      ref={ref}
      id={isFirst ? "projects" : undefined}
      className="snap-start min-h-screen flex items-center justify-center py-24 overflow-hidden"
    >
      <div className="flex flex-col max-w-7xl w-full items-center">
        <motion.div
          variants={textVariants}
          initial="hiddenEnter"
          animate={getTextAnimation()}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8 pb-8"
        >
          <Title href={project.url}>{project.title}</Title>
        </motion.div>

        <motion.div
          variants={videoVariants}
          initial="hiddenEnter"
          animate={getVideoAnimation()}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full"
        >
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block cursor-pointer"
          >
            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-cyan-500/20 via-blue-500/10 to-purple-600/20 blur-xl opacity-75" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-primary/30 bg-black hover:border-primary/50 transition-colors">
              <video
                ref={videoRef}
                src={project.video}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="object-cover w-full h-full"
                onError={(e) => {
                  const video = e.currentTarget;
                  video.style.display = "none";
                  console.warn("Video failed to load:", project.video);
                }}
                onLoadedData={(e) => {
                  e.currentTarget.play().catch(() => {
                    console.warn("Video autoplay prevented");
                  });
                }}
                onCanPlay={(e) => {
                  e.currentTarget.play().catch(() => {
                    console.warn("Video autoplay prevented");
                  });
                }}
              />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
