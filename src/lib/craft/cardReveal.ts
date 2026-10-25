export const CARD_FALLBACK_MS = 4000;

const CARD_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export const CARD_CONTENT_TRANSITION = { duration: 0.5, ease: CARD_EASE };

export const BIO_TRANSITION = { duration: 0.4, ease: CARD_EASE };

export const TAB_SPRING = { type: "spring", stiffness: 380, damping: 32 } as const;

export const PROFILE_VIGNETTE =
  "radial-gradient(ellipse at center, transparent 35%, rgba(0, 0, 0, 0.6) 100%)";

export const profileInitial = (name: string) => name.charAt(0).toUpperCase();
