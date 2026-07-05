"use client"

import { useHeader } from "./useHeader"
import { Share } from "@/components/Share/Share"
import { ShareHint } from "./ShareHint"

const NAV_ITEMS = [
  { label: "Home", id: "home" },
  { label: "Projects", id: "projects" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
] as const

export const Header = () => {
  const { isScrolled, isInHero, activeSection } = useHeader()

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full max-w-full ${isScrolled
        ? "border-b border-border/40 bg-background/80 backdrop-blur-lg supports-backdrop-filter:bg-background/60"
        : "border-b border-transparent bg-transparent"
        }`}
    >
      <nav className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#home"
          className="text-lg font-bold gradient-text transition-all hover:opacity-80"
        >
          itsmatias
        </a>
        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden md:flex items-center gap-4 md:gap-8">
            {NAV_ITEMS.map(({ label, id }) => {
              const isActive = activeSection === id
              const baseColor = isInHero ? "text-white/70" : "text-muted-foreground"
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    isActive
                      ? "text-white font-semibold drop-shadow-[0_0_8px_rgba(255,255,255,0.25)]"
                      : `${baseColor} hover:text-white`
                  }`}
                >
                  {label}
                  <span
                    className={`pointer-events-none absolute -bottom-1 left-0 h-0.5 rounded-full bg-current transition-all duration-300 ${
                      isActive ? "w-full opacity-100" : "w-0 opacity-0"
                    }`}
                  />
                </a>
              )
            })}
          </div>
          <div className="relative">
            <Share />
            <ShareHint />
          </div>
        </div>
      </nav>
    </header>
  )
}
