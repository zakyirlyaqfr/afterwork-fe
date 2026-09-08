import { DEFAULT_IMAGE } from "@/data/assets";

export interface NavItem {
  id: string;
  number: string;
  label: string;
  href: string;
  previewImage: string;
  previewAlt: string;
  subLabel: string;
}

export const navigationItems: NavItem[] = [
  {
    id: "about",
    number: "01",
    label: "ABOUT AFTERWORK",
    href: "/about",
    previewImage: DEFAULT_IMAGE,
    previewAlt: "Afterwork Brutalist interior architecture",
    subLabel: "CULTURE & ARCHITECTURE"
  },
  {
    id: "menus",
    number: "02",
    label: "MENUS",
    href: "/menus",
    previewImage: DEFAULT_IMAGE,
    previewAlt: "Afterwork espresso tonic signature drink",
    subLabel: "SPECIALTY COFFEE & BOTTLED"
  },
  {
    id: "delivery",
    number: "03",
    label: "DELIVERY",
    href: "/delivery",
    previewImage: DEFAULT_IMAGE,
    previewAlt: "Bottled drinks ready for instant dispatch",
    subLabel: "GOJEK & GRAB CHANNELS"
  },
  {
    id: "gallery",
    number: "04",
    label: "GALLERY",
    href: "/gallery",
    previewImage: DEFAULT_IMAGE,
    previewAlt: "Atmospheric late night moments in Surabaya",
    subLabel: "VISUAL ARCHIVE 09:00—02:00"
  },
  {
    id: "contact",
    number: "05",
    label: "CONTACT",
    href: "/contact",
    previewImage: DEFAULT_IMAGE,
    previewAlt: "Storefront entrance at midnight",
    subLabel: "LOCATION & HOURS"
  },
  {
    id: "faqs",
    number: "06",
    label: "FAQs",
    href: "/faqs",
    previewImage: DEFAULT_IMAGE,
    previewAlt: "Precision pour-over brewing apparatus",
    subLabel: "FREQUENT INQUIRIES"
  }
];
