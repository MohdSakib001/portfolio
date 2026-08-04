"use client";
import { useState, useCallback } from "react";
import { RefreshCw, Copy, Check } from "lucide-react";

export default function RandomNumberGenerator() {
  const [min,      setMin]      = useState("1");
  const [max,      setMax]      = useState("100");
  const [count,    setCount]    = useState("1");
  const [decimals, setDecimals] = useState(false);
  const [unique,   setUnique]   = useState(false);
  const [sorted,   setSorted]   = useState(false);
  const [results,  setResults]  = useState<number[]>([]);
  const [copied,   setCopied]   = useState(false);
  const [error,    setError]    = useState("");

  const generate = useCallback(() => {
    const lo = parseFloat(min), hi = parseFloat(max), cnt = parseInt(count);
    setError("");
    if (isNaN(lo) || isNaN(hi)) { setError("Enter valid min and max values."); return; }
    if (lo >= hi) { setError("Min must be less than Max."); return; }
    if (isNaN(cnt) || cnt < 1 || cnt > 500) { setError("Count must be between 1 and 500."); return; }
    if (unique && !decimals && cnt > (hi - lo + 1)) { setError("Not enough unique integers in this range."); return; }

    const nums: number[] = [];
    const used = new Set<number>();
    let attempts = 0;

    while (nums.length < cnt && attempts < 10000) {
      attempts++;
      const arr = new Uint32Array(1);
      crypto.getRandomValues(arr);
      const frac = arr[0] / (0xFFFFFFFF + 1);
      let n = lo + frac * (hi - lo);
      if (!decimals) n = Math.floor(n + (n >= 0 ? 0 : 0));
      n = decimals ? parseFloat(n.toFixed(4)) : Math.floor(n);
      if (n < lo || n > hi) continue;
      if (unique) {
        if (used.has(n)) continue;
        used.add(n);
      }
      nums.push(n);
    }

    const final = sorted ? [...nums].sort((a, b) => a - b) : nums;
    setResults(final);
    setCopied(false);
  }, [min, max, count, decimals, unique, sorted]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(results.join(", "));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const singleMode = results.length === 1;

  return (
    <div>
      {/* Big display */}
      <div
        className="rounded-[24px] p-8 text-center mb-3 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #a855f7 100%)", minHeight: "160px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
      >
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #fff 1px, transparent 1px), radial-gradient(circle at 80% 20%, #fff 1px, transparent 1px), radial-gradient(circle at 60% 80%, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        {results.length === 0 ? (
          <div className="relative">
            <p className="font-bold tabular-nums" style={{ fontSize: "clamp(56px,12vw,88px)", color: "rgba(255,255,255,0.2)", lineHeight: 1 }}>?</p>
            <p className="mt-2 text-[12px] font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>Click Generate</p>
          </div>
        ) : singleMode ? (
          <div className="relative">
            <p className="font-bold tabular-nums leading-none" style={{ fontSize: "clamp(56px,14vw,96px)", color: "#ffffff" }}>
              {results[0].toLocaleString()}
            </p>
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.15em]" style={{ color: "rgba(255,255,255,0.5)" }}>
              Random Number
            </p>
          </div>
        ) : (
          <div className="relative w-full">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
              {results.length} numbers generated
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {results.map((n, i) => (
                <span key={i} className="px-3 py-1.5 rounded-lg font-bold tabular-nums text-[14px]"
                  style={{ background: "rgba(255,255,255,0.15)", color: "#ffffff" }}>
                  {n.toLocaleString()}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="rounded-[20px] p-6" style={{ background: "#ffffff", boxShadow: "0 0 0 1px rgba(3,3,2,0.06), 0 4px 24px rgba(3,3,2,0.05)" }}>
        {/* Range inputs */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div>
            <label className="block mb-1.5 text-[10px] uppercase tracking-[0.12em] font-semibold" style={{ color: "rgba(3,3,2,0.4)" }}>Min</label>
            <input type="number" value={min} onChange={e => setMin(e.target.value)}
              className="w-full rounded-[10px] px-3 py-2.5 text-[14px] font-bold tabular-nums outline-none"
              style={{ background: "#f5f3ff", border: "1.5px solid #ddd6fe", color: "#4f46e5", fontFamily: "inherit" }}
              onFocus={e => (e.currentTarget.style.borderColor = "#7c3aed")}
              onBlur={e => (e.currentTarget.style.borderColor = "#ddd6fe")} />
          </div>
          <div>
            <label className="block mb-1.5 text-[10px] uppercase tracking-[0.12em] font-semibold" style={{ color: "rgba(3,3,2,0.4)" }}>Max</label>
            <input type="number" value={max} onChange={e => setMax(e.target.value)}
              className="w-full rounded-[10px] px-3 py-2.5 text-[14px] font-bold tabular-nums outline-none"
              style={{ background: "#f5f3ff", border: "1.5px solid #ddd6fe", color: "#4f46e5", fontFamily: "inherit" }}
              onFocus={e => (e.currentTarget.style.borderColor = "#7c3aed")}
              onBlur={e => (e.currentTarget.style.borderColor = "#ddd6fe")} />
          </div>
          <div>
            <label className="block mb-1.5 text-[10px] uppercase tracking-[0.12em] font-semibold" style={{ color: "rgba(3,3,2,0.4)" }}>Count</label>
            <input type="number" value={count} onChange={e => setCount(e.target.value)} min={1} max={500}
              className="w-full rounded-[10px] px-3 py-2.5 text-[14px] font-bold tabular-nums outline-none"
              style={{ background: "#f5f3ff", border: "1.5px solid #ddd6fe", color: "#4f46e5", fontFamily: "inherit" }}
              onFocus={e => (e.currentTarget.style.borderColor = "#7c3aed")}
              onBlur={e => (e.currentTarget.style.borderColor = "#ddd6fe")} />
          </div>
        </div>

        {/* Options */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            { label: "Decimals", state: decimals, set: setDecimals },
            { label: "Unique only", state: unique, set: setUnique },
            { label: "Sort ascending", state: sorted, set: setSorted },
          ].map(({ label, state, set }) => (
            <button key={label} onClick={() => set(v => !v)}
              className="px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all"
              style={{
                background: state ? "#7c3aed" : "rgba(124,58,237,0.08)",
                color: state ? "#ffffff" : "#7c3aed",
                border: `1px solid ${state ? "#7c3aed" : "rgba(124,58,237,0.2)"}`,
              }}>
              {label}
            </button>
          ))}
        </div>

        {error && (
          <p className="mb-4 px-3 py-2 rounded-[8px] text-[12px]" style={{ background: "#fef2f2", color: "#ef4444", border: "1px solid #fecaca" }}>
            {error}
          </p>
        )}

        {/* Buttons */}
        <div className="flex gap-2">
          <button onClick={generate}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-[12px] font-bold text-[13px] transition-all"
            style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "#ffffff" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
            <RefreshCw size={14} />
            Generate
          </button>
          {results.length > 0 && (
            <button onClick={handleCopy}
              className="flex items-center gap-2 px-5 py-3 rounded-[12px] font-semibold text-[12px] transition-all"
              style={{ background: copied ? "#7c3aed" : "rgba(124,58,237,0.08)", color: copied ? "#fff" : "#7c3aed", border: "1px solid rgba(124,58,237,0.2)" }}>
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? "Copied!" : "Copy"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
