import { DEFAULT_IMAGE } from '@/data/assets';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: "COFFEE" | "BOTTLED" | "FOOD" | "NON COFFEE";
  previewImage: string;
  tag?: string;
}

export const menuCategories = ["COFFEE", "BOTTLED", "FOOD", "NON COFFEE"] as const;

export const menuItems: MenuItem[] = [
  // COFFEE
  {
    id: "c1",
    name: "DOUBLE ESPRESSO",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Seasonal washed Ethiopian Heirloom blend.",
    price: "28K",
    category: "COFFEE",
    previewImage: DEFAULT_IMAGE,
    tag: "SIGNATURE BLEND"
  },
  {
    id: "c2",
    name: "LONG BLACK",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Double ristretto over hot alkaline water.",
    price: "32K",
    category: "COFFEE",
    previewImage: DEFAULT_IMAGE,
  },
  {
    id: "c3",
    name: "WHITE / LATTE",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velvety steamed dairy or oat milk balance.",
    price: "36K",
    category: "COFFEE",
    previewImage: DEFAULT_IMAGE,
    tag: "DAILY DRIVER"
  },
  {
    id: "c4",
    name: "ESPRESSO TONIC",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Double espresso, premium tonic, dehydrated citrus.",
    price: "42K",
    category: "COFFEE",
    previewImage: DEFAULT_IMAGE,
    tag: "BESTSELLER"
  },
  {
    id: "c5",
    name: "GEISHA POUR-OVER",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Single origin floral notes with bergamot finish.",
    price: "55K",
    category: "COFFEE",
    previewImage: DEFAULT_IMAGE,
    tag: "LIMITED LOT"
  },

  // BOTTLED
  {
    id: "b1",
    name: "NITRO COLD BREW 250ML",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. 24-hour cold immersion infused with nitrogen.",
    price: "38K",
    category: "BOTTLED",
    previewImage: DEFAULT_IMAGE,
    tag: "READY TO DRINK"
  },
  {
    id: "b2",
    name: "OAT MILK LATTE 250ML",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Signature dark roast steeped with Swedish oat base.",
    price: "42K",
    category: "BOTTLED",
    previewImage: DEFAULT_IMAGE,
    tag: "PLANT BASED"
  },
  {
    id: "b3",
    name: "AFTERWORK COLD WHITE 500ML",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Double batch cold white crafted for sharing.",
    price: "75K",
    category: "BOTTLED",
    previewImage: DEFAULT_IMAGE,
    tag: "SHARING BOTTLE"
  },
  {
    id: "b4",
    name: "CASCARA FIZZ 250ML",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sparkling fermented coffee cherry tea tonic.",
    price: "35K",
    category: "BOTTLED",
    previewImage: DEFAULT_IMAGE,
  },

  // FOOD
  {
    id: "f1",
    name: "MIDNIGHT CRUFFIN",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Flaky laminated dough with dark chocolate ganache.",
    price: "38K",
    category: "FOOD",
    previewImage: DEFAULT_IMAGE,
    tag: "FRESH BAKE"
  },
  {
    id: "f2",
    name: "KOUIGN-AMANN",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Caramelized salted butter layered pastry.",
    price: "35K",
    category: "FOOD",
    previewImage: DEFAULT_IMAGE,
  },
  {
    id: "f3",
    name: "AFTERWORK PASTRAMI MELT",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. House cured brisket, gruyère, dijon, sourdough toast.",
    price: "65K",
    category: "FOOD",
    previewImage: DEFAULT_IMAGE,
    tag: "COMFORT FOOD"
  },
  {
    id: "f4",
    name: "TRUFFLE PARMESAN TOAST",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Shaved aged parmigiano, truffle glaze, crusty pain de campagne.",
    price: "52K",
    category: "FOOD",
    previewImage: DEFAULT_IMAGE,
  },

  // NON COFFEE
  {
    id: "nc1",
    name: "CEREMONIAL UJI MATCHA",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Hand-whisked Kyoto single-estate stone ground matcha.",
    price: "42K",
    category: "NON COFFEE",
    previewImage: DEFAULT_IMAGE,
    tag: "CEREMONIAL"
  },
  {
    id: "nc2",
    name: "VALRHONA 70% CHOCOLATE",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rich single origin dark cacao with smoked sea salt.",
    price: "40K",
    category: "NON COFFEE",
    previewImage: DEFAULT_IMAGE,
  },
  {
    id: "nc3",
    name: "BOTANICAL WHITE TEA",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Wild silver needle, dried pear, and elderflower infusion.",
    price: "35K",
    category: "NON COFFEE",
    previewImage: DEFAULT_IMAGE,
  }
];
