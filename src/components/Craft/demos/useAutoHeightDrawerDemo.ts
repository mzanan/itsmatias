import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type TransitionEvent,
} from "react";
import {
  drawerHeightVars,
  measureDrawerHeight,
  visibleRows,
  type DrawerStepEntry,
} from "@/lib/craft/autoHeightDrawer";
import drawer from "./autoHeightDrawer.json";

type StepKey = keyof typeof drawer.steps;
type Row = (typeof drawer.rows)[number];

export const useAutoHeightDrawerDemo = () => {
  const popupRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [drawerHeight, setDrawerHeight] = useState<number | null>(null);
  const [steps, setSteps] = useState<DrawerStepEntry<StepKey>[]>([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!mounted) return;
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => {
        setOpen(true);
        popupRef.current?.focus({ preventScroll: true });
      });
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [mounted]);

  useEffect(() => {
    if (!open) return;
    const content = contentRef.current;
    const header = headerRef.current;
    const inner = innerRef.current;
    if (!content) return;
    const recompute = () => {
      const headerHeight = headerRef.current?.offsetHeight ?? 0;
      setDrawerHeight(measureDrawerHeight(content.scrollHeight, headerHeight));
    };
    const observer = new ResizeObserver(recompute);
    observer.observe(content);
    if (header) observer.observe(header);
    if (inner) observer.observe(inner);
    return () => observer.disconnect();
  }, [open]);

  const openDrawer = () => {
    if (mounted) {
      setOpen(true);
      return;
    }
    setMounted(true);
  };

  const close = useCallback(() => {
    setOpen(false);
    setSteps([]);
  }, []);

  const push = (row: Row) => {
    setSteps((current) => [
      ...current,
      { key: `${row.id}-${row.step}`, step: row.step as StepKey, rowId: row.id },
    ]);
    popupRef.current?.focus({ preventScroll: true });
  };

  const pop = () => {
    setSteps((current) => current.slice(0, -1));
    popupRef.current?.focus({ preventScroll: true });
  };

  const handleBack = () => {
    if (steps.length > 0) {
      pop();
      return;
    }
    close();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Escape" || !open) return;
    event.stopPropagation();
    handleBack();
  };

  const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || event.propertyName !== "translate" || open) return;
    setMounted(false);
    setDrawerHeight(null);
    setExpanded(false);
  };

  const activeEntry = steps.at(-1) ?? null;
  const activeRow = activeEntry ? drawer.rows.find((row) => row.id === activeEntry.rowId) ?? null : null;

  return {
    popupRef,
    contentRef,
    headerRef,
    innerRef,
    mounted,
    open,
    heightVars: drawerHeightVars(drawerHeight) as CSSProperties | undefined,
    hasStep: activeEntry !== null,
    activeEntry,
    activeStep: activeEntry ? drawer.steps[activeEntry.step] : null,
    activeRow,
    rows: visibleRows(drawer.rows, expanded, drawer.visibleRows),
    expanded,
    toggleExpanded: () => setExpanded((value) => !value),
    copy: drawer,
    openDrawer,
    close,
    push,
    pop,
    handleKeyDown,
    handleTransitionEnd,
  };
};
