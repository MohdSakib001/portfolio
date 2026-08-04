"use client";
import { useState, useEffect, useRef, useMemo } from "react";

interface TZEntry {
  id: string;
  city: string;
  label: string;
}

const PRESET_ZONES: TZEntry[] = [
  { id: "America/New_York",      city: "New York",    label: "America/New_York" },
  { id: "Europe/London",         city: "London",      label: "Europe/London" },
  { id: "Asia/Dubai",            city: "Dubai",       label: "Asia/Dubai" },
  { id: "Asia/Tokyo",            city: "Tokyo",       label: "Asia/Tokyo" },
  { id: "Australia/Sydney",      city: "Sydney",      label: "Australia/Sydney" },
  { id: "America/Los_Angeles",   city: "Los Angeles", label: "America/Los_Angeles" },
  { id: "Europe/Paris",          city: "Paris",       label: "Europe/Paris" },
  { id: "Asia/Singapore",        city: "Singapore",   label: "Asia/Singapore" },
  { id: "Asia/Kolkata",          city: "Mumbai",      label: "Asia/Kolkata" },
];

const ALL_ZONES: TZEntry[] = [
  { id: "America/New_York",      city: "New York",      label: "America/New_York" },
  { id: "America/Chicago",       city: "Chicago",       label: "America/Chicago" },
  { id: "America/Denver",        city: "Denver",        label: "America/Denver" },
  { id: "America/Los_Angeles",   city: "Los Angeles",   label: "America/Los_Angeles" },
  { id: "America/Anchorage",     city: "Anchorage",     label: "America/Anchorage" },
  { id: "Pacific/Honolulu",      city: "Honolulu",      label: "Pacific/Honolulu" },
  { id: "America/Toronto",       city: "Toronto",       label: "America/Toronto" },
  { id: "America/Sao_Paulo",     city: "São Paulo",     label: "America/Sao_Paulo" },
  { id: "America/Buenos_Aires",  city: "Buenos Aires",  label: "America/Buenos_Aires" },
  { id: "Europe/London",         city: "London",        label: "Europe/London" },
  { id: "Europe/Paris",          city: "Paris",         label: "Europe/Paris" },
  { id: "Europe/Berlin",         city: "Berlin",        label: "Europe/Berlin" },
  { id: "Europe/Amsterdam",      city: "Amsterdam",     label: "Europe/Amsterdam" },
  { id: "Europe/Madrid",         city: "Madrid",        label: "Europe/Madrid" },
  { id: "Europe/Rome",           city: "Rome",          label: "Europe/Rome" },
  { id: "Europe/Moscow",         city: "Moscow",        label: "Europe/Moscow" },
  { id: "Europe/Istanbul",       city: "Istanbul",      label: "Europe/Istanbul" },
  { id: "Africa/Cairo",          city: "Cairo",         label: "Africa/Cairo" },
  { id: "Africa/Lagos",          city: "Lagos",         label: "Africa/Lagos" },
  { id: "Africa/Nairobi",        city: "Nairobi",       label: "Africa/Nairobi" },
  { id: "Asia/Dubai",            city: "Dubai",         label: "Asia/Dubai" },
  { id: "Asia/Kolkata",          city: "Mumbai",        label: "Asia/Kolkata" },
  { id: "Asia/Dhaka",            city: "Dhaka",         label: "Asia/Dhaka" },
  { id: "Asia/Bangkok",          city: "Bangkok",       label: "Asia/Bangkok" },
  { id: "Asia/Singapore",        city: "Singapore",     label: "Asia/Singapore" },
  { id: "Asia/Hong_Kong",        city: "Hong Kong",     label: "Asia/Hong_Kong" },
  { id: "Asia/Shanghai",         city: "Shanghai",      label: "Asia/Shanghai" },
  { id: "Asia/Seoul",            city: "Seoul",         label: "Asia/Seoul" },
  { id: "Asia/Tokyo",            city: "Tokyo",         label: "Asia/Tokyo" },
  { id: "Australia/Perth",       city: "Perth",         label: "Australia/Perth" },
  { id: "Australia/Sydney",      city: "Sydney",        label: "Australia/Sydney" },
  { id: "Pacific/Auckland",      city: "Auckland",      label: "Pacific/Auckland" },
];

