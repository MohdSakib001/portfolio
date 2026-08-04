import type { FaqItem } from "@/components/Faq";

/** Shared by the page's FAQPage JSON-LD and the rendered accordion. */
export const FAQS: FaqItem[] = [
  {
    question: "Does this tool upload my images to a server?",
    answer:
      "No. All compression happens entirely inside your browser using the Canvas API. Your images are never sent to any server, making this tool completely private and safe for sensitive or personal photos.",
  },
  {
    question: "What image formats are supported?",
    answer:
      "You can upload JPG, PNG, WebP, and GIF images. You can also choose the output format — JPEG, PNG, or WebP — independently of the input. Converting a PNG to JPEG, for example, often gives the most dramatic file size reduction.",
  },
  {
    question: "What does the quality slider do?",
    answer:
      "The quality slider (1–100) controls the lossy compression level applied by the Canvas API's toBlob method. A quality of 80 is generally a sweet spot — visually nearly identical to the original while reducing file size by 60–85% for JPEG output. PNG uses lossless compression so the slider has less effect on PNG output.",
  },
  {
    question: "Why is WebP often the best output format for the web?",
    answer:
      "WebP is a modern image format developed by Google that achieves 25–35% smaller file sizes compared to JPEG at equivalent visual quality, and supports transparency like PNG. It is supported by all modern browsers and is the recommended format for web images when file size matters.",
  },
  {
    question: "How does image compression affect web performance?",
    answer:
      "Images are typically the largest assets on a webpage. Reducing image sizes directly improves page load time, Core Web Vitals scores (especially Largest Contentful Paint), and bandwidth usage — which is especially impactful for users on mobile networks.",
  },
  {
    question: "Can I compress multiple images at once?",
    answer:
      "Yes. You can upload up to 5 images at a time. The 'Compress All' button processes them sequentially in your browser. The 'Download All' button then triggers individual downloads for each compressed file.",
  },
];
