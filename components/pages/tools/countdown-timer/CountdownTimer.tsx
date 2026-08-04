"use client";
import { useState, useEffect, useRef } from "react";

interface TimeLeft { days: number; hours: number; minutes: number; seconds: number; total: number }

function calcTimeLeft(target: Date): TimeLeft {
  const total = Math.max(0, target.getTime() - Date.now());
  const days    = Math.floor(total / 86400000);
  const hours   = Math.floor((total % 86400000) / 3600000);
  const minutes = Math.floor((total % 3600000)  / 60000);
  const seconds = Math.floor((total % 60000)    / 1000);
  return { days, hours, minutes, seconds, total };
}

function Digit({ value, label }: { value: number; label: string }) {
  const str = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative rounded-[16px] overflow-hidden"
        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", width: "clamp(64px,14vw,96px)", height: "clamp(72px,16vw,108px)" }}>
        <div className="w-full h-full flex items-center justify-center">
          <span className="font-bold tabular-nums" style={{ fontSize: "clamp(32px,8vw,56px)", color: "#e0e7ff", letterSpacing: "-0.02em" }}>
            {str}
          </span>
        </div>
        <div className="absolute left-0 right-0 h-px" style={{ top: "50%", background: "rgba(255,255,255,0.06)" }} />
      </div>
      <span className="text-[9px] uppercase tracking-[0.18em] font-semibold" style={{ color: "rgba(224,231,255,0.35)" }}>
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer() {
  const [label,    setLabel]    = useState("New Year 2026");
  const [datetime, setDatetime] = useState("");
  const [target,   setTarget]   = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [done,     setDone]     = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Default: next Jan 1
    const ny = new Date(new Date().getFullYear() + 1, 0, 1, 0, 0, 0);
    setDatetime(ny.toISOString().slice(0, 16));
    setTarget(ny);
  }, []);

  useEffect(() => {
    if (!target) return;
    clearInterval(intervalRef.current!);
    setDone(false);

    const tick = () => {
      const tl = calcTimeLeft(target);
      setTimeLeft(tl);
      if (tl.total === 0) { setDone(true); clearInterval(intervalRef.current!); }
    };
    tick();
    intervalRef.current = setInterval(tick, 1000);
    return () => clearInterval(intervalRef.current!);
  }, [target]);

  const handleDateChange = (v: string) => {
    setDatetime(v);
    const d = new Date(v);
    if (!isNaN(d.getTime())) setTarget(d);
  };

  const progress = timeLeft && target ? Math.max(0, Math.min(100, 100 - (timeLeft.total / (target.getTime() - (target.getTime() - timeLeft.total - 1000))) * 100)) : 0;

  return (
    <div>
      {/* Inputs */}
      <div className="rounded-[20px] p-6 mb-4"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(8px)" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1.5 text-[10px] uppercase tracking-[0.14em] font-semibold" style={{ color: "rgba(224,231,255,0.4)" }}>
              Event Name
            </label>
            <input type="text" value={label} onChange={e => setLabel(e.target.value)} placeholder="e.g. My Birthday"
              className="w-full rounded-[12px] px-4 py-3 text-[14px] font-medium outline-none"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#e0e7ff", fontFamily: "inherit" }}
              onFocus={e => (e.currentTarget.style.borderColor = "rgba(99,102,241,0.5)")}
              onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")} />
          </div>
          <div>
            <label className="block mb-1.5 text-[10px] uppercase tracking-[0.14em] font-semibold" style={{ color: "rgba(224,231,255,0.4)" }}>
              Target Date & Time
            </label>
            <input type="datetime-local" value={datetime} onChange={e => handleDateChange(e.target.value)}
              className="w-full rounded-[12px] px-4 py-3 text-[14px] font-medium outline-none"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#e0e7ff", fontFamily: "inherit", colorScheme: "dark" }}
              onFocus={e => (e.currentTarget.style.borderColor = "rgba(99,102,241,0.5)")}
              onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")} />
          </div>
        </div>
      </div>

      {/* Countdown display */}
      <div className="rounded-[24px] py-10 px-6 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)", boxShadow: "0 20px 60px rgba(48,43,99,0.5)" }}>

        {/* Stars effect */}
        <div className="absolute inset-0 opacity-30"
          style={{ backgroundImage: "radial-gradient(circle at 10% 20%, rgba(255,255,255,0.1) 1px, transparent 1px), radial-gradient(circle at 80% 15%, rgba(255,255,255,0.1) 1px, transparent 1px), radial-gradient(circle at 45% 75%, rgba(255,255,255,0.08) 1px, transparent 1px), radial-gradient(circle at 70% 45%, rgba(255,255,255,0.08) 1px, transparent 1px)", backgroundSize: "60px 60px, 80px 80px, 50px 50px, 70px 70px" }} />

        {done ? (
          <div className="relative py-8">
            <p className="text-6xl mb-4">🎉</p>
            <p className="font-bold text-[28px]" style={{ color: "#e0e7ff" }}>Time&apos;s Up!</p>
            <p className="mt-2 text-[14px]" style={{ color: "rgba(224,231,255,0.5)" }}>{label}</p>
          </div>
        ) : (
          <div className="relative">
            {label && (
              <p className="text-[11px] uppercase tracking-[0.2em] font-semibold mb-6" style={{ color: "rgba(224,231,255,0.4)" }}>
                {label}
              </p>
            )}
            {timeLeft ? (
              <div className="flex items-start justify-center gap-3 sm:gap-6">
                <Digit value={timeLeft.days}    label="Days"    />
                <span className="font-bold text-[clamp(28px,6vw,48px)]" style={{ color: "rgba(224,231,255,0.2)", marginTop: "clamp(16px,3vw,24px)" }}>:</span>
                <Digit value={timeLeft.hours}   label="Hours"   />
                <span className="font-bold text-[clamp(28px,6vw,48px)]" style={{ color: "rgba(224,231,255,0.2)", marginTop: "clamp(16px,3vw,24px)" }}>:</span>
                <Digit value={timeLeft.minutes} label="Minutes" />
                <span className="font-bold text-[clamp(28px,6vw,48px)]" style={{ color: "rgba(224,231,255,0.2)", marginTop: "clamp(16px,3vw,24px)" }}>:</span>
                <Digit value={timeLeft.seconds} label="Seconds" />
              </div>
            ) : (
              <p style={{ color: "rgba(224,231,255,0.3)", fontSize: "14px" }}>Set a date above</p>
            )}
          </div>
        )}

        {/* Progress bar */}
        {!done && timeLeft && (
          <div className="mt-8 h-1 rounded-full overflow-hidden relative"
            style={{ background: "rgba(255,255,255,0.06)" }}>
            <div className="h-full rounded-full transition-all duration-1000"
              style={{ width: `${Math.min(100, progress)}%`, background: "linear-gradient(to right, #6366f1, #a855f7)" }} />
          </div>
        )}
      </div>
    </div>
  );
}
