"use client";
import { useState, useCallback } from "react";
import { Copy, Check, RefreshCw, Lock } from "lucide-react";

const LOWER  = "abcdefghijklmnopqrstuvwxyz";
const UPPER  = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DIGITS = "0123456789";
const SYMS   = "!@#$%^&*()-_=+[]{}|;:,.<>?";

function generatePassword(len: number, upper: boolean, lower: boolean, digits: boolean, symbols: boolean): string {
  let chars = "";
  const required: string[] = [];
  if (upper)   { chars += UPPER;  required.push(UPPER[Math.floor(Math.random() * UPPER.length)]); }
  if (lower)   { chars += LOWER;  required.push(LOWER[Math.floor(Math.random() * LOWER.length)]); }
  if (digits)  { chars += DIGITS; required.push(DIGITS[Math.floor(Math.random() * DIGITS.length)]); }
  if (symbols) { chars += SYMS;   required.push(SYMS[Math.floor(Math.random() * SYMS.length)]); }
  if (!chars) return "";

  const arr = new Uint32Array(len);
  crypto.getRandomValues(arr);
  const pwArr = Array.from(arr, n => chars[n % chars.length]);

  for (let i = 0; i < required.length && i < len; i++) {
    const pos = Math.floor(Math.random() * len);
    pwArr[pos] = required[i];
  }
  return pwArr.join("");
}

