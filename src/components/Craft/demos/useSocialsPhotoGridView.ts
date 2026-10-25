import { useCallback, useEffect, useRef, useState } from "react";
import { READY_FALLBACK_MS, loadedPrefix, readyDelay, simulatedLatency } from "@/lib/craft/gridReveal";

type Options = {
  total: number;
  isActive: boolean;
  simulateLatency: boolean;
  onReady?: () => void;
};

export const useSocialsPhotoGridView = ({ total, isActive, simulateLatency, onReady }: Options) => {
  const [readyCount, setReadyCount] = useState(0);
  const loadedRef = useRef<Set<number>>(new Set());
  const readyFiredRef = useRef(false);
  const latencyTimersRef = useRef<number[]>([]);

  const commitLoaded = useCallback((index: number) => {
    loadedRef.current.add(index);
    setReadyCount((prev) => loadedPrefix(loadedRef.current, prev));
  }, []);

  const markLoaded = useCallback(
    (index: number) => {
      if (!simulateLatency) {
        commitLoaded(index);
        return;
      }
      latencyTimersRef.current.push(window.setTimeout(() => commitLoaded(index), simulatedLatency()));
    },
    [simulateLatency, commitLoaded]
  );

  useEffect(() => {
    const timers = latencyTimersRef.current;
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => setReadyCount(total), READY_FALLBACK_MS);
    return () => window.clearTimeout(id);
  }, [total]);

  useEffect(() => {
    if (!isActive || total === 0 || readyCount < total || readyFiredRef.current) return;
    const id = window.setTimeout(() => {
      readyFiredRef.current = true;
      onReady?.();
    }, readyDelay(total));
    return () => window.clearTimeout(id);
  }, [isActive, readyCount, total, onReady]);

  return { readyCount, markLoaded };
};
