"use client";
import { useState } from "react";

type Mode = "whatIs" | "xIsWhat" | "change";

interface Result { value: string; label: string }

function calcWhatIs(pct: number, total: number): Result {
  const val = (pct / 100) * total;
  return { value: val % 1 === 0 ? val.toLocaleString() : val.toFixed(4).replace(/\.?0+$/, ""), label: `${pct}% of ${total.toLocaleString()} is` };
}
function calcXIsWhat(part: number, whole: number): Result {
  if (whole === 0) return { value: "—", label: "Cannot divide by zero" };
  const val = (part / whole) * 100;
  return { value: (val % 1 === 0 ? val : parseFloat(val.toFixed(4))) + "%", label: `${part.toLocaleString()} is what % of ${whole.toLocaleString()}` };
}
function calcChange(from: number, to: number): Result {
  if (from === 0) return { value: "—", label: "Cannot calculate from 0" };
  const val = ((to - from) / Math.abs(from)) * 100;
  const sign = val >= 0 ? "+" : "";
  return {
    value: `${sign}${parseFloat(val.toFixed(2))}%`,
    label: `Change from ${from.toLocaleString()} to ${to.toLocaleString()}`,
  };
}

const MODES: { key: Mode; label: string; desc: string }[] = [
  { key: "whatIs", label: "What is X% of Y?",     desc: "e.g. What is 20% of 250?" },
  { key: "xIsWhat", label: "X is what % of Y?",  desc: "e.g. 50 is what % of 200?" },
  { key: "change", label: "% Change from X to Y", desc: "e.g. 80 to 100 = +25%" },
];

export default function PercentageCalculator() {
  const [mode, setMode]   = useState<Mode>("whatIs");
  const [a, setA]         = useState("");
  const [b, setB]         = useState("");

  const result = (() => {
    const na = parseFloat(a), nb = parseFloat(b);
    if (isNaN(na) || isNaN(nb)) return null;
    if (mode === "whatIs")  return calcWhatIs(na, nb);
    if (mode === "xIsWhat") return calcXIsWhat(na, nb);
    return calcChange(na, nb);
  })();

  const isIncrease = result && mode === "change" && result.value.startsWith("+");
  const isDecrease = result && mode === "change" && result.value.startsWith("-");

  const labelA = mode === "whatIs" ? "Percentage (%)" : mode === "xIsWhat" ? "The part" : "From value";
  const labelB = mode === "whatIs" ? "Of what number" : mode === "xIsWhat" ? "The whole" : "To value";
  const placeholderA = mode === "whatIs" ? "20" : mode === "xIsWhat" ? "50" : "80";
  const placeholderB = mode === "whatIs" ? "250" : mode === "xIsWhat" ? "200" : "100";

  return (
    <div>
      {/* Mode selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-5">
        {MODES.map(m => (
          <button
            key={m.key}
            onClick={() => { setMode(m.key); setA(""); setB(""); }}
            className="text-left rounded-[14px] p-4 transition-all"
            style={{
              background: mode === m.key ? "#1c1b18" : "#f5f0e3",
              border: mode === m.key ? "2px solid #1c1b18" : "2px solid transparent",
            }}
          >
            <p className="font-bold text-[12px] mb-0.5" style={{ color: mode === m.key ? "#f4d949" : "#1c1b18" }}>
              {m.label}
            </p>
            <p className="text-[10.5px]" style={{ color: mode === m.key ? "rgba(244,217,73,0.6)" : "rgba(28,27,24,0.45)" }}>
              {m.desc}
            </p>
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div
        className="rounded-[20px] p-7"
        style={{ background: "#1c1b18", boxShadow: "0 8px 40px rgba(28,27,24,0.25)" }}
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-[10px] uppercase tracking-[0.14em] font-bold" style={{ color: "rgba(244,217,73,0.6)" }}>
              {labelA}
            </label>
            <input
              type="number"
              value={a}
              onChange={e => setA(e.target.value)}
              placeholder={placeholderA}
              className="w-full rounded-[12px] px-4 py-3.5 text-[22px] font-bold tabular-nums outline-none transition-all"
              style={{ background: "rgba(244,217,73,0.08)", border: "1.5px solid rgba(244,217,73,0.15)", color: "#f4d949", fontFamily: "inherit" }}
              onFocus={e => (e.currentTarget.style.borderColor = "rgba(244,217,73,0.5)")}
              onBlur={e => (e.currentTarget.style.borderColor = "rgba(244,217,73,0.15)")}
            />
          </div>
          <div>
            <label className="block mb-2 text-[10px] uppercase tracking-[0.14em] font-bold" style={{ color: "rgba(244,217,73,0.6)" }}>
              {labelB}
            </label>
            <input
              type="number"
              value={b}
              onChange={e => setB(e.target.value)}
              placeholder={placeholderB}
              className="w-full rounded-[12px] px-4 py-3.5 text-[22px] font-bold tabular-nums outline-none transition-all"
              style={{ background: "rgba(244,217,73,0.08)", border: "1.5px solid rgba(244,217,73,0.15)", color: "#f4d949", fontFamily: "inherit" }}
              onFocus={e => (e.currentTarget.style.borderColor = "rgba(244,217,73,0.5)")}
              onBlur={e => (e.currentTarget.style.borderColor = "rgba(244,217,73,0.15)")}
            />
          </div>
        </div>

        {/* Result display */}
        <div
          className="mt-6 rounded-[16px] p-6 text-center"
          style={{ background: result ? "#f4d949" : "rgba(244,217,73,0.06)", minHeight: "100px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
        >
          {result ? (
            <>
              <p className="font-bold tabular-nums leading-none mb-2"
                style={{
                  fontSize: "clamp(36px,8vw,56px)",
                  color: isIncrease ? "#16a34a" : isDecrease ? "#dc2626" : "#1c1b18",
                }}>
                {result.value}
              </p>
              <p className="text-[12px] font-medium" style={{ color: "rgba(28,27,24,0.55)" }}>
                {result.label}
              </p>
            </>
          ) : (
            <p style={{ fontSize: "13px", color: "rgba(244,217,73,0.3)" }}>
              Enter both values to see the result
            </p>
          )}
        </div>
      </div>

      {/* Quick reference */}
      <div className="mt-3 grid grid-cols-4 gap-2">
        {[["10%", "÷ 10"], ["20%", "÷ 5"], ["25%", "÷ 4"], ["50%", "÷ 2"]].map(([pct, shortcut]) => (
          <div key={pct} className="rounded-[12px] py-3 text-center"
            style={{ background: "#f5f0e3", border: "2px solid transparent" }}>
            <p className="font-bold text-[14px]" style={{ color: "#1c1b18" }}>{pct}</p>
            <p className="text-[10px] font-mono" style={{ color: "rgba(28,27,24,0.4)" }}>{shortcut}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
