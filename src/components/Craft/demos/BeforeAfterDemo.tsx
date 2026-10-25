"use client";

import { BeforeAfterStage } from "./BeforeAfterStage";
import { ReplayPill } from "./ReplayPill";
import { useBeforeAfterDemo } from "./useBeforeAfterDemo";

export const BeforeAfterDemo = () => {
  const { replayKey, replay } = useBeforeAfterDemo();

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <BeforeAfterStage key={replayKey} />
      <ReplayPill onClick={replay} />
    </div>
  );
};
