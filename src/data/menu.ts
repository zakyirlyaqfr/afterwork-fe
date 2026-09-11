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
    description: "Our definitive signature espresso creation, meticulously formulated for nocturnal focus and contemplation. Crafted from a secret split-roast ratio of high-altitude Ethiopian Yirgacheffe and washed North Sumatran heirloom beans, pulled as a tight double ristretto at precisely 93.4°C under 9.2 bars of constant hydraulic pressure. The extraction is immediately cascaded over chilled, micro-filtered whole milk that has been cold-textured to preserve its natural lactose sweetness without excessive aeration.\n\nUpon your first sip, an initial wave of roasted hazelnut, toasted macadamia, and bittersweet 72% dark cacao envelops the palate, seamlessly transitioning into an unexpected undertone of golden cane sugar and ripe stone fruit. Served chilled over hand-cut crystal-clear artisan ice cylinders that melt at one-third the rate of standard ice, ensuring every draw remains concentrated and uncompromised until the final drop. The finish lingers with a velvety molasses resonance that pairs sublimely with our midnight baked pastries.",
    price: "28K",
    category: "COFFEE",
    previewImage: "/images-original/menu/menu-coffee.jpg",
    tag: "SIGNATURE BLEND",
    details: {
      notes: "Dark Cocoa, Toasted Hazelnut, Cane Brown Sugar, Ripe Plum",
      temperature: "Hot / Iced",
      craft: "Double Ristretto / 93.4°C Pressure Profile",
      servingTime: "Available 09:00 — 02:00",
      origin: "Ethiopian Yirgacheffe & North Sumatra Blend",
      ratio: "1:2.1 Extraction Yield",
      pairing: "Pairs with Commodo Consequat (Kouign-Amann)",
    }
  },
  {
    id: "c2",
    name: "DOLOR SIT AMET",
    description: "An extraordinary showcase of single-origin perfection, harvested from volcanic slopes at 1,950 meters above sea level and processed through an extended 48-hour wet fermentation method. Hand-brewed with millimeter precision utilizing the Japanese Hario V60 ceramic dripper paired with tailored zero-bypass Japanese filter paper. Our baristas maintain a calculated 1:16.2 brew ratio, pouring heated mineral water with a continuous spiral agitation at 91°C to coax out volatile floral aromatics while keeping chlorogenic bitterness at zero.\n\nThe cup opens with enchanting jasmine blossom and bergamot floral fragrance, followed by delicate sips of candied lemon zest, sun-dried apricot, and a crisp white tea finish that gently evolves in complexity as the brew naturally cools. Best enjoyed unhurried without milk or sugar, allowing each progressive temperature zone to tell the full story of its micro-climate soil composition.",
    price: "32K",
    category: "COFFEE",
    previewImage: "/images-original/product-geisha-pourover.jpg",
    tag: "ORIGIN SELECT",
    details: {
      notes: "Bergamot, Jasmine Flower, Dried Apricot, Meyer Lemon",
      temperature: "Hot / Iced",
      craft: "Filter V60 Precision Spiral Flow / 1:16.2 Ratio",
      servingTime: "Available 09:00 — 02:00",
      origin: "Guji Highlands, Ethiopia 1,950 MASL",
      ratio: "1:16.2 Precision Pour",
      pairing: "Best enjoyed unhurried without milk or sugar",
    }
  },
  {
    id: "c3",
    name: "CONSECTETUR ADIPIS",
    description: "An architectural testament to patience and gravity, brewed using our custom-built 1.8-meter Japanese Kyoto glass cold drip towers. Single-origin Arabica coarse grinds are systematically steeped drop-by-drop over 18 continuous hours in a temperature-stabilized refrigerated environment, dripping at a strict pace of exactly one droplet every four seconds. This prolonged cold hydraulic contact eliminates 70% of undesirable coffee oils and tannins while concentrating natural lipids and sweet esters.\n\nFinished with an essential twist of hand-expressed organic local tangerine peel just before serving to arouse deep molasses, dark plum, and tobacco leaf undertones. Poured directly over a hand-carved monolithic artisan ice sphere, delivering a silky liqueur-like body with near-zero astringency and an enduring dried black cherry aftertaste that stands as our most reflective nightcap.",
    price: "36K",
    category: "COFFEE",
    previewImage: "/images-original/menu/menu-bottle.jpg",
    tag: "COLD DRIP",
    details: {
      notes: "Dark Plum, Kyoto Molasses, Tangerine Zest, Cured Tobacco",
      temperature: "Iced Only",
      craft: "18-Hour Slow Kyoto Tower Drip / Hand-Carved Sphere",
      servingTime: "Limited Batches Daily",
      origin: "Aceh Gayo Organic Micro-Lot",
      ratio: "1:8 Concentrated Cold Drip",
      pairing: "Ideal as a slow evening contemplation drink",
    }
  },
  {
    id: "c4",
    name: "TEMPOR INCIDIDUNT",
    description: "An unapologetically bold signature concoction forged for late-night recharge sessions. We begin by pulling a super-concentrated double ristretto directly over hand-carved ice cubes, immediately flash-shaking it with our in-house roasted almond reduction, dark muscovado syrup, and coarse flakes of hand-harvested Balinese sea salt in an ice-cold Boston shaker.\n\nThe vigorous aeration produces a dense, golden micro-crema crown that sits like whipped velvet atop the beverage. When sipped through the cold crema, the warm salted caramel sweetness strikes the palate first, quickly followed by the assertive, nutty bitterness of fresh espresso and crunch of toasted almond nibs. An exhilarating balance of sweet, savory, and bitter notes engineered to keep creative energy flowing long after standard café hours.",
    price: "42K",
    category: "COFFEE",
    previewImage: "/images-original/product-espresso-tonic.jpg",
    tag: "AFTERWORK SPECIAL",
    details: {
      notes: "Salted Caramel, Crushed Almond, Cacao Nibs, Sea Salt",
      temperature: "Iced Only",
      craft: "Aerated Shake & Double Strain / Salted Crema Crown",
      servingTime: "Available 09:00 — 02:00",
      origin: "Afterwork Dark Roast House Blend",
      ratio: "Flash Aerated Double Ristretto",
      pairing: "Pairs with Fugiat Pariatur (Brioche French Toast)",
    }
  },
  {
    id: "c5",
    name: "MAGNA ALIQUA",
    description: "Our most coveted reserve offering, sourced exclusively from a micro-lot Panama Geisha lot that underwent 96 hours of controlled anaerobic maceration before being dried on raised African beds under shaded canopy. Roasted exceptionally light in our 2.5kg test roaster to preserve every delicate terpene and organic acid without a trace of roaster bake.\n\nMeticulously extracted using a flat-bottom Kalita Wave 155 dripper with tailored temperature profiling starting at 94°C and tapering down to 88°C. The cup unleashes an effervescent explosion of wild field strawberries, tropical passionfruit, honeycomb, and lilac florals. An ethereal, tea-like mouthfeel with vibrant malic brightness that rewards patient, mindful sips as the cup slowly breathes.",
    price: "55K",
    category: "COFFEE",
    previewImage: "/images-original/home/home-craft-01.jpg",
    tag: "MICRO LOT",
    details: {
      notes: "Wild Strawberry, Passionfruit, Honeycomb, Lilac Floral",
      temperature: "Hot Only",
      craft: "Kalita Wave 155 / Dynamic Temperature Brew",
      servingTime: "Reserve Batch Only",
      origin: "Boquete Panama Anaerobic Geisha",
      ratio: "1:15.5 Micro-Drip Flat Bottom",
      pairing: "Sip slowly and allow the cup to cool through three temperature stages",
    }
  },
  {
    id: "c6",
    name: "ENIM AD MINIM",
    description: "A decadent collaboration between artisan specialty coffee and bean-to-bar confectionery craftsmanship. Double shots of rich, chocolatey espresso are layered over melted 70% single-origin Belgian chocolate ganache infused with Tahitian bourbon vanilla pods and a whisper of smoked sea salt, then blended with silky textured whole microfoam.\n\nHand-melted in microscopic batches every single morning to prevent crystal separation, the velvety bittersweet cocoa melds seamlessly with the dark roasted hazelnut core of the espresso. Finished with hand-shaved bitter chocolate curls and dusting of raw Dutch cacao, yielding a rich, comforting dessert-in-a-cup that transforms any evening work block into pure luxury.",
    price: "38K",
    category: "COFFEE",
    previewImage: "/images-original/home/home-craft-02.jpg",
    tag: "MOCHA CRAFT",
    details: {
      notes: "Bittersweet Ganache, Espresso, Bourbon Vanilla, Sea Salt",
      temperature: "Hot / Iced",
      craft: "Hand-melted Belgian Cacao & Double Shot Ganache",
      servingTime: "Available 09:00 — 02:00",
      origin: "70% Single Origin Belgian Cacao & Java Arabica",
      ratio: "Velvety Dual Texture Blend",
      pairing: "Pairs with Voluptate Velit (Dark Chocolate Skillet)",
    }
  },
  {
    id: "c7",
    name: "QUIS NOSTRUD",
    description: "Single-origin cold brew charged under 45 PSI of pure nitrogen gas inside our refrigerated stainless keg lines and poured live from an authentic stainless draft stout faucet. The cascading liquid nitrogen micro-bubbles tumble gracefully in the glass, settling within two minutes into a dense, creamy, head resembling an Irish draught stout.\n\nNaturally sweet with pronounced notes of malted chocolate, toasted malt, black tea, and honeycomb. Despite containing zero dairy or added sugars, the nitrogen infusion creates a sensationally thick, silky, velvety mouthfeel that coats the tongue. Served ice-cold straight from the tap with zero ice to keep the nitrogen emulsion undisturbed.",
    price: "45K",
    category: "COFFEE",
    previewImage: "/images-original/product-nitro-coldbrew.jpg",
    tag: "NITRO RESERVE",
    details: {
      notes: "Black Tea, Malted Chocolate, Honeycomb, Sweet Velvet",
      temperature: "Iced Only",
      craft: "Nitrogenated Tap Draft / 45 PSI Cold Line / No Ice",
      servingTime: "Draft Tap Daily",
      origin: "Washed Flores Bajawa Single Origin",
      ratio: "Pure Nitrogen Draft Keg / Zero Ice",
      pairing: "Do not use a straw; drink directly from the glass rim",
    }
  },

  // FOOD (6 items — even, 2 columns)
  {
    id: "f1",
    name: "COMMODO CONSEQUAT",
    description: "A triumph of classical French laminated pastry craft, requiring a painstaking 48-hour cold fermentation and laminating process using 84% butterfat Normandy cultured butter. Each pastry undergoes twenty-four systematic folds to create hundreds of whisper-thin pastry leaves that trap steam during baking, expanding into an airy, translucent honeycomb crumb.\n\nBaked fresh twice daily at 09:00 and 19:00, then brushed with a warm caramelized reduction of organic wild forest honey and sprinkled with crunchy flakes of French fleur de sel. The exterior shatters with a satisfying crunch upon first bite, giving way to an intoxicatingly rich, buttery, tender interior. The undisputed companion to our pour-overs and hot flat whites.",
    price: "38K",
    category: "FOOD",
    previewImage: "/images-original/product-kouign-amann.jpg",
    tag: "MIDNIGHT BAKE",
    details: {
      notes: "French Butter 84%, Wild Forest Honey, Fleur de Sel",
      temperature: "Hot Only",
      craft: "48-Hour Cold Fermentation / 24-Layer Lamination",
      servingTime: "Baked Fresh Twice Daily",
      origin: "Normandy AOP Butter & Organic Wild Honey",
      ratio: "24-Fold Honeycomb Lamination",
      pairing: "Sublime companion to our pour-overs and hot flat whites",
    }
  },
  {
    id: "f2",
    name: "DUIS AUTE IRURE",
    description: "Our signature late-night savory centerpiece. Thick slices of house-baked artisanal wild sourdough bread, naturally fermented over 36 hours for a tangy, blistered crust, stacked generously with prime beef brisket that has been hickory-smoked low and slow for 14 uninterrupted hours. Layered with aged sharp English cheddar, caramelized balsamic yellow onions, and our signature stone-ground grain mustard emulsion.\n\nPressed firmly onto screaming hot cast iron with cultured herb butter until the bread attains a deep bronze shatter and the cheddar oozes luxuriously from every edge. Every mouthful balances smokiness, savory richness, and bright vinegar tang, perfectly complementing our bold black coffees and botanical cold drinks.",
    price: "35K",
    category: "FOOD",
    previewImage: "/images-original/menu/menu-food.jpg",
    tag: "SAVORY CRAFT",
    details: {
      notes: "Smoked Brisket, Aged Cheddar, Balsamic Onions, Dijon Grain",
      temperature: "Hot Only",
      craft: "Cast Iron Pressed on 36-Hour Wild Sourdough",
      servingTime: "Available 09:00 — 02:00",
      origin: "14-Hour Hickory Smoked Prime Brisket",
      ratio: "Double Cast Iron Sear",
      pairing: "Best paired with Cold Drip or Espresso Tonic",
    }
  },
  {
    id: "f3",
    name: "DOLOR REPREHEND",
    description: "Hand-cut Idaho Russet potato strips, blanched in herb-infused brine and double-fried in small batches to achieve an impossibly shatter-crisp golden shell housing a light, fluffy potato core. Lightly tossed while piping hot in Spanish smoked sweet paprika, freshly grated aged Parmigiano-Reggiano, and hand-rubbed rosemary needles.\n\nAccompanied by a house-crafted espresso balsamic reduction aioli drizzled with cold-pressed black truffle oil, creating an addictive interplay between savory earthy umami, subtle garlic warmth, and roasted coffee depth. Sized generously for communal table sharing during long collaborative sessions.",
    price: "65K",
    category: "FOOD",
    previewImage: "/images/afterwork-glutton-2.jpg",
    tag: "SIGNATURE SHARE",
    details: {
      notes: "Smoked Paprika, Espresso Truffle Reduction, Parmigiano",
      temperature: "Hot Only",
      craft: "Herb-Blanched & Double-Fried / House Truffle Dip",
      servingTime: "Late Night Favorite",
      origin: "Idaho Russets & 24-Month Parmigiano-Reggiano",
      ratio: "Small Batch Double Flash Fry",
      pairing: "Designed for table sharing with friends during late brainstorms",
    }
  },
  {
    id: "f4",
    name: "VOLUPTATE VELIT",
    description: "An indulgent warm-and-cold skillet experience crafted from 70% Valrhona dark chocolate callets, browned Normandy butter, and organic raw cane sugar, folded by hand into a dense, fudgy batter and baked to order in miniature cast iron skillets so the center stays seductively molten.\n\nServed sizzling hot right from the oven, crowned with a generous scoop of artisanal Madagascar bourbon vanilla bean gelato and a scattering of crushed roasted Piemonte hazelnuts. As the frozen cream gently collapses into the molten chocolate abyss, the contrasting temperatures create a bittersweet symphony that comforts the weary soul.",
    price: "52K",
    category: "FOOD",
    previewImage: "/images/afterwork-gwalk-dessert.jpg",
    tag: "DESSERT COMFORT",
    details: {
      notes: "70% Valrhona Cacao, Bourbon Vanilla Gelato, Roasted Hazelnut",
      temperature: "Hot / Iced",
      craft: "Baked to Order in Cast Iron Skillet / Molten Core",
      servingTime: "Available 09:00 — 02:00",
      origin: "70% Valrhona Guanaja & Madagascar Vanilla",
      ratio: "Baked-to-Order Molten Center",
      pairing: "Pairs with Cortado or Single Origin Espresso",
    }
  },
  {
    id: "f5",
    name: "CILUM DOLORE",
    description: "Slices of grilled artisanal sourdough bread enveloping a generous mound of soft, creamy scrambled eggs gently folded with white truffle oil and melted cave-aged Swiss Gruyère cheese. Finished with sweet caramelized shallots, freshly chopped chives, and coarse cracked black Tellicherry peppercorn.\n\nTorch-finished on the top crust to caramelize the cheese edges into a fragrant nutty lace. Exceptionally comforting, rich, and grounding, crafted specifically to accompany morning cortados as well as evening comfort sips.",
    price: "48K",
    category: "FOOD",
    previewImage: "/images/afterwork-gwalk-temanmakan.jpg",
    tag: "SAVORY MELT",
    details: {
      notes: "White Truffle, Cave Gruyere, Scrambled Curds, Chives",
      temperature: "Hot Only",
      craft: "Soft Scramble Skillet & Open Flame Torch Finish",
      servingTime: "Available 09:00 — 02:00",
      origin: "Free-Range Pastured Eggs & Swiss Gruyère",
      ratio: "Slow Velvet Curd Fold",
      pairing: "Pairs naturally with Pour-over V60 or Flat White",
    }
  },
  {
    id: "f6",
    name: "FUGIAT PARIATUR",
    description: "Thick cubes of golden French brioche soaked in a rich vanilla and nutmeg custard bath, flash-fried in clarified butter until crisp on the periphery while retaining a custardy, souffle-like center. Immediately tossed in aromatic Ceylon cinnamon sugar and finished with warm house-cooked salted butterscotch caramel and a dollop of whipped espresso mascarpone.\n\nCrisp, warm, and deeply comforting, this sweet bite provides an exquisite counterpoint to our dry filter brews and intense cold-drip coffees.",
    price: "40K",
    category: "FOOD",
    previewImage: "/images-original/product-midnight-cruffin.jpg",
    tag: "SWEET BITE",
    details: {
      notes: "Ceylon Cinnamon, Salted Butterscotch, Espresso Mascarpone",
      temperature: "Hot Only",
      craft: "Custard Soaked & Pan Seared in Clarified Butter",
      servingTime: "Available 09:00 — 02:00",
      origin: "Rich Enriched French Brioche & Ceylon Spices",
      ratio: "Custard-to-Crust Balance",
      pairing: "Magnificent with Cold Drip or Americano",
    }
  },

  // NON COFFEE (7 items — odd, 7th item will be centered at the bottom)
  {
    id: "nc1",
    name: "ESSE CILLUM",
    description: "First-harvest ceremonial grade tencha leaves, sourced directly from single-estate tea gardens in Uji, Kyoto. Stone-ground on traditional granite wheels at a rate of just 40 grams per hour to avoid heat degradation, preserving vivid chlorophyll emerald pigmentation and complex amino acid sweetness.\n\nWhisked to a luscious micro-froth using a 100-prong artisan bamboo chasen, then poured over chilled barista-grade oat milk and kissed with a drop of raw unpasteurized wildflower honey. Delivers rich vegetal umami, toasted walnut undertones, and a round, creamy texture with absolutely zero bitterness.",
    price: "42K",
    category: "NON COFFEE",
    previewImage: "/images-original/menu/menu-noncoffee.jpg",
    tag: "CEREMONIAL MATCHA",
    details: {
      notes: "Stone Ground Tencha, Roasted Umami, Creamy Oat, Honey",
      temperature: "Hot / Iced",
      craft: "100-Prong Bamboo Chasen Whisk Ritual",
      servingTime: "Available 09:00 — 02:00",
      origin: "Single-Estate Uji, Kyoto Ceremonial Harvest",
      ratio: "Traditional 4g Micro-Whisk to 180ml Oat",
      pairing: "Wonderful with Kouign-Amann or Chocolate Skillet",
    }
  },
  {
    id: "nc2",
    name: "FUGIAT NULLA",
    description: "A sparkling botanical tonic slow-crafted from dried organic Sudan hibiscus calyces, crushed Macedonian juniper berries, fresh spearmint leaves, and whole Ceylon cinnamon quills. Cold-steeped in mineral water for 24 hours to extract vivid crimson anthocyanins without extracting astringent tannins.\n\nCarbonated under high pressure and served over crystal-clear artisan ice with an expressed lemon peel twist. Tart, effervescent, and deeply invigorating, offering a sophisticated non-alcoholic palate cleanser that revives the senses.",
    price: "40K",
    category: "NON COFFEE",
    previewImage: "/images-original/gallery/gallery-01.jpg",
    tag: "BOTANICAL INFUSION",
    details: {
      notes: "Sudan Hibiscus, Macedonian Juniper, Fresh Mint, Cinnamon",
      temperature: "Iced Only",
      craft: "24-Hour Carbonated Cold Extraction / Lemon Express",
      servingTime: "Available 09:00 — 02:00",
      origin: "Organic Sudan Hibiscus & Macedonian Juniper",
      ratio: "1:10 Cold Botanical Extraction",
      pairing: "Refined palate cleanser alongside savory burgers or fries",
    }
  },
  {
    id: "nc3",
    name: "EXCEPTEUR SINT",
    description: "Single-origin 72% Criollo dark chocolate harvested in East Java, stone-conched with unrefined palm nectar and melted gently into warm whole milk with Tahitian bourbon vanilla pods. Topped with our house-crafted square vanilla marshmallow, charred to golden bronze order with a handheld open torch.\n\nThe smokiness of the caramelized marshmallow lid gives way to a dense, velvety molten chocolate body with deep roasted cherry and wood notes. An evocative, warming nightcap for cool evenings.",
    price: "35K",
    category: "NON COFFEE",
    previewImage: "/images-original/gallery/gallery-02.jpg",
    tag: "ARTISAN CHOCOLATE",
    details: {
      notes: "Criollo Cacao, Bourbon Vanilla, Charred Marshmallow",
      temperature: "Hot / Iced",
      craft: "Slow-Steamed Microfoam & Hand-Torched Confection",
      servingTime: "Available 09:00 — 02:00",
      origin: "East Java 72% Single-Origin Criollo",
      ratio: "Stone-Conched Velvet Emulsion",
      pairing: "Best savored warm with marshmallow torched to bronze",
    }
  },
  {
    id: "nc4",
    name: "OCCAECAT CUPIDATAT",
    description: "Traditional Japanese Genmaicha tea composed of shaded sencha green tea leaves blended with roasted mochi rice kernels and popped brown rice grains. Brewed gently at 82°C, whipped with silky microfoam milk and a touch of raw organic cane sugar.\n\nThe nutty, comforting aroma of toasted rice and popcorn balances delightfully with grassy green tea notes, creating a cozy, grounding beverage with very low caffeine suitable for late evening relaxation.",
    price: "38K",
    category: "NON COFFEE",
    previewImage: "/images-original/gallery/gallery-03.jpg",
    tag: "ROASTED TEA",
    details: {
      notes: "Roasted Mochi Rice, Toasted Barley, Sweet Cream",
      temperature: "Hot / Iced",
      craft: "Steeped & Whipped Microfoam",
      servingTime: "Available 09:00 — 02:00",
      origin: "Shizuoka Shaded Sencha & Roasted Mochi Rice",
      ratio: "82°C Precision Infusion / Microfoam Finish",
      pairing: "Pairs seamlessly with light pastries and late-night calm",
    }
  },
  {
    id: "nc5",
    name: "PROIDENT SUNT",
    description: "Chilled cold-brewed white peach blossom tea flash-shaken with bruised organic spearmint leaves, pure white peach puree, and natural sparkling mineral water. Poured over hand-crushed crystal ice for a radiant, fragrant, and thirst-quenching cooler.\n\nEvery sip bursts with delicate orchard fruit aromatics, gentle carbonation, and a clean, refreshing herbal finish that revitalizes on warm nights.",
    price: "36K",
    category: "NON COFFEE",
    previewImage: "/images-original/gallery/gallery-04.jpg",
    tag: "SUMMER REFRESH",
    details: {
      notes: "White Peach Blossom, Bruised Mint, Sparkling Mineral",
      temperature: "Iced Only",
      craft: "Flash Shaken over Crystal Crushed Ice",
      servingTime: "Available 09:00 — 02:00",
      origin: "Yamanashi White Peach & Mountain Blossom Tea",
      ratio: "Flash Chilled Shake & Double Strain",
      pairing: "Delightful refresher on warm tropical evenings",
    }
  },
  {
    id: "nc6",
    name: "DESERUNT MOLLIT",
    description: "An Ayurvedic golden elixir decocted from raw organic turmeric root, crushed ginger rhizomes, cracked black peppercorn, and green cardamom pods, simmered gently in creamy unsweetened almond milk. Sweetened subtly with forest honey.\n\nWarming, anti-inflammatory, and comforting, this spiced tonic wraps the palate in deep earthy aromatics and balanced soothing warmth.",
    price: "38K",
    category: "NON COFFEE",
    previewImage: "/images-original/gallery/gallery-05.jpg",
    tag: "WELLNESS ELIXIR",
    details: {
      notes: "Turmeric Rhizome, Crushed Ginger, Cardamom, Raw Honey",
      temperature: "Hot Only",
      craft: "Slow Decoction Simmer / Almond Milk Infusion",
      servingTime: "Available 09:00 — 02:00",
      origin: "Organic Central Java Turmeric & Ginger Roots",
      ratio: "Slow Botanical Decoction",
      pairing: "Gentle caffeine-free nightcap before bed",
    }
  },
  {
    id: "nc7",
    name: "LABORUM SED",
    description: "Cold-pressed Kochi yuzu juice shaken with artisan botanical tonic water and layered over steeped blue butterfly pea blossom tea to craft an ethereal natural violet-blue ombre gradient.\n\nCitrus acidity awakens the senses, beautifully paired with floral tea aromatics in an invigorating, photogenic mocktail.",
    price: "42K",
    category: "NON COFFEE",
    previewImage: "/images-original/gallery/gallery-06.jpg",
    tag: "CITRUS BLOSSOM",
    details: {
      notes: "Kochi Yuzu, Butterfly Pea Flower, Sparkling Tonic",
      temperature: "Iced Only",
      craft: "Layered Ombre Pour & Citrus Zest Infusion",
      servingTime: "Available 09:00 — 02:00",
      origin: "Kochi Prefecture Yuzu & Clitoria Ternatea Tea",
      ratio: "Dual Density Gradient Pour",
      pairing: "Stir gently before drinking to watch the ombre transform",
    }
  }
];
