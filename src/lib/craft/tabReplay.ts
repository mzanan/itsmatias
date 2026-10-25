export const activeTabIndex = (tabs: { id: string }[], activeTabId: string) =>
  Math.max(
    0,
    tabs.findIndex((tab) => tab.id === activeTabId)
  );

export const addVisited = (visited: Set<string>, id: string) => new Set(visited).add(id);

export const visitedScenes = <T extends { id: string }>(tabs: T[], visited: Set<string>, activeTabId: string) =>
  tabs.filter((tab) => visited.has(tab.id)).map((tab) => ({ ...tab, active: tab.id === activeTabId }));
