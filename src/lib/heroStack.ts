export type StackPhase = { open: boolean; focus: number | null };

type StackCardMotion = { rotate: number; spread: { x: number; y: number } };

type StackCardState = { focused: boolean; open: boolean; compact: boolean };

export const STACK_STEP_MS = 1000;

const OPEN_ROTATE = 1.6;
const FOCUS_SCALE = 1.2;
const COMPACT_FOCUS_SCALE = 1.04;
const COMPACT_SPREAD_X = 0.05;
const COMPACT_SPREAD_Y = 0.25;
const COMPACT_OPEN_ROTATE = 1;

export const stackPhase = (step: number, count: number): StackPhase => {
  const phase = step % (count + 2);
  if (phase === 0) return { open: false, focus: null };
  if (phase <= count) return { open: true, focus: phase - 1 };
  return { open: true, focus: null };
};

export const stackCardTarget = (
  card: StackCardMotion,
  { focused, open, compact }: StackCardState
) => {
  const x = compact ? card.spread.x * COMPACT_SPREAD_X : card.spread.x;
  const y = compact ? card.spread.y * COMPACT_SPREAD_Y : card.spread.y;

  if (focused) {
    return {
      rotate: 0,
      scale: compact ? COMPACT_FOCUS_SCALE : FOCUS_SCALE,
      zIndex: 20,
      x,
      y,
    };
  }

  const openRotate = compact ? COMPACT_OPEN_ROTATE : OPEN_ROTATE;
  return {
    rotate: open ? card.rotate * openRotate : card.rotate,
    scale: 1,
    zIndex: 0,
    x: open ? x : 0,
    y: open ? y : 0,
  };
};
