"use client";
import { useState } from "react";

type Mode = "calculate" | "scale" | "compare";

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function simplifyRatio(w: number, h: number): { ratioW: number; ratioH: number; decimal: string } | null {
  const iw = Math.round(w);
  const ih = Math.round(h);
  if (iw <= 0 || ih <= 0) return null;
  const d = gcd(iw, ih);
  return { ratioW: iw / d, ratioH: ih / d, decimal: (w / h).toFixed(3) };
}

function parseRatioString(s: string): { rw: number; rh: number } | null {
  const parts = s.split(":").map((p) => parseFloat(p.trim()));
  if (parts.length !== 2 || parts.some(isNaN) || parts[0] <= 0 || parts[1] <= 0) return null;
  return { rw: parts[0], rh: parts[1] };
}

const PRESETS = [
  { label: "16:9", w: 16, h: 9 },
  { label: "4:3", w: 4, h: 3 },
  { label: "1:1", w: 1, h: 1 },
  { label: "3:2", w: 3, h: 2 },
  { label: "21:9", w: 21, h: 9 },
  { label: "9:16", w: 9, h: 16 },
  { label: "4:5", w: 4, h: 5 },
  { label: "2:3", w: 2, h: 3 },
];

const MODES: { key: Mode; label: string; desc: string }[] = [
  { key: "calculate", label: "Calculate Ratio", desc: "Width × Height → ratio" },
  { key: "scale", label: "Scale from Ratio", desc: "Ratio + one side → other side" },
  { key: "compare", label: "Compare Ratios", desc: "Are two sizes the same ratio?" },
];

const RED = "#dc2626";
const BLUE = "#2563eb";
const YELLOW = "#ca8a04";
const BLACK = "#111111";
const BG = "#f7f4ee";

function RatioPreview({ w, h, color = RED }: { w: number; h: number; color?: string }) {
  if (!w || !h || w <= 0 || h <= 0) return null;
  const MAX_W = 280;
  const MAX_H = 180;
  const scale = Math.min(MAX_W / w, MAX_H / h);
  const pw = Math.round(w * scale);
  const ph = Math.round(h * scale);
  return (
    <div className="flex items-center justify-center" style={{ height: "200px" }}>
      <div
        style={{
          width: pw,
          height: ph,
          border: `4px solid ${color}`,
          background: `${color}18`,
          transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            color,
            userSelect: "none",
            opacity: 0.8,
          }}
        >
          {w}:{h}
        </span>
        <div
          style={{
            position: "absolute",
            top: -3,
            left: -3,
            width: 8,
            height: 8,
            background: color,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -3,
            right: -3,
            width: 8,
            height: 8,
            background: color,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -3,
            left: -3,
            width: 8,
            height: 8,
            background: color,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -3,
            right: -3,
            width: 8,
            height: 8,
            background: color,
          }}
        />
      </div>
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  accent = RED,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  accent?: string;
}) {
  return (
    <div>
      <label
        style={{
          display: "block",
          marginBottom: "6px",
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: `${accent}cc`,
        }}
      >
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          borderRadius: "0",
          padding: "12px 16px",
          fontSize: "22px",
          fontWeight: 700,
          fontFamily: "inherit",
          background: `${accent}14`,
          border: `2px solid ${accent}33`,
          color: accent,
          outline: "none",
          transition: "border-color 0.15s",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = accent)}
        onBlur={(e) => (e.currentTarget.style.borderColor = `${accent}33`)}
      />
    </div>
  );
}

