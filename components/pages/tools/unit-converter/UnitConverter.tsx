"use client";
import { useState, useMemo } from "react";
import { ArrowLeftRight } from "lucide-react";

type Category = "length" | "weight" | "temperature" | "volume" | "speed" | "area" | "data";

interface UnitDef { label: string; factor?: number; toBase?: (v: number) => number; fromBase?: (v: number) => number }

const UNITS: Record<Category, { label: string; icon: string; units: Record<string, UnitDef> }> = {
  length: {
    label: "Length", icon: "📏",
    units: {
      m:    { label: "Metres",      factor: 1 },
      km:   { label: "Kilometres",  factor: 1000 },
      cm:   { label: "Centimetres", factor: 0.01 },
      mm:   { label: "Millimetres", factor: 0.001 },
      mi:   { label: "Miles",       factor: 1609.344 },
      yd:   { label: "Yards",       factor: 0.9144 },
      ft:   { label: "Feet",        factor: 0.3048 },
      inch: { label: "Inches",      factor: 0.0254 },
      nmi:  { label: "Nautical mi", factor: 1852 },
    },
  },
  weight: {
    label: "Weight", icon: "⚖️",
    units: {
      kg: { label: "Kilograms",  factor: 1 },
      g:  { label: "Grams",      factor: 0.001 },
      mg: { label: "Milligrams", factor: 0.000001 },
      t:  { label: "Metric ton", factor: 1000 },
      lb: { label: "Pounds",     factor: 0.45359237 },
      oz: { label: "Ounces",     factor: 0.02834952 },
      st: { label: "Stone",      factor: 6.35029318 },
    },
  },
  temperature: {
    label: "Temperature", icon: "🌡️",
    units: {
      c: { label: "Celsius",    toBase: v => v,                     fromBase: v => v },
      f: { label: "Fahrenheit", toBase: v => (v - 32) * 5 / 9,     fromBase: v => v * 9 / 5 + 32 },
      k: { label: "Kelvin",     toBase: v => v - 273.15,            fromBase: v => v + 273.15 },
    },
  },
  volume: {
    label: "Volume", icon: "🧪",
    units: {
      l:    { label: "Litres",       factor: 1 },
      ml:   { label: "Millilitres",  factor: 0.001 },
      m3:   { label: "Cubic metres", factor: 1000 },
      gal:  { label: "US Gallons",   factor: 3.785411784 },
      qt:   { label: "Quarts (US)",  factor: 0.946352946 },
      pt:   { label: "Pints (US)",   factor: 0.473176473 },
      cup:  { label: "Cups (US)",    factor: 0.2365882365 },
      floz: { label: "Fl oz (US)",   factor: 0.02957352956 },
    },
  },
  speed: {
    label: "Speed", icon: "💨",
    units: {
      mps:  { label: "m/s",     factor: 1 },
      kph:  { label: "km/h",    factor: 1 / 3.6 },
      mph:  { label: "mph",     factor: 0.44704 },
      kt:   { label: "Knots",   factor: 0.514444 },
      c:    { label: "Speed of light", factor: 299792458 },
    },
  },
  area: {
    label: "Area", icon: "▦",
    units: {
      m2:   { label: "m²",         factor: 1 },
      km2:  { label: "km²",        factor: 1e6 },
      ha:   { label: "Hectares",   factor: 10000 },
      acre: { label: "Acres",      factor: 4046.856422 },
      ft2:  { label: "ft²",        factor: 0.09290304 },
      mi2:  { label: "mi²",        factor: 2589988.11 },
    },
  },
  data: {
    label: "Data", icon: "💾",
    units: {
      b:   { label: "Bytes",     factor: 1 },
      kb:  { label: "Kilobytes", factor: 1024 },
      mb:  { label: "Megabytes", factor: 1048576 },
      gb:  { label: "Gigabytes", factor: 1073741824 },
      tb:  { label: "Terabytes", factor: 1.099511628e12 },
      bit: { label: "Bits",      factor: 0.125 },
    },
  },
};

function convert(value: number, from: string, to: string, category: Category): number {
  if (from === to) return value;
  const units = UNITS[category].units;
  const fromDef = units[from], toDef = units[to];
  if (!fromDef || !toDef) return NaN;

  if (fromDef.toBase && toDef.fromBase) {
    return toDef.fromBase(fromDef.toBase(value));
  }
  const baseVal = value * (fromDef.factor ?? 1);
  return baseVal / (toDef.factor ?? 1);
}

