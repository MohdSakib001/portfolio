"use client";
import { useState, useCallback } from "react";
import { Copy, Check, Plus, Trash2, Zap } from "lucide-react";

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
type Tab = "preview" | "curl" | "fetch";

const METHOD_COLORS: Record<Method, string> = {
  GET: "#4ade80",
  POST: "#3b82f6",
  PUT: "#f59e0b",
  DELETE: "#ef4444",
  PATCH: "#a78bfa",
};

const STATUS_CODES = [200, 201, 204, 400, 401, 403, 404, 500];

const STATUS_COLOR = (code: number) => {
  if (code >= 500) return "#ef4444";
  if (code >= 400) return "#f59e0b";
  if (code >= 300) return "#3b82f6";
  return "#22c55e";
};

const PRESETS = [
  {
    label: "GET /users",
    method: "GET" as Method,
    path: "/api/users",
    status: 200,
    headers: [{ key: "Content-Type", value: "application/json" }],
    body: JSON.stringify(
      [
        { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "admin", createdAt: "2024-01-15T08:30:00Z" },
        { id: 2, name: "Bob Smith", email: "bob@example.com", role: "user", createdAt: "2024-02-20T14:15:00Z" },
      ],
      null,
      2
    ),
    delay: 0,
  },
  {
    label: "POST /login",
    method: "POST" as Method,
    path: "/api/auth/login",
    status: 200,
    headers: [{ key: "Content-Type", value: "application/json" }],
    body: JSON.stringify(
      { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U", user: { id: 1, name: "Alice Johnson", email: "alice@example.com" }, expiresIn: 3600 },
      null,
      2
    ),
    delay: 150,
  },
  {
    label: "GET /products",
    method: "GET" as Method,
    path: "/api/products",
    status: 200,
    headers: [{ key: "Content-Type", value: "application/json" }],
    body: JSON.stringify(
      {
        data: [
          { id: "prod_001", name: "Wireless Headphones", price: 79.99, currency: "USD", inStock: true, category: "electronics" },
          { id: "prod_002", name: "Mechanical Keyboard", price: 149.99, currency: "USD", inStock: false, category: "electronics" },
        ],
        total: 2,
        page: 1,
        perPage: 20,
      },
      null,
      2
    ),
    delay: 0,
  },
];

function generateSample(path: string): string {
  const lower = path.toLowerCase();
  if (lower.includes("user") || lower.includes("auth") || lower.includes("login") || lower.includes("account")) {
    return JSON.stringify({ id: 1, name: "Alice Johnson", email: "alice@example.com", role: "user", createdAt: "2024-01-15T08:30:00Z", updatedAt: "2024-06-10T12:00:00Z" }, null, 2);
  }
  if (lower.includes("product") || lower.includes("item") || lower.includes("catalog")) {
    return JSON.stringify({ id: "prod_001", name: "Sample Product", price: 49.99, currency: "USD", inStock: true, category: "general", rating: 4.5, reviewCount: 128 }, null, 2);
  }
  if (lower.includes("order") || lower.includes("cart") || lower.includes("checkout")) {
    return JSON.stringify({ id: "ord_abc123", status: "processing", total: 129.98, currency: "USD", items: [{ productId: "prod_001", quantity: 2, price: 49.99 }], createdAt: "2024-06-10T09:00:00Z" }, null, 2);
  }
  return JSON.stringify({ id: 1, message: "Success", data: { field: "value" }, timestamp: new Date().toISOString(), status: "ok" }, null, 2);
}

function colorizeJson(json: string): string {
  return json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"([^"]+)"(\s*:)/g, '<span style="color:#a78bfa">"$1"</span>$2')
    .replace(/:\s*"([^"]*)"/g, ': <span style="color:#86efac">"$1"</span>')
    .replace(/:\s*(\d+\.?\d*)/g, ': <span style="color:#f59e0b">$1</span>')
    .replace(/:\s*(true|false)/g, ': <span style="color:#38bdf8">$1</span>')
    .replace(/:\s*(null)/g, ': <span style="color:#94a3b8">$1</span>');
}

