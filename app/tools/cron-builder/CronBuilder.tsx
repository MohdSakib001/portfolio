"use client";
import { useState, useMemo, useCallback } from "react";
import { Copy, Check } from "lucide-react";

const ACCENT = "#a78bfa";
const PANEL = "#0f1424";
const BORDER = "rgba(167,139,250,0.12)";
const HIGHLIGHT = "#7c3aed";
const TEXT = "#e2e8f0";

type Field = "minute" | "hour" | "dom" | "month" | "dow";

interface CronState {
  minute: string;
  hour: string;
  dom: string;
  month: string;
  dow: string;
}

const FIELD_META: Record<Field, { label: string; range: string; placeholder: string }> = {
  minute: { label: "Minute", range: "0–59", placeholder: "0-59, *, */5" },
  hour:   { label: "Hour",   range: "0–23", placeholder: "0-23, *, */2" },
  dom:    { label: "Day of Month", range: "1–31", placeholder: "1-31, *, L" },
  month:  { label: "Month",  range: "1–12", placeholder: "1-12, *, */3" },
  dow:    { label: "Day of Week", range: "0–6", placeholder: "0-6, *, 1-5" },
};

const FIELD_PRESETS: Record<Field, { label: string; value: string }[]> = {
  minute: [
    { label: "Every min", value: "*" },
    { label: "*/5", value: "*/5" },
    { label: "*/10", value: "*/10" },
    { label: "*/15", value: "*/15" },
    { label: "*/30", value: "*/30" },
    { label: "0", value: "0" },
  ],
  hour: [
    { label: "Every hr", value: "*" },
    { label: "*/2", value: "*/2" },
    { label: "*/6", value: "*/6" },
    { label: "*/12", value: "*/12" },
    { label: "0", value: "0" },
    { label: "9", value: "9" },
  ],
  dom: [
    { label: "Every day", value: "*" },
    { label: "1st", value: "1" },
    { label: "15th", value: "15" },
    { label: "Last (L)", value: "L" },
    { label: "Weekdays", value: "1-5" },
  ],
  month: [
    { label: "Every month", value: "*" },
    { label: "Quarterly", value: "*/3" },
    { label: "Jan", value: "1" },
    { label: "Jun", value: "6" },
    { label: "Dec", value: "12" },
  ],
  dow: [
    { label: "Every day", value: "*" },
    { label: "Weekdays", value: "1-5" },
    { label: "Weekend", value: "0,6" },
    { label: "Mon", value: "1" },
    { label: "Fri", value: "5" },
    { label: "Sun", value: "0" },
  ],
};

const COMMON_PRESETS = [
  { label: "Every minute",          expr: "* * * * *" },
  { label: "Every hour",            expr: "0 * * * *" },
  { label: "Daily at 9am",          expr: "0 9 * * *" },
  { label: "Weekdays at 9am",       expr: "0 9 * * 1-5" },
  { label: "Every Sunday midnight", expr: "0 0 * * 0" },
  { label: "First of each month",   expr: "0 0 1 * *" },
  { label: "Every 15 minutes",      expr: "*/15 * * * *" },
  { label: "Twice daily",           expr: "0 9,17 * * *" },
];

const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DOW_NAMES   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function parseSimpleInt(s: string): number | null {
  const n = parseInt(s, 10);
  return isNaN(n) ? null : n;
}

function describeField(field: Field, val: string): string | null {
  if (val === "*") return null;
  if (val.startsWith("*/")) {
    const step = val.slice(2);
    if (field === "minute") return `every ${step} minutes`;
    if (field === "hour")   return `every ${step} hours`;
    if (field === "dom")    return `every ${step} days`;
    if (field === "month")  return `every ${step} months`;
    if (field === "dow")    return `every ${step} days of week`;
  }
  if (field === "minute") {
    const n = parseSimpleInt(val);
    if (n === 0) return "on the hour";
    if (n !== null) return `at minute ${n}`;
    if (val.includes(",")) return `at minutes ${val}`;
  }
  if (field === "hour") {
    const n = parseSimpleInt(val);
    if (n !== null) {
      const h = n % 12 || 12;
      const ampm = n < 12 ? "AM" : "PM";
      return `at ${h}:00 ${ampm}`;
    }
    if (val.includes(",")) {
      const hours = val.split(",").map(v => {
        const x = parseInt(v.trim(), 10);
        if (isNaN(x)) return v.trim();
        const h = x % 12 || 12;
        return `${h}${x < 12 ? "am" : "pm"}`;
      });
      return `at ${hours.join(" and ")}`;
    }
  }
  if (field === "dom") {
    if (val === "L") return "on the last day";
    if (val === "1-5") return "on weekdays";
    const n = parseSimpleInt(val);
    if (n !== null) {
      const suffix = n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th";
      return `on the ${n}${suffix}`;
    }
  }
  if (field === "month") {
    const n = parseSimpleInt(val);
    if (n !== null && n >= 1 && n <= 12) return `in ${MONTH_NAMES[n - 1]}`;
    if (val.includes(",")) return `in months ${val}`;
  }
  if (field === "dow") {
    if (val === "1-5") return "on weekdays";
    if (val === "0,6") return "on weekends";
    const n = parseSimpleInt(val);
    if (n !== null && n >= 0 && n <= 6) return `on ${DOW_NAMES[n]}`;
    if (val.includes(",")) {
      const days = val.split(",").map(v => {
        const x = parseInt(v.trim(), 10);
        return !isNaN(x) && x >= 0 && x <= 6 ? DOW_NAMES[x] : v.trim();
      });
      return `on ${days.join(", ")}`;
    }
  }
  return `(${val})`;
}

