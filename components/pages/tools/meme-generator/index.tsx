import {
  Download,
  Palette,
  ShieldCheck,
  Smile,
  Type,
  Upload,
} from "lucide-react";

import ToolPage, { type ToolFeature } from "@/components/tools/ToolPage";
import ToolNotes from "@/components/tools/ToolNotes";
import MemeGenerator from "./MemeGenerator";
import { FAQS } from "./content";

const FEATURES: ToolFeature[] = [
  {
    title: "Built-In Templates",
    description:
      "Start from the classic formats without hunting for a base image.",
    icon: Smile,
  },
  {
    title: "Upload Your Own",
    description: "Use any image from your device as the background.",
    icon: Upload,
  },
  {
    title: "Top And Bottom Text",
    description:
      "The classic layout, with the outlined Impact styling applied.",
    icon: Type,
  },
  {
    title: "Font Controls",
    description: "Adjust size and colour so long captions still fit the frame.",
    icon: Palette,
  },
  {
    title: "PNG Export",
    description: "Download at full resolution with no watermark.",
    icon: Download,
  },
  {
    title: "Stays On Device",
    description: "Uploaded images are processed locally and never stored.",
    icon: ShieldCheck,
  },
];

const MEME_TIPS: { title: string; body: string }[] = [
  {
    title: "Keep It Short",
    body: "The best meme text is punchy. Six words or fewer per line lands harder than a full sentence.",
  },
  {
    title: "Use Impact Font",
    body: "Impact with a black outline is the classic meme look. It stays readable on any background.",
  },
  {
    title: "ALL CAPS Hits Harder",
    body: "Capitalize everything for dramatic effect — the internet has accepted this as meme law.",
  },
  {
    title: "Match the Template",
    body: "Know your meme. The text should connect to the original context for the joke to land.",
  },
  {
    title: "Rule of Contrast",
    body: "Light text on dark images, dark text on light. The outline toggle handles most cases for you.",
  },
  {
    title: "Think in Squares",
    body: "Most memes go to Instagram or Twitter. A near-square canvas ratio compresses and previews best.",
  },
];

export default function MemeGeneratorPage() {
  return (
    <ToolPage
      id="meme-generator"
      heading="Meme Generator."
      intro="Pick a template or upload your own image, add top and bottom text, then download as PNG."
      extra={
        <>
          <ToolNotes
            heading="Tips for better memes."
            description="Small choices that decide whether a meme lands or falls flat."
            notes={MEME_TIPS}
          />
        </>
      }
      features={FEATURES}
      featuresDescription="Canvas-rendered memes with the classic styling built in — and your uploads never leave the browser."
      faqs={FAQS}
      faqTitle="Meme Generator FAQ."
    >
      <MemeGenerator />
    </ToolPage>
  );
}
