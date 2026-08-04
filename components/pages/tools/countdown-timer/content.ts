import type { FaqItem } from "@/components/Faq";

/** Shared by the page's FAQPage JSON-LD and the rendered accordion. */
export const FAQS: FaqItem[] = [
  {
    question: "How do I create a countdown?",
    answer:
      "Enter an event name and select a target date and time. The countdown starts immediately and updates every second until the target is reached.",
  },
  {
    question: "What happens when the countdown reaches zero?",
    answer:
      "A celebration message appears with a confetti emoji. You can then set a new target date to start a fresh countdown.",
  },
  {
    question: "Can I count down to a specific time, not just a date?",
    answer:
      "Yes. The date input includes both date and time components, so you can count down to a specific minute — useful for meeting deadlines, launch times, or live events.",
  },
  {
    question: "Does the countdown continue if I close the tab?",
    answer:
      "No. The countdown runs in your browser's JavaScript runtime. If you close the tab, the timer stops. When you return, the countdown will recalculate from the current time to the target date.",
  },
  {
    question: "Can I use this for business launch countdowns?",
    answer:
      "Yes — the tool works well for product launches, sale events, and promotional deadlines. Simply set the target to your launch date and time.",
  },
  {
    question: "How accurate is the countdown?",
    answer:
      "The countdown updates every second using the browser's system clock. It's accurate to within a second for most purposes. For sub-second precision, a different tool would be needed.",
  },
];
