import Link from "next/link";
import { FaArrowLeft, FaArrowRight, FaArrowUpRightFromSquare } from "react-icons/fa6";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Media } from "@/components/ui/Media";
import { Pill } from "@/components/ui/Pill";
import { surface } from "@/lib/surface";
import { cn } from "@/lib/utils";
import type { WorkItem } from "@/components/Work/types";
import { CaseStudySection } from "./CaseStudySection";

type Props = { item: WorkItem; next: WorkItem };

export const CaseStudy = ({ item, next }: Props) => (
  <article className="mx-auto flex w-full max-w-4xl flex-col gap-16 px-6 pt-32 pb-24 md:gap-20 md:pt-40">
    <header className="flex flex-col gap-8">
      <Link
        href="/#work"
        className="inline-flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <FaArrowLeft className="h-3 w-3" /> All work
      </Link>
      <div className="flex flex-col gap-5">
        <Eyebrow>Case study</Eyebrow>
        <h1 className="text-heading font-semibold tracking-tight text-balance">{item.title}</h1>
        <p className="max-w-2xl text-lg text-foreground/70 leading-relaxed text-pretty md:text-xl">
          {item.summary}
        </p>
      </div>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 font-mono text-xs text-muted-foreground">
          <dt className="text-foreground/40">Role</dt>
          <dd>{item.role}</dd>
          <dt className="text-foreground/40">Stack</dt>
          <dd>{item.stack.join(" · ")}</dd>
        </dl>
        <Pill
          as="a"
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          variant="solid"
          className="self-start sm:self-auto"
        >
          Visit live site
          <FaArrowUpRightFromSquare className="h-3.5 w-3.5" />
        </Pill>
      </div>
    </header>

    <div className={cn(surface(), "aspect-video")}>
      <Media media={item.media} title={item.title} sizes="(max-width: 896px) 100vw, 896px" eager />
    </div>

    <CaseStudySection label="The problem">
      <p className="max-w-2xl text-base text-foreground/80 leading-relaxed text-pretty md:text-lg">
        {item.caseStudy.problem}
      </p>
    </CaseStudySection>

    <CaseStudySection label="What I built">
      <ul className="flex max-w-2xl flex-col gap-3">
        {item.caseStudy.built.map((line) => (
          <li key={line} className="flex gap-3 text-base text-foreground/80 leading-relaxed">
            <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-foreground/30" />
            {line}
          </li>
        ))}
      </ul>
    </CaseStudySection>

    <CaseStudySection label="Key decisions">
      <div className="grid gap-4 md:grid-cols-3">
        {item.caseStudy.decisions.map((decision) => (
          <div key={decision.title} className={cn(surface(), "flex flex-col gap-3 p-6")}>
            <h3 className="text-base font-semibold tracking-tight">{decision.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed text-pretty">{decision.body}</p>
          </div>
        ))}
      </div>
    </CaseStudySection>

    <footer className="flex flex-col gap-6 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-2">
        <p className="text-lg font-semibold tracking-tight">Have a project like this?</p>
        <Link href="/#contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
          Get in touch
        </Link>
      </div>
      <Link href={`/work/${next.id}`} className="group">
        <Pill as="span" variant="ghost">
          Next: {next.title}
          <FaArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Pill>
      </Link>
    </footer>
  </article>
);
