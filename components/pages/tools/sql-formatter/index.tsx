import {
  AlignLeft,
  Copy,
  Highlighter,
  Minimize2,
  ShieldCheck,
  Table2,
} from "lucide-react";

import ToolPage, { type ToolFeature } from "@/components/tools/ToolPage";
import ToolTable from "@/components/tools/ToolTable";
import SqlFormatter from "./SqlFormatter";
import { FAQS } from "./content";

const FEATURES: ToolFeature[] = [
  {
    title: "Clause-Aware Indentation",
    description:
      "Newlines before each major clause, with conditions indented under it.",
    icon: Table2,
  },
  {
    title: "Keyword Casing",
    description:
      "Reserved words are uppercased so structure reads at a glance.",
    icon: AlignLeft,
  },
  {
    title: "One Column Per Line",
    description:
      "Long SELECT lists become scannable instead of wrapping arbitrarily.",
    icon: Minimize2,
  },
  {
    title: "Syntax Highlighting",
    description: "Keywords, strings, and numbers are coloured in the output.",
    icon: Highlighter,
  },
  {
    title: "Minify Mode",
    description: "Collapse a formatted query back to one compact line.",
    icon: Copy,
  },
  {
    title: "Never Transmitted",
    description:
      "Queries stay local — safe for schemas and production statements.",
    icon: ShieldCheck,
  },
];

const FORMATTING_RULES: (string | number)[][] = [
  ["Basic SELECT", "SELECT id, name, email FROM users WHERE active = 1"],
  [
    "JOIN query",
    "SELECT u.name, o.total FROM users u INNER JOIN orders o ON u.id = o.user_id",
  ],
  [
    "Aggregation",
    "SELECT department, COUNT(*) AS total, AVG(salary) FROM employees GROUP BY department HAVING COUNT(*) > 5",
  ],
  [
    "Subquery",
    "SELECT * FROM products WHERE price > (SELECT AVG(price) FROM products)",
  ],
  [
    "INSERT",
    "INSERT INTO logs (user_id, action, created_at) VALUES (42, 'login', NOW())",
  ],
  [
    "UPDATE",
    "UPDATE users SET last_login = NOW(), login_count = login_count + 1 WHERE id = 42",
  ],
];

export default function SqlFormatterPage() {
  return (
    <ToolPage
      id="sql-formatter"
      heading="SQL Formatter & Beautifier."
      intro="Format, highlight, and minify SQL — entirely in your browser."
      explainer={{
        heading: "What this tool does.",
        paragraphs: [
          "Paste any SQL query — minified API output, a one-liner from a log file, or a hand-written query with inconsistent spacing — and the formatter rewrites it with proper indentation, uppercased keywords, and newlines before each major clause. SELECT columns are listed one per line. WHERE conditions are indented under the clause. JOIN types stay at the left margin. Switch to Minify mode to do the reverse: collapse everything to a single compact line for use in code strings or API payloads.",
        ],
      }}
      extra={
        <>
          <ToolTable
            heading="Formatting rules."
            description="How each clause is treated when the formatter rewrites your query."
            columns={["Rule", "Example"]}
            rows={FORMATTING_RULES}
          />
        </>
      }
      features={FEATURES}
      featuresDescription="Readable SQL from any input — and a one-line minifier for when it has to go back into a code string."
      faqs={FAQS}
      faqTitle="SQL Formatter & Beautifier FAQ."
    >
      <SqlFormatter />
    </ToolPage>
  );
}
