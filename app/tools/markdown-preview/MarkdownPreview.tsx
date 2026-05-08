"use client";
import { useState, useCallback, useMemo } from "react";

type ViewMode = "split" | "editor" | "preview";

const SAMPLE_MARKDOWN = `# Markdown Preview

Welcome to the **Markdown Preview** tool — a split-pane writing studio.

## Features

This tool renders *GitHub Flavored Markdown* in real time. Here's what it supports:

### Inline Formatting

You can write **bold text**, *italic text*, ~~strikethrough~~, and \`inline code\` all on the same line. You can also combine them: **_bold italic_**.

### Links and Images

Visit [mohdsakib.vercel.app](https://mohdsakib.vercel.app) for more tools.

![Alt text](https://placehold.co/600x200/1a1a1a/16a34a?text=Markdown+Preview)

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

function parseMarkdown(raw: string): string {
  const lines = raw.split("\n");
  const out: string[] = [];
  let i = 0;

  const parseInline = (text: string): string => {
    return text
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, src) => `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" style="max-width:100%;border-radius:6px;" />`)
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer" style="color:#16a34a;text-decoration:underline;text-underline-offset:2px;">${escapeHtml(label)}</a>`)
      .replace(/~~(.+?)~~/g, (_, t) => `<del>${escapeHtml(t)}</del>`)
      .replace(/\*\*\*(.+?)\*\*\*/g, (_, t) => `<strong><em>${escapeHtml(t)}</em></strong>`)
      .replace(/_\*\*(.+?)\*\*_/g, (_, t) => `<em><strong>${escapeHtml(t)}</strong></em>`)
      .replace(/\*\*(.+?)\*\*/g, (_, t) => `<strong>${escapeHtml(t)}</strong>`)
      .replace(/__(.+?)__/g, (_, t) => `<strong>${escapeHtml(t)}</strong>`)
      .replace(/\*(.+?)\*/g, (_, t) => `<em>${escapeHtml(t)}</em>`)
      .replace(/_(.+?)_/g, (_, t) => `<em>${escapeHtml(t)}</em>`)
      .replace(/`([^`]+)`/g, (_, t) => `<code style="background:rgba(0,0,0,0.07);padding:2px 5px;border-radius:4px;font-family:monospace;font-size:0.88em;">${escapeHtml(t)}</code>`);
  };

  const isTableRow = (line: string) => /^\|.+\|$/.test(line.trim());
  const isTableSep = (line: string) => /^\|[\s|:-]+\|$/.test(line.trim());

  while (i < lines.length) {
    const line = lines[i];

    if (/^#{1,6}\s/.test(line)) {
      const level = line.match(/^(#{1,6})\s/)![1].length;
      const text = line.slice(level + 1).trim();
      const sizes: Record<number, string> = { 1: "2em", 2: "1.5em", 3: "1.25em", 4: "1.1em", 5: "1em", 6: "0.9em" };
      const weights: Record<number, string> = { 1: "700", 2: "700", 3: "600", 4: "600", 5: "600", 6: "600" };
      const margins: Record<number, string> = { 1: "1.5em 0 0.6em", 2: "1.3em 0 0.5em", 3: "1.1em 0 0.4em", 4: "0.9em 0 0.35em", 5: "0.8em 0 0.3em", 6: "0.7em 0 0.25em" };
      out.push(`<h${level} style="font-size:${sizes[level]};font-weight:${weights[level]};margin:${margins[level]};line-height:1.25;color:#1a1a1a;font-family:'Georgia',serif;">${parseInline(text)}</h${level}>`);
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
      out.push(`<pre style="background:#1a1a1a;color:#d4d4d4;padding:16px 20px;border-radius:8px;overflow-x:auto;margin:1em 0;font-size:0.875em;line-height:1.6;"><code class="language-${escapeHtml(lang)}">${escapeHtml(codeLines.join("\n"))}</code></pre>`);
      continue;
    }

    if (/^(---|\*\*\*|___)\s*$/.test(line)) {
      out.push(`<hr style="border:none;border-top:1px solid rgba(0,0,0,0.12);margin:1.5em 0;" />`);
      i++;
      continue;
    }

    if (/^>\s?/.test(line)) {
      const bqLines: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        bqLines.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      out.push(`<blockquote style="border-left:3px solid #16a34a;margin:1em 0;padding:8px 16px;background:rgba(22,163,74,0.04);color:rgba(26,26,26,0.7);font-style:italic;">${bqLines.map(parseInline).join("<br />")}</blockquote>`);
      continue;
    }

    if (isTableRow(line) && i + 1 < lines.length && isTableSep(lines[i + 1])) {
      const headers = line.trim().replace(/^\||\|$/g, "").split("|").map(h => h.trim());
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && isTableRow(lines[i])) {
        rows.push(lines[i].trim().replace(/^\||\|$/g, "").split("|").map(c => c.trim()));
        i++;
      }
      const thCells = headers.map(h => `<th style="padding:8px 12px;text-align:left;font-weight:600;border-bottom:2px solid rgba(0,0,0,0.1);white-space:nowrap;">${parseInline(h)}</th>`).join("");
      const trRows = rows.map(row => {
        const tds = row.map((c, ci) => `<td style="padding:8px 12px;border-bottom:1px solid rgba(0,0,0,0.06);">${parseInline(ci < headers.length ? c : "")}</td>`).join("");
        return `<tr>${tds}</tr>`;
      }).join("");
      out.push(`<div style="overflow-x:auto;margin:1em 0;"><table style="width:100%;border-collapse:collapse;font-size:0.9em;"><thead><tr>${thCells}</tr></thead><tbody>${trRows}</tbody></table></div>`);
      continue;
    }

    if (/^[\-\*\+]\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[\-\*\+]\s/.test(lines[i])) {
        items.push(`<li style="margin:0.25em 0;">${parseInline(lines[i].replace(/^[\-\*\+]\s/, ""))}</li>`);
        i++;
      }
      out.push(`<ul style="padding-left:1.5em;margin:0.75em 0;">${items.join("")}</ul>`);
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(`<li style="margin:0.25em 0;">${parseInline(lines[i].replace(/^\d+\.\s/, ""))}</li>`);
        i++;
      }
      out.push(`<ol style="padding-left:1.5em;margin:0.75em 0;">${items.join("")}</ol>`);
      continue;
    }

    if (line.trim() === "") {
      out.push("");
      i++;
      continue;
    }

    const paraLines: string[] = [];
    while (i < lines.length && lines[i].trim() !== "" && !/^#{1,6}\s/.test(lines[i]) && !/^(`{3,}|~{3,})/.test(lines[i]) && !/^(---|\*\*\*|___)\s*$/.test(lines[i]) && !/^>\s?/.test(lines[i]) && !/^[\-\*\+]\s/.test(lines[i]) && !/^\d+\.\s/.test(lines[i]) && !isTableRow(lines[i])) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length > 0) {
      out.push(`<p style="margin:0.75em 0;line-height:1.8;">${parseInline(paraLines.join(" "))}</p>`);
    }
  }

  const html = out.join("\n");
  return html.replace(/<script[\s\S]*?<\/script>/gi, "");
}

