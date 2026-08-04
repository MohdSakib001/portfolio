import type { FaqItem } from "@/components/Faq";

/** Shared by the page's FAQPage JSON-LD and the rendered accordion. */
export const FAQS: FaqItem[] = [
  {
    question: "What is a cron expression?",
    answer:
      "A cron expression is a compact string of five space-separated fields that defines a recurring schedule for a job or task. The fields represent — in order — minute, hour, day of month, month, and day of week. Asterisks (*) mean 'every', slashes define step intervals (*/5 = every 5), and commas list multiple values.",
  },
  {
    question: "How do I use a cron expression in n8n?",
    answer:
      "In n8n, add a Schedule Trigger node to your workflow. Select 'Cron Expression' as the trigger mode and paste your expression into the 'Expression' field. The workflow runs in the timezone configured in your n8n instance settings. Note that n8n may not support all extended specifiers like L (last day) depending on the version.",
  },
  {
    question: "How do I use a cron expression in GitHub Actions?",
    answer:
      "In your workflow YAML, use the on.schedule key with a cron sub-key. Example: on: schedule: - cron: '0 9 * * 1-5'. GitHub Actions always runs cron schedules in UTC. The minimum interval GitHub Actions enforces is 5 minutes. Expressions with a step shorter than */5 on the minute field will be clamped.",
  },
  {
    question: "What does */ mean in a cron expression?",
    answer:
      "The */ syntax is called a step value. It means 'every N units'. For example, */15 in the minute field means 'every 15 minutes' (i.e. at 0, 15, 30, 45). */6 in the hour field means 'every 6 hours' (0, 6, 12, 18). You can also combine a range with a step: 1-5/2 means every 2 units within the 1-to-5 range.",
  },
  {
    question: "What is the difference between day-of-month and day-of-week?",
    answer:
      "Day-of-month (field 3) specifies a calendar date (1–31), while day-of-week (field 5) specifies a named day (0 = Sunday, 6 = Saturday). If both are set to non-asterisk values, most cron implementations fire when either condition is true, not both. To target a specific weekday on a specific date, you often need additional application logic.",
  },
  {
    question: "Why is my scheduled GitHub Actions workflow not running?",
    answer:
      "Several reasons are common: the repository may have gone inactive (GitHub pauses schedules on repos with no activity for 60 days), the cron expression may be invalid, or the interval is shorter than 5 minutes. Workflows are also queued, so there can be delays of several minutes under high GitHub infrastructure load. Always validate your expression with a tool before committing.",
  },
];
