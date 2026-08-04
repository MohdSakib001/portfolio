"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { Copy, Check } from "lucide-react";

type RGB = [number, number, number];
type HSL = [number, number, number];
type CMYK = [number, number, number, number];

function hexToRgb(hex: string): RGB | null {
  const clean = hex.replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) return null;
  return [parseInt(clean.slice(0, 2), 16), parseInt(clean.slice(2, 4), 16), parseInt(clean.slice(4, 6), 16)];
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map(v => v.toString(16).padStart(2, "0")).join("");
}

function rgbToHsl(r: number, g: number, b: number): HSL {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, Math.round(l * 100)];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
  else if (max === gn) h = ((bn - rn) / d + 2) / 6;
  else h = ((rn - gn) / d + 4) / 6;
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function rgbToCmyk(r: number, g: number, b: number): CMYK {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const k = 1 - Math.max(rn, gn, bn);
  if (k === 1) return [0, 0, 0, 100];
  const c = (1 - rn - k) / (1 - k);
  const m = (1 - gn - k) / (1 - k);
  const y = (1 - bn - k) / (1 - k);
  return [Math.round(c * 100), Math.round(m * 100), Math.round(y * 100), Math.round(k * 100)];
}

function hslToRgb(h: number, s: number, l: number): RGB {
  const sn = s / 100, ln = l / 100;
  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = ln - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }
  return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
}

function luminance(r: number, g: number, b: number): number {
  return [r, g, b].reduce((acc, v, i) => {
    const s = v / 255;
    const lin = s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    return acc + lin * [0.2126, 0.7152, 0.0722][i];
  }, 0);
}

function contrastRatio(l1: number, l2: number): number {
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

const NAMED_COLORS: [string, RGB][] = [
  ["Red", [255, 0, 0]], ["Crimson", [220, 20, 60]], ["Dark Red", [139, 0, 0]],
  ["Tomato", [255, 99, 71]], ["Coral", [255, 127, 80]], ["Orange Red", [255, 69, 0]],
  ["Orange", [255, 165, 0]], ["Dark Orange", [255, 140, 0]], ["Gold", [255, 215, 0]],
  ["Yellow", [255, 255, 0]], ["Yellow Green", [154, 205, 50]], ["Lime", [0, 255, 0]],
  ["Lime Green", [50, 205, 50]], ["Green", [0, 128, 0]], ["Dark Green", [0, 100, 0]],
  ["Forest Green", [34, 139, 34]], ["Olive", [128, 128, 0]], ["Teal", [0, 128, 128]],
  ["Cyan", [0, 255, 255]], ["Dark Cyan", [0, 139, 139]], ["Steel Blue", [70, 130, 180]],
  ["Dodger Blue", [30, 144, 255]], ["Royal Blue", [65, 105, 225]], ["Blue", [0, 0, 255]],
  ["Navy", [0, 0, 128]], ["Midnight Blue", [25, 25, 112]], ["Indigo", [75, 0, 130]],
  ["Purple", [128, 0, 128]], ["Dark Violet", [148, 0, 211]], ["Violet", [238, 130, 238]],
  ["Orchid", [218, 112, 214]], ["Magenta", [255, 0, 255]], ["Deep Pink", [255, 20, 147]],
  ["Hot Pink", [255, 105, 180]], ["Pink", [255, 192, 203]], ["Salmon", [250, 128, 114]],
  ["Brown", [165, 42, 42]], ["Saddle Brown", [139, 69, 19]], ["Sienna", [160, 82, 45]],
  ["Tan", [210, 180, 140]], ["Burlywood", [222, 184, 135]], ["Wheat", [245, 222, 179]],
  ["White", [255, 255, 255]], ["Snow", [255, 250, 250]], ["Ivory", [255, 255, 240]],
  ["Beige", [245, 245, 220]], ["Light Gray", [211, 211, 211]], ["Silver", [192, 192, 192]],
  ["Gray", [128, 128, 128]], ["Dim Gray", [105, 105, 105]], ["Black", [0, 0, 0]],
];

function nearestColorName(r: number, g: number, b: number): string {
  let best = NAMED_COLORS[0][0];
  let bestDist = Infinity;
  for (const [name, [nr, ng, nb]] of NAMED_COLORS) {
    const dist = (r - nr) ** 2 + (g - ng) ** 2 + (b - nb) ** 2;
    if (dist < bestDist) { bestDist = dist; best = name; }
  }
  return best;
}

function shiftHue(h: number, deg: number): number {
  return (h + deg + 360) % 360;
}

function adjustLightness(hex: string, delta: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const [h, s, l] = rgbToHsl(...rgb);
  const newL = Math.max(0, Math.min(100, l + delta));
  return rgbToHex(...hslToRgb(h, s, newL));
}

function hslToHex(h: number, s: number, l: number): string {
  return rgbToHex(...hslToRgb(h, s, l));
}

function useCopy() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const copy = useCallback(async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  }, []);
  return { copiedKey, copy };
}

