import type { FaqItem } from "@/components/Faq";

/** Shared by the page's FAQPage JSON-LD and the rendered accordion. */
export const FAQS: FaqItem[] = [
  {
    question: "Is the generated data completely fake?",
    answer:
      "Yes, 100%. All names, emails, phone numbers, addresses, and other fields are randomly assembled from curated word lists. No real person's information is ever used. The data is realistic-looking but entirely synthetic and non-identifiable.",
  },
  {
    question: "What formats can I export fake data in?",
    answer:
      "You can export in four formats: JSON (array of objects), CSV (comma-separated values with a header row), SQL INSERT statements ready to paste into any relational database, and a JavaScript const array literal. Choose the format that matches your toolchain.",
  },
  {
    question: "Does this tool send my data to a server?",
    answer:
      "No. The entire generator runs in JavaScript inside your browser. No data is transmitted, logged, or stored anywhere. Close the tab and everything is gone. It works offline once the page is loaded.",
  },
  {
    question: "Can I use the generated data in production?",
    answer:
      "The data is intended for testing, development, and non-production uses. Because it is randomly generated, it is not suitable for production systems that require validated or verified information.",
  },
  {
    question: "How do I generate fake data as CSV?",
    answer:
      "Select your desired fields using the checkboxes, set the row count with the slider, choose 'CSV' as the output format, then click Generate. A preview table and the raw CSV text both appear. Use the Copy All button or Download button to save the file.",
  },
  {
    question: "What is the maximum number of rows I can generate?",
    answer:
      "You can generate up to 100 rows per batch, which covers the vast majority of testing and demo scenarios. The generation is instant and runs entirely in your browser with no rate limiting.",
  },
];
