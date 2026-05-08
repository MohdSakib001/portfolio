"use client";
import { useState, useEffect } from "react";

interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalMonths: number;
  totalHours: number;
  nextBirthdayDays: number;
  nextBirthdayDate: string;
  dayOfWeek: string;
  zodiac: string;
}

const ZODIAC = [
  { sign: "Capricorn",  emoji: "♑", from: [12, 22], to: [1, 19] },
  { sign: "Aquarius",   emoji: "♒", from: [1, 20],  to: [2, 18] },
  { sign: "Pisces",     emoji: "♓", from: [2, 19],  to: [3, 20] },
  { sign: "Aries",      emoji: "♈", from: [3, 21],  to: [4, 19] },
  { sign: "Taurus",     emoji: "♉", from: [4, 20],  to: [5, 20] },
  { sign: "Gemini",     emoji: "♊", from: [5, 21],  to: [6, 20] },
  { sign: "Cancer",     emoji: "♋", from: [6, 21],  to: [7, 22] },
  { sign: "Leo",        emoji: "♌", from: [7, 23],  to: [8, 22] },
  { sign: "Virgo",      emoji: "♍", from: [8, 23],  to: [9, 22] },
  { sign: "Libra",      emoji: "♎", from: [9, 23],  to: [10, 22] },
  { sign: "Scorpio",    emoji: "♏", from: [10, 23], to: [11, 21] },
  { sign: "Sagittarius",emoji: "♐", from: [11, 22], to: [12, 21] },
];

function getZodiac(month: number, day: number): string {
  for (const z of ZODIAC) {
    const [fm, fd] = z.from;
    const [tm, td] = z.to;
    if ((month === fm && day >= fd) || (month === tm && day <= td)) {
      return `${z.emoji} ${z.sign}`;
    }
  }
  return "♑ Capricorn";
}

const DAYS_OF_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function calcAge(dob: string): AgeResult | null {
  if (!dob) return null;
  const birth = new Date(dob);
  const now = new Date();
  if (birth > now) return null;

  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) { years--; months += 12; }

  const msPerDay = 86400000;
  const totalDays = Math.floor((now.getTime() - birth.getTime()) / msPerDay);
  const totalMonths = years * 12 + months;
  const totalHours = totalDays * 24;

  const thisYear = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
  let nextBirthday = thisYear;
  if (thisYear <= now) {
    nextBirthday = new Date(now.getFullYear() + 1, birth.getMonth(), birth.getDate());
  }
  const nextBirthdayDays = Math.ceil((nextBirthday.getTime() - now.getTime()) / msPerDay);
  const nextBirthdayDate = nextBirthday.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const dayOfWeek = DAYS_OF_WEEK[birth.getDay()];
  const zodiac = getZodiac(birth.getMonth() + 1, birth.getDate());

  return { years, months, days, totalDays, totalMonths, totalHours, nextBirthdayDays, nextBirthdayDate, dayOfWeek, zodiac };
}

const STAT_CARDS = [
  { key: "years",   label: "Years",         color: "#f97316", bg: "#fff7ed", border: "#fed7aa" },
  { key: "months",  label: "Months",        color: "#8b5cf6", bg: "#f5f3ff", border: "#ddd6fe" },
  { key: "days",    label: "Days",          color: "#0ea5e9", bg: "#f0f9ff", border: "#bae6fd" },
  { key: "totalDays",   label: "Total Days",    color: "#10b981", bg: "#ecfdf5", border: "#a7f3d0" },
  { key: "totalMonths", label: "Total Months",  color: "#ec4899", bg: "#fdf2f8", border: "#fbcfe8" },
  { key: "totalHours",  label: "Total Hours",   color: "#f59e0b", bg: "#fffbeb", border: "#fde68a" },
];