export default function AspectRatioCalculator() {
  const [mode, setMode] = useState<Mode>("calculate");

  const [calcW, setCalcW] = useState("");
  const [calcH, setCalcH] = useState("");

  const [scaleRatio, setScaleRatio] = useState("");
  const [scaleKnown, setScaleKnown] = useState<"width" | "height">("width");
  const [scaleValue, setScaleValue] = useState("");

  const [cmp1W, setCmp1W] = useState("");
  const [cmp1H, setCmp1H] = useState("");
  const [cmp2W, setCmp2W] = useState("");
  const [cmp2H, setCmp2H] = useState("");

  function applyPreset(w: number, h: number) {
    if (mode === "calculate") {
      setCalcW(String(w));
      setCalcH(String(h));
    } else if (mode === "scale") {
      setScaleRatio(`${w}:${h}`);
    } else {
      setCmp1W(String(w));
      setCmp1H(String(h));
    }
  }

  const calcResult = (() => {
    const w = parseFloat(calcW);
    const h = parseFloat(calcH);
    if (isNaN(w) || isNaN(h)) return null;
    return simplifyRatio(w, h);
  })();

  const scaleResult = (() => {
    const parsed = parseRatioString(scaleRatio);
    const val = parseFloat(scaleValue);
    if (!parsed || isNaN(val) || val <= 0) return null;
    if (scaleKnown === "width") {
      return { known: "width", knownVal: val, computed: (val * parsed.rh) / parsed.rw };
    } else {
      return { known: "height", knownVal: val, computed: (val * parsed.rw) / parsed.rh };
    }
  })();

  const compareResult = (() => {
    const w1 = parseFloat(cmp1W), h1 = parseFloat(cmp1H);
    const w2 = parseFloat(cmp2W), h2 = parseFloat(cmp2H);
    if (isNaN(w1) || isNaN(h1) || isNaN(w2) || isNaN(h2)) return null;
    const r1 = simplifyRatio(w1, h1);
    const r2 = simplifyRatio(w2, h2);
    if (!r1 || !r2) return null;
    const match = r1.ratioW === r2.ratioW && r1.ratioH === r2.ratioH;
    return { r1, r2, match };
  })();

  const previewW =
    mode === "calculate"
      ? calcResult
        ? calcResult.ratioW
        : parseFloat(calcW) || 0
      : mode === "scale"
      ? parseRatioString(scaleRatio)?.rw || 0
      : parseFloat(cmp1W) || 0;
  const previewH =
    mode === "calculate"
      ? calcResult
        ? calcResult.ratioH
        : parseFloat(calcH) || 0
      : mode === "scale"
      ? parseRatioString(scaleRatio)?.rh || 0
      : parseFloat(cmp1H) || 0;

  return (
    <div style={{ fontFamily: "inherit" }}>
      <div
        className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-5"
      >
        {MODES.map((m) => (
          <button
            key={m.key}
            onClick={() => setMode(m.key)}
            className="text-left p-4 transition-all"
            style={{
              background: mode === m.key ? BLACK : BG,
              border: `2px solid ${mode === m.key ? BLACK : "transparent"}`,
              borderRadius: "0",
            }}
          >
            <p
              className="font-bold text-[12px] mb-0.5"
              style={{ color: mode === m.key ? "#ffffff" : BLACK }}
            >
              {m.label}
            </p>
            <p
              className="text-[10.5px]"
              style={{ color: mode === m.key ? "rgba(255,255,255,0.5)" : "rgba(17,17,17,0.45)" }}
            >
              {m.desc}
            </p>
          </button>
        ))}
      </div>

      <div style={{ border: `3px solid ${BLACK}`, padding: "28px 28px 24px", background: "#ffffff", marginBottom: "12px" }}>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-6">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => applyPreset(p.w, p.h)}
              className="py-2 text-center transition-all"
              style={{
                background: BG,
                border: `2px solid ${BLACK}`,
                borderRadius: "0",
                fontSize: "11px",
                fontWeight: 700,
                color: BLACK,
                letterSpacing: "0.04em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = RED;
                e.currentTarget.style.color = "#ffffff";
                e.currentTarget.style.borderColor = RED;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = BG;
                e.currentTarget.style.color = BLACK;
                e.currentTarget.style.borderColor = BLACK;
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {mode === "calculate" && (
          <div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <InputField label="Width (px)" value={calcW} onChange={setCalcW} placeholder="1920" accent={RED} />
              <InputField label="Height (px)" value={calcH} onChange={setCalcH} placeholder="1080" accent={BLUE} />
            </div>
            <RatioPreview w={calcResult?.ratioW || 0} h={calcResult?.ratioH || 0} color={RED} />
            <div
              style={{
                background: calcResult ? RED : `${RED}12`,
                padding: "24px",
                textAlign: "center",
                minHeight: "88px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s",
              }}
            >
              {calcResult ? (
                <>
                  <p style={{ fontSize: "clamp(32px,8vw,52px)", fontWeight: 900, color: "#ffffff", lineHeight: 1, letterSpacing: "-0.02em", marginBottom: "6px" }}>
                    {calcResult.ratioW}:{calcResult.ratioH}
                  </p>
                  <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>
                    Decimal: {calcResult.decimal} &nbsp;·&nbsp; Simplified ratio
                  </p>
                </>
              ) : (
                <p style={{ fontSize: "13px", color: `${RED}55`, fontWeight: 500 }}>
                  Enter width and height to calculate ratio
                </p>
              )}
            </div>
          </div>
        )}

        {mode === "scale" && (
          <div>
            <div className="mb-4">
              <label style={{ display: "block", marginBottom: "6px", fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: `${YELLOW}cc` }}>
                Aspect Ratio (e.g. 16:9)
              </label>
              <input
                type="text"
                value={scaleRatio}
                onChange={(e) => setScaleRatio(e.target.value)}
                placeholder="16:9"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  fontSize: "22px",
                  fontWeight: 700,
                  fontFamily: "inherit",
                  background: `${YELLOW}14`,
                  border: `2px solid ${YELLOW}33`,
                  color: YELLOW,
                  outline: "none",
                  borderRadius: "0",
                  transition: "border-color 0.15s",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = YELLOW)}
                onBlur={(e) => (e.currentTarget.style.borderColor = `${YELLOW}33`)}
              />
            </div>
            <div className="flex gap-3 mb-4">
              {(["width", "height"] as const).map((side) => (
                <button
                  key={side}
                  onClick={() => setScaleKnown(side)}
                  style={{
                    flex: 1,
                    padding: "10px",
                    fontWeight: 700,
                    fontSize: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    border: `2px solid ${scaleKnown === side ? BLUE : `${BLACK}33`}`,
                    background: scaleKnown === side ? BLUE : "transparent",
                    color: scaleKnown === side ? "#ffffff" : `${BLACK}66`,
                    borderRadius: "0",
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  I know the {side}
                </button>
              ))}
            </div>
            <InputField
              label={scaleKnown === "width" ? "Known Width (px)" : "Known Height (px)"}
              value={scaleValue}
              onChange={setScaleValue}
              placeholder={scaleKnown === "width" ? "1920" : "1080"}
              accent={BLUE}
            />
            {parseRatioString(scaleRatio) && (
              <div className="mt-6">
                <RatioPreview w={parseRatioString(scaleRatio)?.rw || 0} h={parseRatioString(scaleRatio)?.rh || 0} color={BLUE} />
              </div>
            )}
            <div
              style={{
                background: scaleResult ? BLUE : `${BLUE}12`,
                padding: "24px",
                textAlign: "center",
                minHeight: "88px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "16px",
                transition: "background 0.2s",
              }}
            >
              {scaleResult ? (
                <>
                  <p style={{ fontSize: "clamp(32px,8vw,52px)", fontWeight: 900, color: "#ffffff", lineHeight: 1, letterSpacing: "-0.02em", marginBottom: "6px" }}>
                    {scaleResult.known === "width"
                      ? `${Math.round(scaleResult.computed)}px`
                      : `${Math.round(scaleResult.computed)}px`}
                  </p>
                  <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>
                    {scaleResult.known === "width"
                      ? `Height for ${scaleResult.knownVal}px wide at ${scaleRatio}`
                      : `Width for ${scaleResult.knownVal}px tall at ${scaleRatio}`}
                  </p>
                </>
              ) : (
                <p style={{ fontSize: "13px", color: `${BLUE}55`, fontWeight: 500 }}>
                  Enter a ratio and a dimension to scale
                </p>
              )}
            </div>
          </div>
        )}

        {mode === "compare" && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div style={{ border: `3px solid ${RED}`, padding: "16px" }}>
                <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", color: RED, textTransform: "uppercase", marginBottom: "12px" }}>
                  Size A
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <InputField label="Width" value={cmp1W} onChange={setCmp1W} placeholder="1920" accent={RED} />
                  <InputField label="Height" value={cmp1H} onChange={setCmp1H} placeholder="1080" accent={RED} />
                </div>
                {compareResult && (
                  <p style={{ marginTop: "10px", fontSize: "18px", fontWeight: 900, color: RED }}>
                    {compareResult.r1.ratioW}:{compareResult.r1.ratioH}
                    <span style={{ fontSize: "11px", fontWeight: 500, color: `${RED}88`, marginLeft: "8px" }}>
                      = {compareResult.r1.decimal}
                    </span>
                  </p>
                )}
              </div>
              <div style={{ border: `3px solid ${BLUE}`, padding: "16px" }}>
                <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", marginBottom: "12px" }}>
                  Size B
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <InputField label="Width" value={cmp2W} onChange={setCmp2W} placeholder="1280" accent={BLUE} />
                  <InputField label="Height" value={cmp2H} onChange={setCmp2H} placeholder="720" accent={BLUE} />
                </div>
                {compareResult && (
                  <p style={{ marginTop: "10px", fontSize: "18px", fontWeight: 900, color: BLUE }}>
                    {compareResult.r2.ratioW}:{compareResult.r2.ratioH}
                    <span style={{ fontSize: "11px", fontWeight: 500, color: `${BLUE}88`, marginLeft: "8px" }}>
                      = {compareResult.r2.decimal}
                    </span>
                  </p>
                )}
              </div>
            </div>
            {compareResult && (
              <div
                style={{
                  background: compareResult.match ? "#16a34a" : RED,
                  padding: "24px",
                  textAlign: "center",
                  transition: "background 0.25s",
                }}
              >
                <p style={{ fontSize: "clamp(20px,5vw,32px)", fontWeight: 900, color: "#ffffff", marginBottom: "4px" }}>
                  {compareResult.match ? "Same ratio" : "Different ratios"}
                </p>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>
                  {compareResult.match
                    ? `Both simplify to ${compareResult.r1.ratioW}:${compareResult.r1.ratioH}`
                    : `${compareResult.r1.ratioW}:${compareResult.r1.ratioH} vs ${compareResult.r2.ratioW}:${compareResult.r2.ratioH}`}
                </p>
              </div>
            )}
            {!compareResult && (
              <div style={{ background: `${RED}10`, padding: "24px", textAlign: "center", minHeight: "80px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <p style={{ fontSize: "13px", color: `${RED}55`, fontWeight: 500 }}>Enter both sizes to compare their ratios</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
        {PRESETS.map((p) => (
          <div
            key={p.label}
            style={{
              background: BG,
              border: `2px solid ${BLACK}22`,
              padding: "8px 4px",
              textAlign: "center",
            }}
          >
            <p style={{ fontWeight: 700, fontSize: "11px", color: BLACK }}>{p.label}</p>
            <p style={{ fontSize: "9px", fontWeight: 500, color: `${BLACK}55`, marginTop: "2px" }}>
              {(p.w / p.h).toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
