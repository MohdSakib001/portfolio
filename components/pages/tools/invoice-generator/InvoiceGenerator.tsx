"use client";
import { useState, useEffect, useCallback } from "react";

type LineItem = {
  id: number;
  description: string;
  qty: string;
  unitPrice: string;
};

type InvoiceData = {
  fromName: string;
  fromEmail: string;
  fromAddress: string;
  toName: string;
  toEmail: string;
  toAddress: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  items: LineItem[];
  discount: string;
  tax: string;
  notes: string;
  currency: string;
};

const CURRENCIES: Record<string, { symbol: string; label: string }> = {
  USD: { symbol: "$", label: "USD — US Dollar" },
  EUR: { symbol: "€", label: "EUR — Euro" },
  GBP: { symbol: "£", label: "GBP — British Pound" },
  INR: { symbol: "₹", label: "INR — Indian Rupee" },
  AED: { symbol: "د.إ", label: "AED — UAE Dirham" },
};

function today(): string {
  return new Date().toISOString().split("T")[0];
}

function fmt(n: number, symbol: string): string {
  return symbol + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

let nextId = 1;

export default function InvoiceGenerator() {
  const [data, setData] = useState<InvoiceData>({
    fromName: "",
    fromEmail: "",
    fromAddress: "",
    toName: "",
    toEmail: "",
    toAddress: "",
    invoiceNumber: "INV-001",
    issueDate: today(),
    dueDate: "",
    items: [{ id: nextId++, description: "", qty: "1", unitPrice: "" }],
    discount: "0",
    tax: "0",
    notes: "",
    currency: "USD",
  });

  useEffect(() => {
    const style = document.createElement("style");
    style.id = "invoice-print-style";
    style.textContent = `@media print {body * {visibility:hidden;}#invoice-preview,#invoice-preview *{visibility:visible;}#invoice-preview{position:absolute;left:0;top:0;width:100%;}}`;
    document.head.appendChild(style);
    return () => {
      const el = document.getElementById("invoice-print-style");
      if (el) el.remove();
    };
  }, []);

  const set = useCallback(<K extends keyof InvoiceData>(key: K, value: InvoiceData[K]) => {
    setData(prev => ({ ...prev, [key]: value }));
  }, []);

  const setItem = useCallback((id: number, field: keyof LineItem, value: string) => {
    setData(prev => ({
      ...prev,
      items: prev.items.map(item => item.id === id ? { ...item, [field]: value } : item),
    }));
  }, []);

  const addItem = useCallback(() => {
    setData(prev => ({
      ...prev,
      items: [...prev.items, { id: nextId++, description: "", qty: "1", unitPrice: "" }],
    }));
  }, []);

  const removeItem = useCallback((id: number) => {
    setData(prev => ({
      ...prev,
      items: prev.items.length > 1 ? prev.items.filter(i => i.id !== id) : prev.items,
    }));
  }, []);

  const symbol = CURRENCIES[data.currency]?.symbol ?? "$";

  const itemTotals = data.items.map(item => {
    const q = parseFloat(item.qty) || 0;
    const p = parseFloat(item.unitPrice) || 0;
    return q * p;
  });

  const subtotal = itemTotals.reduce((a, b) => a + b, 0);
  const discountAmt = subtotal * (parseFloat(data.discount) || 0) / 100;
  const taxAmt = (subtotal - discountAmt) * (parseFloat(data.tax) || 0) / 100;
  const total = subtotal - discountAmt + taxAmt;

  const labelStyle: React.CSSProperties = {
    display: "block",
    marginBottom: "5px",
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "rgba(15,23,42,0.45)",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "#f8fafc",
    border: "1.5px solid #e2e8f0",
    borderRadius: "10px",
    padding: "10px 13px",
    fontSize: "13.5px",
    color: "#0f172a",
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.15s",
  };

  const sectionStyle: React.CSSProperties = {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "22px",
    marginBottom: "14px",
    boxShadow: "0 0 0 1px rgba(15,23,42,0.07), 0 2px 12px rgba(15,23,42,0.04)",
  };

  const sectionHead: React.CSSProperties = {
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.13em",
    textTransform: "uppercase",
    color: "#1e40af",
    marginBottom: "14px",
    paddingBottom: "10px",
    borderBottom: "1px solid #e2e8f0",
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "#1e40af";
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "#e2e8f0";
  };

  const issueFormatted = data.issueDate
    ? new Date(data.issueDate + "T00:00:00").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "—";
  const dueFormatted = data.dueDate
    ? new Date(data.dueDate + "T00:00:00").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "—";

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px", alignItems: "start" }}
      className="invoice-grid">
      <style>{`
        @media (max-width: 900px) {
          .invoice-grid { grid-template-columns: 1fr !important; }
        }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=date]::-webkit-calendar-picker-indicator { opacity: 0.4; cursor: pointer; }
      `}</style>

      {/* ── LEFT PANEL: FORM ── */}
      <div>
        {/* FROM */}
        <div style={sectionStyle}>
          <p style={sectionHead}>From (Your Info)</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div>
              <label style={labelStyle}>Name / Company</label>
              <input style={inputStyle} value={data.fromName} onChange={e => set("fromName", e.target.value)}
                onFocus={handleFocus} onBlur={handleBlur} placeholder="Acme Inc." />
            </div>
            <div>
              <label style={labelStyle}>Email</label>
              <input style={inputStyle} type="email" value={data.fromEmail} onChange={e => set("fromEmail", e.target.value)}
                onFocus={handleFocus} onBlur={handleBlur} placeholder="hello@acme.com" />
            </div>
            <div>
              <label style={labelStyle}>Address</label>
              <textarea style={{ ...inputStyle, resize: "vertical", minHeight: "64px" }} value={data.fromAddress}
                onChange={e => set("fromAddress", e.target.value)}
                onFocus={handleFocus} onBlur={handleBlur} placeholder="123 Main St, City, Country" />
            </div>
          </div>
        </div>

        {/* TO */}
        <div style={sectionStyle}>
          <p style={sectionHead}>To (Client Info)</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div>
              <label style={labelStyle}>Client Name / Company</label>
              <input style={inputStyle} value={data.toName} onChange={e => set("toName", e.target.value)}
                onFocus={handleFocus} onBlur={handleBlur} placeholder="Client Corp." />
            </div>
            <div>
              <label style={labelStyle}>Client Email</label>
              <input style={inputStyle} type="email" value={data.toEmail} onChange={e => set("toEmail", e.target.value)}
                onFocus={handleFocus} onBlur={handleBlur} placeholder="client@example.com" />
            </div>
            <div>
              <label style={labelStyle}>Client Address</label>
              <textarea style={{ ...inputStyle, resize: "vertical", minHeight: "64px" }} value={data.toAddress}
                onChange={e => set("toAddress", e.target.value)}
                onFocus={handleFocus} onBlur={handleBlur} placeholder="456 Client Ave, City, Country" />
            </div>
          </div>
        </div>

        {/* INVOICE META */}
        <div style={sectionStyle}>
          <p style={sectionHead}>Invoice Details</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <label style={labelStyle}>Invoice #</label>
              <input style={inputStyle} value={data.invoiceNumber} onChange={e => set("invoiceNumber", e.target.value)}
                onFocus={handleFocus} onBlur={handleBlur} placeholder="INV-001" />
            </div>
            <div>
              <label style={labelStyle}>Currency</label>
              <select style={{ ...inputStyle, cursor: "pointer" }} value={data.currency}
                onChange={e => set("currency", e.target.value)} onFocus={handleFocus} onBlur={handleBlur}>
                {Object.entries(CURRENCIES).map(([code, { label }]) => (
                  <option key={code} value={code}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Issue Date</label>
              <input style={inputStyle} type="date" value={data.issueDate} onChange={e => set("issueDate", e.target.value)}
                onFocus={handleFocus} onBlur={handleBlur} />
            </div>
            <div>
              <label style={labelStyle}>Due Date</label>
              <input style={inputStyle} type="date" value={data.dueDate} onChange={e => set("dueDate", e.target.value)}
                onFocus={handleFocus} onBlur={handleBlur} />
            </div>
          </div>
        </div>

        {/* LINE ITEMS */}
        <div style={sectionStyle}>
          <p style={sectionHead}>Line Items</p>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12.5px" }}>
              <thead>
                <tr>
                  {["Description", "Qty", "Unit Price", "Total", ""].map(h => (
                    <th key={h} style={{
                      textAlign: h === "Total" || h === "" ? "right" : "left",
                      padding: "0 6px 8px",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "rgba(15,23,42,0.4)",
                      whiteSpace: "nowrap",
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.items.map((item, idx) => {
                  const rowTotal = (parseFloat(item.qty) || 0) * (parseFloat(item.unitPrice) || 0);
                  return (
                    <tr key={item.id} style={{ borderTop: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "6px 6px 6px 0", width: "45%" }}>
                        <input style={{ ...inputStyle, padding: "8px 10px", fontSize: "12.5px" }}
                          value={item.description} onChange={e => setItem(item.id, "description", e.target.value)}
                          onFocus={handleFocus} onBlur={handleBlur} placeholder={`Item ${idx + 1}`} />
                      </td>
                      <td style={{ padding: "6px", width: "12%" }}>
                        <input style={{ ...inputStyle, padding: "8px 10px", fontSize: "12.5px", textAlign: "center" }}
                          type="number" value={item.qty} onChange={e => setItem(item.id, "qty", e.target.value)}
                          onFocus={handleFocus} onBlur={handleBlur} placeholder="1" min="0" />
                      </td>
                      <td style={{ padding: "6px", width: "20%" }}>
                        <input style={{ ...inputStyle, padding: "8px 10px", fontSize: "12.5px", textAlign: "right" }}
                          type="number" value={item.unitPrice} onChange={e => setItem(item.id, "unitPrice", e.target.value)}
                          onFocus={handleFocus} onBlur={handleBlur} placeholder="0.00" min="0" />
                      </td>
                      <td style={{ padding: "6px", width: "18%", textAlign: "right", fontWeight: 600, color: "#0f172a", whiteSpace: "nowrap" }}>
                        {fmt(rowTotal, symbol)}
                      </td>
                      <td style={{ padding: "6px 0 6px 4px", width: "5%", textAlign: "right" }}>
                        <button onClick={() => removeItem(item.id)}
                          style={{ background: "none", border: "none", cursor: "pointer", color: "#dc2626", fontSize: "16px", lineHeight: 1, padding: "2px 4px", opacity: data.items.length === 1 ? 0.25 : 0.7 }}
                          disabled={data.items.length === 1} title="Remove row">×</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <button onClick={addItem}
            style={{ marginTop: "12px", padding: "8px 16px", borderRadius: "8px", border: "1.5px dashed #1e40af", background: "none", color: "#1e40af", fontSize: "12px", fontWeight: 600, cursor: "pointer", transition: "background 0.15s" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#eff6ff")}
            onMouseLeave={e => (e.currentTarget.style.background = "none")}>
            + Add Line Item
          </button>
        </div>

        {/* TOTALS INPUTS */}
        <div style={sectionStyle}>
          <p style={sectionHead}>Adjustments</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <label style={labelStyle}>Discount (%)</label>
              <div style={{ position: "relative" }}>
                <input style={{ ...inputStyle, paddingRight: "28px" }} type="number"
                  value={data.discount} onChange={e => set("discount", e.target.value)}
                  onFocus={handleFocus} onBlur={handleBlur} placeholder="0" min="0" max="100" />
                <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "rgba(15,23,42,0.35)", fontSize: "13px" }}>%</span>
              </div>
            </div>
            <div>
              <label style={labelStyle}>Tax (%)</label>
              <div style={{ position: "relative" }}>
                <input style={{ ...inputStyle, paddingRight: "28px" }} type="number"
                  value={data.tax} onChange={e => set("tax", e.target.value)}
                  onFocus={handleFocus} onBlur={handleBlur} placeholder="0" min="0" max="30" />
                <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "rgba(15,23,42,0.35)", fontSize: "13px" }}>%</span>
              </div>
            </div>
          </div>
        </div>

        {/* NOTES */}
        <div style={sectionStyle}>
          <p style={sectionHead}>Notes / Terms</p>
          <textarea style={{ ...inputStyle, resize: "vertical", minHeight: "88px" }}
            value={data.notes} onChange={e => set("notes", e.target.value)}
            onFocus={handleFocus} onBlur={handleBlur}
            placeholder="Payment due within 30 days. Bank transfer preferred. Thank you for your business!" />
        </div>

        {/* PRINT BUTTON */}
        <button onClick={() => window.print()}
          style={{ width: "100%", padding: "14px", borderRadius: "12px", border: "none", background: "linear-gradient(135deg, #1e40af, #1d4ed8)", color: "#ffffff", fontSize: "14px", fontWeight: 700, cursor: "pointer", letterSpacing: "0.03em", boxShadow: "0 4px 16px rgba(30,64,175,0.35)", transition: "opacity 0.15s" }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.87")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
          Print / Save as PDF
        </button>
      </div>

      {/* ── RIGHT PANEL: LIVE PREVIEW ── */}
      <div style={{ position: "sticky", top: "80px" }}>
        <div id="invoice-preview" style={{
          background: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 0 0 1px rgba(15,23,42,0.1), 0 8px 40px rgba(15,23,42,0.1)",
          overflow: "hidden",
          fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
        }}>
          {/* Invoice header */}
          <div style={{ background: "#0f172a", padding: "32px 36px 28px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", marginBottom: "6px" }}>Invoice</p>
                <p style={{ fontSize: "22px", fontWeight: 700, color: "#ffffff", letterSpacing: "-0.01em" }}>
                  {data.fromName || "Your Company"}
                </p>
                {data.fromEmail && (
                  <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginTop: "4px" }}>{data.fromEmail}</p>
                )}
                {data.fromAddress && (
                  <p style={{ fontSize: "11.5px", color: "rgba(255,255,255,0.4)", marginTop: "3px", whiteSpace: "pre-line" }}>{data.fromAddress}</p>
                )}
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: "26px", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.02em" }}>INVOICE</p>
                <p style={{ fontSize: "13px", fontWeight: 600, color: "#93c5fd", marginTop: "6px" }}>{data.invoiceNumber || "INV-001"}</p>
              </div>
            </div>
          </div>

          {/* Billed to + dates */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0", borderBottom: "1px solid #e2e8f0" }}>
            <div style={{ padding: "22px 28px", borderRight: "1px solid #e2e8f0" }}>
              <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#1e40af", marginBottom: "10px" }}>Billed To</p>
              <p style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>{data.toName || "Client Name"}</p>
              {data.toEmail && <p style={{ fontSize: "12px", color: "rgba(15,23,42,0.55)", marginBottom: "3px" }}>{data.toEmail}</p>}
              {data.toAddress && <p style={{ fontSize: "11.5px", color: "rgba(15,23,42,0.45)", whiteSpace: "pre-line", lineHeight: 1.5 }}>{data.toAddress}</p>}
            </div>
            <div style={{ padding: "22px 28px" }}>
              <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#1e40af", marginBottom: "10px" }}>Details</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "11px", color: "rgba(15,23,42,0.45)", fontWeight: 600 }}>Issue Date</span>
                  <span style={{ fontSize: "11px", color: "#0f172a", fontWeight: 600 }}>{issueFormatted}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "11px", color: "rgba(15,23,42,0.45)", fontWeight: 600 }}>Due Date</span>
                  <span style={{ fontSize: "11px", color: data.dueDate ? "#0f172a" : "rgba(15,23,42,0.3)", fontWeight: 600 }}>{dueFormatted}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "11px", color: "rgba(15,23,42,0.45)", fontWeight: 600 }}>Currency</span>
                  <span style={{ fontSize: "11px", color: "#0f172a", fontWeight: 600 }}>{data.currency}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Line items */}
          <div style={{ padding: "0 0 8px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  <th style={{ padding: "12px 28px", textAlign: "left", fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(15,23,42,0.4)" }}>Description</th>
                  <th style={{ padding: "12px 10px", textAlign: "center", fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(15,23,42,0.4)" }}>Qty</th>
                  <th style={{ padding: "12px 10px", textAlign: "right", fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(15,23,42,0.4)" }}>Unit Price</th>
                  <th style={{ padding: "12px 28px 12px 10px", textAlign: "right", fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(15,23,42,0.4)" }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {data.items.map((item, idx) => {
                  const rowTotal = (parseFloat(item.qty) || 0) * (parseFloat(item.unitPrice) || 0);
                  return (
                    <tr key={item.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "11px 28px", fontSize: "12.5px", color: "#0f172a" }}>
                        {item.description || <span style={{ color: "rgba(15,23,42,0.25)" }}>Item {idx + 1}</span>}
                      </td>
                      <td style={{ padding: "11px 10px", textAlign: "center", fontSize: "12px", color: "rgba(15,23,42,0.6)" }}>
                        {item.qty || "—"}
                      </td>
                      <td style={{ padding: "11px 10px", textAlign: "right", fontSize: "12px", color: "rgba(15,23,42,0.6)" }}>
                        {item.unitPrice ? fmt(parseFloat(item.unitPrice) || 0, symbol) : "—"}
                      </td>
                      <td style={{ padding: "11px 28px 11px 10px", textAlign: "right", fontSize: "12.5px", fontWeight: 600, color: "#0f172a" }}>
                        {fmt(rowTotal, symbol)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div style={{ borderTop: "2px solid #e2e8f0", padding: "18px 28px 0" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxWidth: "280px", marginLeft: "auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "12px", color: "rgba(15,23,42,0.5)" }}>Subtotal</span>
                <span style={{ fontSize: "12px", fontWeight: 600, color: "#0f172a" }}>{fmt(subtotal, symbol)}</span>
              </div>
              {parseFloat(data.discount) > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "12px", color: "rgba(15,23,42,0.5)" }}>Discount ({data.discount}%)</span>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "#dc2626" }}>− {fmt(discountAmt, symbol)}</span>
                </div>
              )}
              {parseFloat(data.tax) > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "12px", color: "rgba(15,23,42,0.5)" }}>Tax ({data.tax}%)</span>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "#0f172a" }}>+ {fmt(taxAmt, symbol)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Total highlight */}
          <div style={{ margin: "14px 28px 20px", borderRadius: "12px", background: "linear-gradient(135deg, #1e40af, #1d4ed8)", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "13px", fontWeight: 700, color: "rgba(255,255,255,0.75)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Total Due</span>
            <span style={{ fontSize: "22px", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.01em" }}>{fmt(total, symbol)}</span>
          </div>

          {/* Notes */}
          {data.notes && (
            <div style={{ margin: "0 28px 24px", padding: "14px 18px", background: "#f8fafc", borderRadius: "10px", borderLeft: "3px solid #1e40af" }}>
              <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: "#1e40af", marginBottom: "6px" }}>Notes &amp; Terms</p>
              <p style={{ fontSize: "11.5px", color: "rgba(15,23,42,0.55)", lineHeight: 1.65, whiteSpace: "pre-line" }}>{data.notes}</p>
            </div>
          )}

          {/* Footer */}
          <div style={{ borderTop: "1px solid #e2e8f0", padding: "14px 28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontSize: "10px", color: "rgba(15,23,42,0.3)", fontWeight: 500 }}>
              {data.invoiceNumber || "INV-001"} · {issueFormatted}
            </p>
            <p style={{ fontSize: "10px", color: "rgba(15,23,42,0.25)" }}>Thank you for your business</p>
          </div>
        </div>
      </div>
    </div>
  );
}
