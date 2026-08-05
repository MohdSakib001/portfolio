"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Download, Trash2, X } from "lucide-react";

const STORAGE_KEY = "sakib-notepad-v1";
const SAVE_DELAY = 1200;

const STAT_CARDS = [
  { key: "words", label: "Words" },
  { key: "chars", label: "Characters" },
  { key: "lines", label: "Lines" },
] as const;

export default function Notepad() {
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(true);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [confirmingClear, setConfirmingClear] = useState(false);

  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  /** Mirrors `text` so the unmount flush below can read it without re-running. */
  const pending = useRef<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setText(stored);
      setLastSaved("Restored from last session");
    }
  }, []);

  /**
   * A debounced save loses the last keystrokes if the visitor navigates away
   * mid-timer, so flush whatever is still pending on the way out.
   */
  useEffect(() => {
    return () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
      if (pending.current !== null) {
        localStorage.setItem(STORAGE_KEY, pending.current);
      }
    };
  }, []);

  const handleChange = (value: string) => {
    setText(value);
    setSaved(false);
    setConfirmingClear(false);
    pending.current = value;

    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, value);
      pending.current = null;
      setSaved(true);
      setLastSaved(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    }, SAVE_DELAY);
  };

  const handleClear = useCallback(() => {
    if (!text) return;
    if (!confirmingClear) {
      setConfirmingClear(true);
      return;
    }
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    pending.current = null;
    setText("");
    localStorage.removeItem(STORAGE_KEY);
    setSaved(true);
    setLastSaved(null);
    setConfirmingClear(false);
  }, [text, confirmingClear]);

  /** The armed Clear button should disarm itself rather than stay hot. */
  useEffect(() => {
    if (!confirmingClear) return;
    const timer = setTimeout(() => setConfirmingClear(false), 4000);
    return () => clearTimeout(timer);
  }, [confirmingClear]);

  const handleDownload = (ext: "txt" | "md") => {
    if (!text) return;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `note.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const stats = { words, chars: text.length, lines: text.split("\n").length };

  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-4xl bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_4px_24px_rgba(0,0,0,0.04)]">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 border-b border-black/8 bg-[#fcfbfa] px-5 py-4">
          <div className="mr-auto flex items-center gap-2.5">
            <span
              aria-hidden
              className={`h-1.5 w-1.5 rounded-full ${
                saved ? "bg-emerald-500" : "bg-amber-500"
              }`}
            />
            <span className="font-mono text-caption text-black/40">
              {saved
                ? lastSaved
                  ? `Saved ${lastSaved}`
                  : "Auto-save on"
                : "Saving…"}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {(["txt", "md"] as const).map((ext) => (
              <button
                key={ext}
                type="button"
                onClick={() => handleDownload(ext)}
                disabled={!text}
                title={`Download as .${ext}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-black/[0.04] px-3.5 py-2 text-label font-semibold uppercase tracking-[0.12em] text-black/45 transition duration-150 hover:bg-black/[0.08] hover:text-black disabled:pointer-events-none disabled:opacity-30"
              >
                <Download size={11} />.{ext}
              </button>
            ))}
            <button
              type="button"
              onClick={handleClear}
              disabled={!text}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-label font-semibold uppercase tracking-[0.12em] transition duration-150 disabled:pointer-events-none disabled:opacity-30 ${
                confirmingClear
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-black/[0.04] text-black/45 hover:bg-black/[0.08] hover:text-black"
              }`}
            >
              {confirmingClear ? <Check size={11} /> : <Trash2 size={11} />}
              {confirmingClear ? "Confirm" : "Clear"}
            </button>
            {confirmingClear && (
              <button
                type="button"
                onClick={() => setConfirmingClear(false)}
                title="Cancel"
                className="inline-flex items-center rounded-full bg-black/[0.04] p-2 text-black/45 transition duration-150 hover:bg-black/[0.08] hover:text-black"
              >
                <X size={11} />
              </button>
            )}
          </div>
        </div>

        {/* Writing area — ruled paper, sized to the 32px line height below */}
        <textarea
          value={text}
          onChange={(event) => handleChange(event.target.value)}
          placeholder="Start writing. Your notes are saved automatically…"
          spellCheck
          aria-label="Notepad"
          className="min-h-[520px] w-full resize-none bg-[#fffef8] px-7 py-8 text-[15.5px] leading-8 text-[#1c1b18] outline-none placeholder:text-black/25 sm:px-10"
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            backgroundImage:
              "repeating-linear-gradient(transparent, transparent 31px, rgba(28,27,24,0.06) 31px, rgba(28,27,24,0.06) 32px)",
            backgroundAttachment: "local",
          }}
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {STAT_CARDS.map(({ key, label }) => (
          <div
            key={key}
            className="rounded-2xl bg-white p-6 shadow-[0_0_0_1px_rgba(0,0,0,0.06)]"
          >
            <p className="font-mono text-3xl font-semibold leading-none tracking-tight text-black tabular-nums">
              {stats[key].toLocaleString()}
            </p>
            <p className="mt-2 text-label font-semibold uppercase tracking-[0.16em] text-black/40">
              {label}
            </p>
          </div>
        ))}
      </div>

      <p className="px-1 text-caption text-black/35">
        Notes are stored in this browser only — never uploaded, and gone if you
        clear site data.
      </p>
    </div>
  );
}
