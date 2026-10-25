export const ROTATE_MS = 3200;
const SWAP_PER_TICK = 3;

export const sample = <T>(arr: T[], k: number): T[] => {
  const copy = [...arr];
  const out: T[] = [];
  for (let i = 0; i < k && copy.length > 0; i++) {
    const j = Math.floor(Math.random() * copy.length);
    out.push(copy.splice(j, 1)[0]);
  }
  return out;
};

export const initSlots = (pool: string[], count: number): string[] => {
  if (pool.length === 0 || count === 0) return [];
  return Array.from({ length: Math.min(count, pool.length) }, (_, i) => pool[i % pool.length]);
};

export const poolSignature = (pool: string[], count: number) =>
  `${count}|${pool.length}|${pool[0] ?? ""}|${pool[pool.length - 1] ?? ""}`;

export const rotateSlots = (prev: string[], pool: string[]): string[] => {
  if (prev.length === 0) return prev;
  const visible = new Set(prev);
  const reserve = pool.filter((src) => !visible.has(src));
  if (reserve.length === 0) return prev;
  const swaps = Math.min(SWAP_PER_TICK, prev.length, reserve.length);
  const positions = sample(
    prev.map((_, i) => i),
    swaps
  );
  const incoming = sample(reserve, swaps);
  const next = [...prev];
  positions.forEach((pos, k) => {
    next[pos] = incoming[k];
  });
  return next;
};