function buildDescription(state: CronState): string {
  const { minute, hour, dom, month, dow } = state;
  if (minute === "*" && hour === "*" && dom === "*" && month === "*" && dow === "*") {
    return "Every minute";
  }
  if (minute === "*/5" && hour === "*" && dom === "*" && month === "*" && dow === "*") {
    return "Every 5 minutes";
  }
  if (minute === "*/15" && hour === "*" && dom === "*" && month === "*" && dow === "*") {
    return "Every 15 minutes";
  }
  if (minute === "*/30" && hour === "*" && dom === "*" && month === "*" && dow === "*") {
    return "Every 30 minutes";
  }
  if (minute === "0" && hour === "*" && dom === "*" && month === "*" && dow === "*") {
    return "At the start of every hour";
  }

  const parts: string[] = [];

  const minDesc  = describeField("minute", minute);
  const hourDesc = describeField("hour", hour);
  const domDesc  = describeField("dom", dom);
  const monDesc  = describeField("month", month);
  const dowDesc  = describeField("dow", dow);

  if (hourDesc) {
    if (minDesc && minDesc !== "on the hour") {
      parts.push(`${hourDesc} ${minDesc}`);
    } else {
      parts.push(hourDesc);
    }
  } else if (minDesc) {
    parts.push(minDesc === "on the hour" ? "every hour" : minDesc);
  }

  if (domDesc) parts.push(domDesc);
  if (dowDesc) parts.push(dowDesc);
  if (monDesc) parts.push(monDesc);

  return parts.length ? parts.map((p, i) => i === 0 ? p.charAt(0).toUpperCase() + p.slice(1) : p).join(", ") : "Custom schedule";
}

function validateField(field: Field, val: string): string | null {
  if (!val.trim()) return "Field cannot be empty";
  if (val === "*" || val === "L") return null;
  if (/^\*\/\d+$/.test(val)) {
    const step = parseInt(val.slice(2), 10);
    if (field === "minute" && (step < 1 || step > 59)) return "Step out of range (1-59)";
    if (field === "hour"   && (step < 1 || step > 23)) return "Step out of range (1-23)";
    if (field === "dom"    && (step < 1 || step > 31)) return "Step out of range (1-31)";
    if (field === "month"  && (step < 1 || step > 12)) return "Step out of range (1-12)";
    if (field === "dow"    && (step < 1 || step > 6))  return "Step out of range (1-6)";
    return null;
  }
  const parts = val.split(",");
  for (const part of parts) {
    const rangeParts = part.trim().split("-");
    if (rangeParts.length === 2) {
      const a = parseInt(rangeParts[0], 10), b = parseInt(rangeParts[1], 10);
      if (isNaN(a) || isNaN(b)) return "Invalid range";
      if (a >= b) return "Range start must be less than end";
      continue;
    }
    const n = parseInt(part.trim(), 10);
    if (isNaN(n)) return `Invalid value: ${part.trim()}`;
    if (field === "minute" && (n < 0 || n > 59)) return "Minute must be 0-59";
    if (field === "hour"   && (n < 0 || n > 23)) return "Hour must be 0-23";
    if (field === "dom"    && (n < 1 || n > 31)) return "Day of month must be 1-31";
    if (field === "month"  && (n < 1 || n > 12)) return "Month must be 1-12";
    if (field === "dow"    && (n < 0 || n > 6))  return "Day of week must be 0-6";
  }
  return null;
}

function parseExpr(expr: string): CronState | null {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) return null;
  const [minute, hour, dom, month, dow] = parts;
  return { minute, hour, dom, month, dow };
}

