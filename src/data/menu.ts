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
    description: "Signature double-shot espresso extraction over chilled textured milk with subtle notes of roasted hazelnut and dark cacao. Crafted using our in-house roasted blend of Ethiopian and Sumatran beans, pulled at a precise 93°C water temperature to maximize sweetness without astringency. Served chilled over hand-cut artisan ice cubes for an exceptionally smooth, velvety mouthfeel that lingers with a sweet molasses finish.",
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
    description: "Single-origin washed beans pulled with high precision, balancing bright bergamot acidity, delicate jasmine florals, and lingering dried apricot sweetness. Hand-poured using the Japanese V60 dripper with continuous spiral agitation at a 1:16 brew ratio. Each sip reveals nuanced layers of candied citrus and honeyed peach as the cup cools, creating an immaculate and reflective tasting journey.",
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
    description: "Slow cold-drip extraction steeped drop-by-drop over 18 continuous hours using our architectural Kyoto glass towers. Finished with a gentle whisper of hand-expressed local citrus peel to awaken the deep molasses and dark stone-fruit undertones. Poured over crystal-clear artisan cubes, delivering a rich, syrupy body with near-zero bitterness and an enduring dark plum aftertaste.",
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
    description: "Bold double ristretto flash-shaken over hand-carved ice cubes and infused with house-roasted almond reduction and flakes of Balinese sea salt. Aerated vigorously in an ice-cold tin to produce a fine golden crema crown. The result is a harmonious contrast between salted caramel sweetness, toasted nut aromatics, and vibrant espresso bitterness.",
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
    description: "Rare micro-lot natural anaerobic Geisha beans roasted exceptionally light to celebrate sparkling passionfruit, wild field strawberries, and delicate lavender blossoms. Brewed meticulously on a flat-bottom Kalita Wave 155 with zero bypass for maximum clarity and floral preservation. An extraordinary reserve offering reserved for discerning palate explorers.",
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
    description: "Rich dark espresso layered over 70% single-origin Belgian chocolate ganache, infused with Tahitian bourbon vanilla and silky textured whole microfoam. Hand-melted in small batches each morning, the bittersweet cocoa harmonizes seamlessly with the espresso's deep roasted nut profile, creating an indulgent yet refined nightcap experience.",
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
    description: "Aerated nitro-infused cold brew poured under high nitrogen pressure directly from our refrigerated keg draft tap. The cascading micro-bubbles settle into a dense, velvety Guinness-like creamy head. Naturally sweet with pronounced notes of malted chocolate, black tea, and honeycomb, delivering a luxuriously smooth draft coffee without dairy.",
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
    description: "Artisanal French butter pastry laminated with 84% Normandy cultured butter, baked fresh twice daily and glazed with caramelized wild forest honey. The paper-thin golden layers shatter into delicate, buttery flakes with every bite, revealing a tender, honeycomb-structured interior seasoned with fleur de sel. The quintessential pairing for any pour-over or cortado.",
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
    description: "House-baked artisanal wild sourdough toast stacked generously with 14-hour smoked beef brisket, melted mature cheddar, caramelized balsamic onions, and stone-ground Dijon mustard emulsion. Pressed on cast iron until blistered golden and crisp, delivering a smoky, savory, and tangy bite that satisfies late-night cravings.",
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
    description: "Crisp hand-cut Russet potato churros double-fried to golden perfection, lightly dusted with Spanish smoked paprika, grated parmesan, and dried herbs. Accompanied by a house-crafted espresso balsamic reduction dip with black truffle oil that provides an unexpected, addictive balance of savory umami and roasted coffee depth.",
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
    description: "Freshly baked cast iron skillet brownie made from molten 70% Valrhona dark chocolate and browned butter, crowned with Madagascar bourbon vanilla bean gelato and crushed roasted hazelnuts. Served piping hot so the creamy gelato slowly melts into the warm fudgy core, creating a decadent interplay of temperatures and bittersweet cacao textures.",
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
    description: "Thick slices of grilled artisanal sourdough filled with fluffy truffle-scented scrambled eggs, melted Swiss Gruyère, and sweet caramelized shallots. Torch-finished with fresh chives and cracked black peppercorn. A rich, comforting savory melt designed to complement both morning black coffees and evening milk beverages.",
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
    description: "Golden brioche French toast cubes flash-fried and tossed in aromatic Ceylon cinnamon sugar, then drizzled with warm salted butterscotch caramel and espresso mascarpone whip. Crisp on the exterior and custard-soft within, offering a comforting sweet indulgence that pairs divinely with our cold-drip brews.",
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
    description: "Ceremonial grade stone-ground Uji matcha whisked systematically with traditional bamboo chasen, blended with steamed silky oat milk and a drizzle of raw organic wildflower honey. Deep emerald in color with rich vegetal umami and sweet toasted rice notes, rounded out by the natural sweetness of premium barista oat milk without any dairy bitterness.",
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
    description: "Artisanal sparkling botanical infusion crafted from dried organic Sudan hibiscus calyces, crushed Macedonian juniper berries, fresh mint, and whole Ceylon cinnamon quills. Cold-steeped for 24 hours, carbonated under high pressure, and served over crystal ice with an expressed lemon twist for a crimson, tart, and deeply refreshing effervescence.",
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
    description: "Single-origin East Java artisanal dark chocolate melted into warm creamy whole milk, crowned with house-made vanilla bean marshmallow flamed to order with an open torch. The charred caramelized marshmallow lends a campfire smokiness that deepens the velvety chocolate indulgence beneath.",
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
    description: "Slow-brewed loose leaf Kyoto Genmaicha tea blended with roasted brown rice kernels, steamed silky dairy milk, and a touch of raw cane sugar. The fragrant aroma of toasted grains and roasted barley combines effortlessly with delicate green tea notes for a cozy, earthy, and soothing non-caffeinated experience.",
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
    description: "Chilled cold-brewed white peach blossom tea flash-shaken with bruised organic mint leaves, fresh peach puree, and natural sparkling mineral water. Poured over hand-crushed ice for a radiant, fragrant, and thirst-quenching cooler that celebrates summer orchard botanicals.",
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
    description: "Spiced golden milk elixir slowly decocted from fresh organic turmeric root, crushed ginger, green cardamom pods, black peppercorns, and creamy almond milk. Lightly sweetened with wild honey, offering an anti-inflammatory, warming, and comforting tonic with balanced aromatic warmth.",
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
    description: "Cold-pressed Kochi yuzu juice shaken with sparkling tonic water, delicately layered with steeped blue butterfly pea blossom tea to create a mesmerizing two-toned purple sunset gradient. Vibrant citrus brightness meets delicate floral undertones in an invigorating, photogenic mocktail.",
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
