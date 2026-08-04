"use client";
import { useState, useMemo } from "react";
import { Copy, Check } from "lucide-react";

interface MatchInfo { index: number; length: number; groups: string[] }

function getMatches(pattern: string, flags: string, text: string): { matches: MatchInfo[]; error: string | null } {
  if (!pattern) return { matches: [], error: null };
  try {
    const re = new RegExp(pattern, flags + (flags.includes("g") ? "" : "g"));
    const matches: MatchInfo[] = [];
    let m: RegExpExecArray | null;
    let safetyCount = 0;
    while ((m = re.exec(text)) !== null && safetyCount < 1000) {
      matches.push({ index: m.index, length: m[0].length, groups: Array.from(m).slice(1) });
      if (!flags.includes("g") || m[0].length === 0) { re.lastIndex++; }
      safetyCount++;
    }
    return { matches, error: null };
  } catch (e) {
    return { matches: [], error: (e as Error).message };
  }
}

function buildHighlighted(text: string, matches: MatchInfo[]): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let pos = 0;
  const COLORS = ["#fde68a", "#a5f3fc", "#d9f99d", "#fecaca", "#e9d5ff", "#fed7aa"];
  matches.forEach((m, i) => {
    if (m.index > pos) nodes.push(<span key={`t${i}`}>{text.slice(pos, m.index)}</span>);
    nodes.push(
      <mark key={`m${i}`} style={{ background: COLORS[i % COLORS.length], color: "#111827", borderRadius: "3px", padding: "0 1px" }}>
        {text.slice(m.index, m.index + m.length)}
      </mark>
    );
    pos = m.index + m.length;
  });
  if (pos < text.length) nodes.push(<span key="tail">{text.slice(pos)}</span>);
  return nodes;
}

