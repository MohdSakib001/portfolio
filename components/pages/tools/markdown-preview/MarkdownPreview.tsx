"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Check, Copy, Download } from "lucide-react";

type ViewMode = "split" | "editor" | "preview";

const SAMPLE_MARKDOWN = `# Markdown Preview

Welcome to the **Markdown Preview** tool — a split-pane writing studio.

## Features

This tool renders *GitHub Flavored Markdown* in real time. Here's what it supports:

### Inline Formatting

You can write **bold text**, *italic text*, ~~strikethrough~~, and \`inline code\` all on the same line. You can also combine them: **_bold italic_**.

### Links and Images

Visit [mohdsakib.vercel.app](https://mohdsakib.vercel.app) for more tools.

![Alt text](https://placehold.co/600x200/f4eddA/1c1b18?text=Markdown+Preview)

### Blockquote

> "The scariest moment is always just before you start."
> — Stephen King

### Code Block

\`\`\`javascript
function parseMarkdown(input) {
  return input
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}
\`\`\`

### Lists

Unordered:

- Writing tools
- Developer utilities
- Calculators
- Productivity apps

Ordered:

1. Write your markdown
2. See the live preview
3. Copy or download

### Horizontal Rule

---

### Table

| Syntax     | Description          | Example        |
|------------|----------------------|----------------|
| \`# H1\`    | Heading level 1      | Big title      |
| \`**bold**\`| Bold text            | **bold**       |
| \`*italic*\`| Italic text          | *italic*       |
| \`\`code\`\`  | Inline code          | \`code\`         |
| \`> quote\` | Blockquote           | > quote        |

---

Start editing this document or paste your own markdown on the left.
`;

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Blocks `javascript:`/`data:` URLs before they reach an href or src. The
 * markdown is the visitor's own, but it is routinely pasted from elsewhere.
 */
