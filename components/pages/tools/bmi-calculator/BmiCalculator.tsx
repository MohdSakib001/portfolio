"use client";
import { useState, useMemo } from "react";

type Unit = "metric" | "imperial";

interface BMIResult {
  bmi: number;
  category: string;
  color: string;
  pct: number;
  message: string;
}

function calcBMI(weight: number, height: number): number {
  return weight / (height * height);
}

function getCategory(bmi: number): BMIResult {
  const b = Math.round(bmi * 10) / 10;
  if (bmi < 18.5) return { bmi: b, category: "Underweight", color: "#3b82f6", pct: Math.max(0, (bmi / 18.5) * 22), message: "BMI below the healthy range. Consider consulting a nutritionist." };
  if (bmi < 25)   return { bmi: b, category: "Normal weight", color: "#22c55e", pct: 22 + ((bmi - 18.5) / 6.5) * 30, message: "You are in the healthy weight range. Maintain a balanced diet and regular activity." };
  if (bmi < 30)   return { bmi: b, category: "Overweight", color: "#f59e0b", pct: 52 + ((bmi - 25) / 5) * 25, message: "Slightly above the healthy range. Small lifestyle changes can make a big difference." };
  return { bmi: b, category: "Obese", color: "#ef4444", pct: Math.min(97, 77 + ((bmi - 30) / 10) * 20), message: "BMI in the obese range. Consulting a healthcare provider is recommended." };
}