export default function CronBuilder() {
  const [state, setState] = useState<CronState>({ minute: "*", hour: "*", dom: "*", month: "*", dow: "*" });
  const [copied, setCopied] = useState(false);
  const [rawExpr, setRawExpr] = useState("");
  const [rawError, setRawError] = useState<string | null>(null);
  const [activeField, setActiveField] = useState<Field | null>(null);

  const expression = `${state.minute} ${state.hour} ${state.dom} ${state.month} ${state.dow}`;
  const description = useMemo(() => buildDescription(state), [state]);

  const errors: Partial<Record<Field, string>> = useMemo(() => {
    const e: Partial<Record<Field, string>> = {};
    (Object.keys(state) as Field[]).forEach(f => {
      const err = validateField(f, state[f]);
      if (err) e[f] = err;
    });
    return e;
  }, [state]);

  const hasErrors = Object.keys(errors).length > 0;

  const setField = useCallback((field: Field, value: string) => {
    setState(prev => ({ ...prev, [field]: value }));
  }, []);

  const applyPreset = useCallback((expr: string) => {
    const parsed = parseExpr(expr);
    if (parsed) setState(parsed);
  }, []);

  const handleCopy = async () => {
    if (hasErrors) return;
    await navigator.clipboard.writeText(expression);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRawInput = (val: string) => {
    setRawExpr(val);
    const parsed = parseExpr(val);
    if (parsed) {
      setState(parsed);
      setRawError(null);
    } else if (val.trim()) {
      setRawError("Enter a valid 5-part cron expression");
    } else {
      setRawError(null);
    }
  };

  const fields: Field[] = ["minute", "hour", "dom", "month", "dow"];

  return (
    <div style={{ fontFamily: "monospace" }}>

      <div className="rounded-[20px] mb-5 overflow-hidden"
        style={{ background: PANEL, border: `1px solid ${BORDER}`, boxShadow: `0 0 0 1px ${BORDER}, 0 12px 40px rgba(0,0,0,0.6)` }}>

        <div className="px-6 pt-5 pb-4" style={{ borderBottom: `1px solid ${BORDER}` }}>
          <div className="flex items-center gap-3 flex-wrap mb-1.5">
            <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: `rgba(167,139,250,0.45)` }}>
              Expression
            </p>
            {!hasErrors && (
              <span className="px-2 py-0.5 rounded-full" style={{ background: "rgba(167,139,250,0.1)", color: ACCENT, fontSize: "9px", fontWeight: 600, letterSpacing: "0.1em" }}>
                VALID
              </span>
            )}
            {hasErrors && (
              <span className="px-2 py-0.5 rounded-full" style={{ background: "rgba(248,113,113,0.12)", color: "#f87171", fontSize: "9px", fontWeight: 600, letterSpacing: "0.1em" }}>
                INVALID
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <code style={{ fontSize: "clamp(22px,3vw,30px)", color: hasErrors ? "#f87171" : ACCENT, letterSpacing: "0.12em", fontWeight: 700, wordBreak: "break-all" }}>
              {expression}
            </code>
            <button onClick={handleCopy} disabled={hasErrors}
              className="ml-auto flex items-center gap-1.5 px-3 py-2 rounded-[10px] transition-all disabled:opacity-30"
              style={{ color: ACCENT, border: `1px solid ${BORDER}`, fontSize: "11px" }}>
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <p style={{ fontSize: "13px", color: "rgba(226,232,240,0.55)", marginTop: "8px", lineHeight: 1.6 }}>
            {description}
          </p>
        </div>

        <div className="px-6 py-4" style={{ borderBottom: `1px solid ${BORDER}` }}>
          <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: `rgba(167,139,250,0.4)`, marginBottom: "8px" }}>
            Paste / type expression
          </p>
          <input
            value={rawExpr}
            onChange={e => handleRawInput(e.target.value)}
            placeholder={`e.g. 0 9 * * 1-5`}
            className="w-full py-2.5 px-4 rounded-[10px] outline-none text-[14px]"
            style={{
              background: "rgba(167,139,250,0.05)",
              border: `1px solid ${rawError ? "rgba(248,113,113,0.4)" : BORDER}`,
              color: rawError ? "#f87171" : TEXT,
              caretColor: ACCENT,
              letterSpacing: "0.08em",
            }}
            spellCheck={false}
          />
          {rawError && (
            <p style={{ fontSize: "11px", color: "#f87171", marginTop: "5px" }}>
              {rawError}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-x"
          style={{ borderTop: "none" }}>
          {fields.map((field, idx) => {
            const meta = FIELD_META[field];
            const presets = FIELD_PRESETS[field];
            const err = errors[field];
            const isActive = activeField === field;
            return (
              <div key={field}
                onClick={() => setActiveField(isActive ? null : field)}
                style={{
                  padding: "16px 18px",
                  borderRight: idx < fields.length - 1 ? `1px solid ${BORDER}` : "none",
                  borderBottom: "none",
                  background: isActive ? "rgba(167,139,250,0.05)" : "transparent",
                  cursor: "pointer",
                  transition: "background 0.15s",
                }}>
                <div className="flex items-center justify-between mb-1.5">
                  <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: `rgba(167,139,250,0.4)` }}>
                    {meta.label}
                  </p>
                  <span style={{ fontSize: "9px", color: `rgba(167,139,250,0.25)` }}>{meta.range}</span>
                </div>
                <input
                  value={state[field]}
                  onChange={e => { e.stopPropagation(); setField(field, e.target.value); }}
                  onClick={e => e.stopPropagation()}
                  placeholder={meta.placeholder}
                  className="w-full py-1.5 px-2 rounded-[7px] outline-none text-[13px] mb-2.5"
                  style={{
                    background: "rgba(167,139,250,0.06)",
                    border: `1px solid ${err ? "rgba(248,113,113,0.4)" : BORDER}`,
                    color: err ? "#f87171" : ACCENT,
                    caretColor: ACCENT,
                    letterSpacing: "0.07em",
                    fontFamily: "monospace",
                  }}
                  spellCheck={false}
                />
                {err && (
                  <p style={{ fontSize: "10px", color: "#f87171", marginBottom: "6px", lineHeight: 1.4 }}>{err}</p>
                )}
                <div className="flex flex-wrap gap-1">
                  {presets.map(p => (
                    <button key={p.value}
                      onClick={e => { e.stopPropagation(); setField(field, p.value); }}
                      className="px-2 py-0.5 rounded-[5px] text-[10px] transition-all"
                      style={{
                        background: state[field] === p.value ? HIGHLIGHT : "rgba(167,139,250,0.07)",
                        color: state[field] === p.value ? "#ffffff" : `rgba(167,139,250,0.6)`,
                        border: `1px solid ${state[field] === p.value ? HIGHLIGHT : BORDER}`,
                        fontFamily: "monospace",
                        letterSpacing: "0.04em",
                      }}>
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mb-5">
        <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: `rgba(167,139,250,0.4)`, marginBottom: "12px" }}>
          Common Presets
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {COMMON_PRESETS.map(preset => (
            <button key={preset.expr} onClick={() => applyPreset(preset.expr)}
              className="flex items-center justify-between px-4 py-3 rounded-[12px] text-left transition-all hover:scale-[1.01]"
              style={{
                background: expression === preset.expr ? "rgba(167,139,250,0.12)" : PANEL,
                border: `1px solid ${expression === preset.expr ? ACCENT : BORDER}`,
              }}>
              <span style={{ fontSize: "12.5px", color: TEXT, fontFamily: "system-ui, sans-serif" }}>{preset.label}</span>
              <code style={{ fontSize: "11px", color: ACCENT, letterSpacing: "0.06em", marginLeft: "12px", whiteSpace: "nowrap" }}>{preset.expr}</code>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-[16px] overflow-hidden"
        style={{ background: PANEL, border: `1px solid ${BORDER}` }}>
        <div className="px-5 py-3.5" style={{ borderBottom: `1px solid ${BORDER}` }}>
          <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: `rgba(167,139,250,0.4)` }}>
            Platform Notes
          </p>
        </div>
        {[
          { platform: "Linux crontab", note: "Standard 5-field format. Supports L, W, # in some distros (Vixie cron). Run: crontab -e" },
          { platform: "GitHub Actions", note: "Uses UTC. Expression goes in on.schedule[].cron. Minimum interval: 5 minutes. Syntax: uses standard 5-field." },
          { platform: "n8n",            note: "Trigger node → Schedule. Accepts standard cron or visual builder. Timezone configurable per workflow. L may not be supported." },
        ].map(({ platform, note }, i, arr) => (
          <div key={platform} className="px-5 py-3.5 flex gap-4 items-start"
            style={{ borderBottom: i < arr.length - 1 ? `1px solid rgba(167,139,250,0.06)` : "none" }}>
            <code style={{ fontSize: "11px", color: ACCENT, whiteSpace: "nowrap", minWidth: "120px", paddingTop: "1px" }}>{platform}</code>
            <p style={{ fontSize: "12px", color: "rgba(226,232,240,0.45)", lineHeight: 1.65 }}>{note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
