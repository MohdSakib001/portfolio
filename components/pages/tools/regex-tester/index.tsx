import {
  Braces,
  Flag,
  Highlighter,
  Replace,
  Search,
  ShieldCheck,
} from "lucide-react";

import ToolPage, { type ToolFeature } from "@/components/tools/ToolPage";
import ToolTable from "@/components/tools/ToolTable";
import RegexTester from "./RegexTester";
import { FAQS } from "./content";

const FEATURES: ToolFeature[] = [
  {
    title: "Live Highlighting",
    description:
      "Matches are highlighted in your test string as you edit the pattern.",
    icon: Search,
  },
  {
    title: "Capture Groups",
    description: "Every group is listed per match, numbered and named.",
    icon: Highlighter,
  },
  {
    title: "Flag Toggles",
    description:
      "Switch global, case-insensitive, multiline, and dotall independently.",
    icon: Braces,
  },
  {
    title: "Replace Mode",
    description: "Preview a substitution before running it anywhere real.",
    icon: Replace,
  },
  {
    title: "Pattern Library",
    description:
      "Start from tested expressions for email, URL, phone, and more.",
    icon: Flag,
  },
  {
    title: "Runs Locally",
    description:
      "Your test data never leaves the browser — safe for real samples.",
    icon: ShieldCheck,
  },
];

const PATTERN_LIBRARY: (string | number)[][] = [
  ["\\b[\\w.+-]+@[\\w-]+\\.[\\w.]+\\b", "Email address", "gi"],
  ["https?:\\/\\/[^\\s]+", "URL", "gi"],
  [
    "\\+?1?[-.\\s]?\\(?[2-9]\\d{2}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}",
    "Phone (US)",
    "g",
  ],
  ["\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b", "IPv4 address", "g"],
  [
    "\\b\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])\\b",
    "Date (YYYY-MM-DD)",
    "g",
  ],
  ["#(?:[0-9a-fA-F]{3}){1,2}\\b", "Hex colour", "g"],
  ["<[^>]+>", "HTML tag", "gi"],
  ["^\\s*$", "Whitespace only lines", "gm"],
];

export default function RegexTesterPage() {
  return (
    <ToolPage
      id="regex-tester"
      heading="Regex Tester."
      intro="Live match highlighting, flags, capture groups, and replace mode."
      extra={
        <>
          <ToolTable
            heading="Common patterns."
            description="Ready-made expressions for the validations that come up most often."
            columns={["Pattern", "Matches", "Flags"]}
            rows={PATTERN_LIBRARY}
            monoFirst
          />
        </>
      }
      features={FEATURES}
      featuresDescription="See what your expression actually matches as you type it, including every capture group and a live replace preview."
      faqs={FAQS}
      faqTitle="Regex Tester FAQ."
    >
      <RegexTester />
    </ToolPage>
  );
}