function buildCurl(method: Method, path: string, headers: { key: string; value: string }[], body: string, delay: number): string {
  const url = `http://localhost:3000${path}`;
  const headerFlags = headers.filter(h => h.key && h.value).map(h => `\\\n  -H "${h.key}: ${h.value}"`).join(" ");
  const bodyFlag = ["POST", "PUT", "PATCH"].includes(method) && body.trim() ? `\\\n  -d '${body.replace(/'/g, "\\'")}'` : "";
  const delayNote = delay > 0 ? `\n# Note: response delay set to ${delay}ms (simulated)\n` : "";
  return `${delayNote}curl -X ${method} "${url}" ${headerFlags}${bodyFlag}`.trim();
}

function buildFetch(method: Method, path: string, headers: { key: string; value: string }[], body: string, delay: number): string {
  const url = `http://localhost:3000${path}`;
  const headerObj = headers.filter(h => h.key && h.value).reduce((acc, h) => ({ ...acc, [h.key]: h.value }), {});
  const hasBody = ["POST", "PUT", "PATCH"].includes(method) && body.trim();
  const delayLine = delay > 0 ? `await new Promise(r => setTimeout(r, ${delay}));\n\n` : "";
  const bodyLine = hasBody ? `,\n  body: JSON.stringify(${body}),` : "";
  return `${delayLine}const response = await fetch("${url}", {
  method: "${method}",
  headers: ${JSON.stringify(headerObj, null, 2).replace(/\n/g, "\n  ")}${bodyLine}
});

const data = await response.json();
console.log(data);`;
}

