"use client";

import { useCraftDemo } from "./useCraftDemo";

type Props = { id: string };

export const CraftDemo = ({ id }: Props) => {
  const { ref, Demo } = useCraftDemo(id);

  return (
    <div ref={ref} className="relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-black">
      {Demo && <Demo />}
    </div>
  );
};
