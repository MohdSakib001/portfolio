import type { FaqItem } from "@/components/Faq";

/** Shared by the page's FAQPage JSON-LD and the rendered accordion. */
export const FAQS: FaqItem[] = [
  {
    question: "What is Base64 encoding?",
    answer:
      "Base64 is a binary-to-text encoding scheme that converts binary data into a string of 64 ASCII characters (A–Z, a–z, 0–9, +, /). It's used to safely transmit binary data over systems designed to handle text — like email, HTML attributes, or HTTP headers. The encoded output is about 33% larger than the original.",
  },
  {
    question: "Is Base64 a form of encryption?",
    answer:
      "No. Base64 is encoding, not encryption. Anyone can decode a Base64 string without a key. It's used for data representation, not security. If you need to protect data, use proper encryption (AES, RSA) rather than Base64.",
  },
  {
    question: "What is the difference between Base64 and Base64URL?",
    answer:
      "Base64URL replaces + with - and / with _ and removes padding = characters. This makes the output safe for use in URLs and file names without percent-encoding. JWT tokens use Base64URL encoding.",
  },
  {
    question: "What is URL encoding?",
    answer:
      "URL encoding (percent-encoding) converts characters that aren't safe in URLs into a % followed by two hex digits. For example, space becomes %20 and & becomes %26. It's required when passing special characters as URL query parameters.",
  },
  {
    question: "Why does Base64-encoded output have = at the end?",
    answer:
      "Base64 encodes data in 3-byte groups. If the input length isn't divisible by 3, padding characters (=) are added to make the output length a multiple of 4. One or two = characters at the end is normal and expected.",
  },
  {
    question: "Does this tool handle Unicode and emoji?",
    answer:
      "Yes. The encoder uses encodeURIComponent before calling btoa(), which handles multi-byte characters including accented letters, CJK characters, and emoji that would otherwise cause errors with the native btoa() function.",
  },
];
