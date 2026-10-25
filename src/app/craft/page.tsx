import type { Metadata } from "next";
import { Craft } from "@/components/Craft/Craft";
import craftData from "@/components/Craft/craft.json";
import type { CraftProject } from "@/components/Craft/types";
import { Header } from "@/components/Header/Header";

const projects = craftData as CraftProject[];

export const metadata: Metadata = {
  title: "Craft",
  description: "Micro-interactions and motion I built across my live projects, each linked to the real page where it runs.",
  alternates: { canonical: "/craft" },
};

export default function CraftPage() {
  return (
    <>
      <Header />
      <main className="overflow-y-scroll overflow-x-hidden h-[100dvh] w-full">
        <Craft projects={projects} />
      </main>
    </>
  );
}
