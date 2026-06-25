export const URLS = {
  site: "https://itsmatias.com",
  ecommerce: "https://ecommerce.itsmatias.com",
  landing: "https://landing.itsmatias.com",
  links: "https://links.itsmatias.com",
  hangout: "https://hangout.itsmatias.com",
  hangoutBefore: process.env.NEXT_PUBLIC_HANGOUT_BEFORE_URL ?? "https://hangout.itsmatias.com",
  hangoutAfter: process.env.NEXT_PUBLIC_HANGOUT_AFTER_URL ?? "https://hangout.itsmatias.com",
} as const;

export const CONTACT_EMAIL = "hello@itsmatias.com";
