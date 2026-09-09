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
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida tellus vel nisl finibus, in porta velit placerat. Integer lacinia magna eu elit ullamcorper, et tempor neque pellentesque.",
    category: "LOREM"
  },
  {
    id: "faq-2",
    number: "02",
    question: "SED DO EIUSMOD TEMPOR INCIDIDUNT UT LABORE?",
    answer: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
    category: "IPSUM"
  },
  {
    id: "faq-3",
    number: "03",
    question: "QUIS NOSTRUD EXERCITATION ULLAMCO LABORIS?",
    answer: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur quis autem vel eum iure.",
    category: "DOLOR"
  },
  {
    id: "faq-4",
    number: "04",
    question: "DUIS AUTE IRURE DOLOR IN REPREHENDERIT?",
    answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis.",
    category: "AMET"
  },
  {
    id: "faq-5",
    number: "05",
    question: "EXCEPTEUR SINT OCCAECAT CUPIDATAT NON PROIDENT?",
    answer: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    category: "CONSECTETUR"
  },
  {
    id: "faq-6",
    number: "06",
    question: "SUNT IN CULPA QUI OFFICIA DESERUNT MOLLIT?",
    answer: "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est.",
    category: "ADIPISCING"
  }
];
