import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/CaseStudy/CaseStudy";
import { Header } from "@/components/Header/Header";
import type { WorkItem } from "@/components/Work/types";
import workData from "@/components/Work/work.json";
import { JsonLd } from "@/components/ui/JsonLd";
import { caseStudyJsonLd } from "@/lib/seo";
import { nextById } from "@/lib/work";

const items = workData as WorkItem[];

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return items.map((item) => ({ slug: item.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = items.find((entry) => entry.id === slug);
  if (!item) return {};
  return {
    title: `${item.title} case study`,
    description: item.summary,
    alternates: { canonical: `/work/${item.id}` },
    openGraph: { title: `${item.title} case study`, description: item.summary, type: "article" },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const item = items.find((entry) => entry.id === slug);
  if (!item) notFound();
  return (
    <>
      <JsonLd data={caseStudyJsonLd(item)} />
      <Header />
      <main className="overflow-y-scroll overflow-x-hidden h-[100dvh] w-full">
        <CaseStudy item={item} next={nextById(items, item.id)} />
      </main>
    </>
  );
}
