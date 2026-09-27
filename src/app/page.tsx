import { Header } from "@/components/Header/Header";
import { Hero } from "@/components/Hero/Hero";
import { Work } from "@/components/Work/Work";
import { Lab } from "@/components/Lab/Lab";
import { About } from "@/components/About/About";
import { Contact } from "@/components/Contact/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main className="md:snap-y md:snap-proximity overflow-y-scroll overflow-x-hidden h-[100dvh] w-full">
        <Hero />
        <Work />
        <Lab />
        <About />
        <Contact />
      </main>
    </>
  );
}
