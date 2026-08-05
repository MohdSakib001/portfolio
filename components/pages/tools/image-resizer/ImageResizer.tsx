"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Download,
  ImageIcon,
  Link2,
  Link2Off,
  Upload,
  X,
} from "lucide-react";

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

const FORMATS: Format[] = ["jpeg", "png", "webp"];

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

const LABEL_CLASS =
  "block text-label font-semibold uppercase tracking-[0.16em] text-black/40";
const FIELD_CLASS =
  "w-full rounded-2xl border border-black/10 bg-[#fcfbfa] px-4 py-3 text-body text-black outline-none transition duration-150 hover:border-black/25 focus:border-black/70 focus:bg-white placeholder:text-black/25";

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

  /**
   * Refs rather than state in the deps: an unmount-only cleanup closes over the
   * first render's values, so reading state there would revoke nothing.
   */
  const imageUrlRef = useRef<string | null>(null);
  const resultUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (imageUrlRef.current) URL.revokeObjectURL(imageUrlRef.current);
      if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
    };
  }, []);

  function loadFile(file: File) {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      if (imageUrlRef.current) URL.revokeObjectURL(imageUrlRef.current);
      imageUrlRef.current = url;
      aspectRef.current = img.naturalWidth / img.naturalHeight;
      setImage({
        file,
        url,
        width: img.naturalWidth,
        height: img.naturalHeight,
        size: file.size,
      });
      setWidthVal(String(img.naturalWidth));
      setHeightVal(String(img.naturalHeight));
      setScalePercent("100");
      setResult(null);
    };
    img.src = url;
  }

  function handleDrop(event: React.DragEvent) {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) loadFile(file);
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) loadFile(file);
  }

  function handleWidthChange(value: string) {
    setWidthVal(value);
    setScalePercent("");
    if (lockRatio && image && value !== "") {
      const w = parseInt(value, 10);
      if (!isNaN(w) && w > 0) {
        setHeightVal(String(Math.round(w / aspectRef.current)));
      }
    }
  }

  function handleHeightChange(value: string) {
    setHeightVal(value);
    setScalePercent("");
    if (lockRatio && image && value !== "") {
      const h = parseInt(value, 10);
      if (!isNaN(h) && h > 0) {
        setWidthVal(String(Math.round(h * aspectRef.current)));
      }
    }
  }

  function handleScaleChange(value: string) {
    setScalePercent(value);
    if (image && value !== "") {
      const pct = parseFloat(value);
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

  function clearImage() {
    if (imageUrlRef.current) URL.revokeObjectURL(imageUrlRef.current);
    if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
    imageUrlRef.current = null;
    resultUrlRef.current = null;
    setImage(null);
    setResult(null);
    setScalePercent("");
    setWidthVal("");
    setHeightVal("");
    if (fileInputRef.current) fileInputRef.current.value = "";
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
      if (!ctx) {
        setResizing(false);
        return;
      }
      ctx.drawImage(img, 0, 0, tw, th);
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setResizing(false);
            return;
          }
          if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
          const url = URL.createObjectURL(blob);
          resultUrlRef.current = url;
          setResult({ url, width: tw, height: th, size: blob.size, blob });
          setResizing(false);
        },
        `image/${format}`,
        format === "jpeg" ? quality / 100 : undefined,
      );
    };
    img.src = image.url;
  }, [image, widthVal, heightVal, format, quality]);

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
    result && image ? Math.round((1 - result.size / image.size) * 100) : null;
  const canResize = Boolean(widthVal && heightVal) && !resizing;

  return (
    <div className="space-y-3">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {!image ? (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`w-full rounded-4xl border-2 border-dashed px-8 py-20 text-center transition duration-150 ${
            dragging
              ? "border-black/40 bg-[#F5F3FF]"
              : "border-black/12 bg-white hover:border-black/30"
          }`}
        >
          <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-black/[0.04] text-black/40">
            <Upload size={22} />
          </span>
          <span className="block text-body font-medium text-black">
            Drop an image here
          </span>
          <span className="mt-2 block text-caption text-black/40">
            or click to browse — JPEG, PNG, WebP, GIF, BMP
          </span>
        </button>
      ) : (
        <>
          {/* Source file */}
          <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-[0_0_0_1px_rgba(0,0,0,0.06)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.url}
              alt="Original preview"
              className="h-16 w-16 shrink-0 rounded-xl border border-black/8 object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-body font-medium text-black">
                {image.file.name}
              </p>
              <p className="mt-1 font-mono text-caption text-black/40 tabular-nums">
                {image.width} × {image.height} px · {formatBytes(image.size)}
              </p>
            </div>
            <button
              type="button"
              onClick={clearImage}
              title="Remove image"
              className="shrink-0 rounded-full bg-black/[0.04] p-2 text-black/40 transition duration-150 hover:bg-black/[0.08] hover:text-black"
            >
              <X size={14} />
            </button>
          </div>

          {/* Presets */}
          <div className="rounded-4xl bg-white p-6 shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_4px_24px_rgba(0,0,0,0.04)] sm:p-8">
            <p className={LABEL_CLASS}>Social media presets</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => applyPreset(preset.w, preset.h)}
                  className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#fcfbfa] px-4 py-2 text-caption transition duration-150 hover:border-black/30 hover:bg-white"
                >
                  <span className="font-mono font-semibold text-black tabular-nums">
                    {preset.w}×{preset.h}
                  </span>
                  <span className="text-black/45">{preset.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Dimensions */}
          <div className="rounded-4xl bg-white p-6 shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_4px_24px_rgba(0,0,0,0.04)] sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={LABEL_CLASS} htmlFor="resize-width">
                  Width (px)
                </label>
                <input
                  id="resize-width"
                  type="number"
                  min="1"
                  value={widthVal}
                  onChange={(event) => handleWidthChange(event.target.value)}
                  className={`mt-3 ${FIELD_CLASS}`}
                />
              </div>
              <div>
                <label className={LABEL_CLASS} htmlFor="resize-height">
                  Height (px)
                </label>
                <input
                  id="resize-height"
                  type="number"
                  min="1"
                  value={heightVal}
                  onChange={(event) => handleHeightChange(event.target.value)}
                  className={`mt-3 ${FIELD_CLASS}`}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setLockRatio(!lockRatio)}
              aria-pressed={lockRatio}
              className={`mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-label font-semibold uppercase tracking-[0.12em] transition duration-150 ${
                lockRatio
                  ? "bg-black text-white"
                  : "bg-black/[0.04] text-black/45 hover:bg-black/[0.08] hover:text-black"
              }`}
            >
              {lockRatio ? <Link2 size={13} /> : <Link2Off size={13} />}
              {lockRatio ? "Ratio locked" : "Ratio unlocked"}
            </button>

            <div className="mt-6">
              <label className={LABEL_CLASS} htmlFor="resize-scale">
                Scale by %
              </label>
              <input
                id="resize-scale"
                type="number"
                min="1"
                max="1000"
                placeholder="e.g. 50"
                value={scalePercent}
                onChange={(event) => handleScaleChange(event.target.value)}
                className={`mt-3 ${FIELD_CLASS}`}
              />
            </div>
          </div>

          {/* Output */}
          <div className="rounded-4xl bg-white p-6 shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_4px_24px_rgba(0,0,0,0.04)] sm:p-8">
            <p className={LABEL_CLASS}>Output format</p>
            <div className="mt-4 flex gap-2">
              {FORMATS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFormat(f)}
                  aria-pressed={format === f}
                  className={`flex-1 rounded-2xl py-3 text-label font-semibold uppercase tracking-[0.12em] transition duration-150 ${
                    format === f
                      ? "bg-black text-white"
                      : "bg-black/[0.04] text-black/45 hover:bg-black/[0.08] hover:text-black"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {format === "jpeg" && (
              <div className="mt-6">
                <div className="flex items-baseline justify-between gap-4">
                  <label className={LABEL_CLASS} htmlFor="resize-quality">
                    JPEG quality
                  </label>
                  <span className="font-mono text-body font-semibold text-black tabular-nums">
                    {quality}
                  </span>
                </div>
                <input
                  id="resize-quality"
                  type="range"
                  min="1"
                  max="100"
                  value={quality}
                  onChange={(event) => setQuality(Number(event.target.value))}
                  className="mt-3 w-full cursor-pointer accent-black"
                />
                <div className="mt-2 flex justify-between text-caption text-black/30">
                  <span>1 — smallest</span>
                  <span>100 — lossless</span>
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleResize}
            disabled={!canResize}
            className="w-full rounded-full bg-black py-4 text-label font-semibold uppercase tracking-[0.15em] text-white transition duration-200 hover:bg-neutral-800 disabled:pointer-events-none disabled:opacity-30"
          >
            {resizing ? "Resizing…" : "Resize image"}
          </button>

          {result && (
            <div className="relative overflow-hidden rounded-4xl bg-[#E6E0F8] p-8 md:p-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-45 mix-blend-overlay"
                style={{
                  backgroundImage: `url("/assets/paper-texture.avif")`,
                  backgroundSize: "cover",
                }}
              />

              <div className="relative flex flex-wrap items-center justify-between gap-4">
                <p className="text-label font-semibold uppercase tracking-[0.25em] text-black/40">
                  Result
                </p>
                {sizePct !== null && (
                  <p className="rounded-full bg-white/70 px-4 py-2 font-mono text-caption text-black/60 tabular-nums">
                    {sizePct > 0
                      ? `${sizePct}% smaller`
                      : sizePct === 0
                        ? "Same file size"
                        : `${Math.abs(sizePct)}% larger`}
                  </p>
                )}
              </div>

              <div className="relative mt-6 grid grid-cols-2 gap-4">
                {[
                  { title: "Original", src: image.url, w: image.width, h: image.height, size: image.size },
                  { title: "Resized", src: result.url, w: result.width, h: result.height, size: result.size },
                ].map((pane) => (
                  <div key={pane.title} className="text-center">
                    <p className="mb-3 text-label font-semibold uppercase tracking-[0.16em] text-black/40">
                      {pane.title}
                    </p>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={pane.src}
                      alt={`${pane.title} image`}
                      className="aspect-square w-full rounded-2xl bg-white/60 object-contain p-2"
                    />
                    <p className="mt-3 font-mono text-caption text-black/60 tabular-nums">
                      {pane.w} × {pane.h}
                    </p>
                    <p className="font-mono text-caption text-black/40 tabular-nums">
                      {formatBytes(pane.size)}
                    </p>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleDownload}
                className="relative mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-black py-4 text-label font-semibold uppercase tracking-[0.15em] text-white transition duration-200 hover:bg-neutral-800"
              >
                <Download size={14} />
                Download resized image
              </button>
            </div>
          )}
        </>
      )}

      <p className="flex items-center gap-2 px-1 text-caption text-black/35">
        <ImageIcon size={13} aria-hidden />
        Resizing happens on a canvas in this tab — the file is never uploaded.
      </p>
    </div>
  );
}
