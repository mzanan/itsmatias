export type WorkMedia =
  | { kind: "video"; src: string }
  | { kind: "image"; src: string }
  | { kind: "beforeAfter" };

export type WorkItem = {
  id: string;
  title: string;
  summary: string;
  detail: string;
  role: string;
  stack: string[];
  url: string;
  featured: boolean;
  media: WorkMedia;
};
