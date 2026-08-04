"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Copy, Check, Trash2 } from "lucide-react";

type Mode = "format" | "minify";

const SQL_KEYWORDS = [
  "SELECT","DISTINCT","FROM","WHERE","JOIN","LEFT JOIN","RIGHT JOIN","INNER JOIN",
  "OUTER JOIN","FULL JOIN","CROSS JOIN","ON","AND","OR","NOT","IN","LIKE","AS",
  "ORDER BY","GROUP BY","HAVING","LIMIT","OFFSET","INSERT INTO","VALUES","UPDATE",
  "SET","DELETE FROM","DELETE","CREATE TABLE","CREATE","TABLE","DROP TABLE","DROP",
  "ALTER TABLE","ALTER","ADD","COLUMN","INDEX","PRIMARY KEY","FOREIGN KEY",
  "REFERENCES","COUNT","SUM","AVG","MIN","MAX","CASE","WHEN","THEN","ELSE","END",
  "UNION ALL","UNION","ALL","EXISTS","BETWEEN","NULL","IS NOT NULL","IS NULL","IS",
  "WITH","AS","RETURNING","TRUNCATE","EXPLAIN","ANALYZE",
];

const NEWLINE_BEFORE = [
  "SELECT","DISTINCT","FROM","WHERE","LEFT JOIN","RIGHT JOIN","INNER JOIN",
  "OUTER JOIN","FULL JOIN","CROSS JOIN","JOIN","ORDER BY","GROUP BY","HAVING",
  "LIMIT","OFFSET","UNION ALL","UNION","RETURNING",
];

