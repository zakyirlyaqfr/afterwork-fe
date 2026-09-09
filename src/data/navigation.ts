import { DEFAULT_IMAGE } from "@/data/assets";

export interface NavItem {
  id: string;
  number: string;
  label: string;
  href: string;
  previewImage: string;
  previewAlt: string;
}

export const navigationItems: NavItem[] = [
  {
    id: "about",
    number: "01",
    label: "ABOUT",
    href: "/about",
    previewImage: DEFAULT_IMAGE,
    previewAlt: "Afterwork Brutalist interior architecture",
  },
  {
    id: "menus",
    number: "02",
    label: "MENUS",
    href: "/menus",
    previewImage: DEFAULT_IMAGE,
    previewAlt: "Afterwork espresso tonic signature drink",
  },
  {
    id: "gallery",
    number: "03",
    label: "GALLERY",
    href: "/gallery",
    previewImage: DEFAULT_IMAGE,
    previewAlt: "Atmospheric late night moments in Surabaya",
  },
  {
    id: "contact",
    number: "04",
    label: "CONTACT",
    href: "/contact",
    previewImage: DEFAULT_IMAGE,
    previewAlt: "Storefront entrance at midnight",
  },
  {
    id: "faqs",
    number: "05",
    label: "FAQs",
    href: "/faqs",
    previewImage: DEFAULT_IMAGE,
    previewAlt: "Precision pour-over brewing apparatus",
  }
];
