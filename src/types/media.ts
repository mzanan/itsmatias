export type ComparisonSide = {
  src: string;
  poster: string;
  posterMobile: string;
  alt: string;
};

export type MediaSource =
  | { kind: "video"; src: string }
  | { kind: "image"; src: string }
  | {
      kind: "beforeAfter";
      before: ComparisonSide;
      after: ComparisonSide;
      designWidth: number;
    };