function formatSQL(raw: string): string {
  if (!raw.trim()) return "";

  const tokens: string[] = [];
  let i = 0;
  const src = raw;

  while (i < src.length) {
    if (src[i] === "-" && src[i + 1] === "-") {
      let j = i;
      while (j < src.length && src[j] !== "\n") j++;
      tokens.push(src.slice(i, j));
      i = j;
      continue;
    }
    if (src[i] === "/" && src[i + 1] === "*") {
      let j = i + 2;
      while (j < src.length - 1 && !(src[j] === "*" && src[j + 1] === "/")) j++;
      tokens.push(src.slice(i, j + 2));
      i = j + 2;
      continue;
    }
    if (src[i] === "'" || src[i] === '"' || src[i] === "`") {
      const q = src[i];
      let j = i + 1;
      while (j < src.length && !(src[j] === q && src[j - 1] !== "\\")) j++;
      tokens.push(src.slice(i, j + 1));
      i = j + 1;
      continue;
    }
    if (/\s/.test(src[i])) {
      while (i < src.length && /\s/.test(src[i])) i++;
      tokens.push(" ");
      continue;
    }
    if (/[(),;]/.test(src[i])) {
      tokens.push(src[i]);
      i++;
      continue;
    }
    let j = i;
    while (j < src.length && !/[\s(),;'"`;]/.test(src[j])) j++;
    tokens.push(src.slice(i, j));
    i = j;
  }

  const clean = tokens.filter(t => t.trim() !== "").map(t => {
    const up = t.toUpperCase();
    if (SQL_KEYWORDS.includes(up)) return up;
    return t;
  });

  let sql = clean.join(" ")
    .replace(/\s*,\s*/g, ", ")
    .replace(/\s*\(\s*/g, "(")
    .replace(/\s*\)\s*/g, ")")
    .replace(/\s*;\s*/g, ";");

  const multiWordPhrases = [
    "LEFT JOIN","RIGHT JOIN","INNER JOIN","OUTER JOIN","FULL JOIN","CROSS JOIN",
    "ORDER BY","GROUP BY","UNION ALL","IS NOT NULL","IS NULL","PRIMARY KEY",
    "FOREIGN KEY","INSERT INTO","CREATE TABLE","DROP TABLE","ALTER TABLE",
    "DELETE FROM",
  ].sort((a, b) => b.length - a.length);

  for (const phrase of multiWordPhrases) {
    const parts = phrase.split(" ");
    const re = new RegExp(parts.join("\\s+"), "gi");
    sql = sql.replace(re, phrase);
  }

  const lines: string[] = [];
  let current = "";
  let depth = 0;
  let inSelect = false;
  let afterWhere = false;

  const words = sql.split(/\b/);
  const rebuilt = words.join("");
  const segments = rebuilt.split(/(?=\b(?:SELECT|DISTINCT|FROM|WHERE|LEFT\s+JOIN|RIGHT\s+JOIN|INNER\s+JOIN|OUTER\s+JOIN|FULL\s+JOIN|CROSS\s+JOIN|JOIN|ORDER\s+BY|GROUP\s+BY|HAVING|LIMIT|OFFSET|UNION\s+ALL|UNION|RETURNING)\b)/i);

  const result: string[] = [];

  for (let seg of segments) {
    seg = seg.trim();
    if (!seg) continue;

    const upper = seg.toUpperCase();
    const startsWithKw = NEWLINE_BEFORE.find(kw => upper.startsWith(kw));

    if (startsWithKw === "SELECT" || startsWithKw === "DISTINCT") {
      const after = seg.slice(startsWithKw.length).trim();
      const cols = splitTopLevel(after, ",");
      if (cols.length > 1) {
        result.push(startsWithKw);
        cols.forEach((col, idx) => {
          result.push("  " + col.trim() + (idx < cols.length - 1 ? "," : ""));
        });
      } else {
        result.push(seg);
      }
      inSelect = true;
      afterWhere = false;
    } else if (startsWithKw === "WHERE") {
      const after = seg.slice(5).trim();
      result.push("WHERE");
      if (after) {
        const conditions = splitOnAndOr(after);
        conditions.forEach((cond, idx) => {
          if (idx === 0) result.push("    " + cond.trim());
          else result.push("  " + cond.trim());
        });
      }
      inSelect = false;
      afterWhere = true;
    } else if (startsWithKw) {
      result.push(seg);
      inSelect = false;
      afterWhere = false;
    } else {
      result.push(seg);
    }
  }

  return result.join("\n").trim();
}

function splitTopLevel(str: string, sep: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let current = "";
  for (const ch of str) {
    if (ch === "(") depth++;
    else if (ch === ")") depth--;
    if (ch === sep && depth === 0) {
      parts.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  if (current.trim()) parts.push(current);
  return parts;
}

function splitOnAndOr(str: string): string[] {
  const parts: string[] = [];
  const re = /\b(AND|OR)\b/gi;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(str)) !== null) {
    parts.push(str.slice(last, match.index).trim());
    last = match.index;
  }
  parts.push(str.slice(last).trim());
  return parts.filter(Boolean);
}

function minifySQL(raw: string): string {
  return raw
    .replace(/--[^\n]*/g, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function colorizeSql(sql: string): string {
  const keywordPattern = [
    "SELECT","DISTINCT","FROM","WHERE","LEFT JOIN","RIGHT JOIN","INNER JOIN",
    "OUTER JOIN","FULL JOIN","CROSS JOIN","JOIN","ON","AND","OR","NOT","IN",
    "LIKE","AS","ORDER BY","GROUP BY","HAVING","LIMIT","OFFSET","INSERT INTO",
    "VALUES","UPDATE","SET","DELETE FROM","DELETE","CREATE TABLE","CREATE",
    "TABLE","DROP TABLE","DROP","ALTER TABLE","ALTER","ADD","COLUMN","INDEX",
    "PRIMARY KEY","FOREIGN KEY","REFERENCES","DISTINCT","COUNT","SUM","AVG",
    "MIN","MAX","CASE","WHEN","THEN","ELSE","END","UNION ALL","UNION","ALL",
    "EXISTS","BETWEEN","NULL","IS NOT NULL","IS NULL","IS","WITH","RETURNING",
    "TRUNCATE","EXPLAIN","ANALYZE",
  ].sort((a, b) => b.length - a.length).join("|");

  const parts: string[] = [];
  const re = new RegExp(
    `(--[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/|'(?:[^'\\\\]|\\\\.)*'|"(?:[^"\\\\]|\\\\.)*"|` +
    "`(?:[^`\\\\]|\\\\.)*`" +
    `|\\b(${keywordPattern})\\b` +
    `|\\b(\\d+\\.?\\d*)\\b` +
    `)`,
    "gi"
  );

  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = re.exec(sql)) !== null) {
    if (m.index > last) {
      parts.push(`<span style="color:#e2e8f0">${escHtml(sql.slice(last, m.index))}</span>`);
    }
    const tok = m[0];
    const upper = tok.toUpperCase().trim();

    if (tok.startsWith("--") || tok.startsWith("/*")) {
      parts.push(`<span style="color:#64748b;font-style:italic">${escHtml(tok)}</span>`);
    } else if (tok.startsWith("'") || tok.startsWith('"') || tok.startsWith("`")) {
      parts.push(`<span style="color:#86efac">${escHtml(tok)}</span>`);
    } else if (m[3] !== undefined) {
      parts.push(`<span style="color:#fbbf24">${escHtml(tok)}</span>`);
    } else {
      parts.push(`<span style="color:#2dd4bf;font-weight:600">${escHtml(tok)}</span>`);
    }

    last = m.index + tok.length;
  }

  if (last < sql.length) {
    parts.push(`<span style="color:#e2e8f0">${escHtml(sql.slice(last))}</span>`);
  }

  return parts.join("").replace(/\n/g, "<br/>").replace(/ {2}/g, "&nbsp;&nbsp;");
}

function escHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const SAMPLE_SQL = `select id, first_name, last_name, email, created_at from users where status = 'active' and created_at > '2024-01-01' order by created_at desc limit 25`;

export default function SqlFormatter() {
  const [input, setInput] = useState(SAMPLE_SQL);
  const [mode, setMode] = useState<Mode>("format");
  const [autoFormat, setAutoFormat] = useState(false);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const process = useCallback((text: string, m: Mode) => {
    if (!text.trim()) { setOutput(""); return; }
    setOutput(m === "minify" ? minifySQL(text) : formatSQL(text));
  }, []);

  useEffect(() => {
    process(input, mode);
  }, [mode]);

  useEffect(() => {
    if (autoFormat) {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => process(input, mode), 500);
    }
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [input, autoFormat, mode, process]);

  const handleFormat = () => process(input, mode);

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => { setInput(""); setOutput(""); };

  const lineCount = output ? output.split("\n").length : 0;

  const BG = "#061212";
  const PANEL = "#0a1f1e";
  const ACCENT = "#2dd4bf";
  const BORDER = "rgba(45,212,191,0.12)";
  const BORDER_DIM = "rgba(45,212,191,0.06)";
  const TEXT = "#e2e8f0";
  const TEXT_DIM = "rgba(226,232,240,0.35)";

  return (
    <div style={{ fontFamily: "monospace" }}>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {(["format", "minify"] as Mode[]).map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className="px-4 py-2 rounded-[10px] text-[11px] font-mono font-semibold uppercase tracking-[0.08em] transition-all"
            style={{
              background: mode === m ? ACCENT : `rgba(45,212,191,0.08)`,
              color: mode === m ? "#061212" : `rgba(45,212,191,0.7)`,
              border: mode === m ? "none" : `1px solid ${BORDER}`,
            }}
          >
            {m}
          </button>
        ))}

        <label className="flex items-center gap-2 ml-auto cursor-pointer select-none">
          <span style={{ fontSize: "10px", color: TEXT_DIM, letterSpacing: "0.1em" }}>AUTO</span>
          <div
            onClick={() => setAutoFormat(v => !v)}
            style={{
              width: "32px", height: "18px", borderRadius: "9px",
              background: autoFormat ? ACCENT : "rgba(45,212,191,0.15)",
              position: "relative", cursor: "pointer", transition: "background 0.2s",
            }}
          >
            <div style={{
              position: "absolute", top: "3px",
              left: autoFormat ? "17px" : "3px",
              width: "12px", height: "12px", borderRadius: "50%",
              background: autoFormat ? "#061212" : "rgba(45,212,191,0.5)",
              transition: "left 0.2s",
            }} />
          </div>
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-[20px] overflow-hidden" style={{ background: PANEL, boxShadow: `0 0 0 1px ${BORDER}` }}>
          <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: `1px solid ${BORDER_DIM}`, background: "rgba(10,31,30,0.8)" }}>
            <span className="text-[9px] uppercase tracking-[0.15em] font-mono font-semibold" style={{ color: `rgba(45,212,191,0.5)` }}>
              Input SQL
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleClear}
                className="flex items-center gap-1 px-2 py-1 rounded text-[9px] font-mono transition-colors"
                style={{ color: TEXT_DIM }}
                onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
                onMouseLeave={e => (e.currentTarget.style.color = TEXT_DIM)}
              >
                <Trash2 size={10} />
                Clear
              </button>
            </div>
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            spellCheck={false}
            placeholder="Paste your SQL here..."
            className="w-full resize-none p-5 text-[12.5px] leading-[1.7] outline-none bg-transparent font-mono"
            style={{ color: TEXT, caretColor: ACCENT, minHeight: "320px" }}
          />
          {!autoFormat && (
            <div className="px-4 pb-4">
              <button
                onClick={handleFormat}
                className="w-full py-2.5 rounded-[10px] text-[11px] font-mono font-semibold uppercase tracking-[0.12em] transition-all hover:opacity-90"
                style={{ background: ACCENT, color: "#061212" }}
              >
                {mode === "minify" ? "Minify SQL" : "Format SQL"}
              </button>
            </div>
          )}
        </div>

        <div className="rounded-[20px] overflow-hidden" style={{ background: PANEL, boxShadow: `0 0 0 1px ${BORDER}` }}>
          <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: `1px solid ${BORDER_DIM}`, background: "rgba(10,31,30,0.8)" }}>
            <span className="text-[9px] uppercase tracking-[0.15em] font-mono font-semibold" style={{ color: `rgba(45,212,191,0.5)` }}>
              {mode === "minify" ? "Minified" : "Formatted"} SQL
            </span>
            <button
              onClick={handleCopy}
              disabled={!output}
              className="flex items-center gap-1 px-2 py-1 rounded text-[9px] font-mono disabled:opacity-20 transition-colors"
              style={{ color: copied ? ACCENT : TEXT_DIM }}
            >
              {copied ? <Check size={10} /> : <Copy size={10} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <pre
            className="p-5 text-[12.5px] leading-[1.7] overflow-x-auto font-mono"
            style={{ minHeight: "320px", whiteSpace: "pre-wrap", wordBreak: "break-word" }}
            dangerouslySetInnerHTML={{
              __html: output
                ? colorizeSql(output)
                : `<span style="color:rgba(45,212,191,0.2)">Formatted output will appear here</span>`,
            }}
          />

          <div className="px-4 py-2.5 flex items-center" style={{ borderTop: `1px solid ${BORDER_DIM}` }}>
            <span style={{ fontSize: "9px", color: TEXT_DIM, fontFamily: "monospace", letterSpacing: "0.08em" }}>
              {output ? `${lineCount} line${lineCount !== 1 ? "s" : ""}  ·  ${output.length} chars` : "ready"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
