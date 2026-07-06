import Link from "next/link"

type SalesPageShellProps = {
  children: React.ReactNode
}

export const SalesPageShell = ({ children }: SalesPageShellProps) => {
  return (
    <div className="min-h-dvh flex flex-col text-slate-200">
      <header className="w-full">
        <nav className="container mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-lg font-bold gradient-text transition-all hover:opacity-80">
            itsmatias
          </Link>
        </nav>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-10">
        {children}
      </main>
    </div>
  )
}
