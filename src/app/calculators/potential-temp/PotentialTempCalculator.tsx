"use client";

import { useMemo, useState } from "react";

export default function PotentialTempCalculator() {
  const [T, setT] = useState("20");
  const [p, setP] = useState("850");

  const result = useMemo(() => {
    const Tc = parseFloat(T.replace(",", "."));
    const pv = parseFloat(p.replace(",", "."));

    if (![Tc, pv].every(isFinite) || pv <= 0) return null;

    const Tk = Tc + 273.15; // °C → К
    const chi = 1.4;
    const exp = (chi - 1) / chi; // ≈ 0.286

    // θ = T (1000/p)^0.286
    const thetaK = Tk * Math.pow(1000 / pv, exp);
    const thetaC = thetaK - 273.15;

    // Сухоадиабатический градиент: γ_a = g/c_p ≈ 0.98 °C/100 м
    // c_p = 1005 Дж/(кг·К), g = 9.81 м/с²
    const gammaA = (9.81 / 1005) * 100; // °C/100 м

    // Высота, на которой давление достигнет 1000 мб при текущем p (приближённо)
    const baricStep = 8000 / pv * (1 + Tc / 273.15);
    const dz = (1000 - pv) * baricStep; // м, если p < 1000

    return {
      thetaC,
      thetaK,
      gammaA,
      exp,
      dz
    };
  }, [T, p]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Температура T, °C" value={T} onChange={setT} />
        <Field label="Давление p, мб" value={p} onChange={setP} />
      </div>

      {result ? (
        <div className="mt-6 divide-y divide-slate-100 rounded-lg bg-slate-50">
          <Row
            label="Показатель (χ−1)/χ"
            value={result.exp.toFixed(4)}
          />
          <Row
            label="Потенциальная температура θ, °C"
            value={result.thetaC.toFixed(2)}
          />
          <Row
            label="Потенциальная температура θ, К"
            value={result.thetaK.toFixed(2)}
          />
          <Row
            label="Сухоадиабатический градиент γ_a"
            value={`${result.gammaA.toFixed(3)} °C/100 м`}
          />
          <Row
            label="Приблизительный подъём до 1000 мб"
            value={`${result.dz.toFixed(0)} м`}
          />
        </div>
      ) : (
        <div className="mt-6 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-700">
          Проверьте ввод: T — число, p &gt; 0.
        </div>
      )}

      <p className="mt-4 text-xs text-slate-500">
        Потенциальная температура — консервативная характеристика воздушной
        массы. Сохраняется при сухоадиабатических перемещениях.
      </p>
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
