import {
  Activity,
  Clock,
  Copy,
  FileText,
  Gauge,
  ShieldCheck,
} from "lucide-react";

import ToolPage, { type ToolFeature } from "@/components/tools/ToolPage";
import ToolTable from "@/components/tools/ToolTable";
import WordCounter from "./WordCounter";
import { FAQS } from "./content";

const FEATURES: ToolFeature[] = [
  {
    title: "Live Counting",
    description:
      "Every statistic updates on each keystroke — there is no button to press.",
    icon: FileText,
  },
  {
    title: "Six Metrics",
    description:
      "Words, characters, characters without spaces, sentences, paragraphs, and reading time.",
    icon: Activity,
  },
  {
    title: "Reading Time",
    description:
      "Estimated at 200 words per minute, the average adult reading speed.",
    icon: Clock,
  },
  {
    title: "One-Click Copy",
    description: "Send the whole draft to your clipboard when you are done.",
    icon: Copy,
  },
  {
    title: "Handles Long Text",
    description:
      "A single tweet or a 50,000-word manuscript both count instantly.",
    icon: Gauge,
  },
  {
    title: "Completely Private",
    description:
      "Your text never leaves the browser. No server, no storage, no account.",
    icon: ShieldCheck,
  },
];

const PLATFORM_LIMIT_ROWS: (string | number)[][] = [
  ["Twitter / X", "280", "~50"],
  ["LinkedIn Post", "3,000", "~500"],
  ["Instagram Caption", "2,200", "~350"],
  ["Facebook Post", "63,206", "~10K"],
  ["TikTok Bio", "80", "~15"],
  ["YouTube Title", "100", "~15"],
  ["Email Subject", "60", "~8"],
  ["Meta Description", "160", "~25"],
];

export default function WordCounterPage() {
  return (
    <ToolPage
      id="word-counter"
      heading="Word Counter."
      intro="Paste or type below — words, characters, sentences, paragraphs, and reading time update as you write."
      explainer={{
        heading: "What is a word counter?",
        paragraphs: [
          "A word counter is a tool that measures the length of your text in multiple dimensions — words, characters, sentences, and paragraphs — in real time. Writers use it to hit platform character limits, estimate reading time, and verify essay or article lengths. Unlike a basic character count, a good word counter surfaces the metrics you actually need without switching tools.",
          "This tool counts everything client-side in your browser. Your text is never sent to a server, never stored, and never shared. Paste a 50,000-word document or a single tweet — it handles both instantly.",
        ],
      }}
      extra={
        <>
          <ToolTable
            heading="Platform character limits."
            description="Common limits worth checking your draft against before you publish."
            columns={["Platform", "Character limit", "Approx. words"]}
            rows={PLATFORM_LIMIT_ROWS}
          />
        </>
      }
      features={FEATURES}
      featuresDescription="Six live metrics over one textarea — enough to hit a limit, an essay length, or a reading time without a second tool."
      faqs={FAQS}
      faqTitle="Word Counter FAQ."
    >
      <WordCounter />
    </ToolPage>
  );
}
