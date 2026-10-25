"use client";

import { useShaderCanvas } from "@/hooks/useShaderCanvas";

export const HeroShaderStage = () => {
  const shaderRef = useShaderCanvas("hero");

  return (
    <div className="absolute inset-0">
      <div ref={shaderRef} aria-hidden className="absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-background to-transparent"
      />
    </div>
  );
};
