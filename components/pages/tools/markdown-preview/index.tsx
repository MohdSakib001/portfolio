import {
  Columns2,
  Download,
  FileCode,
  ListChecks,
  ShieldCheck,
  Table2,
} from "lucide-react";

import ToolPage, { type ToolFeature } from "@/components/tools/ToolPage";
import ToolTable from "@/components/tools/ToolTable";
import MarkdownPreview from "./MarkdownPreview";
import { FAQS } from "./content";

const FEATURES: ToolFeature[] = [
  {
    title: "Split-Pane Editing",
    description:
      "Source on the left, rendered output on the right, updating live.",
    icon: FileCode,
  },
  {
    title: "GitHub Flavored",
    description:
      "Tables, task lists, strikethrough, and fenced code blocks all supported.",
    icon: Columns2,
  },
  {
    title: "Code Blocks",
    description:
      "Fenced blocks render with formatting preserved for pasting into docs.",
    icon: Table2,
  },
  {
    title: "Task Lists",
    description: "Checkbox syntax renders the way it does in a README.",
    icon: ListChecks,
  },
  {
    title: "Export Output",
    description: "Take the rendered result or the raw source away with you.",
    icon: Download,
  },
  {
    title: "Stays Private",
    description: "Your document is never uploaded, stored, or logged.",
    icon: ShieldCheck,
  },
];

const SYNTAX_CHEATSHEET: (string | number)[][] = [
  ["# Heading 1", "Largest heading (H1)"],
  ["## Heading 2", "Second-level heading (H2)"],
  ["**bold**", "Bold text"],
  ["*italic*", "Italic text"],
  ["~~strikethrough~~", "Strikethrough text"],
  ["`inline code`", "Inline code span"],
  ["```lang\\ncode\\n```", "Fenced code block"],
  ["> blockquote", "Block quotation"],
  ["- item", "Unordered list item"],
  ["1. item", "Ordered list item"],
  ["[text](url)", "Hyperlink"],
  ["![alt](url)", "Image"],
  ["---", "Horizontal rule"],
  ["| col | col |\\n|---|---|", "Table (GFM)"],
];

export default function MarkdownPreviewPage() {
  return (
    <ToolPage
      id="markdown-preview"
      heading="Markdown Preview."
      intro="Write on the left, see rendered HTML on the right — GFM tables, fenced code blocks, links, images, and more."
      extra={
        <>
          <ToolTable
            heading="Markdown cheatsheet."
            description="The syntax this editor supports, and what each form renders as."
            columns={["Syntax", "Renders as"]}
            rows={SYNTAX_CHEATSHEET}
            monoFirst
          />
        </>
      }
      features={FEATURES}
      featuresDescription="A split-pane editor with GitHub Flavored Markdown support, rendering as you type with nothing sent to a server."
      faqs={FAQS}
      faqTitle="Markdown Preview FAQ."
    >
      <MarkdownPreview />
    </ToolPage>
  );
}
