import { DEFAULT_IMAGE } from '@/data/assets';

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
    src: DEFAULT_IMAGE,
    alt: "Lorem ipsum dolor sit amet",
    title: "LOREM IPSUM",
    subtitle: "DOLOR SIT AMET",
    category: "People",
    aspectRatio: "3/4",
    gridSpan: "col-span-1 md:col-span-6 lg:col-span-4"
  },
  {
    id: "g-02",
    index: "02",
    src: DEFAULT_IMAGE,
    alt: "Consectetur adipiscing elit",
    title: "CONSECTETUR ADIPIS",
    subtitle: "SED DO EIUSMOD",
    category: "Interior",
    aspectRatio: "16/10",
    gridSpan: "col-span-1 md:col-span-6 lg:col-span-8"
  },
  {
    id: "g-03",
    index: "03",
    src: DEFAULT_IMAGE,
    alt: "Tempor incididunt ut labore",
    title: "TEMPOR INCIDIDUNT",
    subtitle: "MAGNA ALIQUA",
    category: "Bottles",
    aspectRatio: "4/5",
    gridSpan: "col-span-1 md:col-span-6 lg:col-span-5"
  },
  {
    id: "g-04",
    index: "04",
    src: DEFAULT_IMAGE,
    alt: "Ut enim ad minim veniam",
    title: "ENIM AD MINIM",
    subtitle: "QUIS NOSTRUD",
    category: "Coffee",
    aspectRatio: "1/1",
    gridSpan: "col-span-1 md:col-span-6 lg:col-span-7"
  },
  {
    id: "g-05",
    index: "05",
    src: DEFAULT_IMAGE,
    alt: "Duis aute irure dolor",
    title: "DUIS AUTE IRURE",
    subtitle: "IN REPREHENDERIT",
    category: "Coffee",
    aspectRatio: "16/11",
    gridSpan: "col-span-1 md:col-span-6 lg:col-span-7"
  },
  {
    id: "g-06",
    index: "06",
    src: DEFAULT_IMAGE,
    alt: "Excepteur sint occaecat",
    title: "EXCEPTEUR SINT",
    subtitle: "OCCAECAT CUPIDATAT",
    category: "Food",
    aspectRatio: "5/7",
    gridSpan: "col-span-1 md:col-span-6 lg:col-span-5"
  },
  {
    id: "g-07",
    index: "07",
    src: DEFAULT_IMAGE,
    alt: "Sunt in culpa qui officia",
    title: "SUNT IN CULPA",
    subtitle: "DESERUNT MOLLIT",
    category: "Food",
    aspectRatio: "7/5",
    gridSpan: "col-span-1 md:col-span-6 lg:col-span-6"
  },
  {
    id: "g-08",
    index: "08",
    src: DEFAULT_IMAGE,
    alt: "Sed ut perspiciatis unde",
    title: "PERSPICIATIS UNDE",
    subtitle: "OMNIS ISTE NATUS",
    category: "Details",
    aspectRatio: "3/4",
    gridSpan: "col-span-1 md:col-span-6 lg:col-span-6"
  },
  {
    id: "g-09",
    index: "09",
    src: DEFAULT_IMAGE,
    alt: "Nemo enim ipsam voluptatem",
    title: "IPSAM VOLUPTATEM",
    subtitle: "QUIA VOLUPTAS",
    category: "Night",
    aspectRatio: "3/2",
    gridSpan: "col-span-1 md:col-span-6 lg:col-span-8"
  },
  {
    id: "g-10",
    index: "10",
    src: DEFAULT_IMAGE,
    alt: "Neque porro quisquam est",
    title: "PORRO QUISQUAM",
    subtitle: "DOLOREM IPSUM",
    category: "Bottles",
    aspectRatio: "4/5",
    gridSpan: "col-span-1 md:col-span-6 lg:col-span-4"
  },
  {
    id: "g-11",
    index: "11",
    src: DEFAULT_IMAGE,
    alt: "Ut enim ad minima veniam",
    title: "MINIMA VENIAM",
    subtitle: "QUIS NOSTRUM",
    category: "Exterior",
    aspectRatio: "4/3",
    gridSpan: "col-span-1 md:col-span-6 lg:col-span-6"
  },
  {
    id: "g-12",
    index: "12",
    src: DEFAULT_IMAGE,
    alt: "Quis autem vel eum iure",
    title: "VEL EUM IURE",
    subtitle: "REPREHENDERIT",
    category: "Coffee",
    aspectRatio: "3/4",
    gridSpan: "col-span-1 md:col-span-6 lg:col-span-6"
  }
];
