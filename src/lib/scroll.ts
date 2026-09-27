const SCROLLABLE = /(auto|scroll|overlay)/;

export const getScrollParent = (el: Element): Element | null => {
  let node = el.parentElement;
  while (node && node !== document.body && node !== document.documentElement) {
    if (SCROLLABLE.test(getComputedStyle(node).overflowY)) return node;
    node = node.parentElement;
  }
  return null;
};

export const snapTarget = (
  position: number,
  start: number,
  end: number,
  threshold: number
): number | null => {
  if (position <= start || position >= end) return null;
  return (position - start) / (end - start) >= threshold ? end : start;
};

export const offsetWithin = (el: Element, container: Element) =>
  el.getBoundingClientRect().top -
  container.getBoundingClientRect().top +
  container.scrollTop;
