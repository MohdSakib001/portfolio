import type { FaqItem } from "@/components/Faq";

/** Shared by the page's FAQPage JSON-LD and the rendered accordion. */
export const FAQS: FaqItem[] = [
  {
    question: "What is an aspect ratio?",
    answer:
      "An aspect ratio is the proportional relationship between a rectangle's width and height, expressed as two numbers separated by a colon (e.g. 16:9). It describes shape, not size — a 1920×1080 monitor and a 640×360 video window share the same 16:9 ratio.",
  },
  {
    question: "Why is 16:9 the standard for video?",
    answer:
      "The 16:9 ratio was chosen as the HDTV standard in the 1980s because it is a geometric compromise between the 4:3 TV format and the wider cinema formats. It matches the natural field of view of human peripheral vision and allows widescreen films to be displayed with minimal letterboxing.",
  },
  {
    question: "How do I calculate an aspect ratio from pixel dimensions?",
    answer:
      "Divide both the width and height by their Greatest Common Divisor (GCD). For 1920×1080: GCD(1920,1080) = 120, so 1920÷120 = 16 and 1080÷120 = 9, giving 16:9. The 'Calculate Ratio' mode does this automatically.",
  },
  {
    question: "What aspect ratios do social media platforms use?",
    answer:
      "Instagram square posts use 1:1, portrait posts and Stories use 9:16 (4:5 for feed portraits). Twitter/X headers are 3:1, profile banners 16:9. YouTube thumbnails are 16:9. Facebook covers are 2.7:1 (roughly). LinkedIn banners are approximately 4:1.",
  },
  {
    question: "How do I scale a resolution while keeping the aspect ratio?",
    answer:
      "Use the 'Scale from Ratio' mode. Enter the ratio (e.g. 16:9) then provide either the target width or height — the calculator solves the missing dimension. Manually: if you know the width, height = width × (ratio height ÷ ratio width). For 16:9 at 1280px wide: height = 1280 × (9÷16) = 720px.",
  },
  {
    question: "What is the difference between 16:9 and 16:10?",
    answer:
      "16:10 (also written 8:5) is slightly taller than 16:9, with a decimal value of 1.600 vs 1.778. It was common on older widescreen laptops and designers prefer it for extra vertical workspace. 16:9 became dominant when television and consumer electronics standardised on HD resolutions like 1280×720 and 1920×1080.",
  },
];
