"use client"

import type { Project } from "../ProjectsShowcase/useProjectsShowcase"
import { LazyVideo } from "@/components/LazyVideo/LazyVideo"
import { BeforeAfter } from "@/components/ui/BeforeAfter"
import { posterFor } from "@/lib/video"

export const ProjectMedia = ({ project }: { project: Project }) => {
  const { media, title } = project

  if (media.kind === "beforeAfter") {
    const before = { src: media.before.src, alt: `${title} original design` }
    const after = { src: media.after.src, alt: `${title} redesign` }
    return (
      <>
        <div className="block md:hidden h-full w-full">
          <BeforeAfter
            before={{ ...before, poster: media.before.posterMobile }}
            after={{ ...after, poster: media.after.posterMobile }}
          />
        </div>
        <div className="hidden md:block h-full w-full">
          <BeforeAfter
            before={{ ...before, poster: media.before.posterDesktop }}
            after={{ ...after, poster: media.after.posterDesktop }}
            designWidth={1728}
          />
        </div>
      </>
    )
  }

  return (
    <>
      <LazyVideo
        src={media.mobile}
        poster={posterFor(media.mobile)}
        playbackRate={1.25}
        className="block md:hidden w-full h-full object-cover"
      />
      <LazyVideo
        src={media.desktop}
        poster={posterFor(media.desktop)}
        playbackRate={1.25}
        className="hidden md:block w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </>
  )
}
