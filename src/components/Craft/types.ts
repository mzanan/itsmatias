export type CraftKind = "micro" | "motion";

export type CraftItem = {
  id: string;
  kind: CraftKind;
  title: string;
  description: string;
  how: string;
  href: string;
};

export type CraftProject = {
  id: string;
  name: string;
  url: string;
  items: CraftItem[];
};
