import { useState } from "react";

export const useBeforeAfterDemo = () => {
  const [replayKey, setReplayKey] = useState(0);
  const replay = () => setReplayKey((k) => k + 1);

  return { replayKey, replay };
};
