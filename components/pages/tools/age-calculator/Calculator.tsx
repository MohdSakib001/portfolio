"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Cake, CalendarDays, Check, Copy, X } from "lucide-react";

interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalMonths: number;
  totalHours: number;
  nextBirthdayDays: number;
  nextBirthdayDate: string;
  yearProgress: number;
  dayOfWeek: string;
  zodiac: string;
}

const ZODIAC = [
  { sign: "Capricorn", from: [12, 22], to: [1, 19] },
  { sign: "Aquarius", from: [1, 20], to: [2, 18] },
  { sign: "Pisces", from: [2, 19], to: [3, 20] },
  { sign: "Aries", from: [3, 21], to: [4, 19] },
  { sign: "Taurus", from: [4, 20], to: [5, 20] },
  { sign: "Gemini", from: [5, 21], to: [6, 20] },
  { sign: "Cancer", from: [6, 21], to: [7, 22] },
  { sign: "Leo", from: [7, 23], to: [8, 22] },
  { sign: "Virgo", from: [8, 23], to: [9, 22] },
  { sign: "Libra", from: [9, 23], to: [10, 22] },
  { sign: "Scorpio", from: [10, 23], to: [11, 21] },
  { sign: "Sagittarius", from: [11, 22], to: [12, 21] },
];

const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const MS_PER_DAY = 86_400_000;

function getZodiac(month: number, day: number): string {
  for (const { sign, from, to } of ZODIAC) {
    if ((month === from[0] && day >= from[1]) || (month === to[0] && day <= to[1])) {
      return sign;
    }
  }
  return "Capricorn";
}

/**
 * `new Date("1998-05-20")` parses as UTC midnight while every getter below reads
 * local time — which silently shifts the whole result a day back for anyone west
 * of UTC. Build the date from its parts so it is local from the start.
 */
function parseLocalDate(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const [, y, m, d] = match;
  const date = new Date(Number(y), Number(m) - 1, Number(d));
  return Number.isNaN(date.getTime()) ? null : date;
}

/** Midnight-normalised difference in whole days, immune to DST shifts. */
function daysBetween(from: Date, to: Date): number {
  return Math.round((to.getTime() - from.getTime()) / MS_PER_DAY);
}

function calcAge(dob: string): AgeResult | null {
  const birth = parseLocalDate(dob);
  if (!birth) return null;

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (birth > today) return null;

  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const totalDays = daysBetween(birth, today);

  // Compared date-only, so the day itself reads as 0 rather than rolling a year.
  let nextBirthday = new Date(
    today.getFullYear(),
    birth.getMonth(),
    birth.getDate(),
  );
  if (nextBirthday < today) {
    nextBirthday = new Date(
      today.getFullYear() + 1,
      birth.getMonth(),
      birth.getDate(),
    );
  }
  const lastBirthday = new Date(
    nextBirthday.getFullYear() - 1,
    birth.getMonth(),
    birth.getDate(),
  );

  const nextBirthdayDays = daysBetween(today, nextBirthday);
  const cycle = daysBetween(lastBirthday, nextBirthday);

  return {
    years,
    months,
    days,
    totalDays,
    totalMonths: years * 12 + months,
    totalHours: totalDays * 24,
    nextBirthdayDays,
    nextBirthdayDate: nextBirthday.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    yearProgress: cycle > 0 ? (cycle - nextBirthdayDays) / cycle : 0,
    dayOfWeek: DAYS_OF_WEEK[birth.getDay()],
    zodiac: getZodiac(birth.getMonth() + 1, birth.getDate()),
  };
}

const STAT_CARDS = [
  { key: "totalDays", label: "Total days" },
  { key: "totalMonths", label: "Total months" },
  { key: "totalHours", label: "Total hours" },
] as const;