function safeUrl(raw: string): string {
  const trimmed = raw.trim();
  if (/^(https?:|mailto:|#|\/|\.)/i.test(trimmed)) return escapeHtml(trimmed);
  return "#";
}

function parseMarkdown(raw: string): string {
  const lines = raw.split("\n");
  const out: string[] = [];
  let i = 0;

  const parseInline = (text: string): string => {
    return text
      .replace(
        /!\[([^\]]*)\]\(([^)]+)\)/g,
        (_, alt, src) =>
          `<img src="${safeUrl(src)}" alt="${escapeHtml(alt)}" style="max-width:100%;border-radius:12px;" />`,
      )
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        (_, label, href) =>
          `<a href="${safeUrl(href)}" target="_blank" rel="noopener noreferrer" style="color:#1c1b18;text-decoration:underline;text-underline-offset:3px;text-decoration-color:rgba(0,0,0,0.3);">${escapeHtml(label)}</a>`,
      )
      .replace(/~~(.+?)~~/g, (_, t) => `<del>${escapeHtml(t)}</del>`)
      .replace(
        /\*\*\*(.+?)\*\*\*/g,
        (_, t) => `<strong><em>${escapeHtml(t)}</em></strong>`,
      )
      .replace(
        /_\*\*(.+?)\*\*_/g,
        (_, t) => `<em><strong>${escapeHtml(t)}</strong></em>`,
      )
      .replace(/\*\*(.+?)\*\*/g, (_, t) => `<strong>${escapeHtml(t)}</strong>`)
      .replace(/__(.+?)__/g, (_, t) => `<strong>${escapeHtml(t)}</strong>`)
      .replace(/\*(.+?)\*/g, (_, t) => `<em>${escapeHtml(t)}</em>`)
      .replace(/_(.+?)_/g, (_, t) => `<em>${escapeHtml(t)}</em>`)
      .replace(
        /`([^`]+)`/g,
        (_, t) =>
          `<code style="background:rgba(0,0,0,0.05);padding:2px 6px;border-radius:5px;font-family:var(--font-geist-mono),monospace;font-size:0.86em;">${escapeHtml(t)}</code>`,
      );
  };

  const isTableRow = (line: string) => /^\|.+\|$/.test(line.trim());
  const isTableSep = (line: string) => /^\|[\s|:-]+\|$/.test(line.trim());

  while (i < lines.length) {
    const line = lines[i];

    if (/^#{1,6}\s/.test(line)) {
      const level = line.match(/^(#{1,6})\s/)![1].length;
      const text = line.slice(level + 1).trim();
      const sizes: Record<number, string> = { 1: "2em", 2: "1.5em", 3: "1.25em", 4: "1.1em", 5: "1em", 6: "0.9em" };
      const weights: Record<number, string> = { 1: "600", 2: "600", 3: "600", 4: "600", 5: "600", 6: "600" };
      const margins: Record<number, string> = { 1: "1.5em 0 0.6em", 2: "1.3em 0 0.5em", 3: "1.1em 0 0.4em", 4: "0.9em 0 0.35em", 5: "0.8em 0 0.3em", 6: "0.7em 0 0.25em" };
      out.push(
        `<h${level} style="font-size:${sizes[level]};font-weight:${weights[level]};margin:${margins[level]};line-height:1.25;letter-spacing:-0.01em;color:#000;">${parseInline(text)}</h${level}>`,
      );
      i++;
      continue;
    }

    if (/^(`{3,}|~{3,})/.test(line)) {
      const fence = line.match(/^(`{3,}|~{3,})/)![1];
      const lang = line.slice(fence.length).trim();
      i++;
      const codeLines: string[] = [];
      while (i < lines.length && !lines[i].startsWith(fence)) {
        codeLines.push(lines[i]);
        i++;
      }
      i++;
      out.push(
        `<pre style="background:#fcfbfa;border:1px solid rgba(0,0,0,0.08);color:#1c1b18;padding:16px 20px;border-radius:14px;overflow-x:auto;margin:1em 0;font-size:0.85em;line-height:1.7;font-family:var(--font-geist-mono),monospace;"><code class="language-${escapeHtml(lang)}">${escapeHtml(codeLines.join("\n"))}</code></pre>`,
      );
      continue;
    }

    if (/^(---|\*\*\*|___)\s*$/.test(line)) {
      out.push(
        `<hr style="border:none;border-top:1px solid rgba(0,0,0,0.1);margin:1.75em 0;" />`,
      );
      i++;
      continue;
    }

    if (/^>\s?/.test(line)) {
      const bqLines: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        bqLines.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      out.push(
        `<blockquote style="border-left:2px solid rgba(0,0,0,0.5);margin:1.25em 0;padding:4px 0 4px 18px;color:rgba(0,0,0,0.55);font-style:italic;">${bqLines.map(parseInline).join("<br />")}</blockquote>`,
      );
      continue;
    }

    if (isTableRow(line) && i + 1 < lines.length && isTableSep(lines[i + 1])) {
      const headers = line.trim().replace(/^\||\|$/g, "").split("|").map((h) => h.trim());
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && isTableRow(lines[i])) {
        rows.push(lines[i].trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim()));
        i++;
      }
      const thCells = headers
        .map(
          (h) =>
            `<th style="padding:10px 14px;text-align:left;font-weight:600;font-size:0.78em;letter-spacing:0.12em;text-transform:uppercase;color:rgba(0,0,0,0.4);border-bottom:1px solid rgba(0,0,0,0.1);white-space:nowrap;">${parseInline(h)}</th>`,
        )
        .join("");
      const trRows = rows
        .map((row) => {
          const tds = row
            .map(
              (c, ci) =>
                `<td style="padding:10px 14px;border-bottom:1px solid rgba(0,0,0,0.05);">${parseInline(ci < headers.length ? c : "")}</td>`,
            )
            .join("");
          return `<tr>${tds}</tr>`;
        })
        .join("");
      out.push(
        `<div style="overflow-x:auto;margin:1.25em 0;"><table style="width:100%;border-collapse:collapse;font-size:0.9em;"><thead><tr>${thCells}</tr></thead><tbody>${trRows}</tbody></table></div>`,
      );
      continue;
    }

    if (/^[\-\*\+]\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[\-\*\+]\s/.test(lines[i])) {
        items.push(
          `<li style="margin:0.3em 0;">${parseInline(lines[i].replace(/^[\-\*\+]\s/, ""))}</li>`,
        );
        i++;
      }
      out.push(`<ul style="padding-left:1.4em;margin:0.85em 0;">${items.join("")}</ul>`);
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(
          `<li style="margin:0.3em 0;">${parseInline(lines[i].replace(/^\d+\.\s/, ""))}</li>`,
        );
        i++;
      }
      out.push(`<ol style="padding-left:1.4em;margin:0.85em 0;">${items.join("")}</ol>`);
      continue;
    }

    if (line.trim() === "") {
      out.push("");
      i++;
      continue;
    }

    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !/^#{1,6}\s/.test(lines[i]) &&
      !/^(`{3,}|~{3,})/.test(lines[i]) &&
      !/^(---|\*\*\*|___)\s*$/.test(lines[i]) &&
      !/^>\s?/.test(lines[i]) &&
      !/^[\-\*\+]\s/.test(lines[i]) &&
      !/^\d+\.\s/.test(lines[i]) &&
      !isTableRow(lines[i])
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length > 0) {
      out.push(
        `<p style="margin:0.85em 0;line-height:1.8;">${parseInline(paraLines.join(" "))}</p>`,
      );
    }
  }

  const html = out.join("\n");
  return html.replace(/<script[\s\S]*?<\/script>/gi, "");
}

const VIEW_MODES: { key: ViewMode; label: string }[] = [
  { key: "split", label: "Split" },
  { key: "editor", label: "Editor" },
  { key: "preview", label: "Preview" },
];

