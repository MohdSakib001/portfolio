import type { FaqItem } from "@/components/Faq";

/** Shared by the page's FAQPage JSON-LD and the rendered accordion. */
export const FAQS: FaqItem[] = [
  {
    question: "What is Lorem Ipsum?",
    answer:
      "Lorem Ipsum is placeholder text derived from Cicero's work 'de Finibus Bonorum et Malorum' written in 45 BC. It has been the industry's standard dummy text since the 1500s, when an unknown printer scrambled a passage to create a type specimen book. It's used in design and publishing to show a visual layout without using distracting meaningful text.",
  },
  {
    question: "Why do designers use placeholder text?",
    answer:
      "Placeholder text allows designers and clients to focus on the visual layout, typography, spacing, and overall structure of a design without being distracted by the content itself. If real text were used, readers would unconsciously evaluate the words rather than the design.",
  },
  {
    question:
      "What is the difference between Classic and Randomised Lorem Ipsum?",
    answer:
      "Classic Lorem Ipsum always starts with 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...' — the traditional Cicero-derived text. Randomised mode shuffles from a larger Latin-like vocabulary to produce varied output that won't look identical in every placeholder on the page.",
  },
  {
    question: "Can I generate Lorem Ipsum by word count?",
    answer:
      "Yes. Switch the 'Generate' selector to 'Words' and enter the number of words you need. The tool will generate exactly that many words — useful when you have a specific word budget for a UI element like a card description or button label.",
  },
  {
    question: "Is Lorem Ipsum real Latin?",
    answer:
      "Almost. It's derived from classical Latin but is deliberately scrambled so it doesn't form coherent sentences. The intent is text that looks like natural prose at a glance without carrying any meaning that would distract from the design.",
  },
  {
    question: "Can I use generated Lorem Ipsum in commercial projects?",
    answer:
      "Yes. Lorem Ipsum is in the public domain and can be used freely in any personal or commercial project without attribution.",
  },
];