export default function UnitConverter() {
  const [cat,   setCat]   = useState<Category>("length");
  const [from,  setFrom]  = useState("m");
  const [to,    setTo]    = useState("km");
  const [input, setInput] = useState("1");

  const catUnits = UNITS[cat].units;
  const unitKeys = Object.keys(catUnits);

  const result = useMemo(() => {
    const v = parseFloat(input);
    if (isNaN(v)) return null;
    return convert(v, from, to, cat);
  }, [input, from, to, cat]);

  const handleSwap = () => { setFrom(to); setTo(from); };
  const handleCatChange = (c: Category) => {
    setCat(c);
    const keys = Object.keys(UNITS[c].units);
    setFrom(keys[0]);
    setTo(keys[1] || keys[0]);
    setInput("1");
  };

  const fmt = (n: number): string => {
    if (Math.abs(n) >= 1e9 || (Math.abs(n) < 0.0001 && n !== 0)) return n.toExponential(6);
    return parseFloat(n.toPrecision(10)).toString();
  };

  return (
    <div>
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        {(Object.keys(UNITS) as Category[]).map(c => (
          <button key={c} onClick={() => handleCatChange(c)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-[10px] text-[11px] font-semibold transition-all"
            style={{
              background: cat === c ? "#0d9488" : "rgba(13,148,136,0.08)",
              color: cat === c ? "#ffffff" : "rgba(15,118,110,0.8)",
              border: cat === c ? "1px solid #0d9488" : "1px solid rgba(13,148,136,0.15)",
            }}>
            <span>{UNITS[c].icon}</span>
            {UNITS[c].label}
          </button>
        ))}
      </div>

      {/* Main converter */}
      <div className="rounded-[20px] p-7"
        style={{ background: "#ffffff", boxShadow: "0 0 0 1px rgba(13,148,136,0.1), 0 8px 32px rgba(13,148,136,0.06)" }}>

        <div className="grid grid-cols-[1fr,auto,1fr] gap-3 items-end">
          {/* From */}
          <div>
            <label className="block mb-1.5 text-[10px] uppercase tracking-[0.12em] font-bold" style={{ color: "rgba(15,118,110,0.6)" }}>From</label>
            <select value={from} onChange={e => setFrom(e.target.value)}
              className="w-full rounded-[12px] px-4 py-3 text-[13px] font-semibold outline-none mb-2"
              style={{ background: "#f0fdfa", border: "1.5px solid rgba(13,148,136,0.2)", color: "#0d9488", fontFamily: "inherit" }}>
              {unitKeys.map(k => <option key={k} value={k}>{catUnits[k].label}</option>)}
            </select>
            <input type="number" value={input} onChange={e => setInput(e.target.value)} placeholder="1"
              className="w-full rounded-[12px] px-4 py-3 text-[18px] font-bold tabular-nums outline-none"
              style={{ background: "#f0fdfa", border: "1.5px solid rgba(13,148,136,0.2)", color: "#134e4a", fontFamily: "inherit" }}
              onFocus={e => (e.currentTarget.style.borderColor = "#0d9488")}
              onBlur={e => (e.currentTarget.style.borderColor = "rgba(13,148,136,0.2)")} />
          </div>

          {/* Swap */}
          <button onClick={handleSwap}
            className="mb-0.5 w-10 h-10 rounded-full flex items-center justify-center transition-all"
            style={{ background: "#0d9488", color: "#ffffff" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#0f766e")}
            onMouseLeave={e => (e.currentTarget.style.background = "#0d9488")}>
            <ArrowLeftRight size={16} />
          </button>

          {/* To */}
          <div>
            <label className="block mb-1.5 text-[10px] uppercase tracking-[0.12em] font-bold" style={{ color: "rgba(15,118,110,0.6)" }}>To</label>
            <select value={to} onChange={e => setTo(e.target.value)}
              className="w-full rounded-[12px] px-4 py-3 text-[13px] font-semibold outline-none mb-2"
              style={{ background: "#f0fdfa", border: "1.5px solid rgba(13,148,136,0.2)", color: "#0d9488", fontFamily: "inherit" }}>
              {unitKeys.map(k => <option key={k} value={k}>{catUnits[k].label}</option>)}
            </select>
            <div className="w-full rounded-[12px] px-4 py-3 min-h-[52px] flex items-center"
              style={{ background: result !== null ? "#ccfbf1" : "#f0fdfa", border: "1.5px solid rgba(13,148,136,0.2)" }}>
              <span className="text-[18px] font-bold tabular-nums break-all" style={{ color: "#134e4a" }}>
                {result !== null ? fmt(result) : "—"}
              </span>
            </div>
          </div>
        </div>

        {result !== null && (
          <p className="mt-5 text-center text-[13px]" style={{ color: "rgba(15,118,110,0.6)" }}>
            <span className="font-semibold" style={{ color: "#0d9488" }}>{input} {catUnits[from]?.label}</span>
            {" = "}
            <span className="font-semibold" style={{ color: "#0d9488" }}>{fmt(result)} {catUnits[to]?.label}</span>
          </p>
        )}
      </div>

      {/* All values for current input */}
      {result !== null && (
        <div className="mt-3 rounded-[16px] p-5"
          style={{ background: "#ffffff", boxShadow: "0 0 0 1px rgba(13,148,136,0.08)" }}>
          <p className="text-[10px] uppercase tracking-[0.12em] font-bold mb-3" style={{ color: "rgba(15,118,110,0.5)" }}>
            All conversions for {input} {catUnits[from]?.label}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {unitKeys.filter(k => k !== from).map(k => {
              const val = convert(parseFloat(input), from, k, cat);
              return (
                <div key={k} className="rounded-[10px] px-3 py-2.5"
                  style={{ background: "#f0fdfa", border: "1px solid rgba(13,148,136,0.1)" }}>
                  <p className="font-bold tabular-nums text-[13px]" style={{ color: "#134e4a" }}>{fmt(val)}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: "rgba(15,118,110,0.55)" }}>{catUnits[k].label}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
