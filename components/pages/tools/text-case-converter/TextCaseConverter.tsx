"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Copy, X } from "lucide-react";

import { CATEGORY_META } from "@/data/tools";

type CaseKey =
  | "upper"
  | "lower"
  | "title"
  | "sentence"
  | "camel"
  | "pascal"
  | "snake"
  | "kebab";

const ACCENT = CATEGORY_META.text;

function toTitleCase(s: string) {
  return s.replace(
    /\w\S*/g,
    (t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase(),
  );
}
function toSentenceCase(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}
function toCamelCase(s: string) {
  return s
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .trim()
    .split(/\s+/)
    .map((w, i) =>
      i === 0
        ? w.toLowerCase()
        : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase(),
    )
    .join("");
}
function toPascalCase(s: string) {
  return s
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join("");
}
function toSnakeCase(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");
}
function toKebabCase(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

const CASES: {
  key: CaseKey;
  label: string;
  tag: string;
  convert: (s: string) => string;
  example: string;
}[] = [
  { key: "upper", label: "UPPERCASE", tag: "AA", convert: (s) => s.toUpperCase(), example: "HELLO WORLD" },
  { key: "lower", label: "lowercase", tag: "aa", convert: (s) => s.toLowerCase(), example: "hello world" },
  { key: "title", label: "Title Case", tag: "Aa", convert: toTitleCase, example: "Hello World" },
  { key: "sentence", label: "Sentence case", tag: "A_", convert: toSentenceCase, example: "Hello world" },
  { key: "camel", label: "camelCase", tag: "aC", convert: toCamelCase, example: "helloWorld" },
  { key: "pascal", label: "PascalCase", tag: "PC", convert: toPascalCase, example: "HelloWorld" },
  { key: "snake", label: "snake_case", tag: "a_", convert: toSnakeCase, example: "hello_world" },
  { key: "kebab", label: "kebab-case", tag: "a-", convert: toKebabCase, example: "hello-world" },
];

export default function TextCaseConverter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState<CaseKey | null>(null);

  const results = useMemo(
    () =>
      CASES.map((c) => ({ ...c, result: text.trim() ? c.convert(text) : "" })),
    [text],
  );

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(null), 1800);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleCopy = async (key: CaseKey, value: string) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
    } catch {
      setCopied(null);
    }
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <div className="space-y-3">
      <div className="rounded-4xl bg-white p-6 shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_4px_24px_rgba(0,0,0,0.04)] sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <label
            htmlFor="source-text"
            className="text-label font-semibold uppercase tracking-[0.16em] text-black/40"
          >
            Your text
          </label>
          {text && (
            <button
              type="button"
              onClick={() => setText("")}
              className="inline-flex items-center gap-1.5 text-label font-semibold uppercase tracking-[0.12em] text-black/35 transition hover:text-black"
            >
              <X size={12} />
              Clear
            </button>
          )}
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl border border-black/10 bg-[#fcfbfa] transition duration-150 hover:border-black/25 focus-within:border-black/70 focus-within:bg-white">
          <textarea
            id="source-text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Type or paste your text here…"
            spellCheck
            rows={5}
            className="w-full resize-none bg-transparent px-5 py-4 text-body leading-relaxed text-black outline-none placeholder:text-black/25"
          />
          <div className="border-t border-black/8 px-5 py-3">
            <p className="font-mono text-caption text-black/35 tabular-nums">
              {text.length.toLocaleString()} chars · {wordCount.toLocaleString()}{" "}
              words
            </p>
          </div>
        </div>

        <p className="mt-3 text-caption text-black/35">
          All eight conversions run in this tab — nothing is uploaded.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {results.map(({ key, label, tag, result, example }) => (
          <div
            key={key}
            className="rounded-2xl bg-white p-5 shadow-[0_0_0_1px_rgba(0,0,0,0.06)] transition duration-150 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.14)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="mb-2.5 flex items-center gap-2">
                  <span
                    className="rounded px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-[0.05em]"
                    style={{ background: ACCENT.bg, color: ACCENT.color }}
                  >
                    {tag}
                  </span>
                  <span className="text-label font-semibold uppercase tracking-[0.12em] text-black/40">
                    {label}
                  </span>
                </div>
                <p
                  className={`min-h-5 break-all font-mono text-[13px] leading-relaxed ${
                    result ? "text-black" : "text-black/20"
                  }`}
                >
                  {result || example}
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(key, result)}
                disabled={!result}
                title={`Copy ${label}`}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-black/[0.04] px-3 py-1.5 text-label font-semibold uppercase tracking-[0.12em] text-black/45 transition duration-150 hover:bg-black/[0.08] hover:text-black disabled:pointer-events-none disabled:opacity-30"
              >
                {copied === key ? <Check size={11} /> : <Copy size={11} />}
                {copied === key ? "Done" : "Copy"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
