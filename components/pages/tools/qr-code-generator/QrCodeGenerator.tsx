"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { encodeText } from "./qrcode";

type Tab = "url" | "text" | "wifi" | "email";
type ECC = 0 | 1 | 2 | 3;

const ECC_LABELS: Record<ECC, string> = { 0: "L", 1: "M", 2: "Q", 3: "H" };

function buildPayload(
  tab: Tab,
  url: string,
  text: string,
  ssid: string,
  wifiPw: string,
  security: string,
  emailTo: string,
  subject: string,
  body: string
): string {
  if (tab === "url") return url.trim() || "https://example.com";
  if (tab === "text") return text || "Hello, world!";
  if (tab === "wifi") return `WIFI:T:${security};S:${ssid};P:${wifiPw};;`;
  const params: string[] = [];
  if (subject.trim()) params.push("subject=" + encodeURIComponent(subject));
  if (body.trim()) params.push("body=" + encodeURIComponent(body));
  return `mailto:${emailTo}${params.length ? "?" + params.join("&") : ""}`;
}

function renderQR(
  canvas: HTMLCanvasElement,
  matrix: boolean[][],
  size: number,
  fg: string,
  bg: string
): void {
  const dim = matrix.length;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const scale = size / dim;
  canvas.width = size;
  canvas.height = size;
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = fg;
  for (let r = 0; r < dim; r++) {
    for (let c = 0; c < dim; c++) {
      if (matrix[r][c]) {
        ctx.fillRect(
          Math.floor(c * scale),
          Math.floor(r * scale),
          Math.ceil(scale),
          Math.ceil(scale)
        );
      }
    }
  }
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: "10px",
  border: "1px solid #e5e7eb",
  background: "#ffffff",
  color: "#111111",
  fontSize: "13px",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "11px",
  fontWeight: 600,
  color: "#6b7280",
  marginBottom: "6px",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
};

