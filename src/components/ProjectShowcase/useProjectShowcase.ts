import { useEffect, useRef, useMemo, useCallback } from "react"
import { useInView } from "motion/react"

export const useProjectShowcase = (playbackSpeed: number = 1.5) => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { margin: "0px 0px -20% 0px", amount: 0.4 })

  const updateVideoPlayback = useCallback(() => {
    const container = ref.current
    if (!container) return

    const videos = container.querySelectorAll("video")

    videos.forEach((video) => {
      // Usamos la variable, no el número hardcodeado
      video.playbackRate = playbackSpeed

      const isVisibleCSS = video.offsetParent !== null

      if (isInView && isVisibleCSS) {
        if (video.paused) {
          video.play().catch(() => { /* Ignore autoplay errors */ })
        }
      } else {
        video.pause()
      }
    })
  }, [isInView, playbackSpeed]) // Agregamos playbackSpeed a dependencias

  useEffect(() => {
    updateVideoPlayback()
    window.addEventListener("resize", updateVideoPlayback)

    return () => {
      window.removeEventListener("resize", updateVideoPlayback)
    }
  }, [updateVideoPlayback])

  const videoVariants = useMemo(() => ({
    hiddenEnter: { opacity: 0, x: -50, scale: 0.95 },
    visible: { opacity: 1, x: 0, scale: 1 },
  }), [])

  const textVariants = useMemo(() => ({
    hiddenEnter: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  }), [])

  return {
    ref,
    videoVariants,
    textVariants,
    animationState: isInView ? "visible" : "hiddenEnter",
  }
}