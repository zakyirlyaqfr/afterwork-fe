export interface FaqItem {
  id: string;
  number: string;
  question: string;
  answer: string;
  category?: string;
}

export const faqItems: FaqItem[] = [
  {
    id: "faq-1",
    number: "01",
    question: "WHAT ARE YOUR OPERATING HOURS?",
    answer: "We operate everyday from 09:00 AM until 02:00 AM midnight. Whether you need a morning espresso to start the day or a late-night pour-over during after-hours work sessions, our bar is fully active.",
    category: "OPERATIONS"
  },
  {
    id: "faq-2",
    number: "02",
    question: "WHERE IS AFTERWORK CAFFEINE LOCATED IN SURABAYA?",
    answer: "We are located at Jl. Pemuda No. 33–37, Surabaya. Our physical space is designed with an industrial brutalist aesthetic featuring stainless steel bars, raw concrete textures, and dedicated charging outlets at every station.",
    category: "LOCATION"
  },
  {
    id: "faq-3",
    number: "03",
    question: "HOW DO I ORDER BOTTLED DRINKS FOR DELIVERY?",
    answer: "Our signature bottled drinks (Nitro Cold Brew, Cold White, Cascara Fizz, and 500ml Sharing Bottles) are available on Gojek (GoFood) and Grab (GrabFood). Search 'Afterwork Caffeine' or tap the direct links on our Delivery page.",
    category: "DELIVERY"
  },
  {
    id: "faq-4",
    number: "04",
    question: "DO YOU OFFER PLANT-BASED OR DAIRY ALTERNATIVES?",
    answer: "Yes. We stock premium barista-grade oat milk and almond milk options for all espresso beverages and signature bottled drinks. Simply specify your preference when ordering at the counter or through delivery notes.",
    category: "MENU"
  },
  {
    id: "faq-5",
    number: "05",
    question: "IS THE VENUE SUITABLE FOR LAPTOP WORK AND MEETINGS?",
    answer: "Afterwork Caffeine is purposefully built for focused work, creative collaboration, and late-night transitions. We offer high-speed symmetric Wi-Fi, accessible universal power sockets, ergonomic seating, and ambient low-tempo music playlists.",
    category: "SPACE"
  },
  {
    id: "faq-6",
    number: "06",
    question: "CAN I PURCHASE WHOLE BEANS AND MERCHANDISE IN-STORE?",
    answer: "Our seasonal single origin roasts and signature espresso blends are packaged weekly in 250g nitrogen-flushed valve bags. Ask our baristas on duty for origin tasting notes and recommended grind sizes for your brewing method.",
    category: "RETAIL"
  }
];
