import type { FaqItem } from "@/components/Faq";

/** Shared by the page's FAQPage JSON-LD and the rendered accordion. */
export const FAQS: FaqItem[] = [
  {
    question: "Is the meme generator completely free?",
    answer:
      "Yes — 100% free with no watermarks, no account required, and no limits. Everything runs in your browser using the HTML5 Canvas API.",
  },
  {
    question: "How do I add text to a meme?",
    answer:
      "Select a template or upload your own image. Type your top and bottom text in the text fields on the left. The canvas preview updates live as you type. Adjust font size, font family, and color using the style controls.",
  },
  {
    question: "What fonts can I use for meme text?",
    answer:
      "The generator supports three fonts: Impact (classic meme style), Arial (clean and modern), and Comic Sans MS (ironic and expressive). Impact with the black outline option enabled produces the most traditional meme look.",
  },
  {
    question: "Are there any copyright issues with the meme templates?",
    answer:
      "The template thumbnails use placeholder images from picsum.photos. For viral meme formats (Distracted Boyfriend, Drake, etc.), the underlying photos are often copyrighted. Memes created for personal, non-commercial, or commentary purposes generally fall under fair use in most jurisdictions — but always check local laws if you plan to use memes commercially.",
  },
  {
    question: "Can I upload my own photo instead of using a template?",
    answer:
      "Absolutely. Click the 'Upload image' button and select any JPG, PNG, WebP, or GIF file from your device. The canvas resizes to match your image's aspect ratio and your uploaded image never leaves your browser.",
  },
  {
    question: "How do I download the finished meme?",
    answer:
      "Click the 'Download Meme' button after adding your text. The canvas is exported as a PNG file using canvas.toDataURL() and saved directly to your device. No server is involved at any point.",
  },
];
