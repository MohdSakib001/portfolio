import type { FaqItem } from "@/components/Faq";

/** Shared by the page's FAQPage JSON-LD and the rendered accordion. */
export const FAQS: FaqItem[] = [
  {
    question: "What is JSON?",
    answer:
      "JSON (JavaScript Object Notation) is a lightweight, human-readable data interchange format. It represents data as key-value pairs (objects) and ordered lists (arrays). JSON is the dominant format for web APIs, configuration files, and data storage because it's easy to parse in virtually every programming language.",
  },
  {
    question: "How do I validate JSON?",
    answer:
      "Paste your JSON into the input area. The formatter shows 'Valid' in green or an error message in red pointing to the exact syntax problem. Valid JSON must have properly quoted strings, correct comma placement, no trailing commas, and matching brackets/braces.",
  },
  {
    question: "What is JSON minification?",
    answer:
      "Minification removes all unnecessary whitespace (spaces, newlines, indentation) from JSON, reducing file size without changing the data. Switch to 'Minify' mode to get the most compact possible representation — useful for reducing payload sizes in API responses.",
  },
  {
    question: "What does the diff mode do?",
    answer:
      "Diff mode lets you paste two JSON objects and see them side by side with changed lines highlighted. Lines that differ between A and B are highlighted in red (A) and green (B), making it easy to spot what changed between two API responses or config versions.",
  },
  {
    question: "Why do I get 'SyntaxError: Unexpected token' in JSON?",
    answer:
      "Common causes: trailing commas after the last item (not allowed in JSON, though allowed in JavaScript), single-quoted strings (JSON requires double quotes), undefined or unquoted values, or a missing closing bracket/brace. The error message will indicate the position in the string.",
  },
  {
    question: "Is there a size limit for JSON I can format?",
    answer:
      "There's no enforced limit — the tool processes everything in your browser's JavaScript engine. Very large JSON objects (10MB+) may be slow to format depending on your device. For smaller JSONs, formatting is instant.",
  },
];
