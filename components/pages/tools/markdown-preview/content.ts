import type { FaqItem } from "@/components/Faq";

/** Shared by the page's FAQPage JSON-LD and the rendered accordion. */
export const FAQS: FaqItem[] = [
  {
    question: "What is Markdown?",
    answer:
      "Markdown is a lightweight markup language created by John Gruber in 2004. It uses plain text formatting syntax that converts to HTML. Writers use it for documentation, README files, blog posts, and notes because it's easy to read in raw form and renders cleanly to HTML.",
  },
  {
    question: "What is GitHub Flavored Markdown (GFM)?",
    answer:
      "GitHub Flavored Markdown (GFM) is a dialect of Markdown created by GitHub. It extends standard Markdown with tables, fenced code blocks with syntax highlighting hints, strikethrough text, and task list items. This tool supports GFM features including tables and fenced code blocks.",
  },
  {
    question: "How do I create a table in Markdown?",
    answer:
      "Use pipe characters to define columns and a row of dashes to separate the header from the body. Example: | Name | Age | on the first line, | --- | --- | on the second, then data rows. At least three dashes are required in each separator cell.",
  },
  {
    question: "How do I add a code block in Markdown?",
    answer:
      "Use triple backticks (```) before and after your code. Optionally add a language name after the opening backticks for syntax highlighting hints, for example ```javascript. For inline code, wrap the text in single backticks like `code`.",
  },
  {
    question: "What's the difference between * and ** in Markdown?",
    answer:
      "A single asterisk (*text*) or underscore (_text_) makes text italic. Double asterisks (**text**) or double underscores (__text__) make it bold. You can combine them — ***text*** or **_text_** — for bold italic.",
  },
  {
    question: "Can I use this tool to convert Markdown to HTML?",
    answer:
      "Yes. Click the 'Copy HTML' button in the toolbar to copy the rendered HTML to your clipboard. This gives you the full HTML output of your Markdown, which you can paste directly into any HTML file or CMS.",
  },
];
