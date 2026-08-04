import {
  CalendarClock,
  Clock,
  Globe,
  Moon,
  ShieldCheck,
  Users,
} from "lucide-react";

import ToolPage, { type ToolFeature } from "@/components/tools/ToolPage";
import TimezoneConverter from "./TimezoneConverter";
import { FAQS } from "./content";

const FEATURES: ToolFeature[] = [
  {
    title: "Cities At A Glance",
    description:
      "Track multiple locations at once instead of converting them one by one.",
    icon: Globe,
  },
  {
    title: "Live Current Time",
    description: "Each city ticks in real time so the view is never stale.",
    icon: Clock,
  },
  {
    title: "Convert Any Moment",
    description:
      "Pick a specific date and time and see it resolved across every zone.",
    icon: CalendarClock,
  },
  {
    title: "Nighttime Awareness",
    description:
      "Spot unsociable hours immediately before proposing a meeting slot.",
    icon: Moon,
  },
  {
    title: "DST Handled",
    description:
      "Backed by the browser's IANA timezone data, so daylight saving is already correct.",
    icon: Users,
  },
  {
    title: "Fully Client-Side",
    description:
      "No location lookup, no account, and no record of the cities you track.",
    icon: ShieldCheck,
  },
];

export default function TimezoneConverterPage() {
  return (
    <ToolPage
      id="timezone-converter"
      heading="Time Zone Converter."
      intro="See the current time in cities worldwide — or convert any date and time across zones instantly."
      explainer={{
        heading: "Why use a time zone converter?",
        paragraphs: [
          "Time zone differences cause genuine problems — missed meetings, late-night calls, and scheduling confusion are all common when teams or families span multiple continents. A time zone converter gives you a single, reliable view of what time it is everywhere that matters to you. Instead of searching “what time is it in Tokyo right now” for every interaction, you can glance at all relevant cities at once, spot nighttime windows at a glance, and make decisions with confidence. For remote workers, freelancers, and anyone with international relationships, it is an indispensable daily utility.",
        ],
      }}
      features={FEATURES}
      featuresDescription="Every city you care about on one screen, with daylight saving handled by the browser's own timezone database."
      faqs={FAQS}
      faqTitle="Time Zone Converter FAQ."
    >
      <TimezoneConverter />
    </ToolPage>
  );
}
