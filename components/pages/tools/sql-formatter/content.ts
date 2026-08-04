import type { FaqItem } from "@/components/Faq";

/** Shared by the page's FAQPage JSON-LD and the rendered accordion. */
export const FAQS: FaqItem[] = [
  {
    question: "What does an SQL formatter do?",
    answer:
      "An SQL formatter takes raw or minified SQL queries and rewrites them with consistent indentation, line breaks, and keyword casing. This makes long queries readable at a glance: SELECT columns appear on separate lines, WHERE conditions are indented, and JOIN clauses are aligned at the left margin.",
  },
  {
    question: "Why should SQL keywords be uppercase?",
    answer:
      "The SQL standard does not require uppercase, but the convention is universal across database engines, documentation, and ORMs. Uppercase keywords (SELECT, FROM, WHERE) visually separate structural tokens from identifiers and string values, making it much easier to scan a query for its logical structure.",
  },
  {
    question: "Does formatting SQL change how the database executes it?",
    answer:
      "No. SQL is whitespace-insensitive. A minified single-line query and a beautifully formatted multi-line query produce identical query plans in every major database — PostgreSQL, MySQL, SQLite, SQL Server, and Oracle alike. Formatting is purely cosmetic.",
  },
  {
    question: "What is SQL minification?",
    answer:
      "Minification strips all unnecessary whitespace and comments from a query, collapsing it to a single line. This is useful when embedding SQL in code strings, transferring queries over the wire, or storing them in configuration files where whitespace is irrelevant and compactness matters.",
  },
  {
    question: "Is my SQL sent to any server?",
    answer:
      "No. This tool runs entirely in your browser using JavaScript. Your SQL never leaves your machine. There are no API calls, no logging, and no server-side processing of any kind.",
  },
  {
    question: "Which SQL dialects does this formatter support?",
    answer:
      "The formatter handles standard ANSI SQL constructs — SELECT, INSERT, UPDATE, DELETE, CREATE TABLE, JOIN types, GROUP BY, ORDER BY, HAVING, CASE/WHEN, and common aggregate functions. Dialect-specific syntax (PostgreSQL dollar-quoting, SQL Server square brackets, MySQL backticks) is preserved as-is without modification.",
  },
];
