import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";

type Props = { label: string; children: ReactNode };

export const CaseStudySection = ({ label, children }: Props) => (
  <section className="flex flex-col gap-6">
    <Eyebrow>{label}</Eyebrow>
    {children}
  </section>
);
