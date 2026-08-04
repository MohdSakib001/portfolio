import type { FaqItem } from "@/components/Faq";

/** Shared by the page's FAQPage JSON-LD and the rendered accordion. */
export const FAQS: FaqItem[] = [
  {
    question: "Does my text save automatically?",
    answer:
      "Yes. The notepad saves your text to your browser's localStorage about 1 second after you stop typing. A green dot in the toolbar confirms the save. The text will be there when you return to the page — as long as you don't clear your browser data.",
  },
  {
    question: "What happens if I close the tab?",
    answer:
      "Your text is saved in the browser's localStorage, so it persists across page reloads and tab closes. Next time you open the notepad, your text is restored automatically.",
  },
  {
    question: "Is my text private?",
    answer:
      "Yes. Everything stays in your browser's localStorage. Nothing is sent to any server. Only you can see your notes, on the device you're using.",
  },
  {
    question: "Can I download my notes?",
    answer:
      "Yes. Click '.txt' or '.md' in the toolbar to download your current text as a file. The .md option saves it as a Markdown file, which is useful if you're writing formatted content.",
  },
  {
    question: "Is there a character limit?",
    answer:
      "localStorage has a limit of approximately 5MB per origin in most browsers. That's about 2.5 million characters of plain text — enough for a long book. You're unlikely to hit the limit in normal use.",
  },
  {
    question: "Can I use this as a temporary clipboard?",
    answer:
      "Absolutely. Paste text here to hold it while you work elsewhere, or use it to compose a message before copying into another app. The auto-save means you won't lose anything even if you accidentally navigate away.",
  },
];
