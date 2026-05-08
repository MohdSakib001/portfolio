"use client";
import { useState, useMemo } from "react";

function fmtCurrency(n: number, currency = "$"): string {
  return currency + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function MortgageCalculator() {
  const [amount,   setAmount]   = useState("300000");
  const [rate,     setRate]     = useState("6.5");
  const [years,    setYears]    = useState("30");
  const [downPct,  setDownPct]  = useState("20");
  const [currency, setCurrency] = useState("$");
  const [showAmort, setShowAmort] = useState(false);

  const result = useMemo(() => {
    const P = parseFloat(amount) * (1 - parseFloat(downPct) / 100);
    const annualRate = parseFloat(rate);
    const n = parseFloat(years) * 12;
    if (!P || !annualRate || !n || P <= 0 || annualRate <= 0 || n <= 0) return null;

    const r = annualRate / 100 / 12;
    const monthly = r === 0 ? P / n : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPaid = monthly * n;
    const totalInterest = totalPaid - P;
    const downPayment = parseFloat(amount) * (parseFloat(downPct) / 100);

    // First 12 months amortisation
    let balance = P;
    const schedule: { month: number; principal: number; interest: number; balance: number }[] = [];
    for (let m = 1; m <= Math.min(n, 360); m++) {
      const intPmt = balance * r;
      const prinPmt = monthly - intPmt;
      balance -= prinPmt;
      schedule.push({ month: m, principal: prinPmt, interest: intPmt, balance: Math.max(0, balance) });
    }

    return { monthly, totalPaid, totalInterest, P, downPayment, schedule };
  }, [amount, rate, years, downPct]);

  const inputClass = "w-full rounded-[12px] px-4 py-3 text-[15px] font-semibold tabular-nums outline-none transition-all";
  const inputStyle = { background: "#f8f5ee", border: "1.5px solid rgba(15,39,68,0.1)", color: "#0f2744", fontFamily: "inherit" };

  return (
    <div>
      {/* Inputs */}
      <div className="rounded-[20px] p-7 mb-3"
        style={{ background: "#ffffff", boxShadow: "0 0 0 1px rgba(15,39,68,0.08), 0 4px 24px rgba(15,39,68,0.05)" }}>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 sm:col-span-1">
            <label className="block mb-1.5 text-[10px] uppercase tracking-[0.12em] font-bold" style={{ color: "rgba(15,39,68,0.45)" }}>
              Home Price
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[15px] font-semibold" style={{ color: "rgba(15,39,68,0.3)" }}>{currency}</span>
              <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="300000"
                className={inputClass + " pl-8"} style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = "#1d4ed8")}
                onBlur={e => (e.currentTarget.style.borderColor = "rgba(15,39,68,0.1)")} />
            </div>
          </div>
          <div>
            <label className="block mb-1.5 text-[10px] uppercase tracking-[0.12em] font-bold" style={{ color: "rgba(15,39,68,0.45)" }}>
              Down Payment (%)
            </label>
            <div className="relative">
              <input type="number" value={downPct} onChange={e => setDownPct(e.target.value)} placeholder="20"
                className={inputClass + " pr-8"} style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = "#1d4ed8")}
                onBlur={e => (e.currentTarget.style.borderColor = "rgba(15,39,68,0.1)")} />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[14px] font-semibold" style={{ color: "rgba(15,39,68,0.3)" }}>%</span>
            </div>
          </div>
          <div>
            <label className="block mb-1.5 text-[10px] uppercase tracking-[0.12em] font-bold" style={{ color: "rgba(15,39,68,0.45)" }}>
              Annual Interest Rate
            </label>
            <div className="relative">
              <input type="number" value={rate} onChange={e => setRate(e.target.value)} placeholder="6.5" step="0.1"
                className={inputClass + " pr-8"} style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = "#1d4ed8")}
                onBlur={e => (e.currentTarget.style.borderColor = "rgba(15,39,68,0.1)")} />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[14px] font-semibold" style={{ color: "rgba(15,39,68,0.3)" }}>%</span>
            </div>
          </div>
          <div>
            <label className="block mb-1.5 text-[10px] uppercase tracking-[0.12em] font-bold" style={{ color: "rgba(15,39,68,0.45)" }}>
              Loan Term (Years)
            </label>
            <div className="flex gap-1.5">
              {[10, 15, 20, 30].map(y => (
                <button key={y} onClick={() => setYears(String(y))}
                  className="flex-1 py-3 rounded-[10px] text-[12px] font-bold transition-all"
                  style={{ background: years === String(y) ? "#0f2744" : "#f8f5ee", color: years === String(y) ? "#ffffff" : "rgba(15,39,68,0.5)", border: "1.5px solid transparent" }}>
                  {y}yr
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block mb-1.5 text-[10px] uppercase tracking-[0.12em] font-bold" style={{ color: "rgba(15,39,68,0.45)" }}>Currency</label>
            <select value={currency} onChange={e => setCurrency(e.target.value)} className={inputClass} style={inputStyle}>
              {["$", "£", "€", "₹", "¥", "A$", "C$"].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      {result ? (
        <>
          {/* Monthly payment hero */}
          <div className="rounded-[20px] p-7 mb-3 text-center"
            style={{ background: "linear-gradient(135deg, #0f2744, #1d4ed8)", boxShadow: "0 8px 40px rgba(15,39,68,0.3)" }}>
            <p className="text-[11px] uppercase tracking-[0.15em] font-bold mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
              Monthly Payment
            </p>
            <p className="font-bold tabular-nums" style={{ fontSize: "clamp(40px,10vw,60px)", color: "#ffffff", lineHeight: 1 }}>
              {fmtCurrency(result.monthly, currency)}
            </p>
            <p className="mt-2 text-[12px]" style={{ color: "rgba(255,255,255,0.5)" }}>
              principal + interest only
            </p>
          </div>

          {/* Breakdown cards */}
          <div className="grid grid-cols-3 gap-2.5 mb-3">
            {[
              { label: "Loan Amount",     val: fmtCurrency(result.P, currency),            color: "#1d4ed8" },
              { label: "Down Payment",    val: fmtCurrency(result.downPayment, currency),   color: "#059669" },
              { label: "Total Interest",  val: fmtCurrency(result.totalInterest, currency), color: "#dc2626" },
            ].map(({ label, val, color }) => (
              <div key={label} className="rounded-[14px] p-4 text-center"
                style={{ background: "#ffffff", boxShadow: "0 0 0 1px rgba(15,39,68,0.07)" }}>
                <p className="font-bold tabular-nums text-[13.5px] mb-1" style={{ color }}>{val}</p>
                <p className="text-[9px] uppercase tracking-[0.1em] font-semibold" style={{ color: "rgba(15,39,68,0.4)" }}>{label}</p>
              </div>
            ))}
          </div>

          {/* Interest vs principal bar */}
          <div className="rounded-[16px] p-5 mb-3" style={{ background: "#ffffff", boxShadow: "0 0 0 1px rgba(15,39,68,0.07)" }}>
            <p className="text-[10px] uppercase tracking-[0.12em] font-bold mb-3" style={{ color: "rgba(15,39,68,0.4)" }}>
              Total Cost Breakdown
            </p>
            <div className="flex h-3 rounded-full overflow-hidden mb-2">
              <div style={{ flex: result.P, background: "#1d4ed8" }} />
              <div style={{ flex: result.totalInterest, background: "#dc2626" }} />
            </div>
            <div className="flex gap-4 text-[11px]">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#1d4ed8]" />Principal ({((result.P / result.totalPaid) * 100).toFixed(0)}%)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#dc2626]" />Interest ({((result.totalInterest / result.totalPaid) * 100).toFixed(0)}%)</span>
            </div>
          </div>

          {/* Amortisation toggle */}
          <button onClick={() => setShowAmort(v => !v)}
            className="w-full py-3 rounded-[14px] text-[12px] font-semibold transition-all mb-2"
            style={{ background: "rgba(15,39,68,0.05)", color: "rgba(15,39,68,0.6)", border: "1px solid rgba(15,39,68,0.08)" }}>
            {showAmort ? "▲ Hide" : "▼ Show"} Amortization Schedule
          </button>

          {showAmort && (
            <div className="rounded-[16px] overflow-hidden" style={{ boxShadow: "0 0 0 1px rgba(15,39,68,0.08)", maxHeight: "400px", overflowY: "auto" }}>
              <table className="w-full text-left" style={{ background: "#ffffff" }}>
                <thead className="sticky top-0" style={{ background: "#0f2744" }}>
                  <tr>
                    {["Month", "Principal", "Interest", "Balance"].map(h => (
                      <th key={h} className="px-4 py-3 text-[9px] uppercase tracking-[0.1em] font-bold" style={{ color: "rgba(255,255,255,0.6)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.schedule.map(({ month, principal, interest, balance }) => (
                    <tr key={month} style={{ borderBottom: "1px solid rgba(15,39,68,0.04)" }}>
                      <td className="px-4 py-2.5 font-mono" style={{ fontSize: "12px", color: "rgba(15,39,68,0.5)" }}>{month}</td>
                      <td className="px-4 py-2.5 font-mono text-[#1d4ed8]" style={{ fontSize: "12px" }}>{fmtCurrency(principal, currency)}</td>
                      <td className="px-4 py-2.5 font-mono text-[#dc2626]" style={{ fontSize: "12px" }}>{fmtCurrency(interest, currency)}</td>
                      <td className="px-4 py-2.5 font-mono" style={{ fontSize: "12px", color: "#0f2744" }}>{fmtCurrency(balance, currency)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : (
        <div className="rounded-[16px] px-8 py-10 text-center"
          style={{ background: "#ffffff", boxShadow: "0 0 0 1px rgba(15,39,68,0.06)" }}>
          <p style={{ fontSize: "13px", color: "rgba(15,39,68,0.4)" }}>Fill in the fields above to calculate your mortgage.</p>
        </div>
      )}
    </div>
  );
}