export default function Calculator() {
  const [dob, setDob] = useState("");
  const [copied, setCopied] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const result = useMemo(() => (dob ? calcAge(dob) : null), [dob]);

  /**
   * Caps the picker at today. Set on the node rather than rendered as an
   * attribute because the server and the visitor's browser can sit on different
   * dates — rendering `max` on both sides would be a hydration mismatch.
   */
  useEffect(() => {
    const node = inputRef.current;
    if (!node) return;
    const now = new Date();
    node.max = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  }, []);

  /** Lets the whole field act as the trigger, not just the native indicator. */
  const openPicker = () => {
    const node = inputRef.current;
    if (!node) return;
    try {
      node.showPicker();
    } catch {
      node.focus();
    }
  };

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    if (!result) return;
    const summary = [
      `Age: ${result.years} years, ${result.months} months, ${result.days} days`,
      `Total days lived: ${result.totalDays.toLocaleString()}`,
      `Born on a ${result.dayOfWeek} · ${result.zodiac}`,
      `Next birthday: ${result.nextBirthdayDate} (${result.nextBirthdayDays} days)`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="rounded-4xl bg-white p-6 shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_4px_24px_rgba(0,0,0,0.04)] sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <label
            htmlFor="dob"
            className="text-label font-semibold uppercase tracking-[0.16em] text-black/40"
          >
            Date of birth
          </label>
          {dob && (
            <button
              type="button"
              onClick={() => setDob("")}
              className="inline-flex items-center gap-1.5 text-label font-semibold uppercase tracking-[0.12em] text-black/35 transition hover:text-black"
            >
              <X size={12} />
              Clear
            </button>
          )}
        </div>

        <div
          onClick={openPicker}
          className="group mt-4 flex cursor-pointer items-center gap-4 rounded-2xl border border-black/10 bg-[#fcfbfa] px-5 py-4 transition duration-150 hover:border-black/25 focus-within:border-black/70 focus-within:bg-white"
        >
          <CalendarDays
            size={22}
            aria-hidden
            className="shrink-0 text-black/30 transition duration-150 group-hover:text-black/50 group-focus-within:text-black"
          />
          <input
            id="dob"
            ref={inputRef}
            type="date"
            value={dob}
            onChange={(event) => setDob(event.target.value)}
            className="w-full bg-transparent text-xl font-medium tracking-tight text-black outline-none sm:text-2xl [&::-webkit-calendar-picker-indicator]:hidden"
          />
        </div>

        {dob && !result ? (
          <p role="alert" className="mt-3 text-caption text-red-600">
            Please enter a valid date in the past.
          </p>
        ) : (
          <p className="mt-3 text-caption text-black/35">
            Nothing is uploaded — the entire calculation runs in this tab.
          </p>
        )}
      </div>

      {result && (
        <>
          <div className="relative overflow-hidden rounded-4xl bg-[#F4EDDA] p-8 md:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-45 mix-blend-overlay"
              style={{
                backgroundImage: `url("/assets/paper-texture.avif")`,
                backgroundSize: "cover",
              }}
            />

            <div className="relative flex flex-wrap items-start justify-between gap-4">
              <p className="text-label font-semibold uppercase tracking-[0.25em] text-black/40">
                Your age
              </p>
              <button
                type="button"
                onClick={handleCopy}
                title="Copy summary"
                className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-label font-semibold uppercase tracking-[0.12em] text-black/60 transition duration-200 hover:bg-white"
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            <div className="relative mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-3">
              {[
                { value: result.years, unit: "years" },
                { value: result.months, unit: "months" },
                { value: result.days, unit: "days" },
              ].map(({ value, unit }) => (
                <p key={unit} className="flex items-baseline gap-2">
                  <span className="font-mono text-5xl font-semibold leading-none tracking-tight text-black tabular-nums md:text-6xl">
                    {value}
                  </span>
                  <span className="text-caption text-black/50">{unit}</span>
                </p>
              ))}
            </div>

            <div className="relative mt-8 border-t border-black/10 pt-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-caption text-black/55">
                  {result.nextBirthdayDays === 0 ? (
                    <span className="inline-flex items-center gap-2 font-semibold text-black">
                      <Cake size={15} />
                      Happy birthday — that&apos;s today.
                    </span>
                  ) : (
                    <>
                      Next birthday on{" "}
                      <span className="font-medium text-black">
                        {result.nextBirthdayDate}
                      </span>
                    </>
                  )}
                </p>
                {result.nextBirthdayDays > 0 && (
                  <p className="font-mono text-caption text-black/55 tabular-nums">
                    {result.nextBirthdayDays} days to go
                  </p>
                )}
              </div>
              <div
                className="mt-3 h-1 w-full overflow-hidden rounded-full bg-black/10"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(result.yearProgress * 100)}
                aria-label="Progress through your current age year"
              >
                <div
                  className="h-full rounded-full bg-black/70"
                  style={{ width: `${Math.max(result.yearProgress * 100, 1.5)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {STAT_CARDS.map(({ key, label }) => (
              <div
                key={key}
                className="rounded-2xl bg-white p-6 shadow-[0_0_0_1px_rgba(0,0,0,0.06)]"
              >
                <p className="font-mono text-3xl font-semibold leading-none tracking-tight text-black tabular-nums">
                  {result[key].toLocaleString()}
                </p>
                <p className="mt-2 text-label font-semibold uppercase tracking-[0.16em] text-black/40">
                  {label}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              { label: "Born on a", value: result.dayOfWeek },
              { label: "Zodiac sign", value: result.zodiac },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex items-baseline justify-between gap-4 rounded-2xl bg-white px-6 py-5 shadow-[0_0_0_1px_rgba(0,0,0,0.06)]"
              >
                <p className="text-label font-semibold uppercase tracking-[0.16em] text-black/40">
                  {label}
                </p>
                <p className="text-body font-medium text-black">{value}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {!result && !dob && (
        <div className="rounded-2xl border border-dashed border-black/12 px-8 py-14 text-center">
          <p className="text-caption leading-relaxed text-black/40">
            Pick your date of birth above to see your exact age,
            <br className="hidden sm:block" /> lifetime totals, and next
            birthday.
          </p>
        </div>
      )}
    </div>
  );
}
