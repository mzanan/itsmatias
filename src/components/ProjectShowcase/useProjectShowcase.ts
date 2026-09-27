import { useRef, useMemo } from "react"
import { useInView } from "motion/react"

export const useProjectShowcase = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { margin: "0px 0px -20% 0px", amount: 0.4 })

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
