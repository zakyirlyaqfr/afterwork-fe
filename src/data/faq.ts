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
    answer: "Our G-Walk Citraland flagship operates everyday from 09:00 AM until 02:00 AM midnight. Foremost Padel Club opens 07:00 AM to 23:00 PM, and Sanur Bali welcomes you 08:00 AM to 00:00 AM everyday. Our espresso bars are fully active from morning meetings to late-night work transitions.",
    category: "OPERATIONS"
  },
  {
    id: "faq-2",
    number: "02",
    question: "WHERE CAN I FIND AFTERWORK CAFFEINE?",
    answer: "We have two venues in Surabaya and one in Bali: G-Walk Citraland (Jl. Niaga Gapura FG-19), Foremost Padel Club (Gayung Kebonsari), and Sanur Bali (Jl. Batur Sari). All locations feature dedicated power sockets, brutalist stainless bars, and comfortable seating.",
    category: "LOCATIONS"
  },
  {
    id: "faq-3",
    number: "03",
    question: "HOW DO I ORDER BOTTLED DRINKS FOR DELIVERY?",
    answer: "Our signature bottled series (Nitro Cold Brew, Cold White, Cascara Fizz, and 500ml Sharing Bottles) are available for direct delivery via GoFood (Gojek) and GrabFood. You can also contact our WhatsApp Concierge for large-batch orders and custom events.",
    category: "DELIVERY"
  },
  {
    id: "faq-4",
    number: "04",
    question: "DO YOU OFFER PLANT-BASED OR DAIRY ALTERNATIVES?",
    answer: "Yes. We stock premium barista-grade oat milk and almond milk options for all espresso beverages and signature iced formulas. Simply specify your milk preference when ordering at the bar or in delivery notes.",
    category: "MENU"
  },
  {
    id: "faq-5",
    number: "05",
    question: "IS THE VENUE SUITABLE FOR LAPTOP WORK AND MEETINGS?",
    answer: "Afterwork is intentionally architected for focused work, creative collaboration, and deep-focus night sessions. We provide high-speed symmetric Wi-Fi, accessible universal power sockets at every station, ergonomic seating, and low-tempo ambient music.",
    category: "SPACE"
  },
  {
    id: "faq-6",
    number: "06",
    question: "CAN I PURCHASE WHOLE BEANS AND MERCHANDISE?",
    answer: "Our seasonal single origin roasts and signature espresso blends are packaged weekly in 250g nitrogen-flushed valve bags. Ask our baristas on duty for origin tasting notes and recommended brew recipes for your home setup.",
    category: "RETAIL"
  }
];
