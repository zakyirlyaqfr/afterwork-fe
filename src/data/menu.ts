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
    name: "LOREM IPSUM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore.",
    price: "28K",
    category: "COFFEE",
    previewImage: DEFAULT_IMAGE,
    tag: "LOREM BLEND"
  },
  {
    id: "c2",
    name: "DOLOR SIT AMET",
    description: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    price: "32K",
    category: "COFFEE",
    previewImage: DEFAULT_IMAGE,
  },
  {
    id: "c3",
    name: "CONSECTETUR ADIPIS",
    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    price: "36K",
    category: "COFFEE",
    previewImage: DEFAULT_IMAGE,
    tag: "LOREM DAILY"
  },
  {
    id: "c4",
    name: "TEMPOR INCIDIDUNT",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    price: "42K",
    category: "COFFEE",
    previewImage: DEFAULT_IMAGE,
    tag: "LOREM SIGNATURE"
  },
  {
    id: "c5",
    name: "MAGNA ALIQUA",
    description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    price: "55K",
    category: "COFFEE",
    previewImage: DEFAULT_IMAGE,
    tag: "LOREM LOT"
  },

  // BOTTLED
  {
    id: "b1",
    name: "ENIM AD MINIM 250ML",
    description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    price: "38K",
    category: "BOTTLED",
    previewImage: DEFAULT_IMAGE,
    tag: "LOREM BOTTLE"
  },
  {
    id: "b2",
    name: "VENIAM QUIS NOSTRUD",
    description: "Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta.",
    price: "42K",
    category: "BOTTLED",
    previewImage: DEFAULT_IMAGE,
    tag: "LOREM PLANT"
  },
  {
    id: "b3",
    name: "ULLAMCO LABORIS 500ML",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni.",
    price: "75K",
    category: "BOTTLED",
    previewImage: DEFAULT_IMAGE,
    tag: "LOREM SHARING"
  },
  {
    id: "b4",
    name: "ALIQUIP EX EA 250ML",
    description: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit sed quia non.",
    price: "35K",
    category: "BOTTLED",
    previewImage: DEFAULT_IMAGE,
  },

  // FOOD
  {
    id: "f1",
    name: "COMMODO CONSEQUAT",
    description: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam nisi ut aliquid.",
    price: "38K",
    category: "FOOD",
    previewImage: DEFAULT_IMAGE,
    tag: "LOREM BAKE"
  },
  {
    id: "f2",
    name: "DUIS AUTE IRURE",
    description: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
    price: "35K",
    category: "FOOD",
    previewImage: DEFAULT_IMAGE,
  },
  {
    id: "f3",
    name: "DOLOR REPREHEND",
    description: "Vel illum qui dolorem eum fugiat quo voluptas nulla pariatur at vero eos et accusamus et iusto odio.",
    price: "65K",
    category: "FOOD",
    previewImage: DEFAULT_IMAGE,
    tag: "LOREM COMFORT"
  },
  {
    id: "f4",
    name: "VOLUPTATE VELIT",
    description: "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime.",
    price: "52K",
    category: "FOOD",
    previewImage: DEFAULT_IMAGE,
  },

  // NON COFFEE
  {
    id: "nc1",
    name: "ESSE CILLUM",
    description: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates.",
    price: "42K",
    category: "NON COFFEE",
    previewImage: DEFAULT_IMAGE,
    tag: "LOREM INFUSION"
  },
  {
    id: "nc2",
    name: "FUGIAT NULLA",
    description: "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur.",
    price: "40K",
    category: "NON COFFEE",
    previewImage: DEFAULT_IMAGE,
  },
  {
    id: "nc3",
    name: "EXCEPTEUR SINT",
    description: "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore cum soluta nobis est eligendi.",
    price: "35K",
    category: "NON COFFEE",
    previewImage: DEFAULT_IMAGE,
  }
];
