import {
  Bell,
  ListChecks,
  RefreshCw,
  ShieldCheck,
  Sliders,
  Timer,
} from "lucide-react";

import ToolPage, { type ToolFeature } from "@/components/tools/ToolPage";
import ToolNotes from "@/components/tools/ToolNotes";
import PomodoroTimer from "./PomodoroTimer";
import { FAQS } from "./content";

const FEATURES: ToolFeature[] = [
  {
    title: "Full Cycle",
    description:
      "Work, short break, and long break rotate automatically after four sessions.",
    icon: Timer,
  },
  {
    title: "Session Tracking",
    description:
      "See how many pomodoros you have completed in the current run.",
    icon: RefreshCw,
  },
  {
    title: "Audible Alert",
    description:
      "A sound marks each transition so you can look away from the screen.",
    icon: Bell,
  },
  {
    title: "Custom Durations",
    description:
      "Adjust work and break lengths if 25/5 does not fit your rhythm.",
    icon: ListChecks,
  },
  {
    title: "Runs In A Tab",
    description: "No install, no extension, and no account to start a session.",
    icon: Sliders,
  },
  {
    title: "Nothing Tracked",
    description: "Your sessions are not logged, synced, or sent anywhere.",
    icon: ShieldCheck,
  },
];

const TECHNIQUE: { title: string; body: string }[] = [
  {
    title: "Choose a task",
    body: "Pick one specific task you want to complete. Write it down if it helps.",
  },
  {
    title: "Set the timer",
    body: "Start a 25-minute focus session. No interruptions — phones off, notifications off.",
  },
  {
    title: "Work until the bell",
    body: "Work exclusively on the task until the chime sounds. Don't stop early.",
  },
  {
    title: "Short break",
    body: "Take 5 minutes away from your screen. Walk around, stretch, get water.",
  },
  {
    title: "Repeat × 4",
    body: "After 4 pomodoros, take a longer 15–30 minute break to recover properly.",
  },
  {
    title: "Track your sessions",
    body: "Count completed sessions to estimate task effort for future planning.",
  },
];

export default function PomodoroTimerPage() {
  return (
    <ToolPage
      id="pomodoro-timer"
      heading="Pomodoro Timer."
      intro="Focus for 25 minutes. Break for 5. Long break every four sessions."
      extra={
        <>
          <ToolNotes
            heading="The Pomodoro technique."
            description="The six-step cycle the timer is built around."
            notes={TECHNIQUE}
            numbered
          />
        </>
      }
      features={FEATURES}
      featuresDescription="The full cycle handled for you — work, short break, long break — so the only decision left is what to work on."
      faqs={FAQS}
      faqTitle="Pomodoro Timer FAQ."
    >
      <PomodoroTimer />
    </ToolPage>
  );
}
