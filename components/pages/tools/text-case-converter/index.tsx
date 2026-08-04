import { Code2, Copy, FileText, Layers, ShieldCheck, Type } from "lucide-react";

import ToolPage, { type ToolFeature } from "@/components/tools/ToolPage";
import ToolTable from "@/components/tools/ToolTable";
import TextCaseConverter from "./TextCaseConverter";
import { FAQS } from "./content";

const FEATURES: ToolFeature[] = [
  {
    title: "Eight Formats",
    description:
      "Upper, lower, Title, Sentence, camel, Pascal, snake, and kebab together.",
    icon: Type,
  },
  {
    title: "All At Once",
    description:
      "Every conversion renders simultaneously rather than one at a time.",
    icon: Layers,
  },
  {
    title: "Developer Naming",
    description:
      "Move variable names between language conventions without retyping them.",
    icon: Code2,
  },
  {
    title: "Per-Format Copy",
    description: "Each result has its own one-click copy button.",
    icon: Copy,
  },
  {
    title: "Any Length",
    description: "Works on a single word or an entire pasted document.",
    icon: FileText,
  },
  {
    title: "Stays Local",
    description:
      "Conversion runs in the browser — nothing is uploaded or retained.",
    icon: ShieldCheck,
  },
];

const CASE_REFERENCE: (string | number)[][] = [
  [
    "UPPERCASE",
    "HELLO WORLD",
    "Titles, acronyms, emphasis in headings, constants in code",
  ],
  [
    "lowercase",
    "hello world",
    "URLs, email addresses, CSS class names, database fields",
  ],
  [
    "Title Case",
    "Hello World",
    "Article headlines, book titles, product names, SEO page titles",
  ],
  [
    "Sentence case",
    "Hello world",
    "Normal prose, email subjects, form labels, meta descriptions",
  ],
  [
    "camelCase",
    "helloWorld",
    "JavaScript variables, JSON keys, function names in most languages",
  ],
  [
    "PascalCase",
    "HelloWorld",
    "Class names, React components, TypeScript interfaces, constructors",
  ],
  [
    "snake_case",
    "hello_world",
    "Python variables, database columns, file names, Ruby methods",
  ],
  [
    "kebab-case",
    "hello-world",
    "HTML attributes, CSS classes, URL slugs, npm package names",
  ],
];

export default function TextCaseConverterPage() {
  return (
    <ToolPage
      id="text-case-converter"
      heading="Text Case Converter."
      intro="Type or paste below — all eight case formats update instantly."
      explainer={{
        heading: "What is a text case converter?",
        paragraphs: [
          "A text case converter transforms a string of text into different capitalisation formats — UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, and kebab-case. Writers use it to fix accidental caps-lock text, format headlines, or normalise copy. Developers use it to convert variable names between the naming conventions of different languages without retyping.",
          "This tool runs entirely in your browser. Paste a word, a sentence, or an entire document and all eight conversions appear simultaneously. Nothing is sent to any server.",
        ],
      }}
      extra={
        <>
          <ToolTable
            heading="The eight case formats."
            description="What each format looks like and where it is normally used."
            columns={["Case", "Example", "Typical use"]}
            rows={CASE_REFERENCE}
          />
        </>
      }
      features={FEATURES}
      featuresDescription="Every case format at once, so you pick the right one instead of converting and re-converting."
      faqs={FAQS}
      faqTitle="Text Case Converter FAQ."
    >
      <TextCaseConverter />
    </ToolPage>
  );
}
