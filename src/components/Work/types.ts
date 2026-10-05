import type { MediaSource } from "@/types/media";

export type CaseStudyDecision = {
  title: string;
  body: string;
};

export type CaseStudy = {
  problem: string;
  built: string[];
  decisions: CaseStudyDecision[];
};

export type WorkItem = {
  id: string;
  title: string;
  summary: string;
  detail: string;
  role: string;
  stack: string[];
  url: string;
  featured: boolean;
  media: MediaSource;
  caseStudy: CaseStudy;
};
