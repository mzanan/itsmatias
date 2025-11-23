import { useState, useEffect, useRef } from "react"
import { useInView } from "framer-motion"

export const useProjectShowcase = (videoRef: React.RefObject<HTMLVideoElement | null>) => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { margin: "-20% 0px", once: false })
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down")
  const lastY = useRef(0)

  useEffect(() => {
    const mainElement = document.querySelector("main")
    if (!mainElement) return

    const updateScrollDirection = () => {
      const scrollTop = mainElement.scrollTop
      if (scrollTop > lastY.current) {
        setScrollDirection("down")
      } else if (scrollTop < lastY.current) {
        setScrollDirection("up")
      }
      lastY.current = scrollTop
    }

    mainElement.addEventListener("scroll", updateScrollDirection)
    return () => {
      mainElement.removeEventListener("scroll", updateScrollDirection)
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

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

  const videoVariants = {
    hiddenEnter: { opacity: 0, x: -100, scale: 0.9 },
    visible: { opacity: 1, x: 0, scale: 1 },
    hiddenExit: { opacity: 0, x: -100, scale: 0.9 },
  }

  const textVariants = {
    hiddenEnter: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    hiddenExit: { opacity: 0, x: 100 },
  }

  const getVideoAnimation = () => {
    if (isInView) return "visible"
    if (scrollDirection === "down") return "hiddenEnter"
    return "hiddenExit"
  }

  const getTextAnimation = () => {
    if (isInView) return "visible"
    if (scrollDirection === "down") return "hiddenEnter"
    return "hiddenExit"
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