export default function MarkdownPreview() {
  const [markdown, setMarkdown] = useState(SAMPLE_MARKDOWN);
  const [view, setView] = useState<ViewMode>("split");
  const [copied, setCopied] = useState<"md" | "html" | null>(null);

  const html = useMemo(() => parseMarkdown(markdown), [markdown]);

  const wordCount = useMemo(() => {
    const text = markdown.replace(/[#*`>~_\[\]()!|]/g, " ").trim();
    return text ? text.split(/\s+/).filter(Boolean).length : 0;
  }, [markdown]);

  const readingTime = useMemo(() => Math.max(1, Math.ceil(wordCount / 200)), [wordCount]);

  const handleCopy = useCallback((type: "md" | "html") => {
    const content = type === "md" ? markdown : html;
    navigator.clipboard.writeText(content).then(() => {
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    });
  }, [markdown, html]);

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

  const btnBase: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    padding: "5px 11px",
    borderRadius: "6px",
    fontSize: "11px",
    fontWeight: 600,
    cursor: "pointer",
    border: "none",
    transition: "background 0.15s",
    fontFamily: "inherit",
    letterSpacing: "0.02em",
    whiteSpace: "nowrap",
  };

  const viewToggleBtn = (mode: ViewMode, label: string): React.CSSProperties => ({
    ...btnBase,
    background: view === mode ? "#16a34a" : "rgba(255,255,255,0.08)",
    color: view === mode ? "#fff" : "rgba(255,255,255,0.55)",
  });

  return (
    <div style={{ background: "#111111", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 40px rgba(0,0,0,0.35)" }}>

      <div style={{ background: "#242424", borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "10px 16px", display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginRight: "6px" }}>
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f57" }} />
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#febc2e" }} />
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#28c840" }} />
        </div>

        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", fontFamily: "monospace", marginRight: "auto" }}>
          {wordCount.toLocaleString()} words · ~{readingTime} min read
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          {(["split", "editor", "preview"] as ViewMode[]).map(mode => (
            <button key={mode} onClick={() => setView(mode)} style={viewToggleBtn(mode, mode)}>
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>

        <div style={{ width: "1px", height: "20px", background: "rgba(255,255,255,0.1)" }} />

        <button onClick={() => handleCopy("md")} style={{ ...btnBase, background: "rgba(255,255,255,0.06)", color: copied === "md" ? "#16a34a" : "rgba(255,255,255,0.55)" }}>
          {copied === "md" ? "✓ Copied!" : "Copy MD"}
        </button>
        <button onClick={() => handleCopy("html")} style={{ ...btnBase, background: "rgba(255,255,255,0.06)", color: copied === "html" ? "#16a34a" : "rgba(255,255,255,0.55)" }}>
          {copied === "html" ? "✓ Copied!" : "Copy HTML"}
        </button>
        <button onClick={handleDownload} style={{ ...btnBase, background: "rgba(22,163,74,0.15)", color: "#16a34a" }}>
          ↓ .md
        </button>
      </div>

      <div style={{ display: "flex", minHeight: "560px", overflow: "hidden" }}>

        {showEditor && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", borderRight: showPreview ? "1px solid rgba(255,255,255,0.07)" : "none", minWidth: 0 }}>
            <div style={{ padding: "8px 16px", background: "#1a1a1a", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", fontFamily: "monospace" }}>EDITOR</span>
            </div>
            <div style={{ flex: 1, position: "relative", display: "flex" }}>
              <textarea
                value={markdown}
                onChange={e => setMarkdown(e.target.value)}
                spellCheck={false}
                style={{
                  flex: 1,
                  resize: "none",
                  outline: "none",
                  border: "none",
                  background: "#1a1a1a",
                  color: "#d4d4d4",
                  fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Courier New', monospace",
                  fontSize: "13.5px",
                  lineHeight: "1.7",
                  padding: "20px 20px 20px 52px",
                  caretColor: "#16a34a",
                  tabSize: 2,
                  minHeight: "560px",
                  backgroundImage: "repeating-linear-gradient(transparent, transparent calc(1.7em * 13.5px / 13 - 1px), rgba(255,255,255,0.025) calc(1.7em * 13.5px / 13 - 1px), rgba(255,255,255,0.025) calc(1.7em * 13.5px / 13))",
                }}
              />
              <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "40px", background: "#161616", borderRight: "1px solid rgba(255,255,255,0.05)", pointerEvents: "none", display: "flex", flexDirection: "column", alignItems: "flex-end", paddingTop: "20px", paddingRight: "8px", gap: "0" }}>
                {Array.from({ length: Math.max(40, markdown.split("\n").length + 5) }, (_, idx) => (
                  <span key={idx} style={{ fontSize: "11px", lineHeight: "1.7", color: "rgba(255,255,255,0.15)", fontFamily: "monospace", display: "block", minHeight: "calc(1.7 * 13.5px)" }}>{idx + 1}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {showPreview && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, background: "#fdfcf7" }}>
            <div style={{ padding: "8px 16px", background: "#f5f4ef", borderBottom: "1px solid rgba(0,0,0,0.07)", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(0,0,0,0.25)", fontFamily: "monospace" }}>PREVIEW</span>
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: html }}
              style={{
                flex: 1,
                padding: "28px 32px",
                overflowY: "auto",
                fontFamily: "'Georgia', 'Cambria', serif",
                fontSize: "15px",
                color: "#1a1a1a",
                lineHeight: "1.8",
                minHeight: "560px",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
