import type { FaqItem } from "@/components/Faq";

/** Shared by the page's FAQPage JSON-LD and the rendered accordion. */
export const FAQS: FaqItem[] = [
  {
    question: "What is the Pomodoro Technique?",
    answer:
      "The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. It breaks work into 25-minute focused sessions separated by short breaks. The name comes from the tomato-shaped kitchen timer he used as a student ('pomodoro' is Italian for tomato).",
  },
  {
    question: "Why 25 minutes?",
    answer:
      "Research suggests that 20–30 minutes is close to the optimal sustained attention span for most people before cognitive performance starts to decline. The 25-minute window is short enough to feel manageable and long enough to make meaningful progress.",
  },
  {
    question: "Can I change the timer durations?",
    answer:
      "Yes. Click the settings (⚙) button to open the configuration panel. You can set custom durations for the focus session, short break, and long break to suit your working style.",
  },
  {
    question: "How many pomodoros make up a long break?",
    answer:
      "After every 4 completed focus sessions, the timer automatically suggests a long break of 15 minutes (configurable). This is designed to give your brain a deeper recovery before the next set of sessions.",
  },
  {
    question: "Does the timer make a sound?",
    answer:
      "Yes, a gentle chime plays when each session ends. It uses the browser's Web Audio API, so no extra files are needed. The sound will only play after you interact with the page (browser security requirement).",
  },
  {
    question: "What should I do during a short break?",
    answer:
      "Step away from the screen. Stand up, stretch, walk to another room, get a drink of water. Avoid checking social media — the goal is to let your mind rest, not switch to a different cognitive task.",
  },
];
