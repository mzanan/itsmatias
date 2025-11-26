import { useEffect, useRef, useMemo } from "react"
import { useInView } from "framer-motion"

export const useProjectShowcase = (videoRef: React.RefObject<HTMLVideoElement | null>) => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { margin: "-20% 0px", once: false })

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.playbackRate = 1.5
    video.defaultPlaybackRate = 1.5

    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause()
      } else {
        video.play()
      }
    }

    const handleBlur = () => {
      video.pause()
    }

    const handleFocus = () => {
      video.play()
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("blur", handleBlur)
    window.addEventListener("focus", handleFocus)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("blur", handleBlur)
      window.removeEventListener("focus", handleFocus)
    }
  }, [videoRef])

  const videoVariants = useMemo(
    () => ({
    hiddenEnter: { opacity: 0, x: -100, scale: 0.9 },
    visible: { opacity: 1, x: 0, scale: 1 },
    hiddenExit: { opacity: 0, x: -100, scale: 0.9 },
    }),
    []
  )

  const textVariants = useMemo(
    () => ({
    hiddenEnter: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    hiddenExit: { opacity: 0, x: 100 },
    }),
    []
  )

  const getVideoAnimation = () => {
    return isInView ? "visible" : "hiddenEnter"
  }

  const getTextAnimation = () => {
    return isInView ? "visible" : "hiddenEnter"
  }

  return {
    ref,
    isInView,
    videoVariants,
    textVariants,
    getVideoAnimation,
    getTextAnimation,
  }
}


