"use client";
import { useState, useRef, useCallback, useEffect } from "react";

type Format = "jpeg" | "png" | "webp";

interface ImageInfo {
  file: File;
  url: string;
  width: number;
  height: number;
  size: number;
}

interface ResizeResult {
  url: string;
  width: number;
  height: number;
  size: number;
  blob: Blob;
}

const PRESETS = [
  { label: "Instagram post", w: 1080, h: 1080 },
  { label: "Instagram story", w: 1080, h: 1920 },
  { label: "Twitter/X banner", w: 1500, h: 500 },
  { label: "LinkedIn cover", w: 1584, h: 396 },
  { label: "YouTube thumbnail", w: 1280, h: 720 },
  { label: "Facebook cover", w: 820, h: 312 },
];

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

const ACCENT = "#c084fc";
const PANEL = "#1e1a2b";
const BG = "#181520";

const labelStyle: React.CSSProperties = {
  fontSize: "10px",
  fontWeight: 600,
  letterSpacing: "0.13em",
  textTransform: "uppercase",
  color: "rgba(226,232,240,0.45)",
  display: "block",
  marginBottom: "8px",
};

const inputBase: React.CSSProperties = {
  width: "100%",
  background: BG,
  border: "1.5px solid rgba(192,132,252,0.2)",
  borderRadius: "10px",
  padding: "10px 14px",
  fontSize: "14px",
  color: "#e2e8f0",
  outline: "none",
  fontFamily: "inherit",
  transition: "border-color 0.2s",
};

