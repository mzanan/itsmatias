import { Header } from "@/components/Header/Header";
import { Hero } from "@/components/Hero/Hero";
import { ProjectsShowcase } from "@/components/ProjectsShowcase/ProjectsShowcase";
import { About } from "@/components/About/About";
import { Contact } from "@/components/Contact/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main className="snap-y snap-mandatory overflow-y-scroll h-screen">
        <Hero />
        <ProjectsShowcase />
        <About />
        <Contact />
      </main>
    </>
  );
}
