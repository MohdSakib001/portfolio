import type { FaqItem } from "@/components/Faq";

/** Shared by the page's FAQPage JSON-LD and the rendered accordion. */
export const FAQS: FaqItem[] = [
  {
    question: "How is reading time calculated?",
    answer:
      "Reading time is estimated at 200 words per minute, which is the average adult reading speed. The result is rounded up to the nearest minute.",
  },
  {
    question: "What counts as a sentence?",
    answer:
      "A sentence is counted whenever a period (.), exclamation mark (!), or question mark (?) is followed by text. If your text has no punctuation, it is counted as one sentence.",
  },
  {
    question:
      "What is the difference between characters and characters without spaces?",
    answer:
      "Characters counts every character including spaces, line breaks, and punctuation. Characters without spaces strips all whitespace before counting, which is useful for platforms that count visible characters only.",
  },
  {
    question: "Does this tool save my text?",
    answer:
      "No. Your text is processed entirely in your browser using JavaScript. Nothing is ever sent to a server or stored anywhere.",
  },
  {
    question: "Can I use this to check SEO meta descriptions?",
    answer:
      "Yes. Google typically displays meta descriptions up to 155–160 characters. Paste your description and watch the character count to make sure it fits.",
  },
  {
    question: "What counts as a paragraph?",
    answer:
      "A paragraph is counted as a block of text separated by one or more blank lines. If there are no blank lines, the entire text is counted as one paragraph.",
  },
];
