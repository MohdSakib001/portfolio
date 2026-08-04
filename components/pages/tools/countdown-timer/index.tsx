import {
  Bell,
  CalendarClock,
  RefreshCw,
  Share2,
  ShieldCheck,
  Timer,
} from "lucide-react";

import ToolPage, { type ToolFeature } from "@/components/tools/ToolPage";
import CountdownTimer from "./CountdownTimer";
import { FAQS } from "./content";

const FEATURES: ToolFeature[] = [
  {
    title: "Live To The Second",
    description:
      "The display ticks in real time rather than recalculating only on reload.",
    icon: Timer,
  },
  {
    title: "Any Target Date",
    description:
      "Product launches, exam dates, birthdays, contract deadlines — any future moment works.",
    icon: CalendarClock,
  },
  {
    title: "Full Breakdown",
    description:
      "Remaining time split into days, hours, minutes, and seconds simultaneously.",
    icon: RefreshCw,
  },
  {
    title: "Survives Reload",
    description:
      "The target persists in your browser, so a refresh does not lose the countdown.",
    icon: Bell,
  },
  {
    title: "Zero Setup",
    description:
      "No sign-up, no email, no confirmation step — set a date and it starts.",
    icon: Share2,
  },
  {
    title: "Fully Private",
    description:
      "The date stays on your device. Nothing is transmitted or stored on a server.",
    icon: ShieldCheck,
  },
];

export default function CountdownTimerPage() {
  return (
    <ToolPage
      id="countdown-timer"
      heading="Countdown Timer."
      intro="Set any target date and watch the countdown tick live, down to the second."
      explainer={{
        heading: "What is a countdown timer?",
        paragraphs: [
          "A countdown timer counts down from a future date or time to the present moment, showing you exactly how much time remains in days, hours, minutes, and seconds. Countdowns create a sense of anticipation for upcoming events and help teams and individuals stay aware of approaching deadlines.",
        ],
      }}
      features={FEATURES}
      featuresDescription="A precise, always-live countdown to any moment you choose — no account, no notification permissions, no upsell."
      faqs={FAQS}
      faqTitle="Countdown Timer FAQ."
    >
      <CountdownTimer />
    </ToolPage>
  );
}
