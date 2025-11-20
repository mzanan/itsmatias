"use client"

import { useProjects } from "@/hooks/useProjects"
import { ProjectShowcase } from "../ProjectShowcase/ProjectShowcase"

export const ProjectsShowcase = () => {
  const { projects } = useProjects()

  return (
    <>
      {projects.map((project, index) => (
        <ProjectShowcase key={project.id} project={project} isFirst={index === 0} />
      ))}
    </>
  )
}
