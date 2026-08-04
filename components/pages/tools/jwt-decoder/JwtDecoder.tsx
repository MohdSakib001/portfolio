"use client";
import { useState, useMemo } from "react";
import { Copy, Check } from "lucide-react";

interface JwtParts {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
  isExpired: boolean;
  expiryDate: string | null;
  issuedAt: string | null;
  error?: string;
}

function decodeJwt(token: string): JwtParts {
  try {
    const parts = token.trim().split(".");
    if (parts.length !== 3) throw new Error("Not a valid JWT — must have 3 parts separated by dots.");

    const decode = (s: string): Record<string, unknown> => {
      const pad = s.length % 4;
      const padded = pad ? s + "=".repeat(4 - pad) : s;
      const b64 = padded.replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(decodeURIComponent(escape(atob(b64))));
    };

    const header  = decode(parts[0]);
    const payload = decode(parts[1]);

    const now = Math.floor(Date.now() / 1000);
    const exp = payload.exp as number | undefined;
    const iat = payload.iat as number | undefined;

    const isExpired   = exp !== undefined ? now > exp : false;
    const expiryDate  = exp ? new Date(exp * 1000).toLocaleString("en-US", { timeZoneName: "short" }) : null;
    const issuedAt    = iat ? new Date(iat * 1000).toLocaleString("en-US", { timeZoneName: "short" }) : null;

    return { header, payload, signature: parts[2], isExpired, expiryDate, issuedAt };
  } catch (e) {
    return { header: {}, payload: {}, signature: "", isExpired: false, expiryDate: null, issuedAt: null, error: (e as Error).message };
  }
}

function JsonBlock({ data, label }: { data: Record<string, unknown>; label: string }) {
  const [copied, setCopied] = useState(false);
  const json = JSON.stringify(data, null, 2);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-[14px] overflow-hidden" style={{ background: "#0d1117", border: "1px solid rgba(251,191,36,0.12)" }}>
      <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: "1px solid rgba(251,191,36,0.08)" }}>
        <span className="text-[9.5px] uppercase tracking-[0.15em] font-bold font-mono" style={{ color: "#fbbf24" }}>{label}</span>
        <button onClick={handleCopy} className="flex items-center gap-1 px-2 py-1 rounded text-[9.5px] font-mono transition-all"
          style={{ color: copied ? "#22c55e" : "rgba(251,191,36,0.5)" }}>
          {copied ? <Check size={9} /> : <Copy size={9} />}
          {copied ? "copied" : "copy"}
        </button>
      </div>
      <pre className="p-4 text-[12px] leading-[1.75] overflow-x-auto font-mono" style={{ color: "#a5b4fc" }}>
        {json}
      </pre>
    </div>
  );
}

export default function JwtDecoder() {
  const [token, setToken] = useState("");

  const result = useMemo<JwtParts | null>(() => {
    const t = token.trim();
    if (!t) return null;
    return decodeJwt(t);
  }, [token]);

  const parts = token.trim().split(".");
  const colors = ["#f87171", "#86efac", "#93c5fd"];

  return (
    <div>
      {/* Token input */}
      <div className="rounded-[20px] overflow-hidden mb-4"
        style={{ background: "#161b22", boxShadow: "0 0 0 1px rgba(251,191,36,0.12), 0 8px 32px rgba(0,0,0,0.5)" }}>
        <div className="px-5 py-3" style={{ borderBottom: "1px solid rgba(251,191,36,0.08)" }}>
          <span className="text-[9.5px] uppercase tracking-[0.15em] font-bold font-mono" style={{ color: "rgba(251,191,36,0.5)" }}>
            Paste JWT Token
          </span>
        </div>
        <textarea
          value={token}
          onChange={e => setToken(e.target.value)}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.abc..."
          className="w-full min-h-[100px] resize-none p-5 text-[12.5px] leading-[1.7] outline-none bg-transparent font-mono"
          style={{ color: "#e2e8f0", caretColor: "#fbbf24", wordBreak: "break-all" }}
          autoFocus
          spellCheck={false}
        />
      </div>

      {/* Token parts visualisation */}
      {token.trim() && parts.length >= 1 && (
        <div className="rounded-[14px] p-4 mb-4 font-mono text-[11px] break-all leading-relaxed"
          style={{ background: "#161b22", border: "1px solid rgba(251,191,36,0.08)" }}>
          {parts.map((part, i) => (
            <span key={i}>
              <span style={{ color: colors[i] || "#9ca3af" }}>{part}</span>
              {i < parts.length - 1 && <span style={{ color: "rgba(255,255,255,0.3)" }}>.</span>}
            </span>
          ))}
        </div>
      )}

      {/* Error */}
      {result?.error && (
        <div className="rounded-[14px] p-4 mb-4" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
          <p className="font-mono text-[12.5px]" style={{ color: "#f87171" }}>⚠ {result.error}</p>
        </div>
      )}

      {/* Status bar */}
      {result && !result.error && (
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1.5 rounded-full text-[10px] font-mono font-semibold"
            style={{ background: result.isExpired ? "rgba(239,68,68,0.1)" : "rgba(34,197,94,0.1)", color: result.isExpired ? "#f87171" : "#4ade80", border: `1px solid ${result.isExpired ? "rgba(239,68,68,0.2)" : "rgba(34,197,94,0.2)"}` }}>
            {result.isExpired ? "⚠ EXPIRED" : "✓ VALID (not expired)"}
          </span>
          {result.expiryDate && (
            <span className="px-3 py-1.5 rounded-full text-[10px] font-mono" style={{ background: "rgba(251,191,36,0.08)", color: "rgba(251,191,36,0.7)", border: "1px solid rgba(251,191,36,0.12)" }}>
              Expires: {result.expiryDate}
            </span>
          )}
          {result.issuedAt && (
            <span className="px-3 py-1.5 rounded-full text-[10px] font-mono" style={{ background: "rgba(251,191,36,0.08)", color: "rgba(251,191,36,0.5)", border: "1px solid rgba(251,191,36,0.08)" }}>
              Issued: {result.issuedAt}
            </span>
          )}
        </div>
      )}

      {/* Decoded sections */}
      {result && !result.error && (
        <div className="space-y-3">
          <JsonBlock data={result.header}  label="Header (red)" />
          <JsonBlock data={result.payload} label="Payload (green)" />
          <div className="rounded-[14px] p-4" style={{ background: "#0d1117", border: "1px solid rgba(147,197,253,0.12)" }}>
            <p className="text-[9.5px] uppercase tracking-[0.15em] font-bold font-mono mb-2" style={{ color: "#93c5fd" }}>
              Signature (blue)
            </p>
            <p className="font-mono text-[12px] break-all" style={{ color: "#93c5fd" }}>{result.signature}</p>
            <p className="mt-2 text-[11px] font-mono" style={{ color: "rgba(147,197,253,0.4)" }}>
              ⚠ Signature verification requires the secret — this tool only decodes, it does not verify.
            </p>
          </div>
        </div>
      )}

      {!token && (
        <div className="rounded-[16px] px-8 py-10 text-center" style={{ background: "#161b22", border: "1px solid rgba(251,191,36,0.08)" }}>
          <p className="font-mono text-[13px]" style={{ color: "rgba(251,191,36,0.3)", lineHeight: 1.7 }}>
            Paste any JWT token above to decode it.
          </p>
        </div>
      )}
    </div>
  );
}