export default function ImageResizer() {
  const [image, setImage] = useState<ImageInfo | null>(null);
  const [dragging, setDragging] = useState(false);
  const [widthVal, setWidthVal] = useState("");
  const [heightVal, setHeightVal] = useState("");
  const [lockRatio, setLockRatio] = useState(true);
  const [scalePercent, setScalePercent] = useState("");
  const [format, setFormat] = useState<Format>("jpeg");
  const [quality, setQuality] = useState(92);
  const [result, setResult] = useState<ResizeResult | null>(null);
  const [resizing, setResizing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const aspectRef = useRef<number>(1);

  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image.url);
      if (result) URL.revokeObjectURL(result.url);
    };
  }, []);

  function loadFile(file: File) {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      if (image) URL.revokeObjectURL(image.url);
      aspectRef.current = img.naturalWidth / img.naturalHeight;
      setImage({ file, url, width: img.naturalWidth, height: img.naturalHeight, size: file.size });
      setWidthVal(String(img.naturalWidth));
      setHeightVal(String(img.naturalHeight));
      setScalePercent("100");
      setResult(null);
    };
    img.src = url;
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) loadFile(file);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) loadFile(file);
  }

  function handleWidthChange(val: string) {
    setWidthVal(val);
    setScalePercent("");
    if (lockRatio && image && val !== "") {
      const w = parseInt(val, 10);
      if (!isNaN(w) && w > 0) {
        setHeightVal(String(Math.round(w / aspectRef.current)));
      }
    }
  }

  function handleHeightChange(val: string) {
    setHeightVal(val);
    setScalePercent("");
    if (lockRatio && image && val !== "") {
      const h = parseInt(val, 10);
      if (!isNaN(h) && h > 0) {
        setWidthVal(String(Math.round(h * aspectRef.current)));
      }
    }
  }

  function handleScaleChange(val: string) {
    setScalePercent(val);
    if (image && val !== "") {
      const pct = parseFloat(val);
      if (!isNaN(pct) && pct > 0) {
        setWidthVal(String(Math.round((image.width * pct) / 100)));
        setHeightVal(String(Math.round((image.height * pct) / 100)));
      }
    }
  }

  function applyPreset(w: number, h: number) {
    setWidthVal(String(w));
    setHeightVal(String(h));
    setScalePercent("");
  }

  const handleResize = useCallback(() => {
    if (!image) return;
    const tw = parseInt(widthVal, 10);
    const th = parseInt(heightVal, 10);
    if (!tw || !th || tw <= 0 || th <= 0) return;
    setResizing(true);

    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = tw;
      canvas.height = th;
      const ctx = canvas.getContext("2d");
      if (!ctx) { setResizing(false); return; }
      ctx.drawImage(img, 0, 0, tw, th);
      canvas.toBlob(
        (blob) => {
          if (!blob) { setResizing(false); return; }
          if (result) URL.revokeObjectURL(result.url);
          const url = URL.createObjectURL(blob);
          setResult({ url, width: tw, height: th, size: blob.size, blob });
          setResizing(false);
        },
        `image/${format}`,
        format === "jpeg" ? quality / 100 : undefined
      );
    };
    img.src = image.url;
  }, [image, widthVal, heightVal, format, quality, result]);

  function handleDownload() {
    if (!result || !image) return;
    const ext = format === "jpeg" ? "jpg" : format;
    const base = image.file.name.replace(/\.[^.]+$/, "");
    const a = document.createElement("a");
    a.href = result.url;
    a.download = `${base}-${result.width}x${result.height}.${ext}`;
    a.click();
  }

  const sizePct =
    result && image
      ? Math.round((1 - result.size / image.size) * 100)
      : null;

  return (
    <div style={{ fontFamily: "inherit" }}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {!image ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          style={{
            border: `2px dashed ${dragging ? ACCENT : "rgba(192,132,252,0.3)"}`,
            borderRadius: "16px",
            background: dragging ? "rgba(192,132,252,0.05)" : PANEL,
            padding: "60px 24px",
            textAlign: "center",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          <div style={{ fontSize: "40px", marginBottom: "16px", opacity: 0.7 }}>🖼️</div>
          <p style={{ color: "#e2e8f0", fontSize: "15px", fontWeight: 600, marginBottom: "8px" }}>
            Drop an image here
          </p>
          <p style={{ color: "rgba(226,232,240,0.4)", fontSize: "13px" }}>
            or click to browse — JPEG, PNG, WebP, GIF, BMP
          </p>
        </div>
      ) : (
        <div>
          <div
            style={{
              background: PANEL,
              borderRadius: "16px",
              padding: "20px",
              marginBottom: "12px",
              boxShadow: `0 0 0 1px rgba(192,132,252,0.12)`,
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <img
              src={image.url}
              alt="original preview"
              style={{
                width: "72px",
                height: "72px",
                objectFit: "cover",
                borderRadius: "10px",
                border: "1px solid rgba(192,132,252,0.2)",
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ color: "#e2e8f0", fontSize: "13px", fontWeight: 600, marginBottom: "4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {image.file.name}
              </p>
              <p style={{ color: "rgba(226,232,240,0.45)", fontSize: "12px", marginBottom: "2px" }}>
                {image.width} × {image.height} px
              </p>
              <p style={{ color: "rgba(226,232,240,0.35)", fontSize: "11px" }}>
                {formatBytes(image.size)}
              </p>
            </div>
            <button
              onClick={() => { if (image) URL.revokeObjectURL(image.url); setImage(null); setResult(null); setScalePercent(""); setWidthVal(""); setHeightVal(""); }}
              style={{ color: "rgba(226,232,240,0.3)", background: "none", border: "none", cursor: "pointer", fontSize: "18px", padding: "4px", lineHeight: 1, flexShrink: 0 }}
            >
              ✕
            </button>
          </div>

          <div
            style={{
              background: PANEL,
              borderRadius: "16px",
              padding: "24px",
              boxShadow: `0 0 0 1px rgba(192,132,252,0.12)`,
              marginBottom: "12px",
            }}
          >
            <p style={{ ...labelStyle, marginBottom: "12px" }}>Social media presets</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {PRESETS.map((p) => (
                <button
                  key={p.label}
                  onClick={() => applyPreset(p.w, p.h)}
                  style={{
                    background: "rgba(192,132,252,0.08)",
                    border: "1px solid rgba(192,132,252,0.18)",
                    borderRadius: "8px",
                    color: "#e2e8f0",
                    fontSize: "11px",
                    padding: "6px 12px",
                    cursor: "pointer",
                    transition: "all 0.15s",
                    fontFamily: "inherit",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(192,132,252,0.16)";
                    e.currentTarget.style.borderColor = "rgba(192,132,252,0.35)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(192,132,252,0.08)";
                    e.currentTarget.style.borderColor = "rgba(192,132,252,0.18)";
                  }}
                >
                  <span style={{ color: ACCENT, fontWeight: 600 }}>{p.w}×{p.h}</span>
                  <span style={{ color: "rgba(226,232,240,0.45)", marginLeft: "5px" }}>{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div
            style={{
              background: PANEL,
              borderRadius: "16px",
              padding: "24px",
              boxShadow: `0 0 0 1px rgba(192,132,252,0.12)`,
              marginBottom: "12px",
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              <div>
                <label style={labelStyle}>Width (px)</label>
                <input
                  type="number"
                  value={widthVal}
                  min="1"
                  onChange={(e) => handleWidthChange(e.target.value)}
                  style={inputBase}
                  onFocus={(e) => (e.currentTarget.style.borderColor = ACCENT)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(192,132,252,0.2)")}
                />
              </div>
              <div>
                <label style={labelStyle}>Height (px)</label>
                <input
                  type="number"
                  value={heightVal}
                  min="1"
                  onChange={(e) => handleHeightChange(e.target.value)}
                  style={inputBase}
                  onFocus={(e) => (e.currentTarget.style.borderColor = ACCENT)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(192,132,252,0.2)")}
                />
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <button
                onClick={() => setLockRatio(!lockRatio)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: lockRatio ? "rgba(192,132,252,0.12)" : "rgba(255,255,255,0.04)",
                  border: `1.5px solid ${lockRatio ? "rgba(192,132,252,0.35)" : "rgba(255,255,255,0.08)"}`,
                  borderRadius: "10px",
                  padding: "8px 14px",
                  cursor: "pointer",
                  color: lockRatio ? ACCENT : "rgba(226,232,240,0.4)",
                  fontSize: "12px",
                  fontWeight: 600,
                  fontFamily: "inherit",
                  transition: "all 0.2s",
                  userSelect: "none",
                }}
              >
                <span style={{ fontSize: "14px" }}>{lockRatio ? "🔒" : "🔓"}</span>
                Lock aspect ratio
              </button>
            </div>

            <div style={{ marginBottom: "0" }}>
              <label style={labelStyle}>Scale by %</label>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input
                  type="number"
                  value={scalePercent}
                  min="1"
                  max="1000"
                  placeholder="e.g. 50"
                  onChange={(e) => handleScaleChange(e.target.value)}
                  style={{ ...inputBase, flex: 1 }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = ACCENT)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(192,132,252,0.2)")}
                />
                <span style={{ color: "rgba(226,232,240,0.4)", fontSize: "14px", flexShrink: 0 }}>%</span>
              </div>
            </div>
          </div>

          <div
            style={{
              background: PANEL,
              borderRadius: "16px",
              padding: "24px",
              boxShadow: `0 0 0 1px rgba(192,132,252,0.12)`,
              marginBottom: "12px",
            }}
          >
            <div style={{ marginBottom: "16px" }}>
              <label style={labelStyle}>Output format</label>
              <div style={{ display: "flex", gap: "8px" }}>
                {(["jpeg", "png", "webp"] as Format[]).map((f) => (
                  <label
                    key={f}
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "7px",
                      padding: "9px 12px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      background: format === f ? "rgba(192,132,252,0.14)" : "rgba(255,255,255,0.04)",
                      border: `1.5px solid ${format === f ? "rgba(192,132,252,0.4)" : "rgba(255,255,255,0.07)"}`,
                      color: format === f ? ACCENT : "rgba(226,232,240,0.45)",
                      fontSize: "12px",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      transition: "all 0.2s",
                      userSelect: "none",
                    }}
                  >
                    <input
                      type="radio"
                      name="format"
                      value={f}
                      checked={format === f}
                      onChange={() => setFormat(f)}
                      style={{ display: "none" }}
                    />
                    {f}
                  </label>
                ))}
              </div>
            </div>

            {format === "jpeg" && (
              <div>
                <label style={labelStyle}>
                  JPEG quality — <span style={{ color: ACCENT, fontVariantNumeric: "tabular-nums" }}>{quality}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  style={{
                    width: "100%",
                    accentColor: ACCENT,
                    cursor: "pointer",
                  }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
                  <span style={{ fontSize: "10px", color: "rgba(226,232,240,0.3)" }}>1 — smallest</span>
                  <span style={{ fontSize: "10px", color: "rgba(226,232,240,0.3)" }}>100 — lossless</span>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleResize}
            disabled={resizing || !widthVal || !heightVal}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "12px",
              background: resizing || !widthVal || !heightVal
                ? "rgba(192,132,252,0.25)"
                : `linear-gradient(135deg, #a855f7, ${ACCENT})`,
              border: "none",
              color: resizing || !widthVal || !heightVal ? "rgba(226,232,240,0.35)" : "#fff",
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.05em",
              cursor: resizing || !widthVal || !heightVal ? "not-allowed" : "pointer",
              fontFamily: "inherit",
              transition: "all 0.2s",
              marginBottom: "16px",
            }}
          >
            {resizing ? "Resizing…" : "Resize Image"}
          </button>

          {result && image && (
            <div
              style={{
                background: PANEL,
                borderRadius: "16px",
                padding: "24px",
                boxShadow: `0 0 0 1px rgba(74,222,128,0.15)`,
              }}
            >
              <p style={{ ...labelStyle, color: "#4ade80", marginBottom: "16px" }}>
                Result
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "10px", color: "rgba(226,232,240,0.35)", marginBottom: "8px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Original</p>
                  <img
                    src={image.url}
                    alt="original"
                    style={{ width: "100%", aspectRatio: "1", objectFit: "contain", borderRadius: "10px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(192,132,252,0.12)" }}
                  />
                  <p style={{ fontSize: "12px", color: "rgba(226,232,240,0.5)", marginTop: "6px" }}>
                    {image.width} × {image.height}
                  </p>
                  <p style={{ fontSize: "11px", color: "rgba(226,232,240,0.35)" }}>{formatBytes(image.size)}</p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "10px", color: "rgba(226,232,240,0.35)", marginBottom: "8px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Resized</p>
                  <img
                    src={result.url}
                    alt="resized"
                    style={{ width: "100%", aspectRatio: "1", objectFit: "contain", borderRadius: "10px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(74,222,128,0.2)" }}
                  />
                  <p style={{ fontSize: "12px", color: "#e2e8f0", marginTop: "6px", fontWeight: 600 }}>
                    {result.width} × {result.height}
                  </p>
                  <p style={{ fontSize: "11px", color: "rgba(226,232,240,0.35)" }}>{formatBytes(result.size)}</p>
                </div>
              </div>

              {sizePct !== null && (
                <div
                  style={{
                    background: sizePct > 0 ? "rgba(74,222,128,0.08)" : "rgba(192,132,252,0.08)",
                    border: `1px solid ${sizePct > 0 ? "rgba(74,222,128,0.2)" : "rgba(192,132,252,0.2)"}`,
                    borderRadius: "10px",
                    padding: "10px 16px",
                    textAlign: "center",
                    marginBottom: "16px",
                    fontSize: "13px",
                    color: sizePct > 0 ? "#4ade80" : ACCENT,
                    fontWeight: 600,
                  }}
                >
                  {sizePct > 0
                    ? `${sizePct}% smaller than original`
                    : sizePct === 0
                    ? "Same file size as original"
                    : `${Math.abs(sizePct)}% larger than original`}
                </div>
              )}

              <button
                onClick={handleDownload}
                style={{
                  width: "100%",
                  padding: "13px",
                  borderRadius: "12px",
                  background: "rgba(74,222,128,0.12)",
                  border: "1.5px solid rgba(74,222,128,0.3)",
                  color: "#4ade80",
                  fontSize: "14px",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(74,222,128,0.18)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(74,222,128,0.12)";
                }}
              >
                Download resized image
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
