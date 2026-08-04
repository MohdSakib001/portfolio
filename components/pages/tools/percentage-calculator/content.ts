import type { FaqItem } from "@/components/Faq";

/** Shared by the page's FAQPage JSON-LD and the rendered accordion. */
export const FAQS: FaqItem[] = [
  {
    question: "How do I calculate what is X% of Y?",
    answer:
      'Multiply Y by X and divide by 100. For example, 20% of 250 = (20 × 250) ÷ 100 = 50. The "What is X% of Y" mode does this automatically as you type.',
  },
  {
    question: "How do I find what percentage X is of Y?",
    answer:
      'Divide X by Y and multiply by 100. For example, 50 is what % of 200? (50 ÷ 200) × 100 = 25%. Use the "X is what % of Y" mode for this.',
  },
  {
    question: "How do I calculate percentage change?",
    answer:
      "Subtract the original value from the new value, divide by the original value, and multiply by 100. Formula: ((New − Old) ÷ |Old|) × 100. A positive result is an increase; negative is a decrease.",
  },
  {
    question: "What is the quick mental maths trick for 10%?",
    answer:
      "To find 10% of any number, just move the decimal point one place to the left. For 350, 10% is 35. For 20%, double that: 70. For 5%, halve the 10% result: 17.5.",
  },
  {
    question: "How do I calculate a discount?",
    answer:
      'Use the "What is X% of Y" mode. Enter the discount percentage as X and the original price as Y. Subtract the result from the original price to get the sale price.',
  },
  {
    question:
      "What is the difference between percentage increase and absolute increase?",
    answer:
      "Absolute increase is the raw difference (e.g., £20 more). Percentage increase expresses that change relative to the starting value (e.g., 20% more). Percentage change is more useful for comparisons across different scales.",
  },
];