function CopyButton({ text, copyKey, copiedKey, onCopy }: { text: string; copyKey: string; copiedKey: string | null; onCopy: (t: string, k: string) => void }) {
  const copied = copiedKey === copyKey;
  return (
    <button
      onClick={() => onCopy(text, copyKey)}
      className="flex items-center gap-1 px-2.5 py-1 rounded-[7px] transition-all hover:opacity-80"
      style={{ background: copied ? "rgba(34,197,94,0.1)" : "rgba(17,24,39,0.06)", color: copied ? "#16a34a" : "rgba(17,24,39,0.5)", fontSize: "11px", fontWeight: 600 }}
    >
      {copied ? <Check size={10} /> : <Copy size={10} />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

interface SwatchProps {
  color: string;
  size?: "sm" | "md";
  onClick?: () => void;
  label?: string;
}

function Swatch({ color, size = "sm", onClick, label }: SwatchProps) {
  return (
    <div
      className={`flex flex-col items-center gap-1 ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
    >
      <div
        className="rounded-[10px] transition-transform hover:scale-105"
        style={{
          background: color,
          width: size === "md" ? "48px" : "36px",
          height: size === "md" ? "48px" : "36px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)",
        }}
      />
      {label && <span style={{ fontSize: "9px", color: "rgba(17,24,39,0.5)", fontFamily: "monospace", letterSpacing: "-0.02em" }}>{label}</span>}
    </div>
  );
}

export default function ColorPicker() {
  const [color, setColor] = useState("#3b82f6");
  const [hexInput, setHexInput] = useState("#3b82f6");
  const [imageColors, setImageColors] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { copiedKey, copy } = useCopy();

  const rgb = hexToRgb(color) ?? [0, 0, 0] as RGB;
  const [h, s, l] = rgbToHsl(...rgb);
  const [c, m, y, k] = rgbToCmyk(...rgb);
  const lum = luminance(...rgb);
  const isLight = lum > 0.179;
  const contrastWhite = contrastRatio(lum, 1);
  const contrastBlack = contrastRatio(lum, 0);
  const colorName = nearestColorName(...rgb);

  const hexStr = color.toUpperCase();
  const rgbStr = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  const hslStr = `hsl(${h}, ${s}%, ${l}%)`;
  const cmykStr = `cmyk(${c}%, ${m}%, ${y}%, ${k}%)`;

  const shades = [1, 2, 3, 4, 5].map(i => adjustLightness(color, -i * 10));
  const tints = [1, 2, 3, 4, 5].map(i => adjustLightness(color, i * 10));
  const complementary = [hslToHex(shiftHue(h, 180), s, l)];
  const analogous = [hslToHex(shiftHue(h, -30), s, l), hslToHex(shiftHue(h, 30), s, l)];
  const triadic = [hslToHex(shiftHue(h, 120), s, l), hslToHex(shiftHue(h, 240), s, l)];

  const updateColor = useCallback((hex: string) => {
    const clean = hex.startsWith("#") ? hex : "#" + hex;
    if (/^#[0-9a-fA-F]{6}$/.test(clean)) {
      setColor(clean.toLowerCase());
      setHexInput(clean.toUpperCase());
    }
  }, []);

  const handleHexInput = (val: string) => {
    setHexInput(val);
    const clean = val.startsWith("#") ? val : "#" + val;
    if (/^#[0-9a-fA-F]{6}$/.test(clean)) {
      setColor(clean.toLowerCase());
    }
  };

  const extractColorsFromImage = useCallback((file: File) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const cols: RGB[] = [];
      const stepX = Math.max(1, Math.floor(img.width / 20));
      const stepY = Math.max(1, Math.floor(img.height / 20));
      for (let y = 0; y < img.height; y += stepY) {
        for (let x = 0; x < img.width; x += stepX) {
          const d = ctx.getImageData(x, y, 1, 1).data;
          cols.push([d[0], d[1], d[2]]);
        }
      }
      const clusters: RGB[] = [
        cols[0],
        cols[Math.floor(cols.length * 0.2)],
        cols[Math.floor(cols.length * 0.4)],
        cols[Math.floor(cols.length * 0.6)],
        cols[Math.floor(cols.length * 0.8)],
      ];
      for (let iter = 0; iter < 8; iter++) {
        const sums: [number, number, number, number][] = clusters.map(() => [0, 0, 0, 0]);
        for (const [r, g, b] of cols) {
          let best = 0, bestDist = Infinity;
          for (let i = 0; i < clusters.length; i++) {
            const [cr, cg, cb] = clusters[i];
            const dist = (r - cr) ** 2 + (g - cg) ** 2 + (b - cb) ** 2;
            if (dist < bestDist) { bestDist = dist; best = i; }
          }
          sums[best][0] += r; sums[best][1] += g; sums[best][2] += b; sums[best][3]++;
        }
        for (let i = 0; i < clusters.length; i++) {
          if (sums[i][3] > 0) {
            clusters[i] = [Math.round(sums[i][0] / sums[i][3]), Math.round(sums[i][1] / sums[i][3]), Math.round(sums[i][2] / sums[i][3])];
          }
        }
      }
      setImageColors(clusters.map(([r, g, b]) => rgbToHex(r, g, b)));
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }, []);

  const handleFile = useCallback((file: File | null | undefined) => {
    if (file && file.type.startsWith("image/")) extractColorsFromImage(file);
  }, [extractColorsFromImage]);

  const PaletteRow = ({ label, colors }: { label: string; colors: string[] }) => (
    <div>
      <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(17,24,39,0.4)", marginBottom: "8px" }}>{label}</p>
      <div className="flex gap-2 flex-wrap">
        {colors.map((c, i) => (
          <Swatch key={i} color={c} size="md" onClick={() => updateColor(c)} label={c.toUpperCase()} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <canvas ref={canvasRef} className="hidden" />

      <div
        className="rounded-[20px] overflow-hidden"
        style={{ boxShadow: "0 0 0 1px rgba(17,24,39,0.07), 0 8px 32px rgba(17,24,39,0.08)", background: "#ffffff" }}
      >
        <div
          style={{
            height: "6px",
            background: "linear-gradient(90deg, #ff0000, #ff8000, #ffff00, #00ff00, #0080ff, #8000ff, #ff0080)",
          }}
        />

        <div className="p-6">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="flex flex-col items-center gap-3">
              <div
                className="relative rounded-[16px] overflow-hidden"
                style={{ width: "200px", height: "200px", boxShadow: "0 4px 20px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.06)" }}
              >
                <input
                  type="color"
                  value={color}
                  onChange={e => { setColor(e.target.value); setHexInput(e.target.value.toUpperCase()); }}
                  className="absolute inset-0 w-full h-full border-none outline-none cursor-pointer"
                  style={{ opacity: 0, zIndex: 2 }}
                />
                <div className="absolute inset-0" style={{ background: color, zIndex: 1 }} />
                <div className="absolute bottom-2 right-2 z-10 px-2 py-1 rounded-[6px]" style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}>
                  <span style={{ fontSize: "10px", color: "#fff", fontFamily: "monospace", fontWeight: 600 }}>Click to pick</span>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full max-w-[200px]">
                <div className="relative w-8 h-8 rounded-[8px] shrink-0 overflow-hidden" style={{ border: "2px solid rgba(17,24,39,0.12)" }}>
                  <input type="color" value={color} onChange={e => { setColor(e.target.value); setHexInput(e.target.value.toUpperCase()); }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  <div className="absolute inset-0" style={{ background: color }} />
                </div>
                <input
                  type="text"
                  value={hexInput}
                  onChange={e => handleHexInput(e.target.value)}
                  placeholder="#3B82F6"
                  maxLength={7}
                  className="flex-1 rounded-[10px] px-3 py-2 text-[13px] font-mono outline-none"
                  style={{ background: "#f8f9fa", border: "1.5px solid rgba(17,24,39,0.1)", color: "#111827" }}
                />
              </div>
            </div>

            <div className="flex-1 w-full">
              <div
                className="rounded-[14px] mb-4"
                style={{ background: color, height: "120px", width: "100%", boxShadow: "0 4px 20px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.06)" }}
              />

              <div className="space-y-2">
                {[
                  { label: "HEX", value: hexStr, key: "hex" },
                  { label: "RGB", value: rgbStr, key: "rgb" },
                  { label: "HSL", value: hslStr, key: "hsl" },
                  { label: "CMYK", value: cmykStr, key: "cmyk" },
                ].map(({ label, value, key }) => (
                  <div key={key} className="flex items-center justify-between px-3 py-2 rounded-[10px]"
                    style={{ background: "rgba(17,24,39,0.03)", border: "1px solid rgba(17,24,39,0.06)" }}>
                    <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(17,24,39,0.35)", width: "40px", flexShrink: 0 }}>{label}</span>
                    <span style={{ fontSize: "12px", fontFamily: "monospace", color: "#111827", flex: 1, padding: "0 8px" }}>{value}</span>
                    <CopyButton text={value} copyKey={key} copiedKey={copiedKey} onCopy={copy} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[20px] p-5" style={{ background: "#ffffff", boxShadow: "0 0 0 1px rgba(17,24,39,0.07), 0 4px 16px rgba(17,24,39,0.06)" }}>
        <p className="font-semibold mb-4" style={{ fontSize: "13px", color: "#111827", letterSpacing: "-0.01em" }}>Color Analysis</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-[12px] p-3 text-center" style={{ background: "rgba(17,24,39,0.03)", border: "1px solid rgba(17,24,39,0.06)" }}>
            <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(17,24,39,0.35)", marginBottom: "4px" }}>Brightness</p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: isLight ? "#fef9c3" : "#1e1b4b", border: `1px solid ${isLight ? "#fde047" : "#4338ca"}` }}>
              <span style={{ fontSize: "12px", fontWeight: 700, color: isLight ? "#854d0e" : "#a5b4fc" }}>{isLight ? "Light" : "Dark"}</span>
            </div>
          </div>
          <div className="rounded-[12px] p-3 text-center" style={{ background: "rgba(17,24,39,0.03)", border: "1px solid rgba(17,24,39,0.06)" }}>
            <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(17,24,39,0.35)", marginBottom: "4px" }}>vs White</p>
            <p style={{ fontSize: "16px", fontWeight: 700, fontFamily: "monospace", color: contrastWhite >= 4.5 ? "#16a34a" : contrastWhite >= 3 ? "#d97706" : "#dc2626" }}>
              {contrastWhite.toFixed(2)}:1
            </p>
          </div>
          <div className="rounded-[12px] p-3 text-center" style={{ background: "rgba(17,24,39,0.03)", border: "1px solid rgba(17,24,39,0.06)" }}>
            <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(17,24,39,0.35)", marginBottom: "4px" }}>vs Black</p>
            <p style={{ fontSize: "16px", fontWeight: 700, fontFamily: "monospace", color: contrastBlack >= 4.5 ? "#16a34a" : contrastBlack >= 3 ? "#d97706" : "#dc2626" }}>
              {contrastBlack.toFixed(2)}:1
            </p>
          </div>
          <div className="rounded-[12px] p-3 text-center" style={{ background: "rgba(17,24,39,0.03)", border: "1px solid rgba(17,24,39,0.06)" }}>
            <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(17,24,39,0.35)", marginBottom: "4px" }}>Nearest Name</p>
            <p style={{ fontSize: "12px", fontWeight: 600, color: "#111827" }}>{colorName}</p>
          </div>
        </div>
      </div>

      <div className="rounded-[20px] p-5" style={{ background: "#ffffff", boxShadow: "0 0 0 1px rgba(17,24,39,0.07), 0 4px 16px rgba(17,24,39,0.06)" }}>
        <p className="font-semibold mb-5" style={{ fontSize: "13px", color: "#111827", letterSpacing: "-0.01em" }}>Palette Generator</p>
        <div className="space-y-5">
          <PaletteRow label="Shades (darker)" colors={shades} />
          <PaletteRow label="Tints (lighter)" colors={tints} />
          <div>
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(17,24,39,0.4)", marginBottom: "8px" }}>Complementary</p>
            <div className="flex gap-2 items-start">
              <Swatch color={color} size="md" label={color.toUpperCase()} />
              <div style={{ width: "1px", background: "rgba(17,24,39,0.08)", height: "48px", marginTop: "0" }} />
              {complementary.map((c, i) => <Swatch key={i} color={c} size="md" onClick={() => updateColor(c)} label={c.toUpperCase()} />)}
            </div>
          </div>
          <div>
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(17,24,39,0.4)", marginBottom: "8px" }}>Analogous (±30°)</p>
            <div className="flex gap-2 flex-wrap">
              <Swatch color={analogous[0]} size="md" onClick={() => updateColor(analogous[0])} label={analogous[0].toUpperCase()} />
              <Swatch color={color} size="md" label={color.toUpperCase()} />
              <Swatch color={analogous[1]} size="md" onClick={() => updateColor(analogous[1])} label={analogous[1].toUpperCase()} />
            </div>
          </div>
          <div>
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(17,24,39,0.4)", marginBottom: "8px" }}>Triadic (±120°)</p>
            <div className="flex gap-2 flex-wrap">
              <Swatch color={color} size="md" label={color.toUpperCase()} />
              {triadic.map((c, i) => <Swatch key={i} color={c} size="md" onClick={() => updateColor(c)} label={c.toUpperCase()} />)}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[20px] p-5" style={{ background: "#ffffff", boxShadow: "0 0 0 1px rgba(17,24,39,0.07), 0 4px 16px rgba(17,24,39,0.06)" }}>
        <p className="font-semibold mb-2" style={{ fontSize: "13px", color: "#111827", letterSpacing: "-0.01em" }}>Image Color Extractor</p>
        <p style={{ fontSize: "12px", color: "rgba(17,24,39,0.45)", marginBottom: "16px" }}>Upload an image to extract its dominant colors.</p>

        <div
          className="rounded-[14px] p-8 text-center transition-all"
          style={{
            border: `2px dashed ${isDragging ? "#3b82f6" : "rgba(17,24,39,0.12)"}`,
            background: isDragging ? "rgba(59,130,246,0.04)" : "rgba(17,24,39,0.02)",
            cursor: "pointer",
          }}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={e => { e.preventDefault(); setIsDragging(false); handleFile(e.dataTransfer.files[0]); }}
        >
          <p style={{ fontSize: "28px", marginBottom: "8px" }}>🖼️</p>
          <p style={{ fontSize: "13px", fontWeight: 600, color: "#111827", marginBottom: "4px" }}>Drop an image here</p>
          <p style={{ fontSize: "12px", color: "rgba(17,24,39,0.4)" }}>or click to browse — PNG, JPG, WebP</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => handleFile(e.target.files?.[0])}
          />
        </div>

        {imageColors.length > 0 && (
          <div className="mt-4">
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(17,24,39,0.4)", marginBottom: "12px" }}>Extracted Colors</p>
            <div className="flex gap-3 flex-wrap">
              {imageColors.map((c, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5 cursor-pointer" onClick={() => updateColor(c)}>
                  <div
                    className="rounded-[12px] transition-transform hover:scale-105"
                    style={{ width: "56px", height: "56px", background: c, boxShadow: "0 4px 12px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.06)" }}
                  />
                  <span style={{ fontSize: "9px", fontFamily: "monospace", color: "rgba(17,24,39,0.5)", letterSpacing: "-0.02em" }}>{c.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
