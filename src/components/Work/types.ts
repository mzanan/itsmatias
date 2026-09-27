import type { MediaSource } from "@/types/media";

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
};
