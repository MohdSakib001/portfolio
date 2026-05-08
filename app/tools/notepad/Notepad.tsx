"use client";
import { useState, useEffect, useRef } from "react";
import { Download, Trash2 } from "lucide-react";

const STORAGE_KEY = "sakib-notepad-v1";

export default function Notepad() {
  const [text,     setText]     = useState("");
  const [saved,    setSaved]    = useState(true);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) { setText(stored); setLastSaved("Restored from last session"); }
  }, []);

  const handleChange = (val: string) => {
    setText(val);
    setSaved(false);
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, val);
      setSaved(true);
      setLastSaved(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    }, 1200);
  };

  const handleClear = () => {
    if (!text || !confirm("Clear the notepad? This cannot be undone.")) return;
    setText("");
    localStorage.removeItem(STORAGE_KEY);
    setSaved(true);
    setLastSaved(null);
  };

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
  const lines = text.split("\n").length;

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: saved ? "#22c55e" : "#f59e0b" }} />
          <span className="text-[11px]" style={{ color: "rgba(28,26,20,0.45)", fontFamily: "monospace" }}>
            {saved ? (lastSaved ? `Saved ${lastSaved}` : "Auto-save on") : "Saving…"}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button onClick={() => handleDownload("txt")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-[11px] font-medium transition-all"
            style={{ color: "rgba(28,26,20,0.5)", background: "rgba(28,26,20,0.05)" }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(28,26,20,0.1)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(28,26,20,0.05)")}>
            <Download size={11} /> .txt
          </button>
          <button onClick={() => handleDownload("md")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-[11px] font-medium transition-all"
            style={{ color: "rgba(28,26,20,0.5)", background: "rgba(28,26,20,0.05)" }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(28,26,20,0.1)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(28,26,20,0.05)")}>
            <Download size={11} /> .md
          </button>
          <button onClick={handleClear} disabled={!text}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-[11px] font-medium transition-all disabled:opacity-30"
            style={{ color: "rgba(239,68,68,0.6)", background: "rgba(239,68,68,0.04)" }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(239,68,68,0.08)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(239,68,68,0.04)")}>
            <Trash2 size={11} /> Clear
          </button>
        </div>
      </div>

      {/* Writing area */}
      <div className="rounded-[20px] overflow-hidden"
        style={{ background: "#fffef5", boxShadow: "0 0 0 1px rgba(28,26,20,0.08), 0 8px 40px rgba(28,26,20,0.06)", backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, rgba(28,26,20,0.04) 31px, rgba(28,26,20,0.04) 32px)" }}>
        <textarea
          value={text}
          onChange={e => handleChange(e.target.value)}
          placeholder="Start writing. Your notes are saved automatically…"
          autoFocus
          spellCheck
          className="w-full resize-none outline-none bg-transparent"
          style={{
            minHeight: "520px",
            padding: "32px 40px",
            fontSize: "15.5px",
            lineHeight: "32px",
            color: "#1c1a14",
            caretColor: "#1c1a14",
            fontFamily: "'Georgia', 'Cambria', serif",
          }}
        />

        {/* Status bar */}
        <div className="flex items-center gap-4 px-7 py-3" style={{ borderTop: "1px solid rgba(28,26,20,0.06)", background: "rgba(28,26,20,0.02)" }}>
          <span className="text-[11px] tabular-nums" style={{ color: "rgba(28,26,20,0.35)", fontFamily: "monospace" }}>
            {words.toLocaleString()} words
          </span>
          <span style={{ color: "rgba(28,26,20,0.2)" }}>·</span>
          <span className="text-[11px] tabular-nums" style={{ color: "rgba(28,26,20,0.35)", fontFamily: "monospace" }}>
            {text.length.toLocaleString()} chars
          </span>
          <span style={{ color: "rgba(28,26,20,0.2)" }}>·</span>
          <span className="text-[11px] tabular-nums" style={{ color: "rgba(28,26,20,0.35)", fontFamily: "monospace" }}>
            {lines.toLocaleString()} line{lines !== 1 ? "s" : ""}
          </span>
        </div>
      </div>
    </div>
  );
}
