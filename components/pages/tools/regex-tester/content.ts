import type { FaqItem } from "@/components/Faq";

/** Shared by the page's FAQPage JSON-LD and the rendered accordion. */
export const FAQS: FaqItem[] = [
  {
    question: "What is a regular expression?",
    answer:
      "A regular expression (regex) is a sequence of characters that defines a search pattern. Used in programming and text processing, regex can match specific strings, validate formats (email, phone), extract data, and perform complex find-and-replace operations in a single line.",
  },
  {
    question: "What do the flags mean?",
    answer:
      "g (global) finds all matches instead of stopping at the first. i (case-insensitive) matches regardless of case. m (multiline) makes ^ and $ match line boundaries. s (dotall) makes . match newline characters too. You can combine flags.",
  },
  {
    question: "What is a capture group?",
    answer:
      "A capture group is a part of the pattern wrapped in parentheses (). When the regex matches, each group captures the text it matched. For example, in (\\d{4})-(\\d{2})-(\\d{2}), three groups would capture the year, month, and day separately from a date string.",
  },
  {
    question: "How do I use the replace mode?",
    answer:
      "Switch to 'Replace' mode, write your pattern in the regex box, type the replacement string below the test area, and see the result instantly. You can reference capture groups in the replacement using $1, $2, etc.",
  },
  {
    question: "Why is my regex matching too much?",
    answer:
      "You may need quantifier constraints. .* matches any characters greedily. Use .*? for non-greedy matching, or be more specific with your character classes. For example, to match a word, use \\w+ rather than .+.",
  },
  {
    question: "How do I match a literal dot or bracket?",
    answer:
      "Escape them with a backslash: \\. matches a literal dot, \\( and \\) match literal parentheses. The tool's pattern input treats \\. as a literal dot just as JavaScript's RegExp constructor does.",
  },
];
