import type { FaqItem } from "@/components/Faq";

/** Shared by the page's FAQPage JSON-LD and the rendered accordion. */
export const FAQS: FaqItem[] = [
  {
    question: "What is a flashcard and why does it work for studying?",
    answer:
      "A flashcard is a two-sided learning card with a prompt (term or question) on one side and the answer or definition on the other. They work because they leverage active recall — the act of retrieving information from memory — which is far more effective at building long-term retention than passively re-reading notes or a textbook.",
  },
  {
    question: "What is spaced repetition and how does it relate to flashcards?",
    answer:
      "Spaced repetition is a study technique where you review information at gradually increasing intervals. Cards you struggle with are shown more frequently, while well-known cards are spaced further apart. Combined with flashcards, this produces dramatic improvements in long-term retention with less total study time than massed practice.",
  },
  {
    question: "How do I import my own flashcards using CSV?",
    answer:
      "In the Create tab, click 'Import CSV' and paste your content. Each line should follow the format: term,definition. For example: Photosynthesis,The process by which plants convert light into glucose. You can import as many cards as you like in one go, and they are added to your existing deck.",
  },
  {
    question: "Are my flashcards saved between sessions?",
    answer:
      "Yes. Your entire deck — including the deck name and all cards — is saved to your browser's localStorage automatically after every change. As long as you use the same browser on the same device, your cards will be there next time you visit.",
  },
  {
    question: "What is the difference between 'Know it' and 'Review again'?",
    answer:
      "'Know it' (green checkmark) means you recalled the answer confidently. 'Review again' (red cross) means you hesitated or got it wrong. At the end of a session, the tool shows you your score and lists all cards marked for review so you know exactly where to focus next.",
  },
  {
    question: "Can I use keyboard shortcuts while studying?",
    answer:
      "Yes. Press the Spacebar to flip the current card. Use the Arrow Left and Arrow Right keys to navigate to the previous or next card without needing to use the mouse.",
  },
];
