"use client"

import { useHeader } from "./useHeader"
import { Share } from "@/components/Share/Share"

export const Header = () => {
  const { isScrolled, isInHero } = useHeader()

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full max-w-full ${isScrolled
        ? "border-b border-border/40 bg-background/80 backdrop-blur-lg supports-backdrop-filter:bg-background/60"
        : "border-b border-transparent bg-transparent"
        }`}
    >
      <nav className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#hero"
          className="text-lg font-bold gradient-text transition-all hover:opacity-80"
        >
          MZ
        </a>
        <div className="flex items-center gap-8">
          {["Home", "Work", "About", "Contact"].map((item, idx) => {
            const getSectionId = () => {
              if (item === "Home") return "hero";
              if (item === "Work") return "projects";
              return item.toLowerCase();
            };

            return (
              <a
                key={idx}
                href={`#${getSectionId()}`}
                className={`text-sm font-medium transition-all duration-300 hover:text-primary hover:scale-105 ${isInHero ? "text-white" : "text-muted-foreground"
                  }`}
              >
                {item}
              </a>
            );
          })}
          <Share isInHero={isInHero} />
        </div>
      </nav>
    </header>
  )
}
