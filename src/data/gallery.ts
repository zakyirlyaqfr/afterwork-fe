export interface GalleryImage {
  id: string;
  index: string;
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  category: "All" | "Coffee" | "Bottles" | "Food" | "Interior" | "Night" | "People" | "Exterior" | "Details";
  aspectRatio: string;
  gridSpan: string; // Tailwind grid layout hint
}

export const galleryCategories = [
  "All",
  "Coffee",
  "Bottles",
  "Food",
  "Interior",
  "Night",
  "People",
  "Exterior",
  "Details"
] as const;

export const galleryItems: GalleryImage[] = [
  {
    id: "g-01",
    index: "01",
    src: "/images/gallery/gallery-01.jpg",
    alt: "Barista in flow pulling espresso at Afterwork Caffeine",
    title: "EXTRACTION DISCIPLINE",
    subtitle: "SURABAYA / 22:15",
    category: "People",
    aspectRatio: "3/4",
    gridSpan: "col-span-1 md:col-span-6 lg:col-span-4"
  },
  {
    id: "g-02",
    index: "02",
    src: "/images/gallery/gallery-02.jpg",
    alt: "Raw concrete bar and chrome details",
    title: "CONCRETE & EXTRACTION",
    subtitle: "INDUSTRIAL MINIMALISM",
    category: "Interior",
    aspectRatio: "16/10",
    gridSpan: "col-span-1 md:col-span-6 lg:col-span-8"
  },
  {
    id: "g-03",
    index: "03",
    src: "/images/gallery/gallery-03.jpg",
    alt: "Nitro cold brew amber bottle with technical label",
    title: "DAMN GOOD BOTTLED DRINKS",
    subtitle: "24H COLD STEEP",
    category: "Bottles",
    aspectRatio: "4/5",
    gridSpan: "col-span-1 md:col-span-6 lg:col-span-5"
  },
  {
    id: "g-04",
    index: "04",
    src: "/images/gallery/gallery-04.jpg",
    alt: "Espresso Tonic glowing against black stone",
    title: "HIGH-CONTRAST FLASH",
    subtitle: "CITRUS & TONIC",
    category: "Coffee",
    aspectRatio: "1/1",
    gridSpan: "col-span-1 md:col-span-6 lg:col-span-7"
  },
  {
    id: "g-05",
    index: "05",
    src: "/images/gallery/gallery-05.jpg",
    alt: "Manual pour-over Geisha station",
    title: "GEISHA RITUAL",
    subtitle: "SINGLE ORIGIN LOT",
    category: "Coffee",
    aspectRatio: "16/11",
    gridSpan: "col-span-1 md:col-span-6 lg:col-span-7"
  },
  {
    id: "g-06",
    index: "06",
    src: "/images/gallery/gallery-06.jpg",
    alt: "Flaky Kouign-Amann golden layers",
    title: "LAMINATED BAKE",
    subtitle: "MORNING TO MIDNIGHT",
    category: "Food",
    aspectRatio: "5/7",
    gridSpan: "col-span-1 md:col-span-6 lg:col-span-5"
  },
  {
    id: "g-07",
    index: "07",
    src: "/images/gallery/gallery-07.jpg",
    alt: "Warm midnight cruffin plated on steel",
    title: "COMFORT FOOD 9PM",
    subtitle: "DARK GANACHE CORE",
    category: "Food",
    aspectRatio: "7/5",
    gridSpan: "col-span-1 md:col-span-6 lg:col-span-6"
  },
  {
    id: "g-08",
    index: "08",
    src: "/images/gallery/gallery-08.jpg",
    alt: "Steam wand pressure gauge closeup",
    title: "CUSTOM PRESSURE",
    subtitle: "MODDED SYNESSO BAR",
    category: "Details",
    aspectRatio: "3/4",
    gridSpan: "col-span-1 md:col-span-6 lg:col-span-6"
  },
  {
    id: "g-09",
    index: "09",
    src: "/images/gallery/gallery-09.jpg",
    alt: "After-hours conversations at 01:20 AM",
    title: "AFTERWORK CULTURE",
    subtitle: "01:20 AM TRANSITION",
    category: "Night",
    aspectRatio: "3/2",
    gridSpan: "col-span-1 md:col-span-6 lg:col-span-8"
  },
  {
    id: "g-10",
    index: "10",
    src: "/images/gallery/gallery-10.jpg",
    alt: "Minimalist black bottle packaging seal",
    title: "IDENTITY DETAILS",
    subtitle: "SEALED IN SURABAYA",
    category: "Bottles",
    aspectRatio: "4/5",
    gridSpan: "col-span-1 md:col-span-6 lg:col-span-4"
  },
  {
    id: "g-11",
    index: "11",
    src: "/images/gallery/gallery-11.jpg",
    alt: "Surabaya storefront illuminated at night",
    title: "STOREFRONT ILLUMINATION",
    subtitle: "09:00 → 02:00 EVERYDAY",
    category: "Exterior",
    aspectRatio: "4/3",
    gridSpan: "col-span-1 md:col-span-6 lg:col-span-6"
  },
  {
    id: "g-12",
    index: "12",
    src: "/images/gallery/gallery-12.jpg",
    alt: "Cold drip tower glass extraction coils",
    title: "12-HOUR SLOW YIELD",
    subtitle: "ICE DRIP EXTRACTION",
    category: "Coffee",
    aspectRatio: "3/4",
    gridSpan: "col-span-1 md:col-span-6 lg:col-span-6"
  }
];
