import type { ShaderId } from "@/lib/shaders";

export type LabShader = {
  id: Exclude<ShaderId, "hero">;
  name: string;
  note: string;
};

export const LAB_SHADERS: LabShader[] = [
  {
    id: "aurora",
    name: "Aurora",
    note: "Four noise-driven ribbons of light. Cheap enough to sit behind a hero.",
  },
  {
    id: "metaballs",
    name: "Metaballs",
    note: "Seven liquid blobs solved per pixel. Your pointer is the eighth.",
  },
  {
    id: "plasma",
    name: "Plasma",
    note: "Four sine fields interfering. The classic demo look, almost free to render.",
  },
  {
    id: "raymarch",
    name: "Raymarch",
    note: "A 3D scene traced 64 steps per pixel. The point where a background stops being free.",
  },
];

export const LAB_REPO_URL =
  "https://github.com/mzanan/labs/tree/main/p4-shader-page-cost";
