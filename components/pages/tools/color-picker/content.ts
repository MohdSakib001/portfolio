import type { FaqItem } from "@/components/Faq";

/** Shared by the page's FAQPage JSON-LD and the rendered accordion. */
export const FAQS: FaqItem[] = [
  {
    question: "What is a HEX color code and how do I read it?",
    answer:
      "A HEX color code is a 6-digit hexadecimal string prefixed with #. The first two digits represent red intensity (00–FF), the middle two represent green, and the last two represent blue. For example, #FF0000 is pure red, #00FF00 is pure green, and #0000FF is pure blue. Short-hand 3-digit codes like #F00 expand to #FF0000.",
  },
  {
    question: "What is the difference between RGB and CMYK?",
    answer:
      "RGB is an additive color model used by screens: mixing all channels at full intensity produces white. CMYK is a subtractive model used in print: mixing all inks at full intensity produces near-black. RGB values cannot always be reproduced exactly in CMYK print because the color gamut of print is smaller than that of a display.",
  },
  {
    question: "Why is HSL better for generating color palettes?",
    answer:
      "HSL lets you manipulate color properties independently. To create a lighter tint, increase the lightness value. To create a shade, decrease it. To find a complementary color, add 180° to the hue. To find analogous colors, add or subtract 30°. This predictable math makes HSL ideal for programmatic palette generation, which is exactly how this tool works.",
  },
  {
    question: "What does the contrast ratio mean for accessibility?",
    answer:
      "The contrast ratio measures how distinguishable two colors are from each other. WCAG 2.1 requires a minimum 4.5:1 ratio for normal text and 3:1 for large text to meet AA compliance. A ratio of 1:1 means identical colors (no contrast), while 21:1 is the maximum (black on white). This tool shows the contrast of your selected color against both pure white and pure black.",
  },
  {
    question: "How does the image color extractor work?",
    answer:
      "When you upload an image, the tool draws it to a hidden HTML5 canvas element, samples pixels across a grid, and then runs a simplified k-means clustering algorithm over the sampled pixels. The algorithm groups similar colors together and computes the centroid (average color) of each cluster, producing 5 representative dominant colors from your image.",
  },
  {
    question: "What are complementary, analogous, and triadic colors?",
    answer:
      "These are classic color harmony schemes from color theory. Complementary colors sit opposite each other on the color wheel (180° apart) and create high-contrast, vivid combinations. Analogous colors are neighbors on the wheel (±30°) and create harmonious, low-contrast schemes. Triadic colors form an equilateral triangle on the wheel (±120°) and balance contrast with variety — popular in logo and brand design.",
  },
];