function getStrength(pw: string, upper: boolean, lower: boolean, digits: boolean, symbols: boolean): { score: number; label: string; color: string } {
  if (!pw) return { score: 0, label: "None", color: "#333" };
  let score = 0;
  if (pw.length >= 8)  score++;
  if (pw.length >= 12) score++;
  if (pw.length >= 16) score++;
  if (upper && /[A-Z]/.test(pw))  score++;
  if (lower && /[a-z]/.test(pw))  score++;
  if (digits && /[0-9]/.test(pw)) score++;
  if (symbols && /[!@#$%^&*]/.test(pw)) score++;

  if (score <= 2) return { score: Math.round((score / 7) * 100), label: "Weak", color: "#ef4444" };
  if (score <= 4) return { score: Math.round((score / 7) * 100), label: "Fair", color: "#f59e0b" };
  if (score <= 5) return { score: Math.round((score / 7) * 100), label: "Good", color: "#22c55e" };
  return { score: Math.round((score / 7) * 100), label: "Strong", color: "#00ff41" };
}

export default function PasswordGenerator() {
  const [length,  setLength]  = useState(16);
  const [upper,   setUpper]   = useState(true);
  const [lower,   setLower]   = useState(true);
  const [digits,  setDigits]  = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState(() => generatePassword(16, true, true, true, true));
  const [copied,   setCopied]   = useState(false);

  const generate = useCallback(() => {
    const pw = generatePassword(length, upper, lower, digits, symbols);
    setPassword(pw);
    setCopied(false);
  }, [length, upper, lower, digits, symbols]);

  const handleCopy = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const strength = getStrength(password, upper, lower, digits, symbols);

  const Toggle = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className="flex items-center justify-between w-full px-4 py-3 rounded-[12px] transition-all"
      style={{ background: checked ? "rgba(0,255,65,0.08)" : "rgba(255,255,255,0.03)", border: `1px solid ${checked ? "rgba(0,255,65,0.2)" : "rgba(255,255,255,0.06)"}` }}
    >
      <span className="text-[12px] font-mono" style={{ color: checked ? "#00ff41" : "rgba(255,255,255,0.3)", letterSpacing: "0.04em" }}>{label}</span>
      <div className="w-8 h-4 rounded-full relative transition-all" style={{ background: checked ? "#00ff41" : "rgba(255,255,255,0.1)" }}>
        <div className="absolute top-0.5 w-3 h-3 rounded-full transition-all" style={{ left: checked ? "17px" : "2px", background: checked ? "#000" : "rgba(255,255,255,0.4)" }} />
      </div>
    </button>
  );

  return (
    <div>
      {/* Password display */}
      <div
        className="rounded-[20px] p-6 mb-3"
        style={{ background: "#0a0a0a", boxShadow: "0 0 0 1px rgba(0,255,65,0.15), 0 0 40px rgba(0,255,65,0.04)", fontFamily: "monospace" }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Lock size={12} color="#00ff41" />
          <span className="text-[9px] uppercase tracking-[0.2em] font-semibold" style={{ color: "rgba(0,255,65,0.4)" }}>
            Generated Password
          </span>
        </div>

        <div
          className="rounded-[12px] px-5 py-4 mb-4 break-all leading-relaxed min-h-[60px] flex items-center"
          style={{ background: "rgba(0,255,65,0.04)", border: "1px solid rgba(0,255,65,0.1)", fontSize: "clamp(14px,2.5vw,16px)", color: password ? "#00ff41" : "rgba(0,255,65,0.2)", wordBreak: "break-all", letterSpacing: "0.05em" }}
        >
          {password || "No character set selected"}
        </div>

        {/* Strength bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.1em]" style={{ color: "rgba(0,255,65,0.4)" }}>Strength</span>
            <span className="text-[10px] font-mono font-bold" style={{ color: strength.color }}>{strength.label}</span>
          </div>
          <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${strength.score}%`, background: `linear-gradient(to right, #ef4444, ${strength.color})` }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={generate}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-[10px] text-[12px] font-mono font-semibold transition-all"
            style={{ background: "rgba(0,255,65,0.1)", color: "#00ff41", border: "1px solid rgba(0,255,65,0.15)" }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,255,65,0.18)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(0,255,65,0.1)")}
          >
            <RefreshCw size={12} />
            Generate
          </button>
          <button
            onClick={handleCopy}
            disabled={!password}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-[10px] text-[12px] font-mono font-semibold transition-all disabled:opacity-30"
            style={{ background: copied ? "rgba(0,255,65,0.2)" : "rgba(255,255,255,0.05)", color: copied ? "#00ff41" : "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {/* Settings */}
      <div className="rounded-[20px] p-6" style={{ background: "#0a0a0a", boxShadow: "0 0 0 1px rgba(0,255,65,0.08)" }}>
        <p className="text-[9px] uppercase tracking-[0.2em] font-semibold mb-4" style={{ color: "rgba(0,255,65,0.4)", fontFamily: "monospace" }}>
          Configuration
        </p>

        {/* Length */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-mono" style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "0.04em" }}>Length</span>
            <span className="text-[14px] font-mono font-bold tabular-nums" style={{ color: "#00ff41" }}>{length}</span>
          </div>
          <input
            type="range"
            min={8}
            max={128}
            value={length}
            onChange={e => { setLength(Number(e.target.value)); generate(); }}
            className="w-full accent-[#00ff41] cursor-pointer"
            style={{ accentColor: "#00ff41" }}
          />
          <div className="flex justify-between mt-1" style={{ fontSize: "9px", color: "rgba(0,255,65,0.25)", fontFamily: "monospace" }}>
            <span>8</span><span>32</span><span>64</span><span>128</span>
          </div>
        </div>

        {/* Toggles */}
        <div className="space-y-2">
          <Toggle label="Uppercase  A–Z" checked={upper}   onChange={() => { setUpper(v => !v);   setTimeout(generate, 0); }} />
          <Toggle label="Lowercase  a–z" checked={lower}   onChange={() => { setLower(v => !v);   setTimeout(generate, 0); }} />
          <Toggle label="Numbers   0–9"  checked={digits}  onChange={() => { setDigits(v => !v);  setTimeout(generate, 0); }} />
          <Toggle label="Symbols  !@#$%" checked={symbols} onChange={() => { setSymbols(v => !v); setTimeout(generate, 0); }} />
        </div>
      </div>
    </div>
  );
}
