const SCROLLABLE = /(auto|scroll|overlay)/;

export const getScrollParent = (el: Element): Element | null => {
  let node = el.parentElement;
  while (node && node !== document.body && node !== document.documentElement) {
    if (SCROLLABLE.test(getComputedStyle(node).overflowY)) return node;
    node = node.parentElement;
  }
  return null;
};
