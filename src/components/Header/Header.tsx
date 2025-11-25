"use client"

import { useHeader } from "./useHeader"

export const Header = () => {
  const { scrollToSection, isScrolled } = useHeader()

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full max-w-full ${isScrolled
        ? "border-b border-border/40 bg-background/80 backdrop-blur-lg supports-backdrop-filter:bg-background/60"
        : "border-b border-transparent bg-transparent"
        }`}
    >
      <nav className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 bg-red">
        <button
          onClick={() => scrollToSection("hero")}
          className="text-lg font-bold gradient-text transition-all hover:opacity-80"
        >
          MZ
        </button>
        <div className="flex items-center gap-8">
          {["Work", "About", "Contact"].map((item, idx) => (
            <button
              key={idx}
              onClick={() => scrollToSection(item.toLowerCase() === "work" ? "projects" : item.toLowerCase())}
              className="text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-primary hover:scale-105"
            >
              {item}
            </button>
          ))}
        </div>
      </nav>
    </header>
  )
}
