import type { FaqItem } from "@/components/Faq";

/** Shared by the page's FAQPage JSON-LD and the rendered accordion. */
export const FAQS: FaqItem[] = [
  {
    question: "How do I calculate a 20% tip?",
    answer:
      "Multiply the bill total by 0.20, or use the quick shortcut: move the decimal one place left to get 10%, then double it to get 20%. Example: $47 → $4.70 → $9.40 tip. Add that to the bill: $56.40 total.",
  },
  {
    question: "How do I split a bill equally?",
    answer:
      "Add up the full bill including tax and tip, then divide by the number of people. This tool does exactly that — enter the bill amount, tip percentage, and number of people, and you'll see the per-person total instantly.",
  },
  {
    question: "Should the tip be calculated before or after tax?",
    answer:
      "Convention varies. In the US, most people tip on the pre-tax subtotal, though many tip on the post-tax total because it's simpler. This tool tips on the bill amount you enter, so enter the subtotal if you want pre-tax tipping.",
  },
  {
    question: "What is the standard tip at a restaurant?",
    answer:
      "15% is considered the minimum acceptable tip for adequate service in the US. 18–20% is the standard for good service. 20%+ shows exceptional appreciation. The tipping norm varies by country — some cultures have no tipping tradition at all.",
  },
  {
    question: "How much should I tip for food delivery?",
    answer:
      "15–20% of the order total, with a minimum of $3–5 for short distances. Consider tipping more for bad weather, large orders, long distances, or above-average service.",
  },
  {
    question:
      "What is the easiest way to calculate any tip percentage mentally?",
    answer:
      "Find 10% (move decimal one place left) as your base. 15% = 10% + half of 10%. 20% = double 10%. 25% = 10% + 10% + 5%. For 18%, find 20% then subtract 10% of the result.",
  },
];
