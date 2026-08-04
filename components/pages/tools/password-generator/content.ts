import type { FaqItem } from "@/components/Faq";

/** Shared by the page's FAQPage JSON-LD and the rendered accordion. */
export const FAQS: FaqItem[] = [
  {
    question: "Is this password generator truly random?",
    answer:
      "Yes. The tool uses the browser's built-in crypto.getRandomValues() API, which generates cryptographically secure random numbers. This is the same entropy source used by password managers and security tools.",
  },
  {
    question: "Does this tool store or send my passwords anywhere?",
    answer:
      "No. The generator runs entirely in JavaScript in your browser. No password is ever sent to a server, logged, or stored. Close the tab and it's gone forever.",
  },
  {
    question: "How long should my password be?",
    answer:
      "At minimum, use 12 characters for non-critical accounts and 16+ for email, banking, and password manager master passwords. Longer is always better — a 20-character random password is essentially uncrackable with current technology.",
  },
  {
    question: "What makes a password strong?",
    answer:
      "Length, randomness, and character diversity. A strong password is long (16+ chars), fully random (not a phrase), and uses all character types. Avoid dictionary words, names, or predictable patterns even if you substitute letters with numbers.",
  },
  {
    question: "Should I include symbols in my password?",
    answer:
      "Yes, when allowed by the site. Symbols increase the character set size from 62 (alphanumeric) to 95 (all printable ASCII), which significantly increases the number of possible combinations and time to brute-force.",
  },
  {
    question: "What is the entropy of the passwords generated?",
    answer:
      "With all character sets enabled (95 characters), a 16-character password has approximately 105 bits of entropy (log2(95^16) ≈ 105). NIST considers 112+ bits sufficient for long-term security.",
  },
];
