"use client";
import { useState, useMemo } from "react";
import { Copy, Check, Minimize2, Maximize2 } from "lucide-react";

type ViewMode = "pretty" | "minify" | "diff";

function colorizeJson(json: string): string {
  return json
    .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, match => {
      let cls = "#ce9178"; // string
      if (/^"/.test(match)) {
        if (/:$/.test(match)) cls = "#9cdcfe"; // key
        else cls = "#ce9178"; // string value
      } else if (/true|false/.test(match)) cls = "#569cd6";
      else if (/null/.test(match)) cls = "#569cd6";
      else cls = "#b5cea8"; // number
      return `<span style="color:${cls}">${match}</span>`;
    })
    .replace(/[{}\[\]]/g, m => `<span style="color:#ffd700">${m}</span>`)
    .replace(/[:,]/g, m => `<span style="color:#d4d4d4">${m}</span>`);
}

export default function JsonFormatter() {
  const [input, setInput] = useState('{\n  "name": "John Doe",\n  "age": 30,\n  "active": true,\n  "tags": ["developer", "designer"],\n  "address": null\n}');
  const [indent, setIndent] = useState(2);
  const [mode,   setMode]   = useState<ViewMode>("pretty");
  const [copiedOut, setCopiedOut] = useState(false);
  const [diffB, setDiffB] = useState("");

  const { output, error } = useMemo(() => {
    const t = input.trim();
    if (!t) return { output: "", error: null };
    try {
      const parsed = JSON.parse(t);
      if (mode === "minify") return { output: JSON.stringify(parsed), error: null };
      return { output: JSON.stringify(parsed, null, indent), error: null };
    } catch (e) {
      return { output: "", error: (e as Error).message };
    }
  }, [input, indent, mode]);

  const diffResult = useMemo(() => {
    if (mode !== "diff") return null;
    try {
      const a = JSON.parse(input);
      const b = JSON.parse(diffB);
      const aStr = JSON.stringify(a, null, 2).split("\n");
      const bStr = JSON.stringify(b, null, 2).split("\n");
      return { aLines: aStr, bLines: bStr };
    } catch { return null; }
  }, [input, diffB, mode]);

  const copy = async (text: string, setter: (v: boolean) => void) => {
    await navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {(["pretty", "minify", "diff"] as ViewMode[]).map(m => (
          <button key={m} onClick={() => setMode(m)}
            className="px-4 py-2 rounded-[10px] text-[11px] font-mono font-semibold uppercase tracking-[0.08em] transition-all"
            style={{
              background: mode === m ? "#d4d4aa" : "rgba(212,212,170,0.08)",
              color: mode === m ? "#1e1e1e" : "rgba(212,212,170,0.6)",
              border: mode === m ? "none" : "1px solid rgba(212,212,170,0.12)",
            }}>
            {m}
          </button>
        ))}
        {mode === "pretty" && (
          <div className="flex items-center gap-1.5 ml-auto">
            <span className="text-[10px] font-mono" style={{ color: "rgba(212,212,170,0.4)" }}>Indent:</span>
            {[2, 4].map(n => (
              <button key={n} onClick={() => setIndent(n)}
                className="w-7 h-7 rounded-[6px] text-[11px] font-mono font-bold transition-all"
                style={{ background: indent === n ? "#d4d4aa" : "rgba(212,212,170,0.08)", color: indent === n ? "#1e1e1e" : "rgba(212,212,170,0.5)" }}>
                {n}
              </button>
            ))}
          </div>
        )}
      </div>

      {mode !== "diff" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Input */}
          <div className="rounded-[20px] overflow-hidden"
            style={{ background: "#1e1e1e", boxShadow: "0 0 0 1px rgba(212,212,170,0.1)" }}>
            <div className="flex items-center justify-between px-4 py-2.5"
              style={{ borderBottom: "1px solid rgba(212,212,170,0.06)", background: "#252526" }}>
              <span className="text-[9px] uppercase tracking-[0.15em] font-mono font-semibold" style={{ color: "rgba(212,212,170,0.4)" }}>Input JSON</span>
              <span className="text-[9px] font-mono" style={{ color: error ? "#f44747" : "rgba(212,212,170,0.3)" }}>
                {error ? "⚠ Invalid JSON" : "✓ Valid"}
              </span>
            </div>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              spellCheck={false}
              className="w-full resize-none p-5 text-[12.5px] leading-[1.7] outline-none bg-transparent font-mono"
              style={{ color: "#d4d4d4", caretColor: "#d4d4aa", minHeight: "320px" }}
            />
          </div>

          {/* Output */}
          <div className="rounded-[20px] overflow-hidden"
            style={{ background: "#1e1e1e", boxShadow: "0 0 0 1px rgba(212,212,170,0.1)" }}>
            <div className="flex items-center justify-between px-4 py-2.5"
              style={{ borderBottom: "1px solid rgba(212,212,170,0.06)", background: "#252526" }}>
              <span className="text-[9px] uppercase tracking-[0.15em] font-mono font-semibold" style={{ color: "rgba(212,212,170,0.4)" }}>
                {mode === "minify" ? "Minified" : "Formatted"}
              </span>
              <div className="flex gap-1.5">
                <button onClick={() => { setInput(output); }}
                  title="Use as input"
                  disabled={!output || !!error}
                  className="flex items-center gap-1 px-2 py-1 rounded text-[9px] font-mono disabled:opacity-20"
                  style={{ color: "rgba(212,212,170,0.5)" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(212,212,170,0.08)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                  {mode === "minify" ? <Maximize2 size={10} /> : <Minimize2 size={10} />}
                </button>
                <button onClick={() => copy(output, setCopiedOut)}
                  disabled={!output || !!error}
                  className="flex items-center gap-1 px-2 py-1 rounded text-[9px] font-mono disabled:opacity-20"
                  style={{ color: copiedOut ? "#4ec9b0" : "rgba(212,212,170,0.5)" }}>
                  {copiedOut ? <Check size={10} /> : <Copy size={10} />}
                  {copiedOut ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
            {error ? (
              <div className="p-5">
                <p className="font-mono text-[12px] leading-[1.7]" style={{ color: "#f44747" }}>
                  SyntaxError: {error}
                </p>
              </div>
            ) : (
              <pre className="p-5 text-[12.5px] leading-[1.7] overflow-x-auto font-mono" style={{ minHeight: "320px" }}
                dangerouslySetInnerHTML={{ __html: output ? colorizeJson(output) : "<span style='color:rgba(212,212,170,0.2)'>Formatted output will appear here</span>" }} />
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {[{ label: "JSON A", val: input, set: setInput }, { label: "JSON B", val: diffB, set: setDiffB }].map(({ label, val, set }) => (
            <div key={label} className="rounded-[16px] overflow-hidden"
              style={{ background: "#1e1e1e", border: "1px solid rgba(212,212,170,0.1)" }}>
              <div className="px-4 py-2.5" style={{ borderBottom: "1px solid rgba(212,212,170,0.06)", background: "#252526" }}>
                <span className="text-[9px] uppercase tracking-[0.15em] font-mono font-semibold" style={{ color: "rgba(212,212,170,0.4)" }}>{label}</span>
              </div>
              <textarea value={val} onChange={e => set(e.target.value)} spellCheck={false}
                className="w-full resize-none p-5 text-[12.5px] leading-[1.7] outline-none bg-transparent font-mono min-h-[120px]"
                style={{ color: "#d4d4d4", caretColor: "#d4d4aa" }} />
            </div>
          ))}
          {diffResult && (
            <div className="rounded-[16px] overflow-hidden"
              style={{ background: "#1e1e1e", border: "1px solid rgba(212,212,170,0.1)" }}>
              <div className="px-4 py-2.5" style={{ borderBottom: "1px solid rgba(212,212,170,0.06)", background: "#252526" }}>
                <span className="text-[9px] uppercase tracking-[0.15em] font-mono font-semibold" style={{ color: "rgba(212,212,170,0.4)" }}>Diff Result</span>
              </div>
              <div className="grid grid-cols-2 divide-x" style={{ borderColor: "rgba(212,212,170,0.06)" }}>
                {[diffResult.aLines, diffResult.bLines].map((lines, side) => (
                  <pre key={side} className="p-4 text-[11.5px] leading-[1.7] overflow-x-auto font-mono">
                    {lines.map((line, i) => {
                      const other = (side === 0 ? diffResult.bLines : diffResult.aLines)[i];
                      const changed = line !== other;
                      return (
                        <div key={i} style={{ background: changed ? (side === 0 ? "rgba(239,68,68,0.08)" : "rgba(34,197,94,0.08)") : "transparent", color: changed ? (side === 0 ? "#f87171" : "#86efac") : "#d4d4d4" }}>
                          {line}
                        </div>
                      );
                    })}
                  </pre>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
