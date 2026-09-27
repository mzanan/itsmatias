const IDLE_TIMEOUT_MS = 2000;

export const runAfterLoadWhenIdle = (task: () => void): (() => void) => {
  let idleId: number | undefined;
  let timeoutId: number | undefined;

  const schedule = () => {
    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(() => task(), { timeout: IDLE_TIMEOUT_MS });
    } else {
      timeoutId = window.setTimeout(task, 0);
    }
  };

  if (document.readyState === "complete") {
    schedule();
  } else {
    window.addEventListener("load", schedule, { once: true });
  }

  return () => {
    window.removeEventListener("load", schedule);
    if (idleId !== undefined) window.cancelIdleCallback(idleId);
    if (timeoutId !== undefined) window.clearTimeout(timeoutId);
  };
};
