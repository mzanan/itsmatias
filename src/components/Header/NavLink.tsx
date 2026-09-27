import Link from "next/link"
import { cn } from "@/lib/utils"

type Props = {
  href: string
  label: string
  isActive: boolean
  idleClassName: string
  className?: string
}

export const NavLink = ({
  href,
  label,
  isActive,
  idleClassName,
  className,
}: Props) => (
  <Link
    href={href}
    aria-current={isActive ? "page" : undefined}
    className={cn(
      "relative text-sm transition-colors duration-300 hover:text-white",
      isActive ? "text-white" : idleClassName,
      className
    )}
  >
    {label}
    <span
      className={cn(
        "pointer-events-none absolute -bottom-1 left-0 h-0.5 rounded-full bg-current transition-all duration-300",
        isActive ? "w-full opacity-100" : "w-0 opacity-0"
      )}
    />
  </Link>
)
