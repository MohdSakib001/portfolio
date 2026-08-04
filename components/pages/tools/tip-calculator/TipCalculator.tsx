"use client";
import { useState, useMemo } from "react";

const TIP_PRESETS = [10, 15, 18, 20, 25];

export default function TipCalculator() {
  const [bill,    setBill]    = useState("");
  const [tipPct,  setTipPct]  = useState(18);
  const [custom,  setCustom]  = useState("");
  const [people,  setPeople]  = useState("2");
  const [useCustom, setUseCustom] = useState(false);

  const result = useMemo(() => {
    const b = parseFloat(bill);
    const p = parseInt(people) || 1;
    const t = useCustom ? parseFloat(custom) || 0 : tipPct;
    if (!b || b <= 0) return null;

    const tipTotal   = b * (t / 100);
    const grandTotal = b + tipTotal;
    const perPerson  = grandTotal / p;
    const tipPer     = tipTotal / p;

    return { tipTotal, grandTotal, perPerson, tipPer, t };
  }, [bill, tipPct, custom, people, useCustom]);

  const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div>
      {/* Bill input */}
      <div className="rounded-[20px] p-7 mb-3"
        style={{ background: "#fffbf0", boxShadow: "0 0 0 2px #fde68a, 0 8px 32px rgba(245,158,11,0.1)" }}>
        <label className="block mb-2 text-[10px] uppercase tracking-[0.14em] font-bold" style={{ color: "rgba(120,53,15,0.6)" }}>
          Bill Amount
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[20px] font-bold" style={{ color: "rgba(120,53,15,0.4)" }}>$</span>
          <input
            type="number"
            value={bill}
            onChange={e => setBill(e.target.value)}
            placeholder="0.00"
            min="0"
            step="0.01"
            className="w-full pl-10 pr-4 py-4 rounded-[14px] text-[28px] font-bold tabular-nums outline-none"
            style={{ background: "#ffffff", border: "2px solid #fde68a", color: "#78350f", fontFamily: "inherit" }}
            onFocus={e => (e.currentTarget.style.borderColor = "#f59e0b")}
            onBlur={e => (e.currentTarget.style.borderColor = "#fde68a")}
          />
        </div>
      </div>

      {/* Tip presets */}
      <div className="rounded-[20px] p-6 mb-3"
        style={{ background: "#ffffff", boxShadow: "0 0 0 1px rgba(3,3,2,0.06), 0 4px 16px rgba(3,3,2,0.05)" }}>
        <label className="block mb-3 text-[10px] uppercase tracking-[0.14em] font-bold" style={{ color: "rgba(3,3,2,0.4)" }}>
          Tip Percentage
        </label>
        <div className="flex gap-2 flex-wrap mb-3">
          {TIP_PRESETS.map(t => (
            <button key={t} onClick={() => { setTipPct(t); setUseCustom(false); }}
              className="px-4 py-2.5 rounded-[10px] text-[13px] font-bold transition-all"
              style={{
                background: !useCustom && tipPct === t ? "#f59e0b" : "#fef3c7",
                color: !useCustom && tipPct === t ? "#ffffff" : "#92400e",
                border: !useCustom && tipPct === t ? "2px solid #f59e0b" : "2px solid transparent",
              }}>
              {t}%
            </button>
          ))}
          <input
            type="number"
            value={custom}
            onChange={e => { setCustom(e.target.value); setUseCustom(true); }}
            onFocus={() => setUseCustom(true)}
            placeholder="Custom %"
            min="0"
            max="100"
            className="px-4 py-2.5 rounded-[10px] text-[13px] font-bold tabular-nums outline-none flex-1 min-w-[90px]"
            style={{
              background: useCustom ? "#f59e0b" : "#fef3c7",
              color: useCustom ? "#ffffff" : "#92400e",
              border: `2px solid ${useCustom ? "#f59e0b" : "transparent"}`,
              fontFamily: "inherit",
            }}
          />
        </div>

        {/* Split */}
        <label className="block mb-2 text-[10px] uppercase tracking-[0.14em] font-bold" style={{ color: "rgba(3,3,2,0.4)" }}>
          Split Between
        </label>
        <div className="flex items-center gap-3">
          <button onClick={() => setPeople(p => String(Math.max(1, parseInt(p) - 1)))}
            className="w-10 h-10 rounded-full text-[18px] font-bold flex items-center justify-center transition-all"
            style={{ background: "#fef3c7", color: "#92400e" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#fde68a")}
            onMouseLeave={e => (e.currentTarget.style.background = "#fef3c7")}>
            −
          </button>
          <div className="flex-1 text-center">
            <span className="font-bold tabular-nums" style={{ fontSize: "28px", color: "#1c1b18" }}>{people}</span>
            <span className="ml-2 text-[13px]" style={{ color: "rgba(3,3,2,0.4)" }}>{parseInt(people) === 1 ? "person" : "people"}</span>
          </div>
          <button onClick={() => setPeople(p => String(Math.min(50, parseInt(p) + 1)))}
            className="w-10 h-10 rounded-full text-[18px] font-bold flex items-center justify-center transition-all"
            style={{ background: "#fef3c7", color: "#92400e" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#fde68a")}
            onMouseLeave={e => (e.currentTarget.style.background = "#fef3c7")}>
            +
          </button>
        </div>
      </div>

      {/* Results */}
      {result ? (
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-[18px] p-6 text-center col-span-2"
            style={{ background: "#f59e0b", boxShadow: "0 8px 32px rgba(245,158,11,0.3)" }}>
            <p className="text-[11px] uppercase tracking-[0.15em] font-bold mb-1.5" style={{ color: "rgba(255,255,255,0.7)" }}>
              Total Bill
            </p>
            <p className="font-bold tabular-nums" style={{ fontSize: "clamp(36px,8vw,52px)", color: "#ffffff", lineHeight: 1 }}>
              ${fmt(result.grandTotal)}
            </p>
            <p className="mt-2 text-[12px]" style={{ color: "rgba(255,255,255,0.7)" }}>
              including {result.t}% tip (${fmt(result.tipTotal)})
            </p>
          </div>

          {parseInt(people) > 1 && (
            <>
              <div className="rounded-[16px] p-5 text-center"
                style={{ background: "#fffbf0", border: "2px solid #fde68a" }}>
                <p className="text-[10px] uppercase tracking-[0.12em] font-bold mb-1.5" style={{ color: "rgba(120,53,15,0.5)" }}>Per Person</p>
                <p className="font-bold tabular-nums" style={{ fontSize: "24px", color: "#92400e" }}>${fmt(result.perPerson)}</p>
              </div>
              <div className="rounded-[16px] p-5 text-center"
                style={{ background: "#fffbf0", border: "2px solid #fde68a" }}>
                <p className="text-[10px] uppercase tracking-[0.12em] font-bold mb-1.5" style={{ color: "rgba(120,53,15,0.5)" }}>Tip per Person</p>
                <p className="font-bold tabular-nums" style={{ fontSize: "24px", color: "#92400e" }}>${fmt(result.tipPer)}</p>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="rounded-[16px] px-8 py-10 text-center"
          style={{ background: "#fffbf0", border: "2px dashed #fde68a" }}>
          <p className="text-2xl mb-2">🧾</p>
          <p style={{ fontSize: "13px", color: "rgba(120,53,15,0.5)", lineHeight: 1.7 }}>
            Enter the bill amount above<br />to calculate the tip.
          </p>
        </div>
      )}
    </div>
  );
}
