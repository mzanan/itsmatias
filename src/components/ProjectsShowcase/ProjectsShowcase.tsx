"use client"

import { useProjectsShowcase } from "./useProjectsShowcase"
import { ProjectShowcase } from "../ProjectShowcase/ProjectShowcase"

export const ProjectsShowcase = () => {
  const { projects } = useProjectsShowcase()

  return (
    <>
      {projects.map((project, index) => (
        <ProjectShowcase key={project.id} project={project} isFirst={index === 0} />
      ))}
    </>
  )
}
