import { useEffect, useRef } from "react";
import { runAfterLoadWhenIdle } from "@/lib/idle";
import type { ShaderId } from "@/lib/shaders";

type Options = {
  maxDpr?: number;
  fps?: number;
};

export const useShaderCanvas = (
  shader: ShaderId,
  { maxDpr, fps }: Options = {}
) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    let cancelled = false;
    let unmount: (() => void) | undefined;

    const cancelIdle = runAfterLoadWhenIdle(async () => {
      const [{ mountShader }, { SHADER_FRAGMENTS }] = await Promise.all([
        import("@/lib/shaderCanvas"),
        import("@/lib/shaders"),
      ]);
      if (!cancelled)
        unmount = mountShader(container, SHADER_FRAGMENTS[shader], {
          maxDpr,
          fps,
        });
    });

    return () => {
      cancelled = true;
      cancelIdle();
      unmount?.();
    };
  }, [shader, maxDpr, fps]);

  return ref;
};