function getUTCOffset(tz: string, date: Date): string {
  try {
    const parts = new Intl.DateTimeFormat("en", {
      timeZone: tz,
      timeZoneName: "shortOffset",
    }).formatToParts(date);
    const offsetPart = parts.find(p => p.type === "timeZoneName");
    return offsetPart ? offsetPart.value : "UTC";
  } catch {
    return "UTC";
  }
}

function getFormattedTime(tz: string, date: Date): { time: string; dateStr: string; hour: number } {
  try {
    const timeFmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: tz,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const dateFmt = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const hourFmt = new Intl.DateTimeFormat("en", {
      timeZone: tz,
      hour: "numeric",
      hour12: false,
    });
    const hourStr = hourFmt.format(date);
    const hour = parseInt(hourStr, 10);
    return { time: timeFmt.format(date), dateStr: dateFmt.format(date), hour };
  } catch {
    return { time: "--:--:--", dateStr: "--", hour: 12 };
  }
}

function getDayDiff(sourceTz: string, targetTz: string, date: Date): number {
  try {
    const getDayNum = (tz: string) => {
      const d = new Intl.DateTimeFormat("en", {
        timeZone: tz,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).formatToParts(date);
      return parseInt(d.find(p => p.type === "day")!.value, 10);
    };
    const sourceDay = getDayNum(sourceTz);
    const targetDay = getDayNum(targetTz);
    const diff = targetDay - sourceDay;
    if (diff === 0) return 0;
    if (diff > 1) return -1;
    if (diff < -1) return 1;
    return diff;
  } catch {
    return 0;
  }
}

function isNightHour(hour: number): boolean {
  return hour >= 22 || hour < 6;
}

function toLocalDatetimeValue(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

interface CardProps {
  entry: TZEntry;
  date: Date;
  sourceTz: string;
  removable: boolean;
  onRemove?: () => void;
}

function TimezoneCard({ entry, date, sourceTz, removable, onRemove }: CardProps) {
  const { time, dateStr, hour } = getFormattedTime(entry.id, date);
  const offset = getUTCOffset(entry.id, date);
  const dayDiff = getDayDiff(sourceTz, entry.id, date);
  const night = isNightHour(hour);

  return (
    <div
      className="relative rounded-[16px] px-5 py-4 transition-all"
      style={{
        background: night ? "rgba(11,19,32,0.7)" : "#0f1f35",
        border: `1px solid rgba(56,189,248,${night ? "0.06" : "0.10"})`,
        opacity: night ? 0.72 : 1,
      }}
    >
      {removable && onRemove && (
        <button
          onClick={onRemove}
          className="absolute top-3 right-3 w-5 h-5 flex items-center justify-center rounded-full text-[11px] font-bold transition-opacity hover:opacity-100"
          style={{ color: "rgba(56,189,248,0.4)", background: "rgba(56,189,248,0.08)", opacity: 0.7 }}
          aria-label={`Remove ${entry.city}`}
        >
          ×
        </button>
      )}

      <div className="flex items-start justify-between gap-3 pr-5">
        <div className="min-w-0">
          <p
            className="font-semibold truncate"
            style={{ fontSize: "13px", color: night ? "rgba(224,231,255,0.5)" : "#e0e7ff" }}
          >
            {entry.city}
          </p>
          <p
            className="mt-0.5 truncate"
            style={{ fontSize: "10px", color: "rgba(56,189,248,0.45)", fontFamily: "monospace" }}
          >
            {entry.id}
          </p>
        </div>
        <div className="flex flex-col items-end shrink-0">
          <span
            className="font-bold tabular-nums"
            style={{
              fontSize: "22px",
              fontFamily: "monospace",
              color: night ? "rgba(56,189,248,0.5)" : "#38bdf8",
              letterSpacing: "0.04em",
            }}
          >
            {time}
          </span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 flex-wrap">
        <p style={{ fontSize: "11px", color: "rgba(224,231,255,0.35)" }}>{dateStr}</p>
        <div className="flex items-center gap-2">
          {dayDiff !== 0 && (
            <span
              className="px-1.5 py-0.5 rounded-md text-[9px] font-semibold"
              style={{
                background: dayDiff > 0 ? "rgba(56,189,248,0.1)" : "rgba(248,113,113,0.1)",
                color: dayDiff > 0 ? "#38bdf8" : "#f87171",
                border: `1px solid ${dayDiff > 0 ? "rgba(56,189,248,0.2)" : "rgba(248,113,113,0.2)"}`,
              }}
            >
              {dayDiff > 0 ? "+1 day" : "−1 day"}
            </span>
          )}
          {dayDiff === 0 && (
            <span
              className="px-1.5 py-0.5 rounded-md text-[9px] font-medium"
              style={{
                background: "rgba(56,189,248,0.06)",
                color: "rgba(56,189,248,0.45)",
                border: "1px solid rgba(56,189,248,0.1)",
              }}
            >
              same day
            </span>
          )}
          <span
            className="text-[10px] font-mono"
            style={{ color: "rgba(56,189,248,0.55)" }}
          >
            {offset}
          </span>
          {night && (
            <span style={{ fontSize: "12px" }} title="Nighttime hours">🌙</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TimezoneConverter() {
  const sourceTz = useMemo(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {
      return "UTC";
    }
  }, []);

  const [now, setNow] = useState<Date>(() => new Date());
  const [inputValue, setInputValue] = useState<string>("");
  const [useCustomDate, setUseCustomDate] = useState(false);
  const [customDate, setCustomDate] = useState<Date>(new Date());
  const [addedZones, setAddedZones] = useState<TZEntry[]>([]);
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setInputValue(toLocalDatetimeValue(new Date()));
    intervalRef.current = setInterval(() => {
      const n = new Date();
      setNow(n);
      if (!useCustomDate) {
        setInputValue(toLocalDatetimeValue(n));
      }
    }, 1000);
    return () => clearInterval(intervalRef.current!);
  }, [useCustomDate]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const displayDate = useCustomDate ? customDate : now;

  const handleDateInput = (v: string) => {
    setInputValue(v);
    const d = new Date(v);
    if (!isNaN(d.getTime())) {
      setCustomDate(d);
      setUseCustomDate(true);
    }
  };

  const resetToLive = () => {
    setUseCustomDate(false);
    setInputValue(toLocalDatetimeValue(now));
  };

  const filteredZones = useMemo(() => {
    const q = search.toLowerCase();
    const addedIds = new Set([...PRESET_ZONES.map(z => z.id), ...addedZones.map(z => z.id)]);
    return ALL_ZONES.filter(
      z => !addedIds.has(z.id) && (z.city.toLowerCase().includes(q) || z.id.toLowerCase().includes(q))
    );
  }, [search, addedZones]);

  const addZone = (zone: TZEntry) => {
    setAddedZones(prev => [...prev, zone]);
    setDropdownOpen(false);
    setSearch("");
  };

  const removeZone = (id: string) => {
    setAddedZones(prev => prev.filter(z => z.id !== id));
  };

  return (
    <div>
      <div
        className="rounded-[20px] p-5 mb-4"
        style={{
          background: "#0f1f35",
          border: "1px solid rgba(56,189,248,0.10)",
        }}
      >
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
          <div className="flex-1 w-full">
            <label
              className="block mb-1.5 text-[10px] uppercase tracking-[0.14em] font-semibold"
              style={{ color: "rgba(56,189,248,0.55)" }}
            >
              Source Date & Time
            </label>
            <input
              type="datetime-local"
              value={inputValue}
              step="1"
              onChange={e => handleDateInput(e.target.value)}
              className="w-full rounded-[12px] px-4 py-2.5 text-[13px] font-medium outline-none"
              style={{
                background: "rgba(56,189,248,0.06)",
                border: "1px solid rgba(56,189,248,0.12)",
                color: "#e0e7ff",
                fontFamily: "monospace",
                colorScheme: "dark",
              }}
              onFocus={e => (e.currentTarget.style.borderColor = "rgba(56,189,248,0.4)")}
              onBlur={e => (e.currentTarget.style.borderColor = "rgba(56,189,248,0.12)")}
            />
          </div>
          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-[8px]"
              style={{
                background: useCustomDate ? "rgba(56,189,248,0.08)" : "rgba(56,189,248,0.04)",
                border: `1px solid ${useCustomDate ? "rgba(56,189,248,0.2)" : "rgba(56,189,248,0.06)"}`,
              }}
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: useCustomDate ? "#f87171" : "#38bdf8", flexShrink: 0 }}
              />
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  color: useCustomDate ? "#f87171" : "#38bdf8",
                  letterSpacing: "0.08em",
                }}
              >
                {useCustomDate ? "CUSTOM" : "LIVE"}
              </span>
            </div>
            {useCustomDate && (
              <button
                onClick={resetToLive}
                className="px-3 py-1.5 rounded-[8px] text-[10px] font-semibold transition-opacity hover:opacity-80"
                style={{
                  background: "rgba(56,189,248,0.1)",
                  color: "#38bdf8",
                  border: "1px solid rgba(56,189,248,0.2)",
                  letterSpacing: "0.08em",
                }}
              >
                RESET
              </button>
            )}
          </div>
        </div>
        <p className="mt-2.5" style={{ fontSize: "10px", color: "rgba(56,189,248,0.35)" }}>
          Your timezone: <span style={{ fontFamily: "monospace" }}>{sourceTz}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
        {PRESET_ZONES.map(zone => (
          <TimezoneCard
            key={zone.id}
            entry={zone}
            date={displayDate}
            sourceTz={sourceTz}
            removable={false}
          />
        ))}
        {addedZones.map(zone => (
          <TimezoneCard
            key={zone.id}
            entry={zone}
            date={displayDate}
            sourceTz={sourceTz}
            removable={true}
            onRemove={() => removeZone(zone.id)}
          />
        ))}
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(v => !v)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-[14px] text-[12px] font-semibold transition-all hover:opacity-90"
          style={{
            background: "rgba(56,189,248,0.07)",
            border: "1px dashed rgba(56,189,248,0.22)",
            color: "#38bdf8",
            letterSpacing: "0.06em",
          }}
        >
          <span style={{ fontSize: "16px", lineHeight: 1 }}>+</span>
          Add timezone
        </button>

        {dropdownOpen && (
          <div
            className="absolute left-0 right-0 top-full mt-2 rounded-[16px] overflow-hidden z-20"
            style={{
              background: "#0b1320",
              border: "1px solid rgba(56,189,248,0.15)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
            }}
          >
            <div className="p-3" style={{ borderBottom: "1px solid rgba(56,189,248,0.08)" }}>
              <input
                autoFocus
                type="text"
                placeholder="Search city or timezone…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full rounded-[10px] px-3 py-2 text-[12px] outline-none"
                style={{
                  background: "rgba(56,189,248,0.06)",
                  border: "1px solid rgba(56,189,248,0.12)",
                  color: "#e0e7ff",
                  fontFamily: "monospace",
                }}
              />
            </div>
            <div style={{ maxHeight: "240px", overflowY: "auto" }}>
              {filteredZones.length === 0 ? (
                <p
                  className="px-4 py-6 text-center"
                  style={{ fontSize: "12px", color: "rgba(56,189,248,0.35)" }}
                >
                  No more timezones to add
                </p>
              ) : (
                filteredZones.map(zone => (
                  <button
                    key={zone.id}
                    onClick={() => addZone(zone)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left transition-colors hover:bg-white/5"
                    style={{ borderBottom: "1px solid rgba(56,189,248,0.05)" }}
                  >
                    <div>
                      <span
                        className="block font-medium"
                        style={{ fontSize: "12px", color: "#e0e7ff" }}
                      >
                        {zone.city}
                      </span>
                      <span
                        className="block"
                        style={{ fontSize: "10px", color: "rgba(56,189,248,0.45)", fontFamily: "monospace" }}
                      >
                        {zone.id}
                      </span>
                    </div>
                    <span
                      style={{ fontSize: "11px", color: "rgba(56,189,248,0.55)", fontFamily: "monospace" }}
                    >
                      {getUTCOffset(zone.id, displayDate)}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
