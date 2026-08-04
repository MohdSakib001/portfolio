import {
  BadgeCheck,
  Braces,
  Copy,
  GitCompare,
  Minimize2,
  ShieldCheck,
} from "lucide-react";

import ToolPage, { type ToolFeature } from "@/components/tools/ToolPage";
import JsonFormatter from "./JsonFormatter";
import { FAQS } from "./content";

const FEATURES: ToolFeature[] = [
  {
    title: "Pretty Printing",
    description:
      "Turns minified single-line API responses into indented, readable, highlighted JSON.",
    icon: Braces,
  },
  {
    title: "Inline Validation",
    description:
      "Invalid JSON reports the exact syntax problem and where it occurs.",
    icon: BadgeCheck,
  },
  {
    title: "Minify Mode",
    description:
      "Strips all whitespace to the most compact representation for smaller payloads.",
    icon: Minimize2,
  },
  {
    title: "Side-By-Side Diff",
    description:
      "Paste two objects and see changed lines highlighted between A and B.",
    icon: GitCompare,
  },
  {
    title: "One-Click Copy",
    description: "Copy formatted or minified output straight to the clipboard.",
    icon: Copy,
  },
  {
    title: "Nothing Transmitted",
    description:
      "Parsing happens in your browser — safe for tokens, payloads, and internal APIs.",
    icon: ShieldCheck,
  },
];

export default function JsonFormatterPage() {
  return (
    <ToolPage
      id="json-formatter"
      heading="JSON Formatter & Diff."
      intro="Format, validate, minify, and diff JSON — all in your browser."
      explainer={{
        heading: "What you can do with this tool.",
        paragraphs: [
          "This JSON tool covers the three most common tasks when working with JSON data. The formatter (Pretty mode) takes any valid JSON — even minified, single-line API responses — and returns it as properly indented, readable text with syntax highlighting. Minify mode does the reverse. Diff mode makes it easy to compare two API responses and immediately see what fields changed.",
        ],
      }}
      features={FEATURES}
      featuresDescription="Pretty-print, validate, minify, and diff — the everyday JSON operations in one pass, with no payload leaving the tab."
      faqs={FAQS}
      faqTitle="JSON Formatter & Diff FAQ."
    >
      <JsonFormatter />
    </ToolPage>
  );
}