export default function ApiMockBuilder() {
  const [method, setMethod] = useState<Method>("GET");
  const [path, setPath] = useState("/api/users/:id");
  const [statusCode, setStatusCode] = useState(200);
  const [customStatus, setCustomStatus] = useState("");
  const [useCustomStatus, setUseCustomStatus] = useState(false);
  const [headers, setHeaders] = useState([{ key: "Content-Type", value: "application/json" }]);
  const [body, setBody] = useState(JSON.stringify({ id: 1, name: "Alice Johnson", email: "alice@example.com" }, null, 2));
  const [delay, setDelay] = useState(0);
  const [activeTab, setActiveTab] = useState<Tab>("preview");
  const [copied, setCopied] = useState(false);
  const [jsonError, setJsonError] = useState("");

  const effectiveStatus = useCustomStatus ? parseInt(customStatus) || statusCode : statusCode;

  const handleBodyChange = (val: string) => {
    setBody(val);
    if (!val.trim()) { setJsonError(""); return; }
    try { JSON.parse(val); setJsonError(""); }
    catch (e: unknown) { setJsonError(e instanceof SyntaxError ? e.message : "Invalid JSON"); }
  };

  const addHeader = () => setHeaders(h => [...h, { key: "", value: "" }]);
  const removeHeader = (i: number) => setHeaders(h => h.filter((_, idx) => idx !== i));
  const updateHeader = (i: number, field: "key" | "value", val: string) =>
    setHeaders(h => h.map((row, idx) => idx === i ? { ...row, [field]: val } : row));

  const handleGenerateSample = () => {
    setBody(generateSample(path));
    setJsonError("");
  };

  const loadPreset = (preset: typeof PRESETS[0]) => {
    setMethod(preset.method);
    setPath(preset.path);
    setStatusCode(preset.status);
    setUseCustomStatus(false);
    setCustomStatus("");
    setHeaders(preset.headers);
    setBody(preset.body);
    setDelay(preset.delay);
    setJsonError("");
  };

  const getTabContent = useCallback(() => {
    if (activeTab === "curl") return buildCurl(method, path, headers, body, delay);
    if (activeTab === "fetch") return buildFetch(method, path, headers, body, delay);
    return body;
  }, [activeTab, method, path, headers, body, delay]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(getTabContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const parsedJson = (() => {
    try { return JSON.stringify(JSON.parse(body), null, 2); }
    catch { return body; }
  })();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {PRESETS.map(p => (
          <button key={p.label} onClick={() => loadPreset(p)}
            style={{ padding: "6px 14px", borderRadius: "8px", fontSize: "11px", fontFamily: "monospace", fontWeight: 600, cursor: "pointer", background: "rgba(124,58,237,0.1)", color: "#a78bfa", border: "1px solid rgba(124,58,237,0.25)", transition: "all 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(124,58,237,0.2)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(124,58,237,0.1)"; }}>
            {p.label}
          </button>
        ))}
        <button onClick={handleGenerateSample}
          style={{ padding: "6px 14px", borderRadius: "8px", fontSize: "11px", fontFamily: "monospace", fontWeight: 600, cursor: "pointer", background: "rgba(251,191,36,0.1)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.25)", display: "flex", alignItems: "center", gap: "6px", transition: "all 0.15s" }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(251,191,36,0.2)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(251,191,36,0.1)"; }}>
          <Zap size={11} /> Generate Sample
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", alignItems: "start" }}>
        <div style={{ background: "#221b2e", borderRadius: "16px", border: "1px solid rgba(124,58,237,0.18)", overflow: "hidden" }}>
          <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(124,58,237,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "10px", fontFamily: "monospace", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(167,139,250,0.5)" }}>Configuration</span>
          </div>

          <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ fontSize: "10px", fontFamily: "monospace", fontWeight: 600, color: "rgba(167,139,250,0.5)", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "8px" }}>HTTP Method</label>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {(Object.keys(METHOD_COLORS) as Method[]).map(m => (
                  <button key={m} onClick={() => setMethod(m)}
                    style={{ padding: "5px 12px", borderRadius: "7px", fontSize: "11px", fontFamily: "monospace", fontWeight: 700, cursor: "pointer", transition: "all 0.15s", background: method === m ? `${METHOD_COLORS[m]}22` : "rgba(255,255,255,0.04)", color: method === m ? METHOD_COLORS[m] : "rgba(255,255,255,0.35)", border: `1.5px solid ${method === m ? METHOD_COLORS[m] + "66" : "rgba(255,255,255,0.08)"}` }}>
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: "10px", fontFamily: "monospace", fontWeight: 600, color: "rgba(167,139,250,0.5)", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "8px" }}>URL / Path</label>
              <input value={path} onChange={e => setPath(e.target.value)} placeholder="/api/users/:id"
                style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1.5px solid rgba(124,58,237,0.2)", borderRadius: "9px", padding: "9px 12px", fontSize: "13px", fontFamily: "monospace", color: "#e2e8f0", outline: "none", boxSizing: "border-box" }} />
            </div>

            <div>
              <label style={{ fontSize: "10px", fontFamily: "monospace", fontWeight: 600, color: "rgba(167,139,250,0.5)", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "8px" }}>Status Code</label>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "8px" }}>
                {STATUS_CODES.map(s => (
                  <button key={s} onClick={() => { setStatusCode(s); setUseCustomStatus(false); }}
                    style={{ padding: "5px 11px", borderRadius: "7px", fontSize: "11px", fontFamily: "monospace", fontWeight: 700, cursor: "pointer", transition: "all 0.15s", background: !useCustomStatus && statusCode === s ? `${STATUS_COLOR(s)}22` : "rgba(255,255,255,0.04)", color: !useCustomStatus && statusCode === s ? STATUS_COLOR(s) : "rgba(255,255,255,0.35)", border: `1.5px solid ${!useCustomStatus && statusCode === s ? STATUS_COLOR(s) + "55" : "rgba(255,255,255,0.08)"}` }}>
                    {s}
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input type="number" placeholder="Custom…" value={customStatus} onChange={e => { setCustomStatus(e.target.value); setUseCustomStatus(true); }}
                  onFocus={() => setUseCustomStatus(true)}
                  style={{ width: "90px", background: "rgba(255,255,255,0.04)", border: `1.5px solid ${useCustomStatus ? "rgba(124,58,237,0.4)" : "rgba(124,58,237,0.15)"}`, borderRadius: "8px", padding: "6px 10px", fontSize: "12px", fontFamily: "monospace", color: "#e2e8f0", outline: "none" }} />
                {useCustomStatus && customStatus && (
                  <span style={{ fontSize: "11px", fontFamily: "monospace", fontWeight: 700, color: STATUS_COLOR(parseInt(customStatus) || 200) }}>{customStatus}</span>
                )}
              </div>
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                <label style={{ fontSize: "10px", fontFamily: "monospace", fontWeight: 600, color: "rgba(167,139,250,0.5)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Response Headers</label>
                <button onClick={addHeader}
                  style={{ display: "flex", alignItems: "center", gap: "4px", padding: "3px 8px", borderRadius: "6px", fontSize: "10px", fontFamily: "monospace", cursor: "pointer", background: "rgba(124,58,237,0.12)", color: "#a78bfa", border: "1px solid rgba(124,58,237,0.2)" }}>
                  <Plus size={10} /> Add
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {headers.map((h, i) => (
                  <div key={i} style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                    <input value={h.key} onChange={e => updateHeader(i, "key", e.target.value)} placeholder="Key"
                      style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: "1.5px solid rgba(124,58,237,0.15)", borderRadius: "7px", padding: "6px 9px", fontSize: "11px", fontFamily: "monospace", color: "#e2e8f0", outline: "none" }} />
                    <input value={h.value} onChange={e => updateHeader(i, "value", e.target.value)} placeholder="Value"
                      style={{ flex: 1.5, background: "rgba(255,255,255,0.04)", border: "1.5px solid rgba(124,58,237,0.15)", borderRadius: "7px", padding: "6px 9px", fontSize: "11px", fontFamily: "monospace", color: "#e2e8f0", outline: "none" }} />
                    <button onClick={() => removeHeader(i)} disabled={headers.length === 1}
                      style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "26px", height: "26px", borderRadius: "6px", cursor: "pointer", background: "rgba(239,68,68,0.08)", color: "rgba(239,68,68,0.5)", border: "1px solid rgba(239,68,68,0.15)", flexShrink: 0, opacity: headers.length === 1 ? 0.3 : 1 }}>
                      <Trash2 size={11} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: "10px", fontFamily: "monospace", fontWeight: 600, color: "rgba(167,139,250,0.5)", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "8px" }}>Response Body (JSON)</label>
              <textarea value={body} onChange={e => handleBodyChange(e.target.value)} rows={8}
                style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: `1.5px solid ${jsonError ? "#ef4444" : "rgba(124,58,237,0.2)"}`, borderRadius: "9px", padding: "10px 12px", fontSize: "12px", fontFamily: "monospace", color: "#e2e8f0", outline: "none", resize: "vertical", lineHeight: 1.65, boxSizing: "border-box" }} />
              {jsonError && <p style={{ fontSize: "10.5px", fontFamily: "monospace", color: "#ef4444", marginTop: "4px" }}>{jsonError}</p>}
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                <label style={{ fontSize: "10px", fontFamily: "monospace", fontWeight: 600, color: "rgba(167,139,250,0.5)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Response Delay</label>
                <span style={{ fontSize: "11px", fontFamily: "monospace", fontWeight: 700, color: delay === 0 ? "#22c55e" : delay < 1000 ? "#f59e0b" : "#ef4444" }}>{delay}ms</span>
              </div>
              <input type="range" min={0} max={3000} step={50} value={delay} onChange={e => setDelay(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#7c3aed", cursor: "pointer" }} />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
                <span style={{ fontSize: "9.5px", fontFamily: "monospace", color: "rgba(167,139,250,0.35)" }}>0ms</span>
                <span style={{ fontSize: "9.5px", fontFamily: "monospace", color: "rgba(167,139,250,0.35)" }}>3000ms</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ background: "#1c1428", borderRadius: "16px", border: "1px solid rgba(124,58,237,0.18)", overflow: "hidden", position: "sticky", top: "72px" }}>
          <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(124,58,237,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: "2px" }}>
              {(["preview", "curl", "fetch"] as Tab[]).map(t => (
                <button key={t} onClick={() => setActiveTab(t)}
                  style={{ padding: "5px 14px", borderRadius: "7px", fontSize: "11px", fontFamily: "monospace", fontWeight: 600, cursor: "pointer", transition: "all 0.15s", background: activeTab === t ? "rgba(124,58,237,0.2)" : "transparent", color: activeTab === t ? "#a78bfa" : "rgba(167,139,250,0.35)", border: `1.5px solid ${activeTab === t ? "rgba(124,58,237,0.35)" : "transparent"}` }}>
                  {t}
                </button>
              ))}
            </div>
            <button onClick={handleCopy}
              style={{ display: "flex", alignItems: "center", gap: "5px", padding: "5px 11px", borderRadius: "7px", fontSize: "10px", fontFamily: "monospace", fontWeight: 600, cursor: "pointer", transition: "all 0.15s", background: copied ? "rgba(34,197,94,0.12)" : "rgba(124,58,237,0.1)", color: copied ? "#22c55e" : "#a78bfa", border: `1px solid ${copied ? "rgba(34,197,94,0.25)" : "rgba(124,58,237,0.2)"}` }}>
              {copied ? <Check size={10} /> : <Copy size={10} />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          <div style={{ padding: "0 16px 8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 0", borderBottom: "1px solid rgba(124,58,237,0.07)" }}>
              <span style={{ fontSize: "10px", fontFamily: "monospace", fontWeight: 700, color: METHOD_COLORS[method], background: `${METHOD_COLORS[method]}18`, padding: "2px 8px", borderRadius: "5px", border: `1px solid ${METHOD_COLORS[method]}33` }}>{method}</span>
              <span style={{ fontSize: "12px", fontFamily: "monospace", color: "rgba(226,232,240,0.65)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{path || "/api/endpoint"}</span>
              <span style={{ fontSize: "11px", fontFamily: "monospace", fontWeight: 700, color: STATUS_COLOR(effectiveStatus) }}>{effectiveStatus}</span>
              {delay > 0 && (
                <span style={{ fontSize: "9.5px", fontFamily: "monospace", color: "rgba(167,139,250,0.4)", background: "rgba(124,58,237,0.08)", padding: "2px 7px", borderRadius: "5px", border: "1px solid rgba(124,58,237,0.15)" }}>{delay}ms</span>
              )}
            </div>
          </div>

          <div style={{ padding: "0 16px 16px" }}>
            {activeTab === "preview" && (
              <div style={{ background: "rgba(0,0,0,0.25)", borderRadius: "10px", padding: "14px", minHeight: "300px", maxHeight: "480px", overflowY: "auto" }}>
                {!jsonError && body.trim() ? (
                  <pre style={{ margin: 0, fontSize: "12px", fontFamily: "monospace", lineHeight: 1.75, whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                    dangerouslySetInnerHTML={{ __html: colorizeJson(parsedJson) }} />
                ) : jsonError ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <p style={{ fontSize: "11px", fontFamily: "monospace", color: "#ef4444", margin: 0 }}>Invalid JSON</p>
                    <p style={{ fontSize: "11px", fontFamily: "monospace", color: "rgba(239,68,68,0.6)", margin: 0 }}>{jsonError}</p>
                  </div>
                ) : (
                  <p style={{ fontSize: "12px", fontFamily: "monospace", color: "rgba(167,139,250,0.25)", margin: 0 }}>Response body will appear here…</p>
                )}
              </div>
            )}

            {activeTab === "curl" && (
              <div style={{ background: "rgba(0,0,0,0.25)", borderRadius: "10px", padding: "14px", minHeight: "300px", maxHeight: "480px", overflowY: "auto" }}>
                <pre style={{ margin: 0, fontSize: "12px", fontFamily: "monospace", lineHeight: 1.75, whiteSpace: "pre-wrap", wordBreak: "break-word", color: "#86efac" }}>
                  {buildCurl(method, path, headers, body, delay)}
                </pre>
              </div>
            )}

            {activeTab === "fetch" && (
              <div style={{ background: "rgba(0,0,0,0.25)", borderRadius: "10px", padding: "14px", minHeight: "300px", maxHeight: "480px", overflowY: "auto" }}>
                <pre style={{ margin: 0, fontSize: "12px", fontFamily: "monospace", lineHeight: 1.75, whiteSpace: "pre-wrap", wordBreak: "break-word", color: "#93c5fd" }}>
                  {buildFetch(method, path, headers, body, delay)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
