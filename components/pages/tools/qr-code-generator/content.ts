import type { FaqItem } from "@/components/Faq";

/** Shared by the page's FAQPage JSON-LD and the rendered accordion. */
export const FAQS: FaqItem[] = [
  {
    question: "What is a QR code and how does it work?",
    answer:
      "A QR (Quick Response) code is a two-dimensional barcode that stores data as a pattern of black and white squares. A smartphone camera or QR scanner decodes the pattern back into text, a URL, or other data. They support error correction so they still scan even when partially damaged.",
  },
  {
    question: "Is this QR code generator free?",
    answer:
      "Yes, completely free. The QR code is generated in your browser using a pure JavaScript implementation of the ISO/IEC 18004 standard. No account needed, no watermarks, no limits.",
  },
  {
    question: "What does error correction level mean?",
    answer:
      "Error correction lets a QR code remain scannable even if part of it is obscured or damaged. Level L recovers 7% of data, M recovers 15%, Q recovers 25%, and H recovers 30%. Higher levels produce denser, more complex codes. Use H when adding a logo overlay; use L for clean, simple codes.",
  },
  {
    question: "Can I use colored QR codes?",
    answer:
      "Yes. You can set any foreground and background color with the color pickers. For best scan reliability, maintain high contrast between foreground and background. Dark foreground on light background is safest; avoid very similar colors or red-on-green combinations.",
  },
  {
    question: "What is the maximum amount of data a QR code can store?",
    answer:
      "This generator supports QR code versions 1–10, which can encode up to approximately 174 bytes in byte mode with ECC level M. For URLs this covers most real-world links. The standard supports up to version 40, which holds ~2,900 bytes of text.",
  },
  {
    question: "Does the QR code expire?",
    answer:
      "No. QR codes generated here are static — they embed the data directly in the pattern. They never expire. Dynamic QR codes (that redirect through a short URL) can expire, but this tool generates true static codes.",
  },
];
