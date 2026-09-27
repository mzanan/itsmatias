import { useState } from "react";

export const useHeroStack = () => {
  const [open, setOpen] = useState(false);

  return {
    open,
    onHoverStart: () => setOpen(true),
    onHoverEnd: () => setOpen(false),
  };
};
