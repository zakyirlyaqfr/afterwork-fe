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
    origin?: string;
    ratio?: string;
    pairing?: string;
  };
}

export const menuCategories = ["COFFEE", "FOOD", "NON COFFEE"] as const;

export const menuItems: MenuItem[] = [
  // COFFEE (7 items — odd, 7th item will be centered at the bottom)
  {
    id: "c1",
    name: "LOREM IPSUM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    price: "28K",
    category: "COFFEE",
    previewImage: "/images-original/menu/menu-coffee.jpg",
    tag: "LOREM BLEND",
    details: {
      notes: "Lorem, Ipsum, Dolor, Sit Amet",
      temperature: "Hot / Iced",
      craft: "Lorem Ipsum / Dolor Sit Amet",
      servingTime: "Available 09:00 — 02:00",
      origin: "Lorem Ipsum Terroir",
      ratio: "1:2.1 Extraction Yield",
      pairing: "Pairs with Commodo Consequat",
    }
  },
  {
    id: "c2",
    name: "DOLOR SIT AMET",
    description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.\n\nNeque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
    price: "32K",
    category: "COFFEE",
    previewImage: "/images-original/product-geisha-pourover.jpg",
    tag: "DOLOR SELECT",
    details: {
      notes: "Consectetur, Adipiscing, Elit, Sed Do",
      temperature: "Hot / Iced",
      craft: "Eiusmod Tempor / Incididunt",
      servingTime: "Available 09:00 — 02:00",
      origin: "Adipiscing Elit Micro-Lot",
      ratio: "1:16.2 Dolor Ratio",
      pairing: "Lorem ipsum dolor sit amet",
    }
  },
  {
    id: "c3",
    name: "CONSECTETUR ADIPIS",
    description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.\n\nEt harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.",
    price: "36K",
    category: "COFFEE",
    previewImage: "/images-original/menu/menu-bottle.jpg",
    tag: "CONSECTETUR DRIP",
    details: {
      notes: "Labore, Dolore, Magna, Aliqua",
      temperature: "Iced Only",
      craft: "18-Hour Slow Kyoto Drip / Lorem Sphere",
      servingTime: "Limited Batches Daily",
      origin: "Consectetur Micro-Lot",
      ratio: "1:8 Concentrated Drip",
      pairing: "Lorem ipsum dolor sit amet",
    }
  },
  {
    id: "c4",
    name: "TEMPOR INCIDIDUNT",
    description: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
    price: "42K",
    category: "COFFEE",
    previewImage: "/images-original/product-espresso-tonic.jpg",
    tag: "TEMPOR SPECIAL",
    details: {
      notes: "Enim, Minim, Veniam, Quis Nostrud",
      temperature: "Iced Only",
      craft: "Aerated Shake / Tempor Crema",
      servingTime: "Available 09:00 — 02:00",
      origin: "Afterwork House Blend",
      ratio: "Double Ristretto Extract",
      pairing: "Pairs with Fugiat Pariatur",
    }
  },
  {
    id: "c5",
    name: "MAGNA ALIQUA",
    description: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    price: "55K",
    category: "COFFEE",
    previewImage: "/images-original/home/home-craft-01.jpg",
    tag: "MAGNA LOT",
    details: {
      notes: "Ullamco, Laboris, Nisi, Aliquip",
      temperature: "Hot Only",
      craft: "Dynamic Temperature Brew / 155 Dripper",
      servingTime: "Reserve Batch Only",
      origin: "Magna Aliqua Reserve",
      ratio: "1:15.5 Micro-Drip",
      pairing: "Lorem ipsum dolor sit amet",
    }
  },
  {
    id: "c6",
    name: "ENIM AD MINIM",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
    price: "38K",
    category: "COFFEE",
    previewImage: "/images-original/home/home-craft-02.jpg",
    tag: "ENIM CRAFT",
    details: {
      notes: "Commodo, Consequat, Duis, Aute",
      temperature: "Hot / Iced",
      craft: "Hand-crafted Ganache & Double Shot",
      servingTime: "Available 09:00 — 02:00",
      origin: "Enim Origin Blend",
      ratio: "Velvety Dual Texture",
      pairing: "Pairs with Voluptate Velit",
    }
  },
  {
    id: "c7",
    name: "QUIS NOSTRUD",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nAt vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
    price: "45K",
    category: "COFFEE",
    previewImage: "/images-original/product-nitro-coldbrew.jpg",
    tag: "QUIS RESERVE",
    details: {
      notes: "Irure, Dolor, Reprehenderit, Voluptate",
      temperature: "Iced Only",
      craft: "Nitrogenated Tap Draft / 45 PSI Cold Line",
      servingTime: "Draft Tap Daily",
      origin: "Quis Nostrud Single Origin",
      ratio: "Pure Nitrogen Draft Keg",
      pairing: "Lorem ipsum dolor sit amet",
    }
  },

  // FOOD (6 items — even, 2 columns)
  {
    id: "f1",
    name: "COMMODO CONSEQUAT",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    price: "38K",
    category: "FOOD",
    previewImage: "/images-original/product-kouign-amann.jpg",
    tag: "LOREM BAKE",
    details: {
      notes: "Velit, Esse, Cillum, Dolore",
      temperature: "Hot Only",
      craft: "48-Hour Cold Fermentation / 24-Layer",
      servingTime: "Baked Fresh Twice Daily",
      origin: "Artisan Butter & Wild Honey",
      ratio: "24-Fold Honeycomb",
      pairing: "Sublime companion to pour-overs",
    }
  },
  {
    id: "f2",
    name: "DUIS AUTE IRURE",
    description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.\n\nNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum.",
    price: "35K",
    category: "FOOD",
    previewImage: "/images-original/menu/menu-food.jpg",
    tag: "SAVORY CRAFT",
    details: {
      notes: "Eu, Fugiat, Nulla, Pariatur",
      temperature: "Hot Only",
      craft: "Cast Iron Pressed on Wild Sourdough",
      servingTime: "Available 09:00 — 02:00",
      origin: "Smoked Prime Brisket",
      ratio: "Double Cast Iron Sear",
      pairing: "Best paired with Cold Drip",
    }
  },
  {
    id: "f3",
    name: "DOLOR REPREHEND",
    description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi.\n\nEt harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.",
    price: "65K",
    category: "FOOD",
    previewImage: "/images/afterwork-truffle-fries.jpg",
    tag: "SIGNATURE SHARE",
    details: {
      notes: "Excepteur, Sint, Occaecat, Cupidatat",
      temperature: "Hot Only",
      craft: "Double-Fried / House Truffle Dip",
      servingTime: "Late Night Favorite",
      origin: "24-Month Aged Parmigiano",
      ratio: "Small Batch Flash Fry",
      pairing: "Designed for table sharing",
    }
  },
  {
    id: "f4",
    name: "VOLUPTATE VELIT",
    description: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus.\n\nUt aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
    price: "52K",
    category: "FOOD",
    previewImage: "/images/afterwork-molten-skillet.jpg",
    tag: "DESSERT COMFORT",
    details: {
      notes: "Non, Proident, Sunt, In Culpa",
      temperature: "Hot / Iced",
      craft: "Baked to Order in Cast Iron Skillet",
      servingTime: "Available 09:00 — 02:00",
      origin: "Single-Origin Dark Cacao",
      ratio: "Molten Center Skillet",
      pairing: "Pairs with Cortado or Espresso",
    }
  },
  {
    id: "f5",
    name: "CILUM DOLORE",
    description: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.\n\nNisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas.",
    price: "48K",
    category: "FOOD",
    previewImage: "/images/afterwork-savory-scramble.jpg",
    tag: "SAVORY MELT",
    details: {
      notes: "Qui, Officia, Deserunt, Mollit",
      temperature: "Hot Only",
      craft: "Soft Scramble & Torch Finish",
      servingTime: "Available 09:00 — 02:00",
      origin: "Free-Range Pastured Eggs",
      ratio: "Slow Velvet Fold",
      pairing: "Pairs with Pour-over V60",
    }
  },
  {
    id: "f6",
    name: "FUGIAT PARIATUR",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    price: "40K",
    category: "FOOD",
    previewImage: "/images-original/product-midnight-cruffin.jpg",
    tag: "SWEET BITE",
    details: {
      notes: "Anim, Id Est, Laborum, Sed Ut",
      temperature: "Hot Only",
      craft: "Custard Soaked & Pan Seared",
      servingTime: "Available 09:00 — 02:00",
      origin: "Enriched French Brioche",
      ratio: "Custard-to-Crust Balance",
      pairing: "Magnificent with Cold Drip",
    }
  },

  // NON COFFEE (7 items — odd, 7th item will be centered at the bottom)
  {
    id: "nc1",
    name: "ESSE CILLUM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    price: "42K",
    category: "NON COFFEE",
    previewImage: "/images-original/menu/menu-noncoffee.jpg",
    tag: "CEREMONIAL MATCHA",
    details: {
      notes: "Perspiciatis, Unde, Omnis, Iste",
      temperature: "Hot / Iced",
      craft: "Bamboo Chasen Whisk Ritual",
      servingTime: "Available 09:00 — 02:00",
      origin: "Single-Estate Uji Ceremonial",
      ratio: "Traditional Micro-Whisk",
      pairing: "Wonderful with Kouign-Amann",
    }
  },
  {
    id: "nc2",
    name: "FUGIAT NULLA",
    description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.\n\nNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum.",
    price: "40K",
    category: "NON COFFEE",
    previewImage: "/images-original/gallery/gallery-01.jpg",
    tag: "BOTANICAL INFUSION",
    details: {
      notes: "Natus, Error, Voluptatem, Doloremque",
      temperature: "Iced Only",
      craft: "24-Hour Carbonated Extraction",
      servingTime: "Available 09:00 — 02:00",
      origin: "Organic Botanical Extract",
      ratio: "1:10 Cold Extraction",
      pairing: "Refined palate cleanser",
    }
  },
  {
    id: "nc3",
    name: "EXCEPTEUR SINT",
    description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.\n\nSimilique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio.",
    price: "35K",
    category: "NON COFFEE",
    previewImage: "/images-original/gallery/gallery-02.jpg",
    tag: "ARTISAN CHOCOLATE",
    details: {
      notes: "Laudantium, Totam, Rem, Aperiam",
      temperature: "Hot / Iced",
      craft: "Steamed Microfoam & Torch Confection",
      servingTime: "Available 09:00 — 02:00",
      origin: "Single-Origin Criollo Cacao",
      ratio: "Stone-Conched Emulsion",
      pairing: "Best savored warm with marshmallow",
    }
  },
  {
    id: "nc4",
    name: "OCCAECAT CUPIDATAT",
    description: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus.\n\nUt aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    price: "38K",
    category: "NON COFFEE",
    previewImage: "/images-original/gallery/gallery-03.jpg",
    tag: "ROASTED TEA",
    details: {
      notes: "Eaque, Ipsa, Quae, Ab Illo",
      temperature: "Hot / Iced",
      craft: "Steeped & Whipped Microfoam",
      servingTime: "Available 09:00 — 02:00",
      origin: "Shaded Sencha & Roasted Rice",
      ratio: "82°C Precision Infusion",
      pairing: "Pairs with light pastries",
    }
  },
  {
    id: "nc5",
    name: "PROIDENT SUNT",
    description: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.\n\nUt enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae.",
    price: "36K",
    category: "NON COFFEE",
    previewImage: "/images-original/gallery/gallery-04.jpg",
    tag: "SUMMER REFRESH",
    details: {
      notes: "Inventore, Veritatis, Quasi, Architecto",
      temperature: "Iced Only",
      craft: "Flash Shaken over Crystal Ice",
      servingTime: "Available 09:00 — 02:00",
      origin: "Mountain Blossom Infusion",
      ratio: "Flash Chilled Shake",
      pairing: "Delightful evening refresher",
    }
  },
  {
    id: "nc6",
    name: "DESERUNT MOLLIT",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    price: "38K",
    category: "NON COFFEE",
    previewImage: "/images-original/gallery/gallery-05.jpg",
    tag: "WELLNESS ELIXIR",
    details: {
      notes: "Beatae, Vitae, Dicta, Sunt",
      temperature: "Hot Only",
      craft: "Slow Decoction & Almond Milk Infusion",
      servingTime: "Available 09:00 — 02:00",
      origin: "Organic Botanical Rhizomes",
      ratio: "Slow Botanical Decoction",
      pairing: "Gentle nightcap before bed",
    }
  },
  {
    id: "nc7",
    name: "LABORUM SED",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nAt vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
    price: "42K",
    category: "NON COFFEE",
    previewImage: "/images-original/gallery/gallery-06.jpg",
    tag: "CITRUS BLOSSOM",
    details: {
      notes: "Explicabo, Nemo, Enim, Ipsam",
      temperature: "Iced Only",
      craft: "Layered Ombre Pour & Citrus Zest",
      servingTime: "Available 09:00 — 02:00",
      origin: "Botanical Blossom Tea",
      ratio: "Dual Density Gradient Pour",
      pairing: "Stir gently before drinking",
    }
  }
];
