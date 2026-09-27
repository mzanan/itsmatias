"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { useHeader } from "./useHeader"
import { Share } from "@/components/Share/Share"
import { ShareHint } from "./ShareHint"
import { NavLink } from "./NavLink"

const NAV_ITEMS = [
  { label: "Work", id: "work", href: "/#work" },
  { label: "Lab", id: "lab", href: "/#lab" },
  { label: "About", id: "about", href: "/#about" },
  { label: "Contact", id: "contact", href: "/#contact" },
] as const

const SECONDARY_LINK = { label: "Templates", href: "/templates" } as const

export const Header = () => {
  const { isScrolled, isInHero, activeSection, scrollToTop, pathname } = useHeader()
  const isSecondaryActive = pathname === SECONDARY_LINK.href

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex justify-center transition-[padding] duration-500 ease-out",
        isScrolled && "px-3 pt-3"
      )}
    >
      <nav
        className={cn(
          "flex h-16 w-full items-center justify-between border px-4 sm:px-6 lg:px-8 transition-[max-width,height,border-radius,background-color,border-color,box-shadow] duration-500 ease-out",
          isScrolled
            ? "h-14 max-w-4xl rounded-[28px] border-white/10 bg-background/70 shadow-lg shadow-black/30 backdrop-blur-lg"
            : "max-w-full rounded-none border-transparent bg-transparent"
        )}
      >
        <Link
          href="/"
          onClick={scrollToTop}
          className="text-lg font-bold gradient-text transition-all hover:opacity-80"
        >
          itsmatias
        </Link>
        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden md:flex items-center gap-4 md:gap-8">
            {NAV_ITEMS.map(({ label, id, href }) => (
              <NavLink
                key={id}
                href={href}
                label={label}
                isActive={activeSection === id}
                className="font-medium"
                idleClassName={
                  isInHero ? "text-white/70" : "text-muted-foreground"
                }
              />
            ))}
            <span aria-hidden className="h-4 w-px bg-white/15" />
            <NavLink
              href={SECONDARY_LINK.href}
              label={SECONDARY_LINK.label}
              isActive={isSecondaryActive}
              idleClassName="text-muted-foreground/70"
            />
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
