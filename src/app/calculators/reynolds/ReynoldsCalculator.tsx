"use client";

import { useMemo, useState } from "react";
import LiveDragChart from "@/components/charts/LiveDragChart";

const Cd = 0.47; // сфера
const A = 0.01;  // 100 см²

export default function ReynoldsCalculator() {
  const [rho, setRho] = useState("1000");
  const [v, setV] = useState("1");
  const [L, setL] = useState("0.1");
  const [mu, setMu] = useState("0.001");

  const nums = useMemo(() => {
    const R = parseFloat(rho.replace(",", "."));
    const V = parseFloat(v.replace(",", "."));
    const l = parseFloat(L.replace(",", "."));
    const m = parseFloat(mu.replace(",", "."));
    return { R, V, l, m };
  }, [rho, v, L, mu]);

  const result = useMemo(() => {
    const { R, V, l, m } = nums;
    if ([R, V, l, m].some((x) => !isFinite(x)) || m === 0) {
      return { re: null as number | null, regime: "—" };
    }
    const re = (R * V * l) / m;
    let regime = "переходный";
    if (re < 2300) regime = "ламинарный";
    else if (re > 4000) regime = "турбулентный";
    return { re, regime };
  }, [nums]);

  const dragAtV = useMemo(() => {
    const { R, V } = nums;
    if (!isFinite(R) || !isFinite(V)) return null;
    return 0.5 * Cd * R * V * V * A;
  }, [nums]);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Плотность ρ, кг/м³" value={rho} onChange={setRho} />
          <Field label="Скорость v, м/с" value={v} onChange={setV} />
          <Field label="Характерный размер L, м" value={L} onChange={setL} />
          <Field
            label="Динамическая вязкость μ, Па·с"
            value={mu}
            onChange={setMu}
          />
        </div>

        <div className="mt-6 rounded-lg bg-slate-50 p-4">
          <div className="text-sm text-slate-500">Результат</div>
          <div className="mt-1 text-2xl font-semibold text-slate-900">
            Re = {result.re === null ? "—" : result.re.toFixed(0)}
          </div>
          <div className="mt-1 text-sm text-slate-600">
            Режим течения:{" "}
            <span className="font-medium">{result.regime}</span>
          </div>
          {dragAtV !== null ? (
            <div className="mt-2 text-sm text-slate-600">
              Сила сопротивления сферы (C_d = {Cd}, A = {A} м²):{" "}
              <span className="font-medium">{dragAtV.toFixed(2)} Н</span>
            </div>
          ) : null}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="text-lg font-semibold text-slate-900">
          Сила сопротивления как функция скорости
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          Сфера (C_d = {Cd}), площадь A = {A} м², ρ берётся из поля выше.
          Вертикальная линия — текущее v.
        </p>
        <div className="mt-4 h-[320px] w-full">
          <LiveDragChart
            rho={isFinite(nums.R) ? nums.R : 1000}
            A={A}
            Cd={Cd}
            vMax={15}
            vCurrent={isFinite(nums.V) ? nums.V : undefined}
          />
        </div>
      </div>
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
