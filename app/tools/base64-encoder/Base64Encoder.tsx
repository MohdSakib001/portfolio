"use client";
import { useState } from "react";
import { Copy, Check, ArrowLeftRight } from "lucide-react";

type Mode = "encode" | "decode" | "url-encode" | "url-decode";

function encodeB64(s: string): string {
  try { return btoa(unescape(encodeURIComponent(s))); }
  catch { return "Error: Invalid input for Base64 encoding"; }
}
function decodeB64(s: string): string {
  try { return decodeURIComponent(escape(atob(s.trim()))); }
  catch { return "Error: Invalid Base64 string"; }
}
function urlEncode(s: string): string {
  try { return encodeURIComponent(s); }
  catch { return "Error: Cannot URL-encode this input"; }
}
function urlDecode(s: string): string {
  try { return decodeURIComponent(s); }
  catch { return "Error: Invalid URL-encoded string"; }
}

const MODES: { key: Mode; label: string; desc: string }[] = [
  { key: "encode",     label: "Base64 Encode",  desc: "Text → Base64" },
  { key: "decode",     label: "Base64 Decode",  desc: "Base64 → Text" },
  { key: "url-encode", label: "URL Encode",      desc: "Text → %xx" },
  { key: "url-decode", label: "URL Decode",      desc: "%xx → Text" },
];

export default function Base64Encoder() {
  const [mode,  setMode]   = useState<Mode>("encode");
  const [input, setInput]  = useState("");
  const [copied, setCopied] = useState(false);

  const output = (() => {
    if (!input) return "";
    switch (mode) {
      case "encode":     return encodeB64(input);
      case "decode":     return decodeB64(input);
      case "url-encode": return urlEncode(input);
      case "url-decode": return urlDecode(input);
    }
  })();

  const isError = output.startsWith("Error:");

  const handleCopy = async () => {
    if (!output || isError) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const swapInputOutput = () => {
    if (!output || isError) return;
    setInput(output);
    if (mode === "encode")     setMode("decode");
    else if (mode === "decode") setMode("encode");
    else if (mode === "url-encode") setMode("url-decode");
    else setMode("url-encode");
  };

  return (
    <div>
      {/* Mode selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {MODES.map(m => (
          <button key={m.key} onClick={() => { setMode(m.key); setInput(""); }}
            className="rounded-[12px] p-3 text-left transition-all"
            style={{
              background: mode === m.key ? "#161b22" : "rgba(255,255,255,0.03)",
              border: mode === m.key ? "1.5px solid rgba(99,102,241,0.4)" : "1.5px solid rgba(255,255,255,0.06)",
            }}>
            <p className="font-semibold text-[11px] mb-0.5" style={{ color: mode === m.key ? "#818cf8" : "rgba(255,255,255,0.5)", fontFamily: "monospace" }}>
              {m.label}
            </p>
            <p className="text-[9.5px] font-mono" style={{ color: mode === m.key ? "rgba(129,140,248,0.5)" : "rgba(255,255,255,0.2)" }}>
              {m.desc}
            </p>
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="rounded-[20px] overflow-hidden mb-3"
        style={{ background: "#161b22", boxShadow: "0 0 0 1px rgba(99,102,241,0.15), 0 8px 32px rgba(0,0,0,0.5)" }}>
        <div className="flex items-center justify-between px-5 py-3"
          style={{ borderBottom: "1px solid rgba(99,102,241,0.08)" }}>
          <span className="text-[9.5px] uppercase tracking-[0.15em] font-semibold font-mono" style={{ color: "rgba(129,140,248,0.5)" }}>
            Input
          </span>
          <button onClick={() => setInput("")} disabled={!input}
            className="text-[10px] font-mono px-2.5 py-1 rounded-lg disabled:opacity-20"
            style={{ color: "rgba(129,140,248,0.5)" }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(99,102,241,0.1)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
            clear
          </button>
        </div>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={mode === "decode" || mode === "url-decode"
            ? "Paste encoded string here…"
            : "Type or paste text to encode…"}
          autoFocus
          className="w-full min-h-[130px] resize-none p-5 text-[13.5px] leading-[1.7] outline-none bg-transparent font-mono"
          style={{ color: "#e2e8f0", caretColor: "#818cf8" }}
        />
      </div>

      {/* Swap button */}
      <div className="flex justify-center my-2">
        <button onClick={swapInputOutput} disabled={!output || isError}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-mono transition-all disabled:opacity-20"
          style={{ background: "rgba(99,102,241,0.1)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.2)" }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(99,102,241,0.18)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(99,102,241,0.1)")}>
          <ArrowLeftRight size={12} />
          Swap & {mode === "encode" || mode === "url-encode" ? "Decode" : "Encode"}
        </button>
      </div>

      {/* Output */}
      <div className="rounded-[20px] overflow-hidden"
        style={{ background: "#161b22", boxShadow: "0 0 0 1px rgba(99,102,241,0.15)" }}>
        <div className="flex items-center justify-between px-5 py-3"
          style={{ borderBottom: "1px solid rgba(99,102,241,0.08)" }}>
          <span className="text-[9.5px] uppercase tracking-[0.15em] font-semibold font-mono" style={{ color: "rgba(129,140,248,0.5)" }}>
            Output
          </span>
          <button onClick={handleCopy} disabled={!output || isError}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-mono font-medium transition-all disabled:opacity-20"
            style={{ color: copied ? "#22c55e" : "rgba(129,140,248,0.6)", background: copied ? "rgba(34,197,94,0.1)" : "rgba(99,102,241,0.06)" }}>
            {copied ? <Check size={10} /> : <Copy size={10} />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <div className="p-5 min-h-[130px]">
          {output ? (
            <p className="font-mono text-[13px] leading-[1.75] break-all whitespace-pre-wrap"
              style={{ color: isError ? "#f87171" : "#a5b4fc" }}>
              {output}
            </p>
          ) : (
            <p className="font-mono text-[13px]" style={{ color: "rgba(129,140,248,0.2)" }}>
              Output will appear here…
            </p>
          )}
        </div>
      </div>

      {/* Character counts */}
      {(input || output) && !isError && (
        <div className="flex gap-4 mt-3 justify-center">
          <span className="text-[10px] font-mono" style={{ color: "rgba(129,140,248,0.4)" }}>
            Input: {input.length.toLocaleString()} chars
          </span>
          <span style={{ color: "rgba(129,140,248,0.2)" }}>·</span>
          <span className="text-[10px] font-mono" style={{ color: "rgba(129,140,248,0.4)" }}>
            Output: {output.length.toLocaleString()} chars
          </span>
          {output && !isError && (
            <>
              <span style={{ color: "rgba(129,140,248,0.2)" }}>·</span>
              <span className="text-[10px] font-mono" style={{ color: "rgba(129,140,248,0.4)" }}>
                {mode === "encode" ? `+${(((output.length - input.length) / input.length) * 100).toFixed(0)}%` :
                 mode === "decode" ? `−${(((input.length - output.length) / input.length) * 100).toFixed(0)}%` : ""}
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
