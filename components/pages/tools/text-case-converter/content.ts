import type { FaqItem } from "@/components/Faq";

/** Shared by the page's FAQPage JSON-LD and the rendered accordion. */
export const FAQS: FaqItem[] = [
  {
    question: "What is camelCase?",
    answer:
      'camelCase joins words without spaces, capitalising every word after the first. Example: "hello world" becomes "helloWorld". It\'s the most common naming convention in JavaScript, Java, and Swift.',
  },
  {
    question: "When should I use snake_case vs kebab-case?",
    answer:
      "snake_case uses underscores and is preferred in Python, Ruby, and SQL. kebab-case uses hyphens and is the standard for URLs, CSS class names, HTML attributes, and npm package names. Both are lowercase.",
  },
  {
    question: "What is Title Case vs Sentence case?",
    answer:
      'Title Case capitalises every word ("The Quick Brown Fox"), while Sentence case only capitalises the first word ("The quick brown fox"). Use Title Case for headlines and Sentence case for regular body copy or meta descriptions.',
  },
  {
    question: "Does this convert entire paragraphs?",
    answer:
      "Yes. Paste any amount of text — a single word, a sentence, or multiple paragraphs. The converter handles it all without any character limit.",
  },
  {
    question: "Why is PascalCase different from Title Case?",
    answer:
      'Title Case keeps spaces between words. PascalCase removes all spaces and capitalises each word, making it a single joined identifier ("HelloWorld"). PascalCase is standard for class names in most languages.',
  },
  {
    question: "Does the tool handle special characters?",
    answer:
      "For camelCase, PascalCase, snake_case, and kebab-case, special characters and punctuation are stripped to produce clean identifiers. For the other four cases, special characters are preserved as-is.",
  },
];
