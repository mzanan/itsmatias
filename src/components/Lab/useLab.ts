import { useState } from "react";
import { LAB_SHADERS, type LabShader } from "@/lib/labShaders";
import { useShaderCanvas } from "@/hooks/useShaderCanvas";

export const useLab = () => {
  const [activeId, setActiveId] = useState<LabShader["id"]>(LAB_SHADERS[0].id);
  const stageRef = useShaderCanvas(activeId, { fps: 60 });
  const active = LAB_SHADERS.find((s) => s.id === activeId) ?? LAB_SHADERS[0];

  return { shaders: LAB_SHADERS, active, setActiveId, stageRef };
};
