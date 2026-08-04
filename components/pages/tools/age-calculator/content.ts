import type { FaqItem } from "@/components/Faq";

/** Shared by the page's FAQPage JSON-LD and the rendered accordion. */
export const FAQS: FaqItem[] = [
  {
    question: "How does the age calculator work?",
    answer:
      "The tool subtracts your date of birth from today's date in your local timezone. It accounts for month lengths and leap years to give you the exact breakdown in years, months, and remaining days.",
  },
  {
    question: "Does the age calculator account for leap years?",
    answer:
      "Yes. The calculation walks actual calendar dates rather than assuming a fixed 365-day year, so February 29 birthdays are handled correctly and leap days are included in the total day count.",
  },
  {
    question: "How is the total hours count calculated?",
    answer:
      "Total hours is total days multiplied by 24. It does not adjust for daylight saving transitions, but it is accurate to within a couple of hours for any practical purpose.",
  },
  {
    question: "How accurate is the zodiac sign?",
    answer:
      "The tool uses the standard Western (tropical) zodiac with the most commonly published date ranges. Cusp dates such as March 20 versus March 21 can vary slightly between sources.",
  },
  {
    question: "Can I use this to calculate someone else's age?",
    answer:
      "Yes. Enter any past date of birth — your own, a family member's, or a historical figure's. The tool works for any valid date in the past.",
  },
  {
    question: "Why would I need my age in days?",
    answer:
      "Total days is useful for medical contexts such as infant age, for percentage-of-life calculations, and for milestone tracking. Some insurance and legal contexts also count in days rather than years.",
  },
  {
    question: "Is my date of birth stored anywhere?",
    answer:
      "No. The calculation runs entirely in your browser with JavaScript. Nothing is sent to a server, nothing is logged, and nothing is saved when you close the tab.",
  },
];
