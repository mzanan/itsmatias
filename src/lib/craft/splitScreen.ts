export type PathType = "DAY" | "NIGHT";

export const SPLIT_TRANSITION = "clip-path 0.8s cubic-bezier(0.4, 0, 0.2, 1)";

export const getDiagonalPosition = (
  selectedType: PathType | null,
  hoveredPath: PathType | null,
) => {
  let topPosition = 60;
  let bottomPosition = 40;

  if (selectedType === "NIGHT") {
    topPosition = 100;
    bottomPosition = 0;
  }

  if (selectedType === "DAY") {
    topPosition = 0;
    bottomPosition = 100;
  }

  if (hoveredPath === "NIGHT" && !selectedType) {
    topPosition = 80;
    bottomPosition = 20;
  }

  if (hoveredPath === "DAY" && !selectedType) {
    topPosition = 40;
    bottomPosition = 60;
  }

  return { topPosition, bottomPosition };
};

export const diagonalClipPath = (topPosition: number, bottomPosition: number) =>
  `polygon(0 0, ${topPosition}% 0, ${bottomPosition}% 100%, 0 100%)`;

export const pathLabel = (type: PathType) => (type === "DAY" ? "Day" : "Night");
