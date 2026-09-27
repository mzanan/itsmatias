type Featurable = { featured: boolean };

export const splitWork = <T extends Featurable>(items: T[]) => {
  const [lead, ...rest] = items;
  return {
    lead,
    grid: rest.filter((item) => !item.featured),
    closing: rest.filter((item) => item.featured),
  };
};
