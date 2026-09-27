import type { Metadata } from "next";
import { Header } from "@/components/Header/Header";
import { ProjectsShowcase } from "@/components/ProjectsShowcase/ProjectsShowcase";

export const metadata: Metadata = {
  title: "Templates",
  description:
    "Production-ready Next.js websites you can deploy to your own Vercel in one click.",
  alternates: { canonical: "/templates" },
};

export default function TemplatesPage() {
  return (
    <>
      <Header />
      <main className="snap-y snap-proximity overflow-y-scroll overflow-x-hidden h-[100dvh] w-full">
        <ProjectsShowcase />
      </main>
    </>
  );
}
