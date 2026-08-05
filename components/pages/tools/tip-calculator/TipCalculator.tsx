"use client";

import { useMemo, useState } from "react";
import { Minus, Plus, Receipt } from "lucide-react";

const TIP_PRESETS = [10, 15, 18, 20, 25];
const MAX_PEOPLE = 50;

const LABEL_CLASS =
  "text-label font-semibold uppercase tracking-[0.16em] text-black/40";

export default function TipCalculator() {
  const [bill, setBill] = useState("");
  const [tipPct, setTipPct] = useState(18);
  const [custom, setCustom] = useState("");
  const [people, setPeople] = useState(2);
  const [useCustom, setUseCustom] = useState(false);

  const result = useMemo(() => {
    const b = parseFloat(bill);
    const t = useCustom ? parseFloat(custom) || 0 : tipPct;
    if (!b || b <= 0) return null;

    const tipTotal = b * (t / 100);
    const grandTotal = b + tipTotal;

    return {
      tipTotal,
      grandTotal,
      perPerson: grandTotal / people,
      tipPer: tipTotal / people,
      rate: t,
    };
  }, [bill, tipPct, custom, people, useCustom]);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div className="space-y-3">
      {/* Bill */}
      <div className="rounded-4xl bg-white p-6 shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_4px_24px_rgba(0,0,0,0.04)] sm:p-8">
        <label className={LABEL_CLASS} htmlFor="bill-amount">
          Bill amount
        </label>
        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-black/10 bg-[#fcfbfa] px-5 py-4 transition duration-150 hover:border-black/25 focus-within:border-black/70 focus-within:bg-white">
          <span className="font-mono text-2xl font-semibold text-black/25">
            $
          </span>
          <input
            id="bill-amount"
            type="number"
            inputMode="decimal"
            min="0"
            step="0.01"
            value={bill}
            onChange={(event) => setBill(event.target.value)}
            placeholder="0.00"
            className="w-full bg-transparent font-mono text-3xl font-semibold tracking-tight text-black tabular-nums outline-none placeholder:text-black/20"
          />
        </div>
      </div>

      {/* Tip + split */}
      <div className="rounded-4xl bg-white p-6 shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_4px_24px_rgba(0,0,0,0.04)] sm:p-8">
        <p className={LABEL_CLASS}>Tip percentage</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {TIP_PRESETS.map((t) => {
            const active = !useCustom && tipPct === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setTipPct(t);
                  setUseCustom(false);
                }}
                aria-pressed={active}
                className={`rounded-full px-5 py-2.5 font-mono text-body font-semibold tabular-nums transition duration-150 ${
                  active
                    ? "bg-black text-white"
                    : "bg-black/[0.04] text-black/50 hover:bg-black/[0.08] hover:text-black"
                }`}
              >
                {t}%
              </button>
            );
          })}
          <input
            type="number"
            min="0"
            max="100"
            value={custom}
            onChange={(event) => {
              setCustom(event.target.value);
              setUseCustom(true);
            }}
            onFocus={() => setUseCustom(true)}
            placeholder="Custom %"
            aria-label="Custom tip percentage"
            className={`min-w-[110px] flex-1 rounded-full px-5 py-2.5 text-center font-mono text-body font-semibold tabular-nums outline-none transition duration-150 ${
              useCustom
                ? "bg-black text-white placeholder:text-white/40"
                : "bg-black/[0.04] text-black/50 placeholder:text-black/30 hover:bg-black/[0.08]"
            }`}
          />
        </div>

        <div className="mt-8 border-t border-black/8 pt-6">
          <p className={LABEL_CLASS}>Split between</p>
          <div className="mt-4 flex items-center gap-4">
            <button
              type="button"
              onClick={() => setPeople((p) => Math.max(1, p - 1))}
              disabled={people <= 1}
              title="Remove a person"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black/[0.04] text-black/50 transition duration-150 hover:bg-black/[0.08] hover:text-black disabled:pointer-events-none disabled:opacity-30"
            >
              <Minus size={16} />
            </button>
            <p className="flex flex-1 items-baseline justify-center gap-2">
              <span className="font-mono text-4xl font-semibold leading-none tracking-tight text-black tabular-nums">
                {people}
              </span>
              <span className="text-caption text-black/40">
                {people === 1 ? "person" : "people"}
              </span>
            </p>
            <button
              type="button"
              onClick={() => setPeople((p) => Math.min(MAX_PEOPLE, p + 1))}
              disabled={people >= MAX_PEOPLE}
              title="Add a person"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black/[0.04] text-black/50 transition duration-150 hover:bg-black/[0.08] hover:text-black disabled:pointer-events-none disabled:opacity-30"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Result */}
      {result ? (
        <>
          <div className="relative overflow-hidden rounded-4xl bg-[#DAF0DE] p-8 md:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-45 mix-blend-overlay"
              style={{
                backgroundImage: `url("/assets/paper-texture.avif")`,
                backgroundSize: "cover",
              }}
            />

            <p className="relative text-label font-semibold uppercase tracking-[0.25em] text-black/40">
              Total bill
            </p>
            <p className="relative mt-5 font-mono text-5xl font-semibold leading-none tracking-tight text-black tabular-nums md:text-6xl">
              ${fmt(result.grandTotal)}
            </p>
            <p className="relative mt-4 text-caption text-black/55">
              Including a {result.rate}% tip of{" "}
              <span className="font-medium text-black">
                ${fmt(result.tipTotal)}
              </span>
            </p>
          </div>

          {people > 1 && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                { label: "Per person", value: result.perPerson },
                { label: "Tip per person", value: result.tipPer },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded-2xl bg-white p-6 shadow-[0_0_0_1px_rgba(0,0,0,0.06)]"
                >
                  <p className="font-mono text-3xl font-semibold leading-none tracking-tight text-black tabular-nums">
                    ${fmt(value)}
                  </p>
                  <p className="mt-2 text-label font-semibold uppercase tracking-[0.16em] text-black/40">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="rounded-2xl border border-dashed border-black/12 px-8 py-14 text-center">
          <Receipt
            size={22}
            aria-hidden
            className="mx-auto mb-4 text-black/25"
          />
          <p className="text-caption leading-relaxed text-black/40">
            Enter the bill amount above
            <br className="hidden sm:block" /> to work out the tip and the split.
          </p>
        </div>
      )}
    </div>
  );
}
