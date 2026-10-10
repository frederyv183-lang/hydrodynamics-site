"use client";

import { useMemo, useState } from "react";

// Формула Магнуса для упругости насыщения (мб)
function E_sat(tC: number): number {
  return 6.112 * Math.exp((17.67 * tC) / (tC + 243.5));
}

export default function HygroCalculator() {
  const [t, setT] = useState("20");
  const [td, setTd] = useState("10");
  const [p, setP] = useState("1013.2");

  const result = useMemo(() => {
    const T = parseFloat(t.replace(",", "."));
    const Td = parseFloat(td.replace(",", "."));
    const P = parseFloat(p.replace(",", "."));

    if (![T, Td, P].every(isFinite) || Td > T || P <= 0) {
      return null;
    }

    const e = E_sat(Td);       // упругость водяного пара (мб)
    const E = E_sat(T);        // упругость насыщения (мб)
    const f = (e / E) * 100;   // относительная влажность, %
    const d = E - e;           // дефицит влажности
    const s = 0.622 * (e / P); // удельная влажность, г/г
    const r = 0.622 * (e / (P - e)); // отношение смеси
    const a = 220 * (e / (T + 273.15)); // абсолютная влажность, г/м³
    const Tv = (T + 273.15) * (1 + 0.608 * s); // виртуальная температура, К
    const dTv = Tv - (T + 273.15);

    // Плотность влажного воздуха
    const Rc = 287;
    const rho = (P * 100) / (Rc * Tv); // P в мб → Па

    // Барическая ступень (м/мб)
    const h = 8000 / P * (1 + (T / 273.15));

    return {
      e, E, f, d, s, r, a, Tv, dTv, rho, h,
      Tk: Td
    };
  }, [t, td, p]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Температура t, °C" value={t} onChange={setT} />
        <Field label="Точка росы t_d, °C" value={td} onChange={setTd} />
        <Field label="Давление p, мб" value={p} onChange={setP} />
      </div>

      {result ? (
        <div className="mt-6 divide-y divide-slate-100 rounded-lg bg-slate-50">
          <Row label="Упругость водяного пара e" value={`${result.e.toFixed(2)} мб`} />
          <Row label="Упругость насыщения E" value={`${result.E.toFixed(2)} мб`} />
          <Row label="Относительная влажность f" value={`${result.f.toFixed(1)} %`} />
          <Row label="Дефицит влажности d = E − e" value={`${result.d.toFixed(2)} мб`} />
          <Row label="Удельная влажность s" value={`${(result.s * 1000).toFixed(2)} г/кг`} />
          <Row label="Отношение смеси r" value={`${(result.r * 1000).toFixed(2)} г/кг`} />
          <Row label="Абсолютная влажность a" value={`${result.a.toFixed(2)} г/м³`} />
          <Row label="Виртуальная температура T_v" value={`${(result.Tv - 273.15).toFixed(2)} °C`} />
          <Row label="Виртуальный добавок ΔT_v" value={`${result.dTv.toFixed(3)} °C`} />
          <Row label="Плотность влажного воздуха ρ" value={`${result.rho.toFixed(4)} кг/м³`} />
          <Row label="Барическая ступень h" value={`${result.h.toFixed(2)} м/мб`} />
        </div>
      ) : (
        <div className="mt-6 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-700">
          Проверьте ввод: t_d ≤ t, p &gt; 0.
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
    <div className="flex items-center justify-between px-4 py-2.5">
      <span className="text-sm text-slate-600">{label}</span>
      <span className="font-mono text-sm font-medium text-slate-900">{value}</span>
    </div>
  );
}
