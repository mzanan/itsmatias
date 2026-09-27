export type StackPhase = { open: boolean; focus: number | null };

export const stackPhase = (step: number, count: number): StackPhase => {
  const phase = step % (count + 2);
  if (phase === 0) return { open: false, focus: null };
  if (phase <= count) return { open: true, focus: phase - 1 };
  return { open: true, focus: null };
};
