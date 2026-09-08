export interface AssetMeta {
  src: string;
  alt: string;
  width: number;
  height: number;
  category: "brand" | "home" | "about" | "menu" | "navigation" | "gallery" | "contact" | "sequence";
  caption?: string;
  aspectRatio?: string;
}

export const DEFAULT_IMAGE = "/images/default.jpg";
export const DEFAULT_PLACEHOLDER_WEBP = "/images/default.webp";
export const DEFAULT_PLACEHOLDER_PNG = "/images/default.png";

export const brandAssets = {
  // Primary brand logos
  logoWhitePng: {
    src: "/brand/logo short white afterwork caffeine.PNG",
    alt: "Afterwork Caffeine Logo White",
    width: 1024,
    height: 1024,
    category: "brand" as const,
  },
  logoBlackPng: {
    src: "/brand/logo short black afterwork caffeine.PNG",
    alt: "Afterwork Caffeine Logo Black",
    width: 1024,
    height: 1024,
    category: "brand" as const,
  },
  logoWhiteSvg: {
    src: "/brand/logo-short-white-placeholder.svg",
    alt: "Afterwork Caffeine Logo White SVG",
    width: 400,
    height: 120,
    category: "brand" as const,
  },
  logoBlackSvg: {
    src: "/brand/logo-short-black-placeholder.svg",
    alt: "Afterwork Caffeine Logo Black SVG",
    width: 400,
    height: 120,
    category: "brand" as const,
  },
};

export const homeAssets = {
  hero: {
    src: DEFAULT_IMAGE,
    alt: "Afterwork Barista preparing espresso under direct flash and industrial steel counter",
    width: 2400,
    height: 1600,
    category: "home" as const,
  },
  aboutTeaser: {
    src: DEFAULT_IMAGE,
    alt: "Raw brutalist concrete interior of Afterwork Caffeine Surabaya",
    width: 1600,
    height: 2000,
    category: "home" as const,
  },
  galleryPreview: [
    {
      src: DEFAULT_IMAGE,
      alt: "Espresso Tonic with citrus slice on black stone",
      width: 1200,
      height: 1600,
      category: "home" as const,
      caption: "01 — COLD EXTRACTION",
      aspectRatio: "3/4"
    },
    {
      src: DEFAULT_IMAGE,
      alt: "Signature Nitro Cold Brew amber bottle",
      width: 1400,
      height: 1000,
      category: "home" as const,
      caption: "02 — BOTTLED RESERVE",
      aspectRatio: "7/5"
    },
    {
      src: DEFAULT_IMAGE,
      alt: "Midnight Cruffin warm pastry on steel plate",
      width: 1000,
      height: 1400,
      category: "home" as const,
      caption: "03 — COMFORT FOOD",
      aspectRatio: "5/7"
    },
    {
      src: DEFAULT_IMAGE,
      alt: "Geisha Pour-Over manual brew precision station",
      width: 1600,
      height: 1100,
      category: "home" as const,
      caption: "04 — MANUAL RITUAL",
      aspectRatio: "16/11"
    },
    {
      src: DEFAULT_IMAGE,
      alt: "Freshly baked Kouign-Amann with caramelized crust",
      width: 1200,
      height: 1500,
      category: "home" as const,
      caption: "05 — MIDNIGHT BAKE",
      aspectRatio: "4/5"
    }
  ]
};

export const aboutAssets = {
  hero: {
    src: DEFAULT_IMAGE,
    alt: "Afterwork Architecture and interior layout",
    width: 2000,
    height: 1300,
    category: "about" as const,
  },
  interior: {
    src: DEFAULT_IMAGE,
    alt: "Barista dialing in seasonal beans",
    width: 1400,
    height: 1800,
    category: "about" as const,
  },
  detail: {
    src: DEFAULT_IMAGE,
    alt: "Cold infusion laboratory and amber bottles",
    width: 1200,
    height: 1600,
    category: "about" as const,
  },
  night: {
    src: DEFAULT_IMAGE,
    alt: "Afterwork night atmosphere at 01:45 AM",
    width: 1800,
    height: 1200,
    category: "about" as const,
  }
};

export const menuAssets = {
  coffee: {
    src: DEFAULT_IMAGE,
    alt: "Espresso Tonic on granite surface",
    width: 1200,
    height: 1200,
    category: "menu" as const,
  },
  bottle: {
    src: DEFAULT_IMAGE,
    alt: "Amber bottled cold brew with custom typography label",
    width: 1200,
    height: 1200,
    category: "menu" as const,
  },
  food: {
    src: DEFAULT_IMAGE,
    alt: "Savory pastry comfort food",
    width: 1200,
    height: 1200,
    category: "menu" as const,
  },
  noncoffee: {
    src: DEFAULT_IMAGE,
    alt: "Specialty non-coffee crafted drink",
    width: 1200,
    height: 1200,
    category: "menu" as const,
  }
};

export const navigationAssets = {
  about: {
    src: DEFAULT_IMAGE,
    alt: "About Afterwork navigation preview",
    width: 1000,
    height: 1400,
    category: "navigation" as const,
  },
  menus: {
    src: DEFAULT_IMAGE,
    alt: "Menus navigation preview",
    width: 1000,
    height: 1400,
    category: "navigation" as const,
  },
  delivery: {
    src: DEFAULT_IMAGE,
    alt: "Delivery navigation preview",
    width: 1000,
    height: 1400,
    category: "navigation" as const,
  },
  gallery: {
    src: DEFAULT_IMAGE,
    alt: "Gallery navigation preview",
    width: 1000,
    height: 1400,
    category: "navigation" as const,
  },
  contact: {
    src: DEFAULT_IMAGE,
    alt: "Contact navigation preview",
    width: 1000,
    height: 1400,
    category: "navigation" as const,
  },
  faqs: {
    src: DEFAULT_IMAGE,
    alt: "FAQs navigation preview",
    width: 1000,
    height: 1400,
    category: "navigation" as const,
  }
};
