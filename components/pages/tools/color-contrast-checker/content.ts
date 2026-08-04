import type { FaqItem } from "@/components/Faq";

/** Shared by the page's FAQPage JSON-LD and the rendered accordion. */
export const FAQS: FaqItem[] = [
  {
    question: "What is WCAG?",
    answer:
      "WCAG (Web Content Accessibility Guidelines) is an international standard developed by the W3C that defines how to make web content more accessible to people with disabilities, including those with visual impairments. The contrast ratio requirements are found in WCAG 2.1 Success Criterion 1.4.3 (Contrast Minimum) and 1.4.6 (Contrast Enhanced).",
  },
  {
    question: "What contrast ratio do I need to pass WCAG AA?",
    answer:
      "For AA compliance: normal text (under 18pt or 14pt bold) needs a minimum 4.5:1 ratio. Large text (18pt or 14pt bold) needs at least 3:1. Most websites aim for AA compliance at minimum.",
  },
  {
    question: "What is WCAG AAA?",
    answer:
      "AAA is the highest WCAG conformance level, requiring 7:1 for normal text and 4.5:1 for large text. AAA is recommended for text that users need to read for extended periods, but the W3C notes it may not be possible to achieve for all content.",
  },
  {
    question: "How is contrast ratio calculated?",
    answer:
      "Contrast ratio = (L1 + 0.05) / (L2 + 0.05), where L1 is the relative luminance of the lighter colour and L2 the darker. Luminance is calculated by converting sRGB values to linear light values. A ratio of 1:1 means identical colours; 21:1 is black on white (the maximum).",
  },
  {
    question: "Does the contrast checker work for dark mode?",
    answer:
      "Yes. Enter your dark mode background as the background colour and your dark mode text as the foreground colour. The WCAG ratio requirements are the same regardless of whether the design is light or dark.",
  },
  {
    question: "Why do I sometimes see colours that look fine but fail WCAG?",
    answer:
      "Human perception of contrast is subjective and context-dependent. WCAG uses a mathematical formula that doesn't perfectly match perceived contrast in all cases. Some colours that seem fine to those with normal vision may be difficult for people with colour vision deficiencies or low contrast sensitivity.",
  },
];
