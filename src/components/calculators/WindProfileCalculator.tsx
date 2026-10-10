"use client";

import { useMemo, useState } from "react";

export default function WindProfileCalculator() {
  const [uStar, setUStar] = useState("0.3");
  const [z0, setZ0] = useState("0.03");
  const [z, setZ] = useState("10");

  const result = useMemo(() => {
    const us = parseFloat(uStar.replace(",", "."));
    const zz0 = parseFloat(z0.replace(",", "."));
    const zz = parseFloat(z.replace(",", "."));

    if (![us, zz0, zz].every(isFinite) || us <= 0 || zz0 <= 0 || zz <= 0) {
      return null;
    }

    const kappa = 0.4;
    const u = zz > zz0 ? (us / kappa) * Math.log(zz / zz0) : 0;

    const rho = 1.225;
    const tau = rho * us * us;

    // Стандартная стратификация: dT/dz = -0.0065 K/м
    // dU/dz ≈ u / (z · ln(z/z₀))
    const dTdz = -0.0065;
    const dudz = zz > zz0 && u > 0 ? u / (zz * Math.log(zz / zz0)) : 1e-6;
    const g = 9.81;
    const T = 288.15;
    const Ri = (g / T) * (dTdz / (dudz * dudz));

    return { u, tau, Ri };
  }, [uStar, z0, z]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Динамическая скорость u*, м/с" value={uStar} onChange={setUStar} />
        <Field label="Шероховатость z0, м" value={z0} onChange={setZ0} />
        <Field label="Высота z, м" value={z} onChange={setZ} />
      </div>

      {result ? (
        <div className="mt-6 divide-y divide-slate-100 rounded-lg bg-slate-50">
          <Row label="Скорость ветра u(z), м/с" value={result.u.toFixed(2)} />
          <Row label="Напряжение трения τ, Па" value={result.tau.toFixed(3)} />
          <Row label="Число Ричардсона Ri" value={result.Ri.toFixed(4)} />
          <Row
            label="Стратификация"
            value={
              result.Ri < -0.01
                ? "Неустойчивая"
                : result.Ri > 0.25
                ? "Устойчивая (подавление турбулентности)"
                : "Близка к нейтральной"
            }
          />
        </div>
      ) : (
        <div className="mt-6 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-700">
          Проверьте ввод: u* &gt; 0, z0 &gt; 0, z &gt; 0.
        </div>
      )}

      <p className="mt-4 text-xs text-slate-500">
        При нейтральной стратификации профиль ветра логарифмический:
        u(z) = (u*/κ) · ln(z/z0). κ ≈ 0.4 — константа Кармана.
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