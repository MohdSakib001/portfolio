import { Download, Eye, PenLine, Save, ShieldCheck, Zap } from "lucide-react";

import ToolPage, { type ToolFeature } from "@/components/tools/ToolPage";
import Notepad from "./Notepad";
import { FAQS } from "./content";

const FEATURES: ToolFeature[] = [
  {
    title: "Auto-Save",
    description:
      "Every keystroke persists to localStorage — close the tab and come back to it.",
    icon: PenLine,
  },
  {
    title: "Distraction-Free",
    description:
      "One blank page and your text. No toolbars, sidebars, or notifications.",
    icon: Save,
  },
  {
    title: "Export Anywhere",
    description:
      "Download as .txt or .md and take the note into any other editor.",
    icon: Download,
  },
  {
    title: "Live Word Count",
    description:
      "Keep an eye on length while drafting without leaving the page.",
    icon: Eye,
  },
  {
    title: "Instant Load",
    description:
      "No account check or network round-trip between opening and typing.",
    icon: Zap,
  },
  {
    title: "Stays On Device",
    description:
      "Notes never reach a server, so drafts and private notes stay yours.",
    icon: ShieldCheck,
  },
];

export default function NotepadPage() {
  return (
    <ToolPage
      id="notepad"
      heading="Notepad."
      intro="Auto-saves as you type. Export as .txt or .md. Nothing leaves your browser."
      explainer={{
        heading: "About this notepad.",
        paragraphs: [
          "This is a minimal, distraction-free notepad for quick notes, drafts, and writing. It automatically saves your text to your browser's localStorage as you type — no accounts, no servers, no sync. Close the tab and come back; your note will be waiting. Download as plain text or Markdown whenever you're done.",
        ],
      }}
      features={FEATURES}
      featuresDescription="A blank page that remembers itself — no login, no sync, no telemetry, no distractions."
      faqs={FAQS}
      faqTitle="Notepad FAQ."
    >
      <Notepad />
    </ToolPage>
  );
}
