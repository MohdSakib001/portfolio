import type { FaqItem } from "@/components/Faq";

/** Shared by the page's FAQPage JSON-LD and the rendered accordion. */
export const FAQS: FaqItem[] = [
  {
    question: "Can I download the invoice as a PDF?",
    answer:
      "Yes. Click the 'Print / Save as PDF' button. Your browser's print dialog will open — select 'Save as PDF' as the destination. This works in Chrome, Firefox, Safari, and Edge with no additional software required.",
  },
  {
    question: "Is this invoice generator completely free?",
    answer:
      "Yes, it is 100% free with no account, no watermark, and no usage limits. All processing happens in your browser — your invoice data is never sent to any server.",
  },
  {
    question: "Can I add tax to my invoice?",
    answer:
      "Yes. Enter a tax percentage (up to 30%) in the Tax field. The tool automatically calculates the tax amount based on your subtotal after any discount is applied, and displays the final total due.",
  },
  {
    question: "What currencies does the invoice generator support?",
    answer:
      "The tool supports USD (US Dollar), EUR (Euro), GBP (British Pound), INR (Indian Rupee), and AED (UAE Dirham). The selected currency symbol appears throughout the invoice preview automatically.",
  },
  {
    question: "How do I create a professional-looking invoice?",
    answer:
      "Fill in your company name and contact info, add your client's details, enter your line items with quantities and unit prices, set the issue and due dates, and add any payment terms in the notes field. The live preview on the right updates instantly as you type.",
  },
  {
    question: "Who should use an invoice generator?",
    answer:
      "Freelancers, consultants, designers, developers, photographers, contractors, and small business owners who need to bill clients quickly without subscribing to expensive accounting software. It is ideal for one-off projects and recurring client billing.",
  },
];
