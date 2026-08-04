import {
  BadgeCheck,
  BookOpen,
  CalendarClock,
  Copy,
  Eye,
  ShieldCheck,
} from "lucide-react";

import ToolPage, { type ToolFeature } from "@/components/tools/ToolPage";
import ToolTable from "@/components/tools/ToolTable";
import CronBuilder from "./CronBuilder";
import { FAQS } from "./content";

const FEATURES: ToolFeature[] = [
  {
    title: "Plain-English Preview",
    description: "Every expression is described in words as you build it.",
    icon: CalendarClock,
  },
  {
    title: "Field-By-Field",
    description:
      "Set minute, hour, day, month, and weekday without memorising the order.",
    icon: Eye,
  },
  {
    title: "Live Validation",
    description: "Out-of-range and malformed fields are flagged immediately.",
    icon: BadgeCheck,
  },
  {
    title: "Pattern Library",
    description: "Twelve common schedules ready to copy or apply.",
    icon: BookOpen,
  },
  {
    title: "Platform Ready",
    description:
      "Output works for n8n, GitHub Actions, and Linux crontab alike.",
    icon: Copy,
  },
  {
    title: "Fully Offline",
    description: "Parsing and validation happen entirely in your browser.",
    icon: ShieldCheck,
  },
];

const SYNTAX_REFERENCE: (string | number)[][] = [
  ["Minute", "0–59", "* , - /"],
  ["Hour", "0–23", "* , - /"],
  ["Day of Month", "1–31", "* , - / L W"],
  ["Month", "1–12", "* , - /"],
  ["Day of Week", "0–6", "* , - / L #"],
];

const COMMON_PATTERNS: (string | number)[][] = [
  ["* * * * *", "Every minute", "Runs once per minute, all day"],
  ["*/5 * * * *", "Every 5 minutes", "Common for monitoring checks"],
  ["*/15 * * * *", "Every 15 minutes", "Quarter-hourly polling"],
  ["0 * * * *", "Hourly", "Runs at the start of every hour"],
  ["0 0 * * *", "Daily at midnight", "Common for nightly cleanup jobs"],
  ["0 9 * * *", "Daily at 9am", "Weekday morning report"],
  ["0 9 * * 1-5", "Weekdays at 9am", "Mon–Fri business-hours trigger"],
  ["0 12 * * 0,6", "Weekends at noon", "Sat & Sun at 12:00"],
  ["0 0 1 * *", "First of each month", "Monthly billing or rollup"],
  ["0 0 * * 0", "Every Sunday midnight", "Weekly reset or report"],
  ["0 9,17 * * *", "Twice daily", "9am and 5pm every day"],
  ["0 */6 * * *", "Every 6 hours", "Runs at 0, 6, 12, 18"],
];

export default function CronBuilderPage() {
  return (
    <ToolPage
      id="cron-builder"
      heading="Cron Expression Builder."
      intro="Build, validate, and understand cron expressions for n8n, GitHub Actions, and Linux crontab."
      extra={
        <>
          <ToolTable
            heading="Cron syntax reference."
            description="A cron expression reads left to right: minute, hour, day of month, month, day of week."
            columns={["Field", "Allowed range", "Special characters"]}
            rows={SYNTAX_REFERENCE}
          />
          <ToolTable
            heading="Common cron patterns."
            description="Click any expression in the builder above to apply it, or copy one from here."
            columns={["Expression", "Pattern", "What it does"]}
            rows={COMMON_PATTERNS}
            monoFirst
          />
        </>
      }
      features={FEATURES}
      featuresDescription="Write the expression and read back what it actually does — before it silently runs at the wrong hour in production."
      faqs={FAQS}
      faqTitle="Cron Expression Builder FAQ."
    >
      <CronBuilder />
    </ToolPage>
  );
}
