"use client";
import { useState, useRef, useEffect, useCallback } from "react";

const TEMPLATES = [
  { id: 1,  name: "Distracted Boyfriend" },
  { id: 2,  name: "Drake Approves" },
  { id: 3,  name: "This Is Fine" },
  { id: 4,  name: "Two Buttons" },
  { id: 5,  name: "Change My Mind" },
  { id: 6,  name: "Expanding Brain" },
  { id: 7,  name: "Surprised Pikachu" },
  { id: 8,  name: "Galaxy Brain" },
  { id: 9,  name: "Uno Reverse" },
  { id: 10, name: "Stonks" },
  { id: 11, name: "Average Fan" },
  { id: 12, name: "The Floor Is Lava" },
];

const FONTS = ["Impact", "Arial", "Comic Sans MS"];

type Position = "top" | "middle" | "bottom";

export default function MemeGenerator() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const imgRef     = useRef<HTMLImageElement | null>(null);
  const fileRef    = useRef<HTMLInputElement>(null);

  const [selectedId,    setSelectedId]    = useState<number | null>(null);
  const [customSrc,     setCustomSrc]     = useState<string | null>(null);
  const [topText,       setTopText]       = useState("When you...");
  const [bottomText,    setBottomText]    = useState("But then...");
  const [fontSize,      setFontSize]      = useState(36);
  const [fontFamily,    setFontFamily]    = useState("Impact");
  const [textColor,     setTextColor]     = useState("#ffffff");
  const [useOutline,    setUseOutline]    = useState(true);
  const [topPos,        setTopPos]        = useState<Position>("top");
  const [bottomPos,     setBottomPos]     = useState<Position>("bottom");
  const [imgLoaded,     setImgLoaded]     = useState(false);

  const getTextY = useCallback(
    (pos: Position, canvasH: number): number => {
      if (pos === "top")    return fontSize + 16;
      if (pos === "middle") return canvasH / 2 + fontSize / 3;
      return canvasH - 16;
    },
    [fontSize],
  );

  const drawMeme = useCallback(() => {
    const canvas = canvasRef.current;
    const img    = imgRef.current;
    if (!canvas || !img || !imgLoaded) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    ctx.font      = `bold ${fontSize}px ${fontFamily}`;
    ctx.textAlign = "center";

    const drawText = (text: string, y: number) => {
      if (!text.trim()) return;
      if (useOutline) {
        ctx.strokeStyle = "#000000";
        ctx.lineWidth   = Math.max(2, fontSize * 0.08);
        ctx.lineJoin    = "round";
        ctx.strokeText(text, canvas.width / 2, y);
      }
      ctx.fillStyle = textColor;
      ctx.fillText(text, canvas.width / 2, y);
    };

    drawText(topText,    getTextY(topPos,    canvas.height));
    drawText(bottomText, getTextY(bottomPos, canvas.height));
  }, [topText, bottomText, fontSize, fontFamily, textColor, useOutline, topPos, bottomPos, imgLoaded, getTextY]);

  useEffect(() => {
    drawMeme();
  }, [drawMeme]);

  const loadImageSrc = useCallback((src: string) => {
    setImgLoaded(false);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imgRef.current = img;
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width  = 500;
        canvas.height = Math.round(500 * (img.naturalHeight / img.naturalWidth)) || 375;
      }
      setImgLoaded(true);
    };
    img.onerror = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          canvas.width  = 500;
          canvas.height = 375;
          ctx.fillStyle = "#2d1048";
          ctx.fillRect(0, 0, 500, 375);
          ctx.fillStyle = "rgba(250,204,21,0.15)";
          for (let i = 0; i < 500; i += 40) {
            for (let j = 0; j < 375; j += 40) {
              ctx.beginPath();
              ctx.arc(i, j, 1.5, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }
      imgRef.current = null;
      setImgLoaded(true);
    };
    img.src = src;
  }, []);

  const handleTemplateSelect = (id: number) => {
    setSelectedId(id);
    setCustomSrc(null);
    loadImageSrc(`https://picsum.photos/seed/meme${id}/500/375`);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setCustomSrc(url);
    setSelectedId(null);
    loadImageSrc(url);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link    = document.createElement("a");
    link.download = "meme.png";
    link.href     = canvas.toDataURL("image/png");
    link.click();
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "#1a0533",
    border: "1px solid rgba(250,204,21,0.2)",
    borderRadius: "10px",
    color: "#fafafa",
    padding: "10px 14px",
    fontSize: "13px",
    fontFamily: "inherit",
    outline: "none",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "rgba(250,204,21,0.6)",
    marginBottom: "6px",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

      <div style={{ background: "#250840", border: "1px solid rgba(250,204,21,0.15)", borderRadius: "16px", padding: "20px" }}>
        <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(250,204,21,0.6)", marginBottom: "14px" }}>
          Choose a Template
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "10px" }}>
          {TEMPLATES.map((t) => {
            const isSelected = selectedId === t.id;
            return (
              <button
                key={t.id}
                onClick={() => handleTemplateSelect(t.id)}
                style={{
                  background: isSelected ? "rgba(250,204,21,0.12)" : "rgba(255,255,255,0.03)",
                  border: `2px solid ${isSelected ? "#facc15" : "rgba(250,204,21,0.12)"}`,
                  borderRadius: "12px",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "90px",
                    background: `linear-gradient(135deg, hsl(${t.id * 29}deg 55% 22%), hsl(${t.id * 29 + 40}deg 60% 18%))`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "28px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <span style={{ position: "relative", zIndex: 1 }}>
                    {["😂", "🐉", "🔥", "🤔", "💡", "🧠", "⚡", "🌌", "🃏", "📈", "😐", "🏃"][t.id - 1]}
                  </span>
                  <div style={{
                    position: "absolute", inset: 0,
                    backgroundImage: "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.06) 0%, transparent 60%)",
                  }} />
                </div>
                <div style={{ padding: "8px 8px", background: isSelected ? "rgba(250,204,21,0.08)" : "transparent" }}>
                  <p style={{ fontSize: "10px", fontWeight: 600, color: isSelected ? "#facc15" : "rgba(250,250,250,0.7)", textAlign: "center", lineHeight: 1.3 }}>
                    {t.name}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: "14px", paddingTop: "14px", borderTop: "1px solid rgba(250,204,21,0.1)" }}>
          <label style={labelStyle}>Or Upload Your Own Image</label>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <button
            onClick={() => fileRef.current?.click()}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "9px 18px",
              background: customSrc ? "rgba(249,115,22,0.15)" : "rgba(255,255,255,0.05)",
              border: `1.5px solid ${customSrc ? "#f97316" : "rgba(250,204,21,0.2)"}`,
              borderRadius: "10px",
              color: customSrc ? "#f97316" : "rgba(250,250,250,0.7)",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            📂 {customSrc ? "Custom image loaded" : "Upload image"}
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>

        <div style={{ background: "#250840", border: "1px solid rgba(250,204,21,0.15)", borderRadius: "16px", padding: "20px", display: "flex", flexDirection: "column", gap: "14px" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(250,204,21,0.6)", marginBottom: "2px" }}>
            Text Controls
          </p>

          <div>
            <label style={labelStyle}>Top Text</label>
            <input
              type="text"
              value={topText}
              onChange={(e) => setTopText(e.target.value)}
              placeholder="Top text..."
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Top Position</label>
            <select value={topPos} onChange={(e) => setTopPos(e.target.value as Position)} style={inputStyle}>
              <option value="top">Top</option>
              <option value="middle">Middle</option>
              <option value="bottom">Bottom</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Bottom Text</label>
            <input
              type="text"
              value={bottomText}
              onChange={(e) => setBottomText(e.target.value)}
              placeholder="Bottom text..."
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Bottom Position</label>
            <select value={bottomPos} onChange={(e) => setBottomPos(e.target.value as Position)} style={inputStyle}>
              <option value="top">Top</option>
              <option value="middle">Middle</option>
              <option value="bottom">Bottom</option>
            </select>
          </div>
        </div>

        <div style={{ background: "#250840", border: "1px solid rgba(250,204,21,0.15)", borderRadius: "16px", padding: "20px", display: "flex", flexDirection: "column", gap: "14px" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(250,204,21,0.6)", marginBottom: "2px" }}>
            Style Controls
          </p>

          <div>
            <label style={labelStyle}>Font Size: {fontSize}px</label>
            <input
              type="range"
              min={20}
              max={72}
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#facc15" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
              <span style={{ fontSize: "10px", color: "rgba(250,204,21,0.4)" }}>20px</span>
              <span style={{ fontSize: "10px", color: "rgba(250,204,21,0.4)" }}>72px</span>
            </div>
          </div>

          <div>
            <label style={labelStyle}>Font Family</label>
            <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} style={inputStyle}>
              {FONTS.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={labelStyle}>Text Color</label>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                style={{ width: "44px", height: "36px", border: "1px solid rgba(250,204,21,0.2)", borderRadius: "8px", cursor: "pointer", background: "none", padding: "2px" }}
              />
              <span style={{ fontSize: "12px", color: "rgba(250,250,250,0.6)", fontFamily: "monospace" }}>{textColor.toUpperCase()}</span>
            </div>
          </div>

          <div>
            <button
              onClick={() => setUseOutline((v) => !v)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "9px 16px",
                background: useOutline ? "rgba(250,204,21,0.12)" : "rgba(255,255,255,0.04)",
                border: `1.5px solid ${useOutline ? "#facc15" : "rgba(250,204,21,0.15)"}`,
                borderRadius: "10px",
                color: useOutline ? "#facc15" : "rgba(250,250,250,0.5)",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              <span style={{
                width: "16px", height: "16px", borderRadius: "4px",
                background: useOutline ? "#facc15" : "transparent",
                border: `2px solid ${useOutline ? "#facc15" : "rgba(250,204,21,0.3)"}`,
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                {useOutline && <span style={{ color: "#1a0533", fontSize: "11px", lineHeight: 1 }}>✓</span>}
              </span>
              Black Outline (2px stroke)
            </button>
          </div>
        </div>
      </div>

      <div style={{ background: "#250840", border: "1px solid rgba(250,204,21,0.15)", borderRadius: "16px", padding: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(250,204,21,0.6)" }}>
            Live Preview
          </p>
          <button
            onClick={handleDownload}
            disabled={!imgLoaded || (!selectedId && !customSrc)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "9px 20px",
              background: imgLoaded && (selectedId || customSrc) ? "linear-gradient(135deg, #facc15, #f97316)" : "rgba(255,255,255,0.06)",
              border: "none",
              borderRadius: "10px",
              color: imgLoaded && (selectedId || customSrc) ? "#1a0533" : "rgba(250,250,250,0.3)",
              fontSize: "12px",
              fontWeight: 800,
              cursor: imgLoaded && (selectedId || customSrc) ? "pointer" : "not-allowed",
              transition: "all 0.15s",
              letterSpacing: "0.03em",
            }}
          >
            ⬇ Download Meme
          </button>
        </div>

        <div style={{
          background: "#1a0533",
          border: "1px solid rgba(250,204,21,0.1)",
          borderRadius: "12px",
          padding: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "200px",
        }}>
          {!selectedId && !customSrc ? (
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: "42px", marginBottom: "12px" }}>😂</p>
              <p style={{ fontSize: "13px", color: "rgba(250,204,21,0.5)", fontWeight: 600 }}>
                Pick a template or upload an image to start
              </p>
            </div>
          ) : (
            <canvas
              ref={canvasRef}
              style={{
                maxWidth: "100%",
                borderRadius: "8px",
                display: "block",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
