"use client";

import { useMemo, useState } from "react";

// Вычисление давления на уровне моря через формулу Лапласа
// z - высота станции (м), p - давление на станции (мб), t - температура (°C)
// Средний градиент для тропосферы γ = 0.65 °C/100 м
// Средняя температура слоя t_m = t + γ·z/2

export default function PressureToSeaCalculator() {
  const [pStation, setPStation] = useState("985.4");
  const [zStation, setZStation] = useState("150");
  const [tStation, setTStation] = useState("15.6");
  const [gamma, setGamma] = useState("0.65");

  const result = useMemo(() => {
    const p = parseFloat(pStation.replace(",", "."));
    const z = parseFloat(zStation.replace(",", "."));
    const t = parseFloat(tStation.replace(",", "."));
    const g = parseFloat(gamma.replace(",", "."));

    if (![p, z, t, g].every(isFinite)) return null;

    // Средняя барометрическая температура слоя (в °C)
    const t_m = t + (g * z) / 200;

    // Формула Лапласа: z = B (1 + α·t_m) lg(p₀/p)  ⇒  lg(p₀/p) = z / [B (1 + α·t_m)]
    // B ≈ 18400 м, α = 1/273.15
    const alpha = 1 / 273.15;
    const B = 18400;
    const lgRatio = z / (B * (1 + alpha * t_m));
    const pSea = p * Math.pow(10, lgRatio);

    // Поправка (приведение к уровню моря)
    const deltaP = pSea - p;

    return {
      pSea,
      deltaP,
      t_m
    };
  }, [pStation, zStation, tStation, gamma]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Давление на станции p, мб"
          value={pStation}
          onChange={setPStation}
        />
        <Field
          label="Высота станции z, м"
          value={zStation}
          onChange={setZStation}
        />
        <Field
          label="Температура на станции t, °C"
          value={tStation}
          onChange={setTStation}
        />
        <Field
          label="Средний градиент γ, °C/100 м"
          value={gamma}
          onChange={setGamma}
        />
      </div>

      {result ? (
        <div className="mt-6 divide-y divide-slate-100 rounded-lg bg-slate-50">
          <Row
            label="Средняя барометрическая температура слоя t_m"
            value={`${result.t_m.toFixed(2)} °C`}
          />
          <Row
            label="Давление, приведённое к уровню моря p₀"
            value={`${result.pSea.toFixed(2)} мб`}
          />
          <Row
            label="Поправка (p₀ − p)"
            value={`${result.deltaP.toFixed(2)} мб`}
          />
        </div>
      ) : (
        <div className="mt-6 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-700">
          Проверьте ввод — все поля должны быть числами.
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
