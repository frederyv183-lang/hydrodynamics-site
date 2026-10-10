"use client";

import { useMemo, useState } from "react";

export default function BaricStepCalculator() {
  const [p, setP] = useState("1000");
  const [t, setT] = useState("15");

  const result = useMemo(() => {
    const pv = parseFloat(p.replace(",", "."));
    const tv = parseFloat(t.replace(",", "."));

    if (![pv, tv].every(isFinite) || pv <= 0) return null;

    // Барическая ступень h = H₀/p · (1 + αt), H₀ ≈ 8000 м, α = 1/273.15
    const alpha = 1 / 273.15;
    const H0 = 8000;
    const h = (H0 / pv) * (1 + alpha * tv);

    // Обратная задача: падение давления на 1 мб соответствует подъёму на h метров
    // Падение давления при подъёме на 100 м:
    const dpPer100m = 100 / h;

    return { h, dpPer100m };
  }, [p, t]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Давление p, мб" value={p} onChange={setP} />
        <Field label="Температура t, °C" value={t} onChange={setT} />
      </div>

      {result ? (
        <div className="mt-6 divide-y divide-slate-100 rounded-lg bg-slate-50">
          <Row
            label="Барическая ступень h"
            value={`${result.h.toFixed(2)} м/мб`}
          />
          <Row
            label="Падение давления при подъёме на 100 м"
            value={`${result.dpPer100m.toFixed(2)} мб`}
          />
        </div>
      ) : (
        <div className="mt-6 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-700">
          Проверьте ввод: p &gt; 0, t — число.
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </span>
      <input
        type="text"
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
      />
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-2.5">
      <span className="text-sm text-slate-600">{label}</span>
      <span className="font-mono text-sm font-medium text-slate-900">
        {value}
      </span>
    </div>
  );
}
