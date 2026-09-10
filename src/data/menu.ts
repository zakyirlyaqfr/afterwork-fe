import { DEFAULT_IMAGE } from '@/data/assets';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: "COFFEE" | "FOOD" | "NON COFFEE";
  previewImage: string;
  tag?: string;
  details?: {
    notes?: string;
    temperature?: "Hot / Iced" | "Iced Only" | "Hot Only";
    craft?: string;
    servingTime?: string;
  };
}

export const menuCategories = ["COFFEE", "FOOD", "NON COFFEE"] as const;

export const menuItems: MenuItem[] = [
  // COFFEE (7 items — odd, 7th item will be centered at the bottom)
  {
    id: "c1",
    name: "LOREM IPSUM",
    description: "Signature double-shot espresso extraction over chilled textured milk with subtle notes of roasted hazelnut and dark cacao.",
    price: "28K",
    category: "COFFEE",
    previewImage: "/images-original/menu/menu-coffee.jpg",
    tag: "SIGNATURE BLEND",
    details: {
      notes: "Dark Cocoa, Toasted Hazelnut, Cane Brown Sugar",
      temperature: "Hot / Iced",
      craft: "Double Ristretto / 93°C Extraction",
      servingTime: "Available 09:00 — 02:00",
    }
  },
  {
    id: "c2",
    name: "DOLOR SIT AMET",
    description: "Single-origin washed beans pulled with high precision, balancing bright citrus acidity and lingering floral sweetness.",
    price: "32K",
    category: "COFFEE",
    previewImage: "/images-original/product-geisha-pourover.jpg",
    tag: "ORIGIN SELECT",
    details: {
      notes: "Bergamot, Jasmine Flower, Dried Apricot",
      temperature: "Hot / Iced",
      craft: "Filter V60 Precision Flow / 1:16 Ratio",
      servingTime: "Available 09:00 — 02:00",
    }
  },
  {
    id: "c3",
    name: "CONSECTETUR ADIPIS",
    description: "Slow cold-drip extraction steeped over 18 hours, finished with a whisper of local citrus essence for a velvet mouthfeel.",
    price: "36K",
    category: "COFFEE",
    previewImage: "/images-original/menu/menu-bottle.jpg",
    tag: "COLD DRIP",
    details: {
      notes: "Dark Plum, Molasses, Tangerine Zest",
      temperature: "Iced Only",
      craft: "18-Hour Slow Kyoto Tower Drip",
      servingTime: "Limited Batches Daily",
    }
  },
  {
    id: "c4",
    name: "TEMPOR INCIDIDUNT",
    description: "Bold espresso shaken over clear artisan ice cubes and infused with roasted almond syrup and sea salt flakes.",
    price: "42K",
    category: "COFFEE",
    previewImage: "/images-original/product-espresso-tonic.jpg",
    tag: "AFTERWORK SPECIAL",
    details: {
      notes: "Salted Caramel, Crushed Almond, Cacao Nibs",
      temperature: "Iced Only",
      craft: "Aerated Shake & Strain / Artisan Crystal Cube",
      servingTime: "Available 09:00 — 02:00",
    }
  },
  {
    id: "c5",
    name: "MAGNA ALIQUA",
    description: "Rare micro-lot natural anaerobic geisha roasted lightly to elevate sparkling passion fruit and wild berry aromatics.",
    price: "55K",
    category: "COFFEE",
    previewImage: "/images-original/home/home-craft-01.jpg",
    tag: "MICRO LOT",
    details: {
      notes: "Wild Strawberry, Passionfruit, Honeycomb",
      temperature: "Hot Only",
      craft: "Kalita Wave 155 / Zero Bypass",
      servingTime: "Reserve Batch Only",
    }
  },
  {
    id: "c6",
    name: "ENIM AD MINIM",
    description: "Rich dark espresso layered over bittersweet house chocolate ganache and velvety microfoam.",
    price: "38K",
    category: "COFFEE",
    previewImage: "/images-original/home/home-craft-02.jpg",
    tag: "MOCHA CRAFT",
    details: {
      notes: "Bittersweet Ganache, Espresso, Bourbon Vanilla",
      temperature: "Hot / Iced",
      craft: "Hand-melted Belgian Cacao & Double Shot",
      servingTime: "Available 09:00 — 02:00",
    }
  },
  {
    id: "c7",
    name: "QUIS NOSTRUD",
    description: "Aerated nitro-infused cold brew poured under high pressure for a cascading Guinness-like creamy head.",
    price: "45K",
    category: "COFFEE",
    previewImage: "/images-original/product-nitro-coldbrew.jpg",
    tag: "NITRO RESERVE",
    details: {
      notes: "Black Tea, Honeycomb, Sweet Cream Finish",
      temperature: "Iced Only",
      craft: "Nitrogenated Tap Draft / Chilled Keg",
      servingTime: "Draft Tap Daily",
    }
  },

  // FOOD (6 items — even, 2 columns)
  {
    id: "f1",
    name: "COMMODO CONSEQUAT",
    description: "Artisanal butter pastry baked freshly each midnight with caramelized honey glaze and flakey golden laminated layers.",
    price: "38K",
    category: "FOOD",
    previewImage: "/images-original/product-kouign-amann.jpg",
    tag: "MIDNIGHT BAKE",
    details: {
      notes: "French Butter 84%, Wild Forest Honey, Sea Salt",
      temperature: "Hot Only",
      craft: "48-Hour Cold Fermentation Pastry",
      servingTime: "Baked Fresh Twice Daily",
    }
  },
  {
    id: "f2",
    name: "DUIS AUTE IRURE",
    description: "Sourdough toast layered with smoked beef, melted sharp cheddar, and house mustard emulsion.",
    price: "35K",
    category: "FOOD",
    previewImage: "/images-original/menu/menu-food.jpg",
    tag: "SAVORY CRAFT",
    details: {
      notes: "Smoked Brisket, Aged Cheddar, Dijon Grain",
      temperature: "Hot Only",
      craft: "Cast Iron Pressed on Wild Sourdough",
      servingTime: "Available 09:00 — 02:00",
    }
  },
  {
    id: "f3",
    name: "DOLOR REPREHEND",
    description: "Crisp golden potato churros dusted with smoked paprika and served alongside dark spicy espresso dipping reduction.",
    price: "65K",
    category: "FOOD",
    previewImage: "/images/afterwork-glutton-2.jpg",
    tag: "SIGNATURE SHARE",
    details: {
      notes: "Smoked Paprika, Espresso Truffle Reduction",
      temperature: "Hot Only",
      craft: "Double-Fried Russet / House Dip",
      servingTime: "Late Night Favorite",
    }
  },
  {
    id: "f4",
    name: "VOLUPTATE VELIT",
    description: "Warm skillet dark chocolate brownie paired with Madagascar vanilla bean gelato and crushed roasted hazelnuts.",
    price: "52K",
    category: "FOOD",
    previewImage: "/images/afterwork-gwalk-dessert.jpg",
    tag: "DESSERT COMFORT",
    details: {
      notes: "70% Valrhona Cacao, Vanilla Bean, Roasted Hazelnut",
      temperature: "Hot / Iced",
      craft: "Freshly Baked Cast Skillet",
      servingTime: "Available 09:00 — 02:00",
    }
  },
  {
    id: "f5",
    name: "CILUM DOLORE",
    description: "Crispy grilled sourdough sandwich packed with truffle scrambled egg, melted gruyere, and caramelized shallots.",
    price: "48K",
    category: "FOOD",
    previewImage: "/images/afterwork-gwalk-temanmakan.jpg",
    tag: "SAVORY MELT",
    details: {
      notes: "White Truffle, Gruyere Cheese, Brioche",
      temperature: "Hot Only",
      craft: "Skillet Toasted & Torch Finished",
      servingTime: "Available 09:00 — 02:00",
    }
  },
  {
    id: "f6",
    name: "FUGIAT PARIATUR",
    description: "Golden fried French toast cubes coated in cinnamon sugar, drizzled with salted caramel and espresso cream.",
    price: "40K",
    category: "FOOD",
    previewImage: "/images-original/product-midnight-cruffin.jpg",
    tag: "SWEET BITE",
    details: {
      notes: "Ceylon Cinnamon, Salted Butterscotch, Mascarpone",
      temperature: "Hot Only",
      craft: "Custard Dipped & Pan Seared",
      servingTime: "Available 09:00 — 02:00",
    }
  },

  // NON COFFEE (7 items — odd, 7th item will be centered at the bottom)
  {
    id: "nc1",
    name: "ESSE CILLUM",
    description: "Ceremonial grade Uji matcha whisked systematically with silky oat milk and raw organic wildflower honey.",
    price: "42K",
    category: "NON COFFEE",
    previewImage: "/images-original/menu/menu-noncoffee.jpg",
    tag: "CEREMONIAL MATCHA",
    details: {
      notes: "Stone Ground Tencha, Roasted Umami, Creamy Oat",
      temperature: "Hot / Iced",
      craft: "Traditional Bamboo Whisk Ritual (Chasen)",
      servingTime: "Available 09:00 — 02:00",
    }
  },
  {
    id: "nc2",
    name: "FUGIAT NULLA",
    description: "Artisanal sparkling botanical infusion of dried hibiscus petals, crushed juniper berries, and fragrant whole cinnamon quill.",
    price: "40K",
    category: "NON COFFEE",
    previewImage: "/images-original/gallery/gallery-01.jpg",
    tag: "BOTANICAL INFUSION",
    details: {
      notes: "Sudan Hibiscus, Pink Juniper, Ceylon Cinnamon",
      temperature: "Iced Only",
      craft: "Carbonated Cold Extraction / Lemon Peel Express",
      servingTime: "Available 09:00 — 02:00",
    }
  },
  {
    id: "nc3",
    name: "EXCEPTEUR SINT",
    description: "Single-origin Java artisanal chocolate melted into creamy dairy, crowned with house-flamed torched marshmallow.",
    price: "35K",
    category: "NON COFFEE",
    previewImage: "/images-original/gallery/gallery-02.jpg",
    tag: "ARTISAN CHOCOLATE",
    details: {
      notes: "Criollo Cacao, Bourbon Vanilla, Torched Marshmallow",
      temperature: "Hot / Iced",
      craft: "Slow-Steamed Microfoam & Hand Torched",
      servingTime: "Available 09:00 — 02:00",
    }
  },
  {
    id: "nc4",
    name: "OCCAECAT CUPIDATAT",
    description: "Slow-brewed loose leaf roasted Genmaicha tea blended with roasted brown rice and whole dairy milk.",
    price: "38K",
    category: "NON COFFEE",
    previewImage: "/images-original/gallery/gallery-03.jpg",
    tag: "ROASTED TEA",
    details: {
      notes: "Roasted Rice, Toasted Barley, Sweet Cream",
      temperature: "Hot / Iced",
      craft: "Steeped & Whipped Microfoam",
      servingTime: "Available 09:00 — 02:00",
    }
  },
  {
    id: "nc5",
    name: "PROIDENT SUNT",
    description: "Refreshing cold brewed white peach tea shaken with fresh mint sprigs and sparkling mineral water.",
    price: "36K",
    category: "NON COFFEE",
    previewImage: "/images-original/gallery/gallery-04.jpg",
    tag: "SUMMER REFRESH",
    details: {
      notes: "White Peach, Crushed Mint, Sparkling Mineral",
      temperature: "Iced Only",
      craft: "Flash Shaken over Crystal Ice",
      servingTime: "Available 09:00 — 02:00",
    }
  },
  {
    id: "nc6",
    name: "DESERUNT MOLLIT",
    description: "Spiced golden milk infusion made with fresh turmeric, ginger root, cardamom pod, black pepper, and almond milk.",
    price: "38K",
    category: "NON COFFEE",
    previewImage: "/images-original/gallery/gallery-05.jpg",
    tag: "WELLNESS ELIXIR",
    details: {
      notes: "Turmeric, Ceylon Cinnamon, Ginger Root",
      temperature: "Hot Only",
      craft: "Slow Decoction Brew",
      servingTime: "Available 09:00 — 02:00",
    }
  },
  {
    id: "nc7",
    name: "LABORUM SED",
    description: "Sparkling cold-pressed yuzu juice infused with organic butterfly pea flower tea for a two-toned sunset gradient.",
    price: "42K",
    category: "NON COFFEE",
    previewImage: "/images-original/gallery/gallery-06.jpg",
    tag: "CITRUS BLOSSOM",
    details: {
      notes: "Kochi Yuzu, Butterfly Pea Blossom, Tonic",
      temperature: "Iced Only",
      craft: "Layered Pour & Citrus Expression",
      servingTime: "Available 09:00 — 02:00",
    }
  }
];