export default function RegexTester() {
  const [pattern, setPattern] = useState("\\b\\w+@\\w+\\.\\w+\\b");
  const [flags,   setFlags]   = useState("gi");
  const [text,    setText]    = useState("Contact us at support@example.com or sales@company.org for help.");
  const [replaceWith, setReplaceWith] = useState("[REDACTED]");
  const [mode,    setMode]    = useState<"test" | "replace">("test");
  const [copied,  setCopied]  = useState(false);

  const { matches, error } = useMemo(() => getMatches(pattern, flags, text), [pattern, flags, text]);
  const highlighted = useMemo(() => matches.length ? buildHighlighted(text, matches) : [text], [text, matches]);

  const replaceResult = useMemo(() => {
    if (mode !== "replace" || !pattern) return "";
    try {
      const re = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
      return text.replace(re, replaceWith);
    } catch { return ""; }
  }, [pattern, flags, text, replaceWith, mode]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(mode === "replace" ? replaceResult : matches.map((m, i) => text.slice(m.index, m.index + m.length)).join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleFlag = (f: string) => setFlags(prev => prev.includes(f) ? prev.replace(f, "") : prev + f);

  const FLAG_INFO = [
    { f: "g", label: "g", title: "Global — find all matches" },
    { f: "i", label: "i", title: "Case-insensitive" },
    { f: "m", label: "m", title: "Multiline — ^ and $ match line boundaries" },
    { f: "s", label: "s", title: "Dotall — . matches newlines" },
  ];

  return (
    <div>
      {/* Mode + Copy */}
      <div className="flex items-center gap-2 mb-3">
        {(["test", "replace"] as const).map(m => (
          <button key={m} onClick={() => setMode(m)}
            className="px-4 py-2 rounded-[10px] text-[11px] font-mono font-semibold uppercase tracking-[0.08em] transition-all"
            style={{
              background: mode === m ? "#e879f9" : "rgba(232,121,249,0.08)",
              color: mode === m ? "#ffffff" : "rgba(232,121,249,0.6)",
              border: mode === m ? "none" : "1px solid rgba(232,121,249,0.15)",
            }}>
            {m}
          </button>
        ))}
        <button onClick={handleCopy}
          disabled={mode === "test" ? matches.length === 0 : !replaceResult}
          className="ml-auto flex items-center gap-1.5 px-3 py-2 rounded-[10px] text-[11px] font-mono transition-all disabled:opacity-30"
          style={{ color: "rgba(232,121,249,0.6)", border: "1px solid rgba(232,121,249,0.12)" }}>
          {copied ? <Check size={11} /> : <Copy size={11} />}
          {copied ? "Copied" : mode === "test" ? "Copy matches" : "Copy result"}
        </button>
      </div>

      {/* Pattern input */}
      <div className="rounded-[20px] overflow-hidden mb-3"
        style={{ background: "#18091c", boxShadow: "0 0 0 1px rgba(232,121,249,0.15), 0 8px 32px rgba(0,0,0,0.5)" }}>
        <div className="flex items-stretch" style={{ borderBottom: "1px solid rgba(232,121,249,0.08)" }}>
          <span className="flex items-center px-4 text-[18px] font-mono" style={{ color: "rgba(232,121,249,0.4)", borderRight: "1px solid rgba(232,121,249,0.08)", background: "rgba(232,121,249,0.04)" }}>/</span>
          <input
            value={pattern}
            onChange={e => setPattern(e.target.value)}
            placeholder="Enter regex pattern…"
            className="flex-1 py-3.5 px-4 text-[14px] outline-none bg-transparent font-mono"
            style={{ color: error ? "#f87171" : "#e879f9", caretColor: "#e879f9" }}
            spellCheck={false}
          />
          <div className="flex items-center px-4 gap-1" style={{ borderLeft: "1px solid rgba(232,121,249,0.08)", background: "rgba(232,121,249,0.04)" }}>
            {FLAG_INFO.map(({ f, label, title }) => (
              <button key={f} onClick={() => toggleFlag(f)} title={title}
                className="w-6 h-6 rounded-[4px] text-[11px] font-mono font-bold transition-all"
                style={{ background: flags.includes(f) ? "rgba(232,121,249,0.2)" : "transparent", color: flags.includes(f) ? "#e879f9" : "rgba(232,121,249,0.3)" }}>
                {label}
              </button>
            ))}
          </div>
          <span className="flex items-center px-4 text-[18px] font-mono" style={{ color: "rgba(232,121,249,0.4)", borderLeft: "1px solid rgba(232,121,249,0.08)", background: "rgba(232,121,249,0.04)" }}>/{flags}</span>
        </div>

        {error && (
          <div className="px-5 py-2" style={{ background: "rgba(248,113,113,0.08)", borderBottom: "1px solid rgba(248,113,113,0.1)" }}>
            <p className="text-[11px] font-mono" style={{ color: "#f87171" }}>⚠ {error}</p>
          </div>
        )}

        {/* Test string */}
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Test string…"
          className="w-full min-h-[120px] resize-none p-5 text-[13px] leading-[1.8] outline-none bg-transparent font-mono"
          style={{ color: "#d4d4d4", caretColor: "#e879f9", borderBottom: "1px solid rgba(232,121,249,0.06)" }}
          spellCheck={false}
        />

        {/* Replace row */}
        {mode === "replace" && (
          <div className="flex items-center px-5 py-3 gap-3" style={{ borderBottom: "1px solid rgba(232,121,249,0.06)" }}>
            <span className="text-[10px] uppercase tracking-[0.12em] font-mono font-semibold" style={{ color: "rgba(232,121,249,0.4)" }}>Replace:</span>
            <input value={replaceWith} onChange={e => setReplaceWith(e.target.value)}
              className="flex-1 py-2 px-3 rounded-[8px] text-[13px] font-mono outline-none"
              style={{ background: "rgba(232,121,249,0.06)", border: "1px solid rgba(232,121,249,0.12)", color: "#e879f9" }} />
          </div>
        )}
      </div>

      {/* Results */}
      {!error && (
        <div className="rounded-[20px] p-5" style={{ background: "#18091c", border: "1px solid rgba(232,121,249,0.1)" }}>
          {mode === "test" ? (
            <>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold"
                  style={{ background: matches.length ? "rgba(232,121,249,0.15)" : "rgba(255,255,255,0.05)", color: matches.length ? "#e879f9" : "rgba(255,255,255,0.3)" }}>
                  {matches.length} match{matches.length !== 1 ? "es" : ""}
                </span>
                {matches.length > 0 && matches[0].groups.filter(Boolean).length > 0 && (
                  <span className="text-[10px] font-mono" style={{ color: "rgba(232,121,249,0.4)" }}>
                    {matches[0].groups.filter(Boolean).length} capture group{matches[0].groups.filter(Boolean).length !== 1 ? "s" : ""}
                  </span>
                )}
              </div>
              <div className="font-mono text-[13px] leading-[1.8] break-words whitespace-pre-wrap">
                {highlighted}
              </div>
            </>
          ) : (
            <pre className="font-mono text-[13px] leading-[1.8] whitespace-pre-wrap" style={{ color: "#d4d4d4" }}>
              {replaceResult || <span style={{ color: "rgba(255,255,255,0.2)" }}>Result will appear here</span>}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}
