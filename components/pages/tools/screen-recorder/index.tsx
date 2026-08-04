import {
  Download,
  Mic,
  MonitorPlay,
  ShieldCheck,
  Video,
  Zap,
} from "lucide-react";

import ToolPage, { type ToolFeature } from "@/components/tools/ToolPage";
import ToolTable from "@/components/tools/ToolTable";
import ToolNotes from "@/components/tools/ToolNotes";
import ScreenRecorder from "./ScreenRecorder";
import { FAQS } from "./content";

const FEATURES: ToolFeature[] = [
  {
    title: "Screen, Window, Or Tab",
    description: "Choose exactly what to capture when the recording starts.",
    icon: Video,
  },
  {
    title: "No Extension",
    description:
      "Uses the browser's built-in capture API — nothing to install.",
    icon: MonitorPlay,
  },
  {
    title: "Audio Capture",
    description:
      "Include system or microphone audio where the browser allows it.",
    icon: Mic,
  },
  {
    title: "Instant Download",
    description:
      "Save the recording the moment you stop, with no processing wait.",
    icon: Download,
  },
  {
    title: "No Time Limit",
    description: "No enforced cap, watermark, or upgrade prompt mid-recording.",
    icon: Zap,
  },
  {
    title: "Never Uploaded",
    description: "Footage is written locally — it never touches a server.",
    icon: ShieldCheck,
  },
];

const BROWSER_SUPPORT: (string | number)[][] = [
  ["Chrome", "72+", "Yes", "Full support — screen, window, tab"],
  ["Edge", "79+", "Yes", "Full support — Chromium-based"],
  ["Firefox", "66+", "Yes", "Screen and window — tab capture limited"],
  ["Safari", "—", "No", "Not supported — lacks getDisplayMedia"],
];

const PRIVACY_POINTS: { title: string; body: string }[] = [
  {
    title: "Nothing leaves your device",
    body: "The recorded video is processed entirely in your browser using Web APIs. It is never uploaded to any server.",
  },
  {
    title: "Browser permission required",
    body: "The browser shows an OS-level screen picker before recording begins. You choose exactly what is shared.",
  },
  {
    title: "Stored in memory only",
    body: "The recording is held as an in-memory Blob. Closing or refreshing the tab permanently deletes it.",
  },
  {
    title: "Download is local",
    body: "Clicking Download saves the file directly to your device. No third party is involved at any point.",
  },
];

export default function ScreenRecorderPage() {
  return (
    <ToolPage
      id="screen-recorder"
      heading="Screen Recorder."
      intro="Record your screen, a window, or a single tab directly in the browser — no extension, no sign-up."
      extra={
        <>
          <ToolTable
            heading="Browser support."
            description="Screen capture relies on the getDisplayMedia API. Support by browser:"
            columns={["Browser", "Version", "Supported", "Notes"]}
            rows={BROWSER_SUPPORT}
          />
          <ToolNotes
            heading="How your recording stays private."
            description="Why nothing you capture reaches a server."
            notes={PRIVACY_POINTS}
          />
        </>
      }
      features={FEATURES}
      featuresDescription="Native browser screen capture with no extension to install and no upload step between recording and saving."
      faqs={FAQS}
      faqTitle="Screen Recorder FAQ."
    >
      <ScreenRecorder />
    </ToolPage>
  );
}
