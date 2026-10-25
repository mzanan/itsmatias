import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CraftCard } from "./CraftCard";
import type { CraftProject } from "./types";

type Props = { projects: CraftProject[] };

export const Craft = ({ projects }: Props) => (
  <article className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-6 pt-32 pb-24 md:gap-20 md:pt-40">
    <header className="flex flex-col gap-8">
      <Link
        href="/"
        className="inline-flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <FaArrowLeft className="h-3 w-3" /> Home
      </Link>
      <div className="flex flex-col gap-5">
        <Eyebrow>Craft</Eyebrow>
        <h1 className="text-heading font-semibold tracking-tight text-balance">Micro-interactions and motion</h1>
        <p className="max-w-2xl text-lg text-foreground/70 leading-relaxed text-pretty md:text-xl">
          The small details I built across my live projects. Each one runs live here, with a link to the real page where it ships.
        </p>
      </div>
    </header>

    {projects.map((project, index) => (
      <section key={project.id} className="flex flex-col gap-6">
        <Eyebrow index={String(index + 1).padStart(2, "0")}>{project.name}</Eyebrow>
        <div className="grid gap-4 md:grid-cols-2">
          {project.items.map((item) => (
            <CraftCard key={item.id} item={item} projectName={project.name} />
          ))}
        </div>
      </section>
    ))}
  </article>
);
