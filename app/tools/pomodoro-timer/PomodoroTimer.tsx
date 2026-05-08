"use client";
import { useState, useEffect, useRef, useCallback } from "react";

type Phase = "work" | "short" | "long";

const PHASES: Record<Phase, { label: string; defaultMin: number; color: string; bg: string }> = {
  work:  { label: "Focus",       defaultMin: 25, color: "#f97316", bg: "rgba(249,115,22,0.12)" },
  short: { label: "Short Break", defaultMin: 5,  color: "#22c55e", bg: "rgba(34,197,94,0.12)"  },
  long:  { label: "Long Break",  defaultMin: 15, color: "#3b82f6", bg: "rgba(59,130,246,0.12)" },
};

export default function PomodoroTimer() {
  const [config, setConfig] = useState({ work: 25, short: 5, long: 15 });
  const [phase,   setPhase]   = useState<Phase>("work");
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [session, setSession] = useState(0);
  const [totalFocus, setTotalFocus] = useState(0);
  const [showConfig, setShowConfig] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioRef = useRef<AudioContext | null>(null);

  const playChime = useCallback(() => {
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      audioRef.current = ctx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.5);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.8);
    } catch {  /* browser may block without user gesture */ }
  }, []);

  const switchPhase = useCallback((next: Phase) => {
    setPhase(next);
    setSeconds(config[next] * 60);
    setRunning(false);
  }, [config]);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds(s => {
          if (s <= 1) {
            clearInterval(intervalRef.current!);
            playChime();
            if (phase === "work") {
              setSession(n => {
                const next = n + 1;
                setTotalFocus(f => f + config.work);
                const nextPhase: Phase = next % 4 === 0 ? "long" : "short";
                setTimeout(() => switchPhase(nextPhase), 100);
                return next;
              });
            } else {
              setTimeout(() => switchPhase("work"), 100);
            }
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current!);
    }
    return () => clearInterval(intervalRef.current!);
  }, [running, phase, config, playChime, switchPhase]);

  const reset = () => { setRunning(false); setSeconds(config[phase] * 60); };

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const total = config[phase] * 60;
  const progress = total > 0 ? ((total - seconds) / total) * 100 : 0;
  const circumference = 2 * Math.PI * 80;
  const dashOffset = circumference * (1 - progress / 100);

  const p = PHASES[phase];

  return (
    <div>
      {/* Timer display */}
      <div
        className="rounded-[28px] p-8 flex flex-col items-center"
        style={{ background: "#150e05", boxShadow: `0 0 0 1px ${p.color}20, 0 16px 64px rgba(0,0,0,0.6)` }}
      >
        {/* Phase tabs */}
        <div className="flex gap-2 mb-8">
          {(Object.keys(PHASES) as Phase[]).map(ph => (
            <button key={ph} onClick={() => !running && switchPhase(ph)}
              className="px-4 py-2 rounded-full text-[11px] font-semibold transition-all"
              style={{
                background: phase === ph ? PHASES[ph].bg : "rgba(255,255,255,0.04)",
                color: phase === ph ? PHASES[ph].color : "rgba(255,255,255,0.3)",
                border: `1px solid ${phase === ph ? PHASES[ph].color + "30" : "rgba(255,255,255,0.06)"}`,
                cursor: running ? "not-allowed" : "pointer",
                opacity: running ? 0.6 : 1,
              }}>
              {PHASES[ph].label}
            </button>
          ))}
        </div>

        {/* Circular progress */}
        <div className="relative" style={{ width: 200, height: 200 }}>
          <svg width="200" height="200" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
            <circle
              cx="100" cy="100" r="80"
              fill="none"
              stroke={p.color}
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 1s linear, stroke 0.5s ease" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-bold tabular-nums leading-none"
              style={{ fontSize: "52px", color: "#ffffff", fontVariantNumeric: "tabular-nums" }}>
              {mm}:{ss}
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] mt-2" style={{ color: p.color }}>
              {p.label}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 mt-8">
          <button onClick={reset}
            className="w-12 h-12 rounded-full flex items-center justify-center text-[18px] transition-all"
            style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)" }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}>
            ↺
          </button>
          <button onClick={() => setRunning(r => !r)}
            className="w-20 h-20 rounded-full flex items-center justify-center text-[22px] font-bold transition-all"
            style={{ background: p.color, color: "#ffffff", boxShadow: `0 0 30px ${p.color}50` }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
            {running ? "⏸" : "▶"}
          </button>
          <button onClick={() => setShowConfig(s => !s)}
            className="w-12 h-12 rounded-full flex items-center justify-center text-[16px] transition-all"
            style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)" }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}>
            ⚙
          </button>
        </div>

        {/* Stats */}
        <div className="flex gap-6 mt-8 pt-6 w-full justify-center" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="text-center">
            <span className="font-bold tabular-nums" style={{ fontSize: "22px", color: "#f97316" }}>{session}</span>
            <p className="text-[9px] uppercase tracking-[0.12em] mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>Sessions</p>
          </div>
          <div className="text-center">
            <span className="font-bold tabular-nums" style={{ fontSize: "22px", color: "#f97316" }}>{totalFocus}</span>
            <p className="text-[9px] uppercase tracking-[0.12em] mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>Focus mins</p>
          </div>
        </div>
      </div>

      {/* Config panel */}
      {showConfig && (
        <div className="mt-3 rounded-[20px] p-6" style={{ background: "#150e05", boxShadow: "0 0 0 1px rgba(249,115,22,0.1)" }}>
          <p className="text-[10px] uppercase tracking-[0.16em] font-semibold mb-4" style={{ color: "rgba(249,115,22,0.5)" }}>
            Timer Configuration (minutes)
          </p>
          <div className="grid grid-cols-3 gap-3">
            {([["work", "Focus"], ["short", "Short Break"], ["long", "Long Break"]] as const).map(([k, label]) => (
              <div key={k}>
                <label className="block mb-1.5 text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>{label}</label>
                <input type="number" min={1} max={120} value={config[k]}
                  onChange={e => {
                    const val = Math.max(1, Math.min(120, parseInt(e.target.value) || 1));
                    setConfig(c => ({ ...c, [k]: val }));
                    if (phase === k && !running) setSeconds(val * 60);
                  }}
                  className="w-full rounded-[10px] px-3 py-2.5 text-[14px] font-bold tabular-nums outline-none"
                  style={{ background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.15)", color: "#f97316", fontFamily: "inherit" }} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
