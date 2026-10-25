import { useState } from "react";

export const useHeroShaderDemo = () => {
  const [replayKey, setReplayKey] = useState(0);
  const replay = () => setReplayKey((k) => k + 1);

  return { replayKey, replay };
};