export default function BmiCalculator() {
  const [unit, setUnit]       = useState<Unit>("metric");
  const [weight, setWeight]   = useState("");
  const [heightCm, setHCm]    = useState("");
  const [heightFt, setHFt]    = useState("");
  const [heightIn, setHIn]    = useState("");

  const result = useMemo<BMIResult | null>(() => {
    const w = parseFloat(weight);
    if (!w || w <= 0) return null;

    if (unit === "metric") {
      const hCm = parseFloat(heightCm);
      if (!hCm || hCm <= 0) return null;
      const hM = hCm / 100;
      return getCategory(calcBMI(w, hM));
    } else {
      const ft = parseFloat(heightFt) || 0;
      const inch = parseFloat(heightIn) || 0;
      const totalInch = ft * 12 + inch;
      if (!totalInch) return null;
      const hM = totalInch * 0.0254;
      const wKg = w * 0.453592;
      return getCategory(calcBMI(wKg, hM));
    }
  }, [unit, weight, heightCm, heightFt, heightIn]);

  const inputClass = "w-full rounded-[12px] px-4 py-3 text-[14px] font-medium outline-none transition-all bg-[#0d1a2a]";
  const inputStyle = { border: "1.5px solid rgba(255,255,255,0.08)", color: "#e2e8f0", fontFamily: "inherit" };

  return (
    <div>
      {/* Unit toggle */}
      <div className="flex gap-2 mb-5">
        {(["metric", "imperial"] as Unit[]).map(u => (
          <button
            key={u}
            onClick={() => setUnit(u)}
            className="flex-1 py-3 rounded-[12px] text-[12px] font-semibold uppercase tracking-[0.1em] transition-all"
            style={{
              background: unit === u ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.04)",
              color: unit === u ? "#22c55e" : "rgba(226,232,240,0.4)",
              border: unit === u ? "1.5px solid rgba(34,197,94,0.3)" : "1.5px solid rgba(255,255,255,0.06)",
            }}
          >
            {u === "metric" ? "Metric (kg / cm)" : "Imperial (lb / ft)"}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div
        className="rounded-[20px] p-7 space-y-4"
        style={{ background: "#0d1a2a", boxShadow: "0 0 0 1px rgba(34,197,94,0.1), 0 8px 32px rgba(0,0,0,0.5)" }}
      >
        <div>
          <label className="block mb-2 text-[10px] uppercase tracking-[0.14em] font-semibold" style={{ color: "rgba(226,232,240,0.4)" }}>
            Weight ({unit === "metric" ? "kg" : "lbs"})
          </label>
          <input
            type="number"
            value={weight}
            onChange={e => setWeight(e.target.value)}
            placeholder={unit === "metric" ? "e.g. 70" : "e.g. 154"}
            min="1"
            className={inputClass}
            style={inputStyle}
            onFocus={e => (e.currentTarget.style.borderColor = "rgba(34,197,94,0.5)")}
            onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
          />
        </div>

        {unit === "metric" ? (
          <div>
            <label className="block mb-2 text-[10px] uppercase tracking-[0.14em] font-semibold" style={{ color: "rgba(226,232,240,0.4)" }}>
              Height (cm)
            </label>
            <input
              type="number"
              value={heightCm}
              onChange={e => setHCm(e.target.value)}
              placeholder="e.g. 175"
              min="1"
              className={inputClass}
              style={inputStyle}
              onFocus={e => (e.currentTarget.style.borderColor = "rgba(34,197,94,0.5)")}
              onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
            />
          </div>
        ) : (
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block mb-2 text-[10px] uppercase tracking-[0.14em] font-semibold" style={{ color: "rgba(226,232,240,0.4)" }}>
                Feet
              </label>
              <input
                type="number"
                value={heightFt}
                onChange={e => setHFt(e.target.value)}
                placeholder="5"
                min="0"
                className={inputClass}
                style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = "rgba(34,197,94,0.5)")}
                onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
              />
            </div>
            <div className="flex-1">
              <label className="block mb-2 text-[10px] uppercase tracking-[0.14em] font-semibold" style={{ color: "rgba(226,232,240,0.4)" }}>
                Inches
              </label>
              <input
                type="number"
                value={heightIn}
                onChange={e => setHIn(e.target.value)}
                placeholder="9"
                min="0"
                max="11"
                className={inputClass}
                style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = "rgba(34,197,94,0.5)")}
                onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
              />
            </div>
          </div>
        )}
      </div>

      {/* Result */}
      {result && (
        <div className="mt-3 rounded-[20px] p-7" style={{ background: "#0d1a2a", boxShadow: "0 0 0 1px rgba(34,197,94,0.1)" }}>
          {/* BMI number */}
          <div className="text-center mb-7">
            <span
              className="font-bold tabular-nums leading-none"
              style={{ fontSize: "clamp(60px,12vw,88px)", color: result.color }}
            >
              {result.bmi}
            </span>
            <div className="flex items-center justify-center gap-2 mt-3">
              <span
                className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.1em]"
                style={{ background: `${result.color}18`, color: result.color, border: `1px solid ${result.color}30` }}
              >
                {result.category}
              </span>
            </div>
          </div>

          {/* Scale bar */}
          <div className="mb-5">
            <div className="relative h-3 rounded-full overflow-hidden"
              style={{ background: "linear-gradient(to right, #3b82f6 0%, #3b82f6 22%, #22c55e 22%, #22c55e 52%, #f59e0b 52%, #f59e0b 77%, #ef4444 77%, #ef4444 100%)" }}>
              <div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white shadow-lg"
                style={{ left: `${Math.min(94, result.pct)}%`, background: result.color, transition: "left 0.4s ease" }}
              />
            </div>
            <div className="flex justify-between mt-2" style={{ fontSize: "9px", color: "rgba(226,232,240,0.35)" }}>
              <span>Under<br />weight</span>
              <span className="text-center">Normal<br />weight</span>
              <span className="text-center">Over<br />weight</span>
              <span className="text-right">Obese</span>
            </div>
          </div>

          {/* BMI ranges */}
          <div className="grid grid-cols-4 gap-1.5 mb-5">
            {[
              { label: "Underweight", range: "< 18.5", color: "#3b82f6" },
              { label: "Normal",      range: "18.5 – 24.9", color: "#22c55e" },
              { label: "Overweight",  range: "25 – 29.9", color: "#f59e0b" },
              { label: "Obese",       range: "≥ 30", color: "#ef4444" },
            ].map(({ label, range, color }) => (
              <div key={label} className="rounded-[10px] p-2.5 text-center"
                style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${result.color === color ? color + "40" : "rgba(255,255,255,0.06)"}` }}>
                <p className="text-[9px] font-mono" style={{ color }}>{range}</p>
                <p className="text-[8.5px] mt-0.5" style={{ color: "rgba(226,232,240,0.4)" }}>{label}</p>
              </div>
            ))}
          </div>

          <p className="text-center" style={{ fontSize: "12.5px", color: "rgba(226,232,240,0.5)", lineHeight: 1.7 }}>
            {result.message}
          </p>
        </div>
      )}

      {!result && (
        <div className="mt-3 rounded-[16px] px-8 py-10 text-center" style={{ background: "#0d1a2a", boxShadow: "0 0 0 1px rgba(34,197,94,0.06)" }}>
          <p style={{ fontSize: "13px", color: "rgba(226,232,240,0.3)", lineHeight: 1.7 }}>
            Enter your height and weight above<br />to calculate your BMI.
          </p>
        </div>
      )}
    </div>
  );
}
