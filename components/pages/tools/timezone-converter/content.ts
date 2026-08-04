import type { FaqItem } from "@/components/Faq";

/** Shared by the page's FAQPage JSON-LD and the rendered accordion. */
export const FAQS: FaqItem[] = [
  {
    question: "What is a time zone converter?",
    answer:
      "A time zone converter lets you see what time it is in multiple cities around the world simultaneously, and convert a specific date and time from one time zone to another. It removes the mental arithmetic of calculating UTC offsets manually.",
  },
  {
    question: "How do I use this time zone converter?",
    answer:
      "The tool defaults to the current live time in your local timezone. All city cards update every second. To check a specific time, change the source date and time using the input at the top. The cards will immediately show the equivalent time in every listed city.",
  },
  {
    question: "Why does a card show '+1 day' or '−1 day'?",
    answer:
      "When converting across the International Date Line or large UTC offsets, the calendar date in the target city may be one day ahead or behind your source date. The badge makes this difference visible at a glance so you don't accidentally schedule a meeting on the wrong day.",
  },
  {
    question: "How can I use this for remote work scheduling?",
    answer:
      "Add the timezones of all your teammates from the dropdown, then adjust the source time to a proposed meeting slot. You can instantly see whether the time falls within business hours for each person, and avoid accidentally scheduling calls at 3 AM for a colleague in Tokyo.",
  },
  {
    question: "What does the moon icon on a card mean?",
    answer:
      "A moon icon indicates that the current or selected time falls between 10 PM and 6 AM in that city — nighttime hours when people are typically asleep. The card is also displayed with a dimmer style to make this immediately recognizable.",
  },
  {
    question: "Which time zones are supported?",
    answer:
      "The tool uses the IANA timezone database via the browser's built-in Intl.DateTimeFormat API, which supports hundreds of named zones. The searchable dropdown includes 30+ of the most commonly used city timezones. UTC offsets are calculated automatically, including daylight saving time adjustments.",
  },
];