export default function MarkdownPreview() {
  const [markdown, setMarkdown] = useState(SAMPLE_MARKDOWN);
  const [view, setView] = useState<ViewMode>("split");
  const [copied, setCopied] = useState<"md" | "html" | null>(null);

  const html = useMemo(() => parseMarkdown(markdown), [markdown]);

  const wordCount = useMemo(() => {
    const text = markdown.replace(/[#*`>~_\[\]()!|]/g, " ").trim();
    return text ? text.split(/\s+/).filter(Boolean).length : 0;
  }, [markdown]);

  const readingTime = useMemo(
    () => Math.max(1, Math.ceil(wordCount / 200)),
    [wordCount],
  );

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(null), 1800);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleCopy = useCallback(
    async (type: "md" | "html") => {
      try {
        await navigator.clipboard.writeText(type === "md" ? markdown : html);
        setCopied(type);
      } catch {
        setCopied(null);
      }
    },
    [markdown, html],
  );

  const handleDownload = useCallback(() => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.md";
    a.click();
    URL.revokeObjectURL(url);
  }, [markdown]);

  const showEditor = view === "split" || view === "editor";
  const showPreview = view === "split" || view === "preview";

  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-4xl bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_4px_24px_rgba(0,0,0,0.04)]">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 border-b border-black/8 bg-[#fcfbfa] px-5 py-4">
          <div className="mr-auto flex items-center gap-3">
            <p className="text-label font-semibold uppercase tracking-[0.16em] text-black/40">
              Markdown
            </p>
            <p className="font-mono text-caption text-black/35 tabular-nums">
              {wordCount.toLocaleString()} words · ~{readingTime} min read
            </p>
          </div>

          <div className="flex items-center gap-1 rounded-full bg-black/[0.05] p-1">
            {VIEW_MODES.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setView(key)}
                aria-pressed={view === key}
                className={`rounded-full px-3.5 py-1.5 text-label font-semibold uppercase tracking-[0.12em] transition duration-150 ${
                  view === key
                    ? "bg-black text-white"
                    : "text-black/45 hover:text-black"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => handleCopy("md")}
              className="inline-flex items-center gap-1.5 rounded-full bg-black/[0.04] px-3.5 py-2 text-label font-semibold uppercase tracking-[0.12em] text-black/45 transition duration-150 hover:bg-black/[0.08] hover:text-black"
            >
              {copied === "md" ? <Check size={11} /> : <Copy size={11} />}
              MD
            </button>
            <button
              type="button"
              onClick={() => handleCopy("html")}
              className="inline-flex items-center gap-1.5 rounded-full bg-black/[0.04] px-3.5 py-2 text-label font-semibold uppercase tracking-[0.12em] text-black/45 transition duration-150 hover:bg-black/[0.08] hover:text-black"
            >
              {copied === "html" ? <Check size={11} /> : <Copy size={11} />}
              HTML
            </button>
            <button
              type="button"
              onClick={handleDownload}
              title="Download as .md"
              className="inline-flex items-center gap-1.5 rounded-full bg-black px-3.5 py-2 text-label font-semibold uppercase tracking-[0.12em] text-white transition duration-150 hover:bg-neutral-800"
            >
              <Download size={11} />
              .md
            </button>
          </div>
        </div>

        {/* Panes */}
        <div className="flex min-h-[560px] flex-col lg:flex-row">
          {showEditor && (
            <div
              className={`flex min-w-0 flex-1 flex-col ${
                showPreview
                  ? "border-b border-black/8 lg:border-b-0 lg:border-r"
                  : ""
              }`}
            >
              <div className="border-b border-black/6 px-5 py-2.5">
                <span className="text-label font-semibold uppercase tracking-[0.16em] text-black/30">
                  Editor
                </span>
              </div>
              <textarea
                value={markdown}
                onChange={(event) => setMarkdown(event.target.value)}
                spellCheck={false}
                aria-label="Markdown source"
                className="min-h-[520px] flex-1 resize-none bg-[#fcfbfa] p-6 font-mono text-[13.5px] leading-[1.75] text-black outline-none transition duration-150 focus:bg-white"
              />
            </div>
          )}

          {showPreview && (
            <div className="flex min-w-0 flex-1 flex-col bg-white">
              <div className="border-b border-black/6 px-5 py-2.5">
                <span className="text-label font-semibold uppercase tracking-[0.16em] text-black/30">
                  Preview
                </span>
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: html }}
                className="min-h-[520px] flex-1 overflow-y-auto p-7 text-[15px] leading-relaxed text-black/80"
              />
            </div>
          )}
        </div>
      </div>

      <p className="px-1 text-caption text-black/35">
        The document never leaves this tab — parsing and preview both run in your
        browser.
      </p>
    </div>
  );
}
