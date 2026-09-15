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
    question: "LOREM IPSUM DOLOR SIT AMET CONSECTETUR?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    category: "LOREM"
  },
  {
    id: "faq-2",
    number: "02",
    question: "DUIS AUTE IRURE DOLOR IN REPREHENDERIT?",
    answer: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    category: "DOLOR"
  },
  {
    id: "faq-3",
    number: "03",
    question: "SED UT PERSPICIATIS UNDE OMNIS ISTE NATUS?",
    answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    category: "CONSECTETUR"
  },
  {
    id: "faq-4",
    number: "04",
    question: "NEMO ENIM IPSAM VOLUPTATEM QUIA VOLUPTAS?",
    answer: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
    category: "ADIPISCING"
  },
  {
    id: "faq-5",
    number: "05",
    question: "QUIS AUTEM VEL EUM IURE REPREHENDERIT?",
    answer: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. Ut enim ad minima veniam, quis nostrum exercitationem.",
    category: "TEMPOR"
  },
  {
    id: "faq-6",
    number: "06",
    question: "AT VERO EOS ET ACCUSAMUS ET IUSTO ODIO?",
    answer: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa.",
    category: "INCIDIDUNT"
  }
];
