"use client";
import { useState, useMemo } from "react";
import { Copy, Check } from "lucide-react";

type CaseKey = "upper" | "lower" | "title" | "sentence" | "camel" | "pascal" | "snake" | "kebab";

function toTitleCase(s: string) {
  return s.replace(/\w\S*/g, t => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase());
}
function toSentenceCase(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}
function toCamelCase(s: string) {
  return s
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .trim()
    .split(/\s+/)
    .map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join("");
}
function toPascalCase(s: string) {
  return s
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .trim()
    .split(/\s+/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join("");
}
function toSnakeCase(s: string) {
  return s.toLowerCase().trim().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
}
function toKebabCase(s: string) {
  return s.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

const CASES: { key: CaseKey; label: string; tag: string; convert: (s: string) => string; example: string }[] = [
  { key: "upper",    label: "UPPERCASE",    tag: "AA",  convert: s => s.toUpperCase(), example: "HELLO WORLD" },
  { key: "lower",    label: "lowercase",    tag: "aa",  convert: s => s.toLowerCase(), example: "hello world" },
  { key: "title",    label: "Title Case",   tag: "Aa",  convert: toTitleCase,          example: "Hello World" },
  { key: "sentence", label: "Sentence case",tag: "A_",  convert: toSentenceCase,       example: "Hello world" },
  { key: "camel",    label: "camelCase",    tag: "aC",  convert: toCamelCase,          example: "helloWorld" },
  { key: "pascal",   label: "PascalCase",   tag: "PC",  convert: toPascalCase,         example: "HelloWorld" },
  { key: "snake",    label: "snake_case",   tag: "a_",  convert: toSnakeCase,          example: "hello_world" },
  { key: "kebab",    label: "kebab-case",   tag: "a-",  convert: toKebabCase,          example: "hello-world" },
];

export default function TextCaseConverter() {
  const [text, setText]   = useState("");
  const [copied, setCopied] = useState<CaseKey | null>(null);

  const results = useMemo(() =>
    CASES.map(c => ({ ...c, result: text.trim() ? c.convert(text) : "" })),
    [text]
  );

  const handleCopy = async (key: CaseKey, value: string) => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <div>
      {/* Input terminal */}
      <div
        className="rounded-[20px] overflow-hidden"
        style={{
          background: "#111110",
          boxShadow: "0 0 0 1px rgba(163,230,53,0.12), 0 8px 32px rgba(0,0,0,0.5)",
        }}
      >
        {/* Terminal header */}
        <div
          className="flex items-center gap-2 px-5 py-3.5"
          style={{ borderBottom: "1px solid rgba(163,230,53,0.08)" }}
        >
          <div className="w-3 h-3 rounded-full" style={{ background: "#3a3a35" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#3a3a35" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#3a3a35" }} />
          <span className="ml-3 text-[10px] font-mono tracking-[0.15em]" style={{ color: "rgba(163,230,53,0.35)" }}>
            INPUT.txt
          </span>
        </div>

        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Type or paste your text here…"
          autoFocus
          spellCheck
          className="w-full min-h-[160px] resize-none p-6 text-[14.5px] leading-[1.85] outline-none bg-transparent font-mono"
          style={{ color: "#e8e6e0", caretColor: "#a3e635", letterSpacing: "0.01em" }}
        />

        <div
          className="flex items-center justify-between px-6 py-3"
          style={{ borderTop: "1px solid rgba(163,230,53,0.06)" }}
        >
          <span className="text-[10.5px] font-mono tabular-nums" style={{ color: "rgba(163,230,53,0.35)" }}>
            {text.length.toLocaleString()} chars &nbsp;·&nbsp; {wordCount.toLocaleString()} words
          </span>
          <button
            onClick={() => setText("")}
            disabled={!text}
            className="text-[10px] font-mono px-3 py-1.5 rounded-lg transition-all disabled:opacity-20 disabled:pointer-events-none"
            style={{ color: "rgba(163,230,53,0.4)", letterSpacing: "0.05em" }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = "rgba(163,230,53,0.08)";
              (e.currentTarget as HTMLElement).style.color = "rgba(163,230,53,0.8)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "rgba(163,230,53,0.4)";
            }}
          >
            clear
          </button>
        </div>
      </div>

      {/* Results grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
        {results.map(({ key, label, tag, result, example }) => (
          <div
            key={key}
            className="rounded-[16px] p-5 group"
            style={{
              background: "#111110",
              boxShadow: "0 0 0 1px rgba(163,230,53,0.06)",
              transition: "box-shadow 0.15s",
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 1px rgba(163,230,53,0.18)")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 1px rgba(163,230,53,0.06)")}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2.5">
                  <span
                    className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded"
                    style={{ background: "rgba(163,230,53,0.12)", color: "#a3e635", letterSpacing: "0.05em" }}
                  >
                    {tag}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.12em] font-semibold" style={{ color: "rgba(163,230,53,0.5)" }}>
                    {label}
                  </span>
                </div>
                <p
                  className="font-mono text-[13px] leading-[1.65] break-all"
                  style={{ color: result ? "#e8e6e0" : "rgba(232,230,224,0.18)", minHeight: "20px" }}
                >
                  {result || example}
                </p>
              </div>

              <button
                onClick={() => handleCopy(key, result)}
                disabled={!result}
                className="shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-medium transition-all disabled:opacity-20 disabled:pointer-events-none"
                style={{
                  color: copied === key ? "#a3e635" : "rgba(163,230,53,0.45)",
                  background: copied === key ? "rgba(163,230,53,0.1)" : "rgba(163,230,53,0.04)",
                }}
                onMouseEnter={e => {
                  if (copied !== key) (e.currentTarget as HTMLElement).style.background = "rgba(163,230,53,0.1)";
                }}
                onMouseLeave={e => {
                  if (copied !== key) (e.currentTarget as HTMLElement).style.background = "rgba(163,230,53,0.04)";
                }}
              >
                {copied === key ? <Check size={10} /> : <Copy size={10} />}
                <span className="font-mono">{copied === key ? "done" : "copy"}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