export default function QrCodeGenerator() {
  const [tab, setTab] = useState<Tab>("url");
  const [url, setUrl] = useState("https://");
  const [text, setText] = useState("");
  const [ssid, setSsid] = useState("");
  const [wifiPw, setWifiPw] = useState("");
  const [security, setSecurity] = useState("WPA");
  const [emailTo, setEmailTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [qrSize, setQrSize] = useState(300);
  const [fg, setFg] = useState("#111111");
  const [bg, setBg] = useState("#ffffff");
  const [ecc, setEcc] = useState<ECC>(1);
  const [error, setError] = useState("");

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generate = useCallback(() => {
    const payload = buildPayload(tab, url, text, ssid, wifiPw, security, emailTo, subject, body);
    try {
      const matrix = encodeText(payload, ecc);
      if (canvasRef.current) renderQR(canvasRef.current, matrix, qrSize, fg, bg);
      setError("");
    } catch {
      setError("Text too long to encode. Please shorten the input.");
    }
  }, [tab, url, text, ssid, wifiPw, security, emailTo, subject, body, qrSize, fg, bg, ecc]);

  useEffect(() => {
    generate();
  }, [generate]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  const tabs: Tab[] = ["url", "text", "wifi", "email"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div
        style={{
          background: "#ffffff",
          borderRadius: "20px",
          padding: "28px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.05)",
        }}
      >
        <div style={{ display: "flex", gap: "4px", marginBottom: "24px", background: "#f3f4f6", borderRadius: "10px", padding: "4px" }}>
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                flex: 1,
                padding: "8px 4px",
                borderRadius: "7px",
                border: "none",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.03em",
                transition: "all 0.15s",
                background: tab === t ? "#111111" : "transparent",
                color: tab === t ? "#ffffff" : "#6b7280",
                textTransform: "capitalize",
              }}
            >
              {t === "url" ? "URL" : t === "wifi" ? "WiFi" : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {tab === "url" && (
          <div>
            <label style={labelStyle}>URL</label>
            <input style={inputStyle} type="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com" />
          </div>
        )}

        {tab === "text" && (
          <div>
            <label style={labelStyle}>Text</label>
            <textarea
              style={{ ...inputStyle, minHeight: "100px", resize: "vertical", fontFamily: "inherit" }}
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Enter any text..."
            />
          </div>
        )}

        {tab === "wifi" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div>
              <label style={labelStyle}>Network Name (SSID)</label>
              <input style={inputStyle} type="text" value={ssid} onChange={e => setSsid(e.target.value)} placeholder="MyNetwork" />
            </div>
            <div>
              <label style={labelStyle}>Password</label>
              <input style={inputStyle} type="password" value={wifiPw} onChange={e => setWifiPw(e.target.value)} placeholder="••••••••" />
            </div>
            <div>
              <label style={labelStyle}>Security</label>
              <select style={inputStyle} value={security} onChange={e => setSecurity(e.target.value)}>
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">None</option>
              </select>
            </div>
          </div>
        )}

        {tab === "email" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div>
              <label style={labelStyle}>To</label>
              <input style={inputStyle} type="email" value={emailTo} onChange={e => setEmailTo(e.target.value)} placeholder="recipient@example.com" />
            </div>
            <div>
              <label style={labelStyle}>Subject</label>
              <input style={inputStyle} type="text" value={subject} onChange={e => setSubject(e.target.value)} placeholder="Subject line" />
            </div>
            <div>
              <label style={labelStyle}>Body</label>
              <textarea
                style={{ ...inputStyle, minHeight: "80px", resize: "vertical", fontFamily: "inherit" }}
                value={body}
                onChange={e => setBody(e.target.value)}
                placeholder="Message body..."
              />
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          background: "#ffffff",
          borderRadius: "20px",
          padding: "24px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.05)",
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
            <label style={labelStyle}>Size</label>
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#111111" }}>{qrSize}px</span>
          </div>
          <input
            type="range"
            min={200}
            max={400}
            step={100}
            value={qrSize}
            onChange={e => setQrSize(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#111111", cursor: "pointer" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px", fontSize: "10px", color: "#9ca3af" }}>
            <span>200px</span><span>300px</span><span>400px</span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div>
            <label style={labelStyle}>Foreground</label>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="color"
                value={fg}
                onChange={e => setFg(e.target.value)}
                style={{ width: "40px", height: "36px", padding: "2px", border: "1px solid #e5e7eb", borderRadius: "8px", cursor: "pointer", background: "#fff" }}
              />
              <span style={{ fontSize: "12px", color: "#6b7280", fontFamily: "monospace" }}>{fg}</span>
            </div>
          </div>
          <div>
            <label style={labelStyle}>Background</label>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="color"
                value={bg}
                onChange={e => setBg(e.target.value)}
                style={{ width: "40px", height: "36px", padding: "2px", border: "1px solid #e5e7eb", borderRadius: "8px", cursor: "pointer", background: "#fff" }}
              />
              <span style={{ fontSize: "12px", color: "#6b7280", fontFamily: "monospace" }}>{bg}</span>
            </div>
          </div>
        </div>

        <div>
          <label style={labelStyle}>Error Correction</label>
          <div style={{ display: "flex", gap: "6px" }}>
            {([0, 1, 2, 3] as ECC[]).map((level) => (
              <button
                key={level}
                onClick={() => setEcc(level)}
                style={{
                  flex: 1,
                  padding: "8px",
                  borderRadius: "8px",
                  border: "1px solid",
                  borderColor: ecc === level ? "#111111" : "#e5e7eb",
                  background: ecc === level ? "#111111" : "#ffffff",
                  color: ecc === level ? "#ffffff" : "#6b7280",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {ECC_LABELS[level]}
              </button>
            ))}
          </div>
          <p style={{ marginTop: "6px", fontSize: "11px", color: "#9ca3af" }}>
            L = 7% · M = 15% · Q = 25% · H = 30% data recovery
          </p>
        </div>
      </div>

      <div
        style={{
          background: "#ffffff",
          borderRadius: "20px",
          padding: "24px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.05)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {error ? (
          <div style={{ padding: "16px 20px", background: "#fef2f2", borderRadius: "12px", color: "#dc2626", fontSize: "13px", width: "100%", textAlign: "center" }}>
            {error}
          </div>
        ) : (
          <div
            style={{
              padding: "16px",
              background: bg,
              borderRadius: "16px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              display: "inline-block",
              lineHeight: 0,
            }}
          >
            <canvas ref={canvasRef} style={{ display: "block", borderRadius: "4px" }} />
          </div>
        )}

        <button
          onClick={handleDownload}
          disabled={!!error}
          style={{
            padding: "12px 32px",
            background: "#111111",
            color: "#ffffff",
            border: "none",
            borderRadius: "10px",
            fontSize: "13px",
            fontWeight: 600,
            cursor: error ? "not-allowed" : "pointer",
            opacity: error ? 0.4 : 1,
            letterSpacing: "0.02em",
            transition: "opacity 0.15s",
          }}
          onMouseEnter={e => { if (!error) e.currentTarget.style.opacity = "0.8"; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = error ? "0.4" : "1"; }}
        >
          Download PNG
        </button>
      </div>
    </div>
  );
}