export default function AgeCalculator() {
  const [dob, setDob]     = useState("");
  const [result, setResult] = useState<AgeResult | null>(null);
  const [today, setToday]   = useState("");

  useEffect(() => {
    setToday(new Date().toISOString().split("T")[0]);
  }, []);

  const handleChange = (v: string) => {
    setDob(v);
    setResult(calcAge(v));
  };

  return (
    <div>
      {/* Date input */}
      <div
        className="rounded-[20px] p-7"
        style={{ background: "#ffffff", boxShadow: "0 0 0 1px rgba(3,3,2,0.07), 0 4px 24px rgba(3,3,2,0.06)" }}
      >
        <label className="block mb-3" style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(3,3,2,0.4)" }}>
          Date of Birth
        </label>
        <input
          type="date"
          value={dob}
          max={today}
          onChange={e => handleChange(e.target.value)}
          className="w-full rounded-[12px] px-4 py-3.5 text-[15px] font-medium outline-none transition-all"
          style={{
            background: "#faf9f7",
            border: "1.5px solid rgba(3,3,2,0.1)",
            color: "#1c1b18",
            fontFamily: "inherit",
          }}
          onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderColor = "#f97316"; }}
          onBlur={e => { (e.currentTarget as HTMLInputElement).style.borderColor = "rgba(3,3,2,0.1)"; }}
        />
        {!result && dob && (
          <p className="mt-3 text-[12px]" style={{ color: "#ef4444" }}>
            Please enter a valid past date.
          </p>
        )}
      </div>

      {/* Age display */}
      {result && (
        <>
          {/* Primary big result */}
          <div
            className="mt-3 rounded-[20px] px-8 py-8 text-center"
            style={{
              background: "linear-gradient(135deg, #fff7ed 0%, #fdf2f8 50%, #f0f9ff 100%)",
              boxShadow: "0 0 0 1px rgba(249,115,22,0.12), 0 4px 24px rgba(249,115,22,0.08)",
            }}
          >
            <p className="text-[11px] uppercase tracking-[0.18em] font-semibold mb-3" style={{ color: "rgba(3,3,2,0.4)" }}>
              Your Age
            </p>
            <div className="flex items-baseline justify-center gap-4 flex-wrap">
              <div className="text-center">
                <span className="font-bold tabular-nums" style={{ fontSize: "clamp(48px,10vw,72px)", color: "#f97316", lineHeight: 1 }}>
                  {result.years}
                </span>
                <span className="block text-[12px] font-medium mt-1" style={{ color: "rgba(3,3,2,0.4)" }}>years</span>
              </div>
              <span style={{ fontSize: "32px", color: "rgba(3,3,2,0.15)", lineHeight: 1 }}>·</span>
              <div className="text-center">
                <span className="font-bold tabular-nums" style={{ fontSize: "clamp(36px,7vw,54px)", color: "#8b5cf6", lineHeight: 1 }}>
                  {result.months}
                </span>
                <span className="block text-[12px] font-medium mt-1" style={{ color: "rgba(3,3,2,0.4)" }}>months</span>
              </div>
              <span style={{ fontSize: "32px", color: "rgba(3,3,2,0.15)", lineHeight: 1 }}>·</span>
              <div className="text-center">
                <span className="font-bold tabular-nums" style={{ fontSize: "clamp(36px,7vw,54px)", color: "#0ea5e9", lineHeight: 1 }}>
                  {result.days}
                </span>
                <span className="block text-[12px] font-medium mt-1" style={{ color: "rgba(3,3,2,0.4)" }}>days</span>
              </div>
            </div>
          </div>

          {/* Stat cards grid */}
          <div className="grid grid-cols-3 gap-2.5 mt-2.5">
            {STAT_CARDS.map(({ key, label, color, bg, border }) => (
              <div
                key={key}
                className="rounded-[16px] p-4 text-center"
                style={{ background: bg, border: `1.5px solid ${border}` }}
              >
                <span
                  className="block font-bold tabular-nums leading-none mb-1.5"
                  style={{ fontSize: "clamp(18px,3.5vw,24px)", color }}
                >
                  {(result[key as keyof AgeResult] as number).toLocaleString()}
                </span>
                <span className="text-[9.5px] uppercase tracking-[0.12em] font-semibold" style={{ color: "rgba(3,3,2,0.4)" }}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Extra info row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-2.5">
            <div className="rounded-[16px] p-5" style={{ background: "#ffffff", boxShadow: "0 0 0 1px rgba(3,3,2,0.06)" }}>
              <p className="text-[10px] uppercase tracking-[0.12em] font-semibold mb-1.5" style={{ color: "rgba(3,3,2,0.35)" }}>
                Born on
              </p>
              <p className="font-semibold" style={{ fontSize: "14px", color: "#1c1b18" }}>{result.dayOfWeek}</p>
            </div>
            <div className="rounded-[16px] p-5" style={{ background: "#ffffff", boxShadow: "0 0 0 1px rgba(3,3,2,0.06)" }}>
              <p className="text-[10px] uppercase tracking-[0.12em] font-semibold mb-1.5" style={{ color: "rgba(3,3,2,0.35)" }}>
                Zodiac Sign
              </p>
              <p className="font-semibold" style={{ fontSize: "14px", color: "#1c1b18" }}>{result.zodiac}</p>
            </div>
            <div className="rounded-[16px] p-5" style={{ background: "#ffffff", boxShadow: "0 0 0 1px rgba(3,3,2,0.06)" }}>
              <p className="text-[10px] uppercase tracking-[0.12em] font-semibold mb-1.5" style={{ color: "rgba(3,3,2,0.35)" }}>
                Next Birthday
              </p>
              <p className="font-semibold text-[13px]" style={{ color: result.nextBirthdayDays <= 7 ? "#f97316" : "#1c1b18" }}>
                {result.nextBirthdayDays === 0 ? "🎉 Today!" : `in ${result.nextBirthdayDays} days`}
              </p>
            </div>
          </div>
        </>
      )}

      {!result && !dob && (
        <div className="mt-6 rounded-[16px] px-8 py-12 text-center" style={{ background: "#ffffff", boxShadow: "0 0 0 1px rgba(3,3,2,0.05)" }}>
          <div className="text-4xl mb-3">🎂</div>
          <p style={{ fontSize: "14px", color: "rgba(3,3,2,0.4)", lineHeight: 1.7 }}>
            Enter your date of birth above to see<br />your exact age and fun stats.
          </p>
        </div>
      )}
    </div>
  );
}
