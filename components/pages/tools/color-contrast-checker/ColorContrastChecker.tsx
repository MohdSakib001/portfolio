"use client";
import { useState, useMemo } from "react";
import { Copy, Check } from "lucide-react";

function hexToRgb(hex: string): [number, number, number] | null {
  const clean = hex.replace("#", "");
  if (!/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$/.test(clean)) return null;
  const full = clean.length === 3 ? clean.split("").map(c => c + c).join("") : clean;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return [r, g, b];
}

function luminance(r: number, g: number, b: number): number {
  const c = [r, g, b].map(v => {
    const s = v / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}

function contrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2);
  const darker  = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function isValidHex(s: string): boolean {
  return /^#?[0-9a-fA-F]{3}$|^#?[0-9a-fA-F]{6}$/.test(s);
}

function normalise(s: string): string {
  return s.startsWith("#") ? s : "#" + s;
}

export default function ColorContrastChecker() {
  const [fg, setFg] = useState("#1c1b18");
  const [bg, setBg] = useState("#F8F7F4");
  const [copiedFg, setCopiedFg] = useState(false);
  const [copiedBg, setCopiedBg] = useState(false);

  const result = useMemo(() => {
    const nfg = normalise(fg), nbg = normalise(bg);
    const fgRgb = hexToRgb(nfg), bgRgb = hexToRgb(nbg);
    if (!fgRgb || !bgRgb) return null;
    const l1 = luminance(...fgRgb);
    const l2 = luminance(...bgRgb);
    const ratio = contrastRatio(l1, l2);
    return {
      ratio,
      aaSmall:  ratio >= 4.5,
      aaLarge:  ratio >= 3.0,
      aaaSmall: ratio >= 7.0,
      aaaLarge: ratio >= 4.5,
    };
  }, [fg, bg]);

  const validFg = isValidHex(fg);
  const validBg = isValidHex(bg);

  const displayFg = validFg ? normalise(fg) : "#1c1b18";
  const displayBg = validBg ? normalise(bg) : "#F8F7F4";

  const copy = async (val: string, setter: (v: boolean) => void) => {
    await navigator.clipboard.writeText(val);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  const Badge = ({ pass, label }: { pass: boolean; label: string }) => (
    <div className="flex items-center justify-between px-4 py-3 rounded-[12px]"
      style={{ background: pass ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.08)", border: `1px solid ${pass ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.15)"}` }}>
      <span className="text-[12px] font-medium" style={{ color: pass ? "#16a34a" : "rgba(3,3,2,0.5)" }}>{label}</span>
      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.08em]"
        style={{ background: pass ? "#16a34a" : "#ef4444", color: "#ffffff" }}>
        {pass ? "Pass" : "Fail"}
      </span>
    </div>
  );

  return (
    <div>
      {/* Live preview */}
      <div className="rounded-[20px] overflow-hidden mb-4"
        style={{ boxShadow: "0 0 0 1px rgba(3,3,2,0.06), 0 8px 32px rgba(3,3,2,0.08)" }}>
        <div className="p-8 text-center" style={{ background: displayBg, minHeight: "140px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px" }}>
          <p className="font-bold" style={{ fontSize: "clamp(18px,4vw,28px)", color: displayFg, lineHeight: 1.2 }}>
            The quick brown fox
          </p>
          <p style={{ fontSize: "14px", color: displayFg, opacity: 0.8, lineHeight: 1.6 }}>
            jumps over the lazy dog — 0123456789
          </p>
          <p style={{ fontSize: "11px", color: displayFg, opacity: 0.6, letterSpacing: "0.06em" }}>
            SMALL TEXT SAMPLE · BODY COPY SAMPLE
          </p>
        </div>
      </div>

      {/* Color pickers */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {[
          { label: "Foreground", val: fg, set: setFg, valid: validFg, display: displayFg, copied: copiedFg, setCopied: setCopiedFg },
          { label: "Background", val: bg, set: setBg, valid: validBg, display: displayBg, copied: copiedBg, setCopied: setCopiedBg },
        ].map(({ label, val, set, valid, display, copied, setCopied }) => (
          <div key={label} className="rounded-[16px] p-4"
            style={{ background: "#ffffff", boxShadow: "0 0 0 1px rgba(3,3,2,0.06)" }}>
            <p className="text-[10px] uppercase tracking-[0.12em] font-bold mb-3" style={{ color: "rgba(3,3,2,0.4)" }}>{label}</p>
            <div className="flex items-center gap-3 mb-3">
              <div className="relative w-10 h-10 rounded-[8px] overflow-hidden" style={{ border: "2px solid rgba(3,3,2,0.1)" }}>
                <input type="color" value={valid ? normalise(val) : "#cccccc"} onChange={e => set(e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <div className="absolute inset-0 rounded-[6px]" style={{ background: display }} />
              </div>
              <input type="text" value={val} onChange={e => set(e.target.value)} placeholder="#000000"
                className="flex-1 rounded-[10px] px-3 py-2 text-[13px] font-mono outline-none"
                style={{ background: "#f8f7f4", border: `1.5px solid ${valid ? "rgba(3,3,2,0.1)" : "#ef4444"}`, color: "#1c1b18", fontFamily: "monospace" }}
                maxLength={7} />
            </div>
            <button onClick={() => copy(normalise(val), setCopied)} disabled={!valid}
              className="w-full flex items-center justify-center gap-1.5 py-2 rounded-[8px] text-[11px] font-medium transition-all disabled:opacity-30"
              style={{ background: "rgba(3,3,2,0.05)", color: "rgba(3,3,2,0.5)" }}>
              {copied ? <Check size={11} /> : <Copy size={11} />}
              {copied ? "Copied!" : "Copy hex"}
            </button>
          </div>
        ))}
      </div>

      {/* Contrast result */}
      {result ? (
        <div>
          <div className="rounded-[20px] p-6 mb-3 text-center"
            style={{ background: "#ffffff", boxShadow: "0 0 0 1px rgba(3,3,2,0.06), 0 4px 24px rgba(3,3,2,0.06)" }}>
            <p className="text-[11px] uppercase tracking-[0.14em] font-bold mb-2" style={{ color: "rgba(3,3,2,0.4)" }}>
              Contrast Ratio
            </p>
            <p className="font-bold tabular-nums" style={{
              fontSize: "clamp(40px,10vw,64px)",
              color: result.ratio >= 7 ? "#16a34a" : result.ratio >= 4.5 ? "#d97706" : "#dc2626",
              lineHeight: 1,
            }}>
              {result.ratio.toFixed(2)}:1
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Badge pass={result.aaSmall}  label="AA — Small Text (≥ 4.5:1)" />
            <Badge pass={result.aaLarge}  label="AA — Large Text (≥ 3:1)" />
            <Badge pass={result.aaaSmall} label="AAA — Small Text (≥ 7:1)" />
            <Badge pass={result.aaaLarge} label="AAA — Large Text (≥ 4.5:1)" />
          </div>
        </div>
      ) : (
        <div className="rounded-[16px] px-8 py-10 text-center"
          style={{ background: "#ffffff", boxShadow: "0 0 0 1px rgba(3,3,2,0.05)" }}>
          <p style={{ fontSize: "13px", color: "rgba(3,3,2,0.4)" }}>Enter valid hex colours above to check contrast.</p>
        </div>
      )}
    </div>
  );
}
