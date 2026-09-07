export interface AssetMeta {
  src: string;
  alt: string;
  width: number;
  height: number;
  category: "brand" | "home" | "about" | "menu" | "navigation" | "gallery" | "contact" | "sequence";
  caption?: string;
  aspectRatio?: string;
}

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
    src: "/images/home/home-hero-01.jpg",
    alt: "Afterwork Barista preparing espresso under direct flash and industrial steel counter",
    width: 2400,
    height: 1600,
    category: "home" as const,
  },
  aboutTeaser: {
    src: "/images/home/home-about-01.jpg",
    alt: "Raw brutalist concrete interior of Afterwork Caffeine Surabaya",
    width: 1600,
    height: 2000,
    category: "home" as const,
  },
  galleryPreview: [
    {
      src: "/images/home/home-gallery-01.jpg",
      alt: "Espresso Tonic with citrus slice on black stone",
      width: 1200,
      height: 1600,
      category: "home" as const,
      caption: "01 — COLD EXTRACTION",
      aspectRatio: "3/4"
    },
    {
      src: "/images/home/home-gallery-02.jpg",
      alt: "Signature Nitro Cold Brew amber bottle",
      width: 1400,
      height: 1000,
      category: "home" as const,
      caption: "02 — BOTTLED RESERVE",
      aspectRatio: "7/5"
    },
    {
      src: "/images/home/home-gallery-03.jpg",
      alt: "Midnight Cruffin warm pastry on steel plate",
      width: 1000,
      height: 1400,
      category: "home" as const,
      caption: "03 — COMFORT FOOD",
      aspectRatio: "5/7"
    },
    {
      src: "/images/home/home-gallery-04.jpg",
      alt: "Geisha Pour-Over manual brew precision station",
      width: 1600,
      height: 1100,
      category: "home" as const,
      caption: "04 — MANUAL RITUAL",
      aspectRatio: "16/11"
    },
    {
      src: "/images/home/home-gallery-05.jpg",
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
    src: "/images/about/about-hero.jpg",
    alt: "Afterwork Architecture and interior layout",
    width: 2000,
    height: 1300,
    category: "about" as const,
  },
  interior: {
    src: "/images/about/about-interior.jpg",
    alt: "Barista dialing in seasonal beans",
    width: 1400,
    height: 1800,
    category: "about" as const,
  },
  detail: {
    src: "/images/about/about-detail.jpg",
    alt: "Cold infusion laboratory and amber bottles",
    width: 1200,
    height: 1600,
    category: "about" as const,
  },
  night: {
    src: "/images/about/about-night.jpg",
    alt: "Afterwork night atmosphere at 01:45 AM",
    width: 1800,
    height: 1200,
    category: "about" as const,
  }
};

export const menuAssets = {
  coffee: {
    src: "/images/menu/menu-coffee.jpg",
    alt: "Espresso Tonic on granite surface",
    width: 1200,
    height: 1200,
    category: "menu" as const,
  },
  bottle: {
    src: "/images/menu/menu-bottle.jpg",
    alt: "Amber bottled cold brew with custom typography label",
    width: 1200,
    height: 1200,
    category: "menu" as const,
  },
  food: {
    src: "/images/menu/menu-food.jpg",
    alt: "Savory pastry comfort food",
    width: 1200,
    height: 1200,
    category: "menu" as const,
  },
  noncoffee: {
    src: "/images/menu/menu-noncoffee.jpg",
    alt: "Specialty non-coffee crafted drink",
    width: 1200,
    height: 1200,
    category: "menu" as const,
  }
};

export const navigationAssets = {
  about: {
    src: "/images/navigation/nav-about.jpg",
    alt: "About Afterwork navigation preview",
    width: 1000,
    height: 1400,
    category: "navigation" as const,
  },
  menus: {
    src: "/images/navigation/nav-menu.jpg",
    alt: "Menus navigation preview",
    width: 1000,
    height: 1400,
    category: "navigation" as const,
  },
  delivery: {
    src: "/images/navigation/nav-delivery.jpg",
    alt: "Delivery navigation preview",
    width: 1000,
    height: 1400,
    category: "navigation" as const,
  },
  gallery: {
    src: "/images/navigation/nav-gallery.jpg",
    alt: "Gallery navigation preview",
    width: 1000,
    height: 1400,
    category: "navigation" as const,
  },
  contact: {
    src: "/images/navigation/nav-contact.jpg",
    alt: "Contact navigation preview",
    width: 1000,
    height: 1400,
    category: "navigation" as const,
  },
  faqs: {
    src: "/images/navigation/nav-faq.jpg",
    alt: "FAQs navigation preview",
    width: 1000,
    height: 1400,
    category: "navigation" as const,
  }
};
