export const ROTATION_MS = 5000;

export const EMBLA_OPTIONS = {
  loop: true,
  align: "start",
  duration: 16,
  dragThreshold: 4,
  skipSnaps: true,
  containScroll: false,
} as const;

export const EXPERIENCES = [
  {
    id: "social-dinners",
    label: "Social Dinners",
    description: "Long-table dinners that turn strangers into friends.",
    image: "/craft/demo/vibe-carousel/social-dinners.webp",
  },
  {
    id: "creative-workshops",
    label: "Creative Workshops",
    description: "Painting, pottery, journaling. Make something with your hands.",
    image: "/craft/demo/vibe-carousel/creative-workshops.webp",
  },
  {
    id: "sunset-parties",
    label: "Sunset Parties",
    description: "Music, drinks and golden hour on the coast.",
    image: "/craft/demo/vibe-carousel/sunset-parties.webp",
  },
  {
    id: "boat-experiences",
    label: "Boat Experiences",
    description: "Day trips, snorkeling, slow afternoons on the water.",
    image: "/craft/demo/vibe-carousel/boat-experiences.webp",
  },
  {
    id: "pickleball-sessions",
    label: "Pickleball Sessions",
    description: "Casual matches, all skill levels welcome.",
    image: "/craft/demo/vibe-carousel/pickleball-sessions.webp",
  },
] as const;

export const isHorizontalWheel = (event: WheelEvent) => Math.abs(event.deltaX) > Math.abs(event.deltaY);
