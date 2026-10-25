"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

export const craftDemos: Record<string, ComponentType> = {
  "hero-shader": dynamic(() => import("./demos/HeroShaderDemo").then((m) => m.HeroShaderDemo), { ssr: false }),
  "hero-stack": dynamic(() => import("./demos/HeroStackDemo").then((m) => m.HeroStackDemo), { ssr: false }),
  "shader-lab": dynamic(() => import("./demos/ShaderLabDemo").then((m) => m.ShaderLabDemo), { ssr: false }),
  "before-after": dynamic(() => import("./demos/BeforeAfterDemo").then((m) => m.BeforeAfterDemo), { ssr: false }),
  "madlibs-form": dynamic(() => import("./demos/MadlibsFormDemo").then((m) => m.MadlibsFormDemo), { ssr: false }),
  "about-shuffle": dynamic(() => import("./demos/AboutShuffleDemo").then((m) => m.AboutShuffleDemo), { ssr: false }),
  "split-screen": dynamic(() => import("./demos/SplitScreenDemo").then((m) => m.SplitScreenDemo), { ssr: false }),
  "card-reveal": dynamic(() => import("./demos/CardRevealDemo").then((m) => m.CardRevealDemo), { ssr: false }),
  "video-wall": dynamic(() => import("./demos/VideoWallDemo").then((m) => m.VideoWallDemo), { ssr: false }),
  "accent-glow": dynamic(() => import("./demos/AccentGlowDemo").then((m) => m.AccentGlowDemo), { ssr: false }),
  "drifting-cards": dynamic(() => import("./demos/DriftingCardsDemo").then((m) => m.DriftingCardsDemo), { ssr: false }),
  "payment-celebration": dynamic(() => import("./demos/PaymentCelebrationDemo").then((m) => m.PaymentCelebrationDemo), { ssr: false }),
  odometer: dynamic(() => import("./demos/OdometerDemo").then((m) => m.OdometerDemo), { ssr: false }),
  "auto-height-drawer": dynamic(() => import("./demos/AutoHeightDrawerDemo").then((m) => m.AutoHeightDrawerDemo), { ssr: false }),
  "hero-choreography": dynamic(() => import("./demos/HeroChoreographyDemo").then((m) => m.HeroChoreographyDemo), { ssr: false }),
  "scroll-reveals": dynamic(() => import("./demos/ScrollRevealsDemo").then((m) => m.ScrollRevealsDemo), { ssr: false }),
  "hero-video": dynamic(() => import("./demos/HeroVideoDemo").then((m) => m.HeroVideoDemo), { ssr: false }),
  "vibe-carousel": dynamic(() => import("./demos/VibeCarouselDemo").then((m) => m.VibeCarouselDemo), { ssr: false }),
  "album-reveal": dynamic(() => import("./demos/AlbumRevealDemo").then((m) => m.AlbumRevealDemo), { ssr: false }),
};
