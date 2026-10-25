export type DrawerStepEntry<TStep extends string> = {
  key: string;
  step: TStep;
  rowId: string;
};

export const measureDrawerHeight = (contentScrollHeight: number, headerHeight: number) =>
  contentScrollHeight + headerHeight;

export const drawerHeightVars = (height: number | null) =>
  height ? { "--drawer-height": `${height}px` } : undefined;

export const visibleRows = <T>(rows: T[], expanded: boolean, limit: number) =>
  expanded ? rows : rows.slice(0, limit);
