import type { FaqItem } from "@/components/Faq";

/** Shared by the page's FAQPage JSON-LD and the rendered accordion. */
export const FAQS: FaqItem[] = [
  {
    question: "Are my images uploaded to a server?",
    answer:
      "No. This tool runs entirely in your browser using the HTML5 Canvas API. Your images never leave your device — nothing is uploaded, stored, or transmitted to any server. Your privacy is fully preserved.",
  },
  {
    question: "What image formats can I resize?",
    answer:
      "You can upload any image format your browser supports — JPEG, PNG, WebP, GIF, BMP, AVIF, and more. You can export the resized image as JPEG, PNG, or WebP. JPEG supports quality control (1–100); PNG and WebP use lossless compression.",
  },
  {
    question: "What does 'lock aspect ratio' mean?",
    answer:
      "When aspect ratio is locked, changing the width automatically updates the height (and vice versa) to maintain the original image proportions. This prevents distortion. Toggle the lock off to resize to any arbitrary dimensions freely.",
  },
  {
    question: "Can I resize to social media sizes?",
    answer:
      "Yes. The tool includes one-click presets for Instagram posts (1080×1080), Instagram stories (1080×1920), Twitter/X banners (1500×500), LinkedIn covers (1584×396), YouTube thumbnails (1280×720), and Facebook covers (820×312).",
  },
  {
    question: "What JPEG quality setting should I use?",
    answer:
      "For web publishing, a quality of 80–90 gives an excellent balance of file size and visual quality. For print or archival use, set it to 95–100. Quality 60–75 is suitable for thumbnails and previews where file size is the priority.",
  },
  {
    question: "Does resizing to a larger size improve image quality?",
    answer:
      "No. Upscaling (making an image larger than its original dimensions) does not add detail — it only interpolates existing pixels, which can make the image appear blurry or pixelated. For best results, always start with the highest-resolution original available.",
  },
];
