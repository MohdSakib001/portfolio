"use client";
import { useState, useRef, useCallback, useEffect } from "react";

type OutputFormat = "image/jpeg" | "image/png" | "image/webp";

interface ImageEntry {
  id: string;
  file: File;
  originalUrl: string;
  originalSize: number;
  compressedBlob: Blob | null;
  compressedUrl: string | null;
  compressedSize: number | null;
  status: "pending" | "compressing" | "done" | "error";
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function savings(orig: number, comp: number): number {
  return Math.round(((orig - comp) / orig) * 100);
}

function extForFormat(fmt: OutputFormat): string {
  if (fmt === "image/jpeg") return "jpg";
  if (fmt === "image/png") return "png";
  return "webp";
}

async function compressImage(file: File, quality: number, format: OutputFormat): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) { reject(new Error("No canvas context")); return; }
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(url);
          if (blob) resolve(blob);
          else reject(new Error("toBlob failed"));
        },
        format,
        quality / 100
      );
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Image load error")); };
    img.src = url;
  });
}

const ACCENT = "#2563eb";
const BG = "#f0f7ff";
const PANEL = "#ffffff";

export default function ImageCompressor() {
  const [entries, setEntries] = useState<ImageEntry[]>([]);
  const [quality, setQuality] = useState(80);
  const [format, setFormat] = useState<OutputFormat>("image/jpeg");
  const [dragging, setDragging] = useState(false);
  const [compressing, setCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      entries.forEach((e) => {
        URL.revokeObjectURL(e.originalUrl);
        if (e.compressedUrl) URL.revokeObjectURL(e.compressedUrl);
      });
    };
  }, []);

  const addFiles = useCallback((files: FileList | File[]) => {
    const arr = Array.from(files).filter((f) => f.type.startsWith("image/")).slice(0, 5);
    if (!arr.length) return;
    const newEntries: ImageEntry[] = arr.map((file) => ({
      id: crypto.randomUUID(),
      file,
      originalUrl: URL.createObjectURL(file),
      originalSize: file.size,
      compressedBlob: null,
      compressedUrl: null,
      compressedSize: null,
      status: "pending",
    }));
    setEntries((prev) => {
      const combined = [...prev, ...newEntries].slice(0, 5);
      return combined;
    });
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      addFiles(e.dataTransfer.files);
    },
    [addFiles]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) addFiles(e.target.files);
      e.target.value = "";
    },
    [addFiles]
  );

  const compressAll = useCallback(async () => {
    if (!entries.length) return;
    setCompressing(true);
    const updated = [...entries];
    for (let i = 0; i < updated.length; i++) {
      updated[i] = { ...updated[i], status: "compressing" };
      setEntries([...updated]);
      try {
        const blob = await compressImage(updated[i].file, quality, format);
        const url = URL.createObjectURL(blob);
        if (updated[i].compressedUrl) URL.revokeObjectURL(updated[i].compressedUrl!);
        updated[i] = { ...updated[i], compressedBlob: blob, compressedUrl: url, compressedSize: blob.size, status: "done" };
      } catch {
        updated[i] = { ...updated[i], status: "error" };
      }
      setEntries([...updated]);
    }
    setCompressing(false);
  }, [entries, quality, format]);

  const downloadOne = (entry: ImageEntry) => {
    if (!entry.compressedBlob || !entry.compressedUrl) return;
    const baseName = entry.file.name.replace(/\.[^.]+$/, "");
    const a = document.createElement("a");
    a.href = entry.compressedUrl;
    a.download = `${baseName}-compressed.${extForFormat(format)}`;
    a.click();
  };

  const downloadAll = () => {
    entries.filter((e) => e.status === "done").forEach((e) => downloadOne(e));
  };

  const removeEntry = (id: string) => {
    setEntries((prev) => {
      const entry = prev.find((e) => e.id === id);
      if (entry) {
        URL.revokeObjectURL(entry.originalUrl);
        if (entry.compressedUrl) URL.revokeObjectURL(entry.compressedUrl);
      }
      return prev.filter((e) => e.id !== id);
    });
  };

  const clearAll = () => {
    entries.forEach((e) => {
      URL.revokeObjectURL(e.originalUrl);
      if (e.compressedUrl) URL.revokeObjectURL(e.compressedUrl);
    });
    setEntries([]);
  };

  const doneCount = entries.filter((e) => e.status === "done").length;

  return (
    <div style={{ fontFamily: "inherit" }}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        style={{ display: "none" }}
        onChange={handleFileInput}
      />

      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: `2px dashed ${dragging ? ACCENT : "#93c5fd"}`,
          borderRadius: "16px",
          background: dragging ? "#dbeafe" : PANEL,
          padding: "48px 24px",
          textAlign: "center",
          cursor: "pointer",
          transition: "all 0.2s ease",
          marginBottom: "24px",
        }}
      >
        <div style={{ fontSize: "48px", marginBottom: "12px", lineHeight: 1 }}>📷</div>
        <p style={{ fontWeight: 700, fontSize: "16px", color: ACCENT, marginBottom: "6px" }}>
          Drop images here or click to upload
        </p>
        <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
          JPG, PNG, WebP, GIF — up to 5 images at once
        </p>
      </div>

      <div
        style={{
          background: PANEL,
          borderRadius: "16px",
          padding: "24px",
          marginBottom: "24px",
          boxShadow: "0 1px 4px rgba(37,99,235,0.08)",
          border: "1px solid #dbeafe",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "flex-end", marginBottom: "20px" }}>
          <div style={{ flex: "1 1 220px" }}>
            <label
              style={{
                display: "block",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#64748b",
                marginBottom: "8px",
              }}
            >
              Quality: {quality}%
            </label>
            <input
              type="range"
              min={1}
              max={100}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              style={{
                width: "100%",
                accentColor: ACCENT,
                height: "6px",
                cursor: "pointer",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#94a3b8", marginTop: "4px" }}>
              <span>Smallest</span>
              <span>Best quality</span>
            </div>
          </div>

          <div style={{ flex: "0 1 160px" }}>
            <label
              style={{
                display: "block",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#64748b",
                marginBottom: "8px",
              }}
            >
              Output format
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as OutputFormat)}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "10px",
                border: "1.5px solid #bfdbfe",
                background: BG,
                color: "#1e3a5f",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                outline: "none",
              }}
            >
              <option value="image/jpeg">JPEG</option>
              <option value="image/png">PNG</option>
              <option value="image/webp">WebP</option>
            </select>
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          <button
            onClick={compressAll}
            disabled={!entries.length || compressing}
            style={{
              padding: "11px 22px",
              borderRadius: "10px",
              background: !entries.length || compressing ? "#bfdbfe" : ACCENT,
              color: "#fff",
              fontWeight: 700,
              fontSize: "13px",
              border: "none",
              cursor: !entries.length || compressing ? "not-allowed" : "pointer",
              transition: "opacity 0.2s",
            }}
          >
            {compressing ? "Compressing…" : "Compress All"}
          </button>

          <button
            onClick={downloadAll}
            disabled={doneCount === 0}
            style={{
              padding: "11px 22px",
              borderRadius: "10px",
              background: doneCount === 0 ? "#f1f5f9" : "#dbeafe",
              color: doneCount === 0 ? "#94a3b8" : ACCENT,
              fontWeight: 700,
              fontSize: "13px",
              border: `1.5px solid ${doneCount === 0 ? "#e2e8f0" : "#bfdbfe"}`,
              cursor: doneCount === 0 ? "not-allowed" : "pointer",
            }}
          >
            Download All ({doneCount})
          </button>

          <button
            onClick={clearAll}
            disabled={!entries.length}
            style={{
              padding: "11px 22px",
              borderRadius: "10px",
              background: "transparent",
              color: !entries.length ? "#cbd5e1" : "#ef4444",
              fontWeight: 600,
              fontSize: "13px",
              border: `1.5px solid ${!entries.length ? "#e2e8f0" : "#fecaca"}`,
              cursor: !entries.length ? "not-allowed" : "pointer",
            }}
          >
            Clear All
          </button>
        </div>
      </div>

      {compressing && (
        <div
          style={{
            background: "#dbeafe",
            border: "1px solid #bfdbfe",
            borderRadius: "12px",
            padding: "14px 20px",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              border: `3px solid ${ACCENT}`,
              borderTopColor: "transparent",
              animation: "spin 0.8s linear infinite",
              flexShrink: 0,
            }}
          />
          <span style={{ fontSize: "13px", color: ACCENT, fontWeight: 600 }}>
            Compressing images in your browser — nothing is uploaded to any server.
          </span>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {!entries.length && (
        <div
          style={{
            background: PANEL,
            border: "1px solid #dbeafe",
            borderRadius: "16px",
            padding: "48px 24px",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "14px", color: "#94a3b8", margin: 0 }}>
            Upload images above to get started. No files leave your device.
          </p>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {entries.map((entry) => (
          <div
            key={entry.id}
            style={{
              background: PANEL,
              border: "1px solid #dbeafe",
              borderRadius: "16px",
              padding: "20px",
              boxShadow: "0 1px 4px rgba(37,99,235,0.06)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
              <div>
                <p style={{ fontWeight: 700, fontSize: "14px", color: "#1e3a5f", margin: "0 0 2px 0", wordBreak: "break-all" }}>
                  {entry.file.name}
                </p>
                <p style={{ fontSize: "12px", color: "#64748b", margin: 0 }}>
                  {entry.file.type || "image"} &middot; {formatBytes(entry.originalSize)}
                </p>
              </div>
              <button
                onClick={() => removeEntry(entry.id)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#94a3b8",
                  fontSize: "18px",
                  lineHeight: 1,
                  padding: "0 0 0 12px",
                  flexShrink: 0,
                }}
                title="Remove"
              >
                ✕
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
              <div>
                <p
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: ACCENT,
                    marginBottom: "8px",
                  }}
                >
                  Original
                </p>
                <div
                  style={{
                    borderRadius: "10px",
                    overflow: "hidden",
                    background: BG,
                    border: "1.5px solid #bfdbfe",
                    aspectRatio: "4/3",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={entry.originalUrl}
                    alt="Original"
                    style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: "block" }}
                  />
                </div>
                <p style={{ fontSize: "12px", color: "#64748b", marginTop: "6px", textAlign: "center" }}>
                  {formatBytes(entry.originalSize)}
                </p>
              </div>

              <div>
                <p
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#16a34a",
                    marginBottom: "8px",
                  }}
                >
                  Compressed
                </p>
                <div
                  style={{
                    borderRadius: "10px",
                    overflow: "hidden",
                    background: BG,
                    border: "1.5px solid #bbf7d0",
                    aspectRatio: "4/3",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {entry.status === "compressing" && (
                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          border: `3px solid ${ACCENT}`,
                          borderTopColor: "transparent",
                          animation: "spin 0.8s linear infinite",
                          margin: "0 auto 8px",
                        }}
                      />
                      <p style={{ fontSize: "11px", color: ACCENT, margin: 0 }}>Compressing…</p>
                    </div>
                  )}
                  {entry.status === "done" && entry.compressedUrl && (
                    <img
                      src={entry.compressedUrl}
                      alt="Compressed"
                      style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: "block" }}
                    />
                  )}
                  {entry.status === "error" && (
                    <p style={{ fontSize: "12px", color: "#ef4444", padding: "12px", textAlign: "center" }}>
                      Compression failed
                    </p>
                  )}
                  {entry.status === "pending" && (
                    <p style={{ fontSize: "12px", color: "#94a3b8", padding: "12px", textAlign: "center" }}>
                      Hit "Compress All"
                    </p>
                  )}
                </div>
                <p style={{ fontSize: "12px", color: "#16a34a", marginTop: "6px", textAlign: "center", fontWeight: 600 }}>
                  {entry.status === "done" && entry.compressedSize !== null
                    ? formatBytes(entry.compressedSize)
                    : "—"}
                </p>
              </div>
            </div>

            {entry.status === "done" && entry.compressedSize !== null && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px",
                  alignItems: "center",
                  padding: "14px 16px",
                  background: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                  borderRadius: "12px",
                  marginBottom: "14px",
                }}
              >
                <div style={{ flex: 1, display: "flex", gap: "20px", flexWrap: "wrap" }}>
                  <div>
                    <span style={{ fontSize: "10px", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>Original</span>
                    <p style={{ margin: "2px 0 0", fontWeight: 700, fontSize: "14px", color: "#1e3a5f" }}>{formatBytes(entry.originalSize)}</p>
                  </div>
                  <div>
                    <span style={{ fontSize: "10px", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>Compressed</span>
                    <p style={{ margin: "2px 0 0", fontWeight: 700, fontSize: "14px", color: "#16a34a" }}>{formatBytes(entry.compressedSize)}</p>
                  </div>
                  <div>
                    <span style={{ fontSize: "10px", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>Saved</span>
                    <p style={{ margin: "2px 0 0", fontWeight: 800, fontSize: "15px", color: "#16a34a" }}>
                      {savings(entry.originalSize, entry.compressedSize)}%
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => downloadOne(entry)}
                  style={{
                    padding: "10px 18px",
                    borderRadius: "10px",
                    background: ACCENT,
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "12px",
                    border: "none",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    letterSpacing: "0.02em",
                  }}
                >
                  Download
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
