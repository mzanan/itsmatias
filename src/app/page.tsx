"use client";

import { Header } from "@/components/Header/Header";
import { Hero } from "@/components/Hero/Hero";
import { ProjectsShowcase } from "@/components/ProjectsShowcase/ProjectsShowcase";
import { About } from "@/components/About/About";
import { Contact } from "@/components/Contact/Contact";
import { useSnapScroll } from "@/hooks/useSnapScroll";

export default function Home() {
  useSnapScroll();

  return (
    <>
      <Header />
      <main className="snap-y snap-mandatory overflow-y-scroll overflow-x-hidden h-[100dvh] w-full">
        <Hero />
        <ProjectsShowcase />
        <About />
        <Contact />
      </main>
    </>
  );
}
