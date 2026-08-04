"use client";

import { useState, useMemo } from "react";
import { Copy, Trash2, Check } from "lucide-react";

function getStats(text: string) {
  const trimmed = text.trim();
  if (!trimmed) return { words: 0, chars: 0, charsNoSpaces: 0, sentences: 0, paragraphs: 0, readingTime: 0 };
  return {
    words:         trimmed.split(/\s+/).length,
    chars:         text.length,
    charsNoSpaces: text.replace(/\s/g, "").length,
    sentences:     trimmed.split(/[.!?]+/).filter((s) => s.trim().length > 0).length,
    paragraphs:    text.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length || 1,
    readingTime:   Math.ceil(trimmed.split(/\s+/).length / 200),
  };
}

const STATS = [
  { key: "words",          label: "Words"       },
  { key: "chars",          label: "Characters"  },
  { key: "charsNoSpaces",  label: "No Spaces"   },
  { key: "sentences",      label: "Sentences"   },
  { key: "paragraphs",     label: "Paragraphs"  },
  { key: "readingTime",    label: "Min Read"    },
] as const;

export default function WordCounterTool() {
  const [text, setText]     = useState("");
  const [copied, setCopied] = useState(false);
  const stats = useMemo(() => getStats(text), [text]);

  const handleCopy = async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="tool">
      {/* Textarea card */}
      <div
        className="rounded-[20px] overflow-hidden"
        style={{
          background: "#ffffff",
          boxShadow: "0 0 0 1px rgba(3,3,2,0.06), 0 4px 24px rgba(3,3,2,0.06)",
        }}
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here…"
          spellCheck
          autoFocus
          className="w-full min-h-[420px] resize-none p-8 text-[15.5px] leading-[1.85] outline-none bg-transparent font-[inherit]"
          style={{ color: "#1c1b18", caretColor: "#1c1b18" }}
        />

        {/* Bottom toolbar */}
        <div
          className="flex items-center justify-between px-7 py-3.5"
          style={{ borderTop: "1px solid rgba(3,3,2,0.06)" }}
        >
          <span className="text-[11px] font-mono tabular-nums select-none" style={{ color: "rgba(3,3,2,0.3)" }}>
            {text.length.toLocaleString()} chars
          </span>
          <div className="flex items-center gap-0.5">
            <button
              onClick={() => setText("")}
              disabled={!text}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-medium transition-all duration-150 disabled:opacity-20 disabled:pointer-events-none"
              style={{ color: "rgba(3,3,2,0.4)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(3,3,2,0.05)"; (e.currentTarget as HTMLElement).style.color = "rgba(3,3,2,0.8)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "rgba(3,3,2,0.4)"; }}
            >
              <Trash2 size={11} />
              Clear
            </button>
            <button
              onClick={handleCopy}
              disabled={!text}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-medium transition-all duration-150 disabled:opacity-20 disabled:pointer-events-none"
              style={{ color: copied ? "#16a34a" : "rgba(3,3,2,0.6)" }}
              onMouseEnter={(e) => { if (!copied) { (e.currentTarget as HTMLElement).style.background = "rgba(3,3,2,0.05)"; } }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              {copied ? <Check size={11} /> : <Copy size={11} />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-2.5">
        {STATS.map(({ key, label }) => (
          <div
            key={key}
            className="flex flex-col items-center justify-center text-center py-4 rounded-[16px]"
            style={{
              background: "#ffffff",
              boxShadow: "0 0 0 1px rgba(3,3,2,0.06), 0 2px 8px rgba(3,3,2,0.04)",
            }}
          >
            <span
              className="text-[23px] font-semibold tabular-nums leading-none mb-1"
              style={{ color: "#1c1b18" }}
            >
              {stats[key].toLocaleString()}
            </span>
            <span
              className="text-[9px] uppercase tracking-[0.13em] font-medium leading-none"
              style={{ color: "rgba(3,3,2,0.35)" }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
