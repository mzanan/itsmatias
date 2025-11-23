"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa"
import type { Project } from "../ProjectsShowcase/useProjects"
import { useProjectShowcase } from "./useProjectShowcase"
import { useRef } from "react"

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
      className="snap-start min-h-screen flex items-center justify-center px-4 sm:px-8 py-24"
    >
      <div className="grid md:grid-cols-2 gap-12 lg:gap-16 max-w-7xl w-full items-center">
        <motion.div
          variants={videoVariants}
          initial="hiddenEnter"
          animate={getVideoAnimation()}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full h-[400px] sm:h-[500px] md:h-[600px]"
        >
          <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-cyan-500/20 via-blue-500/10 to-purple-600/20 blur-xl opacity-75" />
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-primary/30 bg-black">
            <video
              ref={videoRef}
              src={project.video}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="object-cover w-full h-full"
              onError={(e) => {
                const video = e.currentTarget;
                video.style.display = "none";
                console.warn("Video failed to load:", project.video);
              }}
              onLoadedMetadata={() => {
                if (videoRef.current) {
                  videoRef.current.play().catch(() => {
                    console.warn("Video autoplay prevented");
                  });
                }
              }}
            />
          </div>
        </motion.div>

        <motion.div
          variants={textVariants}
          initial="hiddenEnter"
          animate={getTextAnimation()}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
              <span className="gradient-text">{project.title}</span>
            </h2>
            <div className="h-1 w-12 bg-linear-to-r from-cyan-400 to-purple-600 rounded-full" />
          </div>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">{project.benefit}</p>

          <div className="flex flex-wrap gap-3">
            {project.tags.map((tag) => (
              <motion.span
                key={tag}
                className="text-sm bg-primary/20 hover:bg-primary/30 border border-primary/50 px-4 py-2 rounded-full font-medium text-primary transition-all cursor-default"
                whileHover={{ scale: 1.05 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          <div className="flex gap-4 pt-4">
            <Button asChild size="lg" className="text-base px-6 group">
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                Visit Project
                <FaExternalLinkAlt className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
            </Button>
            <Button variant="outline" size="lg" className="text-base px-6 group bg-transparent" asChild>
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                View Code
                <FaGithub className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
