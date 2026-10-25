import { Cormorant_Garamond, Great_Vibes } from "next/font/google";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-split-display",
  display: "swap",
  preload: false,
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-split-script",
  display: "swap",
  preload: false,
});

export const splitScreenFontVariables = `${cormorantGaramond.variable} ${greatVibes.variable}`;
