export const nextById = <T extends { id: string }>(items: T[], id: string): T => {
  const index = items.findIndex((item) => item.id === id);
  return items[(index + 1) % items.length];
};
