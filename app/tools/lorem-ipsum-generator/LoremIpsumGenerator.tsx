"use client";
import { useState, useCallback } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";

const LOREM_WORDS = ["lorem","ipsum","dolor","sit","amet","consectetur","adipiscing","elit","sed","do","eiusmod","tempor","incididunt","ut","labore","et","dolore","magna","aliqua","enim","ad","minim","veniam","quis","nostrud","exercitation","ullamco","laboris","nisi","aliquip","ex","ea","commodo","consequat","duis","aute","irure","in","reprehenderit","voluptate","velit","esse","cillum","fugiat","nulla","pariatur","excepteur","sint","occaecat","cupidatat","non","proident","sunt","culpa","qui","officia","deserunt","mollit","anim","id","est","laborum","neque","porro","quisquam","est","qui","dolorem","quia","dolor","sit","amet","consectetur","adipisci","velit","sed","quia","non","numquam","eius","modi","tempora","incidunt","labore","dolore","magnam","aliquam","quaerat","voluptatem"];

function getRand(arr: string[]): string { return arr[Math.floor(Math.random() * arr.length)]; }

function genSentence(): string {
  const len = 8 + Math.floor(Math.random() * 10);
  const words = Array.from({ length: len }, () => getRand(LOREM_WORDS));
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}

function genParagraph(): string {
  const sentCount = 4 + Math.floor(Math.random() * 4);
  return Array.from({ length: sentCount }, genSentence).join(" ");
}

type Unit = "words" | "sentences" | "paragraphs";

export default function LoremIpsumGenerator() {
  const [unit,  setUnit]  = useState<Unit>("paragraphs");
  const [count, setCount] = useState(3);
  const [classic, setClassic] = useState(true);
  const [output, setOutput] = useState<string>(() => {
    const paras = Array.from({ length: 3 }, (_, i) => i === 0 && true ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." : genParagraph());
    return paras.join("\n\n");
  });
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    let text = "";
    if (unit === "words") {
      const arr = classic && count > 0
        ? ["Lorem", "ipsum", "dolor", "sit", "amet", ...Array.from({ length: Math.max(0, count - 5) }, () => getRand(LOREM_WORDS))]
        : Array.from({ length: count }, () => getRand(LOREM_WORDS));
      text = arr.slice(0, count).join(" ");
    } else if (unit === "sentences") {
      const sents = Array.from({ length: count }, (_, i) => {
        if (i === 0 && classic) return "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
        return genSentence();
      });
      text = sents.join(" ");
    } else {
      const paras = Array.from({ length: count }, (_, i) => {
        if (i === 0 && classic) return "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
        return genParagraph();
      });
      text = paras.join("\n\n");
    }
    setOutput(text);
    setCopied(false);
  }, [unit, count, classic]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      {/* Controls */}
      <div className="rounded-[20px] p-6 mb-3"
        style={{ background: "#2d2926", boxShadow: "0 0 0 1px rgba(212,168,83,0.15), 0 8px 32px rgba(0,0,0,0.4)" }}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          <div>
            <label className="block mb-1.5 text-[10px] uppercase tracking-[0.14em] font-semibold" style={{ color: "rgba(212,168,83,0.6)" }}>
              Generate
            </label>
            <select value={unit} onChange={e => setUnit(e.target.value as Unit)}
              className="w-full rounded-[12px] px-4 py-3 text-[13px] font-semibold outline-none"
              style={{ background: "rgba(212,168,83,0.08)", border: "1px solid rgba(212,168,83,0.2)", color: "#d4a853", fontFamily: "inherit" }}>
              <option value="words">Words</option>
              <option value="sentences">Sentences</option>
              <option value="paragraphs">Paragraphs</option>
            </select>
          </div>
          <div>
            <label className="block mb-1.5 text-[10px] uppercase tracking-[0.14em] font-semibold" style={{ color: "rgba(212,168,83,0.6)" }}>
              Count
            </label>
            <input type="number" value={count} onChange={e => setCount(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
              min={1} max={50}
              className="w-full rounded-[12px] px-4 py-3 text-[16px] font-bold tabular-nums outline-none"
              style={{ background: "rgba(212,168,83,0.08)", border: "1px solid rgba(212,168,83,0.2)", color: "#d4a853", fontFamily: "inherit" }} />
          </div>
          <div className="flex items-end">
            <button
              onClick={() => setClassic(v => !v)}
              className="w-full rounded-[12px] px-4 py-3 text-[12px] font-semibold transition-all"
              style={{
                background: classic ? "rgba(212,168,83,0.15)" : "rgba(212,168,83,0.05)",
                color: classic ? "#d4a853" : "rgba(212,168,83,0.4)",
                border: `1px solid ${classic ? "rgba(212,168,83,0.3)" : "rgba(212,168,83,0.1)"}`,
              }}>
              {classic ? "✓ Classic Lorem" : "Randomised"}
            </button>
          </div>
        </div>

        <button onClick={generate}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-[14px] font-semibold text-[13px] transition-all"
          style={{ background: "#d4a853", color: "#1a1613" }}
          onMouseEnter={e => (e.currentTarget.style.background = "#c9983e")}
          onMouseLeave={e => (e.currentTarget.style.background = "#d4a853")}>
          <RefreshCw size={14} />
          Generate Lorem Ipsum
        </button>
      </div>

      {/* Output */}
      <div className="rounded-[20px] overflow-hidden"
        style={{ background: "#faf7f0", boxShadow: "0 0 0 1px rgba(212,168,83,0.15)" }}>
        <div className="flex items-center justify-between px-6 py-3.5"
          style={{ borderBottom: "1px solid rgba(212,168,83,0.12)", background: "#f5f0e3" }}>
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.14em] font-semibold" style={{ color: "rgba(45,41,38,0.5)" }}>
              Output
            </span>
            <span className="text-[10px] font-mono" style={{ color: "rgba(45,41,38,0.35)" }}>
              {output.split(/\s+/).filter(Boolean).length} words · {output.length} chars
            </span>
          </div>
          <button onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all"
            style={{ color: copied ? "#059669" : "rgba(45,41,38,0.55)", background: copied ? "rgba(5,150,105,0.1)" : "rgba(45,41,38,0.06)" }}>
            {copied ? <Check size={11} /> : <Copy size={11} />}
            {copied ? "Copied!" : "Copy all"}
          </button>
        </div>

        <div className="p-7">
          {output.split("\n\n").map((para, i) => (
            <p key={i} className="mb-5 last:mb-0"
              style={{ fontSize: "14.5px", lineHeight: "1.9", color: "rgba(45,41,38,0.75)", fontFamily: "'Georgia', 'Times New Roman', serif", fontStyle: "italic" }}>
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
